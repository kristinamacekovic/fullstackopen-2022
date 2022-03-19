const SearchResult = ({country, searchTerm, setSearchTerm}) => {

    const handleClick = () => {
        setSearchTerm(country.name.official)
    }

    return (
        <p>
            {country.name.official}
            <button onClick={handleClick}>Details</button>
        </p>
    )
}

export default SearchResult