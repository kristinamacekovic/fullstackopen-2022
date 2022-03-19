const Country = ({country}) => {
    return (
        <div>
            <h2>{country.name.official} {country.flag}</h2>
            <p>Capital: {country.capital[0]}</p>
            <p>Area: {country.area}</p>
            <p>Population: {country.population}</p>
            <h3>Languages</h3>
            <ol>
                {Object.keys(country.languages).map(language => <li key={language}>{country.languages[language]}</li>)}
            </ol>
            <h3>Flag</h3>
            <img src={country.flags.svg} alt={`${country.name.official} flag`}/>
        </div>
    )
}

export default Country