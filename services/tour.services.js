const Tour = require('../models/Tour');


exports.getToursService = async (filters,queries) => {
    const tours = await Tour.find({}).select(queries.fields).sort(queries.sortBy);

    return tours;
};


exports.createTourService = async (data, file) => {
    // console.log('data===', data);

    const tour = new Tour({
        name: data.name,
        description: data.description,
        image: {
            data: file.filename,
            contentType: 'image/png'
        },
        viewCount: data.viewCount,
        price: data.price
    })
    // tour.save();
    const createdTour = await Tour.create(tour);
    return createdTour;
};

exports.getTourDetailsService = async (id) => {
    const tour = await Tour.find({ _id: id });

    let viewCount;
    if (tour[0].viewCount) {
        viewCount = await parseInt(tour[0].viewCount);
    } else {
        viewCount = 0
    }

    viewCount = viewCount + 1;
    tour[0].viewCount = viewCount;
    tour[0].save();

    return { tour, viewCount };
}



exports.updateTourService = async (id, data) => {
    // console.log(id, data);
    // const tour = await Tour.updateOne({ _id: id }, {$set:data});

    // return tour;
}






exports.getTrendingToursService = async () => {
    const tours = await Tour.find({}).sort({ viewCount: -1 }).limit(3);
    return tours;
};

exports.getCheapestToursService = async () => {
    const tours = await Tour.find({}).sort({ price: 1 }).limit(3);
    return tours;
};