import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, clearCart, incrementQuantity, decrementQuantity } from '../../store/slices/cartSlice';
import './cart.css';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const cartItems = useSelector(state => state.cart.products);
    const totalPrice = useSelector(state => state.cart.totalPrice);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const incrementHandler = (id) => {
        dispatch(incrementQuantity(id));
    };

    const decrementHandler = (id) => {
        dispatch(decrementQuantity(id));
    };

    const removeHandler = (id) => {
        dispatch(removeItem(id));
    };

    const clearCartHandler = () => {
        dispatch(clearCart());
    };

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            alert("Empty cart can't checkout!");
        } else {
            navigate('/checkout');
        }

    };

    return (
        <div className="cart-container">
            <h2>Shopping Cart</h2>
            <ul className="cart-list">
                {cartItems.map(item => (
                    <li className="cart-item" key={item.id}>
                        <div>
                            <h4>{item.name}</h4>
                            <p>Price: ${item.price}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>Total: ${item.totalPrice}</p>
                        </div>
                        <div>
                            <button onClick={() => decrementHandler(item.id)}>-</button>
                            <button onClick={() => incrementHandler(item.id)}>+</button>
                            <button onClick={() => removeHandler(item.id)}>Clear</button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="cart-total">Total Price: ${totalPrice}</div>
            <div style={{ display: 'flex' }}>
                <button className="clear-cart-button" onClick={clearCartHandler}>
                    Clear Cart
                </button>
                <button style={{ backgroundColor: 'green' }} className="clear-cart-button" onClick={handleCheckout}>
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
};

export default Cart;
