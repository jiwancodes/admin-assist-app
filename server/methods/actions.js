const mysql = require('mysql2/promise');
const config = require('../config/config');
// var jwt = require('jwt-simple')
var JwtStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt
const jwt = require('jsonwebtoken');    
var bcrypt = require('bcrypt');
const moment = require('moment');
const saltRounds = 10;


//this connection is global database connection variable for this page
var connection
const functions = {
    //establish initial connection with database and a test query
    connectDatabase: async () => {
        try {
            connection = await mysql.createPool(config.mysql_config);
            var testQuery = "SELECT * FROM login;"
            var [rows, fields] = await connection.query(testQuery);
            console.log("successfully connected");
        }
        catch (err) {
            console.error("error occured");
            throw (err);
        }

    },
    //api callback for update system users
    addNewUser: async (req, res) => {
        const username = req.body.username;
        const email = req.body.email;
        var password = req.body.password;
        if(!validateEmail(email)){
            return res.status(403).json({
                "success": false,
                "msg": "Invalid Email"
            });
        } else if(username===null||email===null||password==null){
            return res.status(403).json({
                "success": false,
                "msg": "Empty form fills"
            });
        }

        try {
            console.log("entered in try");
            var [user, field] = await connection.query('SELECT * FROM systemUser WHERE email = ?', [email]);
            if (user.length > 0) {
                res.json({
                    "success": false,
                    "msg": "User already exist for this Email",
                    "rows": user,
                });
            }
            else {
                var salt = await bcrypt.genSalt(saltRounds);
                var hash = await bcrypt.hash(password, salt);//didnot use callback due to process running in callback hell
                if (hash) {
                    password = hash
                    console.log("email is :", email);
                    console.log("password is", password);
                    var [rows, fields] = await connection.query('INSERT INTO systemUser (username, email, password) VALUES("' + username + '", "' + email + '", "' + password + '")',
                        [username, email, password]);
                    res.json({
                        "success": true,
                        "msg": "successfully created user",
                        "rows": rows,

                    });
                }
            }

        } catch (err) {
            console.log(err);
            res.json({
                "success": false,
                "msg": "Failed to created user",
                "error": err,
            })
        }
    },
    LoginUser: async (req, res) => {
        const email = req.body.email;
        try {
            console.log("entered in try");
            console.log(email);
            var [user, field] = await connection.query('SELECT * FROM systemUser WHERE email = ?', [email]);
            console.log(user);
            if (user.length > 0) {
                console.log("saved hash is ", user[0].password);
                bcrypt.compare(req.body.password, user[0].password, function (err, value) {
                    console.log("entered password comarision")

                    if (err) {
                        console.log(err);
                        throw err;
                    }
                    if (value) {
                        console.log("password comparison success");
                        // Send JWT
                        var newUser = user[0];
                        delete newUser['password']
                        console.log(newUser)
                        var token = jwt.sign({newUser}, config.secret, { expiresIn: 300 });
                        console.log("token is :", token);
                        res.json({
                            success: true,
                            token: token,
                            msg: "User authenticated"
                        });
                    } else {
                        console.log("wrong password");
                        // response is OutgoingMessage object that server response http request
                        res.status(403).send({
                            success: false,
                            msg: "Authentication Failed, Wrong Password"
                        })
                    }
                });
            }
            else {
                console.log("user not found");
                res.status(403).send({
                     success: false, 
                     msg: "Authentication failed, User not found" })
            }

        } catch (err) {
            console.log(err);
            res.json({
                "success": false,
                "msg": "Failed to login user",
                "error": err,
            })
        }
    },
    passportStrategy: async (passport) => {
        var opts = {}
        opts.secretOrKey = config.secret,
        opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
        console.log("here i am");
        passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
            console.log(jwt_payload);
            return done(null, false);
        })
        );

    },
    getUserInfoFromToken: function (req, res) {
        console.log(req.headers);
        if (req.headers.authorization && req.headers.authorization.split(" ")[0] == 'Bearer') {
            var token = req.headers.authorization.split(" ")[1]
            try {
                var decodedToken = jwt.verify(token, config.secret);
                console.log(decodedToken);
                res.json({
                    "success": true,
                    "token": decodedToken,
                    "msg": "hello" + decodedToken.username,
                })
              } catch(err) {
                  console.log(err);
                  res.json({
                    "success": false,
                    "msg": "Invalid token",
                    "error":err
                })
                // err
              }
        //     var decodedToken = jwt.decode(token, config.secret)
        //     return res.json({
        //         success: true,
        //         token: decodedToken,
        //         msg: "hello" + decodedToken.email,
        //     })
        }
        else {
            console.log(req.headers.authorization.split(" ")[0]);
            return res.json({
                success: false,
                msg: "no headers"
            })
        }

    },
    //Api callback function to fetch required data from table login
    getAllUserDetailsOfNpstocks: async (req, res) => {
        try {
            console.log("Entered Npstock api")
            const getQuery = "SELECT idlogin,username,phone,Date_Format(login.expiry_date,'%Y-%m-%d')as expiry_date FROM login;"
            const [rows, fields] = await connection.query(getQuery);
            res.json({
                "success": true,
                "msg": "successfully fetched user details of npstock",
                "rows": JSON.stringify(rows),
            })
        }
        catch (err) {
            console.log("error occured");
            res.json({
                "success": false,
                "msg": "failed to fetch",
            })
            console.error(err);
        }
    },
    //Api callback function to fetch required data from table loginsystemxlite
    getAllUserDetailsOfSystemxlite: async (req, res) => {
        try {
            console.log("Entered systemxlite api")
            const getQuery = "SELECT idloginsystemxlt as idlogin,username,phone,Date_Format(loginsystemxlt.expiry_date,'%Y-%m-%d')as expiry_date FROM loginsystemxlt;"
            const [rows, fields] = await connection.query(getQuery);
            res.json({
                "success": true,
                "msg": "successfully fetched user details of Systemxlite",
                "rows": JSON.stringify(rows),
            })
        }
        catch (err) {
            console.log("error occured");
            res.json({
                "success": false,
                "msg": "failed to fetch",
                "err": JSON.stringify(err),
            })
        }
    },
    //Api callback function to update expiry date based on various constraints
    addExpiryDate: async (req, res) => {
        try {
            console.log("Entered edit exp date api")
            const table = req.body.database === "npstock" ? "login" : "loginsystemxlt";
            const id = req.body.database === "npstock" ? "idlogin" : "idloginsystemxlt";
            var new_exp_date = new Date();
            if (moment(req.body.row.expiry_date) < moment()) {
                new_exp_date = req.body.option === "lifeTime" ? moment().add(1000, 'years') :
                    req.body.option === "oneYear" ? moment().add(1, 'years') : moment().add(5, 'days');
                //  console.log("new expiry date is:",new_exp_date.format('YYYY-MM-DD'));
            }
            else {
                new_exp_date = req.body.option === "lifeTime" ? moment(req.body.row.expiry_date).add(1000, 'years') :
                    req.body.option === "oneYear" ? moment(req.body.row.expiry_date).add(1, 'years') : moment(req.body.row.expiry_date).add(5, 'days');
                // console.log("new expiry date is:",new_exp_date);
            }
            // console.log("new expiry date is:",new_exp_date.format('YYYY-MM-DD'));
            const postQuery = `UPDATE ${table} SET expiry_date=? WHERE ${id}=?`
            const [rows, fields] = await connection.query(postQuery, [new_exp_date.format('YYYY-MM-DD'), req.body.row.idlogin]);
            res.json({
                "success": true,
                "msg": "Expiry date successfully extended",
                "rows": JSON.stringify(rows),
                "fields": JSON.stringify(fields)
            })



        }
        catch (err) {
            console.log("error occured");
            res.json({
                "success": false,
                "msg": "Error!! failed to extend expiry date",
                "err": JSON.stringify(err),

            })
        }

    }
}
function validateEmail(email) {
    //eslint-disable-next-line
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  
module.exports = functions;