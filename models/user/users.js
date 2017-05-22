// SETUP
var mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');
// SCHEMA
var userSchema = new mongoose.Schema(
    {
        username: {type: String, required: true},
        password: {type: String, required: true},
        firstname: {type: String, required: true},
        lastname: {type: String, required: true},
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