import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Bot, TrendingUp, Clock, Users, Phone, MessageSquare, BarChart3, Zap, Target, DollarSign } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SalesAIPage: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const [activeDemo, setActiveDemo] = useState<'chat' | 'analytics' | 'results'>('chat');
  const [salesData, setSalesData] = useState({
    calls: 0,
    meetings: 0,
    deals: 0,
    revenue: 0
  });

  // アニメーション用のカウンター
  useEffect(() => {
    const interval = setInterval(() => {
      setSalesData(prev => ({
        calls: Math.min(prev.calls + Math.floor(Math.random() * 5), 247),
        meetings: Math.min(prev.meetings + Math.floor(Math.random() * 2), 45),
        deals: Math.min(prev.deals + Math.floor(Math.random() * 1), 12),
        revenue: Math.min(prev.revenue + Math.floor(Math.random() * 50000), 2450000)
      }));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const benefits = [
    {
      icon: Clock,
      title: '24時間365日営業',
      description: '深夜・休日の問い合わせも逃さない',
      value: '営業時間3倍',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: TrendingUp,
      title: '成約率大幅向上',
      description: 'AI分析による最適タイミング営業',
      value: '+350%',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Users,
      title: '人件費大幅削減',
      description: '営業人員を70%削減可能',
      value: '月額126万円削減',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Target,
      title: '精密ターゲティング',
      description: '顧客属性に応じた最適アプローチ',
      value: '精度98%',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const features = [
    {
      title: '感情認識営業',
      description: '顧客の感情を読み取り、最適なトーンで対応',
      tech: '音声感情分析AI + 心理学アルゴリズム'
    },
    {
      title: '多段階営業フロー',
      description: '初回接触からクロージングまで完全自動化',
      tech: 'GPT-4 + 業界特化学習モデル'
    },
    {
      title: '関西弁・敬語対応',
      description: '地域・年齢に応じた言葉遣いの自動調整',
      tech: '日本語特化AI + 方言データベース'
    },
    {
      title: 'リアルタイム競合分析',
      description: '競合他社との比較提案を即座に生成',
      tech: 'ビッグデータ分析 + 市場調査AI'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 bg-gradient-to-br from-blue-100 to-cyan-50 opacity-50"></motion.div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-5xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold">
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  AI営業代行システム
                </span>
              </h1>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
              「セールスAI Pro」
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              優秀な営業マンが24時間365日働き続ける
              <br />
              <span className="font-semibold text-blue-600">月額営業人件費を70%削減し、成約率を350%向上</span>
            </p>
            
            {/* リアルタイム実績表示 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl p-4 shadow-lg"
              >
                <div className="text-2xl font-bold text-blue-600">{salesData.calls}</div>
                <div className="text-sm text-gray-600">本日の営業コール</div>
              </motion.div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl p-4 shadow-lg"
              >
                <div className="text-2xl font-bold text-green-600">{salesData.meetings}</div>
                <div className="text-sm text-gray-600">商談アポ獲得</div>
              </motion.div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl p-4 shadow-lg"
              >
                <div className="text-2xl font-bold text-purple-600">{salesData.deals}</div>
                <div className="text-sm text-gray-600">成約数</div>
              </motion.div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-xl p-4 shadow-lg"
              >
                <div className="text-2xl font-bold text-orange-600">¥{salesData.revenue.toLocaleString()}</div>
                <div className="text-sm text-gray-600">売上</div>
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
              導入企業の
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                劇的成果
              </span>
            </h2>
            <p className="text-gray-600 text-lg">実際の数値で証明された圧倒的効果</p>
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
            <h2 className="text-4xl font-bold mb-4">AI営業システムを体験</h2>
            <p className="text-gray-600 text-lg">実際の営業フローをご覧ください</p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            {/* Demo Navigation */}
            <div className="flex justify-center gap-4 mb-8">
              {[
                { key: 'chat', label: '営業会話', icon: MessageSquare },
                { key: 'analytics', label: 'リアルタイム分析', icon: BarChart3 },
                { key: 'results', label: '成果レポート', icon: TrendingUp }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveDemo(tab.key as any)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                      activeDemo === tab.key
                        ? 'bg-blue-600 text-white shadow-lg'
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
              {activeDemo === 'chat' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold mb-4">AI営業会話デモ</h3>
                  <div className="space-y-3">
                    <div className="flex justify-end">
                      <div className="bg-blue-600 text-white px-4 py-2 rounded-lg max-w-xs">
                        御社のサービスに興味があります
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-gray-100 px-4 py-2 rounded-lg max-w-md">
                        <div className="flex items-center gap-2 mb-1">
                          <Bot className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium">AI営業担当</span>
                        </div>
                        ありがとうございます！御社の業界に特化したソリューションをご提案させていただけます。
                        まず、現在の営業体制で一番お困りのことを教えていただけますでしょうか？
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-blue-600 text-white px-4 py-2 rounded-lg max-w-xs">
                        人手不足で営業に手が回らなくて...
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-gray-100 px-4 py-2 rounded-lg max-w-md">
                        <div className="flex items-center gap-2 mb-1">
                          <Bot className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium">AI営業担当</span>
                        </div>
                        まさにそのお悩みを解決するのが弊社のAI営業システムです。
                        御社と同じ業界のA社様では、導入後3ヶ月で営業効率が340%向上し、
                        人件費を月額120万円削減されています。具体的な導入プランをご提案させていただけませんか？
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeDemo === 'analytics' && (
                <div>
                  <h3 className="text-xl font-semibold mb-6">リアルタイム営業分析</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-blue-600">85%</div>
                      <div className="text-sm text-gray-600">顧客関心度</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-green-600">高</div>
                      <div className="text-sm text-gray-600">成約可能性</div>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-orange-600">今すぐ</div>
                      <div className="text-sm text-gray-600">最適提案タイミング</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-purple-600">A+</div>
                      <div className="text-sm text-gray-600">顧客ランク</div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">AIからの提案</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-yellow-500" />
                        <span>競合A社より15%安い価格を提示するチャンス</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-green-500" />
                        <span>ROI計算書を提示すると成約率40%向上</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <span>フォローアップは2日後の14:00が最適</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeDemo === 'results' && (
                <div>
                  <h3 className="text-xl font-semibold mb-6">月次成果レポート</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-green-50 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700">売上向上</span>
                          <span className="text-2xl font-bold text-green-600">+340%</span>
                        </div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700">コスト削減</span>
                          <span className="text-2xl font-bold text-blue-600">-70%</span>
                        </div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700">成約率</span>
                          <span className="text-2xl font-bold text-purple-600">47%</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold mb-3">次月の改善提案</h4>
                      <div className="space-y-2 text-sm">
                        <div>• アプローチ時間を14:00-16:00に集中</div>
                        <div>• 製造業向けの提案資料を強化</div>
                        <div>• フォローアップ間隔を3日→2日に短縮</div>
                        <div>• 競合比較資料の視覚化を改善</div>
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
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                超高精度営業
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
                className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100"
              >
                <h3 className="text-xl font-semibold mb-3 text-blue-900">{feature.title}</h3>
                <p className="text-gray-700 mb-4">{feature.description}</p>
                <div className="text-sm text-blue-600 bg-white rounded-lg px-3 py-2 inline-block">
                  <strong>技術基盤:</strong> {feature.tech}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculation */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-cyan-800 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">投資対効果（ROI）計算</h2>
            <p className="text-xl text-blue-100">具体的な数値で見る導入メリット</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <DollarSign className="w-6 h-6" />
                従来の営業コスト（月額）
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>営業担当者3名</span>
                  <span>180万円</span>
                </div>
                <div className="flex justify-between">
                  <span>交通費・接待費</span>
                  <span>30万円</span>
                </div>
                <div className="flex justify-between">
                  <span>営業ツール・システム</span>
                  <span>15万円</span>
                </div>
                <div className="border-t border-white/30 pt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>合計</span>
                    <span>225万円</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Bot className="w-6 h-6" />
                AI営業システム（月額）
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>AI営業システム</span>
                  <span>49万円</span>
                </div>
                <div className="flex justify-between">
                  <span>運用サポート</span>
                  <span>15万円</span>
                </div>
                <div className="flex justify-between">
                  <span>成果連動報酬</span>
                  <span>35万円</span>
                </div>
                <div className="border-t border-white/30 pt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>合計</span>
                    <span>99万円</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-12"
          >
            <div className="bg-green-500 rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">月額126万円のコスト削減！</h3>
              <p className="text-lg mb-4">さらに売上は340%向上</p>
              <div className="text-3xl font-bold">
                年間ROI: <span className="text-yellow-300">1,200%</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              AI営業革命を今すぐ始めませんか？
            </h2>
            <p className="text-xl text-white/90 mb-8">
              30日間の無料トライアルで効果を実感してください
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                無料トライアル開始
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-lg font-semibold text-lg hover:bg-white/30 transition-all"
              >
                詳細資料をダウンロード
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SalesAIPage;