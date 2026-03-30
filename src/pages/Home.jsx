import React from 'react';
import HeroSection from 'features/home/components/HeroSection/HeroSection';
import CategoriesSection from 'features/home/components/CategoriesSection/CategoriesSection';
import ShopByCollections from 'features/home/components/ShopByCollections/ShopByCollections';
import ShopByOccasion from 'features/home/components/ShopByOccasion/ShopByOccasion';
import TrendingPicks from 'features/home/components/TrendingPicks/TrendingPicks';
import ShopByPrice from 'features/home/components/ShopByPrice/ShopByPrice';
import Testimonials from 'features/home/components/Testimonials/Testimonials';
import BlogSection from 'features/home/components/BlogSection/BlogSection';
import NewsletterSection from 'features/home/components/NewsletterSection/NewsletterSection';

// Hero Images & Static Assets
import cottonS1 from 'assets/images/cotton/cottonS1.png';
import cottonS2 from 'assets/images/cotton/cottonS2.png';
import cottonS3 from 'assets/images/cotton/cottonS3.png';
import cottonS4 from 'assets/images/silk/cottonS4.png';

import traditional_silk from 'assets/images/bridal/traditional_silk.png';
import bridal_saree from 'assets/images/bridal/bridal_saree.png';
import lightweight_silk from 'assets/images/bridal/lightweight_silk.png';

import collection1 from 'assets/images/silk/collection1.png';
import collection2 from 'assets/images/silk/collection2.png';
import collection3 from 'assets/images/silk/collection3.png';

const cottonProducts = [
  { id: 'cotton_1', discount: "20%", discountBg: "#10B981", title: "Bridal Kanchipuram Silk Saree", discountedPrice: "₹24,999", originalPrice: "₹29,999", image: cottonS1 },
  { id: 'cotton_2', discount: "30%", discountBg: "#E11D48", title: "Traditional Kanchipuram Silk Saree", discountedPrice: "₹24,999", originalPrice: "₹29,999", image: cottonS2 },
  { id: 'cotton_3', discount: "30%", discountBg: "#E11D48", title: "Light Weight Silk Saree", discountedPrice: "₹24,999", originalPrice: "₹29,999", image: cottonS3 },
  { id: 'cotton_4', discount: "50%", discountBg: "#F59E0B", title: "Traditional Kanchipuram Silk Saree", discountedPrice: "₹24,999", originalPrice: "₹29,999", image: cottonS4 }
];

const newArrivalsProducts = [
  { id: 'arrival_1', discount: "20%", discountBg: "#10B981", title: "Bridal Kanchipuram Silk", discountedPrice: "₹24,999", originalPrice: "₹29,999", image: collection1 },
  { id: 'arrival_2', discount: "30%", discountBg: "#E11D48", title: "Traditional Silk Saree", discountedPrice: "₹21,999", originalPrice: "₹25,999", image: traditional_silk },
  { id: 'arrival_3', discount: "30%", discountBg: "#E11D48", title: "Light Weight Saree", discountedPrice: "₹18,999", originalPrice: "₹22,999", image: lightweight_silk },
  { id: 'arrival_4', discount: "50%", discountBg: "#F59E0B", title: "Rich Zari Silk Saree", discountedPrice: "₹27,999", originalPrice: "₹32,999", image: collection2 }
];

const bridalProducts = [
  { id: 'bridal_1', discount: "20%", discountBg: "#10B981", title: "Bridal Special Saree", discountedPrice: "₹34,999", originalPrice: "₹39,999", image: bridal_saree },
  { id: 'bridal_2', discount: "30%", discountBg: "#E11D48", title: "Vibrant Silk Saree", discountedPrice: "₹21,999", originalPrice: "₹25,999", image: traditional_silk },
  { id: 'bridal_3', discount: "30%", discountBg: "#E11D48", title: "Elegant Light Saree", discountedPrice: "₹18,999", originalPrice: "₹22,999", image: lightweight_silk },
  { id: 'bridal_4', discount: "50%", discountBg: "#F59E0B", title: "Bridal Special Saree", discountedPrice: "₹34,999", originalPrice: "₹39,999", image: bridal_saree }
];


const Home = () => {
    return (
        <>
            <HeroSection />
            <CategoriesSection />
            <ShopByCollections />
            <ShopByCollections
                title="Best Selling Kanchipuram Silk Sarees"
                subtitle="Our customers' most loved designs"
                products={cottonProducts}
            />
            <ShopByCollections
                title="New Arrivals - Kanchipuram Silk Sarees"
                subtitle="Fresh designs from our master weavers"
                products={newArrivalsProducts}
            />
            <ShopByCollections
                title="Bridal Kanchipuram Silk Sarees"
                subtitle="Exquisite designs for your special day"
                products={bridalProducts}
            />
            <ShopByOccasion />
            <TrendingPicks />
            <ShopByPrice />
            <Testimonials />
            <BlogSection />
            <NewsletterSection />
        </>
    );
};

export default Home;
