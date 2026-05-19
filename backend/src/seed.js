import { connectDB } from './config/database.js'
import { sequelize, User, Category, Ticket } from './models/index.js'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
dotenv.config()

const seed = async () => {
  try {
    await connectDB()
    await sequelize.sync({ alter: true })

    // Users بناؤ
    const adminPass = await bcrypt.hash('1234', 10)
    const agentPass = await bcrypt.hash('1234', 10)
    const userPass = await bcrypt.hash('1234', 10)

    const admin = await User.create({
      name: 'Jawad Ahmed',
      email: 'jawad@test.com',
      password: adminPass,
      role: 'admin'
    })

    const agent = await User.create({
      name: 'Ghulam Husnain',
      email: 'ghulam@test.com',
      password: agentPass,
      role: 'agent'
    })

    const user1 = await User.create({
      name: 'Ali Raza',
      email: 'ali@test.com',
      password: userPass,
      role: 'user'
    })

    const user2 = await User.create({
      name: 'Sara Khan',
      email: 'sara@test.com',
      password: userPass,
      role: 'user'
    })

    // Categories بناؤ
    const technical = await Category.create({
      name: 'Technical',
      description: 'Technical issues'
    })

    const billing = await Category.create({
      name: 'Billing',
      description: 'Billing issues'
    })

    const account = await Category.create({
      name: 'Account',
      description: 'Account issues'
    })

    const network = await Category.create({
      name: 'Network',
      description: 'Network issues'
    })

    const general = await Category.create({
      name: 'General',
      description: 'General issues'
    })

    // Tickets بناؤ
    await Ticket.create({
      title: 'Internet not working',
      description: 'My internet is not working since morning',
      status: 'open',
      priority: 'high',
      category_id: network.id,
      created_by: user1.id,
      assigned_to: agent.id
    })

    await Ticket.create({
      title: 'Payment failed',
      description: 'My payment is not processing',
      status: 'in_progress',
      priority: 'high',
      category_id: billing.id,
      created_by: user1.id,
      assigned_to: agent.id
    })

    await Ticket.create({
      title: 'Unable to login',
      description: 'I cannot login to my account',
      status: 'resolved',
      priority: 'medium',
      category_id: account.id,
      created_by: user2.id,
      assigned_to: agent.id
    })

    await Ticket.create({
      title: 'Refund not received',
      description: 'I have not received my refund yet',
      status: 'open',
      priority: 'medium',
      category_id: billing.id,
      created_by: user2.id,
      assigned_to: agent.id
    })

    await Ticket.create({
      title: 'Website not loading',
      description: 'Website is very slow and not loading',
      status: 'in_progress',
      priority: 'high',
      category_id: technical.id,
      created_by: user1.id,
      assigned_to: agent.id
    })

    await Ticket.create({
      title: 'Feature request',
      description: 'Please add dark mode to the application',
      status: 'closed',
      priority: 'low',
      category_id: general.id,
      created_by: user2.id,
      assigned_to: agent.id
    })

    console.log('✅ Seed data created successfully!')
    console.log('----------------------------')
    console.log('Admin  → jawad@test.com  / 1234')
    console.log('Agent  → ghulam@test.com / 1234')
    console.log('User   → ali@test.com    / 1234')
    console.log('User   → sara@test.com   / 1234')
    console.log('----------------------------')

    process.exit(0)
  } catch (error) {
    console.log('Seed error:', error.message)
    process.exit(1)
  }
}

seed()