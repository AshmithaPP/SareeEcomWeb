import React from 'react';
import CategoryCard from './CategoryCard';
import styles from './CategoriesSection.module.css';

// Import local assets (ensure paths are correct)
import bridalSaree from '../../../../assets/images/bridal_saree.png';
import traditionalSilk from '../../../../assets/images/traditional_silk.png';
import lightweightSilk from '../../../../assets/images/lightweight_silk.png';

const CategoriesSection = () => {
    const categories = [
        {
            id: 1,
            title: "Bridal Kanchipuram Sarees",
            count: "320+",
            imageUrl: bridalSaree
        },
        {
            id: 2,
            title: "Traditional Silk Sarees",
            count: "540+",
            imageUrl: traditionalSilk
        },
        {
            id: 3,
            title: "Lightweight Silk Sarees",
            count: "210+",
            imageUrl: lightweightSilk
        }
    ];

    const handleCardClick = (title) => {
        console.log(`Category clicked: ${title}`);
    };

    return (
        <div className={styles.sectionContainer}>
            <div className={`row g-4 justify-content-center ${styles.customGutter}`}>
                {categories.map((category) => (
                    <div key={category.id} className="col-lg-4 col-md-6 col-12 d-flex justify-content-center">
                        <CategoryCard
                            title={category.title}
                            count={category.count}
                            imageUrl={category.imageUrl}
                            onClick={handleCardClick}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoriesSection;
