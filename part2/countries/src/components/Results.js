import Country from './Country'
import SearchResult from './SearchResult'

const Results = ({countries, searchTerm, setSearchTerm}) => {
    const filteredCountries = countries.filter(country => country.name.official.toLowerCase().includes(searchTerm.toLowerCase()))
    if (filteredCountries.length === 1) {
        // return info on 1 specific country
        return (
           <Country country={filteredCountries[0]}/>
        )
    }

    if (filteredCountries.length > 1 &&  filteredCountries.length <= 10) {
        //list out the countries
        return (
            <div>
                {filteredCountries.map(country => <SearchResult key={country.cca3} country={country} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>)}
            </div>
        )
    }

    return (
        <p>Narrow down your search, too many countries to display!</p>
    )

}

export default Results