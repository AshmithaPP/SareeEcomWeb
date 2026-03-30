import React from 'react';
import './trendingPicks.css';

const TrendingCard = ({ image, title, size }) => {
  return (
    <div className={`trending-card ${size || ''}`}>
      <div className="image-wrapper">
        <img src={image} alt={title} className="card-image" />
      </div>
      <div className="card-overlay">
        <h3 className="card-title">{title}</h3>
      </div>
    </div>
  );
};

export default TrendingCard;
