const mongoose = require("mongoose");

const allowedGenders = ["M", "F", "not specified"];


const UsersModel = new mongoose.Schema({
 
    name: {
        type: String,
        required: true,
        trime:true
    },

    surname: {
        type: String, 
        required: true,
        trim:true,
    },

    email: {
        type: String, 
        required: true,
        unique:true, 

    },
    dob: {
        type: Date, 
        required: true,

    },

    gender: {
        type: String, 
        required: false, 
        enum: allowedGenders, 
        default: "not specified",
    },

    password: {
        type: String, 
        required: true,
        minLength: 8,
    },

   

}, 
{timestamps: true, strict: true})

module.exports = mongoose.model('usersModel', UsersModel, 'users')
