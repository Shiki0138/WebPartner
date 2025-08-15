import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Brain, ArrowRight, X } from 'lucide-react';
import { useVisitorTracking } from '../../contexts/VisitorTrackingContext';

const PredictiveNavigation: React.FC = () => {
  const navigate = useNavigate();
  const { getPredictedNavigation, currentVisitor } = useVisitorTracking();
  const [predictions, setPredictions] = useState<any[]>([]);
  const [showPredictions, setShowPredictions] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!currentVisitor || dismissed) return;

    // Show predictions after user spends some time on page
    const timer = setTimeout(() => {
      const newPredictions = getPredictedNavigation();
      if (newPredictions.length > 0) {
        setPredictions(newPredictions);
        setShowPredictions(true);
      }
    }, 8000); // Show after 8 seconds

    return () => clearTimeout(timer);
  }, [currentVisitor?.currentPage, dismissed]);

  const handleNavigate = (page: string) => {
    navigate(page);
    setShowPredictions(false);
  };

  const handleDismiss = () => {
    setShowPredictions(false);
    setDismissed(true);
    // Reset dismissed state after 5 minutes
    setTimeout(() => setDismissed(false), 300000);
  };

  if (!showPredictions || predictions.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-24 right-6 z-40 max-w-sm"
      >
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                <h3 className="font-semibold">AI推奨ナビゲーション</h3>
              </div>
              <button
                onClick={handleDismiss}
                className="p-1 hover:bg-white/20 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm opacity-90">
              あなたの興味に基づいて次のページを提案します
            </p>
          </div>
          
          <div className="p-4 space-y-3">
            {predictions.map((prediction, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleNavigate(prediction.nextPage)}
                className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-900">
                    {prediction.nextPage === '/company/products' && '製品・サービス'}
                    {prediction.nextPage === '/company/cases' && '導入事例'}
                    {prediction.nextPage === '/company/contact' && 'お問い合わせ'}
                  </span>
                  <div className="flex items-center gap-1 text-sm text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span>{prediction.probability}%</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{prediction.reason}</p>
                <div className="flex items-center gap-1 text-blue-600 text-sm group-hover:gap-2 transition-all">
                  <span>詳細を見る</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.button>
            ))}
          </div>
          
          <div className="px-4 pb-4">
            <div className="text-xs text-gray-500 text-center">
              AIがリアルタイムで最適なページを分析
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PredictiveNavigation;