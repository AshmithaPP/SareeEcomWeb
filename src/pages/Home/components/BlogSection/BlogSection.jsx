import React, { useEffect } from 'react';
import BlogCard from './BlogCard';
import './blogSection.css';
import Blog1 from '../../../../assets/images/silk/Blog1.png';
import Blog2 from '../../../../assets/images/silk/Blog2.png';
import Blog3 from '../../../../assets/images/silk/Blog3.png';

const blogs = [
  {
    id: 1,
    image: Blog1,
    category: "Travel",
    date: "13 March 2023",
    title: "Who is the best singer on chart? Know him?",
    description: "chart by Billboard which ranks the all-time greatest artists based on their performance on the weekly Billboard Hot 100 and",
    link: "#"
  },
  {
    id: 2,
    image: Blog2,
    category: "Travel",
    date: "13 March 2023",
    title: "Who is the best singer on chart? Know him?",
    description: "chart by Billboard which ranks the all-time greatest artists based on their performance on the weekly Billboard Hot 100 and",
    link: "#"
  },
  {
    id: 3,
    image: Blog3,
    category: "Travel",
    date: "13 March 2023",
    title: "Who is the best singer on chart? Know him?",
    description: "chart by Billboard which ranks the all-time greatest artists based on their performance on the weekly Billboard Hot 100 and",
    link: "#"
  }
];

const BlogSection = () => {
  useEffect(() => {
    // future API call here
  }, []);

  return (
    <section className="blog-section">
      <div className="container blog-container">
        <h2 className="section-title">Our Blogs</h2>
        <div className="row g-4 justify-content-center">
          {blogs.map((blog) => (
            <div className="col-lg-4 col-md-6 col-12 d-flex justify-content-center" key={blog.id}>
              <BlogCard {...blog} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
