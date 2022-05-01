const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/Blog')

const initialBlogs = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
    },
    {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0
    },
    {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0
    },
    {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0
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

// close down the connection to DB
afterAll(() => mongoose.connection.close())