const Tour = require("../models/tour.model");

const createTour = async (req, res) => {
    const tour = req.body;
    const newTour = new Tour({
        ...tour,
        createAt: new Date().toISOString(),
    });

    try {
        await newTour.save();
        res.status(201).json(newTour);
    } catch (error) {
        res.status(422).json({ message: "Something went wrong!!!" });
    }
};

const getTours = async (req, res) => {
    try {
        const tours = await Tour.find({});
        res.status(200).json(tours);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

module.exports = {
    createTour,
    getTours,
};
