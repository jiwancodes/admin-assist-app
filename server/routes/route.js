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

//api to change password
router.post('/manualupdate/user/edit/password',authenticateToken,actions.changeUserPassword)

//api to delete a system user
router.post('/manualupdate/user/delete',authenticateToken,actions.deleteSystemUser)

//api to fetch all system users
router.get('/manualupdate/user',authenticateToken,actions.getAllSystemUser)


//api to fetch required details of all users of npstocks
router.get('/user/details/npstocks', authenticateToken,actions.getAllUserDetailsOfNpstocks)

//api to fetch required details of all users of systemxlite
router.get('/user/details/systemxlite',authenticateToken,actions.getAllUserDetailsOfSystemxlite)

//api to update expiry date of a user of either npstocks or systemxlite with post option
router.post('/user/expdate/add',authenticateToken,actions.addExpiryDate)

// router.post('/updatelog/add',authenticateToken,actions.addUpdateLog)

router.post('/getupdatelogs',authenticateToken,actions.fetchExpiryUpdateLogs)

function authenticateToken(req, res, next) {
    if (req.headers.authorization && req.headers.authorization.split(" ")[0] == 'Bearer') {
        var token = req.headers.authorization.split(" ")[1];
        // console.log(" authorization token is", token);
        if (token == null) return res.sendStatus(401);
        jwt.verify(token, config.secret, (err, user) => {
            if (err) return res.status(401).send("token expired");
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