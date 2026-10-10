const mongoose = require('mongoose')
require('dotenv').config()

const Movie = require('./models/Movie')
const Show = require('./models/Show')
const connectDB = require('./config/db')

const cinemas = [
  'PVR Cinemas',
  'INOX',
  'Cinepolis',
]

const times = [
  '10:30 AM',
  '01:45 PM',
  '04:30 PM',
  '07:15 PM',
  '10:00 PM',
]

const dates = [
  new Date('2026-10-06'),
  new Date('2026-10-07'),
  new Date('2026-10-08'),
  new Date('2026-10-09'),
  new Date('2026-10-10'),
]

const seedShows = async () => {
  try {
    await connectDB()

    const movies = await Movie.find({ isActive: true })

    if (movies.length === 0) {
      console.log('❌ No movies found')
      process.exit(1)
    }

    await Show.deleteMany()

    const shows = []

    movies.forEach((movie) => {
      cinemas.forEach((cinema) => {
        dates.forEach((date) => {
          times.forEach((time) => {
            shows.push({
              movie: movie._id,
              cinema,
              date,
              time,
              ticketPrice:
                movie.language === 'Hindi' ? 220 : 250,
              totalSeats: 48,
              bookedSeats: ['A3', 'A4', 'B6', 'C2', 'C3'],
            })
          })
        })
      })
    })

    await Show.insertMany(shows)

    console.log(`✅ ${shows.length} shows added successfully`)
    process.exit(0)
  } catch (error) {
    console.error('❌ Failed to seed shows:', error.message)
    process.exit(1)
  }
}

seedShows()