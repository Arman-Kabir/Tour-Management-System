const { getToursService, createTourService, getTourDetailsService, updateTourService, getTrendingToursService, getCheapestToursService } = require("../services/tour.services")

const multer = require('multer');

// Storage
const Storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: Storage
}).single('image')



exports.getTours = async (req, res, next) => {
    try {
        let filters = { ...req.query };
        const queries = {};

        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            queries.sortBy = sortBy
        }
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            queries.fields = fields
        }
        if (req.query.page) {
            const { page = 1, limit = 3 } = req.query;
            const skip = (page - 1) * parseInt(limit);
            queries.skip = skip;
            queries.limit = parseInt(limit);
        }

        const tours = await getToursService(filters, queries);

        res.status(200).json({
            status: "Success",
            data: tours
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Can't get data",
            error: error.message
        })
    }
};

exports.createTour = async (req, res, next) => {

    upload(req, res, async (error) => {
        try {
            const result = await createTourService(req.body, req.file);
            // console.log(req.body,"----",req.file);
            res.status(200).json({
                status: "Success",
                message: "Data inserted successfully",
                data: result
            })
        } catch (error) {
            res.status(400).json({
                status: "fail",
                message: "Data is not inserted",
                error: error.message
            })
        }
    })
};

exports.getTourDetails = async (req, res, next) => {
    try {
        const { id } = req.params;
        const tours = await getTourDetailsService(id);

        res.status(200).json({
            status: "Success",
            data: tours
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Can't get data",
            error: error.message
        })
    }
};

exports.updateTour = async (req, res, next) => {

    // if json data is inserted without image
    if (req.body) {
        const { id } = req.params;
        try {
            const tour = await updateTourService(id, req.body);

            res.status(200).json({
                status: "Success",
                data: tour
            })
        } catch (error) {
            res.status(400).json({
                status: "fail",
                message: "Can't get data",
                error: error.message
            })
        }
    }


    // if data is inserted in form-data with image
    upload(req, res, async (error) => {

        try {
            const { id } = req.params;
            const tour = await updateTourService(id, req.body, req.file);

            res.status(200).json({
                status: "Successfully updated",
                data: tour
            })
        } catch (error) {
            res.status(400).json({
                status: "fail",
                message: "Can't update data",
                error: error.message
            })
        }
    })
};






exports.getTrendingTours = async (req, res, next) => {
    try {
        const tours = await getTrendingToursService();
        res.status(200).json({
            status: "Top 3 most viewed Tours",
            data: tours
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Can't get data",
            error: error.message
        })
    }
};

exports.getCheapestTours = async (req, res, next) => {
    try {
        const tours = await getCheapestToursService();
        res.status(200).json({
            status: "Top 3 most cheapest Tours",
            data: tours
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Can't get data",
            error: error.message
        })
    }
};
