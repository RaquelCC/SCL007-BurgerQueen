import React from 'react';
import './kitchen.css';


function Kitchen(props) {

        if (!props.kitchenOrders.length === 0) {
            return null
        }

        const pendingOrders = props.kitchenOrders.map(foodItem => {
            const contents = foodItem.contents.map(item => {
                return (
                    <tr key={item.itemName}>
                        <td className="table-col">{item.quantity}</td>
                        <td className="table-col">{item.itemName}</td>
                    </tr>
                )
            })
            return (
                <table className="table-card" key={foodItem.sentToKitchen}>
                    <tr key={foodItem.sentToKitchen}>
                        <td className="table-col"></td>
                        <td className="table-col">{foodItem.customer}</td>
                    </tr>
                    {contents}
                </table>

            )
        })
        return pendingOrders
    


    

}

export default Kitchen;