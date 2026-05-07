import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryCard from './CategoryCard';
import styles from './CategoriesSection.module.css';
import ArrowButton from 'components/common/ArrowButton';

// Import local assets (ensure paths are correct)
import bridalSaree from 'assets/images/bridal/bridal_saree.png';
import traditionalSilk from 'assets/images/bridal/traditional_silk.png';
import lightweightSilk from 'assets/images/bridal/lightweight_silk.png';

const CategoriesSection = ({ dynamicCategories }) => {
    const navigate = useNavigate();
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const IMAGE_BASE_URL = 'http://localhost:5000';
    
    const categories = dynamicCategories ? dynamicCategories.map(cat => ({
        id: cat.category_id,
        title: cat.category_name,
        count: cat.product_count || "View Collection",
        imageUrl: cat.image_url ? (cat.image_url.startsWith('http') ? cat.image_url : `${IMAGE_BASE_URL}${cat.image_url}`) : bridalSaree,
        redirectUrl: cat.redirect_url || `/shop?category=${cat.category_id}`
    })) : [
        {
            id: 1,
            title: "Bridal Kanchipuram Sarees",
            count: "320+ Designs",
            imageUrl: bridalSaree,
            redirectUrl: "/shop"
        },
        {
            id: 2,
            title: "Traditional Silk Sarees",
            count: "540+ Designs",
            imageUrl: traditionalSilk,
            redirectUrl: "/shop"
        },
        {
            id: 3,
            title: "Lightweight Silk Sarees",
            count: "210+ Designs",
            imageUrl: lightweightSilk,
            redirectUrl: "/shop"
        }
    ];

    const handleCardClick = (url) => {
        if (url) navigate(url);
    };

    const checkScroll = () => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    };

    const handleScroll = (direction) => {
        if (!scrollRef.current) return;
        const scrollAmount = 430; // Card width (400) + gap (30)
        const offset = direction === 'left' ? -scrollAmount : scrollAmount;

        scrollRef.current.scrollBy({
            left: offset,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        const currentRef = scrollRef.current;
        if (currentRef) {
            currentRef.addEventListener('scroll', checkScroll);
            setTimeout(checkScroll, 100);
        }
        return () => {
            if (currentRef) currentRef.removeEventListener('scroll', checkScroll);
        };
    }, [categories]);

    return (
        <div className={styles.sectionContainer}>
            <div className={styles.carouselWrapper}>
                {categories.length > 3 && (
                    <div className={styles.arrowLeft}>
                        <ArrowButton
                            direction="left"
                            onClick={() => handleScroll('left')}
                            disabled={!canScrollLeft}
                        />
                    </div>
                )}

                <div 
                    className={styles.scrollContainer} 
                    ref={scrollRef}
                    style={{ 
                        display: 'flex', 
                        overflowX: 'auto',
                        scrollBehavior: 'smooth',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        gap: '30px',
                        justifyContent: categories.length <= 3 ? 'center' : 'flex-start'
                    }}
                >
                    {categories.map((category) => (
                        <div key={category.id} className={styles.cardWrapper}>
                            <CategoryCard
                                title={category.title}
                                count={category.count}
                                imageUrl={category.imageUrl}
                                onClick={() => handleCardClick(category.redirectUrl)}
                            />
                        </div>
                    ))}
                </div>

                {categories.length > 3 && (
                    <div className={styles.arrowRight}>
                        <ArrowButton
                            direction="right"
                            onClick={() => handleScroll('right')}
                            disabled={!canScrollRight}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoriesSection;
