const express = require('express')
const router = express.Router()
const actions = require('../methods/actions')
var jwt = require('jwt-simple')

//test api
router.get('/',(req,res)=>{
    res.send("hello world");
})

//@route POST /signup
router.post('/signup',actions.addNewUser)

//@route POST /login
router.post('/login',actions.LoginUser)

//api to fetch required details of all users of npstock
router.get('/user/details/npstock',actions.getAllUserDetailsOfNpstocks)

//api to fetch required details of all users of systemxlite
router.get('/user/details/systemxlite',actions.getAllUserDetailsOfSystemxlite)

//api to update expiry date of a user of either npstock or systemxlite with post option
router.post('/user/expdate/add',actions.addExpiryDate)


module.exports = router 