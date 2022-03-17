import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchField, setSearchField] = useState('');

  // set persons to initial state once when the component is rendered the first time
  useEffect(() => {
    axios.get('http://localhost:3001/persons')
          .then(response => {
            setPersons(response.data);
          })
  }, []);

  const checkForDuplicateNames = () => {
    return (persons.filter(person => person.name === newName).length > 0);
  }

  const addName = event => {
    event.preventDefault();
    if (checkForDuplicateNames()) {
      alert(`${newName} is already added in the phonebook`);
    }
    else {
      const newNameObject = {
        name: newName,
        number: newNumber
      };
      setPersons(persons.concat(newNameObject));
      setNewName('');
      setNewNumber('');
    }
  }

  const handleNameChange = event => {
    setNewName(event.target.value);
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  }
  
  const handleSearch = event => {
    setSearchField(event.target.value);
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter value={searchField} onChange={handleSearch}/>
      <h2>Add a new</h2>
      <PersonForm addName={addName} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={persons} searchField={searchField}/>
    </div>
  )
}

export default App