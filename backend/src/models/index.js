import User from './User.js'
import Category from './Category.js'
import Ticket from './Ticket.js'
import TicketLog from './TicketLog.js'
import Comment from './Comment.js'

// Associations
User.hasMany(Ticket, { foreignKey: 'created_by', as: 'createdTickets' })
Ticket.belongsTo(User, { foreignKey: 'created_by', as: 'creator' })

User.hasMany(Ticket, { foreignKey: 'assigned_to', as: 'assignedTickets' })
Ticket.belongsTo(User, { foreignKey: 'assigned_to', as: 'assignee' })

Category.hasMany(Ticket, { foreignKey: 'category_id' })
Ticket.belongsTo(Category, { foreignKey: 'category_id' })

User.hasMany(TicketLog, { foreignKey: 'changed_by' })
TicketLog.belongsTo(User, { foreignKey: 'changed_by' })

Ticket.hasMany(TicketLog, { foreignKey: 'ticket_id' })
TicketLog.belongsTo(Ticket, { foreignKey: 'ticket_id' })

Ticket.hasMany(Comment, { foreignKey: 'ticket_id' })
Comment.belongsTo(Ticket, { foreignKey: 'ticket_id' })

User.hasMany(Comment, { foreignKey: 'user_id' })
Comment.belongsTo(User, { foreignKey: 'user_id' })

export { User, Ticket, TicketLog, Comment, Category }
export { default as sequelize } from '../config/database.js'