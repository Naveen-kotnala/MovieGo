const express = require('express')

const {
  getShows,
  getShowById,
  createShow,
  updateShow,
  deleteShow,
} = require('../controllers/showController')

const adminMiddleware = require('../middleware/adminMiddleware')

const router = express.Router()

// Public routes
router.get('/', getShows)
router.get('/:id', getShowById)

// Admin routes
router.post('/', adminMiddleware, createShow)
router.put('/:id', adminMiddleware, updateShow)
router.delete('/:id', adminMiddleware, deleteShow)

module.exports = router