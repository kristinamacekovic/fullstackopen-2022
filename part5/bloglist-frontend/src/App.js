import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])
  const [title, setTitle] = useState([])
  const [author, setAuthor] = useState([])
  const [url, setURL] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  
  useEffect(() => {
    const userInfo = localStorage.getItem("loggedUserInfo")
    if (userInfo) {
      const user = JSON.parse(userInfo)
      setUser(user)
      blogService.getAll(user.token).then(blogs => 
        setBlogs( blogs )
      )
    }
  },[])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem("loggedUserInfo", JSON.stringify(user))
      setUser(user)
      setNotification(`Logged in ${username}`)
      setTimeout(() => { setNotification("") }, 5000)
      setUsername("")
      setPassword("")
      blogService.getAll(user.token).then(blogs => 
        setBlogs( blogs )
      )
    } catch (exception) {
      setNotification(exception.message)
      setTimeout(() => { setNotification("") }, 5000)
    }
  }

  const handleLogout = event => {
    event.preventDefault()
    try {
      window.localStorage.removeItem("loggedUserInfo")
      setNotification("Successfully logged out user")
      setTimeout(() => { setNotification("") }, 5000)
      setUser(null)
    } catch(exception) {
      setNotification(exception.message)
      setTimeout(() => { setNotification("") }, 5000)
    }
  }

  const handleCreate = async event => {
    event.preventDefault()
    try {
      await blogService.createNew(user.token, title, author, url).then(response => {
        blogService.getAll(user.token).then(blogs => setBlogs(blogs))
      })
      setNotification(`Created ${title} by ${author}`)
      setTimeout(() => { setNotification("") }, 5000)
      setTitle("")
      setAuthor("")
      setURL("")
    } catch(exception) {
      setNotification(exception.message)
      setTimeout(() => { setNotification("") }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div> Username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          />
      </div>
      <div> Password
        <input
          type="text"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          />
      </div>
      <button type='submit'>Login</button>
    </form>
  )

  const createForm = () => (
    <form onSubmit={handleCreate}>
      <div> Title: 
        <input type="text" value={title} name="title" onChange={({ target }) => setTitle(target.value)}/>
      </div>
      <div>Author: 
        <input type="text" value={author} name="author" onChange={({ target }) => setAuthor(target.value)}/>
      </div>
      <div> URL: 
        <input type="text" value={url} name="url" onChange={({ target }) => setURL(target.value)}/>
      </div>
      <button type="submit">Create</button>
    </form>
  )

  const renderLoginState = () => (
    <div>
      <div>
        <h2>{`${user.username} is logged in`}</h2>
        <button type="submit" onClick={handleLogout}>Log Out</button>
      </div>
      <div>
        <h2>Create New</h2>
        {createForm()}
      </div>
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )

  return (
    <div>
      <h1>Blogs</h1>
      {notification ? 
        <h2 style={{color: 'blue', border: '1px solid blue'}}>{notification}</h2> :
        null
      }
      { user === null ? 
        loginForm() :
        renderLoginState()
      }
    </div>
  )
}

export default App
