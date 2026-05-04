import useWishlistStore from '@/store/useWishlistStore';
import './wishlistCard.css';

const WishlistCard = ({ product }) => {
    const { toggleWishlist } = useWishlistStore();

    const handleRemove = () => {
        toggleWishlist(product.product_id, product.variant_id || null);
    };

    return (
        <div className="wishlist-item-card text-center">
            <div className="wishlist-img-wrapper">
                <img src={product.image} alt={product.name} className="wishlist-product-img" />
                <button 
                    className="wishlist-remove-btn" 
                    onClick={handleRemove}
                    aria-label="Remove item"
                >
                    <i className="bi bi-x"></i>
                </button>
            </div>
            <div className="wishlist-product-details mt-2">
                <h5 className="wishlist-product-title mb-1">{product.name}</h5>
                <p className="wishlist-product-price font-weight-bold mb-0">₹{parseFloat(product.price).toLocaleString('en-IN')}</p>
            </div>
        </div>
    );
};

export default WishlistCard;
