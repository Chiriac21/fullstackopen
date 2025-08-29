import { useState } from 'react'
import formService from '../services/formService';

const PersonForm = ({persons, setPersons, setMessage}) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('');

    const onSubmitForm = (event) =>{
      event.preventDefault();
      
      var foundPerson = persons.find((person) => person.name === newName)
      if(foundPerson)
      {
        const isConfirmed = window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`);
        if(isConfirmed)
        {
          const newPerson = {
            ...foundPerson,
            number: newNumber
          }
          formService
            .updatePerson(foundPerson.id, newPerson)
            .then(updatedPerson => {
              setPersons(persons.map(person => person.id === foundPerson.id? updatedPerson : person))
              setNewName('')
              setNewNumber('')
            })
            .catch(() => {
              setMessage({
                message:`Information of ${foundPerson.name} has already removed from server`,
                type:'error'
              })
              setTimeout(() => {
                setMessage(null);
              }, 5000)
              setPersons(persons.filter(person => person.id !== foundPerson.id));
            })
        }
        return;
      }

      const person = {
        name: newName,
        number: newNumber,
      }

      formService
        .addPerson(person)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessage({
            message: `Added ${person.name}`,
            type: 'success'
          })
           setTimeout(() => {
             setMessage(null);
           }, 5000)
          setNewName('')
          setNewNumber('')
        })
  }

  const handleNameOnChange = (event) =>{
    setNewName(event.target.value);
  }

  const handleNumberOnChange = (event) =>{
    setNewNumber(event.target.value);
  }

    return (
        <form onSubmit={onSubmitForm}>
        <div>
          name: <input value={newName} onChange={handleNameOnChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberOnChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    );
}

export default PersonForm;