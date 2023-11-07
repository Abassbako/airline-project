const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    passengerId: {
        type: String,
        required: true,
        unique: true
    },
    flightId: {
        type: String,
        required: true,
        unique: true
    },
    seatNumber: {
        type: Number,
        required: true
    },
    ReservationDateandTime: {
        type: String,
        default: '29-01-2002'
    },
    TotalFare: {
        type: Number,
        default: 0.00
    },
}, {
    timestamps: true
});

const reservationModel = mongoose.model('reservation', reservationSchema);

module.exports = reservationModel;