const mongoose = require('mongoose')

const showSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie',
      required: true,
    },

    cinema: {
      type: String,
      required: true,
      trim: true,
    },

  

    date: {
      type: Date,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    ticketPrice: {
      type: Number,
      required: true,
      default: 220,
    },

    totalSeats: {
      type: Number,
      required: true,
      default: 48,
    },

    bookedSeats: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Show', showSchema)