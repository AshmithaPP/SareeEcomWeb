import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import useProductStore from '@/store/useProductStore';
import Breadcrumbs from 'components/ui/Breadcrumbs/Breadcrumbs';
import ProductImage from 'features/products/components/ProductImage/ProductImage';
import ProductInfo from 'features/products/components/ProductInfo/ProductInfo';
import QualityBadge from 'features/products/components/QualityBadge/QualityBadge';
import WhyChoose from 'features/products/components/WhyChoose/WhyChoose';
import ProductSpecifications from 'features/products/components/ProductSpecifications/ProductSpecifications';
import AuthenticitySection from 'features/products/components/AuthenticitySection/AuthenticitySection';
import CustomerReviews from 'features/products/components/CustomerReviews/CustomerReviews';
import ProductCard from 'features/products/components/ProductCard/ProductCard';
import ArrowButton from 'components/common/ArrowButton';
import './productDetailsPage.css';

const ProductDetailsPage = () => {
    const { slug } = useParams();
    const { selectedProduct: product, loading, error, fetchProductBySlug } = useProductStore();

    useEffect(() => {
        if (slug) {
            fetchProductBySlug(slug);
        }
    }, [slug, fetchProductBySlug]);

    // Carousel Logic
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    };

    const handleScroll = (direction) => {
        if (!scrollRef.current) return;
        const scrollAmount = 300; // Consistent scroll step
        const offset = direction === 'left' ? -scrollAmount : scrollAmount;
        scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    };

    useEffect(() => {
        const currentRef = scrollRef.current;
        if (currentRef) {
            currentRef.addEventListener('scroll', checkScroll);
            setTimeout(checkScroll, 100);
        }
        return () => {
            if (currentRef) currentRef.removeEventListener('scroll', checkScroll);
        };
    }, [product?.related_products]);

    // Dynamically derive quality badges from API
    const qualityBadges = product?.trustBadges || [];

    // Dynamically derive features from API highlights
    const features = product?.highlights || [];

    // Dynamically derive Authenticity Section data
    const hasAuthenticityData = (product?.originInfo && Object.keys(product.originInfo).length > 0) || (product?.stats && product.stats.length > 0);
    const authenticityData = hasAuthenticityData ? {
        heading: product?.originInfo?.heading || '',
        description: product?.originInfo?.description || '',
        stats: product?.stats || [],
        badgeImage: product?.originInfo?.badgeImage || null
    } : null;

    if (loading) {
        return <div className="container py-5 text-center"><h3>Loading Product Details...</h3></div>;
    }

    if (error) {
        return <div className="container py-5 text-center"><h3 className="text-danger">Error: {error}</h3></div>;
    }

    if (!product) {
        return <div className="container py-5 text-center"><h3>Product not found.</h3></div>;
    }

    const breadcrumbItems = (product.breadcrumb || []).map(b => ({
        label: b.name,
        path: b.link
    }));

    return (
        <div className="product-details-page container-fluid px-md-4 py-3">
            {/* Breadcrumb Row */}
            <div className="row mb-3">
                <div className="col-12 d-flex justify-content-start">
                    <Breadcrumbs items={breadcrumbItems} />
                </div>
            </div>

            {/* Main Content Area */}
            <div className="row g-3 g-md-4 align-items-start">
                {/* Left Column: Product Image Gallery */}
                <div className="col-lg-6 product-image-column">
                    <ProductImage
                        media={product.selected_variant?.images || product.media}
                        video={product.media?.video}
                    />
                </div>

                {/* Right Column: Product Info & Actions */}
                <div className="col-lg-6 product-info-column text-start">
                    {/* Basic Info, Price, Actions */}
                    <ProductInfo product={product} />

                    {/* Trust Badges Row - Moved back here to fix overlap */}
                    <div className="quality-badges-section mt-3 d-flex justify-content-start flex-wrap gap-2">
                        {(product.trust_badges || []).map((badge, index) => {
                            const badgeData = typeof badge === 'string' ? { title: badge } : badge;
                            return <QualityBadge key={index} badge={badgeData} />;
                        })}
                    </div>

                    {/* Features / Services Highlights - Moved back here to fix overlap */}
                    <div className="why-choose-section mt-3">
                        <WhyChoose features={product.highlights || []} />
                    </div>
                </div>
            </div>

            {/* Product Specifications Section */}
            <div className="row mt-3">
                <div className="col-12">
                    <ProductSpecifications
                        specifications={product.specifications || []}
                        services={product.services || []}
                    />
                </div>
            </div>

            {/* Related Products Section */}
            {product.related_products?.length > 0 && (
                <div className="row mt-5 mb-4 justify-content-center">
                    <div className="col-12">
                        <h3 className="section-title mb-4 text-center">Related Products</h3>
                        
                        <div className="related-carousel-wrapper position-relative">
                            <div className="carousel-arrow arrow-left">
                                <ArrowButton
                                    direction="left"
                                    onClick={() => handleScroll('left')}
                                    disabled={!canScrollLeft}
                                />
                            </div>

                            <div className="related-products-track" ref={scrollRef}>
                                {product.related_products.map((item) => (
                                    <div className="related-product-card" key={item.product_id}>
                                        <ProductCard product={{
                                            ...item,
                                            title: item.name,
                                            image: item.image_url,
                                            discountedPrice: `₹${parseFloat(item.price).toLocaleString('en-IN')}`
                                        }} />
                                    </div>
                                ))}
                            </div>

                            <div className="carousel-arrow arrow-right">
                                <ArrowButton
                                    direction="right"
                                    onClick={() => handleScroll('right')}
                                    disabled={!canScrollRight}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Customer Reviews Section */}
            <div className="row mb-5">
                <div className="col-12">
                    <CustomerReviews productId={product.product_id} />
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;
