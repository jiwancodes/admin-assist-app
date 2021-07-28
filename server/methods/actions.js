const mysql = require('mysql2/promise');
const config = require('../config/config');
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
            // console.log("connection established with database");
            let createuser = `CREATE TABLE IF NOT EXISTS manualUpdateUser (
                idlogin int(11) NOT NULL AUTO_INCREMENT,
                username varchar(100) NOT NULL,
                email varchar(100) NOT NULL,
                password mediumtext NOT NULL,
                PRIMARY KEY (idlogin),
                UNIQUE KEY email_UNIQUE (email),
                UNIQUE KEY username_UNIQUE (username)
              );`
            await connection.query(createuser);
            let createsystemxlitelogs = `CREATE TABLE IF NOT EXISTS systemxliteupdatelogs (
                updateid int(11) NOT NULL AUTO_INCREMENT,
                updatedate datetime default current_timestamp not null,
                updator varchar(50) NOT NULL,
                username varchar(50) NOT NULL,  
                package varchar(30) NOT NULL,
                paymentmethod varchar(50) NOT NULL, 
                remarks varchar(300) ,
                PRIMARY KEY (updateid)
              );`
            await connection.query(createsystemxlitelogs);
            let createnpstocklogs = `CREATE TABLE IF NOT EXISTS npstockupdatelogs(
                updateid int(11) NOT NULL AUTO_INCREMENT,
                updatedate datetime default current_timestamp not null,
                updator varchar(50) NOT NULL,
                username varchar(50) NOT NULL,  
                package varchar(30) NOT NULL,
                paymentmethod varchar(50) NOT NULL, 
                remarks varchar(300) ,
                PRIMARY KEY (updateid)
              );`
            await connection.query(createnpstocklogs);
        }
        catch (err) {
            console.error("error occured");
            throw (err);
        }

    },
    //api callback for update system users
    addNewUser: async (req, res) => {
        // console.log("signup called");
        const username = req.body.username;
        const email = req.body.email;
        var password = req.body.password;
        if (req.user.newUser.username !== "admin") {
            // if(false){
            return res.json({
                "success": false,
                "msg": "Not authorized"
            });
        } else if (!validateEmail(email)) {
            return res.json({
                "success": false,
                "msg": "Invalid Email"
            });
        } else if (username === null || email === null || password == null) {
            return res.json({
                "success": false,
                "msg": "Empty form fills"
            });
        }

        try {
            // console.log("entered in try");
            var [user, field] = await connection.query('SELECT * FROM manualUpdateUser WHERE email = ?', [email]);
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
                    // console.log("email is :", email);
                    // console.log("password is", password);
                    var [rows, fields] = await connection.query(`INSERT INTO manualUpdateUser (username, email, password) VALUES(?,?,?)`,
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
    getAllSystemUser: async (req, res) => {
        // console.log(" get api called");
        // console.log(req.body);
        if (req.user.newUser.username !== "admin") {
            return res.json({
                "success": false,
                "msg": "Unauthorized request",
            })
        } else {
            try {
                // console.log("Entered try");
                const getQuery = "SELECT idlogin,username,email FROM manualUpdateUser;"
                const [rows, fields] = await connection.query(getQuery);
                return res.json({
                    "success": true,
                    "msg": "successfully fetched system users",
                    "rows": JSON.stringify(rows),
                })
            }
            catch (err) {
                // console.log("error occured");
                res.json({
                    "success": false,
                    "msg": "failed to fetch",
                    "err": JSON.stringify(err),
                })
            }
        }

    },
    deleteSystemUser: async (req, res) => {
        // console.log("delete called");
        if (req.user.newUser.username !== "admin") {
            return res.json({
                "success": false,
                "msg": "Unauthorized request",
            })
        } else {
            try {

                const getQuery = "DELETE FROM manualUpdateUser WHERE idlogin=?;"
                const [rows, fields] = await connection.query(getQuery, [req.body.row.idlogin]);
                return res.json({
                    "success": true,
                    "msg": `User ${req.body.row.username} deleted`,
                    "rows": JSON.stringify(rows),
                })
            }
            catch (err) {
                // console.log("error occured");
                return res.json({
                    "success": false,
                    "msg": "failed to delete",
                    "err": JSON.stringify(err),
                })
            }
        }

    },
    changeUserPassword: async (req, res) => {
        // console.log("user is",req.user);
        const password = req.body.password;
        if (req.user.newUser.username !== "admin") {
            return res.json({
                "success": false,
                "msg": "Unauthorized request",
            })
        } else if (password == null && password.length < 5) {
            return res.json({
                "success": false,
                "msg": "Invalid Password"
            });
        }
        else {
            try {
                var salt = await bcrypt.genSalt(saltRounds);
                var hash = await bcrypt.hash(password, salt);//didnot use callback due to process running in callback hell
                if (hash) {
                    const getQuery = "UPDATE manualUpdateUser SET password=? WHERE idlogin=?;"
                    const [rows, fields] = await connection.query(getQuery, [hash, req.body.row.idlogin]);
                    return res.json({
                        "success": true,
                        "msg": `Password for User ${req.body.row.username} changed`,
                        "rows": JSON.stringify(rows),
                    })
                }
            }
            catch (err) {
                // console.log("error occured");
                return res.json({
                    "success": false,
                    "msg": "failed to delete",
                    "err": JSON.stringify(err),
                })
            }
        }

    },
    LoginUser: async (req, res) => {
        const email = req.body.email;
        try {
            // console.log(email);
            var [user, field] = await connection.query(`SELECT * FROM manualUpdateUser WHERE email = ? or username = ?`, [email, email]);
            if (user.length > 0) {
                // console.log("saved hash is ", user[0].password);
                bcrypt.compare(req.body.password, user[0].password, function (err, value) {
                    if (err) {
                        // console.log(err);
                        throw err;
                    }
                    if (value) {
                        // console.log("password comparison success");
                        var newUser = user[0];
                        delete newUser['password']
                        newUser['loginTime'] = moment();
                        var token = jwt.sign({ newUser }, config.secret,
                            { expiresIn: 1200 }
                            // { expiresIn: 120 }
                        );
                        // console.log("login token is :", token);
                        res.json({
                            success: true,
                            token: token,
                            msg: "User authenticated"
                        });
                    } else {
                        // console.log("wrong password");
                        res.json({
                            success: false,
                            msg: "Authentication Failed, Wrong Password"
                        })
                    }
                });
            }
            else {
                // console.log("user not found");
                res.json({
                    success: false,
                    msg: "Authentication failed, User not found"
                })
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
        passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
            // console.log(jwt_payload);
            return done(null, false);
        })
        );
    },
    authenticateToken: function (req, res, next) {
        if (req.headers.authorization && req.headers.authorization.split(" ")[0] == 'Bearer') {
            var token = req.headers.authorization.split(" ")[1];
            // console.log(" token is", token);
            if (token == null) return res.sendStatus(401);
            jwt.verify(token, config.secret, (err, user) => {
                console.log(err)
                if (err) return res.sendStatus(403)

                req.user = user

                next()
            })
        }
        else {
            return res.sendStatus(401)
        }

    },
    //Api callback function to fetch required data from table login
    getAllUserDetailsOfNpstocks: async (req, res) => {
        try {
            // console.log("Entered npstocks api")
            const getQuery = "SELECT idlogin,username,phone,Date_Format(login.expiry_date,'%Y-%m-%d')as expiry_date FROM login;"
            const [rows, fields] = await connection.query(getQuery);
            res.json({
                "success": true,
                "msg": "successfully fetched user details of npstocks",
                "rows": JSON.stringify(rows),
            })
        }
        catch (err) {
            // console.log("error occured");
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
            // console.log("Entered systemxlite api")
            const getQuery = "SELECT idloginsystemxlt as idlogin,username,phone,Date_Format(loginsystemxlt.expiry_date,'%Y-%m-%d')as expiry_date FROM loginsystemxlt;"
            const [rows, fields] = await connection.query(getQuery);
            res.json({
                "success": true,
                "msg": "successfully fetched user details of Systemxlite",
                "rows": JSON.stringify(rows),
            })
        }
        catch (err) {
            // console.log("error occured");
            res.json({
                "success": false,
                "msg": "failed to fetch",
                "err": JSON.stringify(err),
            })
        }
    },
    //Api callback function to update expiry date based on various constraints
    addExpiryDate: async (req, res) => {
        let updator = req.user.newUser.username;
        let username = req.body.row.username;
        let package = req.body.option;
        let oldDate = req.body.row.expiry_date
        let remarks = req.body.remarks;
        if (isEmpty(oldDate) || isEmpty(req.body.database) || isEmpty(updator) || isEmpty(username) || isEmpty(package)) {
            return res.json({
                "success": false,
                "msg": "Insufficient Data in Payload"
            });
        }else if(package==="fiveDays"&&remarks===""){
            return res.json({
                "success": false,
                "msg": "Please provide reason for awarding 5 days trial"
            });
        }
         else {
            let paymentmethod = req.body.paymentmethod;
            const userTable = req.body.database === "npstocks" ? "login" : "loginsystemxlt";
            const logTable = req.body.database === "npstocks" ? "npstockupdatelogs" : "systemxliteupdatelogs";
            const id = req.body.database === "npstocks" ? "idlogin" : "idloginsystemxlt";
            var new_exp_date = new Date();
            try {
                if (moment(oldDate) < moment()) {
                    new_exp_date = package === "lifeTime" ? moment().add(200, 'years') :
                        package === "oneYear" ? moment().add(1, 'years') : package === "threeMonths" ? moment().add(3, 'months') : moment().add(5, 'days');
                    //  console.log("new expiry date is:",new_exp_date.format('YYYY-MM-DD'));
                }
                else {
                    new_exp_date = package === "lifeTime" ? moment(oldDate).add(200, 'years') :
                        package === "oneYear" ? moment(oldDate).add(1, 'years') : package === "threeMonths" ? moment(oldDate).add(3, 'months') : moment(oldDate).add(5, 'days');
                    // console.log("new expiry date is:",new_exp_date);
                }
              
                updateStateOfTrialUser(userTable, package, username);
                
                const postQuery = `UPDATE ${userTable} SET expiry_date=? WHERE ${id}=?`
                const [rows] = await connection.query(postQuery, [new_exp_date.format('YYYY-MM-DD'), req.body.row.idlogin]);
                var [logrows] = await connection.query(`INSERT INTO ${logTable}(updator,username,package,paymentmethod,remarks)VALUES(?, ?, ?, ?,?)`, [updator, username, package, paymentmethod, remarks]);
                return res.json({
                    "success": true,
                    "msg": "Expiry date successfully extended",
                    "rows": JSON.stringify(rows),
                    "logrows": logrows
                })

            } catch (err) {
                return res.sendStatus(401).json({
                    "success": false,
                    "msg": "Error!! failed to extend expiry date",
                    "err": JSON.stringify(err),

                })

            }

        }
    },
    fetchExpiryUpdateLogs: async (req, res) => {
        var table = req.body.option === 'npstocks' ? "npstockupdatelogs" : "systemxliteupdatelogs"
        try {
            // console.log(table);
            const getQuery = `SELECT updateid,Date_Format(updatedate,'%Y-%m-%d')as updatedate,updator,username,package,paymentmethod,remarks FROM ${table} ORDER BY updateid DESC ;`
            const [rows, fields] = await connection.query(getQuery);
            res.json({
                "success": true,
                "msg": "successfully fetched expiry date update logs",
                "rows": JSON.stringify(rows),
            })
        }
        catch (err) {
            // console.log("error occured");
            res.json({
                "success": false,
                "msg": "failed to fetch logs",
                "err": JSON.stringify(err),
            })
        }
    },
}
function validateEmail(email) {
    //eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const isEmpty = (value) => {
    return (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
    );
};

 const updateStateOfTrialUser = async (table, package,username)=>{
        var conn = await mysql.createConnection(config.xserverdb_config);
        var selectQuery= `SELECT * FROM ${table} WHERE username=?`
        var [rows,fields] = await conn.query(selectQuery, [username]);
        if(rows[0].is_trialuser && package==='fiveDays'){
            console.log('return');
            return null;
        }else{
            var query = `UPDATE ${table} SET is_trialuser=? WHERE username=?`
            var [rows, fields] = await conn.query(query,[false,username]);
        }       
};

module.exports = functions;