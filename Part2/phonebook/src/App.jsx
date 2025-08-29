import { useState, useEffect } from 'react';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';
import formService from './services/formService';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [message, setMessage] = useState({ message: null, type: null });

  useEffect(() => {
    formService
      .getAll()
      .then(resp => {setPersons(resp)})
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={message?.message} type={message?.type}/>
        <Filter persons={persons}/>
      <h2>Add a new person</h2>
        <PersonForm persons={persons} setPersons={setPersons} setMessage={setMessage}/>
      <h2>Numbers</h2>
        <Persons persons={persons} setPersons={setPersons}/>
    </div>
  )
}

export default App