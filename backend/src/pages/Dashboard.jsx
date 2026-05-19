import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import API from '../api/axios.js'
import Sidebar from '../components/Sidebar.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import useRole from '../hooks/useRole.js'
import useAuth from '../hooks/useAuth.js'
import {
  FiTicket, FiClock, FiCheckCircle,
  FiAlertCircle, FiPlus, FiSearch
} from 'react-icons/fi'

const Dashboard = () => {
  const { user } = useAuth()
  const { isAdmin, isAgent } = useRole()
  const [stats, setStats] = useState(null)
  const [recentTickets, setRecentTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const endpoint = isAdmin ? '/dashboard/admin' : '/dashboard/user'
        const res = await API.get(endpoint)
        setStats(res.data.stats)
        setRecentTickets(
          res.data.recentTickets || res.data.myRecentTickets || []
        )
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [isAdmin])

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <Sidebar />

      <div className='flex-1 flex flex-col'>

        {/* Top bar */}
        <div className='bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between'>
          <div className='flex items-center gap-3 flex-1'>
            <div className='flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 flex-1 max-w-md'>
              <FiSearch className='text-gray-400' />
              <input
                type='text'
                placeholder='Search tickets, users, categories...'
                value={search}
                onChange={e => setSearch(e.target.value)}
                className='bg-transparent text-sm outline-none w-full text-gray-600'
              />
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>
              <span className='text-blue-600 text-xs font-bold'>
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className='text-sm font-medium text-gray-800'>{user?.name}</p>
              <p className='text-xs text-gray-400 capitalize'>{user?.role}</p>
            </div>
          </div>
        </div>

        <div className='flex-1 p-6'>

          {/* Welcome */}
          <div className='mb-6'>
            <h1 className='text-xl font-bold text-gray-800'>
              Welcome back, {user?.name} 👋
            </h1>
            <p className='text-sm text-gray-500 mt-0.5'>
              Here's what's happening with your support system today.
            </p>
          </div>

          {/* Stats Cards */}
          <div className='grid grid-cols-4 gap-4 mb-6'>
            <div className='bg-white rounded-xl p-4 border border-gray-200'>
              <div className='flex items-center justify-between mb-3'>
                <p className='text-xs text-gray-500'>Total Tickets</p>
                <div className='w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center'>
                  <FiTicket className='text-blue-600 text-sm' />
                </div>
              </div>
              <p className='text-2xl font-bold text-gray-800'>
                {isAdmin ? stats?.totalTickets : stats?.myTotal || 0}
              </p>
              <p className='text-xs text-green-500 mt-1'>
                +12.5% from last month
              </p>
            </div>

            <div className='bg-white rounded-xl p-4 border border-gray-200'>
              <div className='flex items-center justify-between mb-3'>
                <p className='text-xs text-gray-500'>Open Tickets</p>
                <div className='w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center'>
                  <FiAlertCircle className='text-orange-500 text-sm' />
                </div>
              </div>
              <p className='text-2xl font-bold text-orange-500'>
                {isAdmin ? stats?.openTickets : stats?.myOpen || 0}
              </p>
              <p className='text-xs text-red-400 mt-1'>
                +8.2% from last month
              </p>
            </div>

            <div className='bg-white rounded-xl p-4 border border-gray-200'>
              <div className='flex items-center justify-between mb-3'>
                <p className='text-xs text-gray-500'>In Progress</p>
                <div className='w-8 h-8 bg-yellow-50 rounded-lg flex items-center justify-center'>
                  <FiClock className='text-yellow-500 text-sm' />
                </div>
              </div>
              <p className='text-2xl font-bold text-yellow-500'>
                {isAdmin ? stats?.inProgressTickets : stats?.myInProgress || 0}
              </p>
              <p className='text-xs text-green-500 mt-1'>
                +4.1% from last month
              </p>
            </div>

            <div className='bg-white rounded-xl p-4 border border-gray-200'>
              <div className='flex items-center justify-between mb-3'>
                <p className='text-xs text-gray-500'>Resolved Tickets</p>
                <div className='w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center'>
                  <FiCheckCircle className='text-green-500 text-sm' />
                </div>
              </div>
              <p className='text-2xl font-bold text-green-500'>
                {isAdmin ? stats?.resolvedTickets : stats?.myResolved || 0}
              </p>
              <p className='text-xs text-green-500 mt-1'>
                +18.7% from last month
              </p>
            </div>
          </div>

          {/* Recent Tickets */}
          <div className='bg-white rounded-xl border border-gray-200'>
            <div className='flex items-center justify-between px-6 py-4 border-b border-gray-200'>
              <h2 className='text-sm font-semibold text-gray-800'>
                Recent Tickets
              </h2>
              <div className='flex items-center gap-2'>
                <Link
                  to='/tickets/create'
                  className='flex items-center gap-1 bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-blue-700'
                >
                  <FiPlus className='text-xs' />
                  New Ticket
                </Link>
              </div>
            </div>

            {loading ? (
              <div className='flex items-center justify-center h-48'>
                <p className='text-gray-400 text-sm'>Loading...</p>
              </div>
            ) : recentTickets.length === 0 ? (
              <div className='flex items-center justify-center h-48'>
                <p className='text-gray-400 text-sm'>No tickets yet</p>
              </div>
            ) : (
              <table className='w-full text-sm'>
                <thead>
                  <tr className='border-b border-gray-100 text-xs text-gray-500 bg-gray-50'>
                    <td className='px-6 py-3'>Ticket ID</td>
                    <td className='px-6 py-3'>Subject</td>
                    <td className='px-6 py-3'>User</td>
                    <td className='px-6 py-3'>Category</td>
                    <td className='px-6 py-3'>Priority</td>
                    <td className='px-6 py-3'>Status</td>
                    <td className='px-6 py-3'>Created At</td>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-100'>
                  {recentTickets.map((ticket, index) => (
                    <tr key={ticket.id} className='hover:bg-gray-50'>
                      <td className='px-6 py-3 text-blue-600 font-mono text-xs'>
                        #TKT-{String(index + 1).padStart(4, '0')}
                      </td>
                      <td className='px-6 py-3 font-medium text-gray-800'>
                        {ticket.title}
                      </td>
                      <td className='px-6 py-3 text-gray-600'>
                        {ticket.creator?.name || '-'}
                      </td>
                      <td className='px-6 py-3 text-gray-500 text-xs'>
                        {ticket.category?.name || 'General'}
                      </td>
                      <td className='px-6 py-3'>
                        <StatusBadge priority={ticket.priority} />
                      </td>
                      <td className='px-6 py-3'>
                        <StatusBadge status={ticket.status} />
                      </td>
                      <td className='px-6 py-3 text-gray-400 text-xs'>
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Dashboard