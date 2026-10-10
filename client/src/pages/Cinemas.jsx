import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

function Cinemas() {
  const navigate = useNavigate()

  const cinemas = [
    {
      name: 'PVR Cinemas',
      location: 'Multiple Locations',
      screens: 'Premium Screens',
      image:
        'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80',
    },
    {
      name: 'INOX',
      location: 'Multiple Locations',
      screens: 'Modern Screens',
      image:
        'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=900&q=80',
    },
    {
      name: 'Cinepolis',
      location: 'Multiple Locations',
      screens: 'Luxury Screens',
      image:
        'https://images.unsplash.com/photo-1595769816263-9b910be24d5f?auto=format&fit=crop&w=900&q=80',
    },
  ]

  return (
    <div className="min-h-screen bg-[#111111] text-[#f5f1ea]">

      <Navbar />

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-12">

        {/* Header */}
        <div className="mb-12">

          <p className="text-[#e63946] text-sm uppercase tracking-[0.25em] mb-3">
            Find your screen
          </p>

          <h1 className="text-4xl md:text-5xl font-bold">
            Cinemas
          </h1>

          <p className="mt-3 max-w-xl text-white/45">
            Choose your favourite cinema and enjoy movies on the big screen.
          </p>

        </div>

        {/* Cinema Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">

          {cinemas.map((cinema) => (

            <div
              key={cinema.name}
              className="group rounded-2xl overflow-hidden border border-white/10 bg-[#181818] hover:-translate-y-1 hover:border-white/20 transition duration-300"
            >

              {/* Image */}
              <div className="h-64 overflow-hidden relative">

                <img
                  src={cinema.image}
                  alt={cinema.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              </div>

              {/* Content */}
              <div className="p-6">

                <h2 className="text-2xl font-semibold">
                  {cinema.name}
                </h2>

                <p className="mt-2 text-sm text-white/45">
                  📍 {cinema.location}
                </p>

                <p className="mt-1 text-sm text-white/45">
                  🎬 {cinema.screens}
                </p>

                <button
                  onClick={() => navigate('/movies')}
                  className="mt-6 w-full py-3 rounded-full bg-[#e63946] hover:bg-[#c92f3b] transition font-semibold text-sm"
                >
                  Browse Movies →
                </button>

              </div>

            </div>

          ))}

        </div>

      </main>

    </div>
  )
}

export default Cinemas