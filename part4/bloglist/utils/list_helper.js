/* eslint-disable no-unused-vars */
const dummy = blogs => {
    return 1
}

const totalLikes = blogs => {
    return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = blogs => {
    return blogs.reduce((prev, next) => prev.likes >= next.likes ? prev : next)
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}