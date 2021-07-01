import React from 'react'
import CartItem from "../CartItem/CartItem";
import { Wrapper } from "./Cart.styles";
import { ICartItemType } from "../App";

type IProps = {
    cartItems: ICartItemType[];
    addToCart: (clickedItem: ICartItemType) => void;
    removeFromCart: (id: number) => void;
}

const Cart: React.FC<IProps> = ({ cartItems, addToCart, removeFromCart }) => {

    const calculateTotal = (items: ICartItemType[]) =>
        items.reduce((ack: number, item) => ack + item.amount * item.price, 0);


    return (
        <Wrapper>
            <h2>Your Shopping Cart</h2>
            {cartItems.length === 0 ? <p> No Items in cart.</p> : null}
            {cartItems.map(item => <CartItem key={item.id} item={item} addToCart={addToCart} removeFromCart={removeFromCart} />)}
            <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
        </Wrapper>
    )
}

export default Cart
