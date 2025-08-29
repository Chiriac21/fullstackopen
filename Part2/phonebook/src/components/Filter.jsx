import { useState } from 'react';

const Filter = ({persons}) => {
    const [searchName, setSearchName] = useState('');
  
    const handleSearchNameOnChange = (event) => {
        setSearchName(event.target.value)
    }
  

    const foundPerson = persons.filter((person) => person.name.toLowerCase() === searchName.toLowerCase());
  
    return(      
    <div>
        filter shown with <input value={searchName} onChange={handleSearchNameOnChange}/>
        <div>
          {foundPerson.map((person) => <p key={person.id}>{person.name}, {person.number}</p>)}
        </div>
    </div>
    )
}

export default Filter;