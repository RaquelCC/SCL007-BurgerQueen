import React, { Component } from 'react';
import FoodButton from './foodButtons';
import CurrentOrder from './currentOrder';
import ReturnButton from './returnButton';

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
            }
        }
        this.returnMenu = this.returnMenu.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.renderDisplayMenu = this.renderDisplayMenu.bind(this);
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

    addCustomer(name) {
        this.setState({
            ...this.state,
            currentOrder: {
                ...this.state.currentOrder,
                customer: name,
            }
        })
    }

    render() {
        if (!this.state.currentOrder.customer) {
            return (
                <div className="container-garzones">
                    <div className="container-opciones-menu">
                        <input id="customer-name" placeholder="Nombre"></input>
                        <button id="add-customer-button" onClick={() => this.addCustomer(document.getElementById('customer-name').value)}>AGREGAR CLIENTE</button>
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
                    />
                </div>
            </div>
        )
    }
}

export default Waiters;