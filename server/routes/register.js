//var express = require('express');
//var router = express.Router();
//var passport = require('passport');
//var path = require('path');
//var User = require('../models/register');
//
//router.get('/', function(req, res, next){
//    console.log("I got in the get of register.js");
//    res.sendFile(path.resolve(__dirname, '../public/views/register.html'));
//});
//
//router.post('/', function(req,res,next) {
//    console.log(req.query);
//    User.create(req.query, function (err, post) {
//        if (err)
//            next(err);
//        else
//            res.redirect('/users');
//    })
//});
//
//module.exports = router;


var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var Users = require('../models/register');

router.get('/', function(req, res, next){
    console.log("I got in the get of route/register.js");
    res.sendFile(path.resolve(__dirname, '../public/views/register.html'));
});

router.post('/', function(req,res,next) {
    console.log(req.body);
    Users.create(req.body, function (err, post) {
        if (err)
            next(err);
        else
            res.redirect('/users');
    })
});

module.exports = router;