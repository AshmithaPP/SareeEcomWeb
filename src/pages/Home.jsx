import React, { useEffect } from "react";
import { useHomeStore } from "@/store/homeStore";
import { IMAGE_BASE } from '@/config/api';

import HeroSection from "features/home/components/HeroSection/HeroSection";
import CategoriesSection from "features/home/components/CategoriesSection/CategoriesSection";
import ShopByCollections from "features/home/components/ShopByCollections/ShopByCollections";
import ShopByOccasion from "features/home/components/ShopByOccasion/ShopByOccasion";
import Testimonials from "features/home/components/Testimonials/Testimonials";
import BlogSection from "features/home/components/BlogSection/BlogSection";
import NewsletterSection from "features/home/components/NewsletterSection/NewsletterSection";
import TrendingPicks from "features/home/components/TrendingPicks/TrendingPicks";
import ShopByPrice from "features/home/components/ShopByPrice/ShopByPrice";

/**
 * 🎨 DYNAMIC HOMEPAGE COMPONENTS
 * Wrappers to ensure we follow the user's requested naming convention and prop structure
 */

const HomeHero = ({ data }) => <HeroSection dynamicData={data} />;

const CollectionsGrid = ({ data }) => <CategoriesSection dynamicCategories={data} />;

const IMAGE_BASE_URL = IMAGE_BASE;

const mapHomeProduct = (p) => {
  const pid = p.product_id || p.id || (p.product && (p.product.product_id || p.product.id));
  return {
    ...p,
    id: pid,
    product_id: pid,
    title: p.product_name || p.name || p.title || (p.product && (p.product.product_name || p.product.name)),
    discountedPrice: p.price ? (String(p.price).startsWith('₹') ? p.price : `₹${p.price}`) : p.discountedPrice,
    originalPrice: p.original_price ? (String(p.original_price).startsWith('₹') ? p.original_price : `₹${p.original_price}`) : p.originalPrice,
    image: p.image_url ? (p.image_url.startsWith('http') ? p.image_url : `${IMAGE_BASE_URL}${p.image_url}`) : (p.image || (p.product && p.product.image_url ? `${IMAGE_BASE_URL}${p.product.image_url}` : '')),
    discount: p.discount_percentage > 0 ? `${p.discount_percentage}% OFF` : (p.discount || null),
    rating: p.rating ? (typeof p.rating === 'object' ? p.rating : { average: p.rating, count: p.reviews_count || 0 }) : null,
    stockStatus: p.stock_status || p.stockStatus || 'in_stock',
    slug: p.slug || (p.product && p.product.slug) || pid
  };
};

const ProductCarousel = ({ title, data }) => (
  <ShopByCollections 
    title={title} 
    products={data.map(mapHomeProduct)} 
  />
);

const ProductSection = ({ data }) => (
  <ShopByCollections 
    title={data.title} 
    products={data.products.map(mapHomeProduct)} 
  />
);

const ShopByOccasionWrapper = ({ data }) => <ShopByOccasion dynamicData={data} />;

const BlogPreviewSection = ({ data }) => <BlogSection dynamicBlogs={data} />;

const Newsletter = ({ data }) => <NewsletterSection dynamicData={data} />;

const HomePage = () => {
  const { homeData, fetchHomeData, loading, error } = useHomeStore();

  useEffect(() => {
    fetchHomeData();
  }, [fetchHomeData]);

  if (loading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger">{error}</div>
        <button className="btn btn-primary mt-3" onClick={() => fetchHomeData()}>Retry</button>
      </div>
    );
  }

  if (!homeData) return null;

  return (
    <main className="homepage-content">
      {/* 🚀 HERO SECTION */}
      {homeData.hero_section && <HomeHero data={homeData.hero_section} />}

      {/* 📂 COLLECTIONS GRID */}
      {homeData.collections?.length > 0 && (
        <CollectionsGrid data={homeData.collections} />
      )}

      {/* ⭐ FEATURED PRODUCTS */}
      {homeData.featured_products?.length > 0 && (
        <ProductCarousel title="Featured Collection" data={homeData.featured_products} />
      )}

      {/* 🏷️ DYNAMIC PRODUCT SECTIONS */}
      {homeData.product_sections?.map((section) => (
        <ProductSection key={section.section_id} data={section} />
      ))}

      {/* 🎯 SHOP BY OCCASION */}
      {homeData.shop_by_occasion?.length > 0 && (
        <ShopByOccasionWrapper data={homeData.shop_by_occasion} />
      )}

      {/* 🔥 TRENDING CATEGORIES */}
      {homeData.trending_categories?.length > 0 && (
        <TrendingPicks data={homeData.trending_categories} />
      )}

      {/* 💰 SHOP BY PRICE */}
      {homeData.price_filters?.length > 0 && (
        <ShopByPrice data={homeData.price_filters} />
      )}

      {/* 💬 TESTIMONIALS */}
      {homeData.testimonials?.length > 0 && (
        <Testimonials dynamicTestimonials={homeData.testimonials} />
      )}

      {/* 📝 BLOGS */}
      {homeData.blogs?.length > 0 && (
        <BlogPreviewSection data={homeData.blogs} />
      )}

      {/* 📧 NEWSLETTER */}
      {homeData.newsletter && (
        <Newsletter data={homeData.newsletter} />
      )}
    </main>
  );
};

export default HomePage;
