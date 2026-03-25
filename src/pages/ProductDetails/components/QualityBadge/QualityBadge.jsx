import React from 'react';
import './qualityBadge.css';

const QualityBadge = ({ badge }) => {
    return (
        <div className="quality-badge p-3 d-flex flex-column align-items-center justify-content-center text-center">
            {/* Try to use image icon if exists, otherwise fallback inline SVG */}
            {badge.icon.endsWith('.svg') ? (
                <img src={badge.icon} alt={badge.title} className="badge-icon mb-2" onError={(e) => {
                    // Fallback SVG if image not found
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                }} />
            ) : null}
            
            {/* Fallback Icon */}
            <svg className="fallback-badge-icon mb-2" style={{ display: badge.icon.endsWith('.svg') ? 'none' : 'block' }} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#8B2635" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

            <div className="badge-title">{badge.title}</div>
            <div className="badge-subtitle">{badge.subtitle}</div>
        </div>
    );
};

export default QualityBadge;
