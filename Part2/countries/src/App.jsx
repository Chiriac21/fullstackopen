import { useState } from 'react'
import Countries from './components/Countries'
import { useCountry } from './hooks'

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [searchName, setSearchName] = useState(null);
  const { country } = useCountry(searchName);

  const handleSearchOnChanged = (event) => {
    setInputValue(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchName(inputValue);
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        find countries <input value={inputValue} onChange={handleSearchOnChanged} />
        <button type="submit">search</button>
      </form>
        <Countries countries={country} setCountries={setSearchName}/>
    </div>
  )
}

export default App
