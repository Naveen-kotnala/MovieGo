import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

function Home() {
  const navigate = useNavigate()

  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          'http://localhost:5000/api/movies'
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

  const featuredMovie = movies.find(
  (movie) => movie.title === 'Drishyam: The Conclusion'
)

const popularMovies = [
  movies.find((movie) => movie.title === 'Drishyam: The Conclusion'),
  movies.find((movie) => movie.title === 'Hanuman Ansh'),
  movies.find((movie) => movie.title === 'Mirzapur: The Movie'),
  movies.find((movie) => movie.title === 'Insidious: Out of the Further'),
].filter(Boolean)

  return (
    <div className="min-h-screen bg-[#111111] text-[#f5f1ea]">

      <Navbar />

      {/* Hero */}
      <main>

        <section className="max-w-7xl mx-auto min-h-[72vh] px-6 md:px-12 py-12 lg:py-16 grid lg:grid-cols-[1fr_0.9fr] gap-12 items-center">

          <div>

            <p className="text-[#e63946] text-sm uppercase tracking-[0.3em] mb-6">
              Your movie night starts here
            </p>

            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold leading-[0.9] tracking-tight">
              Find your
              <br />
              <span className="text-white/35">
                next story.
              </span>
            </h1>

            <p className="mt-7 max-w-lg text-white/50 text-base sm:text-lg leading-relaxed">
              Discover movies, explore cinemas and book your perfect seats
              in just a few clicks.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row gap-3">

              <a
                href="#movies"
                className="px-7 py-3.5 bg-[#e63946] rounded-full font-semibold hover:bg-[#c92f3b] transition text-center"
              >
                Browse Movies
              </a>

              <a
                href="#movies"
                className="px-7 py-3.5 border border-white/15 rounded-full font-semibold hover:bg-white/5 transition text-center"
              >
                Explore Now
              </a>

            </div>

          </div>

          {/* Featured Movie */}
          {featuredMovie && (
            <div className="relative">

              <div className="absolute -top-6 -right-4 w-20 h-20 border border-[#e63946]/30 rounded-full" />

              <div className="relative h-[500px] sm:h-[560px] rounded-[2rem] overflow-hidden border border-white/10 bg-[#181818]">

                {featuredMovie.poster && (
                  <img
                    src={featuredMovie.poster}
                    alt={featuredMovie.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                <div className="absolute top-7 left-7">
                  <span className="px-3 py-1.5 rounded-full bg-black/50 border border-white/10 text-xs uppercase tracking-wider">
                    Now Showing
                  </span>
                </div>

                <div className="absolute bottom-7 left-7 right-7">

                  <p className="text-[#e63946] text-sm font-medium">
                    ★ {featuredMovie.rating}
                  </p>

                  <h2 className="text-3xl sm:text-4xl font-bold mt-2">
                    {featuredMovie.title}
                  </h2>

                  <p className="mt-2 text-sm text-white/60">
                    {featuredMovie.genre?.join(' • ')}
                  </p>

                  <button
                    onClick={() =>
                      navigate(`/movie/${featuredMovie._id}`)
                    }
                    className="mt-5 px-6 py-3 rounded-full bg-[#e63946] hover:bg-[#c92f3b] transition font-semibold text-sm"
                  >
                    View Movie →
                  </button>

                </div>

              </div>

            </div>
          )}

        </section>

        {/* Movies */}
        <section
          id="movies"
          className="max-w-7xl mx-auto px-6 md:px-12 py-16"
        >

          <div className="flex items-end justify-between mb-8">

            <div>

              <p className="text-[#e63946] text-sm uppercase tracking-[0.25em] mb-2">
                What's playing
              </p>

              <h2 className="text-3xl md:text-4xl font-bold">
                Popular Movies
              </h2>

            </div>

            <Link
              to="/movies"
              className="hidden sm:block text-sm text-white/50 hover:text-[#e63946] transition"
            >
              View All Movies →
            </Link>

          </div>

          {loading ? (
            <div className="py-20 text-center text-white/40">
              Loading movies...
            </div>
          ) : movies.length === 0 ? (
            <div className="py-20 text-center text-white/40">
              No movies available.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

              {popularMovies.map((movie) => (

                <div
                  key={movie._id}
                  className="group rounded-2xl overflow-hidden border border-white/10 bg-[#181818] hover:-translate-y-1 hover:border-white/20 transition duration-300"
                >

                  <div className="h-72 bg-[#242424] relative overflow-hidden">

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

                  <div className="p-5">

                    <h3 className="text-xl font-semibold group-hover:text-[#e63946] transition">
                      {movie.title}
                    </h3>

                    <p className="mt-2 text-sm text-white/45">
                      {movie.genre?.join(' • ')}
                    </p>

                    <Link
                      to={`/movie/${movie._id}`}
                      className="mt-5 block w-full py-2.5 rounded-full border border-white/10 hover:bg-[#e63946] hover:border-[#e63946] transition text-sm font-medium text-center"
                    >
                      View Details
                    </Link>

                  </div>

                </div>

              ))}

            </div>
          )}

        </section>

      </main>

    </div>
  )
}

export default Home