const { first, update } = require('lodash')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/Blog')

const initialBlogs = [
    {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7
    },
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5
    },
    {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12
    },
    {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10
    },
    {
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0
    },
    {
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2
    }  
]

beforeEach(async () => {
    await Blog.deleteMany({})
    for (let blog of initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

const api = supertest(app)

test('bloglist: blog list is returned as JSON', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('bloglist: there should be 1 blog in test db', async () => {
    const response = await api.get('/api/blogs')
    // console.log(response.body)
    expect(response.body).toHaveLength(6)
})

test('bloglist: id property is named correctly', async () => {
    const response = await api.get('/api/blogs')
    if (response.body.length > 0) {
        expect(response.body[0]).toHaveProperty('id')
        expect(response.body[0]).not.toHaveProperty('_id')
    }
})

test('bloglist: check creating a new post increases the list by one and the contents are the same', async () => {
    const newBlog = {
        title: 'NutriU',
        author: 'Infinum',
        url: 'https://infinum.com/news/infinum-and-philips-award-winning-collaboration-on-nutriu/',
        likes: 7
    }
    const oldState = await api.get('/api/blogs')
    // eslint-disable-next-line no-unused-vars
    const _ = await api.post('/api/blogs').send(newBlog)
    const newState = await api.get('/api/blogs')
    expect(newState.body).toHaveLength(oldState.body.length+1)
    const latestBlog = newState.body[newState.body.length-1]
    expect(latestBlog).toHaveProperty('title', 'NutriU')
    expect(latestBlog).toHaveProperty('author', 'Infinum')
    expect(latestBlog).toHaveProperty('url', 'https://infinum.com/news/infinum-and-philips-award-winning-collaboration-on-nutriu/')
    expect(latestBlog).toHaveProperty('likes', 7)
})

test('bloglist: a post request without specified likes deafults to 0 likes', async () => {
    const newBlog = {
        title: 'How to design an app for iPad in 2021',
        author: 'Infinum',
        url: 'https://infinum.com/blog/how-to-design-app-for-ipad/'
    }
    const addedBlog = await api.post('/api/blogs').send(newBlog)
    expect(addedBlog.body).toHaveProperty('likes', 0)
})

test('bloglist: if title or url are missing from request body then 400 bad request is returned', async () => {
    const newBlogWithoutTitle = {
        author: 'Infinum',
        url: 'https://infinum.com/blog/how-to-design-app-for-ipad/'
    }
    const newBlogWithoutUrl = {
        title: 'Some fake title',
        author: 'Infinum'
    }
    await api.post('/api/blogs').send(newBlogWithoutTitle).expect(400)
    await api.post('/api/blogs').send(newBlogWithoutUrl).expect(400)
})

test('delete post', async () => {
    const blogs = await api.get('/api/blogs')
    const firstBlog = blogs.body[0]
    const firstBlogID = firstBlog.id
    await api.delete(`/api/blogs/${firstBlogID}`).expect(204)
    // can't find the blog anymore
    const result = await Blog.find({'_id': firstBlogID})
    expect(result).toHaveLength(0)
})

test('update post', async () => {
    const blogs = await api.get('/api/blogs')
    const firstBlog = blogs.body[0]
    const firstBlogID = firstBlog.id
    await api.put(`/api/blogs/${firstBlogID}`).send({
        title: 'New title',
        author: 'New author',
        url: 'https://reactpatterns.com/',
        likes: 10
    })
    // can't find the blog anymore
    const result = await Blog.find({'id': firstBlogID})
    //console.log(result[0])
    expect(result[0].likes).toEqual(10)
    expect(result[0].title).toEqual('New title')
    expect(result[0].author).toEqual('New author')
})

// close down the connection to DB
afterAll(() => mongoose.connection.close())