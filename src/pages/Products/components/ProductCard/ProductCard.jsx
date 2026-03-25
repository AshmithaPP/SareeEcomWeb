import React from 'react';
import { useNavigate } from 'react-router-dom';
import './productCard.css';
import heartIcon from '../../../../assets/icons/heartIcon.png'; 

const ProductCard = ({ product }) => {
    const { name, price, originalPrice, discount, image, isBestSeller } = product;
    const navigate = useNavigate();

    return (
        <div className="product-card" onClick={() => navigate('/product-details')} style={{ cursor: 'pointer' }}>
            {/* Image Section */}
            <div className="product-image-container">
                <img src={image} alt={name} className="product-image" />

                {/* Best Seller Tag */}
                {isBestSeller && (
                    <div className="best-seller-tag">
                        <span className="best-seller-text">Best Seller</span>
                    </div>
                )}

                {/* Wishlist Button */}
                <button className="wishlist-btn" aria-label="Add to wishlist">
                    <img src={heartIcon} alt="Heart" className="wishlist-icon" />
                </button>
            </div>

            {/* Content Section */}
            <div className="product-info">
                <h3 className="product-name">{name}</h3>

                <div className="price-row">
                    <span className="current-price">₹{price.toLocaleString()}</span>
                    {originalPrice && (
                        <span className="original-price">₹{originalPrice.toLocaleString()}</span>
                    )}
                    {discount && (
                        <span className="discount-tag">{discount}% off</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
