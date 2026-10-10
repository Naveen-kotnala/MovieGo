const Show = require('../models/Show')


const getShows = async (req, res) => {
  try {
    const { movie, cinema, city, date } = req.query

    const filter = {}

    if (movie) {
      filter.movie = movie
    }

    if (cinema) {
      filter.cinema = cinema
    }

    if (city) {
      filter.city = city
    }

    if (date) {
      const startDate = new Date(date)
      const endDate = new Date(date)

      endDate.setDate(endDate.getDate() + 1)

      filter.date = {
        $gte: startDate,
        $lt: endDate,
      }
    }

    const shows = await Show.find(filter)
      .populate('movie', 'title poster')
      .sort({ date: 1, time: 1 })

    res.status(200).json(shows)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch shows',
      error: error.message,
    })
  }
}

const getShowById = async (req, res) => {
  try {
    const show = await Show.findById(req.params.id)
      .populate('movie', 'title poster')

    if (!show) {
      return res.status(404).json({
        message: 'Show not found',
      })
    }

    res.status(200).json(show)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch show',
      error: error.message,
    })
  }
}

const createShow = async (req, res) => {
  try {
    const {
      movie,
      cinema,
      city,
      date,
      time,
      ticketPrice,
      totalSeats,
    } = req.body

    if (!movie || !cinema || !city || !date || !time) {
      return res.status(400).json({
        message: 'Please fill all required fields',
      })
    }

    const show = await Show.create({
      movie,
      cinema,
      city,
      date,
      time,
      ticketPrice: Number(ticketPrice) || 220,
      totalSeats: Number(totalSeats) || 48,
      bookedSeats: [],
    })

    const populatedShow = await Show.findById(show._id)
      .populate('movie', 'title poster')

    res.status(201).json({
      message: 'Show created successfully',
      show: populatedShow,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Failed to create show',
      error: error.message,
    })
  }
}

const updateShow = async (req, res) => {
  try {
    const show = await Show.findById(req.params.id)

    if (!show) {
      return res.status(404).json({
        message: 'Show not found',
      })
    }

    const updatedShow = await Show.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate('movie', 'title poster')

    res.status(200).json({
      message: 'Show updated successfully',
      show: updatedShow,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Failed to update show',
      error: error.message,
    })
  }
}

const deleteShow = async (req, res) => {
  try {
    const show = await Show.findById(req.params.id)

    if (!show) {
      return res.status(404).json({
        message: 'Show not found',
      })
    }

    await Show.findByIdAndDelete(req.params.id)

    res.status(200).json({
      message: 'Show deleted successfully',
    })
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete show',
      error: error.message,
    })
  }
}

module.exports = {
  getShows,
  getShowById,
  createShow,
  updateShow,
  deleteShow,
}