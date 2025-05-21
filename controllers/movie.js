//[SECTION] Dependencies and Modules
const Movie = require('../models/movie');
const { errorHandler } = require('../auth');

//[SECTION] Add Movie
module.exports.addMovie = (req, res) => {
  const { title, director, year, description, genre } = req.body;

  const newMovie = new Movie({
    title,
    director,
    year,
    description,
    genre,
  });

  return newMovie
    .save()
    .then((result) => res.status(201).send({ message: 'Movie added successfully', movie: result }))
    .catch((error) => errorHandler(error, req, res));
};

//[SECTION] Get Movies
module.exports.getMovies = (req, res) => {
  return Movie.find()
    .then((movies) => res.status(200).send(movies))
    .catch((error) => errorHandler(error, req, res));
};

//[SECTION] Get Movie
module.exports.getMovie = (req, res) => {
  const { movieId } = req.params;

  return Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        return res.status(404).send({ message: 'Movie not found' });
      }
      res.status(200).send(movie);
    })
    .catch((error) => errorHandler(error, req, res));
};

//[SECTION] Update Movie
module.exports.updateMovie = (req, res) => {
  const { movieId } = req.params;
  const { title, director, year, description, genre } = req.body;

  return Movie.findByIdAndUpdate(
    movieId,
    { title, director, year, description, genre },
    { new: true }
  )
    .then((updatedMovie) => {
      if (!updatedMovie) {
        return res.status(404).send({ message: 'Movie not found' });
      }
      res.status(200).send({ message: 'Movie updated successfully', movie: updatedMovie });
    })
    .catch((error) => errorHandler(error, req, res));
};

//[SECTION] Delete Movie
module.exports.deleteMovie = (req, res) => {
  const { movieId } = req.params;

  return Movie.findByIdAndDelete(movieId)
    .then((deletedMovie) => {
      if (!deletedMovie) {
        return res.status(404).send({ message: 'Movie not found' });
      }
      res.status(200).send({ message: 'Movie deleted successfully' });
    })
    .catch((error) => errorHandler(error, req, res));
};

//[SECTION] Add Comment
module.exports.addComment = (req, res) => {
  const { movieId } = req.params;
  const { comment } = req.body;

  return Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        return res.status(404).send({ message: 'Movie not found' });
      }

      movie.comments.push({ userId: req.user.id, comment });
      return movie.save();
    })
    .then((updatedMovie) => res.status(200).send({ message: 'Comment added successfully', movie: updatedMovie }))
    .catch((error) => errorHandler(error, req, res));
};

//[SECTION] Get Comments
module.exports.getComments = (req, res) => {
  const { movieId } = req.params;

  return Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        return res.status(404).send({ message: 'Movie not found' });
      }
      res.status(200).send(movie.comments);
    })
    .catch((error) => errorHandler(error, req, res));
};