import React, { Component } from 'react';
import './readyOrders.css';

class ReadyOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showReadyOrders: false,
        }

        this.showOrders = this.showOrders.bind(this);
        this.orders = this.orders.bind(this);
    }

    showOrders() {
        this.setState({
            ...this.state,
            showReadyOrders: !this.state.showReadyOrders,
        })
    }

    orders() {
        const pedidos = this.props.ordersReady.map((foodItem, i) => {
            const contents = foodItem.contents.map(item => {
                return (
                    <tr key={item.itemName}>
                        <td className="table-col2">{item.quantity}</td>
                        <td className="table-col2">{item.itemName}</td>
                    </tr>
                )
            })
            return (
                <table className="table-card2" key={foodItem.sentToKitchen}>
                    <tr key={foodItem.sentToKitchen}>
                        <td className="table-col2 index2"></td>
                        <td className="table-col2 customer-name2">{foodItem.customer}</td>
                    </tr>
                    {contents}
                    <tr>
                        <td></td>
                        <td><button className="btn-ready" onClick={()=> this.props.onClick(foodItem)}>¿Pedido Entregado?</button></td>
                        <td></td>
                    </tr>
                </table>

            )
        })

        return pedidos
        
    }

    render() {
        return (
            <div className="container-pedidos-listos">
                <div className="circulo-pedidos-listos" onClick={this.showOrders}>
                    <p>Pedidos Listos: {this.props.ordersReady.length}</p>
                </div>
                {this.state.showReadyOrders && 
                <div className="container-pedidos">
                    {this.orders()}
                </div>}
            </div>
        )
    }
}

export default ReadyOrders;