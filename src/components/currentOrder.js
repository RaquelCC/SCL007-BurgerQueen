import React from 'react';
import FoodButton from './foodButtons';




function CurrentOrder(props) {
    let orderList;
    if (props.currentOrder.contents) {
        orderList = props.currentOrder.contents.map(foodItem => {
            return (
                <tr key={foodItem.itemName}>
                    <td>{foodItem.quantity}</td>
                    <td>{foodItem.itemName}</td>
                    <td>{foodItem.quantity * foodItem.price}</td>
                    <td><button onClick={() => props.removeItem(foodItem.itemName)}>Eliminar</button></td>
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
            <FoodButton
                value="ENVIAR A COCINA"
                onClick={()=> props.sendToKitchen(props.currentOrder)}
                order={props.currentOrder}
            />
        </div>
    )

}

export default CurrentOrder;