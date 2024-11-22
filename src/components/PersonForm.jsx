import  { useState, useEffect } from 'react';


function PersonForm({blankPerson, personToEdit, mutatePerson}) {

    const [person, setPerson] = useState({...personToEdit});

    useEffect(() => {
        setPerson(personToEdit);
    }, [personToEdit]);

    function handleChange(event) {
        const value = event.target.value
        const name = event.target.id
        setPerson({...person, [name]: value});
    }
    
    function handleSubmit(event) {
        event.preventDefault(); //for at stoppe eventbobling, button har default submitfunction
        console.log("submit", person);
        mutatePerson(person);

    }

    return ( 
        <div>
            <h1>Add/Edit person</h1>
           <div className='json-output'>{JSON.stringify(person)}</div> 
            <form onSubmit={handleSubmit}>
                <label htmlFor="id">Id</label>
                <input id="id" type="number" readOnly placeholder="id" value={person.id} onChange={handleChange} />
                <label htmlFor="name">Name</label>
                <input id="name" type="text" placeholder="name" value={person.name} onChange={handleChange}  />
                <label htmlFor="age">Age</label>
                <input id="age" type="number" min="1" max="120" placeholder="age" value={person.age} onChange={handleChange} />
                <label htmlFor="email">Email</label>
                <input id="email" type="email" placeholder="email" value={person.email} onChange={handleChange} />
                <label htmlFor="gender">Gender</label>
                    <select id="gender" value={person.gender} onChange={handleChange} >
                        <option defaultChecked>Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                        <button>Update</button>
                        <button onClick={() => setPerson(blankPerson)}>Reset</button>
            </form>

        </div>
     );
}

export default PersonForm;