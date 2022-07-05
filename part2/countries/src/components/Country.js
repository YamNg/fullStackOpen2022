import axios from "axios"
import { useState, useEffect } from "react"

const CountryQueryInput = ({onQueryChange}) => 
  <div>
    find countries <input onChange={onQueryChange}  />
  </div>

const CountryDescription = ({countries, handleShowCountryClick}) => {
  const arrLength = countries.length
  return (
    <div>
      {
        (arrLength > 10) ? <>Too many matches, specify another filter</> :
        (arrLength === 1) ? <CountryDetail country={countries[0]}/> :
        <CountryNameList countries={countries} handleShowCountryClick={handleShowCountryClick}/>
      }
    </div>
  )
}

const CountryDetail = ({country}) => {
  const apiKey = process.env.REACT_APP_API_KEY
  const [weather, setWeather] = useState({})

  const lat = country.capitalLatlng[0]
  const long = country.capitalLatlng[1]

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`)
      .then((response) => {
        const weather = {
          temperature: response.data.main.temp,
          wind: response.data.wind.speed,
          weatherIcon: response.data.weather[0].icon
        }
        setWeather(weather)
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, long])
  
  return (
    <>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>languages</h3>
      <ul>
        {
          (
            country.languages ? 
              Object.keys(country.languages).map((languageKey) => <li key={languageKey}>{country.languages[languageKey]}</li>) : 
              <></>
          )
        }
      </ul>
      <img src={country.flagImgLink} alt={country.name}/>

      {
        (weather.temperature && weather.weatherIcon && weather.wind) ?
          <>
            <h3>Weather in {country.capital}</h3>
            <p>temperature {weather.temperature} Celcius</p>
            <img src={(`http://openweathermap.org/img/wn/${weather.weatherIcon}@2x.png`)} alt={(`${country.capital} Weather`)} />
            <p>wind {weather.wind} m/s</p>
          </> : 
          <></>
      }
    </>
  )
}

const CountryNameList = ({countries, handleShowCountryClick}) => {
  return (
    <div>
      {
        countries.map((country) => { 
          const showButtonHandler = () => handleShowCountryClick([country])
          return <div key={country.area}>{country.name} <button onClick={showButtonHandler}>show</button></div> 
        })
      }
    </div>
  )
}

export { CountryQueryInput, CountryDescription }