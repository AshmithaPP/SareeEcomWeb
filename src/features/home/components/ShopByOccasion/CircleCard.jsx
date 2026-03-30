import React from 'react';
import './shopByOccasion.css'; // Importing parent CSS for simplicity or separate if needed

const CircleCard = ({ image, title }) => {
  return (
    <div className="circle-card-item">
      <div className="circle-image-wrapper">
        <img src={image} alt={title} className="circle-image" />
      </div>
      <h3 className="circle-card-title">{title}</h3>
    </div>
  );
};

export default CircleCard;
