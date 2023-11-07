const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 300,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 2048,
    },
    age: {
        type: Number,
        default: 18
    },
    gender: [
        {
            Male: {
                type: Boolean,
                default: true
            },
            Female: {
                type: Boolean,
            },
        },
        {
            required: true,
            default: "Male"
        },
    ]
}, {
    timestamps: true
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;