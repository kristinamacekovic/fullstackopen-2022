import Weather from './Weather'

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
            <h3>{`Weather in ${country.capital[0]}`}</h3>
            <Weather lat={country.capitalInfo.latlng[0]} lon={country.capitalInfo.latlng[1]}/>
        </div>
    )
}

export default Country