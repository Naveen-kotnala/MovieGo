
const cron = require('node-cron')
const Show = require('./models/Show')
const Movie = require('./models/Movie')
const ShowTemplate = require('./models/ShowTemplate')

const cinemas = ['PVR Cinemas', 'INOX', 'Cinepolis']

const times = [
  '10:30 AM',
  '01:45 PM',
  '04:30 PM',
  '07:15 PM',
  '10:00 PM',
]

const syncTemplates = async () => {
  const movies = await Movie.find({ isActive: true })

  for (const movie of movies) {
    for (const cinema of cinemas) {
      for (const time of times) {
        await ShowTemplate.updateOne(
          { movie: movie._id, cinema, time },
          {
            $setOnInsert: {
              movie: movie._id,
              cinema,
              time,
              ticketPrice: movie.language === 'Hindi' ? 220 : 250,
              totalSeats: 48,
              isActive: true,
            },
          },
          { upsert: true }
        )
      }
    }
  }

  console.log('MovieGo: Default show templates synced 🎬')
}

const generateShows = async () => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const endDate = new Date(today)
  endDate.setDate(endDate.getDate() + 7)

  const templates = await ShowTemplate.find({ isActive: true })

  for (const template of templates) {
    for (
      let date = new Date(today);
      date < endDate;
      date.setDate(date.getDate() + 1)
    ) {
      const nextDate = new Date(date)
      nextDate.setDate(nextDate.getDate() + 1)

      const existingShow = await Show.findOne({
        movie: template.movie,
        cinema: template.cinema,
        time: template.time,
        date: { $gte: date, $lt: nextDate },
      })

      if (existingShow) continue

      await Show.create({
        movie: template.movie,
        cinema: template.cinema,
        date: new Date(date),
        time: template.time,
        ticketPrice: template.ticketPrice,
        totalSeats: template.totalSeats,
        bookedSeats: [],
      })
    }
  }

  console.log('MovieGo: Rolling 7-day shows generated 🎬')
}

const runScheduler = async () => {
  await syncTemplates()
  await generateShows()
}

const startShowScheduler = () => {
  runScheduler().catch((error) => {
    console.error('MovieGo: Initial scheduler failed:', error)
  })

  cron.schedule('5 0 * * *', () => {
    runScheduler().catch((error) => {
      console.error('MovieGo: Daily scheduler failed:', error)
    })
  })

  console.log('MovieGo: Show scheduler started 🎬')
}

module.exports = startShowScheduler
