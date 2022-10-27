import { useState, useEffect } from 'react'
import { Blog, CreateBlogForm } from './components/Blog'
import { Notification } from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  //blogs related
  const [blogs, setBlogs] = useState([])
  // const [newBlogTitle, setNewBlogTitle] = useState('')
  // const [newBlogAuthor, setNewBlogAuthor] = useState('')
  // const [newBlogUrl, setNewBlogUrl] = useState('')

  //user related
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const loginForm = () => (
    <form id="loginForm" onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="loginBtn" type="submit">login</button>
    </form>
  )

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      showNotification('wrong username or password', false)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const addBlog = async (newBlog) => {
    try{
      const newBlogAdded = await blogService.create(newBlog, user.token)
      // change state
      setBlogs(blogs.concat(newBlogAdded))
      showNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`, true)
    } catch (error){
      showNotification('failed for creating blog data', false)
    }
  }

  const updateBlog = async (newBlog) => {
    try{
      await blogService.update(newBlog)
      // change state
      setBlogs(blogs.map((blog) => (blog.id === newBlog.id ? newBlog : blog)))
      showNotification(`blog ${newBlog.title} updated`, true)
    } catch (error){
      showNotification('failed for updating blog data', false)
    }
  }

  const removeBlog = async (blogToDelete) => {
    try {
      await blogService.remove(blogToDelete, user.token)
      setBlogs(blogs.filter((blog) => blog.id !== blogToDelete.id))
      showNotification(`blog ${blogToDelete.title} deleted`, true)
    }  catch (error){
      showNotification('failed for delete blog', false)
    }
  }

  const showNotification = (message, isSuccess) => {
    setNotification({ message, isSuccess })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification}/>

      {user === null ?
        loginForm() :
        <div>
          <p>
            {user.name} logged-in
            <input type="submit" value="Logout" onClick={handleLogout} />
          </p>
          <Togglable buttonLabel='new blog'>
            <CreateBlogForm addBlog={addBlog} />
          </Togglable>
          {
            [...blogs]
              .sort((a, b) => b.likes - a.likes)
              .map(blog =>
                <Blog key={blog.id} user={user} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog}/>
              )
          }
        </div>
      }
    </div>
  )
}

export default App
