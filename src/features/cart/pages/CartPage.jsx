import { useEffect } from 'react';
import Breadcrumbs from 'components/ui/Breadcrumbs/Breadcrumbs';
import CartItem from 'features/cart/components/CartItem/CartItem';
import CartSummary from 'features/cart/components/CartSummary/CartSummary';
import useCartStore from '@/store/useCartStore';
import './cartPage.css';

const CartPage = () => {
    const { cart, fetchCart, loading } = useCartStore();
    const cartItems = cart.items || [];

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const breadcrumbItems = [
        { label: 'Home', path: '/' },
        { label: 'Shop', path: '/products' },
        { label: 'ShoppingCart', path: '/cart' }
    ];

    return (
        <div className="cart-page-wrapper py-5">
            <div className="cart-page-inner">
      {/* Breadcrumbs Row */}
            <div className="row mb-3">
                <div className="col-12 d-flex justify-content-start">
                    <Breadcrumbs items={breadcrumbItems} />
                </div>
            </div>
                {/* Title */}
                <h2 className="cart-page-title text-center mb-5">Your Cart Items</h2>

                {cartItems.length > 0 ? (
                    <div className="row g-3 g-md-4 g-lg-5">
                        {/* Left: Cart Items */}
                        <div className="col-lg-7">
                            <div className="cart-items-list">
                                {cartItems.map((item, index) => (
                                    <CartItem key={item.cart_item_id || index} item={item} />
                                ))}
                            </div>
                        </div>

                        {/* Right: Cart Summary */}
                        <div className="col-lg-5">
                            <CartSummary />
                        </div>
                    </div>
                ) : (
                    <div className="empty-cart-message text-center py-5">
                        <i className="bi bi-cart-x pulse-cart" style={{ fontSize: '3rem', color: '#ccc' }}></i>
                        <h4 className="mt-3">Your cart is empty</h4>
                        <p className="text-muted">Looks like you haven't added anything to your cart yet.</p>
                        <a href="/products" className="btn btn-dark mt-3 px-4 py-2">Start Shopping</a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;
