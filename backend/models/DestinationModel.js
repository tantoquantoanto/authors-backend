const mongoose = require("mongoose");

const DestinationModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
            type: String, 
            required: true
        },
        
    category: {
        type: String,
        required: true,
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review' 
    }],
    averageRating: {
        type: Number,
        default: 0
    },
    images: [{
        type: String, 
        required: true
    }]
}, 
{ timestamps: true, strict: true });

module.exports = mongoose.model('Destination', DestinationModel, 'destinations');