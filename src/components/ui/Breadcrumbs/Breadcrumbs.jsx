import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './breadcrumbs.css';

const Breadcrumbs = ({ items }) => {
    const location = useLocation();
    
    // Default items if none provided
    const defaultItems = [
        { label: 'Home', path: '/' },
        { label: 'Sarees', path: '/products' },
        { label: 'Kanchipuram Silk Temple Border', path: location.pathname }
    ];

    const breadcrumbItems = items || defaultItems;

    return (
        <nav aria-label="breadcrumb" className="breadcrumb-nav">
            <ol className="breadcrumb">
                {breadcrumbItems.map((item, index) => {
                    const isLast = index === breadcrumbItems.length - 1;
                    return (
                        <li 
                            key={index} 
                            className={`breadcrumb-item ${isLast ? 'active' : ''}`}
                            aria-current={isLast ? 'page' : undefined}
                        >
                            {isLast ? (
                                <span className="current-item">{item.label}</span>
                            ) : (
                                <Link to={item.path} className="breadcrumb-link">{item.label}</Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
