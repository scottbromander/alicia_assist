var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = require('./models/register');
var routes = require('./routes/index');
var users = require('./routes/users');
var register = require('./routes/register');


var app = express();

//Mongo Setup
var mongoURI = "mongodb://localhost:27017/creek_hill_estates";
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function(err){
    console.log('mongodb connection error', err);
});

MongoDB.once('open', function(){
    console.log('mongodb connection open');
});


app.use(session({
    secret: 'secret',
    key: 'user',
    resave: true,
    saveUninitialized: false,
    cookie: {maxAge: 60000, secure: false}
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User.findById(id,function(err, user){
        if(err) done(err);
        done(null,user);
    });
});

passport.use('local', new localStrategy({
        passReqToCallback: true,
        usernameField: 'username'
    },
    function(req, username, password, done){
        User.findOne({ username: username}, function(err, user){
            if(err) throw err;
            if(!user)
                return done(null, false, {message: 'Incorrect username or password'});
            user.comparePassword(password, function(err, isMatch){
                if(err) throw err;
                if(isMatch) return done(null, user);
                else done(null, false, {message: 'Incorrect user name or password'});
            })
        })
    }
));
app.use(bodyParser.json());
app.use('/', routes);
app.use('/users', users);
app.use('/register', register);

app.use(express.static(path.join(__dirname, 'public')));

var server = app.listen(5000, function(){
    var port = server.address().port;
    console.log("listening on port: ", port);
});

module.exports = app;