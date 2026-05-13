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

    // Ensure ID is a valid number or string from multiple possible sources
    const rawId = product.product_id || product.id || (product.product && (product.product.product_id || product.product.id));
    const id = (typeof rawId === 'object' && rawId !== null) ? (rawId.id || rawId.product_id) : rawId;
    
    const slug = product.slug || (product.product && product.product.slug) || id;
    const title = product.title || product.name || product.product_name || (product.product && (product.product.title || product.product.name));
    const image = product.image || product.thumbnail || product.image_url || (product.product && product.product.image_url);
    const stockStatus = product.stockStatus || (product.stock_status || 'in_stock');
    const discountedPrice = product.discountedPrice || (product.price?.selling_price ? `₹${parseFloat(product.price.selling_price).toLocaleString('en-IN')}` : `₹${product.price}`);
    const originalPrice = product.originalPrice || (product.price?.mrp ? `₹${parseFloat(product.price.mrp).toLocaleString('en-IN')}` : null);
    const discount = product.discount || (product.price?.discountPercentage ? `${product.price.discountPercentage}% off` : null);
    const discountBg = product.discountBg;
    const rating = product.rating;

    const handleAddToCart = async (e) => {
        e.stopPropagation();
        if (stockStatus === 'out_of_stock' || isOutOfStock) return;
        
        // Try to find any variant ID if available
        const variantId = product.variant_id || product.default_variant_id || (product.variants && product.variants[0]?.variant_id) || null;
        
        // Ensure ID is sent as a clean value
        const productIdToSend = (typeof id === 'string' && !isNaN(id)) ? Number(id) : id;

        const result = await addToCart(productIdToSend, variantId, 1);
        if (result?.success) {
            toast.success('Added to cart!');
        } else {
            toast.error(result?.message || 'Failed to add to cart');
        }
    };

    const isOutOfStock = stockStatus === 'out_of_stock' || stockStatus === 'sold_out';

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
