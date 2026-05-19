import { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import StatCard from '../../components/StatCard.jsx'
import API from '../../api/axios.js'
import Loader from '../../components/Loader.jsx'
import { FiList, FiAlertCircle, FiClock, FiCheckCircle } from 'react-icons/fi'

const Reports = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get('/dashboard/admin')
        setStats(res.data.stats)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  if (loading) return <Loader />

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <Sidebar />
      <div className='flex-1 p-6'>
        <h1 className='text-2xl font-bold mb-6'>Reports & Analytics</h1>

        <div className='grid grid-cols-4 gap-4'>
          <StatCard title='Total Tickets' value={stats?.totalTickets || 0} icon={FiList} color='blue' />
          <StatCard title='Open' value={stats?.openTickets || 0} icon={FiAlertCircle} color='orange' />
          <StatCard title='In Progress' value={stats?.inProgressTickets || 0} icon={FiClock} color='yellow' />
          <StatCard title='Resolved' value={stats?.resolvedTickets || 0} icon={FiCheckCircle} color='green' />
        </div>

        <div className='mt-8 bg-white rounded-xl border border-gray-200 p-6'>
          <h2 className='text-lg font-bold mb-4'>System Overview</h2>
          <div className='space-y-3'>
            <div className='flex justify-between items-center pb-3 border-b'>
              <span className='text-gray-600'>Total Tickets</span>
              <span className='font-bold text-2xl text-blue-600'>{stats?.totalTickets || 0}</span>
            </div>
            <div className='flex justify-between items-center pb-3 border-b'>
              <span className='text-gray-600'>Open Issues</span>
              <span className='font-bold text-2xl text-red-600'>{stats?.openTickets || 0}</span>
            </div>
            <div className='flex justify-between items-center pb-3 border-b'>
              <span className='text-gray-600'>In Progress</span>
              <span className='font-bold text-2xl text-yellow-600'>{stats?.inProgressTickets || 0}</span>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-gray-600'>Resolved</span>
              <span className='font-bold text-2xl text-green-600'>{stats?.resolvedTickets || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reports