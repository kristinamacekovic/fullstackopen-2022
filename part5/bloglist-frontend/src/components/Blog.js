import { useState } from "react"

const Blog = ({blog, updateLikes}) => {
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

  const detailStyle = {
    border: "1px solid grey",
    backgroundColor: "#E0E1DD",
    padding: "5px",
    margin: "10px"
  }

  const shortStyle = {
    margin: "10px",
    fontWeight: "bold"
  }

  if (!detailedFlag) {
    return (
      <div style={shortStyle}>
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
    <div style={detailStyle}>
      <p>{blog.title}</p>
      <p>{blog.author}</p>
      <p>{blog.url}</p>
      <p>{blog.likes} <button onClick={addLike}>like</button></p>
      <button onClick={toggleDetail}>Less Detail</button>
    </div>
  )
}

export default Blog