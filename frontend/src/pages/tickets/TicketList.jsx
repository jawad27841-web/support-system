import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../../components/Sidebar.jsx'
import StatusBadge from '../../components/StatusBadge.jsx'
import useTickets from '../../hooks/useTickets.js'
import Loader from '../../components/Loader.jsx'
import { FiPlus, FiSearch } from 'react-icons/fi'

const TicketList = () => {
  const { tickets, loading, getTickets } = useTickets()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    const params = { limit: 20 }
    if (search) params.search = search
    if (status) params.status = status
    getTickets(params)
  }, [search, status])

  if (loading) return <Loader />

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <Sidebar />
      <div className='flex-1 p-6'>
        <div className='flex items-center justify-between mb-6'>
          <h1 className='text-2xl font-bold'>My Tickets</h1>
          <Link to='/tickets/create' className='flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm'>
            <FiPlus /> New Ticket
          </Link>
        </div>

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
        <div className='bg-white rounded-xl border border-gray-200'>
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
                  <td className='px-6 py-3'>Priority</td>
                  <td className='px-6 py-3'>Status</td>
                  <td className='px-6 py-3'>Date</td>
                </tr>
              </thead>
              <tbody className='divide-y'>
                {tickets.map((t) => (
                  <tr key={t.id} className='hover:bg-gray-50 cursor-pointer'>
                    <td className='px-6 py-3 text-blue-600 font-bold'>#{t.id}</td>
                    <td className='px-6 py-3 font-medium'>{t.title}</td>
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
      </div>
    </div>
  )
}

export default TicketList