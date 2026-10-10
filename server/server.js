const express = require('express')
const cors = require('cors')
require('dotenv').config()
const authRoutes = require('./routes/authRoutes')

const connectDB = require('./config/db')

const app = express()
const movieRoutes = require('./routes/movieRoutes')
const showRoutes = require('./routes/showRoutes')
const bookingRoutes = require('./routes/bookingRoutes')


connectDB()

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/movies', movieRoutes)
app.use('/api/shows', showRoutes)
app.use('/api/bookings', bookingRoutes)

app.get('/', (req, res) => {
  res.json({
    message: 'MovieGo API is running 🎬',
  })
})



const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`MovieGo server running on port ${PORT}`)
})