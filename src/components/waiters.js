import React, { Component } from 'react';
import FoodButton from './foodButtons';

class Waiters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: props.menu,
            displayMenu: Object.keys(props.menu),
            previousMenu: props.menu,
            currentOrder: {
                customer: null,
                contents: [],
                sentToKitchen: false,
                ready: false,
            }
        }
    }

    handleClick(item) {
        if (!this.state.previousMenu[item].precio) {
            const previousMenu = this.state.previousMenu;
            this.setState({
                ...this.state,
                previousMenu: previousMenu[item],
                displayMenu: Object.keys(previousMenu[item]),
            })
        } else {
            const newContent = this.state.currentOrder.contents;
            newContent.push({
                itemName : item,
                price: this.state.previousMenu[item].precio,
                quantity: 1
            });
            this.setState({
                ...this.state,
                currentOrder: {
                    ...this.state.currentOrder,
                    contents: newContent,  //falta hacer que esto se muestre en alguna parte
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
                            price={this.state.previousMenu[item].precio ? this.state.previousMenu[item].precio : null}
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
                </div>
                <div className="container-current-order">
                    <div className="current-client-name">
                        <p>Tomando el pedido de: </p>
                        <p>{this.state.currentOrder.customer}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Waiters;