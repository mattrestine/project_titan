// SETUP
var mongoose = require('mongoose');
// SCHEMA
var businessSchema = new mongoose.Schema(
    {
        name: String,
        logo: String,
        desc: String,
        video: String,
        url: String,
        location: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Location'
            }
        ],
        contact: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Contact'
            }
        ],
        images: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Images'
            }
        ],
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comments'
            }
        ],
        created: 
        {
            type: Date,
            default: Date.now
        }
    }
);
// MODULE EXPORTS
module.exports = mongoose.model('Business', businessSchema);