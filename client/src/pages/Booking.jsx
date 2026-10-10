import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from './Navbar'

function Booking() {
  const navigate = useNavigate()
  const { showId } = useParams()

  const [show, setShow] = useState(null)
  const [selectedSeats, setSelectedSeats] = useState([])
  const [loading, setLoading] = useState(true)

  const rows = ['A', 'B', 'C', 'D', 'E', 'F']
  const seatsPerRow = 8

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/shows/${showId}`
        )

        if (!response.ok) {
          throw new Error('Show not found')
        }

        const data = await response.json()
        setShow(data)
      } catch (error) {
        console.error('Failed to fetch show:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchShow()
  }, [showId])

  const toggleSeat = (seat) => {
    if (show?.bookedSeats?.includes(seat)) return

    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((item) => item !== seat)
        : [...prev, seat]
    )
  }

  const ticketPrice = show?.ticketPrice || 220
  const total = selectedSeats.length * ticketPrice

  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat')
      return
    }

    const token = localStorage.getItem('token')

    if (!token) {
      alert('Please login first')
      navigate('/login')
      return
    }

    navigate('/payment', {
      state: {
        show,
        selectedSeats,
        total,
      },
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111111] text-[#f5f1ea]">
        <Navbar />

        <div className="min-h-[80vh] flex items-center justify-center">
          <p className="text-white/60">
            Loading seats...
          </p>
        </div>
      </div>
    )
  }

  if (!show) {
    return (
      <div className="min-h-screen bg-[#111111] text-[#f5f1ea]">
        <Navbar />

        <div className="min-h-[80vh] flex flex-col items-center justify-center px-5">

          <h1 className="text-3xl font-bold">
            Show not found
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

  return (
    <div className="min-h-screen bg-[#111111] text-[#f5f1ea]">

      <Navbar />

      <main className="max-w-6xl mx-auto px-5 sm:px-8 py-10 sm:py-14">

        {/* Header */}

        <div className="mb-10">

          <button
            onClick={() => navigate(-1)}
            className="text-sm text-white/50 hover:text-white transition"
          >
            ← Back
          </button>

          <div className="mt-7">

            <p className="text-[#e63946] text-sm uppercase tracking-[0.25em]">
              Select your seats
            </p>

            <h1 className="text-3xl sm:text-4xl font-bold mt-2">
              {show.movie?.title}
            </h1>

            <p className="text-white/45 mt-2">
              {show.cinema} • {show.time}
            </p>

          </div>

        </div>

        {/* Seat Layout */}

        <div className="grid lg:grid-cols-[1fr_320px] gap-10 items-start">

          <div className="rounded-3xl border border-white/10 bg-[#181818] p-5 sm:p-8">

            {/* Screen */}

            <div className="mb-12">

              <div className="h-1.5 w-4/5 mx-auto rounded-full bg-white/50" />

              <p className="text-center text-xs text-white/30 mt-3 uppercase tracking-[0.25em]">
                Screen
              </p>

            </div>

            {/* Seats */}

            <div className="flex flex-col gap-4">

              {rows.map((row) => (

                <div
                  key={row}
                  className="flex items-center justify-center gap-2 sm:gap-3"
                >

                  <span className="w-5 text-xs text-white/30">
                    {row}
                  </span>

                  <div className="flex gap-2 sm:gap-3">

                    {Array.from(
                      { length: seatsPerRow },
                      (_, index) => {

                        const seat = `${row}${index + 1}`

                        const isBooked =
                          show.bookedSeats?.includes(seat)

                        const isSelected =
                          selectedSeats.includes(seat)

                        return (
                          <button
                            key={seat}
                            disabled={isBooked}
                            onClick={() => toggleSeat(seat)}
                            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg text-[10px] sm:text-xs font-medium transition ${
                              isBooked
                                ? 'bg-white/10 text-white/20 cursor-not-allowed'
                                : isSelected
                                  ? 'bg-[#e63946] text-white'
                                  : 'border border-white/10 bg-white/[0.03] text-white/50 hover:border-[#e63946] hover:text-white'
                            }`}
                          >
                            {index + 1}
                          </button>
                        )
                      }
                    )}

                  </div>

                </div>

              ))}

            </div>

            {/* Legend */}

            <div className="flex flex-wrap justify-center gap-6 mt-10 text-xs text-white/40">

              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-white/[0.03] border border-white/10" />
                Available
              </div>

              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-[#e63946]" />
                Selected
              </div>

              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-white/10" />
                Occupied
              </div>

            </div>

          </div>

          {/* Booking Summary */}

          <div className="lg:sticky lg:top-24 rounded-3xl border border-white/10 bg-[#181818] p-6">

            <p className="text-sm text-white/40 uppercase tracking-wider">
              Booking Summary
            </p>

            <h2 className="text-xl font-semibold mt-3">
              {show.movie?.title}
            </h2>

            <div className="mt-6 space-y-4 text-sm">

              <div className="flex justify-between">
                <span className="text-white/40">
                  Cinema
                </span>
                <span>
                  {show.cinema}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-white/40">
                  Showtime
                </span>
                <span>
                  {show.time}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-white/40">
                  Seats
                </span>
                <span>
                  {selectedSeats.length > 0
                    ? selectedSeats.join(', ')
                    : 'None'}
                </span>
              </div>

            </div>

            <div className="border-t border-white/10 mt-6 pt-6">

              <div className="flex justify-between items-center">

                <span className="text-white/50">
                  Total
                </span>

                <span className="text-2xl font-bold">
                  ₹{total}
                </span>

              </div>

              <button
                onClick={handleContinue}
                disabled={selectedSeats.length === 0}
                className={`w-full mt-6 py-3.5 rounded-full font-semibold transition ${
                  selectedSeats.length > 0
                    ? 'bg-[#e63946] hover:bg-[#c92f3b]'
                    : 'bg-white/10 text-white/30 cursor-not-allowed'
                }`}
              >
                Continue to Payment →
              </button>

            </div>

          </div>

        </div>

      </main>

    </div>
  )
}

export default Booking