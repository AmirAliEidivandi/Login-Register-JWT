const Tour = require("../models/tour.model");
const mongoose = require("mongoose");

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
    const { page } = req.body;
    try {
        const limit = 6;
        const startIndex = (Number(page) - 1) * limit;
        const total = await Tour.countDocuments({});
        const tours = await Tour.find().limit(limit).skip(startIndex);
        res.status(200).json({
            data: tours,
            currentPage: Number(page),
            totalTours: total,
            numberOfPages: Math.ceil(total / limit),
        });
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const getTour = async (req, res) => {
    const { id } = req.params;

    try {
        const tour = await Tour.findById(id);
        res.status(200).json(tour);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

const getToursByUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "User doesn't exist" });
    }
    const userTours = await Tour.find({ creator: id });
    res.status(200).json(userTours);
};

const deleteTour = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: `No tour exist with id: ${id}` });
        }
        await Tour.findByIdAndDelete(id);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { title, description, creator, imageFile, tags } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: `No tour exist with id: ${id}` });
        }

        const updateTour = {
            creator,
            title,
            description,
            tags,
            imageFile,
            _id: id,
        };
        await Tour.findByIdAndUpdate(id, updateTour, { new: true, runValidators: true });
        res.status(200).json(updateTour);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

const getToursBySearch = async (req, res) => {
    const { searchQuery } = req.query;
    try {
        const title = new RegExp(searchQuery, "i");
        const tours = await TourModal.find({ title });
        res.json(tours);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
};

const getToursByTag = async (req, res) => {
    const { tag } = req.params;
    try {
        const tours = await TourModal.find({ tags: { $in: tag } });
        res.json(tours);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
};

const getRelatedTours = async (req, res) => {
    const tags = req.body;
    try {
        const tours = await TourModal.find({ tags: { $in: tags } });
        res.json(tours);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
};

const likeTour = async (req, res) => {
    const { id } = req.params;
    try {
        if (!req.userId) {
            return res.json({ message: "User is not authenticated" });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: `No tour exist with id: ${id}` });
        }

        const tour = await TourModal.findById(id);

        const index = tour.likes.findIndex((id) => id === String(req.userId));

        if (index === -1) {
            tour.likes.push(req.userId);
        } else {
            tour.likes = tour.likes.filter((id) => id !== String(req.userId));
        }

        const updatedTour = await TourModal.findByIdAndUpdate(id, tour, {
            new: true,
        });

        res.status(200).json(updatedTour);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports = {
    createTour,
    getTours,
    deleteTour,
    getRelatedTours,
    getTour,
    getToursBySearch,
    getToursByTag,
    getToursByUser,
    likeTour,
    updateUser,
};
