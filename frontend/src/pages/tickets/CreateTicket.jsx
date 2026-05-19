import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../components/Sidebar.jsx'
import API from '../../api/axios.js'
import { FiArrowLeft, FiSend } from 'react-icons/fi'

const CreateTicket = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'medium'
  })
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError('')
      
      const res = await API.post('/tickets', form)
      
      alert('✅ Ticket created successfully!')
      navigate('/tickets')
    } catch (error) {
      setError(error.response?.data?.message || 'Error creating ticket')
      alert('❌ ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <Sidebar />
      <div className='flex-1 flex flex-col'>
        {/* Header */}
        <div className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-6 shadow-lg'>
          <div className='flex items-center gap-4'>
            <button
              onClick={() => navigate('/tickets')}
              className='p-2 hover:bg-white/20 rounded-lg transition-all'
            >
              <FiArrowLeft size={24} />
            </button>
            <div>
              <h1 className='text-3xl font-bold'>Create New Ticket</h1>
              <p className='text-blue-100 text-sm mt-1'>Fill in the details below</p>
            </div>
          </div>
        </div>

        <div className='flex-1 p-8 overflow-y-auto'>
          <div className='max-w-2xl mx-auto'>
            <div className='bg-white rounded-2xl border border-gray-200 shadow-xl p-8 animate-in fade-in duration-700'>
              {error && (
                <div className='mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg animate-in fade-in'>
                  ❌ {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className='space-y-6'>
                {/* Title */}
                <div className='animate-in slide-in-from-bottom [animation-delay:100ms]'>
                  <label className='block text-sm font-bold text-gray-700 mb-3'>Ticket Title *</label>
                  <input
                    type='text'
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder='Brief title of the issue'
                    required
                    className='w-full border-2 border-gray-300 rounded-lg px-5 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300'
                  />
                </div>

                {/* Description */}
                <div className='animate-in slide-in-from-bottom [animation-delay:200ms]'>
                  <label className='block text-sm font-bold text-gray-700 mb-3'>Description *</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder='Describe the issue in detail'
                    required
                    rows={6}
                    className='w-full border-2 border-gray-300 rounded-lg px-5 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 resize-none'
                  />
                </div>

                {/* Priority */}
                <div className='animate-in slide-in-from-bottom [animation-delay:300ms]'>
                  <label className='block text-sm font-bold text-gray-700 mb-3'>Priority Level *</label>
                  <div className='grid grid-cols-3 gap-4'>
                    {['low', 'medium', 'high'].map((p) => (
                      <button
                        key={p}
                        type='button'
                        onClick={() => setForm({ ...form, priority: p })}
                        className={`p-4 rounded-lg border-2 font-bold transition-all duration-300 transform hover:scale-105 ${
                          form.priority === p
                            ? p === 'high' ? 'border-red-500 bg-red-50 text-red-700' :
                              p === 'medium' ? 'border-yellow-500 bg-yellow-50 text-yellow-700' :
                              'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400'
                        }`}
                      >
                        {p === 'high' ? '🔴 High' : p === 'medium' ? '🟡 Medium' : '🟢 Low'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className='flex gap-4 pt-6 animate-in slide-in-from-bottom [animation-delay:400ms]'>
                  <button
                    type='submit'
                    disabled={loading}
                    className='flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2'
                  >
                    {loading ? (
                      <>
                        <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                        Creating...
                      </>
                    ) : (
                      <>
                        <FiSend /> Create Ticket
                      </>
                    )}
                  </button>
                  <button
                    type='button'
                    onClick={() => navigate('/tickets')}
                    className='flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-50 transition-all duration-300'
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateTicket