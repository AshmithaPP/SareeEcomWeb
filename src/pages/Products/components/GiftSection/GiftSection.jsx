import React from 'react';
import './GiftSection.css';

const GiftSection = () => {
    return (
        <section className="gift-section-container">
            {/* Top Badges Section */}
            <div className="badges-wrapper mb-5">
                <div className="badges-inner d-flex flex-wrap justify-content-between align-items-center w-100">
                    <div className="badge-item d-flex flex-column align-items-center justify-content-center">
                        <i className="bi bi-award-fill badge-icon mb-3"></i>
                        <h4 className="badge-title">Pure Silk Guarantee</h4>
                    </div>
                    <div className="badge-item d-flex flex-column align-items-center justify-content-center">
                        <i className="bi bi-balloon-heart-fill badge-icon mb-3"></i>
                        <h4 className="badge-title">Handloom Certified</h4>
                    </div>
                    <div className="badge-item d-flex flex-column align-items-center justify-content-center">
                        <i className="bi bi-shield-check badge-icon mb-3"></i>
                        <h4 className="badge-title">Secure Payments</h4>
                    </div>
                    <div className="badge-item d-flex flex-column align-items-center justify-content-center">
                        <i className="bi bi-star-fill badge-icon mb-3"></i>
                        <h4 className="badge-title">Authentic Kanchipuram</h4>
                    </div>
                </div>
            </div>

            {/* Gift Vouchers Section */}
            <div className="gift-vouchers-wrapper">
                <div className="gift-header text-center mb-5">
                    <h2 className="gift-title">Gift the Elegance of Kanchipuram Silk</h2>
                    <p className="gift-subtitle">The perfect gift for weddings, festivals, and special occasions.</p>
                </div>

                <div className="row g-4 justify-content-center mb-5 vouchers-grid">
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="voucher-card">
                            <h3 className="voucher-price">₹3,000</h3>
                            <p className="voucher-label">Gift Voucher</p>
                            <div className="voucher-button">
                                Kanchipuram Heritage
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="voucher-card">
                            <h3 className="voucher-price">₹5,000</h3>
                            <p className="voucher-label">Gift Voucher</p>
                            <div className="voucher-button">
                                Kanchipuram Heritage
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="voucher-card">
                            <h3 className="voucher-price">₹7,000</h3>
                            <p className="voucher-label">Gift Voucher</p>
                            <div className="voucher-button">
                                Kanchipuram Heritage
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <button className="shop-gift-cards-btn">Shop Gift Cards</button>
                </div>
            </div>
        </section>
    );
};

export default GiftSection;
