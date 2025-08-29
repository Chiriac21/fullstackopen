import formService from "../services/formService";

const Persons = ({persons, setPersons}) =>{

    const onDeletePressed = (id) => {
        const personToDelete = persons.find(person => person.id === id);

        const performDelete = window.confirm(`Delete ${personToDelete.name}?`)

        if(performDelete)
        {
            formService
                .deletePerson(id)
                .then(setPersons(persons.filter(person => person.id !== id)));
        }
    }

    return(
    <div>
        {persons.map((person) => 
        <p key={person.id}>{person.name}, {person.number} <button onClick={() => onDeletePressed(person.id)}>delete</button></p>
        )}
    </div>
    );
}

export default Persons;