import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState(() => {
        // Initialize from localStorage if available
        const savedWishlist = localStorage.getItem('wishlistItems');
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });

    useEffect(() => {
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    const addToWishlist = (product) => {
        if (wishlistItems.find((item) => item.id === product.id)) return;
        
        setWishlistItems((prev) => [...prev, product]);
        toast.success(`${product.name || product.title} added to wishlist!`);
    };

    const removeFromWishlist = (productId) => {
        setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
        toast.info("Item removed from wishlist");
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
