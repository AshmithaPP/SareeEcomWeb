import React from 'react';
import './testimonials.css';
import starsIcon from '../../../../assets/icons/ui/stars.png';
import quotesIcon from '../../../../assets/icons/ui/quotesIcon.png';

const TestimonialCard = ({ testimonial, className }) => {
    const { image, name, role, review} = testimonial;

    return (
        <div className={`testimonial-card ${className}`}>
            <div className="card-content">
                <div className="quote-container">
                    <img src={quotesIcon} alt="quote" className="quote-icon" />
                </div>
                <div className="rating">
                    {[...Array(5)].map((_, index) => (
                        <img key={index} src={starsIcon} alt="star" className="star-icon" />
                    ))}
                </div>
                <p className="review-text">{review}</p>
                <div className="author-info">
                    <h4 className="name">{name}</h4>
                    <p className="role">{role}</p>
                </div>
            </div>
            <div className="card-image-container">
                <img src={image} alt={name} className="card-img" />
            </div>
        </div>
    );
};

export default TestimonialCard;
