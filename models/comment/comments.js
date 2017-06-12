// SETUP
var mongoose = require('mongoose');
// SCHEMA
var commentSchema = new mongoose.Schema(
{
        text: String,
        author: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            username: String
        },
          created:{
            type: Date,
            default: Date.now
        }   
    });

// MODULE EXPORTS
module.exports = mongoose.model('Comments', commentSchema);