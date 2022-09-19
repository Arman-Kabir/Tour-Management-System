const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
var colors = require('colors');

const app = require("./app");

// database connection
mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
    console.log(`Database Connection is Successful`.red.bold);
})

// server
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`App is running on port ${port}`.yellow.bold);
})