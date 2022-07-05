import { useState, useEffect } from 'react'
import axios from 'axios'

const Persons = ({persons}) => 
  <>
    {
      persons.map((person) => <p key={person.id}>{person.name} {person.number}</p>)
    }
  </>

const Filter = ({value, onChange}) => 
  <>
    <input value={value} onChange={onChange}/>
  </>

const PersonForm = ({onSubmit, nameValue, onNameChange, phoneNumberValue, onPhoneNumberChange}) =>
  <>
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={nameValue} onChange={onNameChange}/>
      </div>
      <div>
        number: <input value={phoneNumberValue} onChange={onPhoneNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </>

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setPhoneNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then((response) => {
        setPersons(response.data)
      })
  }, [])

  const personToShow = filterName === '' 
    ? persons
    : persons.filter((person) => person.name.toUpperCase().indexOf(filterName.toUpperCase()) > -1)

  const onNameChange = (event) => {
    setNewName(event.target.value)
  }

  const onPhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault()

    if(persons.filter((person) => person.name === newName).length > 0){
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = {
        id: persons.length + 1,
        name: newName,
        number: newPhoneNumber
      }
      setPersons(persons.concat(newPerson))
    }
    setNewName('')
    setPhoneNumber('')
  }

  const onFilterNameChange = (event) => {
    setFilterName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterName} onChange={onFilterNameChange}/>

      <h3>Add a new</h3>
      <PersonForm 
        onSubmit={onSubmit} 
        nameValue={newName} 
        onNameChange={onNameChange} 
        phoneNumberValue={newPhoneNumber} 
        onPhoneNumberChange={onPhoneNumberChange}/>

      <h3>Numbers</h3>
      <Persons persons={personToShow}/>
    </div>
  )
}

export default App