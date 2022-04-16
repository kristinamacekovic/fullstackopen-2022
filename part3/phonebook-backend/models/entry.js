const mongoose = require('mongoose')

const uri = process.env.MONGODB_URI

mongoose.connect(uri)
  .then(result => console.log('Connected to mongo'))
  .catch(error => console.log(`Something occurred: ${error.message}`))

const entrySchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    index: {
      unique: true
    }
  },
  number: {
    type: String,
    minlength: 8,
    validate: {
      validator: function(v) {
        return /^\d{2,3}-\d+/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: true
  }
})

entrySchema.set('toJSON', {
  transform: (input, output) => {
    output.id = output._id.toString()
    delete output._id
    delete output.__v
  }
})

module.exports = mongoose.model('Entry', entrySchema)