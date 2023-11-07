const mongoose = require('mongoose');

const aircraftSchema = new mongoose.Schema({
    AircraftType: {
        type: String, 
        required: true
    },
    SeatingCapacity: {
        type: Number,
        default: 80000,
        required: true
    },
    ManufacturingYear: {
        type: String,
        default: "30-10-2023"
    },
}, {
    timestamps: true
});

const aircraftModel = mongoose.model('aircraft', aircraftSchema);

module.exports = aircraftModel;