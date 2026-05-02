import React, { useState } from 'react';
import './productImage.css';

const ProductImage = ({ media, video }) => {
    // Get images from media object
    const galleryImages = media?.gallery?.length > 0 ? media.gallery : [media?.primary || ''];
    
    // Combine images and video into a single items array
    // We can put video first or last, let's put it at the end
    const items = [...galleryImages.map(url => ({ type: 'image', url }))];
    if (video) {
        items.push({ type: 'video', url: video });
    }

    const [activeIndex, setActiveIndex] = useState(0);

    const activeItem = items[activeIndex];

    return (
        <div className="product-image-container ms-lg-5">
            {/* Main Display Area */}
            <div className="main-image-wrapper mb-3 position-relative">
                {activeItem?.type === 'video' ? (
                    <video 
                        src={activeItem.url} 
                        className="main-image-img" 
                        controls 
                        autoPlay 
                        muted
                        style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '8px', backgroundColor: '#000' }}
                    />
                ) : activeItem?.type === 'image' && activeItem.url ? (
                    <img src={activeItem.url} alt="Product" className="main-image-img" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                ) : (
                    <div className="main-image placeholder-image">
                        <span>No Media Available</span>
                    </div>
                )}
                
                {/* Wishlist Icon */}
                <button className="wishlist-btn rounded-circle bg-white d-flex align-items-center justify-content-center shadow-sm">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.81 0 3.43.88 4.44 2.24 1.01-1.36 2.63-2.24 4.44-2.24 3.07 0 5.56 2.5 5.56 5.59 0 7-6.48 11.13-9.38 12.12z" stroke="#8B2635" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>

                {activeItem?.type === 'image' && (
                    <button className="hover-zoom-btn btn bg-white shadow-sm d-flex align-items-center gap-2 px-3 py-2 rounded-pill">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M21 21L16.65 16.65" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M11 8V14M8 11H14" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="zoom-text">Hover to Zoom</span>
                    </button>
                )}
            </div>

            {/* Thumbnail Row */}
            <div className="thumbnail-row d-flex justify-content-start gap-2 flex-wrap">
                {items.map((item, index) => (
                    <div 
                        key={index} 
                        className={`thumbnail-wrapper ${activeIndex === index ? 'active' : ''} position-relative`}
                        onClick={() => setActiveIndex(index)}
                        style={{ cursor: 'pointer', width: '80px', height: '80px', border: activeIndex === index ? '2px solid #8B2635' : '1px solid #ddd', borderRadius: '4px', overflow: 'hidden' }}
                    >
                        {item.type === 'image' ? (
                            <img src={item.url} alt={`Thumb ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            <div className="video-thumbnail w-100 h-100 d-flex align-items-center justify-content-center bg-dark">
                                <i className="bi bi-play-fill text-white fs-2"></i>
                                <video src={item.url} style={{ display: 'none' }} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductImage;
