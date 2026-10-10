
require('dotenv').config()
const mongoose = require('mongoose')
const Show = require('./models/Show')

async function checkShows() {
  try {
    await mongoose.connect(process.env.MONGO_URI)

    const start = new Date('2026-10-10T00:00:00.000Z')
    const end = new Date('2026-10-11T00:00:00.000Z')

    const count = await Show.countDocuments({
      date: { $gte: start, $lt: end },
    })

    console.log('10 October shows:', count)
  } catch (error) {
    console.error(error.message)
  } finally {
    await mongoose.disconnect()
  }
}

checkShows()
