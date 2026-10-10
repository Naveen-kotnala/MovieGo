import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()

  const [showProfile, setShowProfile] = useState(false)
  const [showCities, setShowCities] = useState(false)

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  const [selectedCity, setSelectedCity] = useState(() => {
    return localStorage.getItem('moviego_city') || ''
  })

  const cities = [
    'Delhi',
    'Mumbai',
    'Bengaluru',
    'Hyderabad',
    'Chennai',
    'Pune',
    'Kolkata',
    'Ahmedabad',
    'Jaipur',
    'Gwalior',
  ]

  const handleCityChange = (city) => {
    setSelectedCity(city)
    localStorage.setItem('moviego_city', city)
    setShowCities(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    setUser(null)
    setShowProfile(false)

    navigate('/')
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#111111]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-8 py-4">

         <Link
  to="/"
  className="flex items-center gap-2.5 shrink-0"
>
  <img
    src="/moviego.png"
    alt="MovieGo"
    className="w-11 h-11 rounded-xl object-cover"
  />

  <span className="text-2xl font-bold tracking-tight">
    Movie<span className="text-[#e63946]">Go</span>
  </span>
</Link>    

        <div className="hidden md:flex items-center gap-8 text-sm text-white/60">

          <Link
            to="/"
            className="hover:text-white transition"
          >
            Home
          </Link>

          <Link
            to="/movies"
            className="hover:text-white transition"
          >
            Movies
          </Link>

          <Link
            to="/cinemas"
            className="hover:text-white transition"
          >
            Cinemas
          </Link>

          {user?.role === 'admin' && (
            <Link
              to="/admin"
              className="text-[#e63946] hover:text-white transition font-semibold"
            >
              Admin
            </Link>
          )}

        </div>

        <div className="flex items-center gap-2 sm:gap-4">

          {/* City Selector */}
          <div className="relative">

            <button
              onClick={() => setShowCities(!showCities)}
              className="flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 text-sm text-white/70 hover:text-white hover:border-white/20 transition"
            >
              📍
              <span className="hidden sm:inline">
                {selectedCity || 'Select City'}
              </span>
            </button>

            {showCities && (
              <div className="absolute right-0 top-12 w-56 bg-[#181818] border border-white/10 rounded-2xl shadow-2xl p-2 z-50">

                <p className="px-3 py-2 text-xs uppercase tracking-wider text-white/30">
                  Select City
                </p>

                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => handleCityChange(city)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition ${
                      selectedCity === city
                        ? 'bg-[#e63946]/10 text-[#e63946]'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    📍 {city}
                  </button>
                ))}

              </div>
            )}

          </div>

          {!user ? (
            <div className="flex items-center gap-2 sm:gap-4">

              <Link
                to="/login"
                className="px-3 sm:px-4 py-2.5 text-sm font-semibold text-white/70 hover:text-white transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="px-4 sm:px-5 py-2.5 rounded-full bg-[#e63946] text-sm font-semibold hover:bg-[#c92f3b] transition"
              >
                Sign Up
              </Link>

            </div>
          ) : (
            <div className="relative">

              <button
                onClick={() => setShowProfile(!showProfile)}
                className="w-10 h-10 rounded-full bg-[#e63946] flex items-center justify-center font-bold hover:bg-[#c92f3b] transition"
              >
                {user.name?.charAt(0).toUpperCase()}
              </button>

              {showProfile && (
                <div className="absolute right-0 top-14 w-64 bg-[#181818] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">

                  <div className="px-5 py-4 border-b border-white/10">

                    <p className="font-semibold truncate">
                      {user.name}
                    </p>

                    <p className="text-sm text-white/40 truncate mt-1">
                      {user.email}
                    </p>

                  </div>

                  <div className="p-2">

                    {user?.role === 'admin' && (
                      <button
                        onClick={() => {
                          setShowProfile(false)
                          navigate('/admin')
                        }}
                        className="w-full text-left px-4 py-3 rounded-xl text-sm text-[#e63946] hover:bg-white/5 transition"
                      >
                        ⚙️ Admin Dashboard
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setShowProfile(false)
                        navigate('/bookings')
                      }}
                      className="w-full text-left px-4 py-3 rounded-xl text-sm text-white/70 hover:bg-white/5 hover:text-white transition"
                    >
                      🎟️ My Bookings
                    </button>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition"
                    >
                      🚪 Logout
                    </button>

                  </div>

                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </nav>
  )
}

export default Navbar