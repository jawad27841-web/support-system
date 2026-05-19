const StatusBadge = ({ status, priority }) => {
  const statusStyles = {
    open: 'bg-blue-100 text-blue-700',
    in_progress: 'bg-yellow-100 text-yellow-700',
    resolved: 'bg-green-100 text-green-700',
    closed: 'bg-gray-100 text-gray-600'
  }

  const priorityStyles = {
    high: 'bg-red-100 text-red-600',
    medium: 'bg-orange-100 text-orange-600',
    low: 'bg-green-100 text-green-600'
  }

  const styles = priority ? priorityStyles[priority] : statusStyles[status]
  const text = priority ? priority : status?.replace('_', ' ')

  return <span className={`text-xs px-2 py-1 rounded-full font-medium ${styles}`}>{text}</span>
}

export default StatusBadge