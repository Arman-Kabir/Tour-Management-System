const { getToursService } = require("../services/tour.services")


exports.getTours = async (req, res, next) => {
    try {
        const tours = await getToursService();
        
        res.status(200).json({
            status:"Success",
            data:tours
        })
    } catch (error) {
        res.status(400).json({
            status:"fail",
            message:"Can't get data",
            error:error.message
        })
    }
}