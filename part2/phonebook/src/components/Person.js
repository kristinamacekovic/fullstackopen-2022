const Person = ({id, name, number, handleDelete}) => {
    return (
        <div>
            <p key={id}>{name}: {number}</p>
            <button onClick={() => handleDelete(id)}>Delete</button>
        </div>
    )
}

export default Person