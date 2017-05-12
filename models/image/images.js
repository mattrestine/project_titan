// SETUP
var mongoose = require('mongoose');
// SCHEMA
var imageSchema = new mongoose.Schema(
    {
        0: String,
        1: String,
        2: String,
        3: String,
        4: String
    }
);
// MODULE EXPORTS
module.exports = mongoose.model('Images', imageSchema);