import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import {
  FiHome,
  FiList,
  FiLogOut,
  FiPlus,
  FiSettings,
  FiEdit3,
  FiMoon,
  FiSun
} from 'react-icons/fi'

import useAuth from '../hooks/useAuth.js'

const Sidebar = () => {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [isDark, setIsDark] = useState(true)

  const isActive = (path) => location.pathname === path
  const isAdmin = user?.role === 'admin'

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: FiHome },
    { path: '/tickets', label: 'My Tickets', icon: FiList },

    ...(!isAdmin
      ? [{ path: '/tickets/create', label: 'Create Ticket', icon: FiPlus }]
      : []),

    ...(isAdmin
      ? [{ path: '/super-admin', label: '🎛️ Admin Panel', icon: FiSettings }]
      : [])
  ]

  return (
    <div className={`w-64 min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-100'} flex flex-col shadow-2xl transition-colors duration-500`}>
      {/* Logo */}
      <div className={`px-6 py-6 ${isDark ? 'bg-gradient-to-r from-green-600 to-emerald-600' : 'bg-gradient-to-r from-green-400 to-emerald-500'} text-white shadow-xl`}>
        <div className='flex items-center gap-3 mb-2'>
          <div className={`w-11 h-11 ${isDark ? 'bg-white' : 'bg-green-900'} rounded-xl flex items-center justify-center shadow-lg`}>
            <FiEdit3 className={`text-2xl font-bold ${isDark ? 'text-green-600' : 'text-green-400'}`} />
          </div>
          <div>
            <h1 className='text-white font-bold text-2xl'>SupportDesk</h1>
            <p className={`${isDark ? 'text-green-100' : 'text-green-900'} text-xs font-semibold`}>Client Support</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`flex-1 px-4 py-6 space-y-2 overflow-y-auto ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-4 px-5 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 group ${
              isActive(item.path)
                ? `${isDark ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg' : 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg'}`
                : `${isDark ? 'text-gray-400 hover:bg-gray-800 hover:text-white' : 'text-gray-600 hover:bg-gray-200 hover:text-green-600'}`
            }`}
          >
            <item.icon size={20} className='group-hover:scale-110 transition-transform' />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Theme Toggle */}
      <div className={`px-4 py-3 border-t ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-gray-200'}`}>
        <button
          onClick={() => setIsDark(!isDark)}
          className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 ${
            isDark 
              ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600' 
              : 'bg-blue-400 text-white hover:bg-blue-500'
          }`}
        >
          {isDark ? (
            <>
              <FiSun size={16} />
              <span className='text-xs font-semibold'>Light</span>
            </>
          ) : (
            <>
              <FiMoon size={16} />
              <span className='text-xs font-semibold'>Dark</span>
            </>
          )}
        </button>
      </div>

      {/* User Profile */}
      <div className={`px-4 py-6 border-t ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-gray-200'}`}>
        <div className={`flex items-center gap-3 px-4 py-4 rounded-xl mb-4 transition-all ${
          isDark ? 'bg-gray-700' : 'bg-gray-300'
        }`}>
          <div className={`w-10 h-10 ${isDark ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-green-400 to-emerald-500'} rounded-full flex items-center justify-center flex-shrink-0 shadow-lg`}>
            <span className='text-white text-sm font-bold'>{user?.name?.charAt(0).toUpperCase()}</span>
          </div>
          <div className='flex-1 min-w-0'>
            <p className={`text-sm font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{user?.name}</p>
            <p className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{user?.role}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className='w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transform hover:scale-105 transition-all duration-300 shadow-lg'
        >
          <FiLogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  )
}

export default Sidebar