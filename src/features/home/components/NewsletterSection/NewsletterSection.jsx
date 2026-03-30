import React, { useState } from 'react';
import './newsletterSection.css';
import newsletterImg from 'assets/images/silk/NewsSection.png'; // Verified file name

const NewsletterSection = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email Submitted:', email);
    // Add newsletter subscription logic here
  };

  return (
    <section className="newsletter-section">
      <div className="container newsletter-container">
        <div className="newsletter-card">
          <div className="row align-items-center h-100">
            {/* Left Content Column */}
            <div className="col-lg-7 col-md-12 d-flex flex-column justify-content-center newsletter-content">
              <h2 className="newsletter-title">
                Enter The World Of Timeless Sarees
              </h2>
              <p className="newsletter-subtitle">
                Be The First To Discover Our Latest Kanchipuram Collections, Festive Edits, And Exclusive Store Events.
              </p>
              
              <form onSubmit={handleSubmit} className="newsletter-form d-flex">
                <input
                  type="email"
                  className="form-control newsletter-input"
                  placeholder="Enter Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <button type="submit" className="btn newsletter-btn">
                  Stay Connected
                </button>
              </form>
            </div>

            {/* Right Image Column */}
            <div className="col-lg-5 col-md-12 newsletter-image-col">
              <div className="newsletter-image-wrapper">
                <img 
                  src={newsletterImg} 
                  alt="Newsletter Decorative" 
                  className="newsletter-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
