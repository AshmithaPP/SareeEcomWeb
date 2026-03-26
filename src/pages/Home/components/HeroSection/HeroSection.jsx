import React from 'react';
import './hero_section.css';
import heroRight from '../../../../assets/images/silk/heroRight.png';

const HeroSection = () => {
    return (
        <section className="hero-section">
            <div className="container h-100">
                <div className="row h-100">
                    <div className="col-md-6 hero-left">
                        <h1 className="hero-title">Timeless Kanchipuram Silk Sarees</h1>
                        <p className="hero-subtext">
                            Handwoven heritage. Pure mulberry silk.<br />
                            Authentic zari.
                        </p>
                        <button className="hero-btn">Explore Collections</button>
                    </div>
                    <div className="col-md-6 hero-right d-flex justify-content-end align-items-end d-none d-md-flex">
                        <img src={heroRight} alt="Saree Model" className="hero-img img-fluid" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
