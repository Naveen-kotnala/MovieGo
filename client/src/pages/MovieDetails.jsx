import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from './Navbar'

function MovieDetails() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [movie, setMovie] = useState(null)
  const [shows, setShows] = useState([])
  const [loading, setLoading] = useState(true)
  const [showsLoading, setShowsLoading] = useState(true)

  const [selectedCinema, setSelectedCinema] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/movies/${id}`
        )

        if (!response.ok) {
          throw new Error('Movie not found')
        }

        const data = await response.json()
        setMovie(data)
      } catch (error) {
        console.error('Failed to fetch movie:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovie()
  }, [id])

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/shows?movie=${id}`
        )

        if (!response.ok) {
          throw new Error('Shows not found')
        }

        const data = await response.json()
        setShows(data)
      } catch (error) {
        console.error('Failed to fetch shows:', error)
      } finally {
        setShowsLoading(false)
      }
    }

    fetchShows()
  }, [id])

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // const futureShows = shows.filter((show) => {
  //   const showDate = new Date(show.date)
  //   showDate.setHours(0, 0, 0, 0)

  //   return showDate >= today
  // })
  
  const futureShows = shows.filter((show) => {
    const [time, period] = show.time.split(' ')
    let [hours, minutes] = time.split(':').map(Number)

    if (period === 'PM' && hours !== 12) hours += 12
    if (period === 'AM' && hours === 12) hours = 0

    const showDate = new Date(show.date)
    showDate.setHours(hours, minutes, 0, 0)

    return showDate > new Date()
  })


  const cinemas = [
    ...new Set(futureShows.map((show) => show.cinema)),
  ]

//  const dates = Array.from({ length: 7 }, (_, index) => {
//   const date = new Date(today)
//   date.setDate(today.getDate() + index)

//   const dateValue = date.toISOString().split('T')[0]

