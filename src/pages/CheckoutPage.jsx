import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './checkoutPage.css';
import leafIcon from 'assets/icons/ui/leaficon.png';
import orderIcon1 from 'assets/icons/ui/orderIcon1.png';
import orderIcon2 from 'assets/icons/ui/orderIcon2.png';
import orderIcon3 from 'assets/icons/ui/orderIcon3.png';
import vaikundhasilk from 'assets/images/silk/vaikundhasilk.jpg'

const CheckoutPage = () => {
    const navigate = useNavigate();
    const [couponCode, setCouponCode] = useState('');
    const [isCouponApplied, setIsCouponApplied] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        mobileNumber: '',
        email: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        saveAddress: false,
        orderNotes: ''
    });

    const subtotal = 18499;
    const discountAmount = isCouponApplied ? Math.round(subtotal * 0.1) : 0;
    const shipping = 0; // FREE
    const gst = 1982;
    const totalAmount = subtotal - discountAmount + shipping;

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const applyCoupon = () => {
        if (couponCode.toUpperCase() === 'HERITAGE10') {
            setIsCouponApplied(true);
            alert('Coupon Applied Successfully! 10% Discounted.');
        } else {
            alert('Invalid Coupon Code');
        }
    };

    const handlePayNow = (e) => {
        e.preventDefault();
        // Basic validation
        const requiredFields = ['fullName', 'mobileNumber', 'email', 'address', 'city', 'state', 'pincode'];
        const missingFields = requiredFields.filter(field => !formData[field]);

        if (missingFields.length > 0) {
            alert('Please fill in all required delivery address fields.');
            return;
        }

        alert('Redirecting to Payment Gateway...');
    };

    const openWhatsApp = () => {
        const summary = `Order Summary:
Product: Vaikuntha Kanchipuram Silk
Total Amount: ₹${totalAmount}
Customer: ${formData.fullName}
Address: ${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`;
        const encodedMsg = encodeURIComponent(summary);
        window.open(`https://wa.me/91XXXXXXXXXX?text=${encodedMsg}`, '_blank');
    };

    return (
        <div className="checkout-container py-5">
            <div className="checkout-grid">
                {/* Left Column */}
                <div className="left-side-form">
                        <section className="delivery-address-section mb-4">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h2 className="checkout-section-title">Delivery Address</h2>
                                <button className="btn-select-address">SELECT SAVED ADDRESS</button>
                            </div>

                            <form className="address-form">
                                <div className="row mb-4">
                                    <div className="col-md-6 mb-3 mb-md-0">
                                        <div className="form-input-group">
                                            <input 
                                                type="text" 
                                                name="fullName"
                                                placeholder="Full Name" 
                                                className="custom-input" 
                                                onChange={handleInputChange}
                                                required 
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-input-group">
                                            <input 
                                                type="text" 
                                                name="mobileNumber"
                                                placeholder="Mobile Number" 
                                                className="custom-input" 
                                                onChange={handleInputChange}
                                                required 
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-4">
                                    <div className="col-12">
                                        <div className="form-input-group">
                                            <input 
                                                type="email" 
                                                name="email"
                                                placeholder="Email Address (For tracking updates)" 
                                                className="custom-input full-width" 
                                                onChange={handleInputChange}
                                                required 
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-4">
                                    <div className="col-12">
                                        <div className="form-input-group">
                                            <input 
                                                type="text" 
                                                name="address"
                                                placeholder="Flat, House no., Building, Apartment" 
                                                className="custom-input full-width" 
                                                onChange={handleInputChange}
                                                required 
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-4">
                                    <div className="col-md-6 mb-3 mb-md-0">
                                        <div className="form-input-group">
                                            <input 
                                                type="text" 
                                                name="city"
                                                placeholder="City" 
                                                className="custom-input" 
                                                onChange={handleInputChange}
                                                required 
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-3 mb-md-0">
                                        <div className="form-input-group select-wrapper">
                                            <select 
                                                name="state" 
                                                className="custom-input select-input" 
                                                onChange={handleInputChange}
                                                required
                                            >
                                                <option value="">State</option>
                                                <option value="Tamil Nadu">Tamil Nadu</option>
                                                <option value="Karnataka">Karnataka</option>
                                                <option value="Andhra Pradesh">Andhra Pradesh</option>
                                                <option value="Telangana">Telangana</option>
                                                <option value="Kerala">Kerala</option>
                                                <option value="Maharashtra">Maharashtra</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-input-group">
                                            <input 
                                                type="text" 
                                                name="pincode"
                                                placeholder="Pincode" 
                                                className="custom-input" 
                                                onChange={handleInputChange}
                                                required 
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center mt-3">
                                    <input 
                                        type="checkbox" 
                                        id="saveAddress" 
                                        name="saveAddress"
                                        className="custom-checkbox" 
                                        onChange={handleInputChange}
                                    />
                                    <label htmlFor="saveAddress" className="checkbox-label ms-2">
                                        Save this address for faster checkouts
                                    </label>
                                </div>
                            </form>
                        </section>

                        <div className="eco-shipping-box mb-4">
                            <img src={leafIcon} alt="Leaf" className="leaf-icon-img" />
                            <div>
                                <h6 className="eco-title">ECO-ARTISAN SHIPPING</h6>
                                <p className="eco-text">
                                    Estimated arrival: 3-5 business days. Your weave is packed safely in acid-free paper for maximum silk protection.
                                </p>
                            </div>
                        </div>

                        <section className="payment-method-section mb-4">
                            <h2 className="checkout-section-title mb-4">Payment Method</h2>
                            
                            <div className="payment-options">
                                {/* UPI Option (Selected in image) */}
                                <div className="payment-item upi-item active-payment mb-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                            <div className="custom-radio-outer me-3">
                                                <div className="custom-radio-inner"></div>
                                            </div>
                                            <span className="payment-name">UPI (Google Pay / PhonePe / Paytm)</span>
                                        </div>
                                        <div className="payment-icon-right">
                                            <i className="bi bi-wallet2"></i>
                                        </div>
                                    </div>
                                    <div className="payment-details ms-5 mt-2">
                                        <p className="payment-desc mb-3">Pay directly from your bank account using UPI apps.</p>
                                        <div className="d-flex gap-3">
                                            <button className="btn-payment-action">USE STORED ID</button>
                                            <button className="btn-payment-action secondary">NEW UPI ID</button>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Option */}
                                <div className="payment-item card-item mb-3">
                                    <div className="d-flex align-items-center">
                                        <div className="custom-radio-outer unselected me-3"></div>
                                        <span className="payment-name inactive">Credit / Debit Card</span>
                                    </div>
                                    <div className="card-form ms-5 mt-3">
                                        <div className="form-input-group mb-3">
                                            <input type="text" placeholder="Card Number" className="custom-input full-width" disabled />
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mb-3 mb-md-0">
                                                <input type="text" placeholder="Expiry (MM/YY)" className="custom-input full-width" disabled />
                                            </div>
                                            <div className="col-md-6">
                                                <input type="text" placeholder="CVV" className="custom-input full-width" disabled />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Net Banking & COD Row */}
                                <div className="payment-row mb-4">
                                    <div className="payment-item half-width">
                                        <div className="d-flex align-items-center">
                                            <div className="custom-radio-outer unselected me-3"></div>
                                            <span className="payment-name font-small">Net Banking</span>
                                        </div>
                                    </div>
                                    <div className="payment-item half-width">
                                        <div className="d-flex align-items-center">
                                            <div className="custom-radio-outer unselected me-3"></div>
                                            <span className="payment-name font-small">Cash on Delivery</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <button className="btn-whatsapp w-100 mb-5" onClick={openWhatsApp}>
                            <i className="bi bi-whatsapp me-2"></i> ORDER VIA WHATS APP
                        </button>

                        <div className="row mt-5">
                            <div className="col-md-6 mb-4 mb-md-0">
                                <h3 className="sub-section-title">Apply Coupon</h3>
                                <div className="coupon-container d-flex mt-2">
                                    <input 
                                        type="text" 
                                        placeholder="Enter Code" 
                                        className="coupon-input border" 
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                    />
                                    <button className="btn-apply" onClick={applyCoupon}>APPLY</button>
                                </div>
                                <p className="coupon-hint mt-2">Apply "HERITAGE10" for 10% off on your first silk weave.</p>
                            </div>
                            <div className="col-md-6">
                                <h3 className="sub-section-title">Order Notes</h3>
                                <textarea 
                                    name="orderNotes"
                                    className="order-notes-textarea mt-2 p-2" 
                                    placeholder="Delivery instructions (optional)..."
                                    onChange={handleInputChange}
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Summary) */}
                    <div className="right-side-summary">
                        <section className="order-summary-card">
                            <h2 className="summary-title">Order Summary</h2>
                            
                            <div className="product-summary-row">
                                <div className="product-img-box">
                                    <img src={vaikundhasilk} alt="Vaikuntha Kanchipuram Silk" />
                                </div>
                                <div className="product-info-box flex-grow-1">
                                    <h4 className="prod-name">Vaikuntha Kanchipuram Silk</h4>
                                    <p className="prod-desc">Maroon & Antique Gold | Handloom</p>
                                    <div className="d-flex justify-content-between align-items-center mt-2">
                                        <span className="prod-qty">Qty: 1</span>
                                        <span className="prod-price">₹18,499</span>
                                    </div>
                                </div>
                            </div>

                            <div className="stock-alert-badge">
                                <span className="dot"></span> 
                                <span className="stock-alert-text">ONLY 1 PIECE LEFT IN STOCK</span>
                            </div>

                            <div className="price-details-box price-details">
                                <div className="price-row">
                                    <span className="label">Subtotal</span>
                                    <span className="value">₹{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="price-row">
                                    <span className="discount-label">Discount</span>
                                    <span className="discount-value">- ₹{discountAmount.toLocaleString()}</span>
                                </div>
                                <div className="price-row">
                                    <span className="shipping-label d-flex align-items-center">
                                        Shipping <i className="bi bi-info-circle ms-2" style={{fontSize: '9.5px', opacity: 0.7}}></i>
                                    </span>
                                    <span className="free-badge">FREE</span>
                                </div>
                                <div className="price-row">
                                    <span className="gst-label">Includes GST (12%)</span>
                                    <span className="gst-value">₹{gst.toLocaleString()}</span>
                                </div>
                                
                                <div className="price-row total-row-highlight pt-3">
                                    <span className="total-label">TOTAL AMOUNT</span>
                                    <span className="total-value">₹{totalAmount.toLocaleString()}</span>
                                </div>
                            </div>

                            <button className="btn-pay-now w-100 mt-4" onClick={handlePayNow}>PAY NOW</button>
                            <p className="secure-text">3D-SECURE PAYMENT AUTHORIZATION ACTIVE</p>
                        </section>

                        <div className="quality-badges-row">
                            <div className="quality-badge-box">
                                <img src={orderIcon1} alt="Guarantee" className="quality-badge-icon" />
                                <span className="quality-badge-text">PURE SILK GUARANTEE</span>
                            </div>
                            <div className="quality-badge-box">
                                <img src={orderIcon2} alt="Certified" className="quality-badge-icon" />
                                <span className="quality-badge-text">HANDLOOM CERTIFIED</span>
                            </div>
                            <div className="quality-badge-box">
                                <img src={orderIcon3} alt="Secure" className="quality-badge-icon" />
                                <span className="quality-badge-text">SECURE PAYMENT</span>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
