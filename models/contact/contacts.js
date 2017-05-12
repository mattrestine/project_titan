// SETUP
var mongoose = require('mongoose');
// SCHEMA
var contactSchema = new mongoose.Schema(
    {
        email: String,
        phone: String
    }
);
// MODULE EXPORTS
module.exports = mongoose.model('Contact', contactSchema);