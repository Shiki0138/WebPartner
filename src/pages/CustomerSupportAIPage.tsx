import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MessageCircle, Heart, Globe, Clock, Headphones, Star, BarChart3, Shield, Zap, Users } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CustomerSupportAIPage: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const [activeDemo, setActiveDemo] = useState<'chat' | 'emotion' | 'analytics'>('chat');
  const [supportMetrics, setSupportMetrics] = useState({
    tickets: 0,
    satisfaction: 0,
    responseTime: 0,
    languages: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSupportMetrics(prev => ({
        tickets: Math.min(prev.tickets + Math.floor(Math.random() * 8), 342),
        satisfaction: Math.min(prev.satisfaction + 0.1, 98.7),
        responseTime: Math.max(prev.responseTime - 0.05, 0.3),
        languages: Math.min(prev.languages + Math.floor(Math.random() * 0.1), 50)
      }));
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const benefits = [
    {
      icon: Clock,
      title: '24時間365日対応',
      description: '深夜・休日も即座に顧客対応',
      value: '応答時間0.3秒',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Heart,
      title: '感情認識対応',
      description: '顧客の感情を理解し適切に沈静化',
      value: '満足度98.7%',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: Users,
      title: 'サポート人件費削減',
      description: 'カスタマーサポート人員を60%削減',
      value: '月額72万円削減',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Globe,
      title: '50言語対応',
      description: '世界中の顧客にネイティブレベル対応',
      value: 'グローバル展開',
      color: 'from-purple-500 to-indigo-500'
    }
  ];

  const features = [
    {
      title: '感情対応型サポート',
      description: '怒りレベルを検知し、段階的な沈静化技術で顧客満足度を向上',
      tech: '感情AI + 心理学アルゴリズム + 共感表現生成'
    },
    {
      title: '完全製品知識習得',
      description: '全マニュアル・FAQを学習し、専門技術者レベルの回答を提供',
      tech: 'RAG + 知識グラフ + リアルタイム学習'
    },
    {
      title: '多言語・多文化対応',
      description: '50言語対応と文化的配慮で、グローバル顧客満足度を最大化',
      tech: '多言語LLM + 文化データベース + 宗教的配慮AI'
    },
    {
      title: '予測的問題解決',
      description: '問い合わせ内容から潜在的問題を予測し、事前解決策を提案',
      tech: '予測AI + パターン分析 + 予防的メンテナンス'
    }
  ];

  const chatMessages = [
    {
      type: 'customer',
      message: '商品が故障して困っています！',
      emotion: 'angry',
      timestamp: '14:32'
    },
    {
      type: 'ai',
      message: 'ご不便をおかけして大変申し訳ございません。すぐに解決いたします。まず、お客様のお気持ちを理解いたします。どのような状況でしょうか？',
      emotion: 'empathetic',
      timestamp: '14:32'
    },
    {
      type: 'customer',
      message: '昨日買ったばかりなのに、電源が入らなくなりました...',
      emotion: 'frustrated',
      timestamp: '14:33'
    },
    {
      type: 'ai',
      message: 'せっかくご購入いただいたのに、このような状況で本当に申し訳ございません。すぐに新品交換の手配をいたします。また、今後このようなことがないよう品質管理も強化いたします。',
      emotion: 'apologetic',
      timestamp: '14:33'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 bg-gradient-to-br from-cyan-100 to-blue-50 opacity-50"></motion.div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-5xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl flex items-center justify-center">
                <Headphones className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold">
                <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  AI顧客サポート
                </span>
              </h1>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
              「カスタマーAI Excellence」
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              感情を理解し、心に寄り添うAIが24時間対応
              <br />
              <span className="font-semibold text-cyan-600">サポート人件費60%削減、顧客満足度40%向上</span>
            </p>
            
            {/* リアルタイムサポート実績 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl p-4 shadow-lg"
              >
                <div className="text-2xl font-bold text-cyan-600">{supportMetrics.tickets}</div>
                <div className="text-sm text-gray-600">本日の対応件数</div>
              </motion.div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl p-4 shadow-lg"
              >
                <div className="text-2xl font-bold text-pink-600">{supportMetrics.satisfaction.toFixed(1)}%</div>
                <div className="text-sm text-gray-600">顧客満足度</div>
              </motion.div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl p-4 shadow-lg"
              >
                <div className="text-2xl font-bold text-blue-600">{supportMetrics.responseTime.toFixed(1)}秒</div>
                <div className="text-sm text-gray-600">平均応答時間</div>
              </motion.div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-xl p-4 shadow-lg"
              >
                <div className="text-2xl font-bold text-purple-600">{supportMetrics.languages}</div>
                <div className="text-sm text-gray-600">対応言語数</div>
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
              顧客の心に寄り添う
              <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                革新的サポート
              </span>
            </h2>
            <p className="text-gray-600 text-lg">感情AIで実現する次世代カスタマーエクスペリエンス</p>
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
            <h2 className="text-4xl font-bold mb-4">AI顧客サポートを体験</h2>
            <p className="text-gray-600 text-lg">感情認識による革新的な顧客対応をご覧ください</p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            {/* Demo Navigation */}
            <div className="flex justify-center gap-4 mb-8">
              {[
                { key: 'chat', label: '感情対応チャット', icon: MessageCircle },
                { key: 'emotion', label: '感情分析', icon: Heart },
                { key: 'analytics', label: 'サポート分析', icon: BarChart3 }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveDemo(tab.key as any)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                      activeDemo === tab.key
                        ? 'bg-cyan-600 text-white shadow-lg'
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">感情認識チャット</h3>
                    <div className="bg-gray-50 rounded-lg p-4 h-96 overflow-y-auto">
                      {chatMessages.map((msg, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.3 }}
                          className={`mb-4 ${msg.type === 'customer' ? 'text-right' : 'text-left'}`}
                        >
                          <div className={`inline-block max-w-[80%] p-3 rounded-lg ${
                            msg.type === 'customer' 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-white border border-gray-200'
                          }`}>
                            <p className="text-sm">{msg.message}</p>
                            <div className="text-xs opacity-70 mt-1">
                              {msg.timestamp} • 感情: {msg.emotion === 'angry' ? '😠怒り' : 
                                msg.emotion === 'frustrated' ? '😤困惑' :
                                msg.emotion === 'empathetic' ? '🤝共感' : '🙏謝罪'}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-4">リアルタイム感情分析</h4>
                    <div className="space-y-4">
                      <div className="bg-red-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-red-800">顧客の怒りレベル</span>
                          <span className="text-2xl font-bold text-red-600">高→低</span>
                        </div>
                        <div className="w-full bg-red-200 rounded-full h-2">
                          <motion.div 
                            className="bg-red-600 h-2 rounded-full"
                            initial={{ width: '85%' }}
                            animate={{ width: '15%' }}
                            transition={{ duration: 2 }}
                          />
                        </div>
                      </div>
                      
                      <div className="bg-green-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-green-800">満足度</span>
                          <span className="text-2xl font-bold text-green-600">15%→90%</span>
                        </div>
                        <div className="w-full bg-green-200 rounded-full h-2">
                          <motion.div 
                            className="bg-green-600 h-2 rounded-full"
                            initial={{ width: '15%' }}
                            animate={{ width: '90%' }}
                            transition={{ duration: 2 }}
                          />
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h5 className="font-semibold text-blue-800 mb-2">AI対応戦略</h5>
                        <div className="text-sm text-blue-700 space-y-1">
                          <div>• 最初に共感の言葉で感情を受け止める</div>
                          <div>• 具体的な解決策を即座に提示</div>
                          <div>• 再発防止策も併せて説明</div>
                          <div>• 顧客の時間を尊重した迅速対応</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeDemo === 'emotion' && (
                <div>
                  <h3 className="text-xl font-semibold mb-6">感情分析ダッシュボード</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-lg">😊</span>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-green-700">満足</div>
                          <div className="text-2xl font-bold text-green-600">67%</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-lg">😐</span>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-yellow-700">普通</div>
                          <div className="text-2xl font-bold text-yellow-600">23%</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-lg">😠</span>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-red-700">不満</div>
                          <div className="text-2xl font-bold text-red-600">10%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold mb-4">感情パターン分析</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">怒り → 満足への転換率</span>
                          <span className="font-bold text-green-600">89%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">平均感情改善時間</span>
                          <span className="font-bold text-blue-600">3.2分</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">エスカレーション率</span>
                          <span className="font-bold text-purple-600">2.1%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold mb-4">AI改善提案</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-yellow-500" />
                          <span>感情認識精度を95%→97%に向上</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Heart className="w-4 h-4 text-pink-500" />
                          <span>共感表現のバリエーションを30%拡充</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-blue-500" />
                          <span>怒り沈静化の新手法を追加学習</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeDemo === 'analytics' && (
                <div>
                  <h3 className="text-xl font-semibold mb-6">サポート分析ダッシュボード</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-blue-600">342</div>
                      <div className="text-sm text-blue-700">本日対応件数</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-green-600">0.3秒</div>
                      <div className="text-sm text-green-700">平均応答時間</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-purple-600">98.7%</div>
                      <div className="text-sm text-purple-700">解決率</div>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-orange-600">¥720万</div>
                      <div className="text-sm text-orange-700">月間コスト削減</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold mb-4">問い合わせ分類</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">製品使用方法</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div className="bg-blue-500 h-2 rounded-full w-3/4"></div>
                            </div>
                            <span className="text-sm font-bold">45%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">技術的トラブル</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div className="bg-red-500 h-2 rounded-full w-1/3"></div>
                            </div>
                            <span className="text-sm font-bold">25%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">注文・配送</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full w-1/5"></div>
                            </div>
                            <span className="text-sm font-bold">20%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">その他</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div className="bg-purple-500 h-2 rounded-full w-1/10"></div>
                            </div>
                            <span className="text-sm font-bold">10%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold mb-4">品質向上提案</h4>
                      <div className="space-y-3 text-sm">
                        <div className="bg-blue-100 rounded p-3">
                          <strong className="text-blue-800">FAQ更新提案:</strong>
                          <div className="text-blue-700 mt-1">「Wi-Fi設定方法」の質問が増加中。詳細手順の追加を推奨</div>
                        </div>
                        <div className="bg-green-100 rounded p-3">
                          <strong className="text-green-800">プロアクティブ対応:</strong>
                          <div className="text-green-700 mt-1">配送遅延を事前通知することで満足度20%向上</div>
                        </div>
                        <div className="bg-purple-100 rounded p-3">
                          <strong className="text-purple-800">トレーニング改善:</strong>
                          <div className="text-purple-700 mt-1">新製品の学習データを追加学習中</div>
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
              感情AIで実現する
              <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                次世代サポート
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
                className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border border-cyan-100"
              >
                <h3 className="text-xl font-semibold mb-3 text-cyan-900">{feature.title}</h3>
                <p className="text-gray-700 mb-4">{feature.description}</p>
                <div className="text-sm text-cyan-600 bg-white rounded-lg px-3 py-2 inline-block">
                  <strong>技術基盤:</strong> {feature.tech}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Support Section */}
      <section className="py-20 bg-gradient-to-br from-cyan-900 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">グローバル顧客満足度実績</h2>
            <p className="text-xl text-cyan-100">世界50言語でのカスタマーサポート成果</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center"
            >
              <Globe className="w-16 h-16 text-cyan-300 mx-auto mb-4" />
              <div className="text-4xl font-bold text-cyan-300 mb-2">50+</div>
              <div className="text-cyan-100 mb-4">対応言語</div>
              <p className="text-sm text-cyan-200">
                英語、中国語、韓国語、スペイン語など
                世界中の顧客にネイティブレベルで対応
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center"
            >
              <Star className="w-16 h-16 text-yellow-300 mx-auto mb-4" />
              <div className="text-4xl font-bold text-yellow-300 mb-2">98.7%</div>
              <div className="text-cyan-100 mb-4">満足度</div>
              <p className="text-sm text-cyan-200">
                文化的配慮と感情認識により、
                各国で業界トップクラスの満足度を実現
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center"
            >
              <Clock className="w-16 h-16 text-green-300 mx-auto mb-4" />
              <div className="text-4xl font-bold text-green-300 mb-2">0.3秒</div>
              <div className="text-cyan-100 mb-4">応答時間</div>
              <p className="text-sm text-cyan-200">
                どの言語でも同一の高速応答。
                時差を気にせず24時間完璧なサポート
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              感情AIで顧客満足度革命を起こしませんか？
            </h2>
            <p className="text-xl text-white/90 mb-8">
              30日間の無料トライアルで次世代サポートを体験
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-cyan-600 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                無料トライアル開始
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-lg font-semibold text-lg hover:bg-white/30 transition-all"
              >
                満足度向上事例集をダウンロード
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CustomerSupportAIPage;