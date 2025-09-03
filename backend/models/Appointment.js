// models/Appointment.js

const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true,
        trim: true,
    },
    doctorName: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['scheduled', 'completed', 'cancelled'],
        default: 'scheduled',
    },
    notes: {
        type: String,
        trim: true,
    },
    createdByAdmin: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true, // adds createdAt and updatedAt
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
