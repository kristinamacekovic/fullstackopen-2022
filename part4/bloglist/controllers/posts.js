const postsRouter = require('express').Router()
const Blog = require('../models/Blog')

postsRouter.get('/', async (request, response, next) => {
    try {
        const getBlogs = await Blog.find({})
        response.json(getBlogs)
    } catch(error) {
        next(error)
    }
})

postsRouter.post('/', async (request, response, next) => {
    const blog = new Blog(request.body)
    try {
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
    } catch(error) {
        next(error)
    }
})

postsRouter.delete('/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } catch(error) {
        next(error)
    }
})

module.exports = postsRouter