import { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import StatusBadge from '../../components/StatusBadge.jsx'
import API from '../../api/axios.js'
import Loader from '../../components/Loader.jsx'
import { FiSearch } from 'react-icons/fi'

const AllTickets = () => {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')

  const fetchTickets = async () => {
    try {
      setLoading(true)
      const params = { limit: 50 }
      if (search) params.search = search
      if (status) params.status = status
      
      const res = await API.get('/tickets', { params })
      setTickets(res.data.tickets || [])
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTickets()
  }, [search, status])

  if (loading) return <Loader />

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <Sidebar />
      <div className='flex-1 p-6'>
        <h1 className='text-2xl font-bold mb-6'>All Tickets (Admin)</h1>

        {/* Search & Filter */}
        <div className='bg-white rounded-xl border border-gray-200 p-4 mb-6'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='relative'>
              <FiSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
              <input
                type='text'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Search tickets...'
                className='w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className='border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value=''>All Status</option>
              <option value='open'>Open</option>
              <option value='in_progress'>In Progress</option>
              <option value='resolved'>Resolved</option>
              <option value='closed'>Closed</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className='bg-white rounded-xl border border-gray-200 overflow-x-auto'>
          {tickets.length === 0 ? (
            <div className='flex items-center justify-center h-48 text-gray-400'>
              No tickets found
            </div>
          ) : (
            <table className='w-full text-sm'>
              <thead>
                <tr className='border-b border-gray-100 text-xs text-gray-500 bg-gray-50'>
                  <td className='px-6 py-3'>ID</td>
                  <td className='px-6 py-3'>Title</td>
                  <td className='px-6 py-3'>User</td>
                  <td className='px-6 py-3'>Priority</td>
                  <td className='px-6 py-3'>Status</td>
                  <td className='px-6 py-3'>Date</td>
                </tr>
              </thead>
              <tbody className='divide-y'>
                {tickets.map((t) => (
                  <tr key={t.id} className='hover:bg-gray-50'>
                    <td className='px-6 py-3 text-blue-600 font-bold'>#{t.id}</td>
                    <td className='px-6 py-3'>{t.title}</td>
                    <td className='px-6 py-3 text-sm'>{t.creator?.name}</td>
                    <td className='px-6 py-3'><StatusBadge priority={t.priority} /></td>
                    <td className='px-6 py-3'><StatusBadge status={t.status} /></td>
                    <td className='px-6 py-3 text-gray-400 text-xs'>
                      {new Date(t.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className='mt-4 text-sm text-gray-500'>
          Total Tickets: <span className='font-bold text-gray-800'>{tickets.length}</span>
        </div>
      </div>
    </div>
  )
}

export default AllTickets