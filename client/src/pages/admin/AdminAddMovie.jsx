import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../Navbar'

function AdminAddMovie() {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

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
        'http://localhost:5000/api/movies',
        {
          method: 'POST',
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
            releaseDate: formData.releaseDate || null,
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
        alert(data.message || 'Failed to add movie')
        return
      }

      alert('Movie added successfully 🎬')

      navigate('/admin/movies')
    } catch (error) {
      console.error('Add movie failed:', error)
      alert('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#111111] text-[#f5f1ea]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-5 sm:px-8 py-8 sm:py-12">

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
            Add New Movie
          </h1>

          <p className="text-white/40 mt-3 max-w-2xl">
            Add a new movie to the MovieGo catalogue.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 grid lg:grid-cols-[1fr_340px] gap-8"
        >

          {/* Form */}
          <div className="bg-[#181818] border border-white/10 rounded-2xl p-5 sm:p-7 lg:p-8">

            <div className="grid sm:grid-cols-2 gap-5">

              {/* Title */}
              <div className="sm:col-span-2">
                <label className="block text-sm text-white/60 mb-2">
                  Movie Title *
                </label>

                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Interstellar"
                  className="admin-input"
                />
              </div>

              {/* Language */}
              <div>
                <label className="block text-sm text-white/60 mb-2">
                  Language *
                </label>

                <select
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  required
                  className="admin-input"
                >
                  <option value="">Select language</option>
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Tamil">Tamil</option>
                  <option value="Telugu">Telugu</option>
                  <option value="Malayalam">Malayalam</option>
                  <option value="Kannada">Kannada</option>
                </select>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm text-white/60 mb-2">
                  Duration *
                </label>

                <input
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 2h 49m"
                  className="admin-input"
                />
              </div>

              {/* Genre */}
              <div className="sm:col-span-2">
                <label className="block text-sm text-white/60 mb-2">
                  Genres *
                </label>

                <input
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  required
                  placeholder="Sci-Fi, Drama, Adventure"
                  className="admin-input"
                />

                <p className="text-xs text-white/25 mt-2">
                  Separate multiple genres with commas.
                </p>
              </div>

              {/* Rating */}
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
                  placeholder="e.g. 8.7"
                  className="admin-input"
                />
              </div>

              {/* Release Date */}
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

              {/* Poster */}
              <div className="sm:col-span-2">
                <label className="block text-sm text-white/60 mb-2">
                  Poster URL *
                </label>

                <input
                  name="poster"
                  value={formData.poster}
                  onChange={handleChange}
                  required
                  placeholder="https://..."
                  className="admin-input"
                />
              </div>

              {/* Backdrop */}
              <div className="sm:col-span-2">
                <label className="block text-sm text-white/60 mb-2">
                  Backdrop URL
                </label>

                <input
                  name="backdrop"
                  value={formData.backdrop}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="admin-input"
                />
              </div>

              {/* Cast */}
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

                <p className="text-xs text-white/25 mt-2">
                  Separate names with commas.
                </p>
              </div>

              {/* Trailer */}
              <div className="sm:col-span-2">
                <label className="block text-sm text-white/60 mb-2">
                  Trailer URL
                </label>

                <input
                  name="trailerUrl"
                  value={formData.trailerUrl}
                  onChange={handleChange}
                  placeholder="https://youtube.com/..."
                  className="admin-input"
                />
              </div>

              {/* Description */}
              <div className="sm:col-span-2">
                <label className="block text-sm text-white/60 mb-2">
                  Description *
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Write a short description about the movie..."
                  className="admin-input resize-none"
                />
              </div>

            </div>

            {/* Buttons */}
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
                disabled={loading}
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#e63946] hover:bg-[#c92f3b] font-semibold transition disabled:opacity-50"
              >
                {loading ? 'Adding Movie...' : 'Add Movie'}
              </button>

            </div>

          </div>

          {/* Preview */}
          <aside className="lg:sticky lg:top-24 lg:self-start">

            <div className="bg-[#181818] border border-white/10 rounded-2xl p-5">

              <p className="text-xs uppercase tracking-[0.2em] text-white/30">
                Poster Preview
              </p>

              <div className="mt-5 aspect-[2/3] rounded-xl overflow-hidden bg-[#111111] border border-white/10">

                {formData.poster ? (
                  <img
                    src={formData.poster}
                    alt="Movie poster preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-white/20 px-6 text-center">
                    <span className="text-5xl">🎬</span>
                    <p className="text-sm mt-4">
                      Poster preview will appear here
                    </p>
                  </div>
                )}

              </div>

              {formData.title && (
                <div className="mt-5">
                  <h2 className="font-semibold text-lg">
                    {formData.title}
                  </h2>

                  <p className="text-sm text-white/40 mt-1">
                    {formData.language || 'Language'} •{' '}
                    {formData.duration || 'Duration'}
                  </p>
                </div>
              )}

            </div>

          </aside>

        </form>
      </main>
    </div>
  )
}

export default AdminAddMovie