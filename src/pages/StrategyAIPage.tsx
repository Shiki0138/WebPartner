import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Brain, TrendingUp, DollarSign, BarChart3, AlertTriangle, Target, Lightbulb, Globe, Zap, Shield } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const StrategyAIPage: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const [activeDemo, setActiveDemo] = useState<'analysis' | 'prediction' | 'strategy'>('analysis');
  const [strategyMetrics, setStrategyMetrics] = useState({
    profit: 0,
    efficiency: 0,
    marketShare: 0,
    riskScore: 100
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStrategyMetrics(prev => ({
        profit: Math.min(prev.profit + Math.floor(Math.random() * 30000), 2450000),
        efficiency: Math.min(prev.efficiency + 0.5, 87.3),
        marketShare: Math.min(prev.marketShare + 0.2, 34.7),
        riskScore: Math.max(prev.riskScore - 0.8, 23.1)
      }));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const benefits = [
    {
      icon: Brain,
      title: '経営効率20%向上',
      description: 'AIによる最適意思決定支援',
      value: '戦略実行速度3倍',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: TrendingUp,
      title: '売上予測精度95%',
      description: '3ヶ月先の業績を正確に予測',
      value: '予測精度業界最高',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: DollarSign,
      title: '投資判断最適化',
      description: 'ROI最大化の投資タイミング提案',
      value: '投資効率40%向上',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Shield,
      title: 'リスク90%軽減',
      description: '潜在リスクの事前発見・対策',
      value: '危機回避率95%',
      color: 'from-red-500 to-pink-500'
    }
  ];

  const features = [
    {
      title: 'リアルタイム経営判断支援',
      description: '競合動向・市場トレンドを24時間監視し、最適な戦略的判断をサポート',
      tech: 'ビッグデータ分析 + 予測AI + 競合インテリジェンス'
    },
    {
      title: '財務最適化エンジン',
      description: 'キャッシュフロー予測・節税戦略・融資最適化を包括的に支援',
      tech: '財務AI + 税務アルゴリズム + 金融データ分析'
    },
    {
      title: '事業戦略立案AI',
      description: '新規事業アイデア生成・市場参入戦略・M&A候補分析を自動化',
      tech: '戦略AI + 市場分析 + 企業評価モデル'
    },
    {
      title: 'グローバル展開支援',
      description: '海外市場分析・参入リスク評価・現地パートナー選定を支援',
      tech: '国際市場AI + リスク分析 + パートナーマッチング'
    }
  ];

  const competitorData = [
    { name: '競合A社', marketShare: 28.5, threat: 'high' },
    { name: '競合B社', marketShare: 22.1, threat: 'medium' },
    { name: '競合C社', marketShare: 15.3, threat: 'low' },
    { name: '新興企業', marketShare: 8.4, threat: 'high' }
  ];

  const riskAlerts = [
    { type: 'market', level: 'high', message: '原材料価格20%上昇予測 - 対策必要' },
    { type: 'competitor', level: 'medium', message: '競合A社が新サービス発表予定' },
    { type: 'finance', level: 'low', message: '金利上昇により借入コスト増加見込み' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-50 opacity-50"></motion.div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-5xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold">
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  AI経営参謀
                </span>
              </h1>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
              「ストラテジーAI Advisor」
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              最高峰の戦略AIが経営判断を完全サポート
              <br />
              <span className="font-semibold text-indigo-600">経営効率20%向上、新規事業成功率3倍を実現</span>
            </p>
            
            {/* リアルタイム経営指標 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl p-4 shadow-lg"
              >
                <div className="text-2xl font-bold text-indigo-600">¥{strategyMetrics.profit.toLocaleString()}</div>
                <div className="text-sm text-gray-600">最適化利益</div>
              </motion.div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl p-4 shadow-lg"
              >
                <div className="text-2xl font-bold text-green-600">{strategyMetrics.efficiency.toFixed(1)}%</div>
                <div className="text-sm text-gray-600">経営効率</div>
              </motion.div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl p-4 shadow-lg"
              >
                <div className="text-2xl font-bold text-purple-600">{strategyMetrics.marketShare.toFixed(1)}%</div>
                <div className="text-sm text-gray-600">市場シェア</div>
              </motion.div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-xl p-4 shadow-lg"
              >
                <div className="text-2xl font-bold text-orange-600">{strategyMetrics.riskScore.toFixed(1)}</div>
                <div className="text-sm text-gray-600">リスクスコア</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              経営の質を革新する
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                戦略AIパワー
              </span>
            </h2>
            <p className="text-gray-600 text-lg">データサイエンスで実現する科学的経営</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, transition: { duration: 0.2 } }}
                  className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 relative overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-5`}></div>
                  <div className={`w-14 h-14 bg-gradient-to-r ${benefit.color} rounded-xl flex items-center justify-center mb-4 relative z-10`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 relative z-10">{benefit.title}</h3>
                  <p className="text-gray-600 mb-4 relative z-10">{benefit.description}</p>
                  <div className={`text-2xl font-bold bg-gradient-to-r ${benefit.color} bg-clip-text text-transparent relative z-10`}>
                    {benefit.value}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">AI経営参謀を体験</h2>
            <p className="text-gray-600 text-lg">戦略的意思決定支援システムをご覧ください</p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            {/* Demo Navigation */}
            <div className="flex justify-center gap-4 mb-8">
              {[
                { key: 'analysis', label: '市場分析', icon: BarChart3 },
                { key: 'prediction', label: '業績予測', icon: TrendingUp },
                { key: 'strategy', label: '戦略提案', icon: Lightbulb }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveDemo(tab.key as any)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                      activeDemo === tab.key
                        ? 'bg-indigo-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Demo Content */}
            <motion.div
              key={activeDemo}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              {activeDemo === 'analysis' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-6">リアルタイム市場分析</h3>
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4">
                        <h4 className="font-semibold text-indigo-800 mb-3">競合他社動向</h4>
                        {competitorData.map((competitor, index) => (
                          <div key={index} className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">{competitor.name}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    competitor.threat === 'high' ? 'bg-red-500' :
                                    competitor.threat === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                                  }`}
                                  style={{ width: `${(competitor.marketShare / 30) * 100}%` }}
                                />
                              </div>
                              <span className="text-sm font-bold">{competitor.marketShare}%</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
                        <h4 className="font-semibold text-green-800 mb-3">市場機会</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>新興市場でのシェア拡大チャンス（+15%成長見込み）</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>デジタル化遅れ企業の獲得可能性（200社以上）</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span>政府補助金活用で設備投資コスト30%削減</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-4">リスクアラート</h4>
                    <div className="space-y-3">
                      {riskAlerts.map((alert, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.2 }}
                          className={`p-4 rounded-lg border-l-4 ${
                            alert.level === 'high' ? 'bg-red-50 border-red-500' :
                            alert.level === 'medium' ? 'bg-yellow-50 border-yellow-500' :
                            'bg-blue-50 border-blue-500'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                              alert.level === 'high' ? 'text-red-600' :
                              alert.level === 'medium' ? 'text-yellow-600' :
                              'text-blue-600'
                            }`} />
                            <div>
                              <div className={`text-sm font-medium ${
                                alert.level === 'high' ? 'text-red-800' :
                                alert.level === 'medium' ? 'text-yellow-800' :
                                'text-blue-800'
                              }`}>
                                {alert.level === 'high' ? '高リスク' :
                                 alert.level === 'medium' ? '中リスク' : '注意'}
                              </div>
                              <div className="text-sm text-gray-700 mt-1">{alert.message}</div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-6 bg-gray-50 rounded-lg p-4">
                      <h5 className="font-semibold mb-3">AIからの戦略提案</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-yellow-500" />
                          <span>今月中に競合A社対策として価格戦略見直し推奨</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-green-500" />
                          <span>新規事業として月SaaS展開を2Q内開始推奨</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-blue-500" />
                          <span>東南アジア市場参入の最適タイミング到来</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeDemo === 'prediction' && (
                <div>
                  <h3 className="text-xl font-semibold mb-6">業績予測ダッシュボード</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-green-50 rounded-lg p-6">
                      <div className="text-3xl font-bold text-green-600 mb-2">¥3.2億</div>
                      <div className="text-sm text-green-700 mb-1">来期売上予測</div>
                      <div className="text-xs text-green-600">前年比 +18% (予測精度: 95%)</div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-6">
                      <div className="text-3xl font-bold text-blue-600 mb-2">¥4,800万</div>
                      <div className="text-sm text-blue-700 mb-1">営業利益予測</div>
                      <div className="text-xs text-blue-600">利益率向上 +3.2% (AIコスト削減効果)</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-6">
                      <div className="text-3xl font-bold text-purple-600 mb-2">142%</div>
                      <div className="text-sm text-purple-700 mb-1">投資ROI</div>
                      <div className="text-xs text-purple-600">AI投資による効率化で大幅改善</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold mb-4">四半期別売上予測</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Q1 (1-3月)</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full w-4/5"></div>
                            </div>
                            <span className="text-sm font-bold">¥7,200万</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Q2 (4-6月)</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div className="bg-blue-500 h-2 rounded-full w-full"></div>
                            </div>
                            <span className="text-sm font-bold">¥8,500万</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Q3 (7-9月)</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div className="bg-purple-500 h-2 rounded-full w-3/4"></div>
                            </div>
                            <span className="text-sm font-bold">¥7,800万</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Q4 (10-12月)</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div className="bg-orange-500 h-2 rounded-full w-4/5"></div>
                            </div>
                            <span className="text-sm font-bold">¥9,500万</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold mb-4">リスクファクター分析</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">市場変動リスク</span>
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">中</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">競合参入リスク</span>
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">高</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">技術陳腐化リスク</span>
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">低</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">人材流出リスク</span>
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">中</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-3 bg-blue-100 rounded">
                        <div className="text-sm text-blue-800">
                          <strong>総合評価:</strong> 予測精度95%、リスク調整後ROI: 128%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeDemo === 'strategy' && (
                <div>
                  <h3 className="text-xl font-semibold mb-6">AI戦略提案システム</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold mb-4">新規事業提案</h4>
                      <div className="space-y-4">
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border-2 border-green-200">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-sm font-bold">1</span>
                            </div>
                            <h5 className="font-semibold text-green-800">AIコンサルティング事業</h5>
                          </div>
                          <div className="text-sm text-green-700 mb-3">
                            既存AI技術を活用し、他社向けコンサルティングサービスを展開
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="font-medium">投資額:</span> ¥2,000万
                            </div>
                            <div>
                              <span className="font-medium">予想ROI:</span> 340%
                            </div>
                            <div>
                              <span className="font-medium">市場規模:</span> ¥150億
                            </div>
                            <div>
                              <span className="font-medium">参入難易度:</span> 中
                            </div>
                          </div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-sm font-bold">2</span>
                            </div>
                            <h5 className="font-semibold text-blue-800">海外展開（東南アジア）</h5>
                          </div>
                          <div className="text-sm text-blue-700 mb-3">
                            シンガポール・マレーシア市場での現地パートナー連携展開
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="font-medium">投資額:</span> ¥5,000万
                            </div>
                            <div>
                              <span className="font-medium">予想ROI:</span> 280%
                            </div>
                            <div>
                              <span className="font-medium">市場規模:</span> ¥80億
                            </div>
                            <div>
                              <span className="font-medium">参入難易度:</span> 高
                            </div>
                          </div>
                        </div>

                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-sm font-bold">3</span>
                            </div>
                            <h5 className="font-semibold text-purple-800">AIプラットフォーム事業</h5>
                          </div>
                          <div className="text-sm text-purple-700 mb-3">
                            中小企業向けAI活用プラットフォームのSaaS展開
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="font-medium">投資額:</span> ¥8,000万
                            </div>
                            <div>
                              <span className="font-medium">予想ROI:</span> 450%
                            </div>
                            <div>
                              <span className="font-medium">市場規模:</span> ¥300億
                            </div>
                            <div>
                              <span className="font-medium">参入難易度:</span> 高
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-4">M&A候補分析</h4>
                      <div className="space-y-4">
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3">
                            <h5 className="font-semibold">株式会社テックソリューション</h5>
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">推奨</span>
                          </div>
                          <div className="text-sm text-gray-600 mb-3">
                            AI技術に強みを持つ30名規模のIT企業。当社の技術力を補完可能。
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div><span className="font-medium">想定買収額:</span> ¥3億</div>
                            <div><span className="font-medium">シナジー効果:</span> ¥1.2億/年</div>
                            <div><span className="font-medium">統合リスク:</span> 低</div>
                            <div><span className="font-medium">実行タイミング:</span> 6ヶ月以内</div>
                          </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3">
                            <h5 className="font-semibold">デジタルマーケティング合同会社</h5>
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">検討</span>
                          </div>
                          <div className="text-sm text-gray-600 mb-3">
                            マーケティング領域の専門性。顧客基盤拡大に貢献見込み。
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div><span className="font-medium">想定買収額:</span> ¥1.5億</div>
                            <div><span className="font-medium">シナジー効果:</span> ¥6,000万/年</div>
                            <div><span className="font-medium">統合リスク:</span> 中</div>
                            <div><span className="font-medium">実行タイミング:</span> 1年以内</div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 bg-indigo-50 rounded-lg p-4">
                        <h5 className="font-semibold text-indigo-800 mb-3">実行ロードマップ</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-indigo-500 rounded-full text-white text-xs flex items-center justify-center">1</div>
                            <span>Q1: AIコンサル事業立ち上げ準備</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-indigo-400 rounded-full text-white text-xs flex items-center justify-center">2</div>
                            <span>Q2: テックソリューション社との買収交渉</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-indigo-300 rounded-full text-white text-xs flex items-center justify-center">3</div>
                            <span>Q3: 海外展開市場調査開始</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-indigo-200 rounded-full text-white text-xs flex items-center justify-center">4</div>
                            <span>Q4: プラットフォーム事業検討開始</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technical Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              最高峰のAI技術で実現する
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                科学的経営
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100"
              >
                <h3 className="text-xl font-semibold mb-3 text-indigo-900">{feature.title}</h3>
                <p className="text-gray-700 mb-4">{feature.description}</p>
                <div className="text-sm text-indigo-600 bg-white rounded-lg px-3 py-2 inline-block">
                  <strong>技術基盤:</strong> {feature.tech}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 to-purple-800 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">AI経営参謀の導入効果</h2>
            <p className="text-xl text-indigo-100">戦略的意思決定の革新で実現した成果</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
            >
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-indigo-300">340%</div>
                <div className="text-indigo-100">新規事業成功率</div>
              </div>
              <h3 className="text-lg font-semibold mb-2">製造業D社</h3>
              <p className="text-indigo-100 text-sm">AI分析による市場参入戦略で、3つの新規事業すべてが収益化に成功。従来の成功率30%から大幅改善。</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
            >
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-indigo-300">25%</div>
                <div className="text-indigo-100">経営効率向上</div>
              </div>
              <h3 className="text-lg font-semibold mb-2">IT企業E社</h3>
              <p className="text-indigo-100 text-sm">リアルタイム経営分析により意思決定速度が3倍向上。戦略実行から成果創出まで大幅短縮。</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
            >
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-indigo-300">¥2.8億</div>
                <div className="text-indigo-100">リスク回避効果</div>
              </div>
              <h3 className="text-lg font-semibold mb-2">小売業F社</h3>
              <p className="text-indigo-100 text-sm">AI予測により市場変動リスクを事前察知。在庫調整と価格戦略で大幅な損失回避に成功。</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              AI経営参謀と共に未来を創造しませんか？
            </h2>
            <p className="text-xl text-white/90 mb-8">
              30日間の無料トライアルで経営革命を体験してください
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-indigo-600 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                無料戦略分析を開始
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-lg font-semibold text-lg hover:bg-white/30 transition-all"
              >
                経営改善事例集をダウンロード
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default StrategyAIPage;