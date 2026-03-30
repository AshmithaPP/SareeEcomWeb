import React from 'react';
import './productInfo.css';
import checklistIcon from 'assets/icons/ui/checklisticon.png';
import timerIcon from 'assets/icons/ui/timer.png';
import buyNowIcon from 'assets/icons/ui/buynow.png';
import addToCartIcon from 'assets/icons/ui/addtocart.png';
import whatsappIcon from 'assets/icons/social/whatsapp.png';

const ProductInfo = () => {
    return (
        <div className="product-info-wrapper">
            {/* Title & Badge */}
            <div className="mb-3">
                <span className="bridal-badge mb-2 d-inline-block">Bridal Special</span>
                <h1 className="product-title m-0">Kanchipuram Silk Saree – Temple Border</h1>
                <h2 className="product-subtitle mt-2 mb-0">Handwoven | Pure Mulberry Silk</h2>
            </div>

            {/* Ratings */}
            <div className="ratings-section d-flex align-items-center gap-2 mb-4">
                <div className="stars d-flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} width="24" height="24" viewBox="0 0 24 24" fill="#FFC107" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                                  stroke="#FFC107" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    ))}
                </div>
                <span className="reviews-count">(428 Reviews)</span>
            </div>

            {/* Price Card */}
            <div className="price-card mb-4 p-4 rounded-3">
                <div className="d-flex align-items-center mb-1 flex-wrap">
                    <span className="current-price me-3">₹24,999</span>
                    <span className="original-price me-3">₹42,000</span>
                    <div className="discount-badge">40% OFF</div>
                </div>
                <div className="taxes-text mb-3">Inclusive of all taxes</div>
                <div className="emi-text d-flex align-items-center gap-2">
                    <img src={checklistIcon} alt="Checklist" width="18" height="18" />
                    EMI from ₹2,083/month
                </div>
            </div>

            {/* Stock Alert */}
            <div className="stock-alert d-flex justify-content-between align-items-center px-3 mb-4 rounded">
                <div className="d-flex align-items-center gap-2">
                    <img src={timerIcon} alt="Timer" className="timer-icon" />
                    <div className="stock-text-col d-flex flex-column justify-content-center">
                        <div className="stock-title">Only 1 Piece Available</div>
                        <div className="stock-subtitle">High demand – selling fast</div>
                    </div>
                </div>
                <div className="viewing-count">12 people viewing</div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons-container d-flex flex-column gap-3 mb-5">
                <button className="btn btn-buy-now w-100 d-flex justify-content-center align-items-center gap-2">
                    <img src={buyNowIcon} alt="Buy Now" width="16" height="21" />
                    Buy Now
                </button>
                <button className="btn btn-add-cart w-100 d-flex justify-content-center align-items-center gap-2">
                    Add to Cart
                </button>
                <button className="btn btn-whatsapp w-100 d-flex justify-content-center align-items-center gap-2">
                    <img src={whatsappIcon} alt="WhatsApp" width="18" height="28" />
                    WhatsApp Enquiry
                </button>
            </div>
        </div>
    );
};

export default ProductInfo;
