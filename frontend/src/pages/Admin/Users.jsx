import { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import API from '../../api/axios.js'
import Loader from '../../components/Loader.jsx'

const Users = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get('/users')
        setUsers(res.data.users || [])
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  if (loading) return <Loader />

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <Sidebar />
      <div className='flex-1 p-6'>
        <h1 className='text-2xl font-bold mb-6'>Users Management (Admin)</h1>

        <div className='bg-white rounded-xl border border-gray-200 overflow-x-auto'>
          {users.length === 0 ? (
            <div className='flex items-center justify-center h-48 text-gray-400'>
              No users found
            </div>
          ) : (
            <table className='w-full text-sm'>
              <thead>
                <tr className='border-b border-gray-100 text-xs text-gray-500 bg-gray-50'>
                  <td className='px-6 py-3'>ID</td>
                  <td className='px-6 py-3'>Name</td>
                  <td className='px-6 py-3'>Email</td>
                  <td className='px-6 py-3'>Role</td>
                  <td className='px-6 py-3'>Status</td>
                </tr>
              </thead>
              <tbody className='divide-y'>
                {users.map((u) => (
                  <tr key={u.id} className='hover:bg-gray-50'>
                    <td className='px-6 py-3 font-bold text-blue-600'>#{u.id}</td>
                    <td className='px-6 py-3'>{u.name}</td>
                    <td className='px-6 py-3 text-gray-600'>{u.email}</td>
                    <td className='px-6 py-3'>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        u.role === 'admin' ? 'bg-red-100 text-red-700' :
                        u.role === 'agent' ? 'bg-blue-100 text-blue-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className='px-6 py-3'>
                      <span className={`px-2 py-1 rounded text-xs ${
                        u.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {u.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className='mt-4 text-sm text-gray-500'>
          Total Users: <span className='font-bold text-gray-800'>{users.length}</span>
        </div>
      </div>
    </div>
  )
}

export default Users