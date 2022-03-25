import axios from 'axios'
const baseUrl = '/api/persons'

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

const updateEntry = entry => {
    const request = axios.put(`${baseUrl}/${entry.id}`, entry)
    return request.then(response => response.data)
}

export default { getEntries, createEntry, deleteEntry, updateEntry }