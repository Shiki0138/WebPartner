import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Award, Zap } from 'lucide-react';
import { useVisitorTracking } from '../../contexts/VisitorTrackingContext';

interface Recommendation {
  id: string;
  type: 'product' | 'content' | 'action';
  title: string;
  description: string;
  matchScore: number;
  reason: string;
  icon: React.ElementType;
  color: string;
  action: () => void;
}

const RecommendationEngine: React.FC = () => {
  const { currentVisitor, recordAction } = useVisitorTracking();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  useEffect(() => {
    if (!currentVisitor) return;

    // Simulate AI analysis
    const analyzeVisitor = () => {
      setIsAnalyzing(true);
      
      setTimeout(() => {
        const recs: Recommendation[] = [];
        
        // Product recommendations based on behavior
        if (currentVisitor.pageViews.includes('/company/products')) {
          recs.push({
            id: 'prod1',
            type: 'product',
            title: 'AI分析ダッシュボード Enterprise',
            description: '貴社の規模に最適な統合分析ソリューション',
            matchScore: 96,
            reason: '製品ページの閲覧履歴とニーズが完全一致',
            icon: TrendingUp,
            color: 'from-blue-500 to-cyan-500',
            action: () => console.log('Navigate to product')
          });
        }

        // Content recommendations
        if (currentVisitor.leadScore > 30) {
          recs.push({
            id: 'cont1',
            type: 'content',
            title: 'ROI計算ツール',
            description: '導入効果を数値で確認できます',
            matchScore: 88,
            reason: '購買検討段階のお客様に人気',
            icon: Award,
            color: 'from-purple-500 to-pink-500',
            action: () => console.log('Open ROI calculator')
          });
        }

        // Action recommendations
        if (currentVisitor.actions.length > 3) {
          recs.push({
            id: 'act1',
            type: 'action',
            title: '無料デモを予約',
            description: '専門スタッフが貴社に最適なプランをご提案',
            matchScore: 92,
            reason: '同様の行動パターンの80%が次にデモを予約',
            icon: Zap,
            color: 'from-green-500 to-emerald-500',
            action: () => {
              recordAction({
                type: 'click',
                timestamp: new Date(),
                page: currentVisitor.currentPage,
                details: { recommendation: 'demo_booking' }
              });
            }
          });
        }

        setRecommendations(recs.sort((a, b) => b.matchScore - a.matchScore));
        setIsAnalyzing(false);
      }, 2000);
    };

    analyzeVisitor();
  }, [currentVisitor?.pageViews.length, currentVisitor?.leadScore]);

  if (recommendations.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-6 z-30 max-w-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 text-white">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5" />
            <h3 className="font-semibold">AIパーソナライズ推奨</h3>
          </div>
          <p className="text-sm opacity-90">
            あなたのニーズに最適な提案
          </p>
        </div>
        
        {isAnalyzing ? (
          <div className="p-6 text-center">
            <div className="inline-flex items-center gap-2 text-gray-600">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-6 h-6 text-purple-600" />
              </motion.div>
              <span>AI分析中...</span>
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
            {recommendations.map((rec, index) => {
              const Icon = rec.icon;
              return (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={rec.action}
                  className="cursor-pointer group"
                >
                  <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                    <div className="flex items-start gap-3">
                      <div className={`w-12 h-12 bg-gradient-to-r ${rec.color} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-gray-900">{rec.title}</h4>
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                            {rec.matchScore}%適合
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                        <p className="text-xs text-purple-600">{rec.reason}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
        
        <div className="px-4 pb-3 text-center">
          <p className="text-xs text-gray-500">
            リアルタイムで更新される推奨事項
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RecommendationEngine;