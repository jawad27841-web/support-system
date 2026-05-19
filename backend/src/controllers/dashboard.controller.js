import { User, Ticket } from '../models/index.js'

export const getAdminDashboard = async (req, res) => {
  try {
    const stats = {
      totalTickets: await Ticket.count(),
      openTickets: await Ticket.count({ where: { status: 'open' } }),
      inProgressTickets: await Ticket.count({ where: { status: 'in_progress' } }),
      resolvedTickets: await Ticket.count({ where: { status: 'resolved' } })
    }

    const recentTickets = await Ticket.findAll({
      order: [['id', 'ASC']],
      limit: 5
    })

    res.json({ stats, recentTickets })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getUserDashboard = async (req, res) => {
  try {
    const userId = req.user.id

    const myTotal = await Ticket.count({ where: { created_by: userId } })
    const myOpen = await Ticket.count({ where: { created_by: userId, status: 'open' } })
    const myInProgress = await Ticket.count({ where: { created_by: userId, status: 'in_progress' } })
    const myResolved = await Ticket.count({ where: { created_by: userId, status: 'resolved' } })

    const myRecentTickets = await Ticket.findAll({
      where: { created_by: userId },
      order: [['id', 'ASC']],
      limit: 5
    })

    res.json({
      stats: { myTotal, myOpen, myInProgress, myResolved },
      myRecentTickets
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'role', 'is_active'],
      order: [['id', 'ASC']]
    })

    res.json({ users })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const { name, email, role, is_active } = req.body

    const user = await User.findByPk(id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    await user.update({ name, email, role, is_active })
    res.json({ message: 'User updated', user })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params

    const user = await User.findByPk(id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    await user.destroy()
    res.json({ message: 'User deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}