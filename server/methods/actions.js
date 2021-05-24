const mysql = require('mysql2/promise');
const dbConfig= require('../config/db_config');

var connection
const functions={
    connectDatabase: async ()=>{
        try{
        connection= await mysql.createConnection(dbConfig.config); 
            var testQuery ="SELECT * FROM income_table;"
            var [rows,fields]= await connection.query(testQuery);
            console.log("successfully connected");
            console.log(rows);

        }
        catch(err){
            console.error("error occured");
            throw(err);
        }
       
    },
    getData:async(req,res)=>{
        try {
            console.log("Entered try")
            const getQuery = "SELECT * FROM income_table;"
            const [rows, fields] = await connection.query(getQuery);
            console.log(rows);
            res.json({
                "success":true,
                "msg":"successfully fetched",
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