/* eslint-disable no-unused-vars */
const _ = require("lodash")

const dummy = blogs => {
    return 1
}

const totalLikes = blogs => {
    return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = blogs => {
    return blogs.reduce((prev, next) => prev.likes >= next.likes ? prev : next)
}

const mostBlogs = blogs => {
    const mapped = _.countBy(blogs, blog => blog.author)
    const mapped_values = _.toPairs(mapped)
    const max_value = _.maxBy(mapped_values, _.last)
    const arr = new Array(max_value)
    return _.fromPairs(arr)
}

const mostLikes = blogs => {
    const mapped = _.groupBy(blogs, blog => blog.author)

    const mapped_values = _.map(mapped, (obj, key) => ({
        "author": key,
        "likes": _.sumBy(obj, "likes")
    }))

    return _.maxBy(mapped_values, blog => blog.likes)
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}