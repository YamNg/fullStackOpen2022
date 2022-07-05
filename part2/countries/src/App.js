import axios from "axios"
import { useState, useEffect } from "react"
import { CountryQueryInput, CountryDescription } from "./components/Country"

const App = () => {

  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])

  // events
  const onCountryQueryChange = (event) => {
    const countryQuery = event.target.value
    if(countryQuery && countryQuery !== '')
      setCountriesToShow(countries.filter((country) => country.name.toUpperCase().indexOf(countryQuery.toUpperCase()) > -1))
    else
      setCountriesToShow(countries)
  }

  // effects
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        const countriesData = response.data.map((countryData) => {
          return {
            name: countryData.name.common,
            capital: countryData.capital,
            capitalLatlng: countryData.capitalInfo.latlng,
            area: countryData.area,
            languages: countryData.languages,
            flagImgLink: countryData.flags.png
          }
        })
        setCountries(countriesData)
        setCountriesToShow(countriesData)
      })
  }, [])

  return (
    <>
      <CountryQueryInput onQueryChange={onCountryQueryChange} />
      <CountryDescription countries={countriesToShow} handleShowCountryClick={setCountriesToShow}/>
    </>
  );
}

export default App;
