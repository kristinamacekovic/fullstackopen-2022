const usersRouter = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")

usersRouter.post("/", async (request, response) => {
    // get username and password
    const { username, password, name } = request.body
    /**
     * Validations:
     * Both username and password must be given.
     * Both username and password must be at least 3 characters long.
     * The username must be unique
     */
    // username and password must be given
    if (!(username && password)) {
        return response.status(400).json({
            error: "Username and password are required, please provide them and try again"
        })
    }
    // username and password must be at least 3 chars long
    if (username.length<3 || password.length<3) {
        return response.status(400).json({
            error: "Username or password length below 3, please provide longer credentials"
        })
    }
    // username must be unique
    const found = await User.find({username})
    if (found.length>0) {
        return response.status(400).json({
            error: "Username must be unique"
        })
    }
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

usersRouter.get("/", async (request, response) => {
    const users = await User.find({}).populate("blogs")
    response.json(users)
})

module.exports = usersRouter