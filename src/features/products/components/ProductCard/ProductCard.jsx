import React from 'react';
import { useNavigate } from 'react-router-dom';
import './productCard.css';
import heartIcon from 'assets/icons/ui/heartIcon.png'; 
import CartIcon from 'assets/icons/ui/shopping-cart.png';
import useAuthStore from '@/store/useAuthStore';
import useCartStore from '@/store/useCartStore';
import useWishlistStore from '@/store/useWishlistStore';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
    // Handle both Frontend mock data and Backend raw API data (Product, Home, etc.)
    const name = product.name || product.title || product.product_name;
    const id = product.product_id || product.id;
    const isBestSeller = product.isBestSeller || product.is_best_seller;
    
    // Image fallback
    const image = product.thumbnail || product.image || product.image_url;

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
    const { items: wishlistItems, toggleWishlist } = useWishlistStore();
    const { addToCart } = useCartStore();
    const { isAuthenticated } = useAuthStore();

    const isLiked = wishlistItems.some(item => item.product_id === id);

    const handleWishlistToggle = async (e) => {
        e.stopPropagation();
        const result = await toggleWishlist(id);
        if (result.success) {
            if (result.action === 'added') {
                toast.success('Added to wishlist!');
            } else {
                toast.info('Removed from wishlist');
            }
        } else {
            toast.error(result.message || 'Failed to update wishlist');
        }
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();
        const searchParams = new URLSearchParams(window.location.search);
        const color = searchParams.get('color');
        const detailUrl = `/product-details/${slug}${color ? `?color=${color}` : ''}`;
        navigate(detailUrl);
    };

    const slug = product.slug || id;

    const handleCardClick = () => {
        const searchParams = new URLSearchParams(window.location.search);
        const color = searchParams.get('color');
        const detailUrl = `/product-details/${slug}${color ? `?color=${color}` : ''}`;
        navigate(detailUrl);
    };

    return (
        <div className="product-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
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
