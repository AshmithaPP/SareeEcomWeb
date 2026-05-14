import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { IMAGE_BASE } from '@/config/api';

import 'bootstrap-icons/font/bootstrap-icons.css';
import './Footer.css';
import LogoWhite from 'assets/images/logo/Logo-SareeEcom.png';
import footerCards from 'assets/images/footerCards.png';
import fbIcon from 'assets/icons/social/facebookicon.png';
import instaIcon from 'assets/icons/social/instaicon.png';
import linkedinIcon from 'assets/icons/social/linkedinicon.png';
import twitterIcon from 'assets/icons/social/twittericon.png';
import useSettingsStore from '@/store/useSettingsStore';

const Footer = () => {
    const { fetchSettings, getSiteInfo } = useSettingsStore();
    const siteInfo = getSiteInfo();

    useEffect(() => {
        fetchSettings();
    }, [fetchSettings]);

    const IMAGE_BASE_URL = IMAGE_BASE;
    const logoSrc = siteInfo.site_logo 
        ? (siteInfo.site_logo.startsWith('http') ? siteInfo.site_logo : `${IMAGE_BASE_URL}${siteInfo.site_logo}`)
        : LogoWhite;


    return (

        <footer className="footer-section">
            <div className="container footer-container">
                <div className="row footer-row">

                    {/* Column 1: Logo, Address, Contact, Socials */}
                    <div className="col-lg-3 col-md-6 mb-4 footer-col-info">
                        <div className="footer-logo-container">
                            <img 
                                src={logoSrc} 
                                alt={siteInfo.site_title || "Kanchipuram Silks Logo"} 
                                className="footer-logo" 
                                onError={(e) => {
                                    e.target.onerror = null; 
                                    e.target.src = LogoWhite;
                                }}
                            />
                        </div>

                        <p className="footer-text footer-address">
                            {siteInfo.address || <>No: 15, Krishna Kandha Building,<br />SA Garden, Saravanampatti,<br />Coimbatore, Tamil Nadu 641026</>}
                        </p>
                        <p className="footer-text footer-contact">
                            {siteInfo.phone || "1-202-555-0106"}<br />
                            {siteInfo.email || "help@shopper.com"}
                        </p>

                        <div className="social-icons">
                            <a href="#" className="social-icon-link">
                                <img src={twitterIcon} alt="Twitter" className="social-icon" />
                            </a>
                            <a href="#" className="social-icon-link">
                                <img src={fbIcon} alt="Facebook" className="social-icon" />
                            </a>
                            <a href="#" className="social-icon-link">
                                <img src={instaIcon} alt="Instagram" className="social-icon" />
                            </a>
                            <a href="#" className="social-icon-link">
                                <img src={linkedinIcon} alt="LinkedIn" className="social-icon" />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Supports */}
                    <div className="col-lg-2 col-md-6 mb-4 footer-col-links">
                        <h5 className="footer-heading">SUPPORTS</h5>
                        <ul className="footer-links-list">
                            <li><a href="#">Home</a></li>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Size Guide</a></li>
                            <li><a href="#">Shipping & Returns</a></li>
                            <li><a href="#">FAQ</a></li>
                            <li><a href="#">Privacy</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Shop */}
                    <div className="col-lg-2 col-md-6 mb-4 footer-col-links">
                        <h5 className="footer-heading">SHOP</h5>
                        <ul className="footer-links-list">
                            <li><a href="#">Saree Shopping</a></li>
                            <li><a href="#">Discount</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Company */}
                    <div className="col-lg-2 col-md-6 mb-4 footer-col-links">
                        <h5 className="footer-heading">COMPANY</h5>
                        <ul className="footer-links-list">
                            <li><a href="#">About</a></li>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">Affiliate</a></li>
                            <li><a href="#">Login</a></li>
                        </ul>
                    </div>

                    {/* Column 5: Secure Payments */}
                    <div className="col-lg-3 col-md-6 mb-4 footer-col-payments">
                        <h5 className="footer-heading">SECURE PAYMENTS</h5>
                        <div className="payment-icons-container">
                            <img src={footerCards} alt="Secure Payments Methods" className="payment-cards-img" />
                        </div>
                    </div>

                </div>
            </div>

            <div className="footer-divider-container">
                <hr className="footer-divider" />
            </div>

            <div className="container text-center">
                <p className="footer-copyright">
                    © {new Date().getFullYear()} {siteInfo.site_title || "Kanchipuram Silks"}. All Rights Reserved.
                </p>
            </div>

        </footer>
    );
};

export default Footer;