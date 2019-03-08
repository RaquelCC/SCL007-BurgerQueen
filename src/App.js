import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [/*{
        client: null,
        contents: null,
        sentToKitchen: false,
        ready: false,
      }*/],
      waitersOn: true,
      menu:  props.menu,
    }
  }

  handleClick(i) {
    if (i === 'GARZONES') {
      this.setState({
        ...this.state,
        waitersOn: true,
      })
    } else {
      this.setState({
        ...this.state,
        waitersOn: false,
      })
    }
  }

  renderMenuButton(i) {
    return (
      <MenuButton 
        value={i}
        onClick={() => this.handleClick(i)}
        waitersOn={this.state.waitersOn}
      />
    )
  }

  render() {
    if (this.state.waitersOn){
      return (
        <div className="app-container">
          <div className="menu-content">
            {this.renderMenuButton('GARZONES')}
            {this.renderMenuButton('COCINA')}
          </div>
          <div className="app-content">
            <p>GARZONES ON</p>
            <Garzones
              menu={this.state.menu}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="app-container">
          <div className="menu-content">
            {this.renderMenuButton('GARZONES')}
            {this.renderMenuButton('COCINA')}
          </div>
          <div className="app-content">
            <p>{"GARZONES OFF"}</p>
            {/*aqui deberia ir la app de garzones*/}
          </div>
        </div>
      );
    }
  }
}

class Garzones extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: props.menu,
      displayMenu: Object.keys(props.menu),
      previousMenu: props.menu,
    }
  }

  handleClick(item) {
    const previousMenu = this.state.previousMenu;
    this.setState({
      ...this.state,
      previousMenu: previousMenu[item],
      displayMenu: Object.keys(previousMenu[item])
    })
  }

  renderDisplayMenu() {
    return (
      this.state.displayMenu.map(item => {
        return (
          <FoodButton 
            value={item}
            onClick={() => this.handleClick(item)}       
          />
        )
      })
    )
  }
  

  render() {
    // let menuOptions = this.state.displayMenu.map(item => {
    //   return (
    //     <button className="menu-options" key={item}>{item}</button>
    //   )
    // });
    return(
      <div className="container-garzones">
        {this.renderDisplayMenu()}
      </div>
    )
  }
}

function FoodButton(props) {
  return (
    <button className="food-menu" key={props.value} onClick={props.onClick}>{props.value}</button>
  )
}

function MenuButton(props) {
  if (props.value === 'GARZONES' && props.waitersOn) {
    return (
      <button className="menu-button-selected" onClick={props.onClick}>{props.value}</button>
    )
  } else if (props.value === 'COCINA' && !props.waitersOn) {
    return (
      <button className="menu-button-selected" onClick={props.onClick}>{props.value}</button>
    )
  } else {
    return (
      <button className="menu-button" onClick={props.onClick}>{props.value}</button>
    )
  }
}



export default App;
