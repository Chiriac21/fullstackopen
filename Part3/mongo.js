const mongoose = require('mongoose')

if(process.argv.length < 5 && process.argv.length > 3)
{
  console.log('Invalid command-line')
  process.exit(1)
}

const db_password = process.argv[2]
const personName = process.argv[3]
const personNumber = process.argv[4]

const url = `mongodb+srv://admin:${db_password}@cluster0.rp0kp.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String
})


const Person = mongoose.model('Person', phonebookSchema)

if(process.argv.length <= 3)
{
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}
else
{
  const person = new Person({
    name: personName,
    number: personNumber
  })

  person.save().then(() => {
    console.log(`added ${personName} number ${personNumber} to phonebook`)
    mongoose.connection.close()
  })
}

