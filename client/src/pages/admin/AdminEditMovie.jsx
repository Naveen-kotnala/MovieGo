import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Navbar from '../Navbar'

function AdminEditMovie() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    poster: '',
    backdrop: '',
    genre: '',
    language: '',
    duration: '',
    rating: '',
    releaseDate: '',
    cast: '',
    trailerUrl: '',
  })

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/movies/${id}`
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch movie')
        }

        setFormData({
          title: data.title || '',
          description: data.description || '',
          poster: data.poster || '',
          backdrop: data.backdrop || '',
          genre: data.genre?.join(', ') || '',
          language: data.language || '',
          duration: data.duration || '',
          rating: data.rating ?? '',
          releaseDate: data.releaseDate
            ? new Date(data.releaseDate).toISOString().split('T')[0]
            : '',
          cast: data.cast?.join(', ') || '',
          trailerUrl: data.trailerUrl || '',
        })
      } catch (error) {
        console.error('Failed to fetch movie:', error)
        alert('Failed to load movie')
        navigate('/admin/movies')
      } finally {
        setLoading(false)
      }
    }

    fetchMovie()
  }, [id, navigate])

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
      setSaving(true)

      const token = localStorage.getItem('token')

      const response = await fetch(
        `http://localhost:5000/api/movies/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: formData.title,
            description: formData.description,
            poster: formData.poster,
            backdrop: formData.backdrop,
            genre: formData.genre
              .split(',')
              .map((item) => item.trim())
              .filter(Boolean),
            language: formData.language,
            duration: formData.duration,
            rating: Number(formData.rating) || 0,
            releaseDate: formData.releaseDate,
            cast: formData.cast
              .split(',')
              .map((item) => item.trim())
              .filter(Boolean),
            trailerUrl: formData.trailerUrl,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        alert(data.message || 'Failed to update movie')
        return
      }

      alert('Movie updated successfully 🎬')
      navigate('/admin/movies')
    } catch (error) {
      console.error('Update movie failed:', error)
      alert('Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111111] text-[#f5f1ea] flex items-center justify-center">
        Loading movie...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#111111] text-[#f5f1ea]">
      <Navbar />

      <main className="max-w-5xl mx-auto px-5 sm:px-8 py-8 sm:py-12">

        <Link
          to="/admin/movies"
          className="text-sm text-white/40 hover:text-white transition"
        >
          ← Back to Movies
        </Link>

        <div className="mt-8">
          <p className="text-[#e63946] text-xs uppercase tracking-[0.25em]">
            Movie Management
          </p>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3">
            Edit Movie
          </h1>

          <p className="text-white/40 mt-3">
            Update movie information and media details.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 bg-[#181818] border border-white/10 rounded-2xl p-5 sm:p-8"
        >

          <div className="grid sm:grid-cols-2 gap-5">

            <div className="sm:col-span-2">
              <label className="block text-sm text-white/60 mb-2">
                Movie Title *
              </label>

              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="admin-input"
              />
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-2">
                Language *
              </label>

              <input
                name="language"
                value={formData.language}
                onChange={handleChange}
                required
                className="admin-input"
              />
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-2">
                Duration *
              </label>

              <input
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
                placeholder="2h 30m"
                className="admin-input"
              />
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-2">
                Genre *
              </label>

              <input
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                required
                placeholder="Action, Thriller"
                className="admin-input"
              />
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-2">
                Rating
              </label>

              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                min="0"
                max="10"
                step="0.1"
                className="admin-input"
              />
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-2">
                Release Date
              </label>

              <input
                type="date"
                name="releaseDate"
                value={formData.releaseDate}
                onChange={handleChange}
                className="admin-input"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm text-white/60 mb-2">
                Cast
              </label>

              <input
                name="cast"
                value={formData.cast}
                onChange={handleChange}
                placeholder="Actor 1, Actor 2, Actor 3"
                className="admin-input"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm text-white/60 mb-2">
                Poster URL *
              </label>

              <input
                name="poster"
                value={formData.poster}
                onChange={handleChange}
                required
                className="admin-input"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm text-white/60 mb-2">
                Backdrop URL
              </label>

              <input
                name="backdrop"
                value={formData.backdrop}
                onChange={handleChange}
                className="admin-input"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm text-white/60 mb-2">
                Trailer URL
              </label>

              <input
                name="trailerUrl"
                value={formData.trailerUrl}
                onChange={handleChange}
                className="admin-input"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm text-white/60 mb-2">
                Description *
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="5"
                className="admin-input resize-none"
              />
            </div>

          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-8 pt-6 border-t border-white/10">

            <button
              type="button"
              onClick={() => navigate('/admin/movies')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#e63946] hover:bg-[#c92f3b] font-semibold transition disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>

          </div>

        </form>
      </main>
    </div>
  )
}

export default AdminEditMovie