const express = require('express')
const cors = require('cors')
const dotenv = require("dotenv").config();
const actions = require('./methods/actions')
const routes = require('./routes/route');
const morgan = require('morgan');
const passport= require('passport')

const app = express() 
if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}  
app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use(cors())
app.use(express.static("."));
actions.connectDatabase();
app.use(routes);

app.use(passport.initialize());

const PORT = process.env.PORT||6797;
// const PORT = 6797;
app.listen(PORT,console.log(`server running in port ${PORT} in ${process.env.NODE_ENV} mode`))