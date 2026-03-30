import React from 'react';
import './cartSummary.css';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../../context/CartContext';

const CartSummary = () => {
    const { cartItems, cartTotal } = useCart();
    const navigate = useNavigate();

    return (
        <div className="cart-summary-card p-4">
            <div className="summary-items mb-4">
                {cartItems.map((item) => (
                    <div className="summary-item d-flex justify-content-between mb-2" key={item.id}>
                        <span className="summary-item-name">{item.name || item.title}</span>
                        <span className="summary-item-price">Rs {parseFloat(item.price?.toString().replace(/[^0-9.]/g, '') || item.discountedPrice?.toString().replace(/[^0-9.]/g, '') || 0).toFixed(2)}</span>
                    </div>
                ))}
            </div>

            <div className="summary-total d-flex justify-content-between align-items-center pt-3 mb-4">
                <span className="total-label">Total</span>
                <span className="total-price">Rs {cartTotal.toFixed(2)}</span>
            </div>

            <button className="proceed-btn btn btn-dark w-100 py-3 mb-3" onClick={() => navigate('/checkout')}>
                Proceed to Checkout
            </button>

            <div className="continue-shopping text-center">
                <button className="btn btn-link text-dark text-decoration-none d-inline-flex align-items-center" onClick={() => navigate('/products')}>
                    <i className="bi bi-arrow-left-square me-2"></i> Continue Shopping
                </button>
            </div>
        </div>
    );
};

export default CartSummary;
