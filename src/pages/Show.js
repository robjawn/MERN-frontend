import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'

const Show = (props) => {
  //access the id from the url param
  const { id } = useParams();
  const navigate = useNavigate();

  const person = props.people ? props.people.find(person => person._id === id) : null //checks to see if props.people is present, if not, assigns empty strings to person


  const [editForm, setEditForm] = useState(person)

  useEffect(() => {
    if(person) {
      setEditForm(person)
    }
  }, [person])

  const handleChange = (event) => {
    setEditForm({ ...editForm, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    props.updatePeople(id, editForm)
  }
  
  //use the id to find the specific person in the people array 
  const loaded = () => {
  
    //below, the && sets up a condition to display if param exists, if not, won't render the tag 
    return (
      <div className="person">
        <h2>{person.name}</h2>
        <p>{person.title}</p>
          {person.image &&
          <img src={person.image} alt={person.name} />
          }
          <form onSubmit={handleSubmit}>
            <input 
            type="text" 
            name="name" 
            value={editForm.name} 
            onChange={handleChange} 
            />
            <input 
            type="text" 
            name="title" 
            value={editForm.title} 
            onChange={handleChange} 
            />
            <input 
            type="text" 
            name="image" 
            value={editForm.image} 
            onChange={handleChange} 
            />
            <input type="submit" value="Update Person" />
          </form>
          <button onClick={handleDelete}>Delete This Person</button>
      </div>
    )
  }

  const loading = () => {
    return <h2>Loading...</h2>
  }

  const handleDelete = () => {
    props.deletePeople(id)
    navigate('/'); //returns to root of app using browser history
  };

  return (
    <section>
    { props.people ? loaded() : loading() }
    </section>
  )
}
export default Show