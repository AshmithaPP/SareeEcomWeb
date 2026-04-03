import React from 'react';
import NewsletterSection from '@/features/home/components/NewsletterSection/NewsletterSection';
import Testimonials from '@/features/home/components/Testimonials/Testimonials';
import ContactHero from '@/features/contact/components/ContactHero/ContactHero';
import BlogSection from '@/features/home/components/BlogSection/BlogSection';
import '@/features/home/components/BlogSection/blogSection.css';

const BlogPage = () => {
    return (
        <div className="about_page">
            <ContactHero/>
            <BlogSection showTitle={true} />
            <BlogSection showTitle={false} />
            <BlogSection showTitle={false} />

            <Testimonials/>
             <NewsletterSection />
        </div>
    );
};

export default BlogPage;