import React from 'react';

function CurrentOrder(props) {
    let orderList;
    if (props.currentOrder.contents) {
        orderList = props.currentOrder.contents.map(foodItem => {
            return (
                <tr key={foodItem.itemName}>
                    <td>{foodItem.quantity}</td>
                    <td>{foodItem.itemName}</td>
                    <td>{foodItem.quantity * foodItem.price}</td>
                </tr>
            )
        })

    }
    

    return (
        <div className="current-client-name">
            <table>
                <tr>
                    <th></th>
                    <th>{`Tomando el pedido de: ${props.currentOrder.customer}`}</th>
                    <th></th>
                </tr>
                {orderList ? orderList : null}
                <tr>
                    <td></td>
                    <td>Total:</td>
                    <td>{props.currentOrder.total}</td>
                </tr>
            </table>
        </div>
    )

}

export default CurrentOrder;