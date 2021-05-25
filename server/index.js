const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const actions = require('./methods/actions')

const app = express()   
app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use(cors())

actions.connectDatabase();

app.get('/',(req,res)=>{
    res.send("hello world");
})
app.get('/user/details/npstock',actions.getAllUserDetailsOfNpstocks)
app.get('/user/details/systemxlite',actions.getAllUserDetailsOfSystemxlite)
app.post('user/search',actions.search)

if(process.env.NODE_ENV==='development'){
   app.use( morgan('dev'))  
}
const PORT = process.env.PORT||5000;
app.listen(PORT,console.log(`server running in port ${PORT} in ${process.env.NODE_ENV} mode`))