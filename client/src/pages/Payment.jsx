import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

function Payment() {
  const navigate = useNavigate()
  const { state } = useLocation()

  const show = state?.show
  const selectedSeats = state?.selectedSeats || []
  const total = state?.total || 0

  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('UPI')

  const handlePayment = async () => {
    try {
      setLoading(true)

      const token = localStorage.getItem('token')

      if (!token) {
        alert('Please login first')
        navigate('/login')
        return
      }

      const response = await fetch(
        'http://localhost:5000/api/bookings',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            showId: show._id,
            seats: selectedSeats,
            totalAmount: total,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        alert(data.message || 'Booking failed')
        return
      }

      navigate('/success', {
        state: {
          booking: data.booking,
          show,
          selectedSeats,
          total,
        },
      })
    } catch (error) {
      console.error('Payment failed:', error)
      alert('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (!show || selectedSeats.length === 0) {
    return (
      <div className="min-h-screen bg-[#111111] text-[#f5f1ea]">

        <Navbar />

        <div className="min-h-[80vh] flex flex-col items-center justify-center px-5">

          <h1 className="text-3xl font-bold">
            Booking details not found
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

  const paymentMethods = [
    'UPI',
    'Credit / Debit Card',
    'Net Banking',
  ]

  return (
    <div className="min-h-screen bg-[#111111] text-[#f5f1ea]">

      <Navbar />

      <main className="max-w-5xl mx-auto px-5 sm:px-8 py-10 sm:py-14">

        <button
          onClick={() => navigate(-1)}
          className="text-sm text-white/50 hover:text-white transition"
        >
          ← Back
        </button>

        <p className="text-[#e63946] text-xs uppercase tracking-[0.25em] mt-8">
          Secure Checkout
        </p>

        <h1 className="text-3xl sm:text-4xl font-bold mt-3">
          Complete Your Booking
        </h1>

        <div className="grid lg:grid-cols-[1fr_0.7fr] gap-8 mt-10">

          {/* Booking Details */}

          <div className="border border-white/10 rounded-2xl p-6 sm:p-8 bg-[#181818]">

            {show.movie?.poster && (
              <img
                src={show.movie.poster}
                alt={show.movie.title}
                className="w-full h-64 object-cover rounded-xl mb-6"
              />
            )}

            <h2 className="text-xl font-semibold">
              {show.movie?.title}
            </h2>

            <div className="mt-6 space-y-4 text-sm">

              <div className="flex justify-between gap-4">
                <span className="text-white/40">
                  Cinema
                </span>

                <span className="text-right">
                  {show.cinema}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-white/40">
                  Showtime
                </span>

                <span>
                  {show.time}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-white/40">
                  Seats
                </span>

                <span className="text-right">
                  {selectedSeats.join(', ')}
                </span>
              </div>

              <div className="border-t border-white/10 pt-4 flex justify-between">
                <span className="text-white/40">
                  Total
                </span>

                <span className="text-xl font-bold">
                  ₹{total}
                </span>
              </div>

            </div>

          </div>

          {/* Payment */}

          <div className="border border-white/10 rounded-2xl p-6 sm:p-8 bg-[#181818]">

            <h2 className="text-xl font-semibold">
              Payment
            </h2>

            <p className="text-white/40 text-sm mt-2">
              Choose your preferred payment method.
            </p>

            <div className="mt-7 space-y-3">

              {paymentMethods.map((method) => {
                const selected = paymentMethod === method

                return (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method)}
                    className={`w-full text-left px-5 py-4 rounded-xl border transition ${
                      selected
                        ? 'border-[#e63946] bg-[#e63946]/10'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">

                      <span>{method}</span>

                      {selected && (
                        <span className="text-[#e63946]">
                          ✓
                        </span>
                      )}

                    </div>
                  </button>
                )
              })}

            </div>

            <button
              onClick={handlePayment}
              disabled={loading}
              className={`w-full mt-8 py-4 rounded-full font-semibold transition ${
                loading
                  ? 'bg-white/10 text-white/30 cursor-not-allowed'
                  : 'bg-[#e63946] hover:bg-[#c92f3b]'
              }`}
            >
              {loading ? 'Processing...' : `Pay ₹${total}`}
            </button>

            <p className="text-center text-xs text-white/25 mt-4">
              🔒 Your booking is securely processed by MovieGo
            </p>

          </div>

        </div>

      </main>

    </div>
  )
}

export default Payment