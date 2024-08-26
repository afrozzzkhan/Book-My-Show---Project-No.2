const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');
const theatreRoutes = require('./routes/theatreRoutes');
const showRoutes = require('./routes/showRoutes');
const bookingRoute = require('./routes/bookingRoute');
const helmet = require('helmet');
const crypto = require('crypto');

require('dotenv').config();

app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true }))



// Set up Helmet with the updated Content Security Policy
app.use(
    helmet.contentSecurityPolicy({
      useDefaults: true,
      directives: {
        "font-src": ["'self'", "https://fonts.gstatic.com"],
        "default-src": ["'self'"],
        // Add other directives as needed
      },
    })
);

app.use((req, res, next) => {
    res.setHeader(
      'Content-Security-Policy',
      "default-src 'self'; font-src 'self' https://fonts.gstatic.com"
    );
    next();
});

const dburl = "mongodb+srv://afrozkhanuak:kSMTeKwFukKdZuEC@cluster0.mh481zy.mongodb.net/Scaler?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(dburl).then(function (connection) {
    console.log("connected to db");
}).catch(err => console.log(err));  

app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/theatres', theatreRoutes);
app.use('/api/shows', showRoutes);
app.use('/api/bookings', bookingRoute)


app.listen(8081, ()=>{

    console.log('Server is running');
})

const PORT = process.env.PORT || 8081

const path = require("path");

__dirname = path.resolve();

// render deployment
app.use(express.static('./public'))