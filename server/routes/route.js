const express = require('express')
const router = express.Router()
const actions = require('../methods/actions')
const config = require('../config/config');
const jwt = require('jsonwebtoken');

//test api
router.get('/',(req,res)=>{
    res.send("hello world");
})

//@route POST /signup
router.post('/signup',actions.addNewUser)

//@route POST /login
router.post('/login',actions.LoginUser)

//desc getting user information from token and Bearer authorization header 
// router.get('/getuserinfo',actions.getUserInfoFromToken)

//api to fetch required details of all users of npstock
router.get('/user/details/npstock', authenticateToken,actions.getAllUserDetailsOfNpstocks)

//api to fetch required details of all users of systemxlite
router.get('/user/details/systemxlite',actions.getAllUserDetailsOfSystemxlite)

//api to update expiry date of a user of either npstock or systemxlite with post option
router.post('/user/expdate/add',actions.addExpiryDate)

router.post('/updatelog/add',actions.addUpdateLog)

router.post('/updatelogs',actions.fetchExpiryUpdateLogs)

function authenticateToken(req, res, next) {
    if (req.headers.authorization && req.headers.authorization.split(" ")[0] == 'Bearer') {
        var token = req.headers.authorization.split(" ")[1];
        console.log(" token is", token);
        if (token == null) return res.sendStatus(401);
        jwt.verify(token, config.secret, (err, user) => {
            console.log(err)
            if (err) return res.sendStatus(403)

            req.user = user

            next()
        })
    }
    else {
        return res.sendStatus(401)
    }

}

module.exports = router 