import React from 'react';
import './wishlistCard.css';
import { useWishlist } from '../../../../context/WishlistContext';

const WishlistCard = ({ product }) => {
    const { removeFromWishlist } = useWishlist();

    const handleRemove = () => {
        removeFromWishlist(product.id);
    };

    return (
        <div className="wishlist-item-card text-center">
            <div className="wishlist-img-wrapper">
                <img src={product.image} alt={product.name || product.title} className="wishlist-product-img" />
                <button 
                    className="wishlist-remove-btn" 
                    onClick={handleRemove}
                    aria-label="Remove item"
                >
                    <i className="bi bi-x"></i>
                </button>
            </div>
            <div className="wishlist-product-details mt-2">
                <h5 className="wishlist-product-title mb-1">{product.name || product.title}</h5>
                <p className="wishlist-product-price font-weight-bold mb-0">Rs {product.price || product.discountedPrice?.replace('₹', '') || product.originalPrice?.replace('₹', '')}</p>
            </div>
        </div>
    );
};

export default WishlistCard;
