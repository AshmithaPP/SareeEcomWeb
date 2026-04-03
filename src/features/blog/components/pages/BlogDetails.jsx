import React, { useEffect } from 'react';
import styles from './BlogDetails.module.css';
import BlogDetailMain from '../../../../assets/images/blog/blog_detail_main.png';
import BlogDetailTexture from '../../../../assets/images/blog/blog_detail_texture.png';
import BlogSection from '@/features/home/components/BlogSection/BlogSection';
import ContactHero from '@/features/contact/components/ContactHero/ContactHero';

const BlogDetails = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={styles.blogDetailsPage}>
          <ContactHero/>
            <header className={styles.heroSection}>
                <h1 className={styles.title}>
                    Festive Elegance: Choosing Your <br />
                    Perfect Wedding Saree
                </h1>
                <p className={styles.subheading}>
                    From intimate ceremonies to grand celebrations, find the saree that captures 
                    the essence of your special day.
                </p>
            </header>

            <main className={styles.mainContent}>
                {/* Main Hero Image */}
                <div className={styles.mainImageWrapper}>
                    <img 
                        src={BlogDetailMain} 
                        alt="Luxurious Wedding Saree" 
                        className={styles.mainImage} 
                    />
                </div>

                {/* Article Body */}
                <article className={styles.articleBody}>
                    <div className={styles.paragraph}>
                        Google has been investing in AI for many years and bringing its benefits to individuals, 
                        businesses and communities. Whether it’s publishing state-of-the-art research, 
                        building helpful products or developing tools and resources that enable others, 
                        we’re committed to making AI accessible to everyone.
                    </div>

                    <div className={styles.paragraph}>
                        We’re now at a pivotal moment in our AI journey. Breakthroughs in generative AI are 
                        fundamentally changing how people interact with technology — and at Google, we’ve 
                        been responsibly developing large language models so we can safely bring them to our products. 
                        Today, we’re excited to share our early progress. Developers and businesses can now try 
                        new APIs and products that make it easy, safe and scalable to start building with Google’s 
                        best AI models through Google Cloud and a new prototyping environment called MakerSuite. 
                        And in Google Workspace, we’re introducing new features that help people harness the 
                        power of generative AI to create, connect and collaborate.
                    </div>

                    {/* Blockquote Section */}
                    <div className={styles.quoteContainer}>
                        <div className={styles.orangeLine}></div>
                        <div className={styles.quoteContent}>
                            <blockquote className={styles.quoteText}>
                                “People worry that computers will get too smart and take over the world, 
                                but the real problem is that they’re too stupid and they’ve already taken over the world.”
                            </blockquote>
                            <cite className={styles.author}>– Pedro Domingos</cite>
                        </div>
                    </div>

                    <div className={styles.paragraph}>
                        More than 3 billion people already benefit from AI-powered features in Google Workspace, 
                        whether it’s using Smart Compose in Gmail or auto-generated summaries in Google Docs. 
                        Now, we’re excited to take the next step and bring a limited set of trusted testers a 
                        new set of features that makes the process of writing even easier. In Gmail and Google Docs, 
                        you can simply type in a topic you’d like to write about, and a draft will be instantly 
                        generated for you. So if you’re a manager onboarding a new employee, Workspace saves 
                        you the time and effort involved in writing that first welcome email. From there, 
                        you can elaborate upon or abbreviate the message or adjust the tone to be more 
                        playful or professional — all in just a few clicks. We’ll be rolling out these 
                        new experiences to testers in the coming weeks.
                    </div>

                    {/* Secondary Texture Image */}
                    <div className={styles.textureImageWrapper}>
                        <img 
                            src={BlogDetailTexture} 
                            alt="Silk Texture Detail" 
                            className={styles.textureImage} 
                        />
                    </div>

                    <div className={styles.footerTextWrapper}>
                        <div className={styles.paragraph}>
                            We’re so excited by the potential of generative AI, and the opportunities it will 
                            unlock — from helping people express themselves creatively, to helping developers 
                            build brand new types of applications, to transforming how businesses and 
                            governments engage their customers and constituents. Stay tuned for more 
                            to come in the weeks and months ahead.
                        </div>
                    </div>
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