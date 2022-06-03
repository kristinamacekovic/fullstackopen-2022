import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import CreateForm from './components/CreateForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])
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

  const compareBlogs = (a, b) => {
    return b.likes - a.likes
  }

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

  const handleCreate = async ({title, author, url}) => {
    try {
      await blogService.createNew(user.token, title, author, url).then(response => {
        blogService.getAll(user.token).then(blogs => setBlogs(blogs))
      })
      setNotification(`Created ${title} by ${author}`)
      setTimeout(() => { setNotification("") }, 5000)
    } catch(exception) {
      setNotification(exception.message)
      setTimeout(() => { setNotification("") }, 5000)
    }
  }
  
  const updateLikes = async ({id, title, author, url, likes}) => {
    try {
      await blogService.updateExisting(user.token, id, title, author, url, likes).then(response => {
        blogService.getAll(user.token).then(blogs => setBlogs(blogs))
      })
      setNotification(`Updated ${title} by ${author} with ${likes}`)
      setTimeout(() => { setNotification("") }, 5000)
    } catch(exception) {
      setNotification(exception.message)
      setTimeout(() => { setNotification("") }, 5000)
    }
  }

  const handleDelete = async ({id}) => {
    try {
      if (window.confirm("Are you sure you want to delete the blog?")) {
        await blogService.removeBlog(user.token, id).then(response => {
          blogService.getAll(user.token).then(blogs => setBlogs(blogs))
        })
        setNotification(`Deleted blog`)
        setTimeout(() => { setNotification("") }, 5000)
      }
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

  const renderLoginState = () => (
    <div>
      <div>
        <h2>{`${user.username} is logged in`}</h2>
        <button type="submit" onClick={handleLogout}>Log Out</button>
      </div>
      <div>
        <Togglable buttonLabel="Create">
          <CreateForm
            createBlog={handleCreate}
          />
        </Togglable>
      </div>
      <div>
        {blogs.sort(compareBlogs).map(blog =>
          <Blog key={blog.id} blog={blog} updateLikes={updateLikes} removeBlog={handleDelete} user={user}/>
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
