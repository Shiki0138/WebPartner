import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Clock, Award, TrendingUp } from 'lucide-react';

interface PersonalizedBannerProps {
  visitorType: 'new' | 'returning' | 'customer';
}

const PersonalizedBanner: React.FC<PersonalizedBannerProps> = ({ visitorType }) => {
  const bannerContent = {
    new: {
      title: '初めての方へ特別オファー',
      message: '今なら初回導入費用が50%OFF！無料デモも実施中です。',
      icon: Sparkles,
      color: 'from-blue-500 to-purple-500',
      action: '無料デモを予約'
    },
    returning: {
      title: 'お帰りなさい！',
      message: '前回ご覧いただいた製品の詳細資料をご用意しました。',
      icon: Clock,
      color: 'from-green-500 to-teal-500',
      action: '資料をダウンロード'
    },
    customer: {
      title: 'いつもありがとうございます',
      message: '既存のお客様限定の新機能アップデート情報があります。',
      icon: Award,
      color: 'from-purple-500 to-pink-500',
      action: 'アップデート詳細を見る'
    }
  };

  const content = bannerContent[visitorType];
  const Icon = content.icon;

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className={`fixed top-20 left-0 right-0 z-40 bg-gradient-to-r ${content.color} text-white shadow-lg`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon className="w-6 h-6 animate-pulse" />
            <div>
              <h3 className="font-semibold">{content.title}</h3>
              <p className="text-sm opacity-90">{content.message}</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg font-medium text-sm hover:bg-white/30 transition-colors"
          >
            {content.action}
          </motion.button>
        </div>
      </div>
      
      {/* AI分析インジケーター */}
      <div className="absolute top-2 right-2 flex items-center gap-1 text-xs opacity-60">
        <TrendingUp className="w-3 h-3" />
        <span>AIがあなたに最適化</span>
      </div>
    </motion.div>
  );
};

export default PersonalizedBanner;