const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique:true
    },
    Password: {
        type: String,
        required: true,
        unique:true
    },
    Authtoken:String,
    Gender: {
        type: String,
    },
    Partner_name: {
        type: String,
    },
    Budget: Number,
    Date: Date,
    Category: String,
    Location: String,
    Guests: Number,
})

const userModel = mongoose.model('Users', userSchema);

module.exports = userModel;