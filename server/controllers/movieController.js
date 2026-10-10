const Movie = require('../models/Movie')

const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find({ isActive: true }).sort({
      createdAt: -1,
    })

    res.status(200).json(movies)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch movies',
      error: error.message,
    })
  }
}

const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id)

    if (!movie) {
      return res.status(404).json({
        message: 'Movie not found',
      })
    }

    res.status(200).json(movie)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch movie',
      error: error.message,
    })
  }
}

const createMovie = async (req, res) => {
  try {
    const {
      title,
      description,
      poster,
      backdrop,
      genre,
      language,
      duration,
      rating,
      releaseDate,
      cast,
      trailerUrl,
    } = req.body

    if (
      !title ||
      !description ||
      !poster ||
      !genre ||
      !language ||
      !duration
    ) {
      return res.status(400).json({
        message: 'Please fill all required fields',
      })
    }

    const movie = await Movie.create({
      title,
      description,
      poster,
      backdrop,
      genre,
      language,
      duration,
      rating,
      releaseDate,
      cast,
      trailerUrl,
      isActive: true,
    })

    res.status(201).json({
      message: 'Movie created successfully',
      movie,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Failed to create movie',
      error: error.message,
    })
  }
}

const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id)

    if (!movie) {
      return res.status(404).json({
        message: 'Movie not found',
      })
    }

    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )

    res.status(200).json({
      message: 'Movie updated successfully',
      movie: updatedMovie,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Failed to update movie',
      error: error.message,
    })
  }
}

const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id)

    if (!movie) {
      return res.status(404).json({
        message: 'Movie not found',
      })
    }

    movie.isActive = false
    await movie.save()

    res.status(200).json({
      message: 'Movie deleted successfully',
    })
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete movie',
      error: error.message,
    })
  }
}

module.exports = {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
}