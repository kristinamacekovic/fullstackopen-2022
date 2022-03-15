import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '111-111-1111' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchField, setSearchField] = useState('');

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
      <form>
        filter shown with <input value={searchField} onChange={handleSearch}/>
      </form>
      <h2>
        Add a new
      </h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.filter(person => person.name.toLowerCase().includes(searchField.toLocaleLowerCase())).map(person => <p key={person.name}>{person.name}: {person.number}</p>)}
    </div>
  )
}

export default App