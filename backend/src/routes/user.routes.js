import express from 'express'
import {
  getAdminDashboard,
  getUserDashboard,
  getAllUsers,
  updateUser,
  deleteUser
} from '../controllers/dashboard.controller.js'
import { protect } from '../middleware/auth.middleware.js'
import { allowRoles } from '../middleware/role.middleware.js'

const router = express.Router()

// Dashboard
router.get('/admin', protect, allowRoles('admin'), getAdminDashboard)
router.get('/user', protect, getUserDashboard)

// Users Management (Admin only)
router.get('/', protect, allowRoles('admin'), getAllUsers)
router.put('/:id', protect, allowRoles('admin'), updateUser)
router.delete('/:id', protect, allowRoles('admin'), deleteUser)

export default router