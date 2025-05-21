const mongoose = require('mongoose');

// Define the Movie schema
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  director: {
    type: String,
    required: true,
    trim: true,
  },
  year: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  genre: {
    type: String,
    required: true,
    trim: true,
  },
  comments: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      comment: {
        type: String,
        required: true,
        trim: true,
      },
    },
  ],
});

// Create the Movie model
const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;