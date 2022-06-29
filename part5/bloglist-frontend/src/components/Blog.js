import { useState } from 'react'

const Blog = ({ blog, updateLikes, removeBlog, user }) => {
  const [detailedFlag, setDetailedFlag] = useState(false)

  const toggleDetail = () => {
    setDetailedFlag(!detailedFlag)
  }

  const addLike = () => {
    updateLikes({
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes+1
    })
  }

  const deleteBlog = () => {
    removeBlog({
      id: blog.id
    })
  }

  const detailStyle = {
    border: '1px solid grey',
    backgroundColor: '#E0E1DD',
    padding: '5px',
    margin: '10px'
  }

  const shortStyle = {
    margin: '10px',
    fontWeight: 'bold'
  }

  if (!detailedFlag) {
    return (
      <div style={shortStyle} className="blogs">
        <p>
          {blog.title} - {blog.author}
        </p>
        <p>
          <button onClick={toggleDetail}>Detail</button>
        </p>
      </div>
    )
  }

  return (
    <div style={detailStyle} className="blogs">
      <p>{blog.title}</p>
      <p>{blog.author}</p>
      <p>{blog.url}</p>
      <p>{blog.likes} <button onClick={addLike}>like</button></p>
      <button onClick={toggleDetail}>Less Detail</button>
      {
        user.id === blog.user.id ?
          <button onClick={deleteBlog}>Delete</button> : null
      }
    </div>
  )
}

export default Blog