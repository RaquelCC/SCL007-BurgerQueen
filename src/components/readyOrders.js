import React from 'react';
import './readyOrders.css';

function ReadyOrders(props) {
    return (
        <div className="container-pedidos-listos">
        <p>Pedidos Listos: {props.ordersReady.length}</p>
          
        </div>
    )
}

export default ReadyOrders;