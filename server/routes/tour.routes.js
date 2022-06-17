const router = require('express').Router();
const { createTour, getTours } = require('../controllers/tour.controllers');

router.post('/', createTour)
router.get('/', getTours)

module.exports = router;