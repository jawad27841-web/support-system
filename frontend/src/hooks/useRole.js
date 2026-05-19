import { useSelector } from 'react-redux'

const useRole = () => {
  const { user } = useSelector(state => state.auth)
  return {
    isAdmin: user?.role === 'admin',
    isAgent: user?.role === 'agent',
    isUser: user?.role === 'user'
  }
}

export default useRole