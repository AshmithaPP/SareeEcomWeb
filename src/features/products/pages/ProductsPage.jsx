import React, { useEffect } from 'react';
import useProductStore from '@/store/useProductStore';
import Breadcrumbs from 'components/ui/Breadcrumbs/Breadcrumbs';
import FilterSidebar from 'features/products/components/Filters/FilterSidebar';
import ProductCard from 'features/products/components/ProductCard/ProductCard';
import Pagination from 'features/products/components/Pagination/Pagination';
import GiftSection from 'features/products/components/GiftSection/GiftSection';
import './productsPage.css';

const ProductsPage = () => {
    const { products, loading, error, fetchProducts } = useProductStore();

    useEffect(() => {
        fetchProducts({ page: 1, limit: 12 });
    }, [fetchProducts]);

    const handleFilterChange = (filters) => {
        console.log('Filters changed:', filters);
    };

    const breadcrumbItems = [
        { label: 'Home', path: '/' },
        { label: 'Shop', path: '/products' }
    ];

    if (error) {
        return (
            <div className="container py-5 text-center">
                <h3 className="text-danger">Error loading products</h3>
                <p>{error}</p>
                <button className="btn btn-primary mt-3" onClick={() => fetchProducts()}>Retry</button>
            </div>
        );
    }

    return (
        <div className="products-page-container container-fluid px-md-5 py-4">
            {/* Breadcrumbs Row */}
            <div className="row mb-3">
                <div className="col-12 d-flex justify-content-start">
                    <Breadcrumbs items={breadcrumbItems} />
                </div>
            </div>

            {/* Main Content Row */}
            <div className="row g-3 g-md-4">
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
                                <span className="products-count">
                                    {loading ? 'Loading...' : `Showing ${products.length} products`}
                                </span>

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
                        {loading ? (
                            [...Array(6)].map((_, i) => (
                                <div className="col" key={i}>
                                    <div className="product-card-skeleton" style={{ height: '350px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}></div>
                                </div>
                            ))
                        ) : products.length > 0 ? (
                            products.map((product) => (
                                <div className="col" key={product.id || product.product_id}>
                                    <ProductCard product={product} />
                                </div>
                            ))
                        ) : (
                            <div className="col-12 text-center py-5">
                                <p>No products found matching your criteria.</p>
                            </div>
                        )}
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
