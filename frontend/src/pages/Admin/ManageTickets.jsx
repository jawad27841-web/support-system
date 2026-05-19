import { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import StatusBadge from '../../components/StatusBadge.jsx'
import API from '../../api/axios.js'
import Loader from '../../components/Loader.jsx'
import { FiSearch, FiEdit2 } from 'react-icons/fi'

const ManageTickets = () => {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [newStatus, setNewStatus] = useState('')

  const fetchTickets = async () => {
    try {
      setLoading(true)
      const params = { limit: 100 }
      if (search) params.search = search
      if (status) params.status = status
      
      const res = await API.get('/tickets', { params })
      setTickets(res.data.tickets || [])
    } catch (error) {
      console.log(error)
      alert('Error fetching tickets')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTickets()
  }, [search, status])

  const handleStatusChange = async (ticketId, currentStatus) => {
    try {
      await API.put(`/tickets/${ticketId}`, { status: newStatus })
      
      // Update locally
      setTickets(tickets.map(t => 
        t.id === ticketId ? { ...t, status: newStatus } : t
      ))
      
      setEditingId(null)
      setNewStatus('')
      alert('Status updated successfully!')
    } catch (error) {
      console.log(error)
      alert('Error updating status')
    }
  }

  if (loading) return <Loader />

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <Sidebar />
      <div className='flex-1 p-6'>
        <div className='mb-6'>
          <h1 className='text-3xl font-bold text-gray-800'>Manage All Tickets</h1>
          <p className='text-gray-500 text-sm mt-1'>View, Search, Filter & Update ticket status</p>
        </div>

        {/* Search & Filter Bar */}
        <div className='bg-white rounded-xl border border-gray-200 p-4 mb-6'>
          <div className='grid grid-cols-3 gap-4'>
            <div className='relative'>
              <FiSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
              <input
                type='text'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Search by title or user...'
                className='w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className='border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white'
            >
              <option value=''>All Status</option>
              <option value='open'>🔴 Pending (Open)</option>
              <option value='in_progress'>🟡 In Progress</option>
              <option value='resolved'>✅ Resolved</option>
              <option value='closed'>⚫ Closed</option>
            </select>

            <button
              onClick={fetchTickets}
              className='bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700'
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Table */}
        <div className='bg-white rounded-xl border border-gray-200 overflow-hidden'>
          {tickets.length === 0 ? (
            <div className='flex items-center justify-center h-60 text-gray-400'>
              <div className='text-center'>
                <p className='text-lg'>No tickets found</p>
                <p className='text-sm'>Try adjusting your search or filters</p>
              </div>
            </div>
          ) : (
            <div className='overflow-x-auto'>
              <table className='w-full text-sm'>
                <thead>
                  <tr className='bg-gray-50 border-b border-gray-200'>
                    <th className='px-6 py-4 text-left text-xs font-bold text-gray-700'>ID</th>
                    <th className='px-6 py-4 text-left text-xs font-bold text-gray-700'>Title</th>
                    <th className='px-6 py-4 text-left text-xs font-bold text-gray-700'>User</th>
                    <th className='px-6 py-4 text-left text-xs font-bold text-gray-700'>Priority</th>
                    <th className='px-6 py-4 text-left text-xs font-bold text-gray-700'>Status</th>
                    <th className='px-6 py-4 text-left text-xs font-bold text-gray-700'>Action</th>
                    <th className='px-6 py-4 text-left text-xs font-bold text-gray-700'>Date</th>
                  </tr>
                </thead>
                <tbody className='divide-y'>
                  {tickets.map((t) => (
                    <tr key={t.id} className='hover:bg-gray-50 transition'>
                      <td className='px-6 py-4'>
                        <span className='font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded'>#{t.id}</span>
                      </td>
                      <td className='px-6 py-4'>
                        <div>
                          <p className='font-medium text-gray-900 truncate'>{t.title}</p>
                          <p className='text-xs text-gray-500 truncate'>{t.description?.substring(0, 50)}...</p>
                        </div>
                      </td>
                      <td className='px-6 py-4'>
                        <div>
                          <p className='font-medium'>{t.creator?.name}</p>
                          <p className='text-xs text-gray-500'>{t.creator?.email}</p>
                        </div>
                      </td>
                      <td className='px-6 py-4'>
                        <StatusBadge priority={t.priority} />
                      </td>
                      <td className='px-6 py-4'>
                        {editingId === t.id ? (
                          <select
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}
                            className='border border-gray-300 rounded px-2 py-1 text-xs'
                          >
                            <option value=''>Select Status</option>
                            <option value='open'>Open</option>
                            <option value='in_progress'>In Progress</option>
                            <option value='resolved'>Resolved</option>
                            <option value='closed'>Closed</option>
                          </select>
                        ) : (
                          <StatusBadge status={t.status} />
                        )}
                      </td>
                      <td className='px-6 py-4'>
                        {editingId === t.id ? (
                          <div className='flex gap-2'>
                            <button
                              onClick={() => handleStatusChange(t.id, t.status)}
                              className='bg-green-600 text-white text-xs px-3 py-1 rounded hover:bg-green-700'
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className='bg-gray-400 text-white text-xs px-3 py-1 rounded hover:bg-gray-500'
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setEditingId(t.id)
                              setNewStatus(t.status)
                            }}
                            className='flex items-center gap-1 bg-blue-100 text-blue-700 text-xs px-3 py-1.5 rounded hover:bg-blue-200'
                          >
                            <FiEdit2 size={14} /> Change
                          </button>
                        )}
                      </td>
                      <td className='px-6 py-4 text-xs text-gray-500'>
                        {new Date(t.createdAt).toLocaleDateString('en-PK')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className='mt-6 grid grid-cols-4 gap-4'>
          <div className='bg-white rounded-lg border border-gray-200 p-4 text-center'>
            <p className='text-gray-600 text-sm'>Total Tickets</p>
            <p className='text-3xl font-bold text-gray-800'>{tickets.length}</p>
          </div>
          <div className='bg-red-50 rounded-lg border border-red-200 p-4 text-center'>
            <p className='text-red-600 text-sm'>Pending</p>
            <p className='text-3xl font-bold text-red-700'>
              {tickets.filter(t => t.status === 'open').length}
            </p>
          </div>
          <div className='bg-yellow-50 rounded-lg border border-yellow-200 p-4 text-center'>
            <p className='text-yellow-600 text-sm'>In Progress</p>
            <p className='text-3xl font-bold text-yellow-700'>
              {tickets.filter(t => t.status === 'in_progress').length}
            </p>
          </div>
          <div className='bg-green-50 rounded-lg border border-green-200 p-4 text-center'>
            <p className='text-green-600 text-sm'>Resolved</p>
            <p className='text-3xl font-bold text-green-700'>
              {tickets.filter(t => t.status === 'resolved').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageTickets