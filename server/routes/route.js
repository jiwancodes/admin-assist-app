const express = require('express')
const router = express.Router()
const actions = require('../methods/actions')
const config = require('../config/config');
const jwt = require('jsonwebtoken');

//test api
router.get('/',(req,res)=>{
    res.send("hello world");
})

//@route POST /login
router.post('/login',actions.LoginUser)

//@route POST /signup
router.post('/signup',authenticateToken,actions.addNewUser)
// router.post('/signup',actions.addNewUser)


//api to fetch required details of all users of npstock
router.get('/user/details/npstock', authenticateToken,actions.getAllUserDetailsOfNpstocks)

//api to fetch required details of all users of systemxlite
router.get('/user/details/systemxlite',authenticateToken,actions.getAllUserDetailsOfSystemxlite)

//api to update expiry date of a user of either npstock or systemxlite with post option
router.post('/user/expdate/add',authenticateToken,actions.addExpiryDate)

// router.post('/updatelog/add',authenticateToken,actions.addUpdateLog)

router.post('/getupdatelogs',authenticateToken,actions.fetchExpiryUpdateLogs)

function authenticateToken(req, res, next) {
    if (req.headers.authorization && req.headers.authorization.split(" ")[0] == 'Bearer') {
        var token = req.headers.authorization.split(" ")[1];
        // console.log(" authorization token is", token);
        if (token == null) return res.sendStatus(401);
        jwt.verify(token, config.secret, (err, user) => {
            if (err) return res.json({"error":err});
            else{

                req.user = user
    
                next()
            }

        })
    }
    else {
        return res.sendStatus(401)
    }

}

module.exports = router 