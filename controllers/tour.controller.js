const { getToursService, createTourService, getTourDetailsService } = require("../services/tour.services")

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
        const tours = await getToursService();

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
    // console.log(req.body);
    // console.log(req.file);
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
        } else {
            createTourService(req.body,req.file)
                .then(() => res.send("Successfully uploaded"))
                .catch(err => console.log(err))
        }
    })
    // try {
    //     const result = await createTourService(req.body);
    //     console.log(req.body);

    //     res.status(200).json({
    //         status: "Success",
    //         message:"Data inserted successfully",
    //         data: result
    //     })
    // } catch (error) {
    //     res.status(400).json({
    //         status: "fail",
    //         message: "Data is not inserted",
    //         error: error.message
    //     })
    // }
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