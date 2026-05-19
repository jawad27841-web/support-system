import express from 'express'
import { getReports } from '../controllers/report.controller.js'
import { protect } from '../middleware/auth.middleware.js'
import { allowRoles } from '../middleware/role.middleware.js'

const router = express.Router()

router.get('/', protect, allowRoles('admin'), getReports)

export default router