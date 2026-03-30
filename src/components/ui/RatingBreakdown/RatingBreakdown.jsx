import React from 'react';
import './ratingBreakdown.css';

const RatingBreakdown = ({ distribution, totalReviews }) => {
    // Determine the highest value to calculate percentage width context
    // This assumes distribution array is passed with { star: 5, count: 321 }
    
    return (
        <div className="rating-breakdown">
            {distribution.map((item) => {
                const percentage = totalReviews > 0 ? (item.count / totalReviews) * 100 : 0;
                
                return (
                    <div key={item.star} className="rating-bar-row d-flex align-items-center mb-2">
                        <div className="star-label text-muted me-3">
                            {item.star} Star
                        </div>
                        <div className="progress flex-grow-1" style={{ height: '8px' }}>
                            <div 
                                className="progress-bar custom-gold-bg" 
                                role="progressbar" 
                                style={{ width: `${percentage}%` }} 
                                aria-valuenow={percentage} 
                                aria-valuemin="0" 
                                aria-valuemax="100"
                            ></div>
                        </div>
                        <div className="count-label text-muted ms-3 text-end">
                            {item.count}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default RatingBreakdown;
