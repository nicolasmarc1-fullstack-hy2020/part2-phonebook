import React from 'react'

const Person = ({ name, number }) => {
  return (
    <div>{name} {number}</div>
  )
}


const Persons = ({ persons }) => {

  return (
    <div>
      <div>
        {persons.map(person => <Person name={person.name} number={person.number} key={person.name} />)}
      </div>
    </div>
  )
}

export default Persons
