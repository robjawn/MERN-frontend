import { useParams } from 'react-router-dom'

const Show = (props) => {
  //access the id from the url param
  const { id } = useParams();
  //use the id to find the specific person in the people array 
  const loaded = () => {
    const person = props.people.find(person => person._id === id)
    //below, the && sets up a condition to display if param exists, if not, won't render the tag 
    return (
      <div className="person">
        <h2>{person.name}</h2>
        <p>{person.title}</p>
          {person.image &&
          <img src={person.image} alt={person.name} />
          }
      </div>
    )
  }

  const loading = () => {
    return <h2>Loading...</h2>
  }

  return props.people ? loaded() : loading()
}
export default Show