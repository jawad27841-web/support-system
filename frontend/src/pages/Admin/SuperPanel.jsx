import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiList, FiClock, FiCheckCircle, FiAlertCircle, FiPlus, FiTrendingUp } from 'react-icons/fi'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
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

        const endpoint = isAdmin ? '/dashboard/admin' : '/dashboard/user'
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

  // Data for Charts
  const statusData = [
    { name: '🔴 Pending', value: isAdmin ? stats?.openTickets || 0 : stats?.myOpen || 0, fill: '#EF4444' },
    { name: '🟡 Progress', value: isAdmin ? stats?.inProgressTickets || 0 : stats?.myInProgress || 0, fill: '#F59E0B' },
    { name: '✅ Resolved', value: isAdmin ? stats?.resolvedTickets || 0 : stats?.myResolved || 0, fill: '#10B981' }
  ]

  const trendData = [
    { day: 'Mon', tickets: 4 },
    { day: 'Tue', tickets: 3 },
    { day: 'Wed', tickets: 5 },
    { day: 'Thu', tickets: 6 },
    { day: 'Fri', tickets: 8 },
    { day: 'Sat', tickets: 4 },
    { day: 'Sun', tickets: 2 }
  ]

  const priorityData = [
    { name: 'High', value: Math.ceil((isAdmin ? stats?.openTickets || 0 : stats?.myOpen || 0) * 0.3), fill: '#DC2626' },
    { name: 'Medium', value: Math.ceil((isAdmin ? stats?.openTickets || 0 : stats?.myOpen || 0) * 0.5), fill: '#F59E0B' },
    { name: 'Low', value: Math.ceil((isAdmin ? stats?.openTickets || 0 : stats?.myOpen || 0) * 0.2), fill: '#10B981' }
  ]

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <Sidebar />
      <div className='flex-1 flex flex-col'>
        {/* Header */}
        <div className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-8 shadow-lg'>
          <div className='flex items-center justify-between'>
            <div className='animate-in slide-in-from-left duration-700'>
              <h1 className='text-3xl font-bold mb-2'>Welcome, {user?.name} 👋</h1>
              <p className='text-blue-100'>
                {isAdmin ? '🔐 Admin Dashboard' : '📊 User Dashboard'}
              </p>
            </div>
            <div className='animate-in slide-in-from-right duration-700'>
              <div className='text-right'>
                <p className='text-blue-100 text-sm'>Total Tickets</p>
                <p className='text-4xl font-bold'>{isAdmin ? stats?.totalTickets || 0 : stats?.myTotal || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className='flex-1 p-6 overflow-y-auto'>
          {/* Stats Cards */}
          <div className='grid grid-cols-4 gap-4 mb-8 animate-in fade-in duration-700'>
            <div className='animate-in slide-in-from-left duration-700 [animation-delay:0ms]'>
              <StatCard 
                title='Total' 
                value={isAdmin ? stats?.totalTickets || 0 : stats?.myTotal || 0} 
                icon={FiList} 
                color='blue' 
              />
            </div>
            <div className='animate-in slide-in-from-left duration-700 [animation-delay:100ms]'>
              <StatCard 
                title='Pending' 
                value={isAdmin ? stats?.openTickets || 0 : stats?.myOpen || 0} 
                icon={FiAlertCircle} 
                color='orange' 
              />
            </div>
            <div className='animate-in slide-in-from-left duration-700 [animation-delay:200ms]'>
              <StatCard 
                title='In Progress' 
                value={isAdmin ? stats?.inProgressTickets || 0 : stats?.myInProgress || 0} 
                icon={FiClock} 
                color='yellow' 
              />
            </div>
            <div className='animate-in slide-in-from-left duration-700 [animation-delay:300ms]'>
              <StatCard 
                title='Resolved' 
                value={isAdmin ? stats?.resolvedTickets || 0 : stats?.myResolved || 0} 
                icon={FiCheckCircle} 
                color='green' 
              />
            </div>
          </div>

          {/* Charts Section */}
          <div className='grid grid-cols-3 gap-6 mb-8'>
            {/* Pie Chart - Status Distribution */}
            <div className='bg-white rounded-xl border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom duration-700'>
              <h3 className='text-lg font-bold text-gray-800 mb-4 flex items-center gap-2'>
                <FiTrendingUp className='text-blue-600' />
                Status Distribution
              </h3>
              <ResponsiveContainer width='100%' height={250}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx='50%'
                    cy='50%'
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill='#8884d8'
                    dataKey='value'
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Line Chart - Weekly Trend */}
            <div className='bg-white rounded-xl border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom duration-700 [animation-delay:100ms]'>
              <h3 className='text-lg font-bold text-gray-800 mb-4 flex items-center gap-2'>
                <FiTrendingUp className='text-green-600' />
                Weekly Trend
              </h3>
              <ResponsiveContainer width='100%' height={250}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray='3 3' stroke='#e5e7eb' />
                  <XAxis dataKey='day' stroke='#9ca3af' />
                  <YAxis stroke='#9ca3af' />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  />
                  <Line 
                    type='monotone' 
                    dataKey='tickets' 
                    stroke='#10B981' 
                    strokeWidth={3}
                    dot={{ fill: '#10B981', r: 5 }}
                    activeDot={{ r: 7 }}
                    animationDuration={1000}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart - Priority Distribution */}
            <div className='bg-white rounded-xl border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom duration-700 [animation-delay:200ms]'>
              <h3 className='text-lg font-bold text-gray-800 mb-4 flex items-center gap-2'>
                <FiTrendingUp className='text-red-600' />
                Priority Breakdown
              </h3>
              <ResponsiveContainer width='100%' height={250}>
                <BarChart data={priorityData}>
                  <CartesianGrid strokeDasharray='3 3' stroke='#e5e7eb' />
                  <XAxis dataKey='name' stroke='#9ca3af' />
                  <YAxis stroke='#9ca3af' />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  />
                  <Bar 
                    dataKey='value' 
                    fill='#3B82F6'
                    radius={[8, 8, 0, 0]}
                    animationDuration={1000}
                  >
                    {priorityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Tickets Table */}
          <div className='bg-white rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 animate-in fade-in duration-700 [animation-delay:300ms]'>
            <div className='flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50'>
              <h2 className='font-bold text-gray-800 text-lg'>
                {isAdmin ? '📋 Recent Tickets' : '📋 My Tickets'}
              </h2>
              <Link 
                to='/tickets/create' 
                className='flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-medium'
              >
                <FiPlus /> New Ticket
              </Link>
            </div>

            {tickets.length === 0 ? (
              <div className='flex items-center justify-center h-48 text-gray-400'>
                <div className='text-center'>
                  <p className='text-lg'>No tickets found</p>
                  <p className='text-sm mt-1'>
                    {isAdmin ? 'No recent tickets yet' : 'Create your first ticket to get started'}
                  </p>
                </div>
              </div>
            ) : (
              <div className='overflow-x-auto'>
                <table className='w-full text-sm'>
                  <thead>
                    <tr className='border-b border-gray-100 text-xs text-gray-500 bg-gray-50'>
                      <td className='px-6 py-4 font-bold'>ID</td>
                      <td className='px-6 py-4 font-bold'>Title</td>
                      {isAdmin && <td className='px-6 py-4 font-bold'>User</td>}
                      <td className='px-6 py-4 font-bold'>Priority</td>
                      <td className='px-6 py-4 font-bold'>Status</td>
                      <td className='px-6 py-4 font-bold'>Date</td>
                    </tr>
                  </thead>
                  <tbody className='divide-y'>
                    {tickets.map((t, index) => (
                      <tr key={t.id} className='hover:bg-blue-50 transition-colors duration-200 animate-in fade-in duration-500' style={{animationDelay: `${index * 50}ms`}}>
                        <td className='px-6 py-4 text-blue-600 font-bold'>#{t.id}</td>
                        <td className='px-6 py-4 font-medium truncate max-w-xs'>{t.title}</td>
                        {isAdmin && (
                          <td className='px-6 py-4'>
                            <div className='text-sm'>
                              <p className='font-medium'>{t.creator?.name}</p>
                              <p className='text-xs text-gray-500'>{t.creator?.email}</p>
                            </div>
                          </td>
                        )}
                        <td className='px-6 py-4'>
                          <StatusBadge priority={t.priority} />
                        </td>
                        <td className='px-6 py-4'>
                          <StatusBadge status={t.status} />
                        </td>
                        <td className='px-6 py-4 text-gray-500 text-xs'>
                          {new Date(t.createdAt).toLocaleDateString('en-PK')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Summary Stats */}
          <div className='grid grid-cols-3 gap-6 mt-8'>
            <div className='bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom duration-700'>
              <h3 className='text-sm text-blue-700 mb-4 font-bold'>📊 Status Breakdown</h3>
              <div className='space-y-3'>
                <div className='flex justify-between items-center pb-2 border-b border-blue-200'>
                  <span className='text-sm text-blue-600'>🔴 Pending</span>
                  <span className='font-bold text-lg text-red-600'>
                    {isAdmin ? stats?.openTickets || 0 : stats?.myOpen || 0}
                  </span>
                </div>
                <div className='flex justify-between items-center pb-2 border-b border-blue-200'>
                  <span className='text-sm text-blue-600'>🟡 In Progress</span>
                  <span className='font-bold text-lg text-yellow-600'>
                    {isAdmin ? stats?.inProgressTickets || 0 : stats?.myInProgress || 0}
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-sm text-blue-600'>✅ Resolved</span>
                  <span className='font-bold text-lg text-green-600'>
                    {isAdmin ? stats?.resolvedTickets || 0 : stats?.myResolved || 0}
                  </span>
                </div>
              </div>
            </div>

            <div className='bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom duration-700 [animation-delay:100ms]'>
              <h3 className='text-sm text-green-700 mb-4 font-bold'>📈 Performance</h3>
              <div className='space-y-3'>
                <div className='flex justify-between items-center pb-2 border-b border-green-200'>
                  <span className='text-sm text-green-600'>Total Tickets</span>
                  <span className='font-bold text-lg'>
                    {isAdmin ? stats?.totalTickets || 0 : stats?.myTotal || 0}
                  </span>
                </div>
                <div className='flex justify-between items-center pb-2 border-b border-green-200'>
                  <span className='text-sm text-green-600'>Completion %</span>
                  <span className='font-bold text-lg text-green-600'>
                    {stats?.totalTickets || stats?.myTotal ? 
                      Math.round(
                        ((isAdmin ? stats.resolvedTickets : stats?.myResolved) / 
                         (isAdmin ? stats.totalTickets : stats?.myTotal)) * 100
                      ) : 0}%
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-sm text-green-600'>Avg Time</span>
                  <span className='font-bold text-lg'>~2 days</span>
                </div>
              </div>
            </div>

            <div className='bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom duration-700 [animation-delay:200ms]'>
              <h3 className='text-sm text-purple-700 mb-4 font-bold'>👤 Account Info</h3>
              <div className='space-y-3'>
                <div className='pb-2 border-b border-purple-200'>
                  <p className='text-xs text-purple-600 mb-1'>Name</p>
                  <p className='text-sm font-bold text-purple-900'>{user?.name}</p>
                </div>
                <div className='pb-2 border-b border-purple-200'>
                  <p className='text-xs text-purple-600 mb-1'>Email</p>
                  <p className='text-sm font-bold text-purple-900'>{user?.email}</p>
                </div>
                <div>
                  <p className='text-xs text-purple-600 mb-1'>Role</p>
                  <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${
                    user?.role === 'admin' ? 'bg-red-100 text-red-700' :
                    user?.role === 'agent' ? 'bg-blue-100 text-blue-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {user?.role?.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .slide-in-from-left {
          animation: slideInFromLeft 0.7s ease-out forwards;
        }
        .slide-in-from-right {
          animation: slideInFromRight 0.7s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default Dashboard