import React from 'react';
import NewsletterSection from '@/features/home/components/NewsletterSection/NewsletterSection';
import Testimonials from '@/features/home/components/Testimonials/Testimonials';
import ContactHero from '@/features/contact/components/ContactHero/ContactHero';
import AboutSectionTwo from '@/features/about/components/AboutSectionTwo/AboutSectionTwo';
import HeritageOfKanchipuram from '../components/AboutSectionTwo/AboutSectionThree/Heritageofkanchipuram';
import TrustedHeritage from '../components/TrustedHeritage/TrustedHeritage';
import MastersVoice from '../components/Mastersvoice/Mastersvoice';

const AboutPage = () => {
    return (
        <div className="about_page">
            <ContactHero/>
            <AboutSectionTwo />
            <HeritageOfKanchipuram/>
            <TrustedHeritage />
            <MastersVoice/>
            <Testimonials/>
             <NewsletterSection />
        </div>
    );
};

export default AboutPage;