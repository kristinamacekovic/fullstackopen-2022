import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async (token) => {
  const response = await axios.get(baseUrl, {
    headers: {
      'Authorization': `Bearer ${token}` 
    }})
  return response.data
}

const createNew = async (token, title, author, url) => {
  const response = await axios.post(baseUrl, {
      title,
      author,
      url
    },
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  )
  return response.data
}

const exportObject = {
  getAll,
  createNew
}

export default exportObject