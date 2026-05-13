import React from 'react';
import { Link } from 'react-router-dom';
import './blogSection.css';

const BlogCard = ({ id, image, category = "Travel", date = "13 March 2023", title, description }) => {
  return (
    <div className="blog-card">
      <div className="blog-image-wrapper">
        <Link to={`/blog/${id}`}>
          <img src={image} alt={title} className="blog-image" />
        </Link>
      </div>
      <div className="blog-content">
        <div className="blog-meta">
          <span className="blog-category">{category}</span>
          <span className="blog-date">{date}</span>
        </div>
        <h3 className="blog-title">
          <Link to={`/blog/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            {title}
          </Link>
        </h3>
        <p className="blog-description">{description}</p>
        <Link to={`/blog/${id}`} className="blog-readmore">Read More...</Link>
      </div>
    </div>
  );
};

export default BlogCard;
