import { useState } from 'react';
import { isEqual } from './utils/utils.js';
import PhoneForm from './components/PhoneForm.jsx';
import Filter from './components/Filter.jsx';
import Persons from './components/Persons.jsx';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterTerm, setFilterTerm] = useState('');

  const personsToShow = filterTerm
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filterTerm.toLowerCase()),
      )
    : persons;

  const addPerson = (e) => {
    e.preventDefault();
    const personObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    };

    if (persons.some((person) => isEqual(person, personObject))) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(personObject));
      setNewName('');
      setNewNumber('');
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
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
