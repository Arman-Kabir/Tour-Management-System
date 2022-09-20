
const Tour = require('../models/Tour');






exports.getToursService = async () => {
    const tours = await Tour.find({});

    return tours;
};


exports.createTourService = async (data) => {
    console.log('data===',data);

    const tour = new Tour({
        name: data.name,
        image: {
            data: data.image,
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

    console.log(tour,viewCount);
    // 
    // console.log(tour);
    // await tour.save();


    return { tour, viewCount };
}