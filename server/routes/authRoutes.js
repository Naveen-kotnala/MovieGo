const express = require('express')

const {
  registerUser,
  loginUser,
  getAllUsers,
} = require('../controllers/authController')

const adminMiddleware = require('../middleware/adminMiddleware')

const router = express.Router()

router.post('/register', registerUser)

router.post('/login', loginUser)

router.get('/users', adminMiddleware, getAllUsers)

module.exports = router