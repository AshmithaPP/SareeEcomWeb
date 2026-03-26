import React, { useEffect, useRef } from 'react';
import './shopByPrice.css';
import PriceCard from './PriceCard';

// Import images
import everydaySaree from '../../../../assets/images/bridal/occasion1.png';
import officeSaree from '../../../../assets/images/bridal/occasion2.png';
import weddingSaree from '../../../../assets/images/bridal/bridal_saree.png';
import festiveSaree from '../../../../assets/images/bridal/occasion4.png';
import largeSaree from '../../../../assets/images/bridal/occasion1.png'; // Reusing large image for consistency

const priceData = [
    {
        id: 1,
        title: 'Under ₹5k - Everyday Sarees',
        type: 'large',
        image: largeSaree,
    },
    {
        id: 2,
        title: 'Under ₹5k - Everyday Sarees',
        type: 'small',
        image: everydaySaree,
    },
    {
        id: 3,
        title: '₹5k – ₹10k - Office Wear Sarees',
        type: 'small',
        image: officeSaree,
    },
    {
        id: 4,
        title: '₹10k – ₹20k - Wedding & Bridal Sarees',
        type: 'small',
        image: weddingSaree,
    },
    {
        id: 5,
        title: '₹30k – ₹50k - Festive Wear Sarees',
        type: 'small',
        image: festiveSaree,
    }
];

const ShopByPrice = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const reveals = sectionRef.current.querySelectorAll('.reveal');
        reveals.forEach((reveal) => observer.observe(reveal));

        return () => {
            reveals.forEach((reveal) => observer.unobserve(reveal));
        };
    }, []);

    // Layout configuration from data
    const largeCard = priceData.find(item => item.type === 'large');
    const smallCards = priceData.filter(item => item.type === 'small');

    return (
        <section className="shop-by-price-section" ref={sectionRef}>
            <div className="container shop-by-price-container reveal">
                <h2 className="title">Shop By Price</h2>
                
                <div className="row g-4 d-flex align-items-stretch">
                    {/* Left Side - Large Card */}
                    <div className="col-lg-6 col-md-12 d-flex justify-content-center">
                        {largeCard && (
                            <PriceCard 
                                image={largeCard.image} 
                                title={largeCard.title} 
                                type="large" 
                            />
                        )}
                    </div>

                    {/* Right Side - Small Cards */}
                    <div className="col-lg-6 col-md-12 d-flex flex-column">
                        <div className="small-cards-column">
                            {smallCards.map((item) => (
                                <PriceCard 
                                    key={item.id}
                                    image={item.image}
                                    title={item.title}
                                    type="small"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ShopByPrice;
