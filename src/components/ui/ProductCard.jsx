import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from 'context/CartContext';
import useAuthStore from '@/store/useAuthStore';
import WishlistButton from 'components/common/WishlistButton';
import styles from './ProductCard.module.css';
import cartIcon from 'assets/icons/ui/cartIcon.png';
import starIcon from 'assets/icons/ui/stars.png';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuthStore();
    const {
        title,
        image,
        discount,
        discountedPrice,
        originalPrice,
        discountBg,
        rating,
        stockStatus
    } = product;
    const { addToCart } = useCart();

    const handleAddToCart = (e) => {
        e.stopPropagation();
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        if (stockStatus === 'out_of_stock') return;
        addToCart(product);
    };

    const isOutOfStock = stockStatus === 'out_of_stock';
    const id = product.product_id || product.id;
    const slug = product.slug || id;

    return (
        <div className={`${styles.cardItem} ${isOutOfStock ? styles.outOfStock : ''}`} onClick={() => navigate(`/product-details/${slug}`)} style={{ cursor: 'pointer' }}>
            {/* ── CARD (image + overlays only) ── */}
            <div className={styles.productCard}>
                <div className={styles.imageWrapper}>
                    <img src={image} alt={title} className={styles.productImage} />

                    {discount && !isOutOfStock && (
                        <div
                            className={styles.discountBadge}
                            style={{ backgroundColor: discountBg || '#10B981' }}
                        >
                            {discount}
                        </div>
                    )}

                    {isOutOfStock && (
                        <div className={styles.outOfStockBadge}>
                            OUT OF STOCK
                        </div>
                    )}

                    <div className={styles.wishlistContainer}>
                        <WishlistButton product={product} />
                    </div>

                    {!isOutOfStock && (
                        <div className={styles.addToCartOverlay} onClick={handleAddToCart}>
                            <img src={cartIcon} alt="Cart" className={styles.cartIconImage} />
                            <span className={styles.addToCartText}>Add to Cart</span>
                        </div>
                    )}
                </div>
            </div>

            {/* ── TEXT & PRICE — separately below the card ── */}
            <div className={styles.productInfo}>
                <h4 className={styles.productTitle}>{title}</h4>

                {rating && (
                    <div className={styles.ratingContainer}>
                        <div className={styles.stars}>
                            {[...Array(5)].map((_, i) => (
                                <img
                                    key={i}
                                    src={starIcon}
                                    alt="star"
                                    className={i < Math.round(parseFloat(rating.average)) ? styles.starFilled : styles.starEmpty}
                                />
                            ))}
                        </div>
                        <span className={styles.ratingCount}>({rating.count || 0})</span>
                    </div>
                )}

                <div className={styles.priceContainer}>
                    <span className={styles.discountedPrice}>{discountedPrice}</span>
                    {originalPrice && (
                        <span className={styles.originalPrice}>{originalPrice}</span>
                    )}
                </div>

                {stockStatus && (
                    <div className={`${styles.stockStatus} ${isOutOfStock ? styles.outOfStockText : styles.inStockText}`}>
                        {isOutOfStock ? 'Out of Stock' : 'In Stock'}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
