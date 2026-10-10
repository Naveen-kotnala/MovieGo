import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../Navbar'

function AdminMovies() {
  const navigate = useNavigate()

  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/movies')
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch movies')
        }

        setMovies(data)
      } catch (error) {
        console.error('Failed to fetch movies:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase())
    )
  }, [movies, search])

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to remove this movie?'
    )

    if (!confirmed) return

    try {
      setDeletingId(id)

      const token = localStorage.getItem('token')

      const response = await fetch(
        `http://localhost:5000/api/movies/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await response.json()

      if (!response.ok) {
        alert(data.message || 'Failed to delete movie')
        return
      }

      setMovies((currentMovies) =>
        currentMovies.filter((movie) => movie._id !== id)
      )
    } catch (error) {
      console.error('Delete movie failed:', error)
      alert('Something went wrong')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="min-h-screen bg-[#111111] text-[#f5f1ea]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-5 sm:px-8 py-8 sm:py-12">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">

          <div>
            <Link
              to="/admin"
              className="text-sm text-white/40 hover:text-white transition"
            >
              ← Back to Dashboard
            </Link>

            <p className="text-[#e63946] text-xs uppercase tracking-[0.25em] mt-8">
              Movie Management
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3">
              Manage Movies
            </h1>

            <p className="text-white/40 mt-3 max-w-xl">
              Add, edit and manage the movies available on MovieGo.
            </p>
          </div>

          <button
            onClick={() => navigate('/admin/movies/add')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#e63946] hover:bg-[#c92f3b] font-semibold transition"
          >
            + Add Movie
          </button>

        </div>

        {/* Search + Count */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">

          <div className="relative w-full sm:max-w-md">
            <input
              type="text"
              placeholder="Search movies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#181818] border border-white/10 rounded-xl px-5 py-3.5 outline-none focus:border-[#e63946] transition placeholder:text-white/25"
            />
          </div>

          <p className="text-sm text-white/40">
            {filteredMovies.length} movie
            {filteredMovies.length !== 1 ? 's' : ''}
          </p>

        </div>

        {/* Movies */}
        {loading ? (
          <div className="py-24 text-center text-white/40">
            Loading movies...
          </div>
        ) : filteredMovies.length === 0 ? (
          <div className="mt-8 border border-white/10 bg-[#181818] rounded-2xl py-20 text-center">
            <div className="text-4xl">🎬</div>

            <h2 className="text-xl font-semibold mt-5">
              No movies found
            </h2>

            <p className="text-white/40 text-sm mt-2">
              Try another search or add a new movie.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mt-8">

            {filteredMovies.map((movie) => (
              <article
                key={movie._id}
                className="group bg-[#181818] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition"
              >

                <div className="relative aspect-[16/10] overflow-hidden bg-black">

                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">

                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-xs">
                      {movie.language}
                    </span>

                    {movie.rating > 0 && (
                      <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-xs">
                        ⭐ {movie.rating}
                      </span>
                    )}

                  </div>
                </div>

                <div className="p-5">

                  <h2 className="font-semibold text-lg truncate">
                    {movie.title}
                  </h2>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {movie.genre?.slice(0, 3).map((genre) => (
                      <span
                        key={genre}
                        className="text-xs text-white/40"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/10">

                    <span className="text-sm text-white/40">
                      {movie.duration}
                    </span>

                    <div className="flex gap-2">

                      <button
                        onClick={() =>
                          navigate(`/admin/movies/edit/${movie._id}`)
                        }
                        className="px-3.5 py-2 rounded-lg border border-white/10 text-sm text-white/70 hover:text-white hover:border-white/30 transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(movie._id)}
                        disabled={deletingId === movie._id}
                        className="px-3.5 py-2 rounded-lg border border-red-500/20 text-sm text-red-400 hover:bg-red-500/10 transition disabled:opacity-40"
                      >
                        {deletingId === movie._id ? '...' : 'Delete'}
                      </button>

                    </div>

                  </div>

                </div>

              </article>
            ))}

          </div>
        )}

      </main>
    </div>
  )
}

export default AdminMovies