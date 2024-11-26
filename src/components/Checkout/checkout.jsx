import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../../store/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import './checkout.css';

const Checkout = () => {
    const cartItems = useSelector(state => state.cart.products);
    const totalPrice = useSelector(state => state.cart.totalPrice);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("credit-card");

    const handlePayment = () => {

        if (!name || /\d/.test(name)) {
            if (!name) {
                alert("Fill name!");
                return;
            }
            alert("No number in name!");
            return;
        }


        if (!address) {
            alert("Fill address!");
            return;
        }


        if (!paymentMethod) {
            alert("Choose payment method!");
            return;
        }


        alert("Checkout success");


        dispatch(clearCart());


        navigate('/');
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className='checkout'>
            <div className="checkout-container">
                <h2>Checkout</h2>

                <button className="back-button" onClick={handleBack}>Back</button>

                <div className="cart-items">
                    <h3>Your cart:</h3>
                    {cartItems.length > 0 ? (
                        <ul>
                            {cartItems.map(item => (
                                <li key={item.id} className="cart-item">
                                    <div>
                                        <h4>{item.name}</h4>
                                        <p>Price: ${item.price}</p>
                                        <p>Quantity: {item.quantity}</p>
                                        <p>Total: ${item.totalPrice}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                </div>

                <div className="total-price">
                    <h3>Total Price: ${totalPrice}</h3>
                </div>

                <div className="payment-form">
                    <label htmlFor="name">Full Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                        required
                    />

                    <label htmlFor="address">Shipping Address:</label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter your address"
                        required
                    />

                    <label htmlFor="payment-method">Payment Method:</label>
                    <select
                        id="payment-method"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        required
                    >
                        <option value="credit-card">Credit Card</option>
                        <option value="paypal">PayPal</option>
                        <option value="cash">Cash on Delivery</option>
                    </select>

                    <button onClick={handlePayment}>Confirm Payment</button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
