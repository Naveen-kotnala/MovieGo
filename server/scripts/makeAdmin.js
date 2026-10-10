const mongoose = require('mongoose')
require('dotenv').config()

const User = require('../models/User')

const makeAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)

    const email = 'naveenkotnala123@gmail.com'

    const user = await User.findOneAndUpdate(
      { email },
      { role: 'admin' },
      { new: true }
    )

    if (!user) {
      console.log('❌ User not found')
      return
    }

    console.log('✅ Admin created successfully')
    console.log(`Name: ${user.name}`)
    console.log(`Email: ${user.email}`)
    console.log(`Role: ${user.role}`)
  } catch (error) {
    console.error('❌ Error:', error.message)
  } finally {
    await mongoose.disconnect()
  }
}

makeAdmin()