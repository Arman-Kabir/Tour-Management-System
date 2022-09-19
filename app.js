const express = require('express');
const app = express();
var cors = require('cors');
const mongoose = require('mongoose');
// middlewares
app.use(express.json());
app.use(cors());


// Schema Design
// const tourSchema = mongoose.Schema({

// })

// routes
const tourRoute = require('./routes/tour.route');

app.get('/', (req, res) => {
    res.send("Route is Working! YaY!");
});

app.use('/api/v1/tour',tourRoute)

module.exports = app;