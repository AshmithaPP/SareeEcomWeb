import React from 'react';
import styles from './WishlistButton.module.css';
import { useWishlist } from 'context/WishlistContext';
import useAuthStore from '@/store/useAuthStore';
import { useNavigate } from 'react-router-dom';

const WishlistButton = ({ product }) => {
    const { toggleWishlist, isInWishlist } = useWishlist();
    const { isAuthenticated } = useAuthStore();
    const navigate = useNavigate();
    const isLiked = isInWishlist(product?.id || product?.product_id);

    const toggleLike = (e) => {
        e.stopPropagation(); // Prevent card clicks if any
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
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
