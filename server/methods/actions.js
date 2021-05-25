const mysql = require('mysql2/promise');
const dbConfig= require('../config/db_config');

var connection
const functions={
    connectDatabase: async ()=>{
        try{
        connection= await mysql.createConnection(dbConfig.config); 
            var testQuery ="SELECT * FROM login;"
            var [rows,fields]= await connection.query(testQuery);
            console.log("successfully connected");
            console.log(rows[0]);

        }
        catch(err){
            console.error("error occured");
            throw(err);
        }
       
    },
    getAllUserDetailsOfNpstocks:async(req,res)=>{
        try {
            console.log("Entered user details try")
            const getQuery = "SELECT username,phone, Date_Format(login.expiry_date,'%m/%d/%Y')as expiry_date FROM login;"
            const [rows, fields] = await connection.query(getQuery);
            console.log(rows[0]);
            res.json({
                "success":true,
                "msg":"successfully fetched user details of npstock",
                "rows":JSON.stringify(rows),
            })
        }
        catch (err) {
            console.log("error occured");
            res.json({
                "success":false,
                "msg":"failed to fetch",
            })
            console.error(err);
        }
    }  ,
    getAllUserDetailsOfSystemxlite:async(req,res)=>{
        try {
            console.log("Entered user details try")
            const getQuery = "SELECT username,phone,Date_Format(loginsystemxlt.expiry_date,'%m/%d/%Y')as expiry_date FROM loginsystemxlt;"
            const [rows, fields] = await connection.query(getQuery);
            console.log(rows[0]);
            res.json({
                "success":true,
                "msg":"successfully fetched user details of Systemxlite",
                "rows":JSON.stringify(rows),
            })
        }
        catch (err) {
            console.log("error occured");
            res.json({
                "success":false,
                "msg":"failed to fetch",
            })
            console.error(err);
        }
    },
    search:async(req,res)=>{
        try {
            console.log("Entered user search try")
            const getQuery = `SELECT username,phone,expiry_date FROM ${req.body.database} where username like='?%';`
            const [rows, fields] = await connection.query(getQuery,[req.body.value]);
            console.log(rows[0]);
            res.json({
                "success":true,
                "msg":"successfully fetched user details of Systemxlite",
                "rows":JSON.stringify(rows),
            })
        }
        catch (err) {
            console.log("error occured");
            res.json({
                "success":false,
                "msg":"failed to fetch",
            })
            console.error(err);
        }
    }
}
module.exports=functions;