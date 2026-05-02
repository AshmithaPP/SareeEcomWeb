import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './hero_section.css';
import useSettingsStore from '@/store/useSettingsStore';
import heroRightFallback from 'assets/images/silk/heroRight.png';

const HeroSection = () => {
    const { fetchSettings, getHeroSettings } = useSettingsStore();
    const heroSettings = getHeroSettings();

    useEffect(() => {
        fetchSettings();
    }, [fetchSettings]);

    const IMAGE_BASE_URL = 'http://localhost:5000';
    const heroImage = heroSettings.image 
        ? (heroSettings.image.startsWith('http') ? heroSettings.image : `${IMAGE_BASE_URL}${heroSettings.image}`)
        : heroRightFallback;

    return (
        <section className="hero-section">
            <div className="container h-100">
                <div className="row h-100">
                    <div className="col-md-6 hero-left">
                        <h1 className="hero-title">{heroSettings.title}</h1>
                        <p className="hero-subtext">
                            {heroSettings.subtitle.split('.').map((text, index, array) => (
                                <React.Fragment key={index}>
                                    {text.trim()}{index < array.length - 1 ? '.' : ''}
                                    {index < array.length - 1 && <br />}
                                </React.Fragment>
                            ))}
                        </p>
                        <Link to={heroSettings.buttonLink}>
                            <button className="hero-btn">{heroSettings.buttonText}</button>
                        </Link>
                    </div>
                    <div className="col-md-6 hero-right d-flex justify-content-end align-items-end d-none d-md-flex">
                        <img 
                            src={heroImage} 
                            alt={heroSettings.title} 
                            className="hero-img img-fluid" 
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};


export default HeroSection;

