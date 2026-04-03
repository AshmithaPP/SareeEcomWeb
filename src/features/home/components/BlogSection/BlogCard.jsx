import React from 'react';
import { Link } from 'react-router-dom';
import './blogSection.css';

const BlogCard = ({ image, category, date, title, description, link }) => {
  return (
    <div className="blog-card">
      <div className="blog-image-wrapper">
        <img src={image} alt={title} className="blog-image" />
      </div>
      <div className="blog-content">
        <div className="blog-meta">
          <span className="blog-category">{category}</span>
          <span className="blog-date">{date}</span>
        </div>
        <h3 className="blog-title">{title}</h3>
        <p className="blog-description">{description}</p>
        <Link to="/blogdetails" className="blog-readmore">Read More...</Link>
      </div>
    </div>
  );
};

export default BlogCard;
