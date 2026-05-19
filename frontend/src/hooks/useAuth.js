import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser, registerUser, logoutUser } from '../redux/slices/authSlice.js'

const useAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, token, loading, error } = useSelector(state => state.auth)

  const login = async (data) => {
    const result = await dispatch(loginUser(data))
    if (loginUser.fulfilled.match(result)) {
      navigate('/dashboard')
    }
  }

  const register = async (data) => {
    const result = await dispatch(registerUser(data))
    if (registerUser.fulfilled.match(result)) {
      navigate('/login')
    }
  }

  const logout = () => {
    dispatch(logoutUser())
    navigate('/login')
  }

  return { user, token, loading, error, login, register, logout }
}

export default useAuth