import { User } from '../models/index.js'

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']]
    })
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateUserRole = async (req, res) => {
  try {
    const { role, is_active } = req.body
    const user = await User.findByPk(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    await user.update({ role, is_active })
    res.json({ message: 'User updated', user })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    await user.destroy()
    res.json({ message: 'User deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}