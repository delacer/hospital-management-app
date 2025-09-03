// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load .env variables

const patientsRouter = require('./routes/patients');
const doctorsRouter = require('./routes/doctors');
const appointmentsRouter = require('./routes/appointments');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => console.error('❌ MongoDB connection error:', err.message));

// Routes
app.use('/patients', patientsRouter);
app.use('/doctors', doctorsRouter);
app.use('/appointments', appointmentsRouter);

// Server listener
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
