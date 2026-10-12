import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../Navbar'

function AdminShows() {
  const navigate = useNavigate()

  const [shows, setShows] = useState([])
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [showsResponse, moviesResponse] = await Promise.all([
          fetch('https://moviego-backend.onrender.com/api/shows'),
          fetch('https://moviego-backend.onrender.com/api/movies'),
        ])

        const showsData = await showsResponse.json()
        const moviesData = await moviesResponse.json()

        if (!showsResponse.ok) {
          throw new Error(showsData.message || 'Failed to fetch shows')
        }

        if (!moviesResponse.ok) {
          throw new Error(moviesData.message || 'Failed to fetch movies')
        }

        setShows(showsData)
        setMovies(moviesData)
      } catch (error) {
        console.error('Failed to fetch shows:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const getMovieTitle = (movieId) => {
    if (typeof movieId === 'object' && movieId?.title) {
      return movieId.title
    }

    const movie = movies.find((item) => item._id === movieId)

    return movie?.title || 'Unknown Movie'
  }

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this show?'
    )

    if (!confirmed) return

    try {
      setDeletingId(id)

      const token = localStorage.getItem('token')

      const response = await fetch(
        `https://moviego-backend.onrender.com/api/shows/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await response.json()

      if (!response.ok) {
        alert(data.message || 'Failed to delete show')
        return
      }

      setShows((currentShows) =>
        currentShows.filter((show) => show._id !== id)
      )

      alert('Show deleted successfully')
    } catch (error) {
      console.error('Delete show failed:', error)
      alert('Something went wrong')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="min-h-screen bg-[#111111] text-[#f5f1ea]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-5 sm:px-8 py-8 sm:py-12">

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
          <div>
            <Link
              to="/admin"
              className="text-sm text-white/40 hover:text-white transition"
            >
              ← Back to Dashboard
            </Link>

            <p className="text-[#e63946] text-xs uppercase tracking-[0.25em] mt-8">
              Show Management
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3">
              Manage Shows
            </h1>

            <p className="text-white/40 mt-3">
              Create and manage movie showtimes across cinemas.
            </p>
          </div>

          <button
            onClick={() => navigate('/admin/shows/add')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#e63946] hover:bg-[#c92f3b] font-semibold transition"
          >
            + Add Show
          </button>
        </div>

        {loading ? (
          <div className="py-24 text-center text-white/40">
            Loading shows...
          </div>
        ) : shows.length === 0 ? (
          <div className="mt-10 border border-white/10 bg-[#181818] rounded-2xl py-20 text-center">
            <div className="text-4xl">🕐</div>

            <h2 className="text-xl font-semibold mt-5">
              No shows available
            </h2>

            <p className="text-white/40 text-sm mt-2">
              Add a show to start scheduling movies.
            </p>

            <button
              onClick={() => navigate('/admin/shows/add')}
              className="mt-6 px-5 py-3 rounded-xl bg-[#e63946] hover:bg-[#c92f3b] font-semibold transition"
            >
              Add First Show
            </button>
          </div>
        ) : (
          <div className="mt-10 overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[1100px] bg-[#181818]">

              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th className="px-5 py-4 text-xs uppercase tracking-wider text-white/30">
                    Movie
                  </th>

                  <th className="px-5 py-4 text-xs uppercase tracking-wider text-white/30">
                    Cinema
                  </th>

                  <th className="px-5 py-4 text-xs uppercase tracking-wider text-white/30">
                    City
                  </th>

                  <th className="px-5 py-4 text-xs uppercase tracking-wider text-white/30">
                    Date
                  </th>

                  <th className="px-5 py-4 text-xs uppercase tracking-wider text-white/30">
                    Time
                  </th>

                  <th className="px-5 py-4 text-xs uppercase tracking-wider text-white/30">
                    Price
                  </th>

                  <th className="px-5 py-4 text-xs uppercase tracking-wider text-white/30">
                    Seats
                  </th>

                  <th className="px-5 py-4 text-xs uppercase tracking-wider text-white/30">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {shows.map((show) => (
                  <tr
                    key={show._id}
                    className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]"
                  >
                    <td className="px-5 py-5 font-semibold">
                      {getMovieTitle(show.movie)}
                    </td>

                    <td className="px-5 py-5 text-white/60">
                      {show.cinema}
                    </td>

                    <td className="px-5 py-5 text-white/60">
                      📍 {show.city || '—'}
                    </td>

                    <td className="px-5 py-5 text-white/60">
                      {new Date(show.date).toLocaleDateString('en-IN')}
                    </td>

                    <td className="px-5 py-5 text-white/60">
                      {show.time}
                    </td>

                    <td className="px-5 py-5 text-white/60">
                      ₹{show.ticketPrice}
                    </td>

                    <td className="px-5 py-5 text-white/60">
                      {show.bookedSeats?.length || 0}/{show.totalSeats}
                    </td>

                    <td className="px-5 py-5">
                      <div className="flex gap-2">

                        <button
                          onClick={() =>
                            navigate(`/admin/shows/edit/${show._id}`)
                          }
                          className="px-3.5 py-2 rounded-lg border border-white/10 text-sm text-white/70 hover:text-white hover:border-white/30 transition"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(show._id)}
                          disabled={deletingId === show._id}
                          className="px-3.5 py-2 rounded-lg border border-red-500/20 text-sm text-red-400 hover:bg-red-500/10 transition disabled:opacity-40"
                        >
                          {deletingId === show._id ? '...' : 'Delete'}
                        </button>

                      </div>
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

export default AdminShows