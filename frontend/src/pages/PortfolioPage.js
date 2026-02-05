import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { useLanguage } from '@/contexts/LanguageContext';

const PortfolioPage = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const portfolioImages = [
    {
      src: '/image_P_1.jpg',
      alt: 'Adventurous couple'
    },
    {
      src: '/image_P_2.jpg',
      alt: 'Couple on bridge'
    },
    {
      src: '/image_P_3.jpg',
      alt: 'Château gardens'
    },
    {
      src: '/image_P_4.jpg',
      alt: 'Woman in forest'
    },
    {
      src: '/image_P_5.jpg',
      alt: 'Whimsical fashion'
    },
    {
      src: '/image_P_6.jpg',
      alt: 'Friends mountain'
    },
    {
      src: '/image_P_7.jpg',
      alt: 'Elegant portrait'
    },
    {
      src: '/image_P_8.jpg',
      alt: 'Couple dancing'
    },
    {
      src: '/image_P_9.jpg',
      alt: 'Romantic moment'
    }
  ];

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div data-testid="portfolio-page" className="pt-32 pb-24 bg-charcoal">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 data-testid="portfolio-header" className="font-display font-extrabold text-7xl md:text-9xl text-terracotta mb-4 uppercase tracking-tighter leading-[0.9]">
            {t('portfolio.title')}
          </h1>
          <p className="font-body text-base md:text-lg text-bone/80">
            {t('portfolio.subtitle')}
          </p>
        </motion.div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {portfolioImages.map((image, index) => (
            <motion.div
              key={index}
              data-testid={`portfolio-image-${index + 1}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="break-inside-avoid cursor-pointer group relative overflow-hidden"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-95"
              />
              <div className="absolute inset-0 bg-terracotta/0 group-hover:bg-terracotta/30 transition-all duration-500"></div>
            </motion.div>
          ))}
        </div>
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={currentIndex}
        slides={portfolioImages.map(img => ({ src: img.src, alt: img.alt }))}
      />
    </div>
  );
};

export default PortfolioPage;
