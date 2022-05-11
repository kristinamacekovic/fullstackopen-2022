const logger = require("../utils/logger")

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
    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" })
    } else if (error.name === "ValidationError") {
        return response.status(400).send({ error: "Validation Failed" })
    } else if (error.name === "JsonWebTokenError") {
        return response.status(401).json({ error: "token invalid"})
    }
    logger.error(error.message)
    next(error)
}

const tokenExtractor = (request, response, next) => {
    const auth = request.get("Authorization")
    // console.log(request)
    // console.log(auth)
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
        const token = auth.substring(7)
        // console.log(token)
        request.token = token
    } else {
        request.token = null
    }
    next()
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor
}
