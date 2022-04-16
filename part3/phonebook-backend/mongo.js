const mongoose = require('mongoose')
const numArgs = process.argv.length

if (numArgs < 3) {
  console.log('You haven\'t entered all the required parameters, expecting node mongo.js [password]')
  process.exit(1)
}

const password = process.argv[2]
const uri = `mongodb+srv://fullstackopenapp:${password}@cluster-fullstackopen.mzlqf.mongodb.net/phonebookapp?retryWrites=true&w=majority`
mongoose.connect(uri)

const entrySchema = new mongoose.Schema({
  name: String,
  number: String
})

const Entry = mongoose.model('Entry', entrySchema)

if (numArgs === 3) {
  Entry.find({}).then(result => {
    console.log('Phonebook:')
    result.forEach(entry => { console.log(`${entry.name} ${entry.number}`) })
    mongoose.connection.close()
  })
}

if (numArgs > 3) {
  const nameArgument = process.argv[3]
  const numberArgument = process.argv[4]

  const entry = new Entry({
    name: nameArgument,
    number: numberArgument
  })

  entry.save().then(result => {
    console.log(`Saved ${nameArgument} number ${numberArgument} to phonebook`)
    mongoose.connection.close()
  })
}