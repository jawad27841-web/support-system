import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMe } from './redux/slices/authSlice.js'
import ProtectedRoute from './components/ProtectedRoute.jsx'

// Auth Pages
import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'

// Dashboard
import Dashboard from './pages/dashboard/Dashboard.jsx'

// Tickets
import TicketList from './pages/tickets/TicketList.jsx'
import TicketDetail from './pages/tickets/TicketDetail.jsx'
import CreateTicket from './pages/tickets/CreateTicket.jsx'

// Admin Panel
import SuperPanel from './pages/admin/SuperPanel.jsx'

const App = () => {
  const dispatch = useDispatch()
  const { token } = useSelector(state => state.auth)

  useEffect(() => {
    if (token) dispatch(getMe())
  }, [token, dispatch])

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/* Protected Routes - All Users */}
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path='/tickets' element={<ProtectedRoute><TicketList /></ProtectedRoute>} />
        <Route path='/tickets/:id' element={<ProtectedRoute><TicketDetail /></ProtectedRoute>} />
        <Route path='/tickets/create' element={<ProtectedRoute><CreateTicket /></ProtectedRoute>} />

        {/* Protected Routes - Admin Only */}
        <Route path='/super-admin' element={<ProtectedRoute roles={['admin']}><SuperPanel /></ProtectedRoute>} />

        {/* Default Routes */}
        <Route path='/' element={<Navigate to='/dashboard' />} />
        <Route path='*' element={<Navigate to='/dashboard' />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App 