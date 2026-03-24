import React, { useState } from 'react';
import TestimonialCard from './TestimonialCard';
import ArrowButton from '../../../../components/common/ArrowButton';
import './testimonials.css';
import collection1 from '../../../../assets/images/testimonial.png';

const Testimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const testimonials = [
        {
            image: collection1,
            name: 'Anthony Bahringer',
            role: 'Senior Research Manager',
            review: 'Lorem ipsum dolor sit amet consectetur. Consequat auctor consectetur nunc vitae dolor blandit. Elit enim massa etiam neque laoreet lorem sed.',
            rating: 5
        },
        {
            image: collection1,
            name: 'Sarah Jenkins',
            role: 'Product Designer',
            review: 'Excellent service and quality. The sarees are beautiful and exactly as pictured. Highly recommended!',
            rating: 5
        },
        {
            image: collection1,
            name: 'Michael Chen',
            role: 'Marketing Director',
            review: 'The collection is modern yet traditional. Great attention to detail and fabric quality.',
            rating: 5
        }
    ];

    const handlePrev = () => {
        setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    };

    const getCardClass = (index) => {
        const total = testimonials.length;
        if (index === activeIndex) return 'center-card';
        if (index === (activeIndex - 1 + total) % total) return 'prev-card';
        if (index === (activeIndex + 1) % total) return 'next-card';
        return 'hidden-card';
    };

    return (
        <section className="testimonials-section">
            <div className="container">
                <h2 className="section-title">Our Customer Testimonials</h2>
                
                <div className="carousel-wrapper">
                    <div className="carousel-container">
                        {testimonials.map((testimonial, index) => (
                            <div 
                                key={index} 
                                className={`carousel-item-wrapper ${getCardClass(index)}`}
                            >
                                <TestimonialCard testimonial={testimonial} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="carousel-controls">
                    <div className="arrow-wrapper">
                        <ArrowButton direction="left" onClick={handlePrev} />
                    </div>
                    <div className="arrow-wrapper">
                        <ArrowButton direction="right" onClick={handleNext} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
