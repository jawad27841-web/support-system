import { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import StatCard from '../../components/StatCard.jsx'
import API from '../../api/axios.js'
import Loader from '../../components/Loader.jsx'
import { FiList, FiAlertCircle, FiClock, FiCheckCircle, FiUsers } from 'react-icons/fi'

const AdminDashboard = () => {
  const [stats, setStats] = useState(null)
  const [tickets, setTickets] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashRes = await API.get('/dashboard/admin')
        setStats(dashRes.data.stats)
        setTickets(dashRes.data.recentTickets || [])

        const usersRes = await API.get('/users')
        setUsers(usersRes.data.users || [])
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <Loader />

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <Sidebar />
      <div className='flex-1 flex flex-col'>
        <div className='bg-white border-b border-gray-200 px-6 py-4'>
          <h1 className='text-2xl font-bold text-gray-800'>Admin Dashboard 🔐</h1>
          <p className='text-sm text-gray-500'>Complete System Overview</p>
        </div>

        <div className='flex-1 p-6 overflow-y-auto'>
          <div className='grid grid-cols-5 gap-4 mb-6'>
            <StatCard title='Total Tickets' value={stats?.totalTickets || 0} icon={FiList} color='blue' />
            <StatCard title='Open' value={stats?.openTickets || 0} icon={FiAlertCircle} color='orange' />
            <StatCard title='Progress' value={stats?.inProgressTickets || 0} icon={FiClock} color='yellow' />
            <StatCard title='Resolved' value={stats?.resolvedTickets || 0} icon={FiCheckCircle} color='green' />
            <StatCard title='Users' value={users.length} icon={FiUsers} color='blue' />
          </div>

          <div className='grid grid-cols-2 gap-6 mb-6'>
            <div className='bg-white rounded-xl border border-gray-200'>
              <div className='px-6 py-4 border-b border-gray-200'>
                <h2 className='font-bold text-gray-800'>Recent Tickets</h2>
              </div>
              {tickets.length === 0 ? (
                <div className='flex items-center justify-center h-60 text-gray-400'>
                  No tickets
                </div>
              ) : (
                <div className='overflow-x-auto'>
                  <table className='w-full text-xs'>
                    <thead>
                      <tr className='bg-gray-50 border-b'>
                        <th className='px-4 py-3 text-left'>ID</th>
                        <th className='px-4 py-3 text-left'>Title</th>
                        <th className='px-4 py-3 text-left'>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tickets.slice(0, 8).map((t) => (
                        <tr key={t.id} className='border-b hover:bg-gray-50'>
                          <td className='px-4 py-3 font-bold text-blue-600'>#{t.id}</td>
                          <td className='px-4 py-3 truncate'>{t.title}</td>
                          <td className='px-4 py-3'>
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                              t.status === 'open' ? 'bg-red-100 text-red-700' :
                              t.status === 'in_progress' ? 'bg-yellow-100 text-yellow-700' :
                              t.status === 'resolved' ? 'bg-green-100 text-green-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {t.status.replace('_', ' ')}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className='bg-white rounded-xl border border-gray-200'>
              <div className='px-6 py-4 border-b border-gray-200'>
                <h2 className='font-bold text-gray-800'>All Users ({users.length})</h2>
              </div>
              {users.length === 0 ? (
                <div className='flex items-center justify-center h-60 text-gray-400'>
                  No users
                </div>
              ) : (
                <div className='overflow-x-auto'>
                  <table className='w-full text-xs'>
                    <thead>
                      <tr className='bg-gray-50 border-b'>
                        <th className='px-4 py-3 text-left'>ID</th>
                        <th className='px-4 py-3 text-left'>Name</th>
                        <th className='px-4 py-3 text-left'>Role</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u) => (
                        <tr key={u.id} className='border-b hover:bg-gray-50'>
                          <td className='px-4 py-3 font-bold text-blue-600'>#{u.id}</td>
                          <td className='px-4 py-3'>{u.name}</td>
                          <td className='px-4 py-3'>
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                              u.role === 'admin' ? 'bg-red-100 text-red-700' :
                              u.role === 'agent' ? 'bg-blue-100 text-blue-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              {u.role}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          <div className='grid grid-cols-3 gap-6'>
            <div className='bg-white rounded-xl border border-gray-200 p-6'>
              <h3 className='text-sm text-gray-600 mb-4 font-bold'>Ticket Status</h3>
              <div className='space-y-3'>
                <div className='flex justify-between items-center'>
                  <span className='text-xs text-gray-600'>Open</span>
                  <span className='font-bold text-red-600'>{stats?.openTickets || 0}</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-xs text-gray-600'>In Progress</span>
                  <span className='font-bold text-yellow-600'>{stats?.inProgressTickets || 0}</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-xs text-gray-600'>Resolved</span>
                  <span className='font-bold text-green-600'>{stats?.resolvedTickets || 0}</span>
                </div>
              </div>
            </div>

            <div className='bg-white rounded-xl border border-gray-200 p-6'>
              <h3 className='text-sm text-gray-600 mb-4 font-bold'>User Roles</h3>
              <div className='space-y-3'>
                <div className='flex justify-between items-center'>
                  <span className='text-xs text-gray-600'>Admins</span>
                  <span className='font-bold'>{users.filter(u => u.role === 'admin').length}</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-xs text-gray-600'>Agents</span>
                  <span className='font-bold'>{users.filter(u => u.role === 'agent').length}</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-xs text-gray-600'>Users</span>
                  <span className='font-bold'>{users.filter(u => u.role === 'user').length}</span>
                </div>
              </div>
            </div>

            <div className='bg-white rounded-xl border border-gray-200 p-6'>
              <h3 className='text-sm text-gray-600 mb-4 font-bold'>Statistics</h3>
              <div className='space-y-3'>
                <div className='flex justify-between items-center'>
                  <span className='text-xs text-gray-600'>Total Tickets</span>
                  <span className='font-bold text-lg'>{stats?.totalTickets || 0}</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-xs text-gray-600'>Total Users</span>
                  <span className='font-bold text-lg'>{users.length}</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-xs text-gray-600'>Completion %</span>
                  <span className='font-bold text-lg text-green-600'>
                    {stats?.totalTickets ? Math.round((stats.resolvedTickets / stats.totalTickets) * 100) : 0}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard