import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      const response = await fetch(
        'http://localhost:5000/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        alert(data.message || 'Login failed')
        return
      }

      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      navigate('/')
    } catch (error) {
      console.error('Login failed:', error)
      alert('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#111111] text-[#f5f1ea] flex items-center justify-center px-5">

      <div className="w-full max-w-md">

        <Link
          to="/"
          className="block text-center text-3xl font-bold"
        >
          Movie<span className="text-[#e63946]">Go</span>
        </Link>

        <div className="mt-10 border border-white/10 rounded-2xl p-6 sm:p-8 bg-[#181818]">

          <h1 className="text-3xl font-bold">
            Welcome back
          </h1>

          <p className="text-white/40 mt-2">
            Sign in to continue booking your movies.
          </p>

          <form
            onSubmit={handleLogin}
            className="mt-8 space-y-5"
          >

            <div>
              <label className="block text-sm text-white/50 mb-2">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-[#e63946]"
              />
            </div>

            <div>
              <label className="block text-sm text-white/50 mb-2">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-[#e63946]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 rounded-full font-semibold transition ${
                loading
                  ? 'bg-white/10 text-white/30 cursor-not-allowed'
                  : 'bg-[#e63946] hover:bg-[#c92f3b]'
              }`}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

          </form>

          <p className="text-center text-sm text-white/40 mt-6">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-[#e63946] hover:underline"
            >
              Sign Up
            </Link>
          </p>

        </div>

      </div>

    </div>
  )
}

export default Login