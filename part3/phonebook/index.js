const express = require('express');
const morgan = require('morgan');

const app = express();

// Define a custom token for request body
morgan.token('body', (req) => JSON.stringify(req.body));

app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.get('/info', (req, res) => {
  const totalPersons = persons.length;
  const time = new Date();
  const content = `Phonebook has info for ${totalPersons} people<br><br>${time}`;
  res.send(`<p>${content}</p>`);
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);

  const person = persons.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);

  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

const generateId = () => {
  const min = 1000000;
  const max = 9999999;
  const id = min + Math.floor(Math.random() * max);
  return id;
};

app.post('/api/persons', (req, res) => {
  const body = req.body;

  const isNamePresent = persons.some((person) => person.name === body.name);

  // error handling
  if (!body.name) {
    return res.status(400).json({
      error: 'name is missing',
    });
  } else if (!body.number) {
    return res.status(400).json({
      error: 'number is missing',
    });
  } else if (isNamePresent) {
    return res.status(400).json({
      error: 'name must be unique',
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);

  res.json(person);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port $${PORT}`);
});
