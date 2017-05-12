// SETUP
var mongoose = require('mongoose');
// SCHEMA
var locationSchema = new mongoose.Schema(
    {
        street: String,
        city: String,
        state: String,
        zipcode: String
    }
);
// MODULE EXPORTS
module.exports = mongoose.model('Location', locationSchema);