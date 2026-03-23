import React, { useState } from 'react';
import styles from './ShopByCollections.module.css';

const WishlistButton = () => {
    const [isLiked, setIsLiked] = useState(false);

    const toggleLike = (e) => {
        e.stopPropagation(); // Prevent card clicks if any
        setIsLiked(!isLiked);
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
