// models/Patient.js

const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        required: true,
        min: 0,
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other'],
        lowercase: true,
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
    address: {
        type: String,
        trim: true,
    },
    medicalHistory: {
        type: [String], // e.g., ['diabetes', 'hypertension']
        default: [],
    },
    createdByAdmin: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true, // adds createdAt and updatedAt
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
