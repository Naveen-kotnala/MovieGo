import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar'

function AdminUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token')

        const response = await fetch(
          'https://moviego-backend.onrender.com/api/auth/users',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch users')
        }

        setUsers(data)
      } catch (error) {
        console.error('Failed to fetch users:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  return (
    <div className="min-h-screen bg-[#111111] text-[#f5f1ea]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-5 sm:px-8 py-8 sm:py-12">

        <Link
          to="/admin"
          className="text-sm text-white/40 hover:text-white transition"
        >
          ← Back to Dashboard
        </Link>

        <div className="mt-8">
          <p className="text-[#e63946] text-xs uppercase tracking-[0.25em]">
            User Management
          </p>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3">
            All Users
          </h1>

          <p className="text-white/40 mt-3">
            View registered MovieGo users and their account details.
          </p>
        </div>

        {loading ? (
          <div className="py-24 text-center text-white/40">
            Loading users...
          </div>
        ) : users.length === 0 ? (
          <div className="mt-10 border border-white/10 bg-[#181818] rounded-2xl py-20 text-center">
            <div className="text-4xl">👥</div>

            <h2 className="text-xl font-semibold mt-5">
              No users found
            </h2>

            <p className="text-white/40 text-sm mt-2">
              Registered users will appear here.
            </p>
          </div>
        ) : (
          <div className="mt-10 overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[750px] bg-[#181818]">

              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th className="px-5 py-4 text-xs uppercase tracking-wider text-white/30">
                    Name
                  </th>

                  <th className="px-5 py-4 text-xs uppercase tracking-wider text-white/30">
                    Email
                  </th>

                  <th className="px-5 py-4 text-xs uppercase tracking-wider text-white/30">
                    Role
                  </th>

                  <th className="px-5 py-4 text-xs uppercase tracking-wider text-white/30">
                    Joined
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]"
                  >
                    <td className="px-5 py-5 font-semibold">
                      {user.name}
                    </td>

                    <td className="px-5 py-5 text-white/60">
                      {user.email}
                    </td>

                    <td className="px-5 py-5">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs ${
                          user.role === 'admin'
                            ? 'bg-[#e63946]/10 text-[#e63946]'
                            : 'bg-white/5 text-white/50'
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="px-5 py-5 text-white/60">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString('en-IN')
                        : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </main>
    </div>
  )
}

export default AdminUsers