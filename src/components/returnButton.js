import React from 'react';

function ReturnButton(props) {
    return (
        <button className="food-menu" onClick={props.onClick}>VOLVER</button>
    )
}

export default ReturnButton;