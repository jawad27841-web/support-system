const StatCard = ({ title, value, icon: Icon, color }) => {
  const colors = {
    green: 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200',
    blue: 'bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200',
    orange: 'bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200',
    yellow: 'bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-200'
  }

  const textColors = {
    green: 'text-green-700',
    blue: 'text-blue-700',
    orange: 'text-orange-700',
    yellow: 'text-yellow-700'
  }

  const iconColors = {
    green: 'bg-green-200 text-green-700',
    blue: 'bg-blue-200 text-blue-700',
    orange: 'bg-orange-200 text-orange-700',
    yellow: 'bg-yellow-200 text-yellow-700'
  }

  const valueColors = {
    green: 'text-green-600',
    blue: 'text-blue-600',
    orange: 'text-orange-600',
    yellow: 'text-yellow-600'
  }

  return (
    <div className={`${colors[color] || colors.green} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-in fade-in`}>
      <div className='flex items-start justify-between'>
        <div className='flex-1'>
          <p className={`${textColors[color]} text-sm font-bold uppercase tracking-wide`}>{title}</p>
          <p className={`text-4xl font-black mt-3 ${valueColors[color]}`}>{value}</p>
          <p className={`${textColors[color]} text-xs mt-2 opacity-70 font-semibold`}>+12.5% from last month</p>
        </div>
        <div className={`${iconColors[color] || iconColors.green} p-3 rounded-lg flex-shrink-0`}>
          <Icon size={28} />
        </div>
      </div>
    </div>
  )
}

export default StatCard