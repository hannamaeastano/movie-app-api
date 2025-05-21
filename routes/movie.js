const express = require('express');
const movieController = require('../controllers/movie');
const { verify, verifyAdmin } = require('../auth');

const router = express.Router();

// Add Movie
router.post('/addMovie', verify, verifyAdmin, movieController.addMovie);

// Get Movies
router.get('/getMovies',  verify, movieController.getMovies);

// Get Movie
router.get('/getMovie/:movieId',  verify, movieController.getMovie);

// Update Movie
router.patch('/updateMovie/:movieId',  verify, verifyAdmin, movieController.updateMovie);

// Delete Movie
router.delete('/deleteMovie/:movieId',  verify, verifyAdmin, movieController.deleteMovie);

// Add Comment
router.patch('/addComment/:movieId', verify, movieController.addComment);

// Get Comments
router.get('/getComments/:movieId', verify, movieController.getComments);

module.exports = router;