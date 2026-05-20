import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiShield } from 'react-icons/fi'
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
      alert('❌ Passwords do not match')
      return
    }

    await register({
      name: form.name,
      email: form.email,
      password: form.password,
      role: form.role
    })
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
            Join Our
            <br />
            Support
            <br />
            Platform
          </h1>

          {/* Description */}
          <p className='text-gray-300 text-base leading-relaxed max-w-md'>
            Create an account to manage tickets, track issues in real-time,
            and collaborate with your team seamlessly.
          </p>

          {/* Stats */}
          <div className='mt-10 flex gap-10'>

            <div>
              <h2 className='text-3xl font-bold text-emerald-300'>1000+</h2>
              <p className='text-gray-400 text-sm'>Active Users</p>
            </div>

            <div>
              <h2 className='text-3xl font-bold text-emerald-300'>99.9%</h2>
              <p className='text-gray-400 text-sm'>Uptime</p>
            </div>

            <div>
              <h2 className='text-3xl font-bold text-emerald-300'>24/7</h2>
              <p className='text-gray-400 text-sm'>Support</p>
            </div>

          </div>

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className='flex-1 bg-gray-100 flex items-center justify-center p-6 relative'>

        {/* Background blur */}
        <div className='absolute top-0 left-0 w-72 h-72 bg-green-300 rounded-full blur-3xl opacity-20'></div>
        <div className='absolute bottom-0 right-0 w-72 h-72 bg-emerald-300 rounded-full blur-3xl opacity-20'></div>

        {/* REGISTER CARD */}
        <div className='relative z-10 w-full max-w-md'>

          <div className='bg-white rounded-3xl shadow-2xl border border-gray-200 p-10'>

            {/* HEADER */}
            <div className='text-center mb-8'>

              <div className='w-16 h-16 mx-auto bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg mb-5'>
                <FiUser className='text-white text-3xl' />
              </div>

              <h2 className='text-3xl font-extrabold text-gray-800'>
                Create Account
              </h2>

              <p className='text-gray-500 mt-2'>
                Sign up to get started with Support Ticket System
              </p>

            </div>

            {/* ERROR */}
            {error && (
              <div className='mb-5 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm font-medium'>
                ❌ {error}
              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleSubmit} className='space-y-5'>

              {/* NAME */}
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Full Name
                </label>

                <div className='relative'>
                  <FiUser className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' />

                  <input
                    type='text'
                    name='name'
                    required
                    placeholder='John Doe'
                    value={form.name}
                    onChange={handleChange}
                    className='w-full border-2 border-gray-200 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition'
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Email Address
                </label>

                <div className='relative'>
                  <FiMail className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' />

                  <input
                    type='email'
                    name='email'
                    required
                    placeholder='example@gmail.com'
                    value={form.email}
                    onChange={handleChange}
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
                    name='password'
                    required
                    placeholder='Create a strong password'
                    value={form.password}
                    onChange={handleChange}
                    className='w-full border-2 border-gray-200 rounded-xl pl-12 pr-12 py-3 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition'
                  />

                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600 transition'
                  >
                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </button>
                </div>
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Confirm Password
                </label>

                <div className='relative'>
                  <FiLock className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' />

                  <input
                    type={showConfirm ? 'text' : 'password'}
                    name='confirmPassword'
                    required
                    placeholder='Confirm your password'
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className={`w-full border-2 rounded-xl pl-12 pr-12 py-3 focus:outline-none focus:ring-4 transition ${
                      !passwordMatch && form.confirmPassword
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                        : 'border-gray-200 focus:border-green-500 focus:ring-green-100'
                    }`}
                  />

                  <button
                    type='button'
                    onClick={() => setShowConfirm(!showConfirm)}
                    className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600 transition'
                  >
                    {showConfirm ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </button>
                </div>

                {!passwordMatch && form.confirmPassword && (
                  <p className='text-red-600 text-sm font-semibold mt-2'>
                    ❌ Passwords do not match
                  </p>
                )}
              </div>

              {/* ROLE */}
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Account Type
                </label>

                <div className='grid grid-cols-3 gap-3'>
                  {[
                    { value: 'user', label: '👤 User', color: 'green' },
                    { value: 'agent', label: '👨‍💼 Agent', color: 'blue' },
                    { value: 'admin', label: '🔐 Admin', color: 'red' }
                  ].map((role) => (
                    <button
                      key={role.value}
                      type='button'
                      onClick={() => setForm({ ...form, role: role.value })}
                      className={`p-3 rounded-xl font-semibold transition border-2 text-sm ${
                        form.role === role.value
                          ? role.color === 'green'
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : role.color === 'blue'
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-red-500 bg-red-50 text-red-700'
                          : 'border-gray-300 text-gray-600 hover:border-gray-400'
                      }`}
                    >
                      {role.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* BUTTON */}
              <button
                type='submit'
                disabled={loading || !passwordMatch}
                className='w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-bold hover:shadow-xl hover:scale-[1.02] transition disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {loading ? (
                  <span className='flex items-center justify-center gap-2'>
                    <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                    Creating Account...
                  </span>
                ) : (
                  '✨ Create Account'
                )}
              </button>

            </form>

            {/* FOOTER */}
            <p className='text-center text-gray-500 text-sm mt-8'>
              Already have an account?
            </p>

            <div className='text-center mt-2'>
              <Link
                to='/login'
                className='text-green-600 font-semibold hover:text-green-700 transition'
              >
                Sign in here
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Register