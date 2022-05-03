const usersRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

usersRouter.post('/', async (request, response) => {
    // get username and password
    const { username, password, name } = request.body
    // encrypt the password
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    // save the username and encrypted password to db
    const user = new User({
        username,
        name,
        hashedPassword
    })
    const savedUser = await user.save()
    // send response
    response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

module.exports = usersRouter