import React from 'react';
import styles from './WishlistButton.module.css';
import { useWishlist } from 'context/WishlistContext';

const WishlistButton = ({ product }) => {
    const { toggleWishlist, isInWishlist } = useWishlist();
    const isLiked = isInWishlist(product?.id);

    const toggleLike = (e) => {
        e.stopPropagation(); // Prevent card clicks if any
        if (product) {
            toggleWishlist(product);
        }
    };

    return (
        <button
            className={`${styles.wishlistBtn} ${isLiked ? styles.liked : ''}`}
            onClick={toggleLike}
            aria-label="Add to wishlist"
        >
            <i className={`bi ${isLiked ? 'bi-heart-fill' : 'bi-heart'}`}></i>
        </button>
    );
};

export default WishlistButton;
