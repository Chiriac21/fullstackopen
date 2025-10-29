import {useState, useImperativeHandle} from 'react';

const Toggleable = (props) => {
    const [visible, setvisible] = useState(false);

    const hideWhenVisible = { display: visible ? 'none' : '' };
    const showWhenVisible = { display: visible ? '' : 'none' };

    const toggleVisibility = () => {
        setvisible(!visible);
    }

    useImperativeHandle(props.ref, () => {
    return { toggleVisibility }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.acceptButtonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>{props.cancelButtonLabel}</button>
            </div>
        </div>
    )

}

export default Toggleable;