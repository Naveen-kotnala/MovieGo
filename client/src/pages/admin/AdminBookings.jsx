import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar'

function AdminBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token')

        const response = await fetch(
          'https://moviego-backend.onrender.com/api/bookings',
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
  }, [])

  return (
    <div className="min-h-screen bg-[#111111] text-[#f5f1ea]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-5 sm:px-8 py-8 sm:py-12">

        <Link
          to="/admin"
          className="text-sm text-white/40 hover:text-white transition"
        >
          ← Back to Dashboard
        </Link>

        <div className="mt-8">
          <p className="text-[#e63946] text-xs uppercase tracking-[0.25em]">
            Booking Management
          </p>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3">
            All Bookings
          </h1>

          <p className="text-white/40 mt-3">
            View all movie bookings made on MovieGo.
          </p>
        </div>

        {loading ? (
          <div className="py-24 text-center text-white/40">
            Loading bookings...
          </div>
        ) : bookings.length === 0 ? (
          <div className="mt-10 border border-white/10 bg-[#181818] rounded-2xl py-20 text-center">
            <div className="text-4xl">🎟️</div>

            <h2 className="text-xl font-semibold mt-5">
              No bookings yet
            </h2>

            <p className="text-white/40 text-sm mt-2">
              Customer bookings will appear here.
            </p>
          </div>
        ) : (
          <div className="mt-10 overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[1050px] bg-[#181818]">

              <thead>
                <tr className="border-b border-white/10 text-left">

                  <th className="px-5 py-4 text-xs uppercase tracking-wider text-white/30">
                    Movie
                  </th>

                  <th className="px-5 py-4 text-xs uppercase tracking-wider text-white/30">
                    Customer
                  </th>

                  <th className="px-5 py-4 text-xs uppercase tracking-wider text-white/30">
                    Cinema
                  </th>

                  <th className="px-5 py-4 text-xs uppercase tracking-wider text-white/30">
                    Date
                  </th>

                  <th className="px-5 py-4 text-xs uppercase tracking-wider text-white/30">
                    Time
                  </th>

                  <th className="px-5 py-4 text-xs uppercase tracking-wider text-white/30">
                    Seats
                  </th>

                  <th className="px-5 py-4 text-xs uppercase tracking-wider text-white/30">
                    Amount
                  </th>

                  <th className="px-5 py-4 text-xs uppercase tracking-wider text-white/30">
                    Status
                  </th>

                </tr>
              </thead>

              <tbody>
                {bookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]"
                  >

                    <td className="px-5 py-5 font-semibold">
                      {booking.show?.movie?.title || 'Unknown Movie'}
                    </td>

                    <td className="px-5 py-5">
                      <p>
                        {booking.user?.name || 'Unknown User'}
                      </p>

                      <p className="text-xs text-white/30 mt-1">
                        {booking.user?.email || ''}
                      </p>
                    </td>

                    <td className="px-5 py-5 text-white/60">
                      {booking.show?.cinema || '—'}
                    </td>

                    <td className="px-5 py-5 text-white/60">
                      {booking.show?.date
                        ? new Date(
                            booking.show.date
                          ).toLocaleDateString('en-IN')
                        : '—'}
                    </td>

                    <td className="px-5 py-5 text-white/60">
                      {booking.show?.time || '—'}
                    </td>

                    <td className="px-5 py-5 text-white/60">
                      {booking.seats?.join(', ') || '—'}
                    </td>

                    <td className="px-5 py-5 font-semibold">
                      ₹{booking.totalAmount || 0}
                    </td>

                    <td className="px-5 py-5">
                      <span className="inline-flex px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs">
                        {booking.status || 'Confirmed'}
                      </span>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </main>
    </div>
  )
}

export default AdminBookings