// routes/patients.js

const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

// Get all patients
router.get('/', async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Add new patient
router.post('/add', async (req, res) => {
    const { name, age, gender } = req.body;
    const newPatient = new Patient({ name, age, gender });

    try {
        const savedPatient = await newPatient.save();
        res.json(savedPatient);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update patient data
router.post('/update/:id', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        patient.name = req.body.name;
        patient.age = req.body.age;
        patient.gender = req.body.gender;

        await patient.save();
        res.json({ message: 'Patient updated!' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete patient by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const patient = await Patient.findByIdAndDelete(req.params.id);
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        res.json({ message: 'Patient deleted!' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
