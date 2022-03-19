import {useState, useEffect} from 'react'
import axios from 'axios'
import Search from './components/Search'
import Results from './components/Results'


const App = () => {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all")
          .then(response => {
            setCountries(response.data)
          })
  }, [])

  const handleSearch = event => {
    setSearchTerm(event.target.value)
  }

  return(
   <div>
     <h1>Search</h1>
     <Search value={searchTerm} onChange={handleSearch}/>
     <h1>Results</h1>
     <Results countries={countries} searchTerm={searchTerm}/>
   </div>
  )
}

export default App;
