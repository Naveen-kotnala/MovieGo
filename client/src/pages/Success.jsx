import { useLocation, useNavigate } from 'react-router-dom'

function Success() {
  const navigate = useNavigate()
  const { state } = useLocation()

  const booking = state?.booking
  const show = state?.show
  const selectedSeats = state?.selectedSeats || []
  const total = state?.total || booking?.totalAmount || 0

  if (!show) {
    return (
      <div className="min-h-screen bg-[#111111] text-[#f5f1ea] flex items-center justify-center px-5">
        <div className="text-center">

          <h1 className="text-3xl font-bold">
            Booking not found
          </h1>

          <p className="text-white/40 mt-3">
            Your booking details are unavailable.
          </p>

          <button
            onClick={() => navigate('/')}
            className="mt-6 px-6 py-3 rounded-full bg-[#e63946] hover:bg-[#c92f3b] transition font-semibold"
          >
            Back to Home
          </button>

        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#111111] text-[#f5f1ea]">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#111111]/95 backdrop-blur-md">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-5 sm:px-8 py-4">

          <button
            onClick={() => navigate('/')}
            className="text-2xl font-bold tracking-tight"
          >
            Movie<span className="text-[#e63946]">Go</span>
          </button>

          <button
            onClick={() => navigate('/bookings')}
            className="text-sm text-white/50 hover:text-white transition"
          >
            My Bookings
          </button>

        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-5 sm:px-8 py-12 sm:py-16">

        {/* Success Header */}
        <div className="text-center">

          <div className="mx-auto w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
            <span className="text-3xl text-green-400">
              ✓
            </span>
          </div>

          <p className="mt-6 text-green-400 text-xs uppercase tracking-[0.25em]">
            Booking Confirmed
          </p>

          <h1 className="mt-3 text-4xl sm:text-5xl font-bold">
            You're all set! 🎬
          </h1>

          <p className="mt-4 text-white/40">
            Your movie tickets have been booked successfully.
          </p>

        </div>

        {/* Ticket */}
        <div className="mt-12 bg-[#181818] border border-white/10 rounded-3xl overflow-hidden">

          <div className="flex flex-col sm:flex-row">

            {/* Poster */}
            <div className="sm:w-48 h-64 sm:h-auto shrink-0 bg-[#242424]">

              {show.movie?.poster && (
                <img
                  src={show.movie.poster}
                  alt={show.movie.title}
                  className="w-full h-full object-cover"
                />
              )}

            </div>

            {/* Details */}
            <div className="p-6 sm:p-8 flex-1">

              <div className="flex items-start justify-between gap-4">

                <div>
                  <p className="text-[#e63946] text-xs uppercase tracking-[0.2em]">
                    Movie Ticket
                  </p>

                  <h2 className="text-2xl sm:text-3xl font-bold mt-2">
                    {show.movie?.title}
                  </h2>
                </div>

                <span className="shrink-0 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs">
                  Confirmed
                </span>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">

                <div>
                  <p className="text-xs text-white/35 uppercase tracking-wider">
                    Cinema
                  </p>
                  <p className="mt-1 font-medium">
                    {show.cinema}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-white/35 uppercase tracking-wider">
                    Showtime
                  </p>
                  <p className="mt-1 font-medium">
                    {show.time}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-white/35 uppercase tracking-wider">
                    Seats
                  </p>
                  <p className="mt-1 font-medium">
                    {selectedSeats.join(', ')}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-white/35 uppercase tracking-wider">
                    Total Paid
                  </p>
                  <p className="mt-1 text-xl font-bold">
                    ₹{total}
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* Booking ID */}
          {booking?._id && (
            <div className="border-t border-white/10 px-6 sm:px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <span className="text-xs text-white/35 uppercase tracking-wider">
                Booking ID
              </span>

              <span className="text-sm text-white/60 font-mono">
                {booking._id.slice(-10).toUpperCase()}
              </span>
            </div>
          )}

        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">

          <button
            onClick={() => navigate('/bookings')}
            className="px-7 py-3.5 rounded-full bg-[#e63946] hover:bg-[#c92f3b] transition font-semibold"
          >
            View My Bookings
          </button>

          <button
            onClick={() => navigate('/')}
            className="px-7 py-3.5 rounded-full border border-white/10 hover:bg-white/5 transition font-semibold"
          >
            Back to Home
          </button>

        </div>

      </main>

    </div>
  )
}

export default Success