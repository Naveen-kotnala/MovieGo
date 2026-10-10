const Booking = require('../models/Booking')
const Show = require('../models/Show')

const createBooking = async (req, res) => {
  try {
    const { showId, seats, totalAmount } = req.body

    if (!showId || !seats || seats.length === 0) {
      return res.status(400).json({
        message: 'Show and seats are required',
      })
    }

    const show = await Show.findById(showId)

    if (!show) {
      return res.status(404).json({
        message: 'Show not found',
      })
    }

    const alreadyBooked = seats.some((seat) =>
      show.bookedSeats.includes(seat)
    )

    if (alreadyBooked) {
      return res.status(409).json({
        message: 'One or more selected seats are already booked',
      })
    }

    show.bookedSeats.push(...seats)

    await show.save()

    const booking = await Booking.create({
      user: req.user.id,
      show: showId,
      seats,
      totalAmount,
    })

    res.status(201).json({
      message: 'Booking confirmed successfully',
      booking,
    })
} catch (error) {
  console.error('BOOKING ERROR:', error)

  res.status(500).json({
    message: 'Failed to create booking',
    error: error.message,
  })
}
}

const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user.id,
    })
      .populate({
        path: 'show',
        populate: {
          path: 'movie',
          select: 'title poster',
        },
      })
      .sort({ createdAt: -1 })

    res.status(200).json(bookings)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch bookings',
      error: error.message,
    })
  }
}

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email')
      .populate({
        path: 'show',
        populate: {
          path: 'movie',
          select: 'title poster',
        },
      })
      .sort({ createdAt: -1 })

    res.status(200).json(bookings)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch all bookings',
      error: error.message,
    })
  }
}

module.exports = {
  createBooking,
  getMyBookings,
  getAllBookings,
}