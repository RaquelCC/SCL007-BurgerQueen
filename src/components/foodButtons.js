import React from 'react';
import './foodButtons.css'

function FoodButton(props) {
    return (
      <button key={props.value} className="food-menu" onClick={props.onClick}>
      {props.price ? props.value.toUpperCase() + " $" + props.price : props.value.toUpperCase()}
      </button>
    )
  }

export default FoodButton;