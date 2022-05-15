/* eslint-disable no-undef */
const logger = require("../utils/logger")
const User = require("../models/User")
const jwt = require("jsonwebtoken")

const requestLogger = (request, response, next) => {
    logger.info("Method:", request.method)
    logger.info("Path:  ", request.path)
    logger.info("Body:  ", request.body)
    logger.info("---")
    next()
}

function unknownEndpoint(request, response) {
    response.status(404).send({ error: "unknown endpoint" })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" })
    } else if (error.name === "ValidationError") {
        return response.status(400).send({ error: "Validation Failed" })
    } else if (error.name === "JsonWebTokenError") {
        return response.status(401).json({ error: "token invalid"})
    }
    next(error)
}

const tokenExtractor = (request, response, next) => {
    const auth = request.get("Authorization")
    // console.log(request)
    // console.log(auth)
    // console.log(typeof auth)
    if (auth && auth.toLowerCase().startsWith("bearer ") && auth.toLowerCase() !== "bearer undefined") {
        const token = auth.substring(7)
        // console.log(token)
        request.token = token
    } else {
        request.token = null
    }
    next()
}

const userExtractor = async (request, response, next) => {
    if (request.token) {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({ error: "token missing or invalid" })
        }
        const foundUser = await User.findById(decodedToken.id)
        request.user = foundUser
        next()
    } else {
        return response.status(401).json({ error: "token missing or invalid" })
    }
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}
