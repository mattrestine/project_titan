// SETUP
var mongoose = require('mongoose');
// SCHEMA
var businessSchema = new mongoose.Schema(
    {
        busname: {type: String, required: true},
        logo: {type: String, required: true},
        desc: {type: String, required: true},
        video: {type: String, required: true},
        url: {type: String, required: true},
        address: {
            street: String,
            city: String,
            state: String,
            zipcode: {type: Number, required: true}
        },
        contact: {
            email: {type: String, required: true},
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