const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    poster: {
      type: String,
      required: true,
    },

    backdrop: {
      type: String,
      default: '',
    },

    genre: {
      type: [String],
      required: true,
    },

    language: {
      type: String,
      required: true,
    },

    duration: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      default: 0,
    },

    releaseDate: {
      type: Date,
    },

    cast: {
      type: [String],
      default: [],
    },

    trailerUrl: {
      type: String,
      default: '',
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Movie', movieSchema)