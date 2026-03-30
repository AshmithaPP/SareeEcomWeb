import React from 'react';
import './whyChoose.css';

const WhyChoose = ({ features }) => {
    return (
        <div className="why-choose-card p-4 rounded-3">
            <h3 className="why-choose-heading mb-4">Why Choose This Saree?</h3>
            <ul className="why-choose-list list-unstyled mb-0">
                {features.map((feature, index) => (
                    <li key={index} className="d-flex align-items-start mb-3">
                        <svg className="me-3 mt-1 flex-shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 6L9 17L4 12" stroke="#2D5F4F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="feature-text">{feature}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WhyChoose;
