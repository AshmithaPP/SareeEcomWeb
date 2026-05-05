import useCartStore from '@/store/useCartStore';
import { useNavigate } from 'react-router-dom';
import './cartSummary.css';

const CartSummary = () => {
    const { cart } = useCartStore();
    const navigate = useNavigate();

    const items = cart.items || [];
    const summary = cart.summary || { total: 0 };

    return (
        <div className="cart-summary-card p-4">
            <div className="summary-items mb-4">
                {items.map((item, index) => (
                    <div className="summary-item d-flex justify-content-between mb-2" key={item.cart_item_id || index}>
                        <span className="summary-item-name">{item.name} (x{item.quantity})</span>
                        <span className="summary-item-price">₹{parseFloat(item.total).toLocaleString('en-IN')}</span>
                    </div>
                ))}
            </div>

            <div className="summary-total d-flex justify-content-between align-items-center pt-3 mb-4">
                <span className="total-label">Total Amount</span>
                <span className="total-price">₹{parseFloat(summary.total).toLocaleString('en-IN')}</span>
            </div>

            <button 
                className={`proceed-btn btn ${items.length === 0 ? 'btn-secondary' : 'btn-dark'} w-100 py-3 mb-3`} 
                onClick={() => items.length > 0 && navigate('/checkout')}
                disabled={items.length === 0}
                title={items.length === 0 ? "Add items to cart to proceed" : ""}
            >
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
