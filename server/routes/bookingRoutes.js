const express = require('express')

const {
  createBooking,
  getMyBookings,
  getAllBookings,
} = require('../controllers/bookingController')

const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')

const router = express.Router()

router.post('/', authMiddleware, createBooking)

router.get('/my-bookings', authMiddleware, getMyBookings)

router.get('/', adminMiddleware, getAllBookings)

module.exports = router