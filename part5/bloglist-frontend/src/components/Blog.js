import { useState } from 'react'

const Blog = ({ user, blog, updateBlog, removeBlog }) => {

  const [showDetail, setShowDetail] = useState(false)

  const negateShowDetail = () => setShowDetail(!showDetail)

  const handleLike = () => {
    const newBlog = { ...blog }
    newBlog.likes = newBlog.likes + 1
    updateBlog(newBlog)
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <input type="submit" onClick={negateShowDetail} value={(showDetail ? 'hide' : 'view')} />
        {
          showDetail === true && (
            <div className='blogDetail'>
              <br/>
              {blog.url}
              <br/>
              likes: {blog.likes} <input type="submit" onClick={handleLike} value="like" />
              <br/>
              {blog.user.username}
              <br/>
              {
                blog.user.username === user.username &&
                (
                  <>
                    <input type="submit" onClick={handleRemove} value="remove" />
                  </>
                )
              }
            </div>
          )
        }
      </div>
    </div>
  )
}

const CreateBlogForm = ({ addBlog }) => {

  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const onCreateBlog = (event) => {
    event.preventDefault()
    addBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    })
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={onCreateBlog}>
        <div>
          title:
          <input type="text" name="title" onChange={({ target }) => setNewBlogTitle(target.value)}/>
        </div>
        <div>
          author:
          <input type="text" name="author" onChange={({ target }) => setNewBlogAuthor(target.value)}/>
        </div>
        <div>
          url:
          <input type="text" name="url" onChange={({ target }) => setNewBlogUrl(target.value)}/>
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export { Blog, CreateBlogForm }