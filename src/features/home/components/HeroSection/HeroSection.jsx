import React from 'react';
import { Link } from 'react-router-dom';
import './hero_section.css';
import heroRightFallback from 'assets/images/silk/heroRight.png';

const HeroSection = ({ dynamicData }) => {
    const IMAGE_BASE_URL = 'http://localhost:5000';
    
    // Default fallback if no data
    const displayData = {
        title: dynamicData?.title || 'Exquisite Hand-Woven Silk',
        subtitle: dynamicData?.subtitle || 'Tradition meets luxury in every thread.',
        buttonText: dynamicData?.cta?.text || dynamicData?.cta_text || 'Explore Collection',
        buttonLink: dynamicData?.cta?.redirect_url || dynamicData?.redirect_url || '/products',
        image: dynamicData?.image_url
    };

    const heroImage = displayData.image 
        ? (displayData.image.startsWith('http') ? displayData.image : `${IMAGE_BASE_URL}${displayData.image}`)
        : heroRightFallback;

    return (
        <section className="hero-section">
            <div className="container h-100">
                <div className="row h-100">
                    <div className="col-md-6 hero-left">
                        <h1 className="hero-title">{displayData.title}</h1>
                        <p className="hero-subtext">
                            {displayData.subtitle ? displayData.subtitle.split('.').map((text, index, array) => (
                                <React.Fragment key={index}>
                                    {text.trim()}{index < array.length - 1 ? '.' : ''}
                                    {index < array.length - 1 && <br />}
                                </React.Fragment>
                            )) : ''}
                        </p>
                        <Link to={displayData.buttonLink}>
                            <button className="hero-btn">{displayData.buttonText}</button>
                        </Link>
                    </div>
                    <div className="col-md-6 hero-right d-flex justify-content-end align-items-end d-none d-md-flex">
                        <img 
                            src={heroImage} 
                            alt={displayData.title} 
                            className="hero-img img-fluid" 
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};


export default HeroSection;

