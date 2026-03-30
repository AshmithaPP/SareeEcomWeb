import React from 'react';
import styles from './CategoryCard.module.css';

const CategoryCard = ({ title, count, imageUrl, buttonText = "View Collections", onClick }) => {
    return (
        <div
            className={styles.cardContainer}
            style={{ backgroundImage: `url(${imageUrl})` }}
            onClick={() => onClick && onClick(title)}
        >
            <div className={styles.overlay}>
                <div className={styles.contentBox}>
                    <h3 className={styles.title}>{title}</h3>
                    <div className={styles.countBadge}>
                        <span className={styles.countText}>{count} Designs</span>
                    </div>
                    <button className={styles.viewBtn}>
                        <span className={styles.btnText}>{buttonText}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CategoryCard;
