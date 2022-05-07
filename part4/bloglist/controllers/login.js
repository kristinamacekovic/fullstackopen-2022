const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const loginRouter = require("express").Router()
const User = require("../models/User")

loginRouter.post("/", async (request, response) => {

    // get username and password
    const { username, password } = request.body
    // console.log(password)
    // look up user
    const user = await User.findOne({ username })
    //console.log(user)
    //console.log(user.hashedPassword)
    // check if the password corresponds to the user, if the user was found
    const passwordIsCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.hashedPassword)

    // handle situation if username or password are incorrect
    if (!(user && passwordIsCorrect)) {
        return response.status(401).json({
            error: "invalid username or password"
        })
    }
    
    // continue if user is found and authenticated successfully
    const infoForToken = {
        username: user.user,
        id: user._id
    }

    // eslint-disable-next-line no-undef
    const token = jwt.sign(infoForToken, process.env.SECRET)

    response
        .status(200)
        .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter