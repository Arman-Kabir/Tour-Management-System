const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
var colors = require('colors');
// const multer = require('multer');
const app = require("./app");


const Tour = require('./models/Tour');

// database connection
mongoose.connect(process.env.DATABASE).then(() => {
    console.log(`Database Connection is Successful`.red.bold);
});


// server
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`App is running on port ${port}`.yellow.bold);
})