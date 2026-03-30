import React from 'react';
import './sidebar.css';
import profileImg from '../../../../assets/icons/ui/contact.png'; // Fallback if no actual image

const Sidebar = () => {
    return (
        <div className="wishlist-sidebar">
            <div className="profile-section text-center">
                <div className="profile-img-container mx-auto">
                    {/* Placeholder image similar to the design */}
                    <img 
                        src="https://img.freepik.com/free-photo/beautiful-young-woman-with-clean-fresh-skin_186202-6019.jpg" 
                        alt="Adam Vishnoi" 
                        className="profile-img" 
                        onError={(e) => e.target.src = profileImg}
                    />
                </div>
                <h4 className="user-name mt-3 mb-1">Adam Vishnoi</h4>
                <p className="user-country text-muted">Australia</p>
            </div>

            <div className="dashboard-nav">
                <div className="nav-header">
                    Dashboard Navigation
                </div>
                <ul className="nav-list list-unstyled mb-0">
                    <li className="nav-item">
                        <a href="#" className="nav-link">
                            <i className="bi bi-box-seam nav-icon"></i> My Orders
                        </a>
                    </li>
                    <li className="nav-item active">
                        <a href="/wishlist" className="nav-link">
                            <i className="bi bi-heart nav-icon"></i> Wishlist
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link">
                            <i className="bi bi-geo-alt nav-icon"></i> Addresses
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link">
                            <i className="bi bi-person nav-icon"></i> Profile Info
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link">
                            <i className="bi bi-power nav-icon"></i> Logout
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
