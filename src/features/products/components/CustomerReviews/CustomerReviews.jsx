import React, { useState } from 'react';
import './customerReviews.css';

// ── Inline sub-components (drop-in replacements for the imported ones) ──────

const RatingStars = ({ rating, size = 'normal' }) => {
    const starSize = size === 'large' ? 26 : 18;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        const fill = Math.min(1, Math.max(0, rating - (i - 1)));
        stars.push(
            <span key={i} className="star-wrap" style={{ fontSize: starSize, position: 'relative', display: 'inline-block', lineHeight: 1 }}>
                {/* Empty star */}
                <span style={{ color: '#D1D5DB' }}>★</span>
                {/* Filled star clipped to fill % */}
                {fill > 0 && (
                    <span style={{
                        color: '#FBBF24',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        overflow: 'hidden',
                        width: `${fill * 100}%`
                    }}>★</span>
                )}
            </span>
        );
    }
    return <span className="rating-stars">{stars}</span>;
};

const RatingBreakdown = ({ distribution, totalReviews }) => {
    return (
        <div className="rating-breakdown">
            {distribution.map(({ star, count }) => {
                const pct = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                return (
                    <div key={star} className="breakdown-row">
                        <span className="breakdown-label">{star} Star</span>
                        <div className="breakdown-bar-track">
                            <div
                                className="breakdown-bar-fill"
                                style={{ width: `${pct}%` }}
                            />
                        </div>
                        <span className="breakdown-count">{count}</span>
                    </div>
                );
            })}
        </div>
    );
};

const ThumbsUpIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/>
        <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
    </svg>
);

const ReviewCard = ({ review }) => {
    const { customerName, rating, date, comment, verifiedPurchase, helpfulCount, avatar, images = [] } = review;

    return (
        <div className="review-card">
            <div className="review-header">
                <div className="reviewer-info">
                    <img
                        src={avatar}
                        alt={customerName}
                        className="reviewer-avatar"
                        onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(customerName)}&background=e5e7eb&color=374151`; }}
                    />
                    <div className="reviewer-meta">
                        <span className="reviewer-name">{customerName}</span>
                        <div className="reviewer-stars">
                            <RatingStars rating={rating} />
                        </div>
                    </div>
                </div>
                <span className="review-date">{date}</span>
            </div>

            <p className="review-comment">{comment}</p>

            {images.length > 0 && (
                <div className="review-images">
                    {images.map((src, i) => (
                        <img key={i} src={src} alt={`Review image ${i + 1}`} className="review-image-thumb" />
                    ))}
                </div>
            )}

            <div className="review-footer">
                <button className="helpful-btn">
                    <ThumbsUpIcon />
                    <span>Helpful ({helpfulCount})</span>
                </button>
                {verifiedPurchase && (
                    <span className="verified-badge">Verified Purchase</span>
                )}
            </div>
        </div>
    );
};

// ── Main component ────────────────────────────────────────────────────────────

const CustomerReviews = () => {
    const reviewsData = [
        {
            id: 1,
            customerName: "Priya Sharma",
            rating: 5,
            date: "2 weeks ago",
            title: "Absolutely stunning!",
            comment: "Absolutely stunning saree! The quality of silk and zari work is exceptional. I wore it for my sister's wedding and received countless compliments. Worth every penny!",
            verifiedPurchase: true,
            helpfulCount: 24,
            avatar: "https://randomuser.me/api/portraits/women/44.jpg",
            images: [
                "https://images.unsplash.com/photo-1610189014605-e3d82a178ac2?auto=format&fit=crop&q=80&w=200",
                "https://images.unsplash.com/photo-1583391733958-61192b0adac7?auto=format&fit=crop&q=80&w=200"
            ]
        },
        {
            id: 2,
            customerName: "Anjali Reddy",
            rating: 5,
            date: "1 month ago",
            title: "Beautiful traditional saree",
            comment: "Beautiful traditional saree with authentic Kanchipuram weaving. The color is rich and the silk quality is top-notch. Delivery was fast and packaging was excellent.",
            verifiedPurchase: true,
            helpfulCount: 18,
            avatar: "https://randomuser.me/api/portraits/women/68.jpg",
            images: []
        },
        {
            id: 3,
            customerName: "Sneha V.",
            rating: 4,
            date: "3 months ago",
            title: "Lovely fabric",
            comment: "The saree is exactly as pictured. Beautiful zari work. Dropped one star because I felt the blouse piece could have been a bit longer, but otherwise perfect.",
            verifiedPurchase: true,
            helpfulCount: 5,
            avatar: "https://randomuser.me/api/portraits/women/32.jpg",
            images: []
        }
    ];

    const ratingDistribution = [
        { star: 5, count: 321 },
        { star: 4, count: 64 },
        { star: 3, count: 30 },
        { star: 2, count: 9 },
        { star: 1, count: 4 }
    ];

    return (
        <div className="customer-reviews-section container p-4 shadow-sm mt-4">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="reviews-section-title mb-0">Customer Reviews</h3>
                <a href="#write-review" className="write-review-btn">Write a Review</a>
            </div>

            {/* Rating summary + breakdown */}
            <div className="row mb-4 align-items-center">
                <div className="col-md-4 text-center rating-summary-col">
                    <div className="rating-value mb-2">4.6</div>
                    <div className="d-flex justify-content-center mb-2">
                        <RatingStars rating={4.6} size="large" />
                    </div>
                    <div className="rating-based-on">Based on 428 reviews</div>
                </div>

                <div className="col-md-8 px-md-5 mt-4 mt-md-0">
                    <RatingBreakdown
                        distribution={ratingDistribution}
                        totalReviews={428}
                    />
                </div>
            </div>

            <hr className="reviews-divider" />

            {/* Reviews list */}
            <div className="reviews-list">
                {reviewsData.map(review => (
                    <ReviewCard key={review.id} review={review} />
                ))}
            </div>

            {/* Load more */}
            <div className="text-center mt-4 mb-2">
                <button className="btn load-more-btn fw-bold px-4 py-2">
                    Load More Reviews
                </button>
            </div>
        </div>
    );
};

export default CustomerReviews;