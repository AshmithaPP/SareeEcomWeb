import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IMAGE_BASE } from '@/config/api';

import styles from './BlogDetails.module.css';
import useBlogStore from '@/store/useBlogStore';
import BlogSection from '@/features/home/components/BlogSection/BlogSection';
import ContactHero from '@/features/contact/components/ContactHero/ContactHero';
import BlogDetailMain from '../../../../assets/images/blog/blog_detail_main.png';

const BlogDetails = () => {
    const { id } = useParams();
    const { selectedBlog: blog, fetchBlogById, loading } = useBlogStore();

    // Fetch data when ID changes
    useEffect(() => {
        if (id) {
            fetchBlogById(id);
        }
    }, [id, fetchBlogById]);

    // Scroll to top when blog changes
    useEffect(() => {
        if (blog) {
            window.scrollTo(0, 0);
        }
    }, [blog]);

    if (loading) return <div className={styles.loading}>Loading...</div>;
    if (!blog) return <div className={styles.error}>Blog post not found.</div>;

    const imageUrl = (blog.image_url || blog.image)?.startsWith('/uploads') 
        ? `${IMAGE_BASE}${blog.image_url || blog.image}` 
        : (blog.image_url || blog.image || BlogDetailMain);

    return (
        <div className={styles.blogDetailsPage}>
            <header className={styles.heroSection}>
                <h1 className={styles.title}>
                    {blog.title}
                </h1>
                <p className={styles.subheading}>
                    {blog.subtitle}
                </p>
            </header>

            <main className={styles.mainContent}>
                {/* Main Hero Image */}
                <div className={styles.mainImageWrapper}>
                    <img 
                        src={imageUrl} 
                        alt={blog.title} 
                        className={styles.mainImage} 
                    />
                </div>

                {/* Article Body */}
                <article className={styles.articleBody}>
                    <div 
                        className={styles.dynamicContent} 
                        dangerouslySetInnerHTML={{ __html: blog.content }} 
                    />
                </article>
            </main>
            <BlogSection 
                title="Popular Posts" 
                customTitleClass={styles.popularPostsTitle} 
            />
        </div>
    );
};

export default BlogDetails;