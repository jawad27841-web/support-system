import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import { connectDB } from './config/database.js'
import { sequelize } from './models/index.js'

import authRoutes from './routes/auth.routes.js'
import ticketRoutes from './routes/ticket.routes.js'
import dashboardRoutes from './routes/user.routes.js'
import categoryRoutes from './routes/category.routes.js'

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/tickets', ticketRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/users', dashboardRoutes)
app.use('/api/categories', categoryRoutes)

// Home Route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🚀 Support Desk API is running successfully!'
  })
})

// Start Server
const startServer = async () => {
  try {
    // Database Connection
    await connectDB()

    // Sequelize Sync
    await sequelize.sync({ alter: true })

    console.log('✅ All tables created in PostgreSQL!')

    // Port
    const PORT = process.env.PORT || 5000

    // Listen Server
    app.listen(PORT, () => {
      console.log(`🚀 Server running at:`)
      console.log(`👉 http://localhost:${PORT}`)
    })

  } catch (error) {
    console.error('❌ Server error:', error.message)
    process.exit(1)
  }
}

startServer()

export default app