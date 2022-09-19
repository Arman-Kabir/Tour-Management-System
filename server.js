const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
var colors = require('colors');
const multer = require('multer');
const app = require("./app");


const Tour = require('./models/Tour');

// database connection
mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
    console.log(`Database Connection is Successful`.red.bold);
});


// Storage
const Storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage:Storage
}).single('testImage')


// post route:posting with image
app.post('/upload',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err);
        }else{
            const newImage = new Tour({
                name:req.body.name,
                image:{
                    data:req.file.filename,
                    contentType:'image/png'
                }
            })
            newImage.save()
            .then(()=>res.send("Successfully uploaded"))
            .catch(err=>console.log(err))
        }
    })
})





// server
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`App is running on port ${port}`.yellow.bold);
})