import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Waiters from './components/waiters';
import MenuButton from './components/menuButtons';
import Kitchen from './components/kitchen';
import logo from './img/output-onlinepngtools.png';


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
      pedidosRef: props.pedidosRef,
      kitchenOrders: [],
      readyOrders: [],
    }

    this.kitchenOrderReady = this.kitchenOrderReady.bind(this);    
  }
  
  componentDidMount() {
    this.state.pedidosRef.ref().on("value", snap => {
      const orders = [];
      // console.log(snap.val())
      for (let item in snap.val()) {
          let subitem = snap.val()[item];
          subitem.orderId = item;
          orders.push(subitem);
      }

      const paraCocina = orders.filter(item => {
        return (item.ready === false)
      })
      const listos = orders.filter(item => {
        return (item.ready === true)
      })

      this.setState({
        ...this.state,
        kitchenOrders: paraCocina,
        readyOrders: listos,
      })
    })
  //   this.props.pedidosRef.ref().orderByChild("ready").equalTo(false).on("value", snap => {
  //     const orders = [];
  //     for (let item in snap.val()) {
  //         let subitem = snap.val()[item];
  //         subitem.orderId = item;
  //         orders.push(subitem);
  //     }
  //     this.setState({
  //         ...this.state,
  //         kitchenOrders: orders,
  //     },()=> {
  //       this.props.pedidosRef.ref().orderByChild("ready").equalTo(true).on("value", snap => {
  //         const orders = [];
  //         for (let item in snap.val()) {
  //             let subitem = snap.val()[item];
  //             subitem.orderId = item;
  //             orders.push(subitem);
  //         }
  //         this.setState({
  //             ...this.state,
  //             readyOrders: orders,
  //         })
  //     })
  //     })
  // })

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

  kitchenOrderReady(item) {
    this.props.pedidosRef.ref(item.orderId).update({
      ready: true
    })
  }

 


  render() {
    if (this.state.waitersOn){
      return (
        <div>
          <div id="logo-container"><img id="logo" src={logo} alt="logo"></img></div> 
        <div className="app-container">
          <div className="menu-content">
            {this.renderMenuButton('GARZONES')}
            {this.renderMenuButton('COCINA')}
          </div>
          <div className="app-content">
            <Waiters
              menu={this.state.menu}
              readyOrders={this.state.readyOrders}
            />
          </div>
        </div>
        </div>
      );
    } else {
      return (
        <div>
         <div id="logo-container"><img id="logo" src={logo} alt="logo"></img></div> 
        <div className="app-container" key="waiters">
          <div className="menu-content">
            {this.renderMenuButton('GARZONES')}
            {this.renderMenuButton('COCINA')}
          </div>
          <div className="app-content" key="kitchen">
            {!this.state.waitersOn && 
            <Kitchen
            kitchenOrders={this.state.kitchenOrders}
            kitchenOrderReady={this.kitchenOrderReady}
            />
            }
          </div>
        </div>
        </div>
      );
    }
  }
}









export default App;
