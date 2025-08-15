import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Play, Clock, Users, TrendingUp, BarChart3, Bot, 
  Zap, Shield, Award, ArrowRight, CheckCircle, Eye
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DemoLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDemo, setSelectedDemo] = useState<'company' | 'admin' | 'comparison'>('company');

  const demoFeatures = [
    {
      id: 'company',
      title: '顧客体験デモ',
      description: 'AI機能が組み込まれた企業サイトを実際に体験',
      duration: '5-10分',
      highlights: [
        'AIチャットボット体験',
        'パーソナライズ機能確認',
        '予測ナビゲーション体験',
        'リアルタイム最適化'
      ],
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      path: '/demo/company'
    },
    {
      id: 'admin',
      title: '管理者視点デモ',
      description: '強力な分析・管理機能で運営効率を確認',
      duration: '10-15分',
      highlights: [
        'リアルタイム訪問者監視',
        'AI分析レポート確認',
        'リード評価システム',
        'ROI効果測定'
      ],
      icon: BarChart3,
      color: 'from-purple-500 to-pink-500',
      path: '/demo/admin'
    },
    {
      id: 'comparison',
      title: '効果比較デモ',
      description: 'AI導入前後の効果を数値で確認',
      duration: '5-8分',
      highlights: [
        'コンバージョン率比較',
        '業務効率化効果',
        'コスト削減効果',
        'ROI計算機能'
      ],
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      path: '/demo/comparison'
    }
  ];

  const businessMetrics = [
    { label: 'コンバージョン率', before: '2.3%', after: '4.7%', improvement: '+104%' },
    { label: '平均滞在時間', before: '1分32秒', after: '3分45秒', improvement: '+143%' },
    { label: '問い合わせ数', before: '12件/月', after: '47件/月', improvement: '+292%' },
    { label: '顧客満足度', before: '72%', after: '94%', improvement: '+31%' }
  ];

  const testimonials = [
    {
      company: '株式会社イノベート',
      industry: 'IT・ソフトウェア',
      size: '従業員120名',
      result: 'サイト経由の問い合わせが3倍増加',
      quote: 'AIチャットボットの導入で、24時間体制でのリード獲得が可能になりました。特に深夜帯の問い合わせが大幅に増加し、機会損失を防げています。',
      avatar: '🏢'
    },
    {
      company: 'テックソリューションズ',
      industry: '製造業向けSaaS',
      size: '従業員80名',
      result: 'コンバージョン率が2.1倍向上',
      quote: 'リアルタイムの訪問者分析により、ホットリードを即座に特定できるようになり、営業効率が劇的に改善しました。',
      avatar: '⚙️'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 opacity-70"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600 font-medium">ライブデモ環境稼働中</span>
            </div>
            
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              AIで変わる
              <br />
              ウェブサイト体験
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              実際のダミー企業サイトで、AIウェブパートナーの全機能を体験してください。
              <br />
              リアルタイムデータで、導入効果を具体的に確認いただけます。
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/demo/company')}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-3"
              >
                <Play className="w-6 h-6" />
                すぐにデモを開始
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all"
              >
                デモ説明を見る
              </motion.button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {businessMetrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  className="bg-white/80 backdrop-blur-sm rounded-lg p-3 text-center"
                >
                  <div className="text-lg font-bold text-gray-900">{metric.improvement}</div>
                  <div className="text-xs text-gray-600">{metric.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Demo Options */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">3つの視点でデモ体験</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              顧客視点、管理者視点、そして効果検証まで、包括的にAI機能をご体験いただけます
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {demoFeatures.map((demo, index) => {
              const Icon = demo.icon;
              const isSelected = selectedDemo === demo.id;
              
              return (
                <motion.div
                  key={demo.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ y: -10 }}
                  onClick={() => setSelectedDemo(demo.id as any)}
                  className={`cursor-pointer transition-all duration-300 ${
                    isSelected ? 'ring-4 ring-blue-200' : ''
                  }`}
                >
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-shadow">
                    <div className={`h-3 bg-gradient-to-r ${demo.color}`}></div>
                    
                    <div className="p-6">
                      <div className={`w-16 h-16 bg-gradient-to-r ${demo.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-2">{demo.title}</h3>
                      <p className="text-gray-600 mb-4">{demo.description}</p>
                      
                      <div className="flex items-center gap-2 mb-4">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-500">所要時間: {demo.duration}</span>
                      </div>
                      
                      <ul className="space-y-2 mb-6">
                        {demo.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <Link
                        to={demo.path}
                        className={`w-full py-3 px-4 bg-gradient-to-r ${demo.color} text-white rounded-lg font-semibold hover:shadow-lg transition-all inline-flex items-center justify-center gap-2`}
                      >
                        体験開始
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Demo Flow */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-center mb-6">推奨デモフロー</h3>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <span className="font-medium">顧客体験デモ（5分）</span>
              </div>
              <ArrowRight className="w-6 h-6 text-gray-400 rotate-90 md:rotate-0" />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <span className="font-medium">管理者視点デモ（15分）</span>
              </div>
              <ArrowRight className="w-6 h-6 text-gray-400 rotate-90 md:rotate-0" />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <span className="font-medium">効果比較・相談（10分）</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">実際の導入効果</h2>
            <p className="text-gray-600 text-lg">AIウェブパートナーを導入したお客様の声</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-3xl">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-bold text-lg">{testimonial.company}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.industry}</p>
                    <p className="text-gray-500 text-sm">{testimonial.size}</p>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-3 mb-4">
                  <p className="font-semibold text-green-800">{testimonial.result}</p>
                </div>
                
                <blockquote className="text-gray-700 italic">
                  "{testimonial.quote}"
                </blockquote>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">今すぐデモを体験</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              3分でわかるAI機能の威力。実際のビジネス効果を数値で確認してください。
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/demo/company"
                className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center gap-3"
              >
                <Play className="w-6 h-6" />
                デモを開始する
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all"
              >
                詳細を相談する
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DemoLandingPage;