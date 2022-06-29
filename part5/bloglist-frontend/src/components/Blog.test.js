import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
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