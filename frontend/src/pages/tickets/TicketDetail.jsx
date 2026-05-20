import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { FiArrowLeft, FiEdit2, FiSave, FiX, FiMessageSquare, FiTrash2 } from 'react-icons/fi'
import API from '../../api/axios.js'
import Sidebar from '../../components/Sidebar.jsx'
import StatusBadge from '../../components/StatusBadge.jsx'
import Loader from '../../components/Loader.jsx'

const TicketDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [ticket, setTicket] = useState(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [editForm, setEditForm] = useState({})

  const fetchTicket = async () => {
    try {
      setLoading(true)
      const res = await API.get(`/tickets/${id}`)
      setTicket(res.data.ticket)
      setEditForm(res.data.ticket)
      
      // Fetch comments
      const commentsRes = await API.get(`/tickets/${id}/comments`)
      setComments(commentsRes.data.comments || [])
    } catch (error) {
      console.error('Error:', error)
      alert('❌ Error loading ticket')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTicket()
  }, [id])

  const handleUpdate = async () => {
    try {
      await API.put(`/tickets/${id}`, {
        title: editForm.title,
        description: editForm.description,
        priority: editForm.priority
      })
      setTicket(editForm)
      setEditing(false)
      alert('✅ Ticket updated successfully!')
    } catch (error) {
      alert('❌ Error updating ticket')
    }
  }

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      alert('❌ Please enter a comment')
      return
    }
    try {
      await API.post(`/tickets/${id}/comments`, { text: newComment })
      setNewComment('')
      fetchTicket()
      alert('✅ Comment added successfully!')
    } catch (error) {
      alert('❌ Error adding comment')
    }
  }

  const handleDelete = async () => {
    if (window.confirm('⚠️ کیا آپ یہ ticket delete کرنا چاہتے ہیں؟')) {
      try {
        await API.delete(`/tickets/${id}`)
        alert('✅ Ticket deleted!')
        navigate('/tickets')
      } catch (error) {
        alert('❌ Error deleting ticket')
      }
    }
  }

  if (loading) return <Loader />

  if (!ticket) {
    return (
      <div className='flex min-h-screen bg-gray-50'>
        <Sidebar />
        <div className='flex-1 flex items-center justify-center'>
          <div className='text-center'>
            <p className='text-lg font-bold text-gray-600'>❌ Ticket not found</p>
            <Link to='/tickets' className='text-green-600 font-bold mt-4 inline-block'>
              ← Back to Tickets
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <Sidebar />
      <div className='flex-1 flex flex-col'>
        {/* Header */}
        <div className='bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-6 shadow-lg'>
          <div className='flex items-center gap-4'>
            <button
              onClick={() => navigate('/tickets')}
              className='p-2 hover:bg-white/20 rounded-lg transition-all'
            >
              <FiArrowLeft size={24} />
            </button>
            <div>
              <h1 className='text-3xl font-bold'>🎫 Ticket #{ticket.id}</h1>
              <p className='text-green-100 text-sm mt-1'>View and manage ticket details</p>
            </div>
          </div>
        </div>

        <div className='flex-1 p-8 overflow-y-auto'>
          <div className='max-w-4xl mx-auto'>
            {/* Main Content */}
            <div className='grid grid-cols-3 gap-6 mb-8'>
              {/* Left - Ticket Details */}
              <div className='col-span-2 space-y-6'>
                {/* Ticket Card */}
                <div className='bg-white rounded-xl border-2 border-gray-200 p-8 shadow-lg hover:shadow-xl transition-all'>
                  <div className='flex justify-between items-start mb-6'>
                    <div className='flex-1'>
                      {editing ? (
                        <input
                          type='text'
                          value={editForm.title}
                          onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                          className='w-full text-3xl font-bold text-gray-800 border-2 border-green-500 rounded-lg px-4 py-2 focus:outline-none'
                        />
                      ) : (
                        <h2 className='text-3xl font-bold text-gray-800 mb-2'>{ticket.title}</h2>
                      )}
                      <p className='text-gray-500 text-sm'>Ticket ID: #{ticket.id}</p>
                    </div>
                    <div className='flex gap-2'>
                      {editing ? (
                        <>
                          <button
                            onClick={handleUpdate}
                            className='flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-bold transition-all'
                          >
                            <FiSave /> Save
                          </button>
                          <button
                            onClick={() => setEditing(false)}
                            className='flex items-center gap-2 bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 font-bold transition-all'
                          >
                            <FiX /> Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => setEditing(true)}
                            className='flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-bold transition-all'
                          >
                            <FiEdit2 /> Edit
                          </button>
                          <button
                            onClick={handleDelete}
                            className='flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 font-bold transition-all'
                          >
                            <FiTrash2 /> Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Ticket Info Grid */}
                  <div className='grid grid-cols-2 gap-6 mb-6 border-t-2 border-b-2 border-gray-200 py-6'>
                    <div>
                      <p className='text-gray-600 text-xs font-bold uppercase mb-2'>Created By</p>
                      <p className='text-lg font-bold text-gray-800'>{ticket.creator?.name}</p>
                      <p className='text-sm text-gray-500'>{ticket.creator?.email}</p>
                    </div>
                    <div>
                      <p className='text-gray-600 text-xs font-bold uppercase mb-2'>Created Date</p>
                      <p className='text-lg font-bold text-gray-800'>
                        {new Date(ticket.createdAt).toLocaleDateString('en-PK')}
                      </p>
                      <p className='text-sm text-gray-500'>
                        {new Date(ticket.createdAt).toLocaleTimeString('en-PK')}
                      </p>
                    </div>
                  </div>

                  {/* Status & Priority */}
                  <div className='grid grid-cols-3 gap-4 mb-8'>
                    <div className='bg-green-50 rounded-lg p-4 border-2 border-green-200'>
                      <p className='text-green-700 text-xs font-bold uppercase mb-2'>Status</p>
                      <StatusBadge status={ticket.status} />
                    </div>
                    <div className='bg-blue-50 rounded-lg p-4 border-2 border-blue-200'>
                      <p className='text-blue-700 text-xs font-bold uppercase mb-2'>Priority</p>
                      <StatusBadge priority={ticket.priority} />
                    </div>
                    <div className='bg-gray-50 rounded-lg p-4 border-2 border-gray-200'>
                      <p className='text-gray-700 text-xs font-bold uppercase mb-2'>Category</p>
                      <p className='text-lg font-bold text-gray-800'>
                        {ticket.category?.name || 'Uncategorized'}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <p className='text-gray-700 text-xs font-bold uppercase mb-3'>Description</p>
                    {editing ? (
                      <textarea
                        value={editForm.description}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        className='w-full border-2 border-green-500 rounded-lg px-4 py-3 text-sm focus:outline-none font-semibold text-gray-800'
                        rows={6}
                      />
                    ) : (
                      <div className='bg-gray-50 rounded-lg p-4 border-2 border-gray-200'>
                        <p className='text-gray-800 font-semibold whitespace-pre-wrap'>
                          {ticket.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Comments Section */}
                <div className='bg-white rounded-xl border-2 border-gray-200 p-8 shadow-lg'>
                  <h3 className='text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2'>
                    <FiMessageSquare /> Comments ({comments.length})
                  </h3>

                  {/* Add Comment */}
                  <div className='mb-8 pb-8 border-b-2 border-gray-200'>
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder='Add a comment...'
                      className='w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 resize-none font-semibold text-gray-800'
                      rows={4}
                    />
                    <button
                      onClick={handleAddComment}
                      className='mt-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:shadow-lg font-bold transition-all'
                    >
                      ➕ Add Comment
                    </button>
                  </div>

                  {/* Comments List */}
                  {comments.length === 0 ? (
                    <div className='text-center py-8 text-gray-400'>
                      <p className='text-lg font-semibold'>No comments yet</p>
                      <p className='text-sm'>Be the first to comment</p>
                    </div>
                  ) : (
                    <div className='space-y-4'>
                      {comments.map((comment, index) => (
                        <div key={index} className='bg-gray-50 rounded-lg p-4 border-2 border-gray-200 hover:border-green-300 transition-all'>
                          <div className='flex justify-between items-start mb-2'>
                            <div>
                              <p className='font-bold text-gray-800'>{comment.user?.name}</p>
                              <p className='text-xs text-gray-500'>{comment.user?.email}</p>
                            </div>
                            <p className='text-xs text-gray-400'>
                              {new Date(comment.createdAt).toLocaleDateString('en-PK')}
                            </p>
                          </div>
                          <p className='text-gray-800 font-semibold whitespace-pre-wrap'>
                            {comment.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Right - Sidebar Info */}
              <div className='col-span-1'>
                {/* Summary Card */}
                <div className='bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200 p-6 shadow-lg sticky top-8'>
                  <h3 className='text-lg font-bold text-green-800 mb-6'>📋 Summary</h3>

                  <div className='space-y-5'>
                    {/* Status */}
                    <div className='pb-5 border-b-2 border-green-200'>
                      <p className='text-green-700 text-xs font-bold uppercase mb-2'>Current Status</p>
                      <StatusBadge status={ticket.status} />
                    </div>

                    {/* Priority */}
                    <div className='pb-5 border-b-2 border-green-200'>
                      <p className='text-green-700 text-xs font-bold uppercase mb-2'>Priority Level</p>
                      <StatusBadge priority={ticket.priority} />
                    </div>

                    {/* Category */}
                    <div className='pb-5 border-b-2 border-green-200'>
                      <p className='text-green-700 text-xs font-bold uppercase mb-2'>Category</p>
                      <p className='text-sm font-bold text-green-900'>
                        {ticket.category?.name || 'Uncategorized'}
                      </p>
                    </div>

                    {/* Created */}
                    <div className='pb-5 border-b-2 border-green-200'>
                      <p className='text-green-700 text-xs font-bold uppercase mb-2'>Created</p>
                      <p className='text-xs font-bold text-green-900'>
                        {new Date(ticket.createdAt).toLocaleDateString('en-PK')}
                      </p>
                    </div>

                    {/* Comments Count */}
                    <div className='pb-5 border-b-2 border-green-200'>
                      <p className='text-green-700 text-xs font-bold uppercase mb-2'>Comments</p>
                      <p className='text-2xl font-bold text-green-600'>{comments.length}</p>
                    </div>

                    {/* Action Button */}
                    <Link
                      to='/tickets'
                      className='block w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-3 rounded-lg hover:shadow-lg font-bold transition-all text-center'
                    >
                      ← Back to Tickets
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketDetail