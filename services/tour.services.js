
const Tour = require('../models/Tour');






exports.getToursService = async () => {
    const tours = await Tour.find({});

    return tours;
};


exports.createTourService = async (data) => {

    const tour = new Tour({
        name: data.name,
        image: {
            data: data.filename,
            contentType: 'image/png'
        }
    })
    tour.save();

    return tour;
};