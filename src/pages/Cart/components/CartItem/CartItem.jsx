import React from 'react';
import './cartItem.css';
import { useCart } from '../../../../context/CartContext';

const CartItem = ({ item }) => {
    const { updateQuantity, removeFromCart } = useCart();

    const handleQuantityChange = (e) => {
        const val = parseInt(e.target.value);
        if (val >= 1) {
            updateQuantity(item.id, val);
        }
    };

    return (
        <div className="cart-item-row d-flex align-items-start mb-4">
            <div className="cart-item-image">
                <img src={item.image} alt={item.name || item.title} />
            </div>
            <div className="cart-item-details ms-4">
                <h5 className="cart-item-title mb-1">{item.name || item.title}</h5>
                <p className="cart-item-size text-muted mb-1">size:{item.size || 'XXL'}</p>
                <p className="cart-item-price mb-2">
                    Rs {parseFloat(item.price?.toString().replace(/[^0-9.]/g, '') || item.discountedPrice?.toString().replace(/[^0-9.]/g, '') || 0).toFixed(2)}
                </p>
                <div className="quantity-selector">
                    <input 
                        type="number" 
                        value={item.quantity} 
                        onChange={handleQuantityChange}
                        min="1"
                        className="quantity-input"
                    />
                </div>
                <button className="remove-item-btn btn btn-link p-0 mt-2 text-danger" onClick={() => removeFromCart(item.id)}>
                    Remove
                </button>
            </div>
        </div>
    );
};

export default CartItem;
