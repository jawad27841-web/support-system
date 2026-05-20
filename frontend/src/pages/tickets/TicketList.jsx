import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiTrash2, FiEdit2, FiSearch, FiEye } from 'react-icons/fi'
import API from '../../api/axios.js'
import Sidebar from '../../components/Sidebar.jsx'
import StatusBadge from '../../components/StatusBadge.jsx'
import Loader from '../../components/Loader.jsx'

const TicketList = () => {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const fetchTickets = async () => {
    try {
      setLoading(true)
      const res = await API.get('/tickets/my-tickets', {
        params: { search, status: statusFilter }
      })
      setTickets(res.data.tickets || [])
    } catch (error) {
      console.error('Error:', error)
      alert('❌ Error loading tickets')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTickets()
  }, [search, statusFilter])

  const handleDelete = async (ticketId) => {
    if (window.confirm('⚠️ کیا آپ یہ ticket delete کرنا چاہتے ہیں؟')) {
      try {
        await API.delete(`/tickets/${ticketId}`)
        alert('✅ Ticket deleted successfully!')
        setTickets(tickets.filter(t => t.id !== ticketId))
      } catch (error) {
        alert('❌ Error deleting ticket: ' + error.message)
      }
    }
  }

  if (loading) return <Loader />

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <Sidebar />
      <div className='flex-1 flex flex-col'>
        {/* Header */}
        <div className='bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-8 shadow-lg'>
          <h1 className='text-4xl font-bold'>📋 My Tickets</h1>
          <p className='text-green-100 text-sm mt-1'>Manage your support tickets</p>
        </div>

        <div className='flex-1 p-8 overflow-y-auto'>
          {/* Search & Filter */}
          <div className='bg-white rounded-xl border-2 border-gray-200 p-6 mb-8 shadow-lg'>
            <div className='grid grid-cols-3 gap-4'>
              <div className='relative'>
                <FiSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                <input
                  type='text'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder='Search tickets...'
                  className='w-full border-2 border-gray-300 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 font-semibold text-gray-800'
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className='border-2 border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 bg-white font-semibold text-gray-700'
              >
                <option value=''>All Status</option>
                <option value='open'>🔴 Pending</option>
                <option value='in_progress'>🟡 In Progress</option>
                <option value='resolved'>✅ Resolved</option>
              </select>
              <Link
                to='/tickets/create'
                className='bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-3 rounded-lg text-sm font-bold hover:shadow-lg transition-all text-center'
              >
                ➕ New Ticket
              </Link>
            </div>
          </div>

          {/* Tickets Table */}
          <div className='bg-white rounded-xl border-2 border-gray-200 overflow-hidden shadow-lg'>
            {tickets.length === 0 ? (
              <div className='p-12 text-center text-gray-400'>
                <p className='text-lg font-semibold'>No tickets found</p>
                <p className='text-sm mt-1'>Create your first ticket to get started</p>
              </div>
            ) : (
              <div className='overflow-x-auto'>
                <table className='w-full text-sm'>
                  <thead>
                    <tr className='bg-gradient-to-r from-gray-100 to-gray-50 border-b-2 border-gray-300'>
                      <th className='px-6 py-4 text-left font-bold text-gray-800'>ID</th>
                      <th className='px-6 py-4 text-left font-bold text-gray-800'>Title</th>
                      <th className='px-6 py-4 text-left font-bold text-gray-800'>Priority</th>
                      <th className='px-6 py-4 text-left font-bold text-gray-800'>Status</th>
                      <th className='px-6 py-4 text-left font-bold text-gray-800'>Date</th>
                      <th className='px-6 py-4 text-left font-bold text-gray-800'>Action</th>
                    </tr>
                  </thead>
                  <tbody className='divide-y'>
                    {tickets.map((ticket, index) => (
                      <tr key={ticket.id} className='hover:bg-green-50 transition-colors animate-in fade-in' style={{animationDelay: `${index * 30}ms`}}>
                        <td className='px-6 py-4 font-bold text-green-600'>#{ticket.id}</td>
                        <td className='px-6 py-4 font-semibold text-gray-800'>{ticket.title}</td>
                        <td className='px-6 py-4'>
                          <StatusBadge priority={ticket.priority} />
                        </td>
                        <td className='px-6 py-4'>
                          <StatusBadge status={ticket.status} />
                        </td>
                        <td className='px-6 py-4 text-gray-600 text-xs font-semibold'>
                          {new Date(ticket.createdAt).toLocaleDateString('en-PK')}
                        </td>
                        <td className='px-6 py-4'>
                          <div className='flex gap-2'>
                            <Link
                              to={`/tickets/${ticket.id}`}
                              className='flex items-center gap-1 bg-blue-100 text-blue-700 text-xs px-3 py-1.5 rounded-lg hover:bg-blue-200 font-bold transition-all'
                            >
                              <FiEye size={14} /> View
                            </Link>
                            <button
                              onClick={() => handleDelete(ticket.id)}
                              className='flex items-center gap-1 bg-red-100 text-red-700 text-xs px-3 py-1.5 rounded-lg hover:bg-red-200 font-bold transition-all'
                            >
                              <FiTrash2 size={14} /> Delete
                            </button>
                          </div>
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

export default TicketList