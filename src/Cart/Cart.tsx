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
    return (
        <Wrapper>
            <h2>Your Shopping Cart</h2>
            {cartItems.length === 0 ? <p> No Items in cart.</p> : null}
            {cartItems.map(item => <CartItem key={item.id} item={item} addToCart={addToCart} removeFromCart={removeFromCart} />)}
        </Wrapper>
    )
}

export default Cart
