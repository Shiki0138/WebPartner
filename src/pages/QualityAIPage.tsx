import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, CheckCircle, AlertTriangle, BarChart3, Eye, Camera, TrendingUp, Award, Zap, Settings } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const QualityAIPage: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const [activeDemo, setActiveDemo] = useState<'inspection' | 'analysis' | 'improvement'>('inspection');
  const [qualityMetrics, setQualityMetrics] = useState({
    inspections: 0,
    defects: 0,
    accuracy: 0,
    efficiency: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setQualityMetrics(prev => ({
        inspections: Math.min(prev.inspections + Math.floor(Math.random() * 12), 1247),
        defects: Math.min(prev.defects + Math.floor(Math.random() * 2), 23),
        accuracy: Math.min(prev.accuracy + 0.05, 99.7),
        efficiency: Math.min(prev.efficiency + 0.3, 87.4)
      }));
    }, 150);

    return () => clearInterval(interval);
  }, []);

  const benefits = [
    {
      icon: Eye,
      title: '検査精度99.7%',
      description: '人間では見落とす微細な不具合も検出',
      value: '従来比5倍精度',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: TrendingUp,
      title: '品質コスト60%削減',
      description: '不良品流出・リコールリスクを大幅軽減',
      value: '月額84万円削減',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Zap,
      title: '検査速度10倍',
      description: '24時間連続稼働で生産効率大幅向上',
      value: '検査時間1/10',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Award,
      title: '品質認証取得支援',
      description: 'ISO・JIS規格への完全準拠を自動化',
      value: '認証取得率100%',
      color: 'from-purple-500 to-indigo-500'
    }
  ];

  const features = [
    {
      title: '画像認識品質検査',
      description: 'マイクロメートル単位の傷・汚れ・色ムラを瞬時に検出',
      tech: 'OpenCV + 深層学習 + 高解像度画像解析'
    },
    {
      title: '予測的品質管理',
      description: '製造条件から品質問題を事前予測し、未然防止',
      tech: '機械学習 + IoTセンサー + 統計的品質管理'
    },
    {
      title: '自動品質レポート',
      description: '品質データを自動分析し、改善提案まで生成',
      tech: 'データ分析AI + レポート自動生成 + 可視化技術'
    },
    {
      title: 'トレーサビリティ管理',
      description: '原材料から最終製品まで完全な品質履歴を自動記録',
      tech: 'ブロックチェーン + QRコード + データベース連携'
    }
  ];

  const inspectionResults = [
    {
      id: 'P001-20241214-001',
      product: 'プレミアム部品A',
      status: 'pass',
      score: 98.5,
      issues: []
    },
    {
      id: 'P001-20241214-002',
      product: 'プレミアム部品B',
      status: 'warning',
      score: 87.2,
      issues: ['表面に微細な傷(0.02mm)を検出', '色度が許容値の上限に接近']
    },
    {
      id: 'P001-20241214-003',
      product: 'プレミアム部品C',
      status: 'fail',
      score: 45.8,
      issues: ['寸法誤差: +0.15mm (許容値: ±0.05mm)', '材質異常を検出']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 bg-gradient-to-br from-red-100 to-pink-50 opacity-50"></motion.div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-5xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold">
                <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                  AI品質管理システム
                </span>
              </h1>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
              「クオリティAI Guardian」
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              人間を超える精度で品質を守り、ブランド価値を向上
              <br />
              <span className="font-semibold text-red-600">品質コスト60%削減、不良率を1/20に改善</span>
            </p>
            
            {/* リアルタイム品質実績 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl p-4 shadow-lg"
              >
                <div className="text-2xl font-bold text-red-600">{qualityMetrics.inspections}</div>
                <div className="text-sm text-gray-600">本日検査数</div>
              </motion.div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl p-4 shadow-lg"
              >
                <div className="text-2xl font-bold text-orange-600">{qualityMetrics.defects}</div>
                <div className="text-sm text-gray-600">不良検出数</div>
              </motion.div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl p-4 shadow-lg"
              >
                <div className="text-2xl font-bold text-green-600">{qualityMetrics.accuracy.toFixed(1)}%</div>
                <div className="text-sm text-gray-600">検査精度</div>
              </motion.div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-xl p-4 shadow-lg"
              >
                <div className="text-2xl font-bold text-blue-600">{qualityMetrics.efficiency.toFixed(1)}%</div>
                <div className="text-sm text-gray-600">効率向上</div>
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
              品質革新がもたらす
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                競争優位
              </span>
            </h2>
            <p className="text-gray-600 text-lg">AI品質管理で実現する次世代製造業</p>
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
            <h2 className="text-4xl font-bold mb-4">AI品質管理を体験</h2>
            <p className="text-gray-600 text-lg">リアルタイム品質検査システムをご覧ください</p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            {/* Demo Navigation */}
            <div className="flex justify-center gap-4 mb-8">
              {[
                { key: 'inspection', label: 'リアルタイム検査', icon: Camera },
                { key: 'analysis', label: '品質分析', icon: BarChart3 },
                { key: 'improvement', label: '改善提案', icon: Settings }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveDemo(tab.key as any)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                      activeDemo === tab.key
                        ? 'bg-red-600 text-white shadow-lg'
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
              {activeDemo === 'inspection' && (
                <div>
                  <h3 className="text-xl font-semibold mb-6">リアルタイム品質検査</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold mb-4">検査結果一覧</h4>
                      <div className="space-y-3">
                        {inspectionResults.map((result, index) => (
                          <motion.div
                            key={result.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className={`p-4 rounded-lg border-l-4 ${
                              result.status === 'pass' ? 'bg-green-50 border-green-500' :
                              result.status === 'warning' ? 'bg-yellow-50 border-yellow-500' :
                              'bg-red-50 border-red-500'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="font-medium">{result.product}</div>
                              <div className="flex items-center gap-2">
                                {result.status === 'pass' ? (
                                  <CheckCircle className="w-5 h-5 text-green-500" />
                                ) : result.status === 'warning' ? (
                                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                                ) : (
                                  <AlertTriangle className="w-5 h-5 text-red-500" />
                                )}
                                <span className={`font-bold ${
                                  result.status === 'pass' ? 'text-green-600' :
                                  result.status === 'warning' ? 'text-yellow-600' :
                                  'text-red-600'
                                }`}>
                                  {result.score}点
                                </span>
                              </div>
                            </div>
                            <div className="text-sm text-gray-600">{result.id}</div>
                            {result.issues.length > 0 && (
                              <div className="mt-2 text-sm space-y-1">
                                {result.issues.map((issue, i) => (
                                  <div key={i} className="flex items-start gap-2">
                                    <div className="w-1 h-1 bg-gray-400 rounded-full mt-2"></div>
                                    <span>{issue}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold mb-4">AI検査カメラ</h4>
                      <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center mb-4">
                        <div className="text-center text-white">
                          <Camera className="w-16 h-16 mx-auto mb-2 opacity-60" />
                          <p className="text-sm opacity-60">高解像度品質検査中...</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-green-50 rounded-lg p-3">
                          <div className="text-sm text-green-800 font-medium">今日の検査精度</div>
                          <div className="text-2xl font-bold text-green-600">99.7%</div>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-3">
                          <div className="text-sm text-blue-800 font-medium">処理速度</div>
                          <div className="text-2xl font-bold text-blue-600">0.2秒/個</div>
                        </div>
                      </div>
                      
                      <div className="mt-4 bg-gray-50 rounded-lg p-4">
                        <h5 className="font-semibold mb-2">検査項目</h5>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>寸法精度</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>表面状態</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>色調検査</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>材質確認</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeDemo === 'analysis' && (
                <div>
                  <h3 className="text-xl font-semibold mb-6">品質分析ダッシュボード</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="text-lg font-bold text-green-700">合格率</div>
                          <div className="text-2xl font-bold text-green-600">97.2%</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                          <AlertTriangle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="text-lg font-bold text-yellow-700">警告</div>
                          <div className="text-2xl font-bold text-yellow-600">2.3%</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                          <AlertTriangle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="text-lg font-bold text-red-700">不合格</div>
                          <div className="text-2xl font-bold text-red-600">0.5%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold mb-4">不良要因分析</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">寸法誤差</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div className="bg-red-500 h-2 rounded-full w-1/2"></div>
                            </div>
                            <span className="text-sm font-bold">45%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">表面傷</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div className="bg-orange-500 h-2 rounded-full w-1/3"></div>
                            </div>
                            <span className="text-sm font-bold">30%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">色ムラ</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div className="bg-yellow-500 h-2 rounded-full w-1/5"></div>
                            </div>
                            <span className="text-sm font-bold">15%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">その他</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div className="bg-gray-500 h-2 rounded-full w-1/10"></div>
                            </div>
                            <span className="text-sm font-bold">10%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold mb-4">品質トレンド</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">週間合格率推移</span>
                          <span className="font-bold text-green-600">+2.3%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">月間不良率</span>
                          <span className="font-bold text-red-600">-1.8%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">検査効率</span>
                          <span className="font-bold text-blue-600">+15.4%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">コスト削減効果</span>
                          <span className="font-bold text-purple-600">¥84万円/月</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeDemo === 'improvement' && (
                <div>
                  <h3 className="text-xl font-semibold mb-6">AI改善提案システム</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-500">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="w-5 h-5 text-red-500" />
                          <span className="font-semibold text-red-800">緊急改善提案</span>
                        </div>
                        <h5 className="font-medium mb-2">製造工程3での寸法誤差増加</h5>
                        <p className="text-sm text-red-700 mb-3">
                          過去24時間で寸法誤差による不良品が15%増加。工具摩耗が原因と推定。
                        </p>
                        <div className="space-y-1 text-sm">
                          <div>• 推定コストインパクト: ¥23万円/日</div>
                          <div>• 推奨対応: 工具交換（優先度：高）</div>
                          <div>• 予想効果: 不良率0.8%→0.3%改善</div>
                        </div>
                      </div>

                      <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-500">
                        <div className="flex items-center gap-2 mb-2">
                          <Settings className="w-5 h-5 text-yellow-500" />
                          <span className="font-semibold text-yellow-800">最適化提案</span>
                        </div>
                        <h5 className="font-medium mb-2">検査パラメータ調整</h5>
                        <p className="text-sm text-yellow-700 mb-3">
                          表面検査の感度を5%向上させることで、微細傷の検出率向上が見込める。
                        </p>
                        <div className="space-y-1 text-sm">
                          <div>• 期待効果: 検出精度99.7%→99.9%</div>
                          <div>• 導入コスト: ソフトウェア更新のみ</div>
                          <div>• ROI: 2週間で回収見込み</div>
                        </div>
                      </div>

                      <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-5 h-5 text-blue-500" />
                          <span className="font-semibold text-blue-800">予防保全提案</span>
                        </div>
                        <h5 className="font-medium mb-2">設備メンテナンススケジュール</h5>
                        <p className="text-sm text-blue-700 mb-3">
                          検査装置Aの校正が推奨時期に近づいています。計画的実施を推奨。
                        </p>
                        <div className="space-y-1 text-sm">
                          <div>• 推奨実施日: 12月20日（金）</div>
                          <div>• 所要時間: 約2時間</div>
                          <div>• 影響: 精度維持、突発停止回避</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h5 className="font-semibold mb-3">改善効果予測</h5>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">品質向上効果</span>
                            <span className="font-bold text-green-600">+2.4%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">コスト削減</span>
                            <span className="font-bold text-blue-600">¥156万円/年</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">生産効率向上</span>
                            <span className="font-bold text-purple-600">+8.7%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">顧客満足度</span>
                            <span className="font-bold text-orange-600">+12%</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-green-50 rounded-lg p-4">
                        <h5 className="font-semibold text-green-800 mb-3">自動実行スケジュール</h5>
                        <div className="space-y-2 text-sm text-green-700">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>毎日 6:00 - 検査装置自動校正</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>毎週月曜 - 品質トレンド分析</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>毎月1日 - 改善効果測定</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>異常検知時 - 即座にアラート送信</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-purple-50 rounded-lg p-4">
                        <h5 className="font-semibold text-purple-800 mb-3">学習・進化機能</h5>
                        <div className="text-sm text-purple-700 space-y-2">
                          <p>• 新しい不良パターンを自動学習</p>
                          <p>• 季節変動に応じた基準値自動調整</p>
                          <p>• 他工場データとの比較分析</p>
                          <p>• 継続的な検査精度向上</p>
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
              最先端AI技術で実現する
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                完璧な品質管理
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
                className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 border border-red-100"
              >
                <h3 className="text-xl font-semibold mb-3 text-red-900">{feature.title}</h3>
                <p className="text-gray-700 mb-4">{feature.description}</p>
                <div className="text-sm text-red-600 bg-white rounded-lg px-3 py-2 inline-block">
                  <strong>技術基盤:</strong> {feature.tech}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Certification Section */}
      <section className="py-20 bg-gradient-to-br from-red-900 to-pink-800 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">品質認証・規格準拠実績</h2>
            <p className="text-xl text-red-100">国際品質基準への完全対応</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center"
            >
              <Award className="w-16 h-16 text-red-300 mx-auto mb-4" />
              <div className="text-4xl font-bold text-red-300 mb-2">ISO 9001</div>
              <div className="text-red-100 mb-4">品質管理システム</div>
              <p className="text-sm text-red-200">
                国際標準化機構が定める品質マネジメント
                システムの要求事項に完全準拠
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center"
            >
              <Shield className="w-16 h-16 text-yellow-300 mx-auto mb-4" />
              <div className="text-4xl font-bold text-yellow-300 mb-2">JIS Q 9100</div>
              <div className="text-red-100 mb-4">航空宇宙品質基準</div>
              <p className="text-sm text-red-200">
                航空宇宙・防衛産業向けの最高レベル
                品質管理基準に対応
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center"
            >
              <CheckCircle className="w-16 h-16 text-green-300 mx-auto mb-4" />
              <div className="text-4xl font-bold text-green-300 mb-2">FDA CFR</div>
              <div className="text-red-100 mb-4">医療機器規制</div>
              <p className="text-sm text-red-200">
                米国食品医薬品局が定める医療機器
                品質システム規制に完全対応
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-pink-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              品質革命で競合に差をつけませんか？
            </h2>
            <p className="text-xl text-white/90 mb-8">
              30日間の無料トライアルで次世代品質管理を体験
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-red-600 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                無料トライアル開始
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-lg font-semibold text-lg hover:bg-white/30 transition-all"
              >
                品質改善事例集をダウンロード
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default QualityAIPage;