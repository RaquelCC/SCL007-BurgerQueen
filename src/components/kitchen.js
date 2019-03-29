import React from 'react';
import './kitchen.css';
import OrderCard from './orderCard';


function Kitchen(props) {

        if (!props.kitchenOrders.length === 0) {
            return null
        }

        // const pendingOrders = props.kitchenOrders.map((foodItem, i) => {
        //     const contents = foodItem.contents.map(item => {
        //         return (
        //             <tr key={item.itemName}>
        //                 <td className="table-col">{item.quantity}</td>
        //                 <td className="table-col">{item.itemName}</td>
        //             </tr>
        //         )
        //     })
        //     return (
        //         <table className="table-card" key={foodItem.sentToKitchen}>
        //             <tr key={foodItem.sentToKitchen}>
        //                 <td className="table-col index"><div className="order-number">{i+1}</div></td>
        //                 <td className="table-col kitchen-customer-name">{foodItem.customer}</td>
        //             </tr>
        //             {contents}
        //             <tr>
        //                 <td></td>
        //                 <td></td>
        //                 <td></td>
        //             </tr>
        //             <tr>
        //                 <td></td>
        //                 <td><button className="btn-ready" onClick={()=> props.kitchenOrderReady(foodItem)}>¿Pedido Listo?</button></td>
        //                 <td></td>
        //             </tr>
        //         </table>

        //     )
        // })

        const pendingOrders = props.kitchenOrders.map((foodItem2, e) => {
            return (<OrderCard
            foodItem={foodItem2}
            i={e}
            kitchenOrderReady={props.kitchenOrderReady}
            />)
        })
        return pendingOrders
    


    

}

export default Kitchen;