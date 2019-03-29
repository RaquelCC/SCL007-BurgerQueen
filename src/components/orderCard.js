import React, { Component } from 'react';
import countdown from '../countdown/countdown';


class OrderCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            counter: countdown(props.foodItem.sentToKitchen, null, countdown.HOURS|countdown.MINUTES|countdown.SECONDS),
        }
    }

    componentDidMount() {
        countdown(this.props.foodItem.sentToKitchen,(ts)=>{
            this.setState({
                ...this.state,
                counter: ts,
            })
        }, null, countdown.HOURS|countdown.MINUTES|countdown.SECONDS)
    }
    render() {

            // console.log(this.props.foodItem)

            const contents = this.props.foodItem.contents.map(item => {
                
                return (
                    <tr key={item.itemName}>
                        <td className="table-col">{item.quantity}</td>
                        <td className="table-col">{item.itemName}</td>
                    </tr>
                )
            })
            return (
                <table className="table-card" key={this.props.foodItem.sentToKitchen}>
                    <tr key={this.props.foodItem.sentToKitchen}>
                        <td className="table-col index"><div className="order-number">{this.props.i+1}</div></td>
                        <td className="table-col kitchen-customer-name">{this.props.foodItem.customer}</td>
                    </tr>
                    {contents}
                    <tr>
                        <td></td>
                        <td ><span className="countdown">Tiempo: {this.state.counter.hours.toString().padStart(2,'0')}:{this.state.counter.minutes.toString().padStart(2,'0')}:{this.state.counter.seconds.toString().padStart(2,'0')}</span></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><button className="btn-ready" onClick={()=> this.props.kitchenOrderReady(this.props.foodItem)}>¿Pedido Listo?</button></td>
                        <td></td>
                    </tr>
                </table>

            )
        
    }
}

export default OrderCard;