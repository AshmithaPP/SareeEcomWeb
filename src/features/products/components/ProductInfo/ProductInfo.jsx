import React from 'react';
import { useNavigate } from 'react-router-dom';
import './productInfo.css';
import checklistIcon from 'assets/icons/ui/checklisticon.png';
import timerIcon from 'assets/icons/ui/timer.png';
import buyNowIcon from 'assets/icons/ui/buynow.png';
import addToCartIcon from 'assets/icons/ui/addtocart.png';
import whatsappIcon from 'assets/icons/social/whatsapp.png';

import useProductStore from '@/store/useProductStore';
import useAuthStore from '@/store/useAuthStore';
import useCartStore from '@/store/useCartStore';
import useWishlistStore from '@/store/useWishlistStore';
import { toast } from 'react-toastify';

const ProductInfo = ({ product }) => {
    const navigate = useNavigate();
    const { setSelectedVariant } = useProductStore();
    const { isAuthenticated } = useAuthStore();
    const { addToCart, loading: cartLoading } = useCartStore();
    const { items: wishlistItems, toggleWishlist } = useWishlistStore();

    const isLiked = wishlistItems.some(item => item.product_id === product?.product_id);

    const handleWishlistToggle = (e) => {
        e.stopPropagation();
        toggleWishlist(product.product_id);
    };

    const handleBuyNow = async () => {
        const variantId = product.selected_variant?.variant_id || product.default_variant_id;

        const result = await addToCart(product.product_id, variantId, 1);
        if (result.success) {
            navigate('/checkout');
        } else {
            toast.error(result.message || "Failed to add to cart");
        }
    };

    const handleAddToCart = async () => {
        const variantId = product.selected_variant?.variant_id || product.default_variant_id;

        const result = await addToCart(product.product_id, variantId, 1);
        if (result.success) {
            toast.success("Added to cart successfully!");
        } else {
            toast.error(result.message || "Failed to add to cart");
        }
    };

    if (!product) return null;

    const { name, brand, rating, selected_variant, variants } = product;

    // Use variant price if available, otherwise fallback to base price
    const currentPrice = selected_variant?.price || product.price;
    const isOutOfStock = selected_variant?.stock?.status === 'out_of_stock';

    // Extract unique attributes for selection (e.g., Color, Size)
    const colors = product.variant_options?.color || [];
    const sizes = product.variant_options?.size || [];

    const activeColor = selected_variant?.attributes?.color?.name;
    const activeSize = typeof selected_variant?.attributes?.size === 'object' ? selected_variant?.attributes?.size.name : selected_variant?.attributes?.size;

    const handleColorSelect = (colorName) => {
        const variant = variants.find(v => {
            const vSize = typeof v.attributes.size === 'object' ? v.attributes.size.name : v.attributes.size;
            return v.attributes.color?.name === colorName && (!activeSize || vSize === activeSize);
        });
        if (variant) setSelectedVariant(variant.variant_id);
    };

    const handleSizeSelect = (sizeName) => {
        const variant = variants.find(v => {
            const vSize = typeof v.attributes.size === 'object' ? v.attributes.size.name : v.attributes.size;
            return vSize === sizeName && (!activeColor || v.attributes.color?.name === activeColor);
        });
        if (variant) setSelectedVariant(variant.variant_id);
    };

    return (
        <div className="product-info-wrapper">
            {/* Title & Badge */}
            <div className="mb-3 position-relative">
                <div className="d-flex justify-content-between align-items-start">
                    <div>
                        <span className="bridal-badge mb-2 d-inline-block">Bridal Special</span>
                        <h1 className="product-title m-0 text-capitalize">{name}</h1>
                    </div>
                    <button
                        className={`pdp-wishlist-btn ${isLiked ? 'liked' : ''}`}
                        onClick={handleWishlistToggle}
                        style={{ background: 'none', border: 'none', fontSize: '1.5rem', outline: 'none' }}
                        aria-label="Toggle Wishlist"
                    >
                        <i className={`bi ${isLiked ? 'bi-heart-fill text-danger' : 'bi-heart'}`}></i>
                    </button>
                </div>
                <h2 className="product-subtitle mt-2 mb-3">{brand} | {product.category?.name}</h2>
                <p className="product-description text-muted">{product.description}</p>
            </div>

            {/* Ratings */}
            <div className="ratings-section d-flex align-items-center gap-2 mb-4">
                <div className="stars d-flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} width="24" height="24" viewBox="0 0 24 24" fill={star <= Math.round(parseFloat(rating.average)) ? "#FFC107" : "#E5E7EB"} xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                                stroke={star <= Math.round(parseFloat(rating.average)) ? "#FFC107" : "#E5E7EB"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    ))}
                </div>
                <span className="reviews-count">({rating.count} Reviews)</span>
            </div>

            {/* Variant Selectors */}
            <div className="variants-selection mb-4">
                {colors.length > 0 && (
                    <div className="color-selection mb-3">
                        <div className="variant-label mb-2">Color: <strong>{activeColor}</strong></div>
                        <div className="d-flex gap-2">
                            {colors.map((color, idx) => (
                                <button
                                    key={idx}
                                    className={`color-swatch ${activeColor === color.name ? 'active' : ''}`}
                                    style={{
                                        backgroundColor: color.code,
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        border: activeColor === color.name ? '2px solid #000' : '1px solid #ddd',
                                        padding: '2px',
                                        backgroundClip: 'content-box'
                                    }}
                                    onClick={() => handleColorSelect(color.name)}
                                    title={color.name}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {sizes.length > 0 && (
                    <div className="size-selection mb-3">
                        <div className="variant-label mb-2">Size: <strong>{activeSize}</strong></div>
                        <div className="d-flex gap-2">
                            {sizes.map((size, idx) => {
                                const sizeName = typeof size === 'object' ? size.name : size;
                                return (
                                    <button
                                        key={idx}
                                        className={`size-chip btn btn-outline-dark ${activeSize === sizeName ? 'active bg-dark text-white' : ''}`}
                                        onClick={() => handleSizeSelect(sizeName)}
                                        style={{ minWidth: '45px', fontWeight: '500' }}
                                    >
                                        {sizeName}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Price Card */}
            <div className="price-card mb-4 p-4 rounded-3">
                <div className="d-flex align-items-center mb-1 flex-wrap">
                    <span className="current-price me-3">₹{parseFloat(currentPrice.selling_price).toLocaleString('en-IN')}</span>
                    {parseFloat(currentPrice.mrp) > parseFloat(currentPrice.selling_price) && (
                        <>
                            <span className="original-price me-3">₹{parseFloat(currentPrice.mrp).toLocaleString('en-IN')}</span>
                            <div className="discount-badge">
                                {Math.round(((parseFloat(currentPrice.mrp) - parseFloat(currentPrice.selling_price)) / parseFloat(currentPrice.mrp)) * 100)}% OFF
                            </div>
                        </>
                    )}
                </div>
                <div className="taxes-text mb-3">{product.price.tax_text || 'Inclusive of all taxes'}</div>
            </div>

            {/* Stock Alert */}
            <div className={`stock-alert d-flex justify-content-between align-items-center px-3 mb-4 rounded ${isOutOfStock ? 'bg-light' : ''}`}>
                <div className="d-flex align-items-center gap-2">
                    <img src={timerIcon} alt="Timer" className="timer-icon" />
                    <div className="stock-text-col d-flex flex-column justify-content-center">
                        <div className={`stock-title ${isOutOfStock ? 'text-danger' : ''}`}>
                            {isOutOfStock ? 'Out of Stock' : `Only ${selected_variant?.stock?.quantity || 0} Pieces Available`}
                        </div>
                        <div className="stock-subtitle">{isOutOfStock ? 'We will restock soon' : 'High demand – selling fast'}</div>
                    </div>
                </div>
                {!isOutOfStock && <div className="viewing-count">12 people viewing</div>}
            </div>

            {/* Delivery & Policies Section */}
            <div className="delivery-policies-section mb-4 p-3 bg-light rounded-3">
                <div className="row g-3">
                    {product.delivery?.freeDelivery && (
                        <div className="col-6 col-md-4 d-flex align-items-center gap-2">
                            <i className="bi bi-truck text-success"></i>
                            <span style={{ fontSize: '13px', fontWeight: '500' }}>Free Delivery</span>
                        </div>
                    )}
                    {product.delivery?.codAvailable && (
                        <div className="col-6 col-md-4 d-flex align-items-center gap-2">
                            <i className="bi bi-cash-stack text-success"></i>
                            <span style={{ fontSize: '13px', fontWeight: '500' }}>COD Available</span>
                        </div>
                    )}
                    {product.policies?.returnDays && (
                        <div className="col-6 col-md-4 d-flex align-items-center gap-2">
                            <i className="bi bi-arrow-counterclockwise text-success"></i>
                            <span style={{ fontSize: '13px', fontWeight: '500' }}>{product.policies.returnDays} Days Return</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons-container d-flex flex-column gap-3 mb-5">
                <button
                    className="btn btn-buy-now w-100 d-flex justify-content-center align-items-center gap-2"
                    onClick={handleBuyNow}
                    disabled={isOutOfStock || cartLoading}
                >
                    <img src={buyNowIcon} alt="Buy Now" width="16" height="21" />
                    {cartLoading ? 'Processing...' : 'Buy Now'}
                </button>
                <button
                    className="btn btn-add-cart w-100 d-flex justify-content-center align-items-center gap-2"
                    disabled={isOutOfStock || cartLoading}
                    onClick={handleAddToCart}
                >
                    {cartLoading ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : 'Add to Cart'}
                </button>
                <button className="btn btn-whatsapp w-100 d-flex justify-content-center align-items-center gap-2">
                    <img src={whatsappIcon} alt="WhatsApp" width="18" height="28" />
                    WhatsApp Enquiry
                </button>
            </div>
        </div>
    );
};

export default ProductInfo;
