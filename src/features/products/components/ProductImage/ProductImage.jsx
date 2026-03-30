import React, { useState } from 'react';
import './productImage.css';

const ProductImage = () => {
    // Mock image array for demonstration
    const images = [
        '/images/saree-main.jpg',
        '/images/saree-thumb1.jpg',
        '/images/saree-thumb2.jpg',
        '/images/saree-thumb3.jpg',
        '/images/saree-thumb4.jpg'
    ];

    const [activeImage, setActiveImage] = useState(0);

    return (
        <div className="product-image-container ms-lg-5">
            {/* Main Large Image */}
            <div className="main-image-wrapper mb-3 position-relative">
                <div className="main-image placeholder-image">
                    {/* Placeholder text for missing image */}
                    <span>Product Image</span>
                </div>
                
                {/* Wishlist Icon */}
                <button className="wishlist-btn rounded-circle bg-white d-flex align-items-center justify-content-center shadow-sm">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.81 0 3.43.88 4.44 2.24 1.01-1.36 2.63-2.24 4.44-2.24 3.07 0 5.56 2.5 5.56 5.59 0 7-6.48 11.13-9.38 12.12z" stroke="#8B2635" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>

                {/* Hover to Zoom Button */}
                <button className="hover-zoom-btn btn bg-white shadow-sm d-flex align-items-center gap-2 px-3 py-2 rounded-pill">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M21 21L16.65 16.65" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M11 8V14M8 11H14" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="zoom-text">Hover to Zoom</span>
                </button>
            </div>

            {/* Thumbnail Row */}
            <div className="thumbnail-row d-flex justify-content-between gap-2">
                {images.map((img, index) => (
                    <div 
                        key={index} 
                        className={`thumbnail-wrapper ${activeImage === index ? 'active' : ''}`}
                        onClick={() => setActiveImage(index)}
                    >
                        <div className="thumbnail-placeholder"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductImage;
