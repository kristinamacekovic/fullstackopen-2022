const { response } = require('express')
const express = require('express')
const app = express()
const morgan = require('morgan')
morgan.token('body', (request, response) => JSON.stringify(request.body))

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

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

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
    response.json(foundEntry)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  phonebook = phonebook.filter(entry => entry.id !== Number(request.params.id))
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  // check validity of payload
  let valid = request.body.name && request.body.number
  
  if (valid) {
    let duplicates = phonebook.filter(entry => entry.name.toLowerCase() === request.body.name.toLowerCase()).length > 0 
    if (duplicates) {
      return response.status(400).json({
        error: "There's already an entry with the same name"
      })
    }
  }
  
  if (!valid) {
    return response.status(400).json({
      error: 'Name or number are missing'
    })
  }

  // create a new object
  let newEntry = {
    ...request.body, 
    id: Math.round(1000000*Math.random())
  }
  // add object to app data
  phonebook = phonebook.concat(newEntry)
  // send response
  response.json(newEntry)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
})