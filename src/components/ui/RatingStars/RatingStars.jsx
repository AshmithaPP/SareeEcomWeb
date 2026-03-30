import React from 'react';
import starIcon from '../../../assets/icons/ui/stars.png';
import halfStarIcon from '../../../assets/icons/ui/halfstariocn.png';
import './ratingStars.css';

const RatingStars = ({ rating = 5, size = 'small' }) => {
    // Determine the full, half, and empty stars
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0; // Check if there's a fractional part
    const emptyStars = 5 - Math.ceil(rating);

    // If stars.png is a single star image, we map it to create the rating.
    return (
        <div className={`rating-stars d-inline-flex align-items-center ${size}`}>
            {/* Using the provided star icon */}
            {[...Array(fullStars)].map((_, i) => (
                <img key={`full-${i}`} src={starIcon} alt="star" className="star star-full" />
            ))}
            
            {hasHalfStar && (
                <div className="star-half-container d-inline-flex align-items-center">
                    <img src={halfStarIcon} alt="half-star" className="star star-half" />
                </div>
            )}
            
            {[...Array(emptyStars)].map((_, i) => (
                <img key={`empty-${i}`} src={starIcon} alt="empty star" className="star star-empty" />
            ))}
        </div>
    );
};

export default RatingStars;
