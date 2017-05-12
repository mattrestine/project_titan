// SETUP
var mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');
// SCHEMA
var userSchema = new mongoose.Schema(
    {
        username: String,
        password: String
    }
);
// PASSPORT
userSchema.plugin(passportLocalMongoose);
// MODULE EXPORTS
module.exports = mongoose.model('User', userSchema);