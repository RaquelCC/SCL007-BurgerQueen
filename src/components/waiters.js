import React, { Component } from 'react';
import FoodButton from './foodButtons';
import CurrentOrder from './currentOrder';
import ReturnButton from './returnButton';
import { pedidosRef } from './firebase';
import './waiters.css'

class Waiters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: props.menu,
            displayMenu: Object.keys(props.menu),
            previousMenu: [(props.menu)],
            currentMenu: props.menu,    
            currentOrder: {
                customer: null,
                contents: [],
                total: 0,
                sentToKitchen: false,
                ready: false,
            },
            inputName: ''
        }
        this.returnMenu = this.returnMenu.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.renderDisplayMenu = this.renderDisplayMenu.bind(this);
        this.sendToKitchen = this.sendToKitchen.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addCustomer = this.addCustomer.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }

    returnMenu() {
        if (this.state.previousMenu.length === 0) {
            return;
        }
        let newPrevious = this.state.previousMenu;
        let newCurrent = newPrevious.pop();
        this.setState({
            ...this.state,
            displayMenu: Object.keys(newCurrent),
            currentMenu: newCurrent, 
            previousMenu: newPrevious,          
        })
    }

    handleClick(item) {
        if (!this.state.currentMenu[item].precio) { 
            const previousMenu = this.state.previousMenu;
            const newPrevious = previousMenu.concat([this.state.currentMenu]);
            const newDisplay = Object.keys(newPrevious[newPrevious.length-1][item])
            this.setState({
                ...this.state,
                previousMenu: newPrevious,
                currentMenu: newPrevious[newPrevious.length-1][item],
                displayMenu: newDisplay,
            })
        } else {
            const newContent = this.state.currentOrder.contents;
            for (let i = 0; i < newContent.length; i += 1) {
                if (newContent[i].itemName === item) {
                    newContent[i].quantity += 1;
                    this.setState({
                        ...this.state,
                        currentOrder: {
                            ...this.state.currentOrder,
                            contents: newContent,
                            total: this.state.currentOrder.total+this.state.currentMenu[item].precio,
                        }
                    })
                    return;
                }
            }
            newContent.push({
                itemName: item,
                price: this.state.currentMenu[item].precio,
                quantity: 1
            });
            this.setState({
                ...this.state,
                currentOrder: {
                    ...this.state.currentOrder,
                    contents: newContent,
                    total: this.state.currentOrder.total+this.state.currentMenu[item].precio,
                }
            })
        }
    }

    sendToKitchen() {
        this.setState({
            ...this.state,
            currentOrder: {
                ...this.state.currentOrder,
                sentToKitchen: Date.now(),
            }
        },()=> {
            pedidosRef.push(this.state.currentOrder)
        })
    }

    renderDisplayMenu() {
        return (
            this.state.displayMenu.map(item => {
                if (item === "precio") {
                    return null
                } else {
                    return (
                        <FoodButton
                            price={this.state.currentMenu[item].precio ? this.state.currentMenu[item].precio : null}
                            key={item}
                            value={item}
                            onClick={() => this.handleClick(item)}
                        />
                    )
                }
            })
        )
    }

    addCustomer() {
        this.setState({
            ...this.state,
            currentOrder: {
                ...this.state.currentOrder,
                customer: this.state.inputName,
            }
        })
    }

    handleChange(e) {
        this.setState({
            ...this.state,
            inputName: e.target.value,
        })
    }

    removeItem(item) {
        let newContents = this.state.currentOrder.contents.filter(menuItem => {
            return (menuItem.itemName !== item)
        });
        let newItem = this.state.currentOrder.contents.filter(menuItem => { //revisar si filter cambia array original
            return (menuItem.itemName === item)
        })

        const price = newItem[0].price;

        newItem[0].quantity = newItem[0].quantity - 1;

        if (newItem[0].quantity > 0) {
            newContents = newContents.concat(newItem)
        }

        this.setState({
            ...this.state,
            currentOrder: {
                ...this.state.currentOrder,
                contents: newContents,
                total: this.state.currentOrder.total - price,
            }
        })
    }

    render() {
        if (!this.state.currentOrder.customer) {
            return (
                <div className="container-garzones">
                    <div className="container-opciones-menu">
                        <input id="customer-name" placeholder="Nombre" value={this.state.inputName} onChange={this.handleChange}></input>
                        <button id="add-customer-button" onClick={this.addCustomer}>AGREGAR CLIENTE</button>
                    </div>
                </div>
            )
        }
        return (
            <div className="container-garzones">
                <div className="container-opciones-menu">
                    {this.renderDisplayMenu()}
                    <ReturnButton
                        onClick={this.returnMenu}
                    />
                </div>
                <div className="container-current-order">
                    <CurrentOrder
                    currentOrder={this.state.currentOrder}
                    sendToKitchen={this.sendToKitchen}
                    removeItem={this.removeItem}
                    />
                </div>
            </div>
        )
    }
}

export default Waiters;