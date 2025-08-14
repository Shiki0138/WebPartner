import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import StatsCounter from '../components/StatsCounter';
import TrustIndicators from '../components/TrustIndicators';
import ServiceGrid from '../components/ServiceGrid';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />
      
      {/* Hero Section with Parallax */}
      <motion.div style={{ opacity }}>
        <HeroSection />
      </motion.div>
      
      {/* Real-time Stats */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-green-50 opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-900 to-green-700 bg-clip-text text-transparent">
              AIが創る、新しいビジネスの形
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg">
              24時間365日、あなたのビジネスを成長させ続けるAIパートナー
            </p>
            <StatsCounter />
          </motion.div>
        </div>
      </section>
      
      {/* Trust & Authority Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <TrustIndicators />
        </div>
      </section>
      
      {/* Services Preview */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl font-bold text-center mb-4">
              次世代型AIウェブシステム
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg max-w-3xl mx-auto">
              最先端のAI技術を駆使し、あなたのホームページを
              <br />
              単なる「情報発信ツール」から「売上創出マシン」へ
            </p>
            <ServiceGrid />
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <CTASection />
      
      <Footer />
    </div>
  );
};

export default HomePage;