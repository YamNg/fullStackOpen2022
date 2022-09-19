import { useState, useEffect } from 'react'
import { BlogList } from './components/Blog'
import { Notification } from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  //blogs related
  const [blogs, setBlogs] = useState([])
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  //user related
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
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

  const handleBlogTitleChange = async (event) => {
    setNewBlogTitle(event.target.value)
  }

  const handleBlogAuthorChange = async (event) => {
    setNewBlogAuthor(event.target.value)
  }

  const handleBlogUrlChange = async (event) => {
    setNewBlogUrl(event.target.value)
  }

  const onCreateBlog = async (event) => {
    try{
      event.preventDefault()
      // call service to add blog
      const newBlog = {
        title: newBlogTitle,
        author: newBlogAuthor,
        url: newBlogUrl
      }
      const newBlogAdded = await blogService.create(newBlog, user.token)
      // change state
      setBlogs(blogs.concat(newBlogAdded))
      showNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`, true)
    } catch (error){
      showNotification('failed for creating blog data', false)
    }
  }

  const showNotification = (message, isSuccess) => {
    setNotification({message, isSuccess})
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
          <BlogList user={user} 
            blogs={blogs} 
            onCreateBlog={onCreateBlog} 
            onLogout={handleLogout} 
            handleFieldChanges={{handleBlogTitleChange, handleBlogAuthorChange, handleBlogUrlChange}}
          />
	    }
    </div>
  )
}

export default App
