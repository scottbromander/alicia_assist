//var express = require('express');
//var router = express.Router();
//
///* GET users listing. */
//router.get('/', function(req, res, next) {
//
//    res.json(req.isAuthenticated());
//});
//
//module.exports = router;

var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var User = require('../models/register');

/* GET users listing. */
router.get('/', function(req, res, next) {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/index'
    });
    res.sendFile(path.resolve(__dirname, '../views/users.html'));
});


router.get('/list', function(req,res, next){
    var search = {};
    var sort = {username: 1};

    if(req.query.username)
        search.username = req.query.username;


    User.find(
        search,
        'username firstName lastName email',
        {
            sort: sort
        },
        function(err, data){
            res.json(data);
        });
});

module.exports = router;
