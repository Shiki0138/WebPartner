import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, Users, TrendingUp, Brain, Lock } from 'lucide-react';

const TrustIndicators: React.FC = () => {
  const indicators = [
    {
      icon: Shield,
      title: 'ISO27001認証取得',
      description: '国際的なセキュリティ基準をクリア',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Award,
      title: 'ITトレンド年間ランキング1位',
      description: 'AI Webサービス部門3年連続受賞',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Users,
      title: '導入企業500社突破',
      description: '大手企業から個人事業主まで幅広く対応',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Brain,
      title: '特許技術3件保有',
      description: 'AI自動最適化技術で業界をリード',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: TrendingUp,
      title: '平均売上350%向上',
      description: '導入後6ヶ月での実績データ',
      color: 'from-red-500 to-rose-500'
    },
    {
      icon: Lock,
      title: 'プライバシーマーク取得',
      description: '個人情報保護を最優先に',
      color: 'from-indigo-500 to-blue-500'
    }
  ];
  
  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="text-4xl font-bold mb-4">
          選ばれる理由は、
          <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            確かな実績と信頼性
          </span>
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          国内外の認証取得と豊富な導入実績が、私たちの技術力を証明しています
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {indicators.map((indicator, index) => {
          const Icon = indicator.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${indicator.color} rounded-xl flex items-center justify-center mb-4`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{indicator.title}</h3>
              <p className="text-gray-600">{indicator.description}</p>
            </motion.div>
          );
        })}
      </div>
      
      {/* Partner Logos */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-16 pt-16 border-t border-gray-200"
      >
        <p className="text-center text-gray-500 mb-8">導入企業様（一部）</p>
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="w-32 h-12 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default TrustIndicators;