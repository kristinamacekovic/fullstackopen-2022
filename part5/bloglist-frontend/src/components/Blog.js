import { useState } from "react"

const Blog = ({blog}) => {
  const [detailedFlag, setDetailedFlag] = useState(false)

  const toggleDetail = () => {
    setDetailedFlag(!detailedFlag)
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
      <p>{blog.likes} <button>like</button></p>
      <button onClick={toggleDetail}>Less Detail</button>
    </div>
  )
}

export default Blog