import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from 'react-icons/fi'
import useAuth from '../../hooks/useAuth.js'

const Register = () => {
  const navigate = useNavigate()
  const { register, loading, error } = useAuth()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [passwordMatch, setPasswordMatch] = useState(true)

  const handleChange = (e) => {
    const { name, value } = e.target

    const updated = { ...form, [name]: value }
    setForm(updated)

    if (name === 'confirmPassword' || name === 'password') {
      setPasswordMatch(updated.password === updated.confirmPassword)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match')
      return
    }

    await register({
      name: form.name,
      email: form.email,
      password: form.password,
      role: form.role
    })

    // optional redirect after success
    // navigate('/login')
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-green-900 to-emerald-800 p-4'>

      <div className='w-full max-w-5xl grid lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden'>

        {/* LEFT SIDE */}
        <div className='hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-green-600 to-emerald-600 text-white p-10'>

          <h1 className='text-4xl font-bold mb-4'>Support Ticket System</h1>

          <p className='text-center text-green-100 mb-6'>
            Join our platform to manage customer support tickets efficiently
            and professionally.
          </p>

          <img
            src='https://illustrations.popsy.co/green/customer-support.svg'
            alt='support'
            className='w-80'
          />

        </div>

        {/* RIGHT SIDE */}
        <div className='p-10'>

          {/* HEADER */}
          <h2 className='text-3xl font-bold text-gray-800 mb-2'>
            Create Account
          </h2>

          <p className='text-gray-500 mb-6'>
            Sign up to get started
          </p>

          {/* ERROR */}
          {error && (
            <div className='bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm'>
              {error}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className='space-y-4'>

            {/* NAME */}
            <div>
              <label className='text-sm font-semibold'>Full Name</label>
              <div className='relative mt-1'>
                <FiUser className='absolute left-3 top-3 text-gray-400' />
                <input
                  type='text'
                  name='name'
                  value={form.name}
                  onChange={handleChange}
                  required
                  className='w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-green-400 outline-none'
                  placeholder='Enter name'
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className='text-sm font-semibold'>Email</label>
              <div className='relative mt-1'>
                <FiMail className='absolute left-3 top-3 text-gray-400' />
                <input
                  type='email'
                  name='email'
                  value={form.email}
                  onChange={handleChange}
                  required
                  className='w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-green-400 outline-none'
                  placeholder='example@gmail.com'
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className='text-sm font-semibold'>Password</label>
              <div className='relative mt-1'>
                <FiLock className='absolute left-3 top-3 text-gray-400' />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  value={form.password}
                  onChange={handleChange}
                  required
                  className='w-full border rounded-lg pl-10 pr-10 py-2 focus:ring-2 focus:ring-green-400 outline-none'
                  placeholder='Password'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-2.5 text-gray-500'
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className='text-sm font-semibold'>Confirm Password</label>
              <div className='relative mt-1'>
                <FiLock className='absolute left-3 top-3 text-gray-400' />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  name='confirmPassword'
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  className={`w-full border rounded-lg pl-10 pr-10 py-2 outline-none focus:ring-2 ${
                    passwordMatch ? 'focus:ring-green-400' : 'border-red-400 focus:ring-red-400'
                  }`}
                  placeholder='Confirm password'
                />
                <button
                  type='button'
                  onClick={() => setShowConfirm(!showConfirm)}
                  className='absolute right-3 top-2.5 text-gray-500'
                >
                  {showConfirm ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              {!passwordMatch && form.confirmPassword && (
                <p className='text-red-500 text-xs mt-1'>
                  Passwords do not match
                </p>
              )}
            </div>

            {/* ROLE */}
            <div>
              <label className='text-sm font-semibold'>Role</label>
              <select
                name='role'
                value={form.role}
                onChange={handleChange}
                className='w-full border rounded-lg px-3 py-2 mt-1'
              >
                <option value='user'>User</option>
                <option value='agent'>Agent</option>
                <option value='admin'>Admin</option>
              </select>
            </div>

            {/* BUTTON */}
            <button
              type='submit'
              disabled={loading || !passwordMatch}
              className='w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition'
            >
              {loading ? 'Creating Account...' : 'Register'}
            </button>

          </form>

          {/* LOGIN LINK */}
          <p className='text-sm text-center mt-6'>
            Already have an account?{' '}
            <Link to='/login' className='text-green-600 font-semibold'>
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}

export default Register