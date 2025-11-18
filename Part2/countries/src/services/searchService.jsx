import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries'

const getAllCountries = async () => {
    const req = await axios.get(`${baseUrl}/api/all`);
    return req.data;
}

const getCountry = async (name) => {
    const response = await axios.get(`${baseUrl}/api/name/${name}`);
    if(response.status !== 200) {
        return null;
    }
    return response.data;
}

export default {getAllCountries, getCountry}