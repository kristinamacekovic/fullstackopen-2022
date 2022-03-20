import Person from './Person';

const Persons = props => {
    return (
        <div>
            {props.persons.filter(person => person.name.toLowerCase().includes(props.searchField.toLocaleLowerCase()))
                            .map(person => <Person key={person.id} id={person.id} name={person.name} number={person.number} handleDelete={props.handleDelete}/>)}
        </div>
    )
}

export default Persons;