import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';
import Logo from '../../assets/images/logo/Logo-SareeEcom.png';
import SearchIcon from '../../assets/icons/ui/search-line.png';
import UserIcon from '../../assets/icons/ui/contact.png';
import CartIcon from '../../assets/icons/ui/shopping-cart.png';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { wishlistItems } = useWishlist();
    const { cartItems } = useCart();

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

                        <div className="nav-icons mobile-only-icons">
                            <div className="nav-icon">
                                <img src={SearchIcon} alt="Search" />
                            </div>
                            <div className="nav-icon">
                                <img src={UserIcon} alt="User" />
                            </div>
                            <NavLink to="/wishlist" className="nav-icon wishlist-nav-icon">
                                <i className="bi bi-heart thick-heart"></i>
                                {wishlistItems.length > 0 && (
                                    <span className="wishlist-badge">{wishlistItems.length}</span>
                                )}
                            </NavLink>
                            <NavLink to="/cart" className="nav-icon cart-nav-icon">
                                <img src={CartIcon} alt="Cart" />
                                {cartItems.length > 0 && (
                                    <span className="cart-badge">{cartItems.length}</span>
                                )}
                            </NavLink>
                        </div>
                    </div>

                    <div className="nav-icons desktop-only-icons">
                        <div className="nav-icon">
                            <img src={SearchIcon} alt="Search" />
                        </div>
                        <div className="nav-icon">
                            <img src={UserIcon} alt="User" />
                        </div>
                        <NavLink to="/wishlist" className="nav-icon wishlist-nav-icon">
                            <i className="bi bi-heart thick-heart"></i>
                            {wishlistItems.length > 0 && (
                                <span className="wishlist-badge">{wishlistItems.length}</span>
                            )}
                        </NavLink>
                        <NavLink to="/cart" className="nav-icon cart-nav-icon">
                            <img src={CartIcon} alt="Cart" />
                            {cartItems.length > 0 && (
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