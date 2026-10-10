const mongoose = require('mongoose')
const axios = require('axios')
require('dotenv').config()

const Movie = require('../models/Movie')

const movies = [
  'Spider-Man: Brand New Day',
  'Avatar: Fire and Ash',
  'Mission: Impossible',
  'Jurassic World Rebirth',
  'Fantastic Four: First Steps',
  'Superman',
  'F1',
  'How to Train Your Dragon',
  'The Batman',
  'Interstellar',
  'Hanuman Ansh',
  'Drishyam 3',
  'Dhurandhar',
  'Mirzapur: The Movie',
  'Border 2',
  
]

const updatePosters = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)

    console.log('MongoDB connected')

    for (const title of movies) {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/search/movie',
          {
            params: {
              query: title,
              language: 'en-US',
            },
            headers: {
              Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
              accept: 'application/json',
            },
          }
        )

        const result = response.data.results.find(
          (movie) => movie.poster_path
        )

        if (!result) {
          console.log(`❌ Poster not found: ${title}`)
          continue
        }

        const posterUrl =
          `https://image.tmdb.org/t/p/w500${result.poster_path}`

        const updatedMovie = await Movie.findOneAndUpdate(
          { title },
          { poster: posterUrl },
          { new: true }
        )

        if (updatedMovie) {
          console.log(`✅ ${title}`)
        } else {
          console.log(`⚠️ Movie not found in MongoDB: ${title}`)
        }
      } catch (error) {
        console.log(`❌ Failed: ${title}`)
      }
    }

    console.log('\n🎬 Poster update completed')
    process.exit(0)
  } catch (error) {
    console.error('Error:', error.message)
    process.exit(1)
  }
}

updatePosters()