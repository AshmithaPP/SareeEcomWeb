import React from 'react';
import styles from './ShopByCollections.module.css';

const ArrowButton = ({ direction, onClick, disabled }) => {
    return (
        <button
            className={`${styles.arrowBtn} ${styles[direction]} ${disabled ? styles.disabled : ''}`}
            onClick={onClick}
            disabled={disabled}
            aria-label={`Scroll ${direction}`}
        >
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                    transform: direction === 'right' ? 'rotate(180deg)' : 'rotate(0deg)',
                    display: 'block',
                }}
            >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
            </svg>
        </button>
    );
};

export default ArrowButton;