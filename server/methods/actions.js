const mysql = require('mysql2/promise');
const dbConfig = require('../config/db_config');
var bcrypt = require('bcrypt');
const moment = require('moment');


//this connection is global database connection variable for this page
var connection
const functions = {
    //establish initial connection with database and a test query
    connectDatabase: async () => {
        try {
            connection = await mysql.createConnection(dbConfig.mysql_config);
            var testQuery = "SELECT * FROM login;"
            var [rows, fields] = await connection.query(testQuery);
            console.log("successfully connected");
        }
        catch (err) {
            console.error("error occured");
            throw (err);
        }

    },
    addNewUser: async (req, res) => {
        console.log(" adduser api called");
        console.log('email is', req.body.email);
        if ((req.body.username == null && req.body.email == null && req.body.password == null)) {
            res.json({ success: false, msg: 'Enter all fields' })
        }
        else {
            try {
                bcrypt.genSalt(10, function (err, salt) {
                    if (!err) {
                        bcrypt.hash(req.body.password, salt, function (err, hash) {
                            if (!err) {
                                req.body.password = hash
                                console.log("email is :", req.body.email);
                                console.log("username is :", req.body.username);
                                console.log("password is", req.body.password);
                                
                            }
                        })
                    }
                });
               try{
                console.log(req.body.password);
                const getQuery = `INSERT INTO systemUser(username,email,password) VALUES(?,?,?);`
                // const getQuery = `INSERT INTO systemUser(username,email,password) VALUES("Ram badhur","ram@ram.com","ranfanfajn");`;
                                const [rows,fields] = await connection.query(getQuery,[req.body.username,req.body.email,req.body.password]);
                                if (rows) {
                                    res.json({
                                        "success": true,
                                         "msg":'User successfully created',
                                         "fields":fields,
                                         "rows":rows
                                    })
                                }
               }
               catch(err){
                res.json({
                    "success": false,
                    "msg": "User already exist for this email",
                    "error":err
                })

               }

            }
            catch (e) {
                console.log(e);
                res.json({
                    success: false,
                    msg: 'failed to generate hash',
                    error: e
                })
            }
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
module.exports = functions;