const mongoose = require('mongoose');

const crewSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    LastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    Role: {
        type: String,
        required: true,
        default: "Pilot"
    },
    EmployeeId: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('crew', crewSchema);