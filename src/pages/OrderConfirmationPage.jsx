import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchOrderDetails } from '../api/orderApi';
import './orderConfirmation.css';

// Import icons/images
import transportIcon from '../assets/icons/ui/transporticon.png';
import sareeImage from '../assets/images/silk/collection1.png'; // Using available silk image

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getOrderData = async () => {
      try {
        setLoading(true);
        const data = await fetchOrderDetails(orderId);
        setOrderData(data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Something went wrong while fetching your order details.');
      } finally {
        setLoading(false);
      }
    };

    getOrderData();
  }, [orderId]);

  if (loading) {
    return (
      <div className="order-conf-wrapper">
        <div className="text-center">
          <div className="spinner-border text-maroon" role="status" style={{ color: '#800000' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3" style={{ fontFamily: 'Jost', color: '#5A413D' }}>Fetching your order details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="order-conf-wrapper">
        <div className="text-center p-5 bg-white rounded shadow-sm" style={{ maxWidth: '500px' }}>
          <h2 style={{ fontFamily: 'Jost', color: '#800000' }}>Oops!</h2>
          <p style={{ fontFamily: 'Jost', color: '#5A413D' }}>{error}</p>
          <button 
            className="order-conf-btn-track mt-3" 
            onClick={() => window.location.reload()}
            style={{ width: 'auto', padding: '0 32px', margin: '0 auto' }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="order-conf-wrapper">
      <div className="order-conf-container">
        <div className="order-conf-inner-layout">
          
          {/* Status Header */}
          <header className="order-conf-status-header">
            <div className="order-conf-checkmark-box">
              <div className="order-conf-checkmark-inner">
                <i className="bi bi-check-lg" style={{ fontSize: '24px' }}></i>
              </div>
            </div>
            <h1 className="order-conf-title">Order Confirmed!</h1>
            <p className="order-conf-subtext">
              Thank you for your purchase. Your Kanchipuram silk saree order has been successfully placed and is being prepared for transit.
            </p>
          </header>

          {/* Content Grid */}
          <main className="order-conf-content-grid">
            
            {/* Left Column: Order Summary & Product */}
            <div className="order-conf-left-column">
              <div className="order-conf-summary-box">
                <h2 className="order-conf-summary-title">Order Summary</h2>
                
                <div className="order-conf-summary-row">
                  <div className="order-conf-summary-item">
                    <span className="order-conf-item-label">ORDER ID</span>
                    <div className="order-conf-item-value">{orderData.orderId}</div>
                  </div>
                  <div className="order-conf-summary-item">
                    <span className="order-conf-item-label">ORDER DATE</span>
                    <div className="order-conf-item-value">{orderData.orderDate}</div>
                  </div>
                </div>

                <div className="order-conf-summary-row">
                  <div className="order-conf-summary-item">
                    <span className="order-conf-item-label">PAYMENT METHOD</span>
                    <div className="order-conf-item-value">{orderData.paymentMethod}</div>
                  </div>
                  <div className="order-conf-summary-item">
                    <span className="order-conf-item-label">TOTAL AMOUNT</span>
                    <div className="order-conf-item-value order-conf-total-value">{orderData.totalAmount}</div>
                  </div>
                </div>
              </div>

              <div className="order-conf-product-box">
                <div className="order-conf-product-image-container">
                  <img src={sareeImage} alt="Product" className="img-fluid" />
                </div>
                <div className="order-conf-product-info">
                  <span className="order-conf-product-badge">{orderData.product.type}</span>
                  <h3 className="order-conf-product-name">{orderData.product.name}</h3>
                  <div className="order-conf-product-qty">Quantity: {orderData.product.quantity}</div>
                  <div className="order-conf-product-price">{orderData.product.price}</div>
                </div>
              </div>
            </div>

            {/* Right Column: Delivery Details */}
            <div className="order-conf-right-column">
              <div className="order-conf-delivery-box">
                <div className="order-conf-delivery-header">
                  <h2 className="order-conf-delivery-title">Delivery Details</h2>
                  <img src={transportIcon} alt="Transport" className="order-conf-transport-icon" />
                </div>

                <div className="order-conf-delivery-body">
                  <div className="order-conf-customer-name">{orderData.delivery.customerName}</div>
                  <div className="order-conf-customer-address">{orderData.delivery.address}</div>
                  <div className="order-conf-customer-phone">{orderData.delivery.phone}</div>
                </div>

                <div className="order-conf-arrival-section">
                  <span className="order-conf-arrival-label">ESTIMATED ARRIVAL</span>
                  <div className="order-conf-arrival-date">{orderData.delivery.estimatedArrival}</div>
                </div>

                <div className="order-conf-note-box">
                  <i className="bi bi-shield-check order-conf-note-icon"></i>
                  <p className="order-conf-note-text">{orderData.delivery.packagingNote}</p>
                </div>
              </div>

              <div className="order-conf-action-buttons">
                <button className="order-conf-btn-track">
                  TRACK ORDER <i className="bi bi-arrow-right ms-2"></i>
                </button>
                <button className="order-conf-btn-continue" onClick={() => navigate('/products')}>
                  CONTINUE SHOPPING
                </button>
              </div>
            </div>

          </main>

        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
