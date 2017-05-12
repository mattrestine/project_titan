// SETUP
var mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');
// SCHEMA
var userSchema = new mongoose.Schema(
    {
        username: String,
        password: String,
        firstname: String,
        lastname: String,
        hasBusiness: false,
        subs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Business'
            }
        ]
    }
);
// PASSPORT
userSchema.plugin(passportLocalMongoose);
// MODULE EXPORTS
module.exports = mongoose.model('User', userSchema);