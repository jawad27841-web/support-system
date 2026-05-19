const StatCard = ({ title, value, icon: Icon, color }) => {
  const colors = {
    blue: { bg: 'bg-blue-50', icon: 'text-blue-600' },
    orange: { bg: 'bg-orange-50', icon: 'text-orange-500' },
    yellow: { bg: 'bg-yellow-50', icon: 'text-yellow-500' },
    green: { bg: 'bg-green-50', icon: 'text-green-500' }
  }

  return (
    <div className='bg-white rounded-xl p-4 border border-gray-200'>
      <div className='flex items-center justify-between mb-3'>
        <p className='text-xs text-gray-500'>{title}</p>
        <div className={`w-8 h-8 ${colors[color].bg} rounded-lg flex items-center justify-center`}>
          <Icon className={`text-sm ${colors[color].icon}`} />
        </div>
      </div>
      <p className='text-2xl font-bold text-gray-800'>{value}</p>
      <p className='text-xs text-green-500 mt-1'>+12.5% from last month</p>
    </div>
  )
}

export default StatCard