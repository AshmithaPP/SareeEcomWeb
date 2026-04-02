import React from 'react';
import ContactHero from '../components/ContactHero/ContactHero';
import ContactFeatures from '../components/ContactFeatures/ContactFeatures';
import ContactForm from '../components/ContactForm/ContactForm';
import NewsletterSection from '@/features/home/components/NewsletterSection/NewsletterSection';

const ContactPage = () => {
    return (
        <div className="contact_page">
            <ContactHero />
            <ContactFeatures />
            <ContactForm />
             <NewsletterSection />
        </div>
    );
};

export default ContactPage;