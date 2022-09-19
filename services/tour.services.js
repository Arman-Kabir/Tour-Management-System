
const Tour = require('../models/Tour');

exports.getToursService = async () => {
    const tours = await Tour.find({});

    return tours;
};