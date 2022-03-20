import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import phonebook from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchField, setSearchField] = useState('');
  const [message, setMessage] = useState('');
  const [appState, setAppState] = useState('success');

  // set persons to initial state once when the component is rendered the first time
  useEffect(() => {
    phonebook.getEntries()
      .then(response => {
        setPersons(response);
      })
      .catch(error => {
        setAppState('error')
        setMessage('Error fetching the data...')
        setTimeout(() => {
          setAppState('success')
          setMessage('')
        }, 5000)
      })
  }, [message ]);

  // check if the entry is already in the phonebook
  const checkForDuplicateNames = () => {
    return (persons.filter(person => person.name.toLowerCase() === newName.toLowerCase()).length > 0);
  }

  // add a new entry to the phonebook
  const addName = event => {
    //don't send the form
    event.preventDefault();
    // does the entry already exist?
    if (checkForDuplicateNames()) {
      if (window.confirm(`${newName} is already added in the phonebook, would you like to update the entry?`)) {
        // get the current entry
        const currentEntry = persons.filter(person => person.name.toLowerCase() === newName.toLowerCase())
        const newEntry = {...currentEntry[0], number: newNumber}
        phonebook.updateEntry(newEntry)
          .then(response => {
            setAppState('success')
            setMessage(`${newName} has been updated`)
            setNewName('')
            setNewNumber('')
            setTimeout(() => {
              setMessage('')
              setAppState('success')
            }, 5000)
          })
          .catch(error => {
            setAppState('error')
            setMessage("something went wrong, please refresh and try again")
            setTimeout(() => {
              setMessage('')
              setAppState('success')
            },5000)
      })
    }
  }
    // if not, add it to the phonebook
    else {
      const newNameObject = {
        name: newName,
        number: newNumber
      };

      phonebook.createEntry(newNameObject)
          .then(response => {
            setPersons(persons.concat(response));
            setNewName('');
            setNewNumber('');
            setMessage(`${newNameObject.name} successfully added`)
            setAppState('success')
            setTimeout(() => {
              setMessage('')
              setAppState('success')
            },5000)
          })
          .catch(error => {
            setAppState('error')
            setMessage("something went wrong, please refresh and try again")
            setTimeout(() => {
              setMessage('')
              setAppState('success')
            },5000)
          })

    }
  }

  const handleDelete = id => {
    if (window.confirm("Do you really want to delete the entry?")) {
      phonebook.deleteEntry(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
          setAppState('success')
          setMessage(`Successfully deleted`)
          setNewName('')
          setNewNumber('')
          setTimeout(() => {
            setMessage('')
            setAppState('success')
          },5000)
        })
        .catch(error => {
          setAppState('error')
            setMessage("something went wrong, please refresh and try again")
            setTimeout(() => {
              setMessage('')
              setAppState('success')
            },5000)
        })
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
      {message ? <Notification message={message} type={appState}/> : null}
      <Filter value={searchField} onChange={handleSearch}/>
      <h2>Add a new</h2>
      <PersonForm addName={addName} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={persons} searchField={searchField} handleDelete={handleDelete}/>
    </div>
  )
}

export default App