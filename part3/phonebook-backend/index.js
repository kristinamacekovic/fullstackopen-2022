require('dotenv').config()
const { response, query } = require('express')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Entry = require('./models/entry')
const { update } = require('./models/entry')
morgan.token('body', (request, response) => JSON.stringify(request.body))

app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.static('build'))

app.get('/api/persons', (request, response) => {
  Entry.find({}).then(data => response.json(data)).catch(error => next(error))
})

app.get('/info', (request, response, next) => {
  Entry.find({}).then(data => {
    const phonebookLength = data.length
    const responseBody = `<h1>Phonebook has info on ${phonebookLength} people</h1> <h2>${Date()}</h2>`
    response.send(responseBody)
  })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Entry.find({ _id: request.params.id })
    .then(entry => {
      response.json(entry)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Entry.findByIdAndRemove(request.params.id)
    .then(result => response.status(204).end())
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  // check validity of payload
  let valid = request.body.name && request.body.number

  if (valid) {
    let searchLength = Entry.find({ name: request.body.name }).then(result => result.length)
    if (searchLength > 0) {
      return response.status(400).json({
        error: 'There\'s already an entry with the same name'
      })
    }
  }

  if (!valid) {
    return response.status(400).json({
      error: 'Name or number are missing'
    })
  }

  // create a new object
  const entry = new Entry({
    name: request.body.name,
    number: request.body.number
  })

  entry.save().then(savedEntry => response.json(savedEntry)).catch(error => {
    next(error)
  })
})

app.put('/api/persons/:id', (request, response, next) => {
  const updatedEntry = {
    name: request.body.name,
    number: request.body.number
  }

  Entry.findByIdAndUpdate(request.params.id,updatedEntry, { new: true, runValidators:true, context: query })
    .then(updateResult => {
      response.json(updateResult)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'route not found' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`)
})