import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const TicketLog = sequelize.define('TicketLog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ticket_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'tickets',
      key: 'id'
    }
  },
  changed_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  old_status: {
    type: DataTypes.ENUM('open', 'in_progress', 'resolved', 'closed'),
    allowNull: true
  },
  new_status: {
    type: DataTypes.ENUM('open', 'in_progress', 'resolved', 'closed'),
    allowNull: false
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'ticket_logs',
  timestamps: true,
  updatedAt: false
})

export default TicketLog