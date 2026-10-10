const jwt = require('jsonwebtoken')
const User = require('../models/User')

const adminMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Authentication required',
      })
    }

    const token = authHeader.split(' ')[1]

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    )

    const user = await User.findById(decoded.id)

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      })
    }

    if (user.role !== 'admin') {
      return res.status(403).json({
        message: 'Admin access required',
      })
    }

    req.user = user

    next()
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid or expired token',
    })
  }
}

module.exports = adminMiddleware