import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getEntries = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const createEntry = newEntry => {
    const request = axios.post(baseUrl, newEntry)
    return request.then(response => response.data)
}

const deleteEntry = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default { getEntries, createEntry, deleteEntry }