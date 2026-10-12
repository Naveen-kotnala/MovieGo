import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function MyBookings() {
  const navigate = useNavigate()

  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token')

        if (!token) {
          navigate('/login')
          return
        }

        const response = await fetch(
          'https://moviego-backend.onrender.com/api/bookings/my-bookings',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch bookings')
        }

        setBookings(data)
      } catch (error) {
        console.error('Failed to fetch bookings:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [navigate])

  return (
    <div className="min-h-screen bg-[#111111] text-[#f5f1ea]">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#111111]/95 backdrop-blur-md">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-5 sm:px-8 py-4">

          <Link
            to="/"
            className="text-2xl font-bold tracking-tight"
          >
            Movie<span className="text-[#e63946]">Go</span>
          </Link>

          <button
            onClick={() => navigate('/')}
            className="text-sm text-white/50 hover:text-white transition"
          >
            ← Back to Movies
          </button>

        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-5 sm:px-8 py-10 sm:py-14">

        {/* Header */}
        <div>

          <p className="text-[#e63946] text-xs uppercase tracking-[0.25em]">
            Your tickets
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold mt-3">
            My Bookings
          </h1>

          <p className="text-white/40 mt-2">
            All your MovieGo tickets in one place.
          </p>

        </div>

        {/* Loading */}
        {loading ? (
          <div className="py-20 text-center text-white/40">
            Loading your bookings...
          </div>
        ) : bookings.length === 0 ? (

          /* Empty State */
          <div className="mt-10 border border-white/10 rounded-3xl bg-[#181818] p-10 sm:p-14 text-center">

            <div className="mx-auto w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
              <span className="text-2xl">
                🎟️
              </span>
            </div>

            <h2 className="text-2xl font-bold mt-6">
              No bookings yet
            </h2>

            <p className="mt-2 text-white/40">
              Your movie tickets will appear here.
            </p>

            <Link
              to="/"
              className="inline-block mt-7 px-7 py-3 rounded-full bg-[#e63946] hover:bg-[#c92f3b] transition font-semibold"
            >
              Browse Movies
            </Link>

          </div>

        ) : (

          /* Booking List */
          <div className="mt-10 space-y-6">

            {bookings.map((booking) => (

              <div
                key={booking._id}
                className="border border-white/10 rounded-3xl overflow-hidden bg-[#181818] hover:border-white/20 transition"
              >

                <div className="flex flex-col sm:flex-row">

                  {/* Poster */}
                  <div className="sm:w-44 h-60 sm:h-auto shrink-0 bg-[#242424]">

                    {booking.show?.movie?.poster ? (
                      <img
                        src={booking.show.movie.poster}
                        alt={booking.show.movie.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/20">
                        No Poster
                      </div>
                    )}

                  </div>

                  {/* Details */}
                  <div className="p-6 sm:p-7 flex-1">

                    <div className="flex items-start justify-between gap-4">

                      <div>

                        <p className="text-[#e63946] text-xs uppercase tracking-[0.2em]">
                          Movie Ticket
                        </p>

                        <h2 className="text-xl sm:text-2xl font-bold mt-2">
                          {booking.show?.movie?.title}
                        </h2>

                      </div>

                      <span className="shrink-0 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs">
                        Confirmed
                      </span>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-7">

                      <div>
                        <p className="text-xs text-white/35 uppercase tracking-wider">
                          Cinema
                        </p>

                        <p className="mt-1 text-sm">
                          {booking.show?.cinema}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-white/35 uppercase tracking-wider">
                          Showtime
                        </p>

                        <p className="mt-1 text-sm">
                          {booking.show?.time}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-white/35 uppercase tracking-wider">
                          Seats
                        </p>

                        <p className="mt-1 text-sm">
                          {booking.seats?.join(', ')}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-white/35 uppercase tracking-wider">
                          Amount
                        </p>

                        <p className="mt-1 text-lg font-bold">
                          ₹{booking.totalAmount}
                        </p>
                      </div>

                    </div>

                    <div className="mt-7 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

                      <p className="text-xs text-white/30">
                        Booking ID
                      </p>

                      <p className="text-xs text-white/40 font-mono">
                        {booking._id.slice(-10).toUpperCase()}
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </main>

    </div>
  )
}

export default MyBookings