// models/Doctor.js

const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    specialty: {
        type: String,
        required: true,
        trim: true,
    },
    contactEmail: {
        type: String,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
    },
    phoneNumber: {
        type: String,
        trim: true,
    },
    availability: {
        type: [String], // e.g., ['Monday', 'Wednesday', 'Friday']
        default: [],
    },
    active: {
        type: Boolean,
        default: true,
    },
    createdByAdmin: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true, // adds createdAt and updatedAt
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
