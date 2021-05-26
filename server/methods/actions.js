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
<<<<<<< HEAD
                "err":JSON.stringify(err),
            })
=======
            })
            console.error(err);
>>>>>>> 8c53dd073dea05876b7d7d8c5085ca5ce046b501
        }
    },
    //Api callback function to update expiry date based on various constraints
    addExpiryDate: async (req, res) => {
        try {
<<<<<<< HEAD
=======
            console.log(req.body);
>>>>>>> 8c53dd073dea05876b7d7d8c5085ca5ce046b501
            console.log("Entered edit exp date api")
            const table = req.body.database === "npstock" ? "login" : "loginsystemxlt";
            const id = req.body.database === "npstock" ? "idlogin" : "idloginsystemxlt";
            var new_exp_date = new Date();
            if (moment(req.body.row.expiry_date) < moment()) {
<<<<<<< HEAD
                new_exp_date = req.body.option === "lifeTime" ? moment().add(1000, 'years') :
                 req.body.option === "oneYear" ? moment().add(1, 'years') : moment().add(5, 'days');
                //  console.log("new expiry date is:",new_exp_date.format('YYYY-MM-DD'));
=======
                console.log("works for", req.body.row.expiry_date);
                new_exp_date = req.body.option === "lifeTime" ? moment().add(1000, 'years') :
                 req.body.option === "oneYear" ? moment().add(1, 'years') : moment().add(5, 'days');
                 console.log("new expiry date is:",new_exp_date.format('YYYY-MM-DD'));
>>>>>>> 8c53dd073dea05876b7d7d8c5085ca5ce046b501
            }
            else{
                new_exp_date = req.body.option === "lifeTime" ? moment(req.body.row.expiry_date).add(1000, 'years') :
                req.body.option === "oneYear" ? moment(req.body.row.expiry_date).add(1, 'years') : moment(req.body.row.expiry_date).add(5, 'days');
<<<<<<< HEAD
                // console.log("new expiry date is:",new_exp_date);
            }
            // console.log("new expiry date is:",new_exp_date.format('YYYY-MM-DD'));
            const postQuery = `UPDATE ${table} SET expiry_date=? WHERE ${id}=?`
            const [rows, fields] = await connection.query(postQuery,[new_exp_date.format('YYYY-MM-DD'),req.body.row.idlogin]);
=======
                console.log("new expiry date is:",new_exp_date);
            }
            console.log("new expiry date is:",new_exp_date.format('YYYY-MM-DD'));
            const postQuery = `UPDATE ${table} SET expiry_date=? WHERE ${id}=?`
            const [rows, fields] = await connection.query(postQuery,[new_exp_date.format('YYYY-MM-DD'),req.body.row.idlogin]);
            console.log(rows);
>>>>>>> 8c53dd073dea05876b7d7d8c5085ca5ce046b501
            res.json({
                "success": true,
                "msg": "Expiry date successfully extended",
                "rows": JSON.stringify(rows),
<<<<<<< HEAD
                "fields":JSON.stringify(fields)
=======
                "fields":fields
>>>>>>> 8c53dd073dea05876b7d7d8c5085ca5ce046b501
            })



        }
        catch (err) {
            console.log("error occured");
            res.json({
                "success": false,
                "msg": "Error!! failed to extend expiry date",
<<<<<<< HEAD
                "err":JSON.stringify(err),

            })
=======
            })
            console.error(err);
>>>>>>> 8c53dd073dea05876b7d7d8c5085ca5ce046b501
        }

    }
}
module.exports = functions;