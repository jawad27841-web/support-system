import express from 'express'
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from '../controllers/category.controller.js'
import { protect } from '../middleware/auth.middleware.js'
import { allowRoles } from '../middleware/role.middleware.js'

const router = express.Router()

router.get('/', protect, getAllCategories)
router.post('/', protect, allowRoles('admin'), createCategory)
router.put('/:id', protect, allowRoles('admin'), updateCategory)
router.delete('/:id', protect, allowRoles('admin'), deleteCategory)

export default router