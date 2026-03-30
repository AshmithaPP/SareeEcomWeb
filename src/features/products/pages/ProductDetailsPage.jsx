import React from 'react';
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
    // Array of quality badges data
    const qualityBadges = [
        { icon: '/icons/pure-silk.svg', title: 'Pure Silk', subtitle: 'Guarantee' },
        { icon: '/icons/handloom.svg', title: 'Handloom', subtitle: 'Certified' },
        { icon: '/icons/secure.svg', title: 'Secure', subtitle: 'Payment' }
    ];

    // Array for why choose this saree features
    const sareeFeatures = [
        "100% Pure Kanchipuram Silk",
        "Handwoven by Master Weavers",
        "Premium Zari Work",
        "Ideal for Wedding & Bridal Wear",
        "Long-lasting silk quality"
    ];

    // Data for the Authenticity Section
    const authenticityData = {
        heading: "Original from Kanchipuram",
        description: "Each saree is handwoven by master artisans from Kanchipuram, Tamil Nadu, preserving centuries-old weaving traditions. This saree comes with a Silk Mark certification and authenticity certificate, ensuring you receive genuine Kanchipuram silk.",
        stats: [
            { value: "25+", label: "Years Legacy" },
            { value: "50K+", label: "Happy Customers" },
            { value: "100%", label: "Authentic" }
        ],
        badgeImage: silkMarkIcon
    };

    return (
        <div className="product-details-page container-fluid px-md-5 py-4">
            {/* Breadcrumb Row */}
            <div className="row mb-3">
                <div className="col-12 d-flex justify-content-start">
                    <Breadcrumbs />
                </div>
            </div>

            {/* Main Content Area */}
            <div className="row g-5">
                {/* Left Column: Product Image Gallery */}
                <div className="col-lg-6 product-image-column">
                    <ProductImage />
                </div>

                {/* Right Column: Product Info & Actions */}
                <div className="col-lg-6 product-info-column text-start">
                    {/* Basic Info, Price, Actions */}
                    <ProductInfo />

                    {/* Quality Badges Row */}
                    <div className="quality-badges-section mt-4 d-flex justify-content-between flex-wrap gap-2">
                        {qualityBadges.map((badge, index) => (
                            <QualityBadge key={index} badge={badge} />
                        ))}
                    </div>

                    {/* Why Choose Section */}
                    <div className="why-choose-section mt-4">
                        <WhyChoose features={sareeFeatures} />
                    </div>
                </div>
            </div>

            {/* Product Specifications Section (Full width / container width row below) */}
            <div className="row mt-4 ">
                <div className="col-12">
                    <ProductSpecifications />
                </div>
            </div>

            {/* Authenticity Section */}
            <div className="row mb-4 ">
                <div className="col-12">
                    <AuthenticitySection {...authenticityData} />
                </div>
            </div>

            {/* Customer Reviews Section */}
            <div className="row mb-5">
                <div className="col-12">
                    <CustomerReviews />
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;
