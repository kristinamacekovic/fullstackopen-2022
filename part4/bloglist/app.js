/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const http = require("http")
const express = require("express")
const app = express()
const config = require("./utils/config")
const logger = require("./utils/logger")
const middleware = require("./utils/middleware")
const cors = require("cors")
const postsRouter = require("./controllers/posts")
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const mongoose = require("mongoose")

logger.info("connectin to", config.mongoUrl)

mongoose.connect(config.mongoUrl)
    .then(() => logger.info("connected to mongo"))
    .catch(error => logger.error("something went wrong", error.message))

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use("/api/blogs", middleware.userExtractor, postsRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)

app.use(middleware.unknownEndpoint)
// this has to be the last loaded middleware.
app.use(middleware.errorHandler)

module.exports = app