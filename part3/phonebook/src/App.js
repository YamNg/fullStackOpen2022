import { useState, useEffect } from 'react'
import personService from './services/person'
import { PersonFilter, PersonForm, PersonList } from './components/Person'
import { Notification } from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setPhoneNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initPersons => setPersons(initPersons))
  }, [])

  const onNameChange = (event) => {
    setNewName(event.target.value)
  }

  const onPhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value)
  }

  const showNotification = (message, isSuccess) => {
    setNotification({message, isSuccess})
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const onSubmit = (event) => {
    event.preventDefault()

    const filteredPersonArr = persons.filter((person) => person.name === newName)
    if(filteredPersonArr.length > 0){
      const filteredPerson = filteredPersonArr[0]
      if(window.confirm(`${filteredPerson.name} is already added to phonebook, replace the old number with a new one?`)){
        const newPerson = {
          ...filteredPerson,
          number: newPhoneNumber
        }
        personService
          .update(newPerson)
          .then((returnedPerson) => {
            let newPersons = persons.map((person) => person.id !== returnedPerson.id ? person : returnedPerson)
            showNotification(`Updated ${newPerson.name}`, true)
            setPersons(newPersons)
          })
          .catch(error => {
            console.log(error.response.data.error)
            showNotification(error.response.data.error, false)
          })
      }
    } else {
      const newPerson = {
        id: persons.length + 1,
        name: newName,
        number: newPhoneNumber
      }

      personService
        .create(newPerson)
        .then((returnedPerson) => {
          showNotification(`Added ${returnedPerson.name}`, true)
          setPersons(persons.concat(returnedPerson))
        })
        .catch(error => {
          // this is the way to access the error message
          console.log(error.response.data.error)
          showNotification(error.response.data.error, false)
        })
    }
    setNewName('')
    setPhoneNumber('')
  }

  const onFilterNameChange = (event) => {
    setFilterName(event.target.value)
  }

  const onDeleteClick = (deletePerson) => {
    if(window.confirm(`Delete ${deletePerson.name} ?`)){
      personService
      .remove(deletePerson.id)
      .then((returnedPersonId) => {
        const newPersons = persons.filter((person) => person.id !== returnedPersonId)
        setPersons(newPersons)
      })
    }
  }

  const personToShow = filterName === '' 
    ? persons
    : persons.filter((person) => person.name.toUpperCase().indexOf(filterName.toUpperCase()) > -1)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification}/>
      <PersonFilter value={filterName} onChange={onFilterNameChange}/>

      <h3>Add a new</h3>
      <PersonForm 
        onSubmit={onSubmit} 
        nameValue={newName} 
        onNameChange={onNameChange} 
        phoneNumberValue={newPhoneNumber} 
        onPhoneNumberChange={onPhoneNumberChange}/>

      <h3>Numbers</h3>
      <PersonList persons={personToShow} onDeleteClick={onDeleteClick}/>
    </div>
  )
}

export default App