/* eslint-disable no-unused-vars */
const postsRouter = require("express").Router()
const Blog = require("../models/Blog")
const User = require("../models/User")
const jwt = require("jsonwebtoken")

const getTokenFromHeader = request => {
    const auth = request.get("authorization")
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
        return auth.substring(7)
    }
    return null
}

postsRouter.get("/", async (request, response, next) => {
    try {
        const getBlogs = await Blog.find({}).populate("user")
        response.json(getBlogs)
    } catch(error) {
        next(error)
    }
})

postsRouter.post("/", async (request, response, next) => {
    const body = request.body
    const token = getTokenFromHeader(request)
    // eslint-disable-next-line no-undef
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: "token missing or invalid" })
    }
    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })
    try {
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.status(201).json(savedBlog)
    } catch(error) {
        next(error)
    }
})

postsRouter.delete("/:id", async (request, response, next) => {
    try {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } catch(error) {
        next(error)
    }
})

postsRouter.put("/:id", async (request, response, next) => {
    const blog = new Blog(request.body)
    try {
        const result = await Blog.findByIdAndUpdate(request.params.id, {
            title: blog.title,
            url: blog.url,
            author: blog.author,
            likes: blog.likes
        }, {new: true})
        response.json(result)
    } catch(error) {
        next(error)
    }
})

module.exports = postsRouter