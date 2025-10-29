const Notification = ({message, type}) => {
    if(!message)
        return null;
    
    const baseStyle = {
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    };

    const messageStyle = {
        ...baseStyle,
        color: type === 'error' ? 'red' : 'green',
        borderColor: type === 'error' ? 'red' : 'green',
    };

    return (
        <div style={messageStyle}>
            {message}
        </div>
    );
}

export default Notification