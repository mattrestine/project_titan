// SETUP
var mongoose = require('mongoose');
// SCHEMA
var businessSchema = new mongoose.Schema(
    {
        bname: String,
        logo: String,
        desc: String,
        video: String,
        url: String,
        address: {
            street: String,
            city: String,
            state: String,
            zipcode: Number
        },
        contact: {
            email: String,
            phone: String
        },
        images: {
            0: String,
            1: String,
            2: String,
            3: String,
            4: String
        },
        owner: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            firstname: String,
            lastname: String
        },
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