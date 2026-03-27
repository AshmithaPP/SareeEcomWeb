import React from 'react';
import Breadcrumbs from '../../components/common/Breadcrumbs/Breadcrumbs';
import FilterSidebar from './components/Filters/FilterSidebar';
import ProductCard from './components/ProductCard/ProductCard';
import Pagination from './components/Pagination/Pagination';
import GiftSection from './components/GiftSection/GiftSection';
import { mockProducts } from './data/products';
import './productsPage.css';

const ProductsPage = () => {
    const handleFilterChange = (filters) => {
        console.log('Filters changed:', filters);
        // Future API hook integration will go here
    };

    const breadcrumbItems = [
        { label: 'Home', path: '/' },
        { label: 'Shop', path: '/products' }
    ];

    return (
        <div className="products-page-container container-fluid px-md-5 py-4">
            {/* Breadcrumbs Row */}
            <div className="row mb-3">
                <div className="col-12 d-flex justify-content-start">
                    <Breadcrumbs items={breadcrumbItems} />
                </div>
            </div>

            {/* Main Content Row */}
            <div className="row g-4">
                {/* Left Sidebar Filters */}
                <div className="col-lg-3 col-md-4">
                    <FilterSidebar onFilterChange={handleFilterChange} />
                </div>

                {/* Right Side Content Grid */}
                <div className="col-lg-9 col-md-8">
                    {/* Header Section */}
                    <div className="row mb-4">
                        <div className="col-12 d-flex justify-content-between align-items-center">
                            <h2 className="products-title">Kanchipuram Silk Sarees</h2>

                            <div className="products-meta-controls d-flex align-items-center">
                                <span className="products-count">Showing 1-12 of 156 products</span>

                                <div className="sort-dropdown">
                                    <button className="sort-btn">
                                        <span className="sort-text">Featured</span>
                                        <svg width="21" height="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="sort-arrow">
                                            <path d="M6 9L12 15L18 9" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
                        {mockProducts.map((product) => (
                            <div className="col" key={product.id}>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>

                    {/* Pagination Section */}
                    <div className="row">
                        <div className="col-12">
                            <Pagination />
                        </div>
                    </div>
                </div>
            </div>

            {/* Gift Section */}
            <div className="row mt-5">
                <div className="col-12">
                    <GiftSection />
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;
