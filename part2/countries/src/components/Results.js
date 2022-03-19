import Country from './Country'

const Results = ({countries, searchTerm}) => {
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
                {filteredCountries.map(country => <p key={country.ccn3}>{country.name.official}</p>)}
            </div>
        )
    }

    return (
        <p>Narrow down your search, too many countries to display!</p>
    )

}

export default Results