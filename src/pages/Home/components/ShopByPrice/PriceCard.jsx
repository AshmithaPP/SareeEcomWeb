import React from 'react';
import './shopByPrice.css';

const PriceCard = ({ image, title, type }) => {
    return (
        <div className={`price-card ${type}`}>
            <div className="price-card-image-wrapper">
                <img src={image} alt={title} className="price-card-image" />
            </div>
            <div className="price-card-overlay">
                <div className="price-card-content">
                    {title}
                </div>
            </div>
        </div>
    );
};

export default PriceCard;
