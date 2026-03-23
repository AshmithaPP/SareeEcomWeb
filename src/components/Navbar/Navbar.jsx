import React, { useState } from 'react';
import './navbar.css';
import Logo from '../../assets/images/Logo-SareeEcom.png';
import SearchIcon from '../../assets/icons/search-line.png';
import UserIcon from '../../assets/icons/contact.png';
import CartIcon from '../../assets/icons/shopping-cart.png';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(prev => !prev);

    return (
        <div className="navbar-wrapper">
            <div className="navbar-inner">
                {/* Logo */}
                <div className="logo-container">
                    <img
                        src={Logo}
                        alt="Kanchipuram Silk Logo"
                        className="logo-img"
                    />
                </div>

                {/* Desktop Nav */}
                <div className="nav-inner-content">
                    <div className={`nav-links${menuOpen ? ' show' : ''}`}>
                        <a href="#" className="nav-link active">Home</a>
                        <a href="#" className="nav-link">Shop Sarees</a>
                        <a href="#" className="nav-link">Occasions</a>
                        <a href="#" className="nav-link">Heritage</a>
                        <a href="#" className="nav-link">Blog</a>
                        <a href="#" className="nav-link">Contact Us</a>
                    </div>

                    <div className="nav-icons">
                        <div className="nav-icon">
                            <img src={SearchIcon} alt="Search" />
                        </div>
                        <div className="nav-icon">
                            <img src={UserIcon} alt="User" />
                        </div>
                        <div className="nav-icon">
                            <img src={CartIcon} alt="Cart" />
                        </div>
                    </div>

                    {/* Hamburger Button — visible only on mobile */}
                    <button
                        className="hamburger"
                        onClick={toggleMenu}
                        aria-label="Toggle navigation menu"
                        aria-expanded={menuOpen}
                    >
                        <span className={`hamburger-line${menuOpen ? ' open' : ''}`}></span>
                        <span className={`hamburger-line${menuOpen ? ' open' : ''}`}></span>
                        <span className={`hamburger-line${menuOpen ? ' open' : ''}`}></span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;