import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'




const App = function () {

  // hooks
  const [persons, setPersons] = useState([])
  const [newNameInput, setNewNameInput] = useState('')
  const [newNbInput, setNewNbInput] = useState('')
  const [filterInput, setFilterInput] = useState('')
  
  useEffect(() => {
    axios
    .get("http://localhost:3001/persons")
    .then(response => {
      setPersons(response.data)
    })
    // or
    // const fetchData = async () => {
    //   const result = await axios('http://localhost:3001/persons')
    //   setPersons(result.data)
    // }
    // fetchData()
  }, [])
  

  


  // Input Handlers of controlled components
  const handleNameInputChange = event => setNewNameInput(event.target.value)
  const handleFilter = event => setFilterInput(event.target.value.toLowerCase())
  const handleNbInputChange = event => setNewNbInput(event.target.value)
  // vs inside: <div>number: <input value={newNbInput} onChange={event => setNewNbInput(event.target.value)} /></div>

  //Event Listners
  const addPerson = (event) => {
    if (persons.some(person => person.name === newNameInput)) {
      alert(`${newNameInput} is already added to phonebook`)
    }
    else {
      event.preventDefault()
      const newPerson = {
        name: newNameInput,
        number: newNbInput,
        // id: persons.length+1
      }
      setPersons([...persons, newPerson])
    }

    setNewNameInput('')
    setNewNbInput('')
  }

  //  Filters
  const personsToDisplay = persons.filter(person => person.name.toLowerCase().includes(filterInput))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterInput={filterInput} handleFilter={handleFilter} />
      <h2>Add a new contact</h2>
      <PersonForm addPerson={addPerson} newNameInput={newNameInput} handleNameInputChange={handleNameInputChange}
        newNbInput={newNbInput} handleNbInputChange={handleNbInputChange} />
      <h2>Numbers</h2>
      <Persons persons={personsToDisplay} />
    </div>
  )
}

export default App


