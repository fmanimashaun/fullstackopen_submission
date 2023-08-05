import { useState, useEffect } from 'react';
import phonesService from './services/persons.js';
import { isEqual } from './utils/utils.js';
import PhoneForm from './components/PhoneForm';
import Filter from './components/Filter';
import Persons from './components/Persons';
import personsService from './services/persons.js';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterTerm, setFilterTerm] = useState('');

  useEffect(() => {
    phonesService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const personsToShow = filterTerm
    ? persons.filter((person) =>
      person.name.toLowerCase().includes(filterTerm.toLowerCase()),
    )
    : persons;

  const addPerson = (e) => {
    e.preventDefault();
    const newPersonObject = {
      name: newName,
      number: newNumber,
    };

    if (persons.some((person) => isEqual(person, newPersonObject))) {
      alert(`${newName} is already added to phonebook`);
    } else if (persons.some((person) => person.name === newName)) {
      const oldPersonObj = persons.find((person) => person.name === newName);
      if (window.confirm(`${newName} is already added to phonebook, replace the ${oldPersonObj.number} with ${newNumber}?`)) {
        personsService.update(oldPersonObj.id, newPersonObject).then((returnedPerson) => {
          setPersons(persons.map((person) => (person.id !== oldPersonObj.id ? person : returnedPerson)));
          setNewName('');
          setNewNumber('');
        });
      }
      
    } else {
      personsService.create(newPersonObject).then((returnedPerson) => {
        setPersons([...persons, returnedPerson]);
        setNewName('');
        setNewNumber('');
      });
    }
  };

  const handleDelete = (id) => {
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filterTerm} setFilter={setFilterTerm} />
      <h2>Add a new</h2>
      <PhoneForm
        addPerson={addPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
