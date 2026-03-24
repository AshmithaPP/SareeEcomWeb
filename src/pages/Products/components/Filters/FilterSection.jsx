import React, { useState } from 'react';

const FilterSection = ({ title, children, defaultOpen = true }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const toggleOpen = () => setIsOpen(prev => !prev);

    return (
        <div className="filter-section">
            <div className="filter-section-header" onClick={toggleOpen} role="button">
                <span className="filter-section-title">{title}</span>
                <span className={`filter-section-icon ${isOpen ? 'open' : ''}`}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 7.5L10 12.5L15 7.5" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </span>
            </div>
            {isOpen && (
                <div className="filter-section-content">
                    {children}
                </div>
            )}
        </div>
    );
};

export default FilterSection;
