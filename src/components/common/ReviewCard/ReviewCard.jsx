import React from 'react';
import RatingStars from '../RatingStars/RatingStars';
import thumbsUpIcon from '../../../assets/icons/hand.png';
import './reviewCard.css';

const ReviewCard = ({ review }) => {
    return (
        <div className="review-card py-4">
            <div className="d-flex align-items-start mb-2">
                {/* Avatar */}
                <div className="reviewer-avatar flex-shrink-0 me-3">
                    <img 
                        src={review.avatar || `https://ui-avatars.com/api/?name=${review.customerName}&background=random`} 
                        alt={review.customerName} 
                        className="rounded-circle"
                    />
                </div>
                
                {/* Name, Rating, Date */}
                <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-baseline mb-1">
                        <h6 className="reviewer-name fw-bold mb-0">{review.customerName}</h6>
                        <span className="review-date text-muted">{review.date}</span>
                    </div>
                    <RatingStars rating={review.rating} size="small" />
                </div>
            </div>

            {/* Comment Body */}
            <div className="review-body mt-3">
                <p className="review-text text-muted mb-3">{review.comment}</p>
                
                {/* Optional Review Images */}
                {review.images && review.images.length > 0 && (
                    <div className="review-images d-flex gap-2 mb-3">
                        {review.images.map((img, idx) => (
                            <img key={idx} src={img} alt={`review-${idx}`} className="review-thumbnail rounded" />
                        ))}
                    </div>
                )}
            </div>

            {/* Footer Actions (Helpful, Verified) */}
            <div className="review-footer d-flex align-items-center mt-2">
                <button className="review-action-btn">
                    <img src={thumbsUpIcon} alt="helpful" className="review-action-icon" />
                    Helpful ({review.helpfulCount || 0})
                </button>
                {review.verifiedPurchase && (
                    <span className="verified-badge d-flex align-items-center">
                        Verified Purchase
                    </span>
                )}
            </div>
        </div>
    );
};

export default ReviewCard;
