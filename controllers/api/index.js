const router = require('express').Router();

const criticRoutes = require('./critic-routes.js');
const movieRoutes = require('./movie-routes');
const reviewRoutes = require('./review-routes');

router.use('/critics', criticRoutes);
router.use('/movies', movieRoutes);
router.use('/reviews', reviewRoutes);

module.exports = router;