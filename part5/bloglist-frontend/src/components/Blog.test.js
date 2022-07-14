import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('Blog renders title by default', () => {
  const blog = {
    title: 'Testing title',
    author: 'Testing author',
    url: 'testing url',
    likes: 1
  }

  const { container } = render(<Blog blog={blog} />)

  const element = container.querySelector('.blogs')

  expect(element).toHaveTextContent('Testing title')
})

test('Blog renders author by default', () => {
  const blog = {
    title: 'Testing title',
    author: 'Testing author',
    url: 'testing url',
    likes: 1
  }

  const { container } = render(<Blog blog={blog} />)

  const element = container.querySelector('.blogs')

  expect(element).toHaveTextContent('Testing author')
})

test('Blog does not render url by default', () => {
  const blog = {
    title: 'Testing title',
    author: 'Testing author',
    url: 'testing url',
    likes: 1
  }

  const { container } = render(<Blog blog={blog} />)

  const element = container.querySelector('.blogs')

  expect(element).not.toHaveTextContent('testing url')
})

test('Blog does not render likes by default', () => {
  const blog = {
    title: 'Testing title',
    author: 'Testing author',
    url: 'testing url',
    likes: 1
  }

  const { container } = render(<Blog blog={blog} />)

  const element = container.querySelector('.blogs')

  expect(element).not.toHaveTextContent('1')
})

test('Blog URL is shown when the details button has been clicked', async () => {
  const blog = {
    title: 'Testing title',
    author: 'Testing author',
    url: 'testing url',
    likes: 1,
    user: {
      id: '12342354312'
    }
  }

  const user = {
    id: '12342354312'
  }

  const mockHandler = jest.fn()

  const userAction = userEvent.setup()
  const { container } = render(<Blog blog={blog} user={user} onClick={mockHandler}/>)

  const button = screen.getByText('Detail')
  const element = container.querySelector('.blogs')
  expect(element).not.toHaveTextContent('testing url')
  await userAction.click(button)
  expect(element).toHaveTextContent('testing url')
})

test('Blog likes are shown when the details button has been clicked', async () => {
  const blog = {
    title: 'Testing title',
    author: 'Testing author',
    url: 'testing url',
    likes: 999,
    user: {
      id: '12342354312'
    }
  }

  const user = {
    id: '12342354312'
  }

  const mockHandler = jest.fn()

  const userAction = userEvent.setup()
  const { container } = render(<Blog blog={blog} user={user} onClick={mockHandler}/>)

  const button = screen.getByText('Detail')
  const element = container.querySelector('.blogs')
  expect(element).not.toHaveTextContent('999')
  await userAction.click(button)
  expect(element).toHaveTextContent('999')
})

test('If the like button is clicked twice, the event handler the component received as props is called twice', async () => {
  const blog = {
    title: 'Testing title',
    author: 'Testing author',
    url: 'testing url',
    likes: 999,
    user: {
      id: '12342354312'
    }
  }

  const user = {
    id: '12342354312'
  }

  const mockHandler = jest.fn()

  const userAction = userEvent.setup()
  render(<Blog blog={blog} user={user} updateLikes={mockHandler}/>)

  //open the detail of the blog
  const detailButton = screen.getByText('Detail')
  await userAction.click(detailButton)
  //click the like button
  const likeButton = screen.getByText('like')
  await userAction.click(likeButton)
  await userAction.click(likeButton)

  expect(mockHandler).toHaveBeenCalledTimes(2)
})