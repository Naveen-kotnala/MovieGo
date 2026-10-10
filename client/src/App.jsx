import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import MovieDetails from './pages/MovieDetails'
import Booking from './pages/Booking'
import Payment from './pages/Payment'
import Success from './pages/Success'
import MyBookings from './pages/MyBookings'
import Movies from './pages/Movies'
import Cinemas from './pages/Cinemas'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminMovies from './pages/admin/AdminMovies'
import AdminAddMovie from './pages/admin/AdminAddMovie'
import AdminShows from './pages/admin/AdminShows'
import AdminAddShow from './pages/admin/AdminAddShow'
import AdminEditShow from './pages/admin/AdminEditShow'
import AdminBookings from './pages/admin/AdminBookings'
import AdminUsers from './pages/admin/AdminUsers'
import AdminEditMovie from './pages/admin/AdminEditMovie'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/booking/:showId" element={<Booking />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/success" element={<Success />} />
      <Route path="/bookings" element={<MyBookings />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/cinemas" element={<Cinemas />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/movies" element={<AdminMovies />} />
      <Route path="/admin/movies/add" element={<AdminAddMovie />} />
      <Route path="/admin/shows" element={<AdminShows />} />
      <Route path="/admin/shows/add" element={<AdminAddShow />} />
      <Route path="/admin/shows/edit/:id" element={<AdminEditShow />} />
      <Route path="/admin/bookings" element={<AdminBookings />} />
      <Route path="/admin/users" element={<AdminUsers />} />
      <Route
  path="/admin/movies/edit/:id"
  element={<AdminEditMovie />}
/>
    </Routes>
  )
}

export default App