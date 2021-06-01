const mysql = require('mysql2/promise');
const dbConfig = require('../config/db_config');
const moment = require('moment');

//this connection is global database connection variable for this page
var connection

const functions = {
    //establish initial connection with database and a test query
    connectDatabase: async () => {
        try {
            connection = await mysql.createConnection(dbConfig.config);
            var testQuery = "SELECT * FROM login;"
            var [rows, fields] = await connection.query(testQuery);
            console.log("successfully connected");
        }
        catch (err) {
            console.error("error occured");
            throw (err);
        }

    },
    addNewUser: function (req, res) {
        console.log(" adduser api called");
        console.log('email is', req.body.email);
        if ((req.body.username == null&&req.body.email == null && req.body.token == null)) {
            res.json({ success: false, msg: 'Enter all fields' })
        }
        else {
            try {
                const getQuery = `INSERT INTO systemUser (username,email,token) VALUES(${req.body.username},${req.body.email},${req.body.token});`
                const [rows, fields] = await connection.query(getQuery);

            }
            catch (e) {
                console.log(e);
            }
            console.log("password and email not null");
            User.findOne({
                email: req.body.email
            },
                function (err, user) {
                    if (err) throw err
                    if (!user) {
                        var newUser = User({
                            email: req.body.email,
                            password: req.body.password
                        });
                        console.log(newUser.email);
                        newUser.save(function (err, newUser) {
                            if (err) {
                                res.json({ success: false, msg: 'failed to save' })
                            }
                            else {
                                res.json({ success: true, msg: 'Successfully Saved' })
                            }
                        })
                    }
                    else {
                        res.json({
                            success: false,
                            msg: "User already exist for this email"
                        })
                    }
                })

        }
    },
    authenticate: function (req, res) {
        console.log(" fetchNew api called");
        console.log('email is', req.body.email);
        User.findOne({
            email: req.body.email
        }, function (err, user) {
            if (err) throw err
            if (!user) {
                res.status(403).send({ success: false, msg: "Authentication failed, User not found" })
            }
            else {
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !(err)) {
                        var newUser = user
                        delete newUser['password']
                        console.log(newUser)
                        var token = jwt.encode(newUser, config.secret)
                        res.json({
                            success: true,
                            token: token,
                            msg: "User authenticated"
                        })

                    }
                    else {
                        return res.status(403).send({
                            success: false,
                            msg: "Authentication Failed, Wrong Password"

                        })
                    }

                })
            }
        })


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
module.exports = functions;
