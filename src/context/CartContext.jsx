import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const countRef = React.useRef(0);
    const toastId = React.useRef(null);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    // Helper for dynamic toasts
    const showDynamicToast = (message, countValue, type = 'success') => {
        const toastMsg = (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontWeight: 600 }}>
                    {countValue > 1 ? `(${countValue}) ${message}s` : message}
                </span>
                <a
                    href="/cart"
                    style={{
                        fontSize: '12px',
                        color: '#D4AF37',
                        textDecoration: 'none',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.8px',
                        display: 'inline-block'
                    }}
                >
                    View Cart →
                </a>
            </div>
        );

        if (toastId.current && toast.isActive(toastId.current)) {
            toast.update(toastId.current, {
                render: toastMsg,
                type: type === 'success' ? toast.TYPE.SUCCESS : toast.TYPE.INFO,
                autoClose: 3000
            });
        } else {
            countRef.current = 1;
            toastId.current = toast[type](toastMsg, {
                onClose: () => { countRef.current = 0; toastId.current = null; },
                icon: true
            });
        }
    };

    const addToCart = (product) => {
        setCartItems((prev) => {
            const existingItem = prev.find((item) => item.id === product.id);
            if (existingItem) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });

        countRef.current += 1;
        showDynamicToast("item added to cart", countRef.current, 'success');
    };

    const removeFromCart = (productId) => {
        setCartItems((prev) => prev.filter((item) => item.id !== productId));
        countRef.current += 1;
        showDynamicToast("item removed from cart", countRef.current, 'info');
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) return;
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartTotal = cartItems.reduce((total, item) => {
        const price = parseFloat(item.price?.toString().replace(/[^0-9.]/g, '') || item.discountedPrice?.toString().replace(/[^0-9.]/g, '') || 0);
        return total + price * item.quantity;
    }, 0);

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
