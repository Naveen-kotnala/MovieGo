const express = require('express')

const {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} = require('../controllers/movieController')

const adminMiddleware = require('../middleware/adminMiddleware')

const router = express.Router()

// Public routes
router.get('/', getMovies)
router.get('/:id', getMovieById)

// Admin routes
router.post('/', adminMiddleware, createMovie)
router.put('/:id', adminMiddleware, updateMovie)
router.delete('/:id', adminMiddleware, deleteMovie)

module.exports = router