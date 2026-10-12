import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../Navbar'

function AdminAddShow() {
  const navigate = useNavigate()

  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingMovies, setLoadingMovies] = useState(true)

  const [formData, setFormData] = useState({
    movie: '',
    cinema: '',
    city: '',
    date: '',
    time: '',
    ticketPrice: '220',
    totalSeats: '48',
  })

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://moviego-backend.onrender.com/api/movies')
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch movies')
        }

        setMovies(data)
      } catch (error) {
        console.error('Failed to fetch movies:', error)
      } finally {
        setLoadingMovies(false)
      }
    }

    fetchMovies()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      const token = localStorage.getItem('token')

      const response = await fetch(
        'https://moviego-backend.onrender.com/api/shows',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            movie: formData.movie,
            cinema: formData.cinema,
            city: formData.city,
            date: formData.date,
            time: formData.time,
            ticketPrice: Number(formData.ticketPrice),
            totalSeats: Number(formData.totalSeats),
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        alert(data.message || 'Failed to add show')
        return
      }

      alert('Show added successfully 🎬')

      navigate('/admin/shows')
    } catch (error) {
      console.error('Add show failed:', error)
      alert('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#111111] text-[#f5f1ea]">
      <Navbar />

      <main className="max-w-4xl mx-auto px-5 sm:px-8 py-8 sm:py-12">

        <Link
          to="/admin/shows"
          className="text-sm text-white/40 hover:text-white transition"
        >
          ← Back to Shows
        </Link>

        <div className="mt-8">
          <p className="text-[#e63946] text-xs uppercase tracking-[0.25em]">
            Show Management
          </p>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3">
            Add New Show
          </h1>

          <p className="text-white/40 mt-3">
            Schedule a movie at a cinema.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 bg-[#181818] border border-white/10 rounded-2xl p-5 sm:p-8"
        >
          <div className="grid sm:grid-cols-2 gap-5">

            {/* Movie */}
            <div className="sm:col-span-2">
              <label className="block text-sm text-white/60 mb-2">
                Movie *
              </label>

              <select
                name="movie"
                value={formData.movie}
                onChange={handleChange}
                required
                disabled={loadingMovies}
                className="admin-input"
              >
                <option value="">
                  {loadingMovies ? 'Loading movies...' : 'Select movie'}
                </option>

                {movies.map((movie) => (
                  <option key={movie._id} value={movie._id}>
                    {movie.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Cinema */}
            <div>
              <label className="block text-sm text-white/60 mb-2">
                Cinema *
              </label>

              <select
                name="cinema"
                value={formData.cinema}
                onChange={handleChange}
                required
                className="admin-input"
              >
                <option value="">Select cinema</option>
                <option value="PVR">PVR</option>
                <option value="INOX">INOX</option>
                <option value="Cinepolis">Cinepolis</option>
              </select>
            </div>

            {/* City */}
            <div>
              <label className="block text-sm text-white/60 mb-2">
                City *
              </label>

              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="admin-input"
              >
                <option value="">Select city</option>
                <option value="Gwalior">Gwalior</option>
                <option value="Bhopal">Bhopal</option>
                <option value="Indore">Indore</option>
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm text-white/60 mb-2">
                Date *
              </label>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="admin-input"
              />
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm text-white/60 mb-2">
                Showtime *
              </label>

              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="admin-input"
              >
                <option value="">Select time</option>
                <option value="10:30 AM">10:30 AM</option>
                <option value="01:45 PM">01:45 PM</option>
                <option value="04:30 PM">04:30 PM</option>
                <option value="07:15 PM">07:15 PM</option>
                <option value="10:00 PM">10:00 PM</option>
              </select>
            </div>

            {/* Ticket Price */}
            <div>
              <label className="block text-sm text-white/60 mb-2">
                Ticket Price *
              </label>

              <input
                type="number"
                name="ticketPrice"
                value={formData.ticketPrice}
                onChange={handleChange}
                min="1"
                required
                className="admin-input"
              />
            </div>

            {/* Total Seats */}
            <div>
              <label className="block text-sm text-white/60 mb-2">
                Total Seats *
              </label>

              <input
                type="number"
                name="totalSeats"
                value={formData.totalSeats}
                onChange={handleChange}
                min="1"
                required
                className="admin-input"
              />
            </div>

          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-8 pt-6 border-t border-white/10">

            <button
              type="button"
              onClick={() => navigate('/admin/shows')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#e63946] hover:bg-[#c92f3b] font-semibold transition disabled:opacity-50"
            >
              {loading ? 'Adding Show...' : 'Add Show'}
            </button>

          </div>
        </form>
      </main>
    </div>
  )
}

export default AdminAddShow