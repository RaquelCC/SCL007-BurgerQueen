import * as actions from './actionTypes';

export const agregarItemMenu = dispatch => (item, price, currentContents) => { // esto significa que recibe "dispatch" primero
    const newContent = currentContents;
    for (let i = 0; i < newContent.length; i += 1) {
        if (newContent[i].itemName === item) {
            newContent[i].quantity += 1;
            dispatch({
                type: actions.AGREGAR_ITEM_MENU,
                payload: {
                    contents: newContent,
                    price: price,
                }
            })
            // this.setState({
            //     ...this.state,
            //     currentOrder: {
            //         ...this.state.currentOrder,
            //         contents: newContent,
            //         total: this.state.currentOrder.total + this.state.currentMenu[item].precio,
            //     }
            // })
            return;
        }
    }
    newContent.push({
        itemName: item,
        price: price,
        quantity: 1
    });
    // this.setState({
    //     ...this.state,
    //     currentOrder: {
    //         ...this.state.currentOrder,
    //         contents: newContent,
    //         total: this.state.currentOrder.total + this.state.currentMenu[item].precio,
    //     }
    // })
    dispatch({
        type: actions.AGREGAR_ITEM_MENU,
        payload: {
            contents: newContent,
            price: price,
        }
    });
};


// {
//     type: "AGREGAR ITEM MENU",
//     payload: {
//     contents: [{
//     itemName: "cafe americano",
//     price: 500,
//     quantity: 1,
//     }],
//     price: 500
//     }
//     }