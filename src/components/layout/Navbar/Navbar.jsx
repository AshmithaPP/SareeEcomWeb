import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';
import Logo from 'assets/images/logo/Logo-SareeEcom.png';
import SearchIcon from 'assets/icons/ui/search-line.png';
import UserIcon from 'assets/icons/ui/contact.png';
import CartIcon from 'assets/icons/ui/shopping-cart.png';
import { useWishlist } from 'context/WishlistContext';
import { useCart } from 'context/CartContext';
import useSettingsStore from '@/store/useSettingsStore';
import useAuthStore from '@/store/useAuthStore';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { wishlistItems } = useWishlist();
    const { cartItems } = useCart();
    const { fetchSettings, getSiteInfo } = useSettingsStore();
    const { user, isAuthenticated, logout } = useAuthStore();
    const navigate = useNavigate();
    const [profileOpen, setProfileOpen] = useState(false);
    const siteInfo = getSiteInfo();

    useEffect(() => {
        fetchSettings();
    }, [fetchSettings]);

    const IMAGE_BASE_URL = 'http://localhost:5000';
    const logoSrc = siteInfo.site_logo 
        ? (siteInfo.site_logo.startsWith('http') ? siteInfo.site_logo : `${IMAGE_BASE_URL}${siteInfo.site_logo}`)
        : Logo;


    const toggleMenu = () => setMenuOpen(prev => !prev);

    // Body scroll lock for premium UX
    useEffect(() => {
        if (menuOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
        return () => document.body.classList.remove('no-scroll');
    }, [menuOpen]);

    const handleLogout = async () => {
        await logout();
        setProfileOpen(false);
        navigate('/');
    };

    // Close profile dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileOpen && !event.target.closest('.user-profile-nav')) {
                setProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [profileOpen]);

    return (
        <div className="navbar-wrapper">
            <div 
                className={`menu-backdrop${menuOpen ? ' show' : ''}`} 
                onClick={() => setMenuOpen(false)}
            ></div>
            <div className="navbar-inner">
                {/* Logo */}
                <div className="logo-container">
                    <img
                        src={logoSrc}
                        alt={siteInfo.site_title || "Kanchipuram Silk Logo"}
                        className="logo-img"
                        onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src = Logo;
                        }}
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
                        <NavLink to="/about" className="nav-link">About Us</NavLink>

                        <div className="nav-icons mobile-only-icons">
                            <div className="nav-icon">
                                <img src={SearchIcon} alt="Search" />
                            </div>
                            <div className="nav-user-wrapper user-profile-nav">
                                {isAuthenticated ? (
                                    <div className="profile-trigger" onClick={() => setProfileOpen(!profileOpen)}>
                                        <img src={UserIcon} alt="Profile" />
                                        {profileOpen && (
                                            <div className="profile-dropdown">
                                                <div className="dropdown-header">
                                                    <p className="user-name">{user?.name || 'User'}</p>
                                                    <p className="user-email">{user?.email || ''}</p>
                                                </div>
                                                <NavLink to="/profile" className="dropdown-item">My Profile</NavLink>
                                                <NavLink to="/orders" className="dropdown-item">My Orders</NavLink>
                                                <button onClick={handleLogout} className="dropdown-item logout-btn">Logout</button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <NavLink to="/login" className="nav-icon-link">
                                        <img src={UserIcon} alt="User" />
                                        <span className="icon-text">Sign In</span>
                                    </NavLink>
                                )}
                            </div>
                            <NavLink 
                                to={isAuthenticated ? "/wishlist" : "/login"} 
                                className="nav-icon wishlist-nav-icon"
                            >
                                <i className="bi bi-heart thick-heart"></i>
                                {isAuthenticated && wishlistItems.length > 0 && (
                                    <span className="wishlist-badge">{wishlistItems.length}</span>
                                )}
                            </NavLink>
                            <NavLink 
                                to={isAuthenticated ? "/cart" : "/login"} 
                                className="nav-icon cart-nav-icon"
                            >
                                <img src={CartIcon} alt="Cart" />
                                {isAuthenticated && cartItems.length > 0 && (
                                    <span className="cart-badge">{cartItems.length}</span>
                                )}
                            </NavLink>
                        </div>
                    </div>

                    <div className="nav-icons desktop-only-icons">
                        <div className="nav-icon">
                            <img src={SearchIcon} alt="Search" />
                        </div>
                        <div className="nav-user-wrapper user-profile-nav">
                            {isAuthenticated ? (
                                <div className="profile-trigger" onClick={() => setProfileOpen(!profileOpen)}>
                                    <img src={UserIcon} alt="Profile" />
                                    {profileOpen && (
                                        <div className="profile-dropdown">
                                            <div className="dropdown-header">
                                                <p className="user-name">{user?.name || 'User'}</p>
                                                <p className="user-email">{user?.email || ''}</p>
                                            </div>
                                            <NavLink to="/profile" className="dropdown-item">My Profile</NavLink>
                                            <NavLink to="/orders" className="dropdown-item">My Orders</NavLink>
                                            <button onClick={handleLogout} className="dropdown-item logout-btn">Logout</button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <NavLink to="/login" className="nav-icon-link">
                                    <img src={UserIcon} alt="User" />
                                    <span className="icon-text">Sign In</span>
                                </NavLink>
                            )}
                        </div>
                        <NavLink 
                            to={isAuthenticated ? "/wishlist" : "/login"} 
                            className="nav-icon wishlist-nav-icon"
                        >
                            <i className="bi bi-heart thick-heart"></i>
                            {isAuthenticated && wishlistItems.length > 0 && (
                                <span className="wishlist-badge">{wishlistItems.length}</span>
                            )}
                        </NavLink>
                        <NavLink 
                            to={isAuthenticated ? "/cart" : "/login"} 
                            className="nav-icon cart-nav-icon"
                        >
                            <img src={CartIcon} alt="Cart" />
                            {isAuthenticated && cartItems.length > 0 && (
                                <span className="cart-badge">{cartItems.length}</span>
                            )}
                        </NavLink>
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