import { useState, useEffect } from "react"
import searchService from '../services/searchService'

export const useCountry = (name) => {
  const [country, setCountry] = useState([])

  useEffect(() => {
    async function fetchData(){
    if (name) {
      const countries = await searchService.getAllCountries();
        const filteredCountries = countries.filter(ctr =>
        ctr.name.common.toLowerCase().includes(name?.toLowerCase())
        )
        if(filteredCountries.length !== 0)
          setCountry(filteredCountries)
      }
    }
    fetchData();
  }, [name])

  return {
    country
  }
}