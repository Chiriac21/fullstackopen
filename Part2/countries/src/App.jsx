import { useState, useEffect } from 'react'
import Countries from './components/Countries'
import searchService from "./services/searchService"

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countrySearch, setCountrySearch] = useState(null);

  useEffect(() => {
    searchService
      .getAllCountries()
      .then(resp => {setCountries(resp)})
  }, [])

  const handleSearchOnChanged = (event) => {
    setCountrySearch(event.target.value);
  }
  
  const filteredCountries = countries.filter(country =>
        country.name.common.toLowerCase().includes(countrySearch?.toLowerCase())
  );

  return(
    <>
    <div>
      find countries <input onChange={handleSearchOnChanged}/>
      <Countries countries={filteredCountries} setCountries={setCountries} countrySearch={countrySearch}/>
    </div>
    </>
  )
}

export default App