//   return {
//     value: dateValue,
//     day:
//       index === 0
//         ? 'Today'
//         : date.toLocaleDateString('en-US', {
//             weekday: 'short',
//           }),
//     date: date.getDate(),
//     month: date.toLocaleDateString('en-US', {
//       month: 'short',
//     }),
//   }
// })


  const dates = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today)
    date.setDate(today.getDate() + index)

    // Local date use karo, UTC nahi
    const year = date.getFullYear()
    const monthNumber = String(date.getMonth() + 1).padStart(2, '0')
    const dayNumber = String(date.getDate()).padStart(2, '0')
    const dateValue = `${year}-${monthNumber}-${dayNumber}`

    return {
      value: dateValue,
      day:
        index === 0
          ? 'Today'
          : date.toLocaleDateString('en-US', {
              weekday: 'short',
            }),
      date: date.getDate(),
      month: date.toLocaleDateString('en-US', {
        month: 'short',
      }),
    }
  })


  // const filteredShows = futureShows.filter((show) => {
  //   const showDate = new Date(show.date)
  //     .toISOString()
  //     .split('T')[0]

  //   return (
  //     show.cinema === selectedCinema &&
  //     showDate === selectedDate
  //   )
  // })

  
  const filteredShows = futureShows.filter((show) => {
    const showDate = new Date(show.date)

    // Show ki India/local calendar date nikalo
    const year = showDate.getFullYear()
    const month = String(showDate.getMonth() + 1).padStart(2, '0')
    const day = String(showDate.getDate()).padStart(2, '0')
    const showDateValue = `${year}-${month}-${day}`

    return (
      show.cinema === selectedCinema &&
      showDateValue === selectedDate
    )
  })


  const showtimes = [
    ...new Set(filteredShows.map((show) => show.time)),
  ]

  const selectedShow = filteredShows.find(
    (show) => show.time === selectedTime
  )

  const canContinue = Boolean(
    selectedCinema &&
    selectedDate &&
    selectedTime &&
    selectedShow
  )

  const handleCinemaChange = (cinema) => {
    setSelectedCinema(cinema)
    setSelectedDate('')
    setSelectedTime('')
  }

  const handleDateChange = (date) => {
    setSelectedDate(date)
    setSelectedTime('')
  }

  const handleContinue = () => {
    if (!selectedShow) return

    navigate(`/booking/${selectedShow._id}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111111] text-[#f5f1ea]">
        <Navbar />

        <div className="min-h-[80vh] flex items-center justify-center">
          <p className="text-white/60">
            Loading movie...
          </p>
        </div>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-[#111111] text-[#f5f1ea]">
        <Navbar />

        <div className="min-h-[80vh] flex flex-col items-center justify-center px-5">

          <h1 className="text-3xl font-bold">
            Movie not found
          </h1>

          <button
            onClick={() => navigate('/movies')}
            className="mt-6 px-6 py-3 rounded-full bg-[#e63946] hover:bg-[#c92f3b] transition"
          >
            Back to Movies
          </button>

        </div>
      </div>
    )
  }

  const releaseYear = movie.releaseDate
    ? new Date(movie.releaseDate).getFullYear()
    : 'N/A'

  return (
    <div className="min-h-screen bg-[#111111] text-[#f5f1ea]">

      <Navbar />

      <main className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-10 sm:py-14">

        <div className="mb-8">

          <button
            onClick={() => navigate('/movies')}
            className="text-sm text-white/50 hover:text-white transition"
          >
            ← Back to Movies
          </button>

        </div>

        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-14 items-start">

          {/* Movie Poster */}

          <div className="h-[420px] sm:h-[520px] rounded-[2rem] bg-[#1c1c1c] border border-white/10 relative overflow-hidden">

            {movie.poster ? (
              <img
                src={movie.poster}
                alt={movie.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,#7f1d1d,transparent_50%)]" />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-0 left-0 p-6 sm:p-8">

              <p className="text-[#e63946] text-sm uppercase tracking-[0.25em]">
                MovieGo Pick
              </p>

              <h1 className="text-3xl sm:text-4xl font-bold mt-2">
                {movie.title}
              </h1>

            </div>

          </div>

          {/* Movie Information */}

          <div>

            <p className="text-[#e63946] uppercase tracking-[0.25em] text-xs sm:text-sm">
              {movie.genre?.join(' • ')}
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4">
              {movie.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mt-5 text-sm">

              <span>
                ⭐ {movie.rating}/10
              </span>

              <span className="text-white/30">•</span>

              <span>
                {movie.duration}
              </span>

              <span className="text-white/30">•</span>

              <span>
                {releaseYear}
              </span>

            </div>

            <p className="mt-7 text-white/55 text-base sm:text-lg leading-relaxed max-w-xl">
              {movie.description}
            </p>

            {/* Cast */}

            {movie.cast?.length > 0 && (
              <div className="mt-7">

                <p className="text-sm text-white/40 mb-3">
                  Cast
                </p>

                <div className="flex flex-wrap gap-2">

                  {movie.cast.map((actor, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] text-sm text-white/70"
                    >
                      {actor}
                    </span>
                  ))}

                </div>

              </div>
            )}

            {/* Trailer */}

            {movie.trailerUrl && (
              <button
                onClick={() =>
                  window.open(movie.trailerUrl, '_blank')
                }
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-white hover:border-[#e63946] hover:text-[#e63946] transition"
              >
                ▶ Watch Trailer
              </button>
            )}

            {/* Booking Selection */}

            <section className="mt-10 border-t border-white/10 pt-8">

              {showsLoading ? (
                <p className="text-white/50">
                  Loading showtimes...
                </p>
              ) : futureShows.length === 0 ? (
                <p className="text-white/50">
                  No upcoming shows available for this movie.
                </p>
              ) : (
                <>

                  {/* Cinema */}

                  <div>

                    <p className="text-sm text-white/40 mb-3">
                      Select Cinema
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

                      {cinemas.map((cinema) => {

                        const selected =
                          selectedCinema === cinema

                        return (
                          <button
                            key={cinema}
                            onClick={() =>
                              handleCinemaChange(cinema)
                            }
                            className={`text-left px-5 py-4 rounded-xl border transition ${
                              selected
                                ? 'border-[#e63946] bg-[#e63946]/10'
                                : 'border-white/10 bg-white/[0.02] hover:border-white/30'
                            }`}
                          >

                            <p className="font-medium">
                              {cinema}
                            </p>

                            <p className="text-xs text-white/40 mt-1">
                              MovieGo Cinema
                            </p>

                          </button>
                        )
                      })}

                    </div>

                  </div>

                  {/* Date */}

                  {selectedCinema && (
                    <div className="mt-8">

                      <p className="text-sm text-white/40 mb-3">
                        Select Date
                      </p>

                      <div className="flex gap-3 overflow-x-auto pb-2">

                        {dates.map((item) => {

                          const selected =
                            selectedDate === item.value

                          return (
                            <button
                              key={item.value}
                              onClick={() =>
                                handleDateChange(item.value)
                              }
                              className={`min-w-[82px] px-4 py-3 rounded-xl border transition ${
                                selected
                                  ? 'border-[#e63946] bg-[#e63946]/10'
                                  : 'border-white/10 hover:border-white/30'
                              }`}
                            >

                              <span className="block text-xs text-white/40">
                                {item.day}
                              </span>

                              <span className="block text-lg font-semibold mt-1">
                                {item.date} {item.month}
                              </span>

                            </button>
                          )
                        })}

                      </div>

                    </div>
                  )}

                  {/* Showtime */}

                  {selectedCinema && selectedDate && (
                    <div className="mt-8">

                      <p className="text-sm text-white/40 mb-3">
                        Select Showtime
                      </p>

                      {showtimes.length === 0 ? (
                        <p className="text-white/40 text-sm">
                          No shows available for this selection.
                        </p>
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">

                          {showtimes.map((time) => {

                            const selected =
                              selectedTime === time

                            return (
                              <button
                                key={time}
                                onClick={() =>
                                  setSelectedTime(time)
                                }
                                className={`px-4 py-3 rounded-xl border transition text-sm ${
                                  selected
                                    ? 'border-[#e63946] bg-[#e63946]/10'
                                    : 'border-white/10 hover:border-white/30'
                                }`}
                              >
                                {time}
                              </button>
                            )
                          })}

                        </div>
                      )}

                    </div>
                  )}

                  {/* Continue */}

                  <button
                    disabled={!canContinue}
                    onClick={handleContinue}
                    className={`mt-8 w-full sm:w-auto px-8 py-4 rounded-full font-semibold transition ${
                      canContinue
                        ? 'bg-[#e63946] hover:bg-[#c92f3b]'
                        : 'bg-white/10 text-white/30 cursor-not-allowed'
                    }`}
                  >
                    Continue to Seats →
                  </button>

                </>
              )}

            </section>

          </div>

        </div>

      </main>

    </div>
  )
}

export default MovieDetails