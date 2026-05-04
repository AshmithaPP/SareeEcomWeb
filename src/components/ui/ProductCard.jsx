import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/store/useAuthStore';
import WishlistButton from 'components/common/WishlistButton';
import useCartStore from '@/store/useCartStore';
import { toast } from 'react-toastify';
import styles from './ProductCard.module.css';
import cartIcon from 'assets/icons/ui/cartIcon.png';
import starIcon from 'assets/icons/ui/stars.png';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuthStore();
    const { addToCart } = useCartStore();

    const id = product.product_id || product.id;
    const slug = product.slug || id;
    const title = product.title || product.name || product.product_name;
    const image = product.image || product.thumbnail || product.image_url;
    const stockStatus = product.stockStatus || (product.stock_status || 'in_stock');
    const discountedPrice = product.discountedPrice || (product.price?.selling_price ? `₹${parseFloat(product.price.selling_price).toLocaleString('en-IN')}` : `₹${product.price}`);
    const originalPrice = product.originalPrice || (product.price?.mrp ? `₹${parseFloat(product.price.mrp).toLocaleString('en-IN')}` : null);
    const discount = product.discount || (product.price?.discountPercentage ? `${product.price.discountPercentage}% off` : null);
    const discountBg = product.discountBg;
    const rating = product.rating;

    const handleAddToCart = async (e) => {
        e.stopPropagation();
        if (stockStatus === 'out_of_stock') return;
        
        const result = await addToCart(id, null, 1);
        if (result?.success) {
            toast.success('Added to cart!');
        } else {
            toast.error(result?.message || 'Failed to add to cart');
        }
    };

    const isOutOfStock = stockStatus === 'out_of_stock';

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
