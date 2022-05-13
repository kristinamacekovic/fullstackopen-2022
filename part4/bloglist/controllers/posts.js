/* eslint-disable quotes */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const postsRouter = require("express").Router()
const Blog = require("../models/Blog")
const User = require("../models/User")
const jwt = require("jsonwebtoken")

postsRouter.get("/", async (request, response, next) => {
    console.log(request.token)
    try {
        const getBlogs = await Blog.find({}).populate("user")
        response.status(200).json(getBlogs)
    } catch(error) {
        next(error)
    }
})

postsRouter.post("/", async (request, response, next) => {
    if (!request.token) {
        return response.status(401).json({error:"Unauthorized"})
    }
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    try {
        const body = request.body
        const user = request.user
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            user: user._id
        })
        if (blog.user._id.toString() === user._id.toString()) {
            const savedBlog = await blog.save()
            user.blogs = user.blogs.concat(savedBlog._id)
            await user.save()
            response.status(201).json(savedBlog)
        }   
        //response.status(401).json({ error: "Unauthorized" })
    } catch(error) {
        next(error)
    }
})

postsRouter.delete("/:id", async (request, response, next) => {
    try {
        const user = request.user
        const blog = await Blog.findById(request.params.id)
        if (blog.user._id.toString() === user._id.toString()) {
            await Blog.findByIdAndDelete(request.params.id)
            response.status(204).end()
        } else {
            response.status(401).json({ error: "Unauthorized" })
        }
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