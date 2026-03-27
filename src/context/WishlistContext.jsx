import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState(() => {
        const savedWishlist = localStorage.getItem('wishlistItems');
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });

    const countRef = React.useRef(0);
    const toastId = React.useRef(null);

    useEffect(() => {
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    // Helper for dynamic toasts
    const showDynamicToast = (message, countValue, type = 'success') => {
        const toastMsg = (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontWeight: 600 }}>
                    {countValue > 1 ? `(${countValue}) ${message}s` : message}
                </span>
                <a
                    href="/wishlist"
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
                    View Wishlist →
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

    const addToWishlist = (product) => {
        if (wishlistItems.find((item) => item.id === product.id)) return;
        setWishlistItems((prev) => [...prev, product]);

        countRef.current += 1;
        showDynamicToast("item added to wishlist", countRef.current, 'success');
    };

    const removeFromWishlist = (productId) => {
        setWishlistItems((prev) => prev.filter((item) => item.id !== productId));

        countRef.current += 1;
        showDynamicToast("item removed from wishlist", countRef.current, 'info');
    };

    const toggleWishlist = (product) => {
        const isCurrentlyInWishlist = wishlistItems.some((item) => item.id === product.id);
        if (isCurrentlyInWishlist) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    const isInWishlist = (productId) => {
        return wishlistItems.some((item) => item.id === productId);
    };

    const clearWishlist = () => {
        setWishlistItems([]);
    };

    const value = {
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist
    };

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
};
