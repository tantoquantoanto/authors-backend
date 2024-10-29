const mongoose = require("mongoose");
const { type } = require("os");

const UserSchema = new mongoose.Schema(
  {
    name: {
        type: String, 
        required:true
    },

    surname: {
        type: String, 
        required: true
    },


    username: {
      type: String,
      required: true,
      unique: true, 
    },
    email: {
      type: String,
      required: true,
      unique: true, 
    },
    password: {
      type: String,
      required: true, 
      minLegth: 8,
    },

    isActive: {
      type: Boolean,
      required: false

    },
    destinations: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination"
    }],

    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review', 
       
      }
    ],
    role: {
      type: String,
      enum: ['user', 'admin'], 
      default: 'user', 
    },
    img: {
      type: String,
      required: true

    },
  },
  { timestamps: true, strict: true }
);

module.exports = mongoose.model('User', UserSchema, 'users');