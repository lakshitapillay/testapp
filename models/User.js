const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const UserSchema = new Schema({
    email:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    createdOn:{
        type: Date,
        default: Date.now()
    },
    location: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    standard: {
        type: String,
        required: true
    },
    lastActive: {
        type: Date,
        required: true
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;