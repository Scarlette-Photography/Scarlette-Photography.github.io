import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

const ContactPage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/xyzabcde', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          _subject: `New booking inquiry from ${formData.name}`,
          _replyto: formData.email
        }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        toast({
          title: 'Success!',
          description: 'Your message has been sent. I\'ll get back to you within 24 hours!',
          variant: 'default'
        });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try emailing directly at lorettaperaldi@gmail.com',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="font-display font-bold text-burgundy mb-2 block uppercase text-sm">
                  {t('contact.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border-b-2 border-charcoal text-charcoal placeholder-charcoal/50 focus:outline-none focus:border-burgundy transition-colors py-2"
                  placeholder="Jane Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="font-display font-bold text-burgundy mb-2 block uppercase text-sm">
                  {t('contact.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border-b-2 border-charcoal text-charcoal placeholder-charcoal/50 focus:outline-none focus:border-burgundy transition-colors py-2"
                  placeholder="jane@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="font-display font-bold text-burgundy mb-2 block uppercase text-sm">
                  {t('contact.phone')}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border-b-2 border-charcoal text-charcoal placeholder-charcoal/50 focus:outline-none focus:border-burgundy transition-colors py-2"
                  placeholder="+33 6 00 00 00 00"
                />
              </div>

              <div>
                <label htmlFor="message" className="font-display font-bold text-burgundy mb-2 block uppercase text-sm">
                  {t('contact.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full bg-transparent border-b-2 border-charcoal text-charcoal placeholder-charcoal/50 focus:outline-none focus:border-burgundy transition-colors py-2 resize-none"
                  placeholder="Tell me about your dream photoshoot..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-burgundy text-bone font-display font-bold uppercase tracking-widest py-3 hover:bg-terracotta transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-8"
              >
                {isSubmitting ? t('contact.sending') : t('contact.submit')}
              </button>

              <p className="font-body text-xs text-charcoal/60 text-center mt-4">
                Or email directly: lorettaperaldi@gmail.com
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
