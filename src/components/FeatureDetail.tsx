import React from 'react';
import { motion } from 'framer-motion';
import { Check, TrendingUp } from 'lucide-react';

interface FeatureDetailProps {
  feature: {
    id: string;
    icon: any;
    title: string;
    subtitle: string;
    description: string;
    benefits: string[];
    stats: { label: string; value: string }[];
  };
}

const FeatureDetail: React.FC<FeatureDetailProps> = ({ feature }) => {
  const Icon = feature.icon;
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Left Content */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl flex items-center justify-center">
              <Icon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">{feature.title}</h2>
              <p className="text-gray-600">{feature.subtitle}</p>
            </div>
          </div>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-700 mb-8 leading-relaxed"
        >
          {feature.description}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-4 mb-8"
        >
          <h3 className="text-xl font-semibold mb-4">主な機能とメリット</h3>
          {feature.benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="flex items-start gap-3"
            >
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-gray-700">{benefit}</span>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-3 gap-4"
        >
          {feature.stats.map((stat, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Right Visual */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="relative"
      >
        <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
          
          {/* Placeholder for feature visualization */}
          <div className="relative z-10 bg-white rounded-xl shadow-lg p-6 min-h-[400px] flex items-center justify-center">
            <div className="text-center">
              <Icon className="w-24 h-24 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">インタラクティブデモ</p>
              <p className="text-sm text-gray-400 mt-2">下のセクションで実際にお試しいただけます</p>
            </div>
          </div>
          
          {/* Stats floating cards */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-3"
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span className="text-sm font-semibold">効果実証済み</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default FeatureDetail;