const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

router.get('/', restaurantController.getHome);
router.get('/restaurants', restaurantController.getRestaurants);
router.get('/nearby-restaurants', restaurantController.getNearbyRestaurants);

module.exports = router;
