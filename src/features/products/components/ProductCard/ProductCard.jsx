import React from 'react';
import { useNavigate } from 'react-router-dom';
import './productCard.css';
import heartIcon from 'assets/icons/ui/heartIcon.png'; 
import CartIcon from 'assets/icons/ui/shopping-cart.png';
import { useWishlist } from 'context/WishlistContext';
import { useCart } from 'context/CartContext';
import useAuthStore from '@/store/useAuthStore';

const ProductCard = ({ product }) => {
    // Handle both Frontend mock data and Backend raw API data
    const name = product.name || product.title;
    const id = product.product_id || product.id;
    const isBestSeller = product.isBestSeller || product.is_best_seller;
    
    // Image fallback
    const image = product.thumbnail || product.image;

    // Price and Discount Logic
    let price = product.price || product.discountedPrice;
    let originalPrice = product.originalPrice;
    let discount = product.discount;

    if (typeof product.price === 'object') {
        // If it's raw API data
        price = parseFloat(product.price.sellingPrice);
        originalPrice = product.price.mrp ? parseFloat(product.price.mrp) : null;
        discount = product.price.discountPercentage > 0 ? product.price.discountPercentage : null;
    }
    const navigate = useNavigate();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const { addToCart } = useCart();
    const { isAuthenticated } = useAuthStore();

    const isLiked = isInWishlist(id);

    const handleWishlistToggle = (e) => {
        e.stopPropagation();
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        toggleWishlist(product);
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        addToCart(product);
    };

    const slug = product.slug || id;

    return (
        <div className="product-card" onClick={() => navigate(`/product-details/${slug}`)} style={{ cursor: 'pointer' }}>
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
                <button 
                    className={`wishlist-btn ${isLiked ? 'liked' : ''}`} 
                    aria-label="Add to wishlist"
                    onClick={handleWishlistToggle}
                >
                    <i className={`bi ${isLiked ? 'bi-heart-fill text-danger' : 'bi-heart'} wishlist-icon`}></i>
                </button>

                {/* Cart Button */}
                <button 
                    className="cart-btn" 
                    aria-label="Add to cart"
                    onClick={handleAddToCart}
                >
                    <img src={CartIcon} alt="Add to cart" className="cart-icon" />
                </button>
            </div>

            {/* Content Section */}
            <div className="product-info">
                <h3 className="product-name">{name}</h3>

                <div className="price-row">
                    <span className="current-price">
                        {typeof price === 'number' ? `₹${price.toLocaleString('en-IN')}` : (price || '')}
                    </span>
                    {originalPrice && (
                        <span className="original-price">
                            {typeof originalPrice === 'number' ? `₹${originalPrice.toLocaleString('en-IN')}` : originalPrice}
                        </span>
                    )}
                    {discount && (
                        <span className="discount-tag">
                            {typeof discount === 'number' ? `${discount}% off` : discount}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
