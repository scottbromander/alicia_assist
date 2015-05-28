var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next){
    console.log("here is the console log from index.js");
    res.sendFile(path.join(__dirname, '../public/views/index.html'));
});

router.post('/',
    function(req, res, next) {
        passport.authenticate('local', {
            successRedirect: '/users',
            failureRedirect: '/'
        })(req, res, next)
    }
);

module.exports = router;
