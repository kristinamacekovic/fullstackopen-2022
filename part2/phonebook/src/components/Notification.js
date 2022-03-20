const Notification = ({type, message}) => {
    const successStyle = {
        fontSize: 32,
        color: 'green',
        border: '2px solid green'
    }

    const errorStyle = {
        fontSize: 32,
        color: 'red',
        border: '2px solid red'
    }

    if (type === "success") {
        return <div style={successStyle}>{message}</div>
    } else {
        return <div style={errorStyle}>{message}</div>
    }

}

export default Notification