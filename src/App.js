import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Waiters from './components/waiters';
import MenuButton from './components/menuButtons';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [/*{
        customer: null,
        contents: null,
        total: null,
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
            <Waiters
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
            {/*aqui deberia ir la app de cocina*/}
          </div>
        </div>
      );
    }
  }
}









export default App;
