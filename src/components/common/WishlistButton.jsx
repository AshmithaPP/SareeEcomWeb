import useWishlistStore from '@/store/useWishlistStore';
import { toast } from 'react-toastify';
import styles from './WishlistButton.module.css';

const WishlistButton = ({ product }) => {
    const { items, toggleWishlist } = useWishlistStore();
    const productId = product?.product_id || product?.id;
    const isLiked = items.some(item => item.product_id === productId);

    const toggleLike = async (e) => {
        e.stopPropagation();
        if (!productId) return;

        const result = await toggleWishlist(productId);
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

    return (
        <button
            className={`${styles.wishlistBtn} ${isLiked ? styles.liked : ''}`}
            onClick={toggleLike}
            aria-label="Add to wishlist"
        >
            <i className={`bi ${isLiked ? 'bi-heart-fill' : 'bi-heart'}`}></i>
        </button>
    );
};

export default WishlistButton;
