const express = require('express')
const app = express()

let phonebook = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(phonebook)
})

app.get('/info', (request, response) => {
    const responseBody = `<h1>Phonebook has info on ${phonebook.length} people</h1> <h2>${Date()}</h2>`
    response.send(responseBody)
})

app.get('/api/persons/:id', (request, response) => {
 // find the specific entry
  const foundEntry = phonebook.filter(entry => entry.id === Number(request.params.id))
  // if it's found, display it, otherwise return a 404 not found message
  if (foundEntry) {
    return response.json(foundEntry)
  }
  return response.status(404).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
})