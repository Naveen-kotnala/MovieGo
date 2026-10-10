
const mongoose = require('mongoose')

const showTemplateSchema = new mongoose.Schema(
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
    time: {
      type: String,
      required: true,
    },
    ticketPrice: {
      type: Number,
      default: 220,
      required: true,
    },
    totalSeats: {
      type: Number,
      default: 48,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
)

showTemplateSchema.index(
  { movie: 1, cinema: 1, time: 1 },
  { unique: true }
)

module.exports = mongoose.model('ShowTemplate', showTemplateSchema)
