import { useState } from 'react'
import { Link } from 'react-router-dom'

const Index = (props) => {
    const [newForm, setNewForm] = useState({
        name: '',
        title: '',
        image: ''
    }) // {} says to initialize it to an object 

    const handleChange = (event) => {
        // When the set state function is called
        // New state is passed in as an argument 
        // the new state is then used to replace old state
        // in summary: old state will always be overridden with new state

        //below, ...newForm merges old state with new state

        setNewForm({...newForm, 
            [event.target.name]: event.target.value
        })
    };
    //event.target.name in brackets above doesn't refer to array key 'name', it refers to the 'name' parameter below in <input> tags!

    //this function will "lift" form state up the components heirarchy to Main component's create people function
    const handleSubmit = (event) => {
        event.preventDefault(); // this prevents a page refresh on submit 
        props.createPeople(newForm) //createPeople is passed by Main.js, newForm is declared above.
        setNewForm({
            name: '',
            title: '',
            image: ''
        })
        //above will reset the form to empty fields
    };

    const loaded = () => {
        return props.people.map(person => (
            <div key={person._id}>
                <Link to={`/people/${person._id}`}>
                    <h1>{person.name}</h1>
                </Link>
            </div>
        ))
    }

    const loading = () => {
        return<h1>Loading...</h1>
    }

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={newForm.name}
                />
                <input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    value={newForm.title}
                />
                <input
                    type="text"
                    name="image"
                    onChange={handleChange}
                    value={newForm.image}
                />
                <input type="submit" value="Add Person"/>
                { props.people ? loaded(): loading() }
            </form>
        </section>
    )
}

export default Index