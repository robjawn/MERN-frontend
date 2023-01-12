import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Index from '../pages/Index'
import Show from '../pages/Show'

    function Main(props) {
        const [people, setPeople] = useState(null)
        const URL = 'https://quiet-mountain-13880.herokuapp.com/people'

        const getPeople = async () => {
            const response = await fetch(URL)
            const data = await response.json()
            setPeople(data)
        }

        const createPeople = async (person) => {
            await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-type': 'Application/json'
                },
                body: JSON.stringify(person)
            })
            getPeople() // running this again will allow the update, since getPeople will now pull in the new person when it fetches
        }

        useEffect(() => {
            getPeople();
        },  [])

        return (
          <main>
            <Routes>
              <Route path="/" element={
                <Index 
                    people={people} 
                    createPeople={createPeople} 
                    />} 
                />
              <Route path="/people/:id" element={<Show />} />
            </Routes>
          </main>
        );
      }


export default Main