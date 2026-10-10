import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Navbar from '../Navbar'

function AdminDashboard() {
  const navigate = useNavigate()

  const [checking, setChecking] = useState(true)
  const [stats, setStats] = useState({
    movies: 0,
    shows: 0,
    bookings: 0,
    users: 0,
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')

    if (!token || !savedUser) {
      navigate('/login')
      return
    }

    const user = JSON.parse(savedUser)

    if (user.role !== 'admin') {
      navigate('/')
      return
    }

   const fetchStats = async () => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    }

    const [moviesResponse, showsResponse, bookingsResponse, usersResponse] =
      await Promise.all([
        fetch('http://localhost:5000/api/movies'),
        fetch('http://localhost:5000/api/shows'),
        fetch('http://localhost:5000/api/bookings', { headers }),
        fetch('http://localhost:5000/api/auth/users', { headers }),
      ])

    const movies = await moviesResponse.json()
    const shows = await showsResponse.json()
    const bookings = await bookingsResponse.json()
    const users = await usersResponse.json()

    console.log('Dashboard bookings:', bookings)

    setStats({
      movies: Array.isArray(movies) ? movies.length : 0,
      shows: Array.isArray(shows) ? shows.length : 0,
      bookings: Array.isArray(bookings) ? bookings.length : 0,
      users: Array.isArray(users) ? users.length : 0,
    })
  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error)
  } finally {
    setChecking(false)
  }
}

    fetchStats()
  }, [navigate])

  const statCards = [
    {
      title: 'Movies',
      value: stats.movies,
      icon: '🎬',
      link: '/admin/movies',
    },
    {
      title: 'Shows',
      value: stats.shows,
      icon: '🕐',
      link: '/admin/shows',
    },
    {
      title: 'Bookings',
      value: stats.bookings,
      icon: '🎟️',
      link: '/admin/bookings',
    },
    {
      title: 'Users',
      value: stats.users,
      icon: '👥',
      link: '/admin/users',
    },
  ]

  if (checking) {
    return (
      <div className="min-h-screen bg-[#111111] text-[#f5f1ea] flex items-center justify-center">
        Checking admin access...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#111111] text-[#f5f1ea]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-5 sm:px-8 py-10 sm:py-14">

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-[#e63946] text-xs uppercase tracking-[0.25em]">
              Administration
            </p>

            <h1 className="text-3xl sm:text-5xl font-bold mt-3">
              Admin Dashboard
            </h1>

            <p className="text-white/40 mt-3">
              Manage movies, shows, bookings and users.
            </p>
          </div>

          <Link
            to="/"
            className="text-sm text-white/50 hover:text-white transition"
          >
            ← Back to MovieGo
          </Link>
        </div>

        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {statCards.map((stat) => (
            <Link
              key={stat.title}
              to={stat.link}
              className="border border-white/10 bg-[#181818] rounded-2xl p-6 hover:border-white/25 transition"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{stat.icon}</span>

                <span className="text-white/30 text-sm">
                  →
                </span>
              </div>

              <p className="text-white/40 text-sm mt-7">
                {stat.title}
              </p>

              <p className="text-3xl font-bold mt-1">
                {stat.value}
              </p>
            </Link>
          ))}
        </section>

        <section className="mt-10 border border-white/10 bg-[#181818] rounded-2xl p-6 sm:p-8">

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/30">
              Quick Actions
            </p>

            <h2 className="text-xl font-semibold mt-2">
              Manage MovieGo
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-7">

            <Link
              to="/admin/movies"
              className="border border-white/10 rounded-xl p-5 hover:border-[#e63946]/60 transition"
            >
              <span className="text-2xl">🎬</span>
              <h3 className="font-semibold mt-4">
                Manage Movies
              </h3>
              <p className="text-sm text-white/40 mt-1">
                Add, edit or remove movies.
              </p>
            </Link>

            <Link
              to="/admin/shows"
              className="border border-white/10 rounded-xl p-5 hover:border-[#e63946]/60 transition"
            >
              <span className="text-2xl">🕐</span>
              <h3 className="font-semibold mt-4">
                Manage Shows
              </h3>
              <p className="text-sm text-white/40 mt-1">
                Create cinema showtimes.
              </p>
            </Link>

            <Link
              to="/admin/bookings"
              className="border border-white/10 rounded-xl p-5 hover:border-[#e63946]/60 transition"
            >
              <span className="text-2xl">🎟️</span>
              <h3 className="font-semibold mt-4">
                View Bookings
              </h3>
              <p className="text-sm text-white/40 mt-1">
                Monitor customer bookings.
              </p>
            </Link>

            <Link
              to="/admin/users"
              className="border border-white/10 rounded-xl p-5 hover:border-[#e63946]/60 transition"
            >
              <span className="text-2xl">👥</span>
              <h3 className="font-semibold mt-4">
                View Users
              </h3>
              <p className="text-sm text-white/40 mt-1">
                Manage registered users.
              </p>
            </Link>

          </div>
        </section>

      </main>
    </div>
  )
}

export default AdminDashboard