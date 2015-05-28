var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
//Search the internets for: Rainbow tables, hashing, password salts, brute force attacks

var UserSchema = new Schema({
    username: { type: String, index: { unique: true } },
    password: { type: String, required: true },
    firstName:{ type: String, required: true },
    lastName: { type: String, required: true },
    email: {type: mongoose.Schema.Types.Mixed, required: true}
});

//this takes the password entered by the user and adds salt and hash to it (make it encrypted)
UserSchema.pre('save', function(next){
    var user = this;
    if(!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err);

            user.password = hash;
            next();
        })
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

console.log('register model loaded');
module.exports = mongoose.model('user', UserSchema);