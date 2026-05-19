import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiList,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiPlus,
  FiTrendingUp
} from 'react-icons/fi'

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

import API from '../../api/axios.js'
import Sidebar from '../../components/Sidebar.jsx'
import StatCard from '../../components/StatCard.jsx'
import StatusBadge from '../../components/StatusBadge.jsx'
import useAuth from '../../hooks/useAuth.js'
import useRole from '../../hooks/useRole.js'
import Loader from '../../components/Loader.jsx'

const Dashboard = () => {
  const { user } = useAuth()
  const { isAdmin } = useRole()

  const [stats, setStats] = useState(null)
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        const endpoint = isAdmin
          ? '/dashboard/admin'
          : '/dashboard/user'

        const res = await API.get(endpoint)

        setStats(res.data.stats)

        if (isAdmin) {
          setTickets(res.data.recentTickets || [])
        } else {
          setTickets(res.data.myRecentTickets || [])
        }
      } catch (error) {
        console.error('Error fetching dashboard:', error)
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchData()
    }
  }, [isAdmin, user])

  if (loading) return <Loader />

  // PIE CHART DATA
  const statusData = [
    {
      name: 'Pending',
      value: isAdmin
        ? stats?.openTickets || 0
        : stats?.myOpen || 0,
      fill: '#EF4444'
    },
    {
      name: 'In Progress',
      value: isAdmin
        ? stats?.inProgressTickets || 0
        : stats?.myInProgress || 0,
      fill: '#F59E0B'
    },
    {
      name: 'Resolved',
      value: isAdmin
        ? stats?.resolvedTickets || 0
        : stats?.myResolved || 0,
      fill: '#10B981'
    }
  ]

  // LINE CHART DATA
  const trendData = [
    { day: 'Mon', tickets: 4 },
    { day: 'Tue', tickets: 3 },
    { day: 'Wed', tickets: 5 },
    { day: 'Thu', tickets: 6 },
    { day: 'Fri', tickets: 8 },
    { day: 'Sat', tickets: 4 },
    { day: 'Sun', tickets: 2 }
  ]

  // BAR CHART DATA
  const priorityData = [
    {
      name: 'High',
      value: Math.ceil(
        (isAdmin
          ? stats?.openTickets || 0
          : stats?.myOpen || 0) * 0.3
      ),
      fill: '#DC2626'
    },
    {
      name: 'Medium',
      value: Math.ceil(
        (isAdmin
          ? stats?.openTickets || 0
          : stats?.myOpen || 0) * 0.5
      ),
      fill: '#F59E0B'
    },
    {
      name: 'Low',
      value: Math.ceil(
        (isAdmin
          ? stats?.openTickets || 0
          : stats?.myOpen || 0) * 0.2
      ),
      fill: '#10B981'
    }
  ]

  return (
    <div className='flex min-h-screen bg-gray-100'>
      <Sidebar />

      <div className='flex-1 flex flex-col overflow-hidden'>

        {/* HEADER */}
        <div className='bg-gradient-to-r from-green-600 via-green-500 to-emerald-600 text-white px-8 py-12 shadow-2xl'>
          <div className='max-w-7xl mx-auto'>
            <div className='flex items-start justify-between gap-8'>

              <div className='flex-1'>
                <h2 className='text-sm font-bold text-green-100 mb-2 tracking-wider'>
                  CLIENT SUPPORT SYSTEM
                </h2>

                <h1 className='text-5xl lg:text-6xl font-black mb-4 text-white drop-shadow-lg'>
                  Welcome Back, {user?.name} 👋
                </h1>

                <p className='text-green-100 text-lg font-semibold'>
                  {isAdmin
                    ? '🔐 Admin Dashboard - Full System Control'
                    : '📊 User Dashboard - Manage Your Tickets'}
                </p>
              </div>

              <div>
                <div className='text-right bg-white/10 backdrop-blur-md px-8 py-6 rounded-2xl border border-white/30 shadow-xl'>
                  <p className='text-green-50 text-sm font-semibold'>
                    Total Tickets
                  </p>

                  <p className='text-6xl font-black text-white mt-3'>
                    {isAdmin
                      ? stats?.totalTickets || 0
                      : stats?.myTotal || 0}
                  </p>

                  <p className='text-green-100 text-xs mt-2'>
                    in system
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className='flex-1 p-8 overflow-y-auto'>

          {/* STATS */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>

            <StatCard
              title='Total'
              value={
                isAdmin
                  ? stats?.totalTickets || 0
                  : stats?.myTotal || 0
              }
              icon={FiList}
              color='blue'
            />

            <StatCard
              title='Pending'
              value={
                isAdmin
                  ? stats?.openTickets || 0
                  : stats?.myOpen || 0
              }
              icon={FiAlertCircle}
              color='orange'
            />

            <StatCard
              title='In Progress'
              value={
                isAdmin
                  ? stats?.inProgressTickets || 0
                  : stats?.myInProgress || 0
              }
              icon={FiClock}
              color='yellow'
            />

            <StatCard
              title='Resolved'
              value={
                isAdmin
                  ? stats?.resolvedTickets || 0
                  : stats?.myResolved || 0
              }
              icon={FiCheckCircle}
              color='green'
            />

          </div>

          {/* CHARTS */}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8'>

            {/* PIE CHART */}
            <div className='bg-white rounded-2xl border border-gray-200 p-6 shadow-lg'>
              <h3 className='text-lg font-bold text-gray-800 mb-4 flex items-center gap-2'>
                <FiTrendingUp className='text-green-600' />
                Status Distribution
              </h3>

              <ResponsiveContainer width='100%' height={250}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx='50%'
                    cy='50%'
                    outerRadius={80}
                    dataKey='value'
                    label
                  >
                    {statusData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={entry.fill}
                      />
                    ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* LINE CHART */}
            <div className='bg-white rounded-2xl border border-gray-200 p-6 shadow-lg'>
              <h3 className='text-lg font-bold text-gray-800 mb-4 flex items-center gap-2'>
                <FiTrendingUp className='text-green-600' />
                Weekly Trend
              </h3>

              <ResponsiveContainer width='100%' height={250}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray='3 3' />

                  <XAxis dataKey='day' />
                  <YAxis />
                  <Tooltip />

                  <Line
                    type='monotone'
                    dataKey='tickets'
                    stroke='#10B981'
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* BAR CHART */}
            <div className='bg-white rounded-2xl border border-gray-200 p-6 shadow-lg'>
              <h3 className='text-lg font-bold text-gray-800 mb-4 flex items-center gap-2'>
                <FiTrendingUp className='text-green-600' />
                Priority Breakdown
              </h3>

              <ResponsiveContainer width='100%' height={250}>
                <BarChart data={priorityData}>
                  <CartesianGrid strokeDasharray='3 3' />

                  <XAxis dataKey='name' />
                  <YAxis />
                  <Tooltip />

                  <Bar
                    dataKey='value'
                    radius={[8, 8, 0, 0]}
                  >
                    {priorityData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={entry.fill}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

          </div>

          {/* TICKETS TABLE */}
          <div className='bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden'>

            <div className='flex items-center justify-between px-8 py-5 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50'>
              <h2 className='font-bold text-gray-800 text-lg'>
                {isAdmin
                  ? '📋 Recent Tickets'
                  : '📋 My Tickets'}
              </h2>

              <Link
                to='/tickets/create'
                className='flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-5 py-2.5 rounded-lg hover:scale-105 transition'
              >
                <FiPlus />
                New Ticket
              </Link>
            </div>

            {tickets.length === 0 ? (
              <div className='flex items-center justify-center h-48 text-gray-400'>
                No tickets found
              </div>
            ) : (
              <div className='overflow-x-auto'>
                <table className='w-full text-sm'>

                  <thead>
                    <tr className='border-b border-gray-100 text-xs text-gray-500 bg-gray-50'>
                      <th className='px-8 py-4 text-left font-bold'>ID</th>
                      <th className='px-8 py-4 text-left font-bold'>Title</th>

                      {isAdmin && (
                        <th className='px-8 py-4 text-left font-bold'>
                          User
                        </th>
                      )}

                      <th className='px-8 py-4 text-left font-bold'>
                        Priority
                      </th>

                      <th className='px-8 py-4 text-left font-bold'>
                        Status
                      </th>

                      <th className='px-8 py-4 text-left font-bold'>
                        Date
                      </th>
                    </tr>
                  </thead>

                  <tbody className='divide-y divide-gray-100'>
                    {tickets.map((t, index) => (
                      <tr
                        key={t.id || index}
                        className='hover:bg-green-50 transition'
                      >

                        <td className='px-8 py-4 text-green-600 font-bold'>
                          #{t.id}
                        </td>

                        <td className='px-8 py-4 font-medium'>
                          {t.title}
                        </td>

                        {isAdmin && (
                          <td className='px-8 py-4'>
                            <div>
                              <p className='font-medium'>
                                {t.creator?.name}
                              </p>

                              <p className='text-xs text-gray-500'>
                                {t.creator?.email}
                              </p>
                            </div>
                          </td>
                        )}

                        <td className='px-8 py-4'>
                          <StatusBadge priority={t.priority} />
                        </td>

                        <td className='px-8 py-4'>
                          <StatusBadge status={t.status} />
                        </td>

                        <td className='px-8 py-4 text-gray-500 text-xs'>
                          {new Date(t.createdAt).toLocaleDateString('en-PK')}
                        </td>

                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Dashboard