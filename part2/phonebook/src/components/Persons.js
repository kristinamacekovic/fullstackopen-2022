import Person from './Person';

const Persons = props => {
    return (
        <div>
            {props.persons.filter(person => person.name.toLowerCase().includes(props.searchField.toLocaleLowerCase()))
                            .map(person => <Person key={person.name} name={person.name} number={person.number}/>)}
        </div>
    )
}

export default Persons;