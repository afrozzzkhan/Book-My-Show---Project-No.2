const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');
const theatreRoutes = require('./routes/theatreRoutes');
const showRoutes = require('./routes/showRoutes');
const bookingRoute = require('./routes/bookingRoute');
const path = require('path');
require('dotenv').config();

app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// MongoDB connection
const dburl = "mongodb+srv://afrozkhanuak:kSMTeKwFukKdZuEC@cluster0.mh481zy.mongodb.net/Scaler?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Increase the timeout
}).then(() => {
    console.log("Connected to the database");
}).catch(err => console.log("Database connection error:", err));

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/theatres', theatreRoutes);
app.use('/api/shows', showRoutes);
app.use('/api/bookings', bookingRoute);

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, 'build')));

// Serve index.html for all other routes (for client-side routing)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});