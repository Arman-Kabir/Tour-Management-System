
const { updateOne } = require('../models/Tour');
const Tour = require('../models/Tour');






exports.getToursService = async () => {
    const tours = await Tour.find({});

    return tours;
};


exports.createTourService = async (data, file) => {
    console.log('data===', data);

    const tour = new Tour({
        name: data.name,
        image: {
            data: file.filename,
            contentType: 'image/png'
        },
        viewCount: data.viewCount
    })
    tour.save();

    return tour;
};

exports.getTourDetailsService = async (id) => {

    const tour = await Tour.find({ _id: id });
    let viewCount = await parseInt(tour[0].viewCount);

    viewCount = viewCount + 1;
    tour[0].viewCount = viewCount;
    tour[0].save();

    console.log(tour, viewCount);
    // 
    // console.log(tour);
    // await tour.save();


    return { tour, viewCount };
}

exports.updateTourService = async (id, data) => {
    console.log(id, data);
    const tour = await Tour.updateOne({ _id: id }, {$set:data});

    return tour;
}