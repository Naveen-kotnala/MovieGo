import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

function Movies() {
  const navigate = useNavigate()

  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedLanguage, setSelectedLanguage] = useState('All')

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          'https://moviego-backend.onrender.com/api/movies'
        )

        const data = await response.json()
        setMovies(data)
      } catch (error) {
        console.error('Failed to fetch movies:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  const filteredMovies =
    selectedLanguage === 'All'
      ? movies
      : movies.filter(
          (movie) =>
            movie.language?.toLowerCase() ===
            selectedLanguage.toLowerCase()
        )

  return (
    <div className="min-h-screen bg-[#111111] text-[#f5f1ea]">

      <Navbar />

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-12">

        {/* Header */}
        <div className="mb-10">

          <p className="text-[#e63946] text-sm uppercase tracking-[0.25em] mb-3">
            Explore
          </p>

          <h1 className="text-4xl md:text-5xl font-bold">
            All Movies
          </h1>

          <p className="mt-3 text-white/45 max-w-xl">
            Discover the latest releases, popular titles and stories
            worth watching.
          </p>

        </div>

        {/* Language Filter */}
        <div className="flex flex-wrap items-center gap-3 mb-10">

          <span className="text-sm text-white/40 mr-2">
            Language
          </span>

          {['All', 'Hindi', 'English'].map((language) => {

            const selected = selectedLanguage === language

            return (
              <button
                key={language}
                onClick={() => setSelectedLanguage(language)}
                className={`px-5 py-2.5 rounded-full border text-sm font-medium transition ${
                  selected
                    ? 'bg-[#e63946] border-[#e63946] text-white'
                    : 'border-white/10 text-white/60 hover:border-white/30 hover:text-white'
                }`}
              >
                {language}
              </button>
            )
          })}

        </div>

        {/* Movies */}
        {loading ? (
          <div className="py-20 text-center text-white/40">
            Loading movies...
          </div>
        ) : filteredMovies.length === 0 ? (
          <div className="py-20 text-center">

            <p className="text-xl font-semibold">
              No {selectedLanguage} movies available
            </p>

            <p className="mt-2 text-white/40">
              Try selecting another language.
            </p>

          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {filteredMovies.map((movie) => (

              <div
                key={movie._id}
                onClick={() => navigate(`/movie/${movie._id}`)}
                className="group cursor-pointer rounded-2xl overflow-hidden border border-white/10 bg-[#181818] hover:-translate-y-1 hover:border-white/20 transition duration-300"
              >

                {/* Poster */}
                <div className="h-80 bg-[#242424] relative overflow-hidden">

                  {movie.poster ? (
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-white/20">
                      No Poster
                    </div>
                  )}

                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 text-xs">
                    ★ {movie.rating}
                  </div>

                </div>

                {/* Details */}
                <div className="p-5">

                  <h2 className="text-xl font-semibold group-hover:text-[#e63946] transition">
                    {movie.title}
                  </h2>

                  <p className="mt-2 text-sm text-white/45">
                    {movie.genre?.join(' • ')}
                  </p>

                  <div className="mt-4 flex items-center justify-between text-xs text-white/35">
                    <span>{movie.language}</span>
                    <span>{movie.duration}</span>
                  </div>

                  <div className="mt-5 text-sm font-medium text-[#e63946]">
                    View Movie →
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

export default Movies