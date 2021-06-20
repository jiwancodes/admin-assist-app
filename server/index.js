const express = require('express')
const cors = require('cors')
const dotenv = require("dotenv").config();
const actions = require('./methods/actions')
const routes = require('./routes/route');
// const morgan = require('morgan');
// const passport = require('passport');
// const session = require('express-session');


const app = express()
// if (process.env.NODE_ENV === 'development') {
//     app.use(morgan('dev'))
// }
app.use(express.urlencoded({ extended: true }));
// app.use(session({
//     key: 'idlogin',
//     secret: process.env.ENCRYPTION_KEY,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         expires: 60 * 60 * 24,
//     }
// }))
app.use(express.json())
app.use(cors())
app.use(express.static("."));
actions.connectDatabase();
app.use(routes);
// app.use(passport.initialize())
// actions.passportStrategy(passport);

const PORT = process.env.PORT;
// const PORT = 6797;
app.listen(PORT, console.log(`server running in port ${PORT} in ${process.env.NODE_ENV} mode`))