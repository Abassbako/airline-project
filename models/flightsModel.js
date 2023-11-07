const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    FlightNumber: {
        type: Number,
        required: true
    },
    DepartureAirport: {
        type: String,
        default: "Abuja Airport"
    },
    ArrivalAirport: {
        type: String,
        default: ""
    },
    DepartureDateTime: {
        type: String,
        required: true
    },
    ArrivalDateTime: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true,
        default: 100
    },
    AircraftType: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const flightModel = mongoose.model('flight', flightSchema);

module.exports = flightModel;