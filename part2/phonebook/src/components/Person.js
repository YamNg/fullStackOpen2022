const PersonList = ({persons, onDeleteClick}) => 
  <>
    {
      persons.map((person) => <p key={person.id}>{person.name} {person.number} <button onClick={() => onDeleteClick(person)}>delete</button></p>)
    }
  </>

const PersonFilter = ({value, onChange}) => 
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

export {PersonList, PersonFilter, PersonForm}