import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';
import Logo from '../../assets/images/logo/Logo-SareeEcom.png';
import SearchIcon from '../../assets/icons/ui/search-line.png';
import UserIcon from '../../assets/icons/ui/contact.png';
import CartIcon from '../../assets/icons/ui/shopping-cart.png';
import { useWishlist } from '../../context/WishlistContext';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { wishlistItems } = useWishlist();

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
                        <NavLink to="/" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} end>Home</NavLink>
                        <NavLink to="/products" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Shop Sarees</NavLink>
                        <NavLink to="/occasions" className="nav-link">Occasions</NavLink>
                        <NavLink to="/heritage" className="nav-link">Heritage</NavLink>
                        <NavLink to="/blog" className="nav-link">Blog</NavLink>
                        <NavLink to="/contact" className="nav-link">Contact Us</NavLink>
                    </div>

                    <div className="nav-icons">
                        <div className="nav-icon">
                            <img src={SearchIcon} alt="Search" />
                        </div>
                        <div className="nav-icon">
                            <img src={UserIcon} alt="User" />
                        </div>
                        <NavLink to="/wishlist" className="nav-icon wishlist-nav-icon">
                            <i className="bi bi-heart"></i>
                            {wishlistItems.length > 0 && (
                                <span className="wishlist-badge">{wishlistItems.length}</span>
                            )}
                        </NavLink>
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