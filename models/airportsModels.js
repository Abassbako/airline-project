const mongoose = require('mongoose');

const airportSchema = new mongoose.Schema({
    AirportCode: {
        type: String,
        default: "AesSha23354--qw8e1",
        required: true
    },
    AirportName: {
        type: String,
        default: "Murtala Muhammed Airport",
        required: true
    },
    City: {
        type: String,
        default: "Lagos",
        required: true
    },
    Country: {
        type: String,
        default: "Nigeria",
        required: true
    },
}, {
    timestamps: true
});

const airportModel = mongoose.model('airport', airportSchema);

module.exports = airportModel;