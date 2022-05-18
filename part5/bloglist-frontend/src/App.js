import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userInfo = localStorage.getItem("loggedUserInfo")
    if (userInfo) {
      const user = JSON.parse(userInfo)
      setUser(user)
    }
  },[])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem("loggedUserInfo", JSON.stringify(user))
      setUser(user)
      setUsername("")
      setPassword("")
      blogService.getAll(user.token).then(blogs => 
        setBlogs( blogs )
      )
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleLogout = event => {
    event.preventDefault()
    try {
      window.localStorage.removeItem("loggedUserInfo")
      setUser(null)
    } catch(exception) {
      console.log(exception)
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
      <h2>{`${user.username} is logged in`}</h2>
      <button type="submit" onClick={handleLogout}>Log Out</button>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      <h1>Blogs</h1>
      { user === null ? 
        loginForm() :
        renderLoginState()
      }
    </div>
  )
}

export default App
