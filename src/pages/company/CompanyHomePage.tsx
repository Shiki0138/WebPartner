import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Shield, Cloud, Zap, ArrowRight, Users, Award, TrendingUp } from 'lucide-react';
import CompanyNavbar from '../../components/company/CompanyNavbar';
import CompanyFooter from '../../components/company/CompanyFooter';
import AIChat from '../../components/company/AIChat';
import PersonalizedBanner from '../../components/company/PersonalizedBanner';
import PredictiveNavigation from '../../components/company/PredictiveNavigation';
import RecommendationEngine from '../../components/company/RecommendationEngine';
import { useVisitorTracking } from '../../contexts/VisitorTrackingContext';

const CompanyHomePage: React.FC = () => {
  const { recordAction } = useVisitorTracking();
  const [showChat, setShowChat] = useState(false);
  const [visitorType, setVisitorType] = useState<'new' | 'returning' | 'customer'>('new');
  const [recommendedProducts, setRecommendedProducts] = useState<any[]>([]);

  // 訪問者タイプのシミュレーション
  useEffect(() => {
    // Record page view
    recordAction({
      type: 'pageview',
      timestamp: new Date(),
      page: '/company',
      details: { entryPoint: 'homepage' }
    });

    const random = Math.random();
    if (random < 0.6) setVisitorType('new');
    else if (random < 0.9) setVisitorType('returning');
    else setVisitorType('customer');

    // AI推奨商品の設定
    setTimeout(() => {
      setRecommendedProducts([
        { id: 1, name: 'クラウドERP Pro', match: 94, reason: '業務効率化ニーズに最適' },
        { id: 2, name: 'AI分析ダッシュボード', match: 87, reason: '経営分析の課題解決' },
        { id: 3, name: 'セキュリティ統合パック', match: 82, reason: '中小企業向け最適プラン' }
      ]);
    }, 2000);
  }, [recordAction]);

  const heroProducts = [
    {
      icon: Cloud,
      title: 'クラウドソリューション',
      description: '業務効率を劇的に改善する次世代クラウドサービス',
      features: ['99.9%稼働率保証', '自動バックアップ', '無制限ストレージ'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Shield,
      title: 'セキュリティ製品',
      description: 'AIが24時間監視する最先端セキュリティ',
      features: ['リアルタイム脅威検知', 'ゼロトラスト対応', '自動パッチ適用'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Zap,
      title: '業務効率化ツール',
      description: 'DXを加速させる統合プラットフォーム',
      features: ['ワークフロー自動化', 'AI予測分析', 'モバイル完全対応'],
      color: 'from-orange-500 to-red-500'
    }
  ];

  const stats = [
    { label: '導入企業数', value: '2,500+', growth: '+45%' },
    { label: '顧客満足度', value: '98.5%', growth: '+12%' },
    { label: '業務効率改善', value: '平均67%', growth: '+23%' },
    { label: 'ROI', value: '320%', growth: '+55%' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <CompanyNavbar />
      
      {/* Personalized Banner based on visitor type */}
      <PersonalizedBanner visitorType={visitorType} />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-50"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto mb-12"
          >
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ビジネスの未来を、今ここに
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              テックイノベートは、最先端のIT技術で
              <br />
              あなたのビジネスを次のステージへ導きます
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowChat(true)}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
              >
                <Bot className="w-5 h-5" />
                AIに相談する
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all"
              >
                資料ダウンロード
              </motion.button>
            </div>
          </motion.div>

          {/* AI Recommended Products */}
          {recommendedProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl shadow-xl p-6 max-w-3xl mx-auto mb-12"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">AIがあなたに最適な製品を分析しました</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendedProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-sm">{product.name}</h3>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        {product.match}%適合
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">{product.reason}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">導入実績No.1の製品ラインナップ</h2>
            <p className="text-gray-600 text-lg">業界をリードする3つのソリューション</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {heroProducts.map((product, index) => {
              const Icon = product.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden group cursor-pointer"
                >
                  <div className={`h-2 bg-gradient-to-r ${product.color}`}></div>
                  <div className="p-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${product.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{product.title}</h3>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    
                    <ul className="space-y-2 mb-6">
                      {product.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <button className="flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all">
                      詳細を見る <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Real-time Stats */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-white mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">数字で見る実績</h2>
            <p className="text-xl opacity-90">リアルタイムで更新される導入効果</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/80 mb-1">{stat.label}</div>
                <div className="text-green-300 text-sm">{stat.growth} YoY</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            <div className="flex items-center gap-2">
              <Award className="w-8 h-8" />
              <span className="text-lg font-semibold">ISO27001認証</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8" />
              <span className="text-lg font-semibold">セキュリティ保証</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-8 h-8" />
              <span className="text-lg font-semibold">24時間サポート</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-8 h-8" />
              <span className="text-lg font-semibold">成果保証</span>
            </div>
          </div>
        </div>
      </section>

      {/* AI Chat Widget */}
      <AnimatePresence>
        {showChat && <AIChat onClose={() => setShowChat(false)} />}
      </AnimatePresence>

      {/* Floating Chat Button */}
      {!showChat && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => setShowChat(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg z-40"
        >
          <Bot className="w-8 h-8 text-white" />
        </motion.button>
      )}

      <CompanyFooter />
      
      {/* AI Features */}
      <PredictiveNavigation />
      <RecommendationEngine />
    </div>
  );
};

export default CompanyHomePage;