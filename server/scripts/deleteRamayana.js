const mongoose = require('mongoose')
require('dotenv').config()

const Movie = require('../models/Movie')

const deleteMovie = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)

    const result = await Movie.deleteOne({
      title: 'Ramayana: Part 1',
    })

    if (result.deletedCount > 0) {
      console.log('✅ Ramayana: Part 1 deleted')
    } else {
      console.log('⚠️ Ramayana: Part 1 not found')
    }

    await mongoose.disconnect()
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

deleteMovie()