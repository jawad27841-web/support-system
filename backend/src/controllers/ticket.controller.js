import { Ticket, Comment, TicketLog, User, Category } from '../models/index.js'
import { Op } from 'sequelize'

export const createTicket = async (req, res) => {
  try {
    const { title, description, priority, category_id } = req.body
    const userId = req.user.id

    const ticket = await Ticket.create({
      title,
      description,
      priority: priority || 'medium',
      category_id,
      created_by: userId,
      status: 'open'
    })

    res.status(201).json({ message: 'Ticket created', ticket })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getAllTickets = async (req, res) => {
  try {
    const { search, status, priority, page = 1, limit = 10 } = req.query

    const where = {}
    if (search) where.title = { [Op.iLike]: `%${search}%` }
    if (status) where.status = status
    if (priority) where.priority = priority

    const tickets = await Ticket.findAll({
      where,
      include: [{ model: User, as: 'creator', attributes: ['id', 'name', 'email'] }],
      order: [['id', 'ASC']],
      offset: (page - 1) * limit,
      limit: parseInt(limit)
    })

    const total = await Ticket.count({ where })

    res.json({ tickets, total, page: parseInt(page), limit: parseInt(limit) })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getMyTickets = async (req, res) => {
  try {
    const userId = req.user.id
    const { page = 1, limit = 10 } = req.query

    const tickets = await Ticket.findAll({
      where: { created_by: userId },
      include: [{ model: User, as: 'creator', attributes: ['id', 'name', 'email'] }],
      order: [['id', 'ASC']],
      offset: (page - 1) * limit,
      limit: parseInt(limit)
    })

    res.json({ tickets })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getTicketById = async (req, res) => {
  try {
    const { id } = req.params

    const ticket = await Ticket.findByPk(id, {
      include: [
        { model: User, as: 'creator', attributes: ['id', 'name', 'email'] },
        { model: Comment, include: [{ model: User, attributes: ['id', 'name'] }] }
      ]
    })

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' })
    }

    res.json({ ticket })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateTicket = async (req, res) => {
  try {
    const { id } = req.params
    const { status, priority, assigned_to } = req.body
    const userId = req.user.id

    const ticket = await Ticket.findByPk(id)
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' })
    }

    const oldStatus = ticket.status

    await ticket.update({ status, priority, assigned_to })

    if (oldStatus !== status) {
      await TicketLog.create({
        ticket_id: id,
        changed_by: userId,
        old_status: oldStatus,
        new_status: status
      })
    }

    res.json({ message: 'Ticket updated', ticket })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params

    const ticket = await Ticket.findByPk(id)
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' })
    }

    await ticket.destroy()
    res.json({ message: 'Ticket deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const addComment = async (req, res) => {
  try {
    const { id } = req.params
    const { message, is_internal } = req.body
    const userId = req.user.id

    const ticket = await Ticket.findByPk(id)
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' })
    }

    const comment = await Comment.create({
      ticket_id: id,
      user_id: userId,
      message,
      is_internal: is_internal || false
    })

    res.status(201).json({ message: 'Comment added', comment })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getComments = async (req, res) => {
  try {
    const { id } = req.params

    const comments = await Comment.findAll({
      where: { ticket_id: id },
      include: [{ model: User, attributes: ['id', 'name', 'email'] }],
      order: [['createdAt', 'DESC']]
    })

    res.json({ comments })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}