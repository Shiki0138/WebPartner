import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Bot, BarChart3, FileText, Users, Brain, Link2, ArrowRight } from 'lucide-react';

const ServiceGrid: React.FC = () => {
  const services = [
    {
      icon: Bot,
      title: 'AI営業アシスタント',
      description: '24時間365日、見込み客との商談を自動化。成約率35%向上の実績。',
      color: 'from-blue-500 to-blue-600',
      link: '/features#ai-assistant'
    },
    {
      icon: BarChart3,
      title: 'AIヒートマップ分析',
      description: '訪問者の行動を予測し、離脱を防ぐ改善案を自動提案。',
      color: 'from-purple-500 to-pink-500',
      link: '/features#heatmap-analytics'
    },
    {
      icon: FileText,
      title: 'AIコンテンツマネージャー',
      description: 'SEO最適化された記事を自動生成。月300記事の生成実績。',
      color: 'from-green-500 to-emerald-500',
      link: '/features#content-manager'
    },
    {
      icon: Users,
      title: 'パーソナライズエンジン',
      description: '訪問者一人ひとりに最適化されたコンテンツを自動表示。',
      color: 'from-orange-500 to-red-500',
      link: '/features#personalization'
    },
    {
      icon: Brain,
      title: 'ビジネスインサイトAI',
      description: '売上データを分析し、次のアクションを具体的に提案。',
      color: 'from-indigo-500 to-blue-500',
      link: '/features#business-insights'
    },
    {
      icon: Link2,
      title: 'マルチチャネル連携',
      description: 'Web、SNS、メール、広告を一元管理。ROI180%改善。',
      color: 'from-teal-500 to-cyan-500',
      link: '/features#multi-channel'
    }
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service, index) => {
        const Icon = service.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <Link to={service.link} className="block h-full">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all h-full border border-gray-100 group">
                <div className={`w-14 h-14 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                
                <div className="flex items-center text-blue-600 font-medium group-hover:gap-2 transition-all">
                  詳しく見る
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ServiceGrid;