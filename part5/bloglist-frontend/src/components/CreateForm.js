// Create Form as a separate component
import { useState } from 'react'

const CreateForm = ({ createBlog }) => {
  const [title, setTitle] = useState([])
  const [author, setAuthor] = useState([])
  const [url, setURL] = useState([])

  const addBlog = event => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
    setAuthor('')
    setTitle('')
    setURL('')
  }

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={addBlog}>
        <div> Title:
          <input type="text" value={title} name="title" id="inputTitle" onChange={({ target }) => setTitle(target.value)}/>
        </div>
        <div>Author:
          <input type="text" value={author} name="author" onChange={({ target }) => setAuthor(target.value)}/>
        </div>
        <div> URL:
          <input type="text" value={url} name="url" onChange={({ target }) => setURL(target.value)}/>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default CreateForm