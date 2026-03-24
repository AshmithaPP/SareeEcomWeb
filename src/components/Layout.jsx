import React from 'react';
import TopBar from './TopBar/TopBar';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import './Layout.css';

const Layout = ({ children }) => {
    return (
        <div className="layout-container">
            <TopBar />
            <Navbar />
            <main className="main-content">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
