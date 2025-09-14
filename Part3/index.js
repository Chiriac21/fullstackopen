const express = require('express');
const morgan = require('morgan');
const app = express();


app.use(express.static('dist'))
app.use(express.json());

morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let persons = 
[
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

app.get('/api/persons', (request, response) => {
    response.json(persons);
});

app.get('/info', (req, res) => {
    const length = persons.length;
    const date = new Date();

    res.send(`
        <p>Phonebook has info for ${length} people</p>
        <p>${date}</p>
        `)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const person = persons.find((person) => person.id === id);

    if(person)
        res.json(person);
    else
        res.status(404).end();
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;

    persons = persons.filter(person => person.id !== id);
    res.status(204).end();
});

app.post('/api/persons', (req, res) => {
    const body = req.body;

    if(!body.name || !body.number)
        return res.status(400).json({
            error: 'Name or Number missing'
        });

    const person = persons.find(person => person.name === body.name)
    if(person)
        return res.status(400).json({
            error: 'Name already exists in the phonebook'
        });

    const id = getRandomInt(1000);

    const newPerson = {
        id : id,
        name: body.name,
        number: body.number
    }

    persons = persons.concat(newPerson);
    res.json(newPerson);
})

const PORT = process.env || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
