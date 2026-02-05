import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ContactPage = () => {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div data-testid="contact-page" className="pt-32 pb-24 bg-bone min-h-screen">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 data-testid="contact-header" className="font-display font-extrabold text-5xl md:text-7xl text-burgundy mb-8 uppercase tracking-tighter leading-[0.9]">
              {t('contact.title')}
            </h1>
            <p className="font-body text-base md:text-lg text-charcoal leading-relaxed mb-12">
              {t('contact.subtitle')}
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-terracotta flex items-center justify-center flex-shrink-0">
                  <Mail className="text-bone" size={20} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-burgundy mb-1 uppercase text-sm">Email</h3>
                  <a
                    href="mailto:lorettaperaldi@gmail.com"
                    data-testid="contact-email-link"
                    className="font-body text-charcoal hover:text-burgundy transition-colors"
                  >
                    lorettaperaldi@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-terracotta flex items-center justify-center flex-shrink-0">
                  <Instagram className="text-bone" size={20} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-burgundy mb-1 uppercase text-sm">Instagram</h3>
                  <a
                    href="https://instagram.com/scarlette_photography"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="contact-instagram-link"
                    className="font-body text-charcoal hover:text-burgundy transition-colors"
                  >
                    @scarlette_photography
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-pastelGreen p-12"
          >
            <p className="font-body text-base text-charcoal leading-relaxed mb-8">
              <span className="font-display font-bold text-burgundy">REACH OUT WITH THIS FORMAT</span><br /><br />
              <span className="font-bold">Name:</span> Jane Doe<br />
              <span className="font-bold">Email:</span> jane.doe@example.com<br />
              <span className="font-bold">Date of the shooting:</span> June 15, 2025<br />
              <span className="font-bold">Type of shooting:</span> Couple / Engagement<br /><br />
              <span className="font-bold">Message (optional):</span><br />
              Hello! My partner and I are visiting Paris next summer and would love to book a romantic photoshoot at Château de Fontainebleau. We're interested in golden hour photography with flowing dresses. Looking forward to hearing from you!<br /><br />
              You can copy this template and send your inquiry to:
            </p>
            
            <div className="bg-bone p-6 border-2 border-burgundy">
              <p className="font-body text-charcoal mb-4">
                <span className="font-display font-bold text-burgundy">Email:</span><br />
                <a 
                  href="mailto:lorettaperaldi@gmail.com"
                  className="text-burgundy hover:text-terracotta transition-colors underline"
                >
                  lorettaperaldi@gmail.com
                </a>
              </p>
              <p className="font-body text-charcoal">
                <span className="font-display font-bold text-burgundy">Instagram:</span><br />
                <a 
                  href="https://instagram.com/scarlette_photography"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-burgundy hover:text-terracotta transition-colors underline"
                >
                  @scarlette_photography
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
