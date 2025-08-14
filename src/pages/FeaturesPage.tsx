import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FeatureDetail from '../components/FeatureDetail';
import InteractiveDemo from '../components/InteractiveDemo';
import { Bot, BarChart3, FileText, Users, Brain, Link2 } from 'lucide-react';

interface Feature {
  id: string;
  icon: any;
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  stats: { label: string; value: string }[];
  demoType: 'chat' | 'analytics' | 'content' | 'personalization' | 'insights' | 'integration';
}

const FeaturesPage: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<string>('ai-assistant');
  
  const features: Feature[] = [
    {
      id: 'ai-assistant',
      icon: Bot,
      title: 'AI営業アシスタント',
      subtitle: '24時間365日、完璧な接客を実現',
      description: 'GPT-4を活用した高度な会話AIが、訪問者一人ひとりに最適な対応を行います。商品説明から見積もり作成、アポイント調整まで、人間の営業担当者と同等以上のパフォーマンスを発揮します。',
      benefits: [
        '商談成約率35%向上',
        '対応時間を0秒に短縮',
        '深夜・早朝の問い合わせも逃さない',
        '多言語対応で海外顧客も獲得'
      ],
      stats: [
        { label: '平均応答時間', value: '0.8秒' },
        { label: '満足度', value: '98%' },
        { label: '成約率向上', value: '+35%' }
      ],
      demoType: 'chat'
    },
    {
      id: 'heatmap-analytics',
      icon: BarChart3,
      title: 'AIヒートマップ分析',
      subtitle: '訪問者の行動を完全に可視化',
      description: '従来のヒートマップを超えた、AI予測分析を搭載。訪問者がどこで迷い、なぜ離脱するのかを自動で分析し、具体的な改善提案まで行います。',
      benefits: [
        'リアルタイムで行動パターンを分析',
        '離脱予測で事前に対策',
        'A/Bテストの自動実行と最適化',
        '改善提案の自動生成'
      ],
      stats: [
        { label: 'CVR改善', value: '+42%' },
        { label: '分析精度', value: '95%' },
        { label: '改善提案数', value: '週50件' }
      ],
      demoType: 'analytics'
    },
    {
      id: 'content-manager',
      icon: FileText,
      title: 'AIコンテンツマネージャー',
      subtitle: 'SEO最適化された記事を自動生成',
      description: '業界トレンドを分析し、検索上位を狙える高品質なコンテンツを自動生成。画像選定からSNS投稿まで、コンテンツマーケティングを完全自動化します。',
      benefits: [
        'SEOスコア90点以上の記事を生成',
        '業界ニュースの自動収集と要約',
        'ブランドトーンを学習して執筆',
        'マルチチャネル同時配信'
      ],
      stats: [
        { label: '月間生成数', value: '300記事' },
        { label: 'SEOスコア', value: '平均92点' },
        { label: 'PV増加率', value: '+280%' }
      ],
      demoType: 'content'
    },
    {
      id: 'personalization',
      icon: Users,
      title: 'パーソナライズエンジン',
      subtitle: '一人ひとりに最適化された体験を',
      description: '訪問者の行動履歴、属性、状況を分析し、リアルタイムでページ内容を最適化。100人いれば100通りの体験を提供します。',
      benefits: [
        '個別最適化されたコンテンツ表示',
        'レコメンド精度95%以上',
        'リピート率3倍向上',
        '購買単価40%アップ'
      ],
      stats: [
        { label: 'パーソナライズ精度', value: '96%' },
        { label: 'CTR向上', value: '+85%' },
        { label: 'リピート率', value: '3.2倍' }
      ],
      demoType: 'personalization'
    },
    {
      id: 'business-insights',
      icon: Brain,
      title: 'ビジネスインサイトAI',
      subtitle: '経営判断に必要な情報を自動分析',
      description: '売上データ、顧客動向、競合分析を統合し、次のアクションを具体的に提案。経営者の右腕として、データドリブンな意思決定を支援します。',
      benefits: [
        '日次レポートの自動生成',
        '売上予測と改善提案',
        '競合動向のリアルタイム監視',
        'KPIアラートと対策提案'
      ],
      stats: [
        { label: '分析時間短縮', value: '95%' },
        { label: '予測精度', value: '89%' },
        { label: '意思決定速度', value: '3倍' }
      ],
      demoType: 'insights'
    },
    {
      id: 'multi-channel',
      icon: Link2,
      title: 'マルチチャネル連携',
      subtitle: 'すべてのマーケティングを一元管理',
      description: 'ウェブサイト、SNS、メール、広告を統合管理。AIが最適なタイミングで最適なチャネルに配信し、ROIを最大化します。',
      benefits: [
        'クロスチャネル最適化',
        '自動投稿スケジューリング',
        '統合レポーティング',
        'ROI自動最適化'
      ],
      stats: [
        { label: 'ROI改善', value: '+180%' },
        { label: '作業時間削減', value: '90%' },
        { label: '配信精度', value: '94%' }
      ],
      demoType: 'integration'
    }
  ];
  
  const currentFeature = features.find(f => f.id === selectedFeature) || features[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                最先端AI技術
              </span>
              が実現する
              <br />
              6つの革新的機能
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              すべての機能が連携し、あなたのビジネスを
              <br />
              24時間365日成長させ続けます
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Feature Navigation */}
      <section className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-4 gap-4 scrollbar-hide">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.button
                  key={feature.id}
                  onClick={() => setSelectedFeature(feature.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-all ${
                    selectedFeature === feature.id
                      ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                  {feature.title}
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Feature Detail Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedFeature}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <FeatureDetail feature={currentFeature} />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
      
      {/* Interactive Demo Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">実際に体験してみましょう</h2>
            <p className="text-gray-600 text-lg">
              各機能のデモをお試しいただけます
            </p>
          </motion.div>
          
          <InteractiveDemo type={currentFeature.demoType} />
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              すべての機能を30日間無料でお試しください
            </h2>
            <p className="text-xl text-white/90 mb-8">
              導入支援から運用サポートまで、専門チームが完全サポート
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                無料トライアルを開始
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-lg font-semibold text-lg hover:bg-white/30 transition-all"
              >
                資料をダウンロード
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default FeaturesPage;