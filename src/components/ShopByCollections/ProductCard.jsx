import React from 'react';
import styles from './ShopByCollections.module.css';
import WishlistButton from './WishlistButton';
import cartIcon from '../../assets/icons/cartIcon.png';


const ProductCard = ({ product }) => {
    const { title, image, discount, discountedPrice, originalPrice } = product;

    return (
        <div className={styles.cardItem}>
            {/* ── CARD (image + overlays only) ── */}
            <div className={styles.productCard}>
                <div className={styles.imageWrapper}>
                    <img src={image} alt={title} className={styles.productImage} />

                    {discount && (
                        <div
                            className={styles.discountBadge}
                            style={{ backgroundColor: product.discountBg }}
                        >
                            {discount}
                        </div>
                    )}

                    <div className={styles.wishlistContainer}>
                        <WishlistButton />
                    </div>

                    <div className={styles.addToCartOverlay}>
                        <img src={cartIcon} alt="Cart" className={styles.cartIconImage} />
                        <span className={styles.addToCartText}>Add to Cart</span>
                    </div>
                </div>
            </div>

            {/* ── TEXT & PRICE — separately below the card ── */}
            <div className={styles.productInfo}>
                <h4 className={styles.productTitle}>{title}</h4>
                <div className={styles.priceContainer}>
                    <span className={styles.discountedPrice}>{discountedPrice}</span>
                    {originalPrice && (
                        <span className={styles.originalPrice}>{originalPrice}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;