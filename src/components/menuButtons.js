import React from 'react';

function MenuButton(props) {
    if (props.value === 'GARZONES' && props.waitersOn) {
      return (
        <button key={props.value} className="menu-button-selected" onClick={props.onClick}>{props.value}</button>
      )
    } else if (props.value === 'COCINA' && !props.waitersOn) {
      return (
        <button key={props.value} className="menu-button-selected" onClick={props.onClick}>{props.value}</button>
      )
    } else {
      return (
        <button key={props.value} className="menu-button" onClick={props.onClick}>{props.value}</button>
      )
    }
  }

export default MenuButton;