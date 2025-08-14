import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
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
      
      {/* Interactive Demo Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6"
            >
              <Sparkles className="w-10 h-10 text-purple-600" />
            </motion.div>
            
            <h2 className="text-4xl font-bold text-white mb-6">
              実際に体験してみませんか？
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              リアルタイムヒートマップ、AI営業チャット、経営分析ダッシュボードなど、
              最先端のAI機能を今すぐ体験できます
            </p>
            
            <Link to="/demo">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-purple-600 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
              >
                <span>インタラクティブデモを体験</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            
            <p className="text-white/70 mt-4 text-sm">
              登録不要・無料・今すぐ体験
            </p>
          </motion.div>
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