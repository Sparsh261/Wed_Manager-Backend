const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
        unique:true
    },
    authToken:String,
    gender: {
        type: String,
    },
    partner_name: {
        type: String,
    },
    budget: Number,
    date: Date,
    location: String,
    guests: Number,
    guestList: [{
        name:String,
        email:String
    }],
    task: [{
        task:String,
        description:String
    }]
})

const userModel = mongoose.model('Users', userSchema);

module.exports = userModel;