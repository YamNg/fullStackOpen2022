const Blog = ({blog}) => (
  <div>
    {blog.title} {blog.author}
  </div>  
)

const CreateBlogForm = ({onCreateBlog, handleFieldChanges: {handleBlogTitleChange, handleBlogAuthorChange, handleBlogUrlChange}}) => (
  <>
    <h2>create new</h2>
    <form onSubmit={onCreateBlog}>
      <div>
        title:
        <input type="text" name="title" onChange={handleBlogTitleChange}/>
      </div>
      <div>
        author:
        <input type="text" name="author" onChange={handleBlogAuthorChange}/>
      </div>
      <div>
        url:
        <input type="text" name="url" onChange={handleBlogUrlChange}/>
      </div>
      <button type="submit">create</button>
    </form>
  </>
)

const BlogList = ({user, blogs, onCreateBlog ,onLogout, handleFieldChanges}) => (
  <div>
    <p>
      {user.name} logged-in
      <input type="submit" value="Logout" onClick={onLogout} />
    </p>
    <CreateBlogForm onCreateBlog={onCreateBlog} handleFieldChanges={handleFieldChanges} />
    {
      blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )
    }
  </div>
)

export { Blog, BlogList }