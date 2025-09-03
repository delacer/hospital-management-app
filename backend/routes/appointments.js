// routes/appointments.js

const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Get all appointments
router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Add new appointment
router.post('/add', async (req, res) => {
    const { patientName, doctorName, date } = req.body;
    const newAppointment = new Appointment({ patientName, doctorName, date });

    try {
        const savedAppointment = await newAppointment.save();
        res.json(savedAppointment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update appointment data
router.post('/update/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) return res.status(404).json({ error: 'Appointment not found' });

        appointment.patientName = req.body.patientName;
        appointment.doctorName = req.body.doctorName;
        appointment.date = req.body.date;

        await appointment.save();
        res.json({ message: 'Appointment updated!' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete appointment
router.delete('/delete/:id', async (req, res) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id);
        res.json({ message: 'Appointment deleted.' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
