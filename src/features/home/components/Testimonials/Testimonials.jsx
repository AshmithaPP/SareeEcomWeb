import TestimonialCard from './TestimonialCard';
import ArrowButton from 'components/common/ArrowButton';
import './testimonials.css';
import collection1 from 'assets/images/bridal/testimonial.png';
import { useState } from 'react';

const Testimonials = ({ dynamicTestimonials }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const IMAGE_BASE_URL = 'http://localhost:5000';

    const testimonials = (dynamicTestimonials && dynamicTestimonials.length > 0) ? dynamicTestimonials.map(t => ({
        image: t.image_url ? (t.image_url.startsWith('http') ? t.image_url : `${IMAGE_BASE_URL}${t.image_url}`) : collection1,
        name: t.customer_name,
        role: t.designation,
        review: t.comment,
        rating: Math.floor(t.rating || 5)
    })) : [];

    if (testimonials.length === 0) return null;

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
                <h2 className="testimonials-section-title">Our Customer Testimonials</h2>
                
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
