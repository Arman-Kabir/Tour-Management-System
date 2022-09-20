const Tour = require('../models/Tour');


exports.getToursService = async (filters, queries) => {
    const tours = await Tour.find({})
        .select(queries.fields)
        .sort(queries.sortBy)
        .skip(queries.skip)
        .limit(queries.limit);

    const totalTours = await Tour.countDocuments(filters);
    const pageCount = Math.ceil(totalTours / queries.limit);

    return { pageCount, totalTours, tours };

    // return tours;
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



exports.updateTourService = async (id, data, file) => {
    // console.log(id, data, file);
    // const imageFile  = {
    //     image:file.filename,
    // }
    const tour = await Tour.updateOne({ _id: id }, { $set: data });

    if (file) {
        const tourData = await Tour.find({ _id: id });
        tourData[0].image.data = file.filename;
        tourData[0].save();
        console.log(tourData);
        return tourData;
    } else {
        return tour;
    }


    // const imageUpdate = await Tour.


}






exports.getTrendingToursService = async () => {
    const tours = await Tour.find({}).sort({ viewCount: -1 }).limit(3);
    return tours;
};

exports.getCheapestToursService = async () => {
    const tours = await Tour.find({}).sort({ price: 1 }).limit(3);
    return tours;
};