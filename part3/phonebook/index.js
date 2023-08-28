require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const Contact = require('./models/contact');

const app = express();

// Define a custom token for request body
morgan.token('body', (req) => JSON.stringify(req.body));

app.use(express.static('build'));
app.use(express.json());
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body'),
);
app.use(cors());


app.get('/info', (req, res) => {
  Contact.find({}).then(contacts => {
    const totalPersons = contacts.length;
    const time = new Date();
    const content = `Phonebook has info for ${totalPersons} people<br><br>${time}`;
    res.send(`<p>${content}</p>`);
  });
});

app.get('/api/persons', (req, res) => {
  Contact.find({}).then(contacts => {
    res.json(contacts)
  });
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

app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (body.name === undefined) {
    return res.status(400).json({
      error: 'name is missing',
    });
  } else if (body.number === undefined) {
    return res.status(400).json({
      error: 'number is missing',
    });
  }

  const contact = new Contact({
    name: body.name,
    number: body.number,
  });

  contact.save().then((savedContact) => {
    res.json(savedContact);
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port $${PORT}`);
});
