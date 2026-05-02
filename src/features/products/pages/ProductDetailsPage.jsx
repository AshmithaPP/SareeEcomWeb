import React, { useEffect } from 'react';
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
import silkMarkIcon from 'assets/icons/ui/silkmarkicon.png';
import './productDetailsPage.css';

const ProductDetailsPage = () => {
    const { slug } = useParams();
    const { selectedProduct: product, loading, error, fetchProductBySlug } = useProductStore();

    useEffect(() => {
        if (slug) {
            fetchProductBySlug(slug);
        }
    }, [slug, fetchProductBySlug]);

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

    return (
        <div className="product-details-page container-fluid px-md-5 py-4">
            {/* Breadcrumb Row */}
            <div className="row mb-3">
                <div className="col-12 d-flex justify-content-start">
                    <Breadcrumbs />
                </div>
            </div>

            {/* Main Content Area */}
            <div className="row g-3 g-md-4 g-lg-5">
                {/* Left Column: Product Image Gallery */}
                <div className="col-lg-6 product-image-column">
                    <ProductImage 
                        media={product.selectedVariant?.images || product.media} 
                        video={product.video || product.media?.video}
                    />
                </div>

                {/* Right Column: Product Info & Actions */}
                <div className="col-lg-6 product-info-column text-start">
                    {/* Basic Info, Price, Actions */}
                    <ProductInfo product={product} />

                    {/* Quality Badges Row */}
                    <div className="quality-badges-section mt-4 d-flex justify-content-between flex-wrap gap-2">
                        {qualityBadges.map((badge, index) => (
                            <QualityBadge key={index} badge={badge} />
                        ))}
                    </div>

                    {/* Why Choose Section */}
                    <div className="why-choose-section mt-4">
                        <WhyChoose features={features} />
                    </div>
                </div>
            </div>

            {/* Product Specifications Section (Full width / container width row below) */}
            <div className="row mt-4 ">
                <div className="col-12">
                    <ProductSpecifications 
                        specifications={product.specifications} 
                        careInstructions={product.careInstructions || product.care_instructions}
                    />
                </div>
            </div>

            {/* Authenticity Section */}
            {authenticityData && (
                <div className="row mb-4 ">
                    <div className="col-12">
                        <AuthenticitySection {...authenticityData} />
                    </div>
                </div>
            )}

            {/* Customer Reviews Section */}
            <div className="row mb-5">
                <div className="col-12">
                    <CustomerReviews productId={product.product_id || product.id} />
                </div>
            </div>

        </div>
    );
};

export default ProductDetailsPage;
