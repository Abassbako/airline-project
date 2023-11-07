const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 30
    },
    LastName: {
        type: String,
        required: true,
        minlength: [8, "LastName must be at least 10 characters"],
        maxlength: 30
    },
    DOB: {
        type: String,
        min: new Date("19-07-2000"),
        max: new Date("19-07-2023"),
        required: true
    },
    Email: {
        type: String,
        required: true,
        minlength: 20,
        maxlength: 100,
        unique: true
    },
    Phone: {
        type: String,
        required: true,
        default: +234,
        min: 0,
        max: 11,
        unique: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('passenger', passengerSchema);