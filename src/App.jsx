
import { useState, useEffect } from 'react';
import PersonForm from './components/PersonForm';
import PersonList from './components/PersonList';
import { fetchData } from './util/persistens';
import './styles/App.css';

const blankPerson ={
  id: "",
  name: "",
  age: "",
  email:"",
  gender: ""
} 

function App() {
  
  const[persons, setPersons] = useState([]);
  const[personToEdit, setPersonToEdit] = useState(blankPerson);
  const APIURL = "http://localhost:3000/api";
  
  function mutatePerson(person) {
    if(person.id!= ''){
      updatePerson(person);
    }else{
      createPerson(person);
    }
  }

  function createPerson(person) {
    console.log("createPerson");
    fetchData(APIURL, (person)=>setPersons([...persons, person]), 'POST', person);

  }

  function updatePerson(person) {
    console.log("updatePerson");
    fetchData(`${APIURL}/${person.id}`, (person) =>{setPersons(persons.map(p=> p.id == person.id ? {...person} : p))}, 'PUT', person);

  }

  function editPerson(person) {
    setPersonToEdit(person);
  }

  function getPersons(callback) {
    fetchData(APIURL, callback);
  }

  function deletePersonById(personId) {
    fetchData(`${APIURL}/${personId}`, ()=>{}, 'DELETE');
    setPersons ([...persons.filter((p) => p.id !== personId)]);
  }

  useEffect(() => {
    getPersons((data)=>setPersons(data));
  }, []);


  return (
    <div className="container">
      <div className='header'>
        <h1> Person DB</h1>
      </div>
      <div className='main'>
        
        <div className='left'>
          <PersonForm blankPerson={blankPerson} personToEdit={personToEdit} mutatePerson={mutatePerson}/>
        </div>
        <div className='right'>
          <PersonList persons={persons} deletePersonById={deletePersonById} editPerson={editPerson}/>
        </div>

        
        
      </div>
    </div>
  )
}

export default App
