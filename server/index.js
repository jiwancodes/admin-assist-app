const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const actions = require('./methods/actions')

const app = express()   
app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use(cors())

actions.connectDatabase();
// app.use(express.static()); //here is important thing - no static directory, because all static :)
// app.use(express.static('public'))

// app.get("/*", function(req, res) {
//     res.sendFile(__dirname + '../public/index.html');
// });

app.get('/',(req,res)=>{
    res.send("hello world");
})
app.get('/user/details/npstock',actions.getAllUserDetailsOfNpstocks)
app.get('/user/details/systemxlite',actions.getAllUserDetailsOfSystemxlite)
app.post('/user/expdate/add',actions.addExpiryDate)

if(process.env.NODE_ENV==='development'){
   app.use( morgan('dev'))  
}
const PORT = process.env.PORT||5000;
app.listen(PORT,console.log(`server running in port ${PORT} in ${process.env.NODE_ENV} mode`))