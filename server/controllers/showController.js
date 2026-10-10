
const Show = require('../models/Show')
const ShowTemplate = require('../models/ShowTemplate')

const getShows = async (req, res) => {
  try {
    const { movie, cinema, date } = req.query
    const filter = {}

    if (movie) filter.movie = movie
    if (cinema) filter.cinema = cinema

    if (date) {
      const startDate = new Date(date)
      startDate.setHours(0, 0, 0, 0)

      const endDate = new Date(startDate)
      endDate.setDate(endDate.getDate() + 1)

      filter.date = { $gte: startDate, $lt: endDate }
    } else {
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const endDate = new Date(today)
      endDate.setDate(endDate.getDate() + 7)

      filter.date = { $gte: today, $lt: endDate }
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
      return res.status(404).json({ message: 'Show not found' })
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
      date,
      time,
      ticketPrice,
      totalSeats,
    } = req.body

    if (!movie || !cinema || !date || !time) {
      return res.status(400).json({
        message: 'Movie, cinema, date and time are required',
      })
    }

    const price = Number(ticketPrice) || 220
    const seats = Number(totalSeats) || 48
    const selectedDate = new Date(date)

    if (Number.isNaN(selectedDate.getTime())) {
      return res.status(400).json({ message: 'Invalid show date' })
    }

    selectedDate.setHours(0, 0, 0, 0)

    const template = await ShowTemplate.findOneAndUpdate(
      { movie, cinema: cinema.trim(), time },
      {
        $set: {
          ticketPrice: price,
          totalSeats: seats,
          isActive: true,
        },
        $setOnInsert: {
          movie,
          cinema: cinema.trim(),
          time,
        },
      },
      {
        upsert: true,
          returnDocument: 'after',
        runValidators: true,
      }
    )

    const nextDate = new Date(selectedDate)
    nextDate.setDate(nextDate.getDate() + 1)

    let show = await Show.findOne({
      movie,
      cinema: cinema.trim(),
      time,
      date: { $gte: selectedDate, $lt: nextDate },
    })

    if (!show) {
      show = await Show.create({
        movie,
        cinema: cinema.trim(),
        date: selectedDate,
        time,
        ticketPrice: price,
        totalSeats: seats,
        bookedSeats: [],
      })
    }

    const populatedShow = await Show.findById(show._id)
      .populate('movie', 'title poster')

    res.status(201).json({
      message: 'Show schedule saved successfully',
      template,
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
    const updatedShow = await Show.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('movie', 'title poster')

    if (!updatedShow) {
      return res.status(404).json({ message: 'Show not found' })
    }

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
      return res.status(404).json({ message: 'Show not found' })
    }

    await Show.findByIdAndDelete(req.params.id)

    res.status(200).json({ message: 'Show deleted successfully' })
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
