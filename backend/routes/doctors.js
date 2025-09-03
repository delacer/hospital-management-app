// routes/doctors.js

const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

// Get all doctors
router.get('/', async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.json(doctors);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Add new doctor
router.post('/add', async (req, res) => {
    const { name, specialty } = req.body;
    const newDoctor = new Doctor({ name, specialty });

    try {
        const savedDoctor = await newDoctor.save();
        res.json(savedDoctor);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update doctor data
router.post('/update/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }

        doctor.name = req.body.name;
        doctor.specialty = req.body.specialty;

        await doctor.save();
        res.json({ message: 'Doctor updated!' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete doctor by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndDelete(req.params.id);
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }
        res.json({ message: 'Doctor deleted!' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
