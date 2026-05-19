import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ children, roles }) => {
  const { token, user } = useSelector(state => state.auth)

  if (!token) return <Navigate to='/login' />
  if (roles && user && !roles.includes(user.role)) return <Navigate to='/dashboard' />

  return children
}

export default ProtectedRoute