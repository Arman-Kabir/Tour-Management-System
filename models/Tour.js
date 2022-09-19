const mongoose = require("mongoose");

// Schema Design
const tourSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Provide a name for the tour"],
        trim: true,
        unique: [true, "Name must be unique"],
    },
    description: {
        type: true,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price can't be negative"]
    }
}, {
    timestamps: true
});

// Model
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;