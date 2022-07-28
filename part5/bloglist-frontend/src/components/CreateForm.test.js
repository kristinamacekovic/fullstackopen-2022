import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'
import CreateForm from './CreateForm'

describe('<Togglable />', () => {
  let container
  //const mockHandler = jest.fn()

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="show">
        <div className="testDiv" >
          togglable content
        </div>
      </Togglable>
    ).container
  })

  test('renders its children', async () => {
    await screen.findAllByText('togglable content')
  })

  test('at start the children are not displayed', () => {
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('toggled content can be closed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)

    const closeButton = screen.getByText('Cancel')
    await user.click(closeButton)

    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })
})

describe('<CreateForm />', () => {
  test('The form calls the event handler it received as props with the right details when a new blog is created', async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()

    const container = render(<CreateForm createBlog={createBlog} />).container

    const inputTitle = container.querySelector('#inputTitle')
    const sendButton = screen.getByText('Create')

    await user.type(inputTitle, 'this is the title of the create form')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('this is the title of the create form')
  })
}
)