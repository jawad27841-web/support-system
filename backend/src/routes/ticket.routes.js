import express from 'express'
import {
  createTicket,
  getAllTickets,
  getMyTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
  addComment,
  getComments
} from '../controllers/ticket.controller.js'
import { protect } from '../middleware/auth.middleware.js'
import { allowRoles } from '../middleware/role.middleware.js'

const router = express.Router()

// Public routes
router.post('/', protect, createTicket)
router.get('/', protect, getAllTickets)
router.get('/my-tickets', protect, getMyTickets)
router.get('/:id', protect, getTicketById)
router.put('/:id', protect, updateTicket)
router.delete('/:id', protect, deleteTicket)

// Comments
router.post('/:id/comments', protect, addComment)
router.get('/:id/comments', protect, getComments)

export default router