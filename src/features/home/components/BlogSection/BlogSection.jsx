import React, { useEffect } from 'react';
import BlogCard from './BlogCard';
import './blogSection.css';
import { IMAGE_BASE } from '@/config/api';

import Blog1 from 'assets/images/silk/Blog1.png';
import Blog2 from 'assets/images/silk/Blog2.png';
import Blog3 from 'assets/images/silk/Blog3.png';

import useBlogStore from '@/store/useBlogStore';

const BlogSection = ({ showTitle = true, title = "Our Blogs", customTitleClass = "", dynamicBlogs }) => {
  const { blogs: storeBlogs, fetchBlogs, loading } = useBlogStore();

  useEffect(() => {
    // Only fetch if we don't have dynamicBlogs, store is empty, and it's not currently loading
    if (!dynamicBlogs && storeBlogs.length === 0 && !loading) {
      fetchBlogs();
    }
  }, [dynamicBlogs, storeBlogs.length, loading, fetchBlogs]);

  const blogs = dynamicBlogs || storeBlogs;

  // Fallback for image paths if they are from the backend
  const getImageUrl = (image) => {
    if (!image) return '';
    if (image.startsWith('http')) return image;
    if (image.startsWith('/uploads')) return `${IMAGE_BASE}${image}`;
    return image;
  };

  return (
    <section className="blog-section">
      <div className="container blog-container">
        {showTitle && <h2 className={`blog-section-title ${customTitleClass}`}>{title}</h2>}
        <div className="row g-4 justify-content-center">
          {blogs.map((blog) => (
            <div className="col-lg-4 col-md-6 col-12 d-flex justify-content-center" key={blog.blog_id || blog.id}>
              <BlogCard 
                id={blog.slug || blog.blog_id || blog.id}
                title={blog.title}
                category={blog.category}
                date={blog.published_date || blog.date}
                image={getImageUrl(blog.image_url || blog.image)} 
                description={blog.excerpt || blog.subtitle || (blog.content ? blog.content.substring(0, 100).replace(/<[^>]*>?/gm, '') + '...' : '')}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
