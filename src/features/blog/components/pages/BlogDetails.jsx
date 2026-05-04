import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './BlogDetails.module.css';
import useBlogStore from '@/store/useBlogStore';
import BlogSection from '@/features/home/components/BlogSection/BlogSection';
import ContactHero from '@/features/contact/components/ContactHero/ContactHero';
import BlogDetailMain from '../../../../assets/images/blog/blog_detail_main.png';

const BlogDetails = () => {
    const { id } = useParams();
    const { selectedBlog: blog, fetchBlogById, loading } = useBlogStore();

    // Scroll to top and fetch data on mount
    useEffect(() => {
        window.scrollTo(0, 0);
        fetchBlogById(id);
    }, [id, fetchBlogById]);

    if (loading) return <div className={styles.loading}>Loading...</div>;
    if (!blog) return <div className={styles.error}>Blog post not found.</div>;

    const imageUrl = blog.image?.startsWith('/uploads') 
        ? `http://localhost:5000${blog.image}` 
        : (blog.image || BlogDetailMain);

    return (
        <div className={styles.blogDetailsPage}>
          <ContactHero/>
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