import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { Blog, CreateBlogForm } from './Blog'
import userEvent from '@testing-library/user-event'

test('Blog rendered without expand to show detail info by default', () => {
  const updateBlogHandler = jest.fn()
  const removeBlogHandler = jest.fn()

  const user = {
    username: 'yamng'
  }

  const blog = {
    title: 'test Title',
    author: 'Yam',
    url: 'https://www.google.com',
    likes: 100,
    user: {
      username: 'yamng'
    }
  }

  const { container } = render(
    <Blog user={user} blog={blog} updateBlog={updateBlogHandler} removeBlog={removeBlogHandler} />
  )

  const blogDetailComponent = container.querySelector('.blogDetail')
  expect(blogDetailComponent).toBeNull()

})

test('Blog rendered expand to show detail info when view button was clicked', async () => {
  const updateBlogHandler = jest.fn()
  const removeBlogHandler = jest.fn()
  const webUser = userEvent.setup()

  const user = {
    username: 'yamng'
  }

  const blog = {
    title: 'test Title',
    author: 'Yam',
    url: 'https://www.google.com',
    likes: 100,
    user: {
      username: 'yamng'
    }
  }

  const { container } = render(
    <Blog user={user} blog={blog} updateBlog={updateBlogHandler} removeBlog={removeBlogHandler} />
  )

  const viewButton = screen.getByText('view')
  await webUser.click(viewButton)

  const blogDetailComponent = container.querySelector('.blogDetail')
  expect(blogDetailComponent).toBeDefined()

})


test('Blog update handler called twice when clicked like button twice', async () => {
  const updateBlogHandler = jest.fn()
  const removeBlogHandler = jest.fn()
  const webUser = userEvent.setup()

  const user = {
    username: 'yamng'
  }

  const blog = {
    title: 'test Title',
    author: 'Yam',
    url: 'https://www.google.com',
    likes: 100,
    user: {
      username: 'yamng'
    }
  }

  render(
    <Blog user={user} blog={blog} updateBlog={updateBlogHandler} removeBlog={removeBlogHandler} />
  )

  const viewButton = screen.getByText('view')
  await webUser.click(viewButton)

  const likeButton = screen.getByText('like')
  await webUser.click(likeButton)
  await webUser.click(likeButton)
  expect(updateBlogHandler.mock.calls.length).toBe(2)
})

test('Add Blog handler receive right details when a new blog is created', async () => {
  const blog = {
    title: 'Test Blog Title',
    author: 'Yam',
    url: 'https://www.google.com'
  }

  const webUser = userEvent.setup()
  const addBlogHandler = jest.fn()

  const { container } = render(
    <CreateBlogForm addBlog={addBlogHandler}/>
  )

  const inputTitle = container.querySelector('input[name="title"]')
  const inputAuthor = container.querySelector('input[name="author"]')
  const inputUrl = container.querySelector('input[name="url"]')

  await webUser.type(inputTitle, blog.title)
  await webUser.type(inputAuthor, blog.author)
  await webUser.type(inputUrl, blog.url)

  const createButton = screen.getByText('create')
  await webUser.click(createButton)

  expect(addBlogHandler.mock.calls[0][0]).toMatchObject(blog)
})