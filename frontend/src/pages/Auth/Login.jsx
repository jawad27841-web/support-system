import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiShield
} from 'react-icons/fi'

import useAuth from '../../hooks/useAuth.js'

const Login = () => {
  const { login, loading, error } = useAuth()

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(form)
  }

  return (
    <div className='min-h-screen flex overflow-hidden'>

      {/* LEFT SIDE */}
      <div className='hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-green-900 to-emerald-900 text-white relative overflow-hidden'>

        {/* Background Effects */}
        <div className='absolute -top-20 -left-20 w-96 h-96 bg-green-500/20 rounded-full blur-3xl'></div>
        <div className='absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-emerald-400/10 rounded-full blur-3xl'></div>

        <div className='relative z-10 flex flex-col justify-center px-20'>

          {/* Logo */}
          <div className='mb-8'>
            <div className='w-20 h-20 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-xl'>
              <FiShield className='text-4xl text-emerald-300' />
            </div>
          </div>

          {/* Title */}
          <h1 className='text-5xl font-extrabold leading-tight mb-6 tracking-tight'>
            Support
            <br />
            Ticket
            <br />
            System
          </h1>

          {/* Description */}
          <p className='text-gray-300 text-base leading-relaxed max-w-md'>
            A modern, secure and scalable platform for managing customer support tickets,
            tracking issues in real-time, and improving team productivity.
          </p>

          {/* Stats */}
          <div className='mt-10 flex gap-10'>

            <div>
              <h2 className='text-3xl font-bold text-emerald-300'>24/7</h2>
              <p className='text-gray-400 text-sm'>Support</p>
            </div>

            <div>
              <h2 className='text-3xl font-bold text-emerald-300'>Fast</h2>
              <p className='text-gray-400 text-sm'>Response</p>
            </div>

            <div>
              <h2 className='text-3xl font-bold text-emerald-300'>Secure</h2>
              <p className='text-gray-400 text-sm'>System</p>
            </div>

          </div>

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className='flex-1 bg-gray-100 flex items-center justify-center p-6 relative'>

        {/* Background blur */}
        <div className='absolute top-0 left-0 w-72 h-72 bg-green-300 rounded-full blur-3xl opacity-20'></div>
        <div className='absolute bottom-0 right-0 w-72 h-72 bg-emerald-300 rounded-full blur-3xl opacity-20'></div>

        {/* LOGIN CARD */}
        <div className='relative z-10 w-full max-w-md'>

          <div className='bg-white rounded-3xl shadow-2xl border border-gray-200 p-10'>

            {/* HEADER */}
            <div className='text-center mb-8'>

              <div className='w-16 h-16 mx-auto bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg mb-5'>
                <FiShield className='text-white text-3xl' />
              </div>

              <h2 className='text-3xl font-extrabold text-gray-800'>
                Welcome Back
              </h2>

              <p className='text-gray-500 mt-2'>
                Sign in to your dashboard
              </p>

            </div>

            {/* ERROR */}
            {error && (
              <div className='mb-5 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm font-medium'>
                {error}
              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleSubmit} className='space-y-5'>

              {/* EMAIL */}
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Email
                </label>

                <div className='relative'>
                  <FiMail className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' />

                  <input
                    type='email'
                    required
                    placeholder='example@gmail.com'
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className='w-full border-2 border-gray-200 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition'
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Password
                </label>

                <div className='relative'>
                  <FiLock className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' />

                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder='Enter password'
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    className='w-full border-2 border-gray-200 rounded-xl pl-12 pr-12 py-3 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition'
                  />

                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600'
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              {/* OPTIONS */}
              <div className='flex justify-between text-sm text-gray-600'>
                <label className='flex items-center gap-2'>
                  <input type='checkbox' />
                  Remember me
                </label>

                <a href='#' className='text-green-600 font-medium'>
                  Forgot password?
                </a>
              </div>

              {/* BUTTON */}
              <button
                type='submit'
                disabled={loading}
                className='w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-bold hover:shadow-xl hover:scale-[1.02] transition'
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>

            </form>

            {/* FOOTER */}
            <p className='text-center text-gray-500 text-sm mt-8'>
              Don&apos;t have an account?
            </p>

            <div className='text-center mt-2'>
              <Link
                to='/register'
                className='text-green-600 font-semibold hover:text-green-700'
              >
                Create account
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Login