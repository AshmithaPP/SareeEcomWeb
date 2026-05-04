import useCartStore from '@/store/useCartStore';
import { toast } from 'react-toastify';
import './cartItem.css';

const CartItem = ({ item }) => {
    const { updateQuantity, removeFromCart, loading } = useCartStore();

    const handleIncrement = async () => {
        const currentQty = Number(item.quantity);
        const result = await updateQuantity(item.cart_item_id, currentQty + 1);
        if (result && !result.success) {
            toast.error(result.message || "Cannot increase quantity");
        }
    };

    const handleDecrement = async () => {
        const currentQty = Number(item.quantity);
        if (currentQty > 1) {
            await updateQuantity(item.cart_item_id, currentQty - 1);
        }
    };

    const attributeText = item.attributes 
        ? Object.entries(item.attributes).map(([key, val]) => `${key}: ${val}`).join(' | ')
        : '';

    return (
        <div className="cart-item-row d-flex align-items-start mb-4">
            <div className="cart-item-image">
                <img src={item.image} alt={item.name} />
            </div>
            <div className="cart-item-details ms-4">
                <h5 className="cart-item-title mb-1">{item.name}</h5>
                {attributeText && <p className="cart-item-size text-muted mb-1">{attributeText}</p>}
                <p className="cart-item-price mb-2">
                    ₹{parseFloat(item.price).toLocaleString('en-IN')}
                </p>
                <div className="quantity-selector-v2 d-flex align-items-center mb-2">
                    <button 
                        className="qty-btn minus" 
                        onClick={handleDecrement}
                        disabled={Number(item.quantity) <= 1}
                    >
                        <i className="bi bi-dash"></i>
                    </button>
                    <span className="qty-value mx-3">{item.quantity}</span>
                    <button 
                        className="qty-btn plus" 
                        onClick={handleIncrement}
                    >
                        <i className="bi bi-plus"></i>
                    </button>
                </div>
                <button 
                    className="remove-item-btn btn btn-link p-0 text-danger" 
                    onClick={() => removeFromCart(item.cart_item_id)}
                >
                    Remove
                </button>
            </div>
        </div>
    );
};

export default CartItem;
