const router = require("express").Router();
const { createTour, getTours, deleteTour, getRelatedTours, getTour, getToursBySearch, getToursByTag, getToursByUser, likeTour, updateUser } = require("../controllers/tour.controllers");

// public
router.get("/search", getToursBySearch);
router.get("/tag/:tag", getToursByTag);
router.get("/", getTours);
router.get("/:id", getTour);
router.post("/relatedTour", getRelatedTours);

// authentication
router.post("/", createTour);
router.delete("/:id", deleteTour);
router.patch("/:id", updateUser);
router.get("/userTours/:id", getToursByUser);
router.patch("/like/:id", likeTour);

module.exports = router;
