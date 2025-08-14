import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

const CTASection: React.FC = () => {
  const benefits = [
    '初期費用0円でスタート可能',
    '成果が出なければ費用は発生しません',
    '専門チームによる導入サポート',
    '30日間の完全返金保証'
  ];
  
  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-green-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            今すぐ始めませんか？
          </h2>
          <p className="text-xl text-white/90 mb-8">
            人手不足の悩みから解放され、売上を自動的に増やし続ける。
            <br />
            AIウェブパートナーが、あなたのビジネスを次のステージへ。
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 text-white/90"
              >
                <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span>{benefit}</span>
              </motion.div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 bg-white text-blue-900 rounded-lg font-semibold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
            >
              30日間無料トライアル
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 rounded-lg font-semibold text-lg hover:bg-white/30 transition-all"
            >
              オンラインデモを予約
            </motion.button>
          </div>
          
          <p className="mt-6 text-white/70 text-sm">
            クレジットカード不要・最短5分で利用開始
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;