import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Users, Brain, Clock, Target, Video, FileText, TrendingDown, AlertTriangle, CheckCircle, Award } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HRAIPage: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const [activeDemo, setActiveDemo] = useState<'interview' | 'analysis' | 'matching'>('interview');
  const [hrMetrics, setHrMetrics] = useState({
    applications: 0,
    interviews: 0,
    hires: 0,
    retention: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setHrMetrics(prev => ({
        applications: Math.min(prev.applications + Math.floor(Math.random() * 3), 156),
        interviews: Math.min(prev.interviews + Math.floor(Math.random() * 2), 89),
        hires: Math.min(prev.hires + Math.floor(Math.random() * 1), 23),
        retention: Math.min(prev.retention + 0.1, 94.5)
      }));
    }, 150);

    return () => clearInterval(interval);
  }, []);

  const benefits = [
    {
      icon: Clock,
      title: '採用時間70%短縮',
      description: 'AIが24時間面接対応、即座に人材評価',
      value: '3週間→1週間',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: TrendingDown,
      title: '離職率50%改善',
      description: '入社前の適性診断で最適マッチング',
      value: '25%→12.5%',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Target,
      title: '採用コスト80%削減',
      description: '人材紹介会社への依存から脱却',
      value: '月額200万円削減',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Brain,
      title: '面接精度95%',
      description: 'AI分析による客観的人材評価',
      value: '業界最高水準',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const features = [
    {
      title: '24時間AI面接官',
      description: '音声・表情・視線を総合分析し、候補者の真の能力を評価',
      tech: 'OpenCV + 感情認識AI + 音声解析'
    },
    {
      title: '日本企業文化適性診断',
      description: '協調性・責任感・成長意欲を日本企業基準で評価',
      tech: '心理学アルゴリズム + 文化的適性モデル'
    },
    {
      title: 'ストレス耐性測定',
      description: 'マイクロ表情分析でストレス反応パターンを特定',
      tech: 'FACS（顔面動作符号化システム）+ ML'
    },
    {
      title: '離職リスク予測',
      description: '過去データから離職可能性を89%精度で予測',
      tech: '機械学習 + 行動パターン分析'
    }
  ];

  const interviewQuestions = [
    "これまでの職歴で最も困難だった課題について教えてください。",
    "チームでの協働において大切にしていることは何ですか？",
    "5年後、どのような立場で働いていたいと考えていますか？",
    "弊社を志望された理由をお聞かせください。"
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    const questionInterval = setInterval(() => {
      setCurrentQuestion(prev => (prev + 1) % interviewQuestions.length);
    }, 4000);

    return () => clearInterval(questionInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 bg-gradient-to-br from-green-100 to-emerald-50 opacity-50"></motion.div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-5xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold">
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  AI人事・採用システム
                </span>
              </h1>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
              「リクルートAI Master」
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              優秀な人材を見極め、長期活躍を予測する
              <br />
              <span className="font-semibold text-green-600">採用コストを80%削減し、離職率を50%改善</span>
            </p>
            
            {/* リアルタイム採用実績 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl p-4 shadow-lg"
              >
                <div className="text-2xl font-bold text-green-600">{hrMetrics.applications}</div>
                <div className="text-sm text-gray-600">応募者数</div>
              </motion.div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl p-4 shadow-lg"
              >
                <div className="text-2xl font-bold text-blue-600">{hrMetrics.interviews}</div>
                <div className="text-sm text-gray-600">AI面接実施</div>
              </motion.div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl p-4 shadow-lg"
              >
                <div className="text-2xl font-bold text-purple-600">{hrMetrics.hires}</div>
                <div className="text-sm text-gray-600">採用決定</div>
              </motion.div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-xl p-4 shadow-lg"
              >
                <div className="text-2xl font-bold text-orange-600">{hrMetrics.retention.toFixed(1)}%</div>
                <div className="text-sm text-gray-600">定着率</div>
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
              採用革命がもたらす
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                劇的改善
              </span>
            </h2>
            <p className="text-gray-600 text-lg">データで証明された採用成功事例</p>
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
            <h2 className="text-4xl font-bold mb-4">AI採用システムを体験</h2>
            <p className="text-gray-600 text-lg">革新的な採用プロセスをご覧ください</p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            {/* Demo Navigation */}
            <div className="flex justify-center gap-4 mb-8">
              {[
                { key: 'interview', label: 'AI面接', icon: Video },
                { key: 'analysis', label: '人材分析', icon: Brain },
                { key: 'matching', label: 'マッチング', icon: Target }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveDemo(tab.key as any)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                      activeDemo === tab.key
                        ? 'bg-green-600 text-white shadow-lg'
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
              {activeDemo === 'interview' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">AI面接シミュレーション</h3>
                    <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center mb-4">
                      <div className="text-center text-white">
                        <Video className="w-16 h-16 mx-auto mb-2 opacity-60" />
                        <p className="text-sm opacity-60">面接映像解析中...</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium">質問に対する回答精度</span>
                        </div>
                        <div className="text-lg font-bold text-green-600">87%</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Brain className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium">論理的思考力</span>
                        </div>
                        <div className="text-lg font-bold text-blue-600">A+</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Users className="w-4 h-4 text-purple-600" />
                          <span className="text-sm font-medium">コミュニケーション能力</span>
                        </div>
                        <div className="text-lg font-bold text-purple-600">優秀</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-4">現在の質問</h4>
                    <div className="bg-green-50 rounded-lg p-4 mb-4">
                      <motion.p
                        key={currentQuestion}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-gray-800"
                      >
                        {interviewQuestions[currentQuestion]}
                      </motion.p>
                    </div>
                    <h4 className="text-lg font-semibold mb-4">AI分析結果</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>回答の一貫性が高い</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>具体的なエピソードが豊富</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span>やや緊張している可能性</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>企業文化への適合度が高い</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeDemo === 'analysis' && (
                <div>
                  <h3 className="text-xl font-semibold mb-6">AI人材分析レポート</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">適性スコア</h4>
                      <div className="text-3xl font-bold text-green-600 mb-2">92/100</div>
                      <div className="text-sm text-green-700">高い適性を示しています</div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">ストレス耐性</h4>
                      <div className="text-3xl font-bold text-blue-600 mb-2">A+</div>
                      <div className="text-sm text-blue-700">高ストレス環境でも安定</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-800 mb-2">成長ポテンシャル</h4>
                      <div className="text-3xl font-bold text-purple-600 mb-2">高</div>
                      <div className="text-sm text-purple-700">継続的な成長が期待</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold mb-3">強みの分析</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span>論理的思考力</span>
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>コミュニケーション</span>
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>チームワーク</span>
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className="bg-purple-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>問題解決能力</span>
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className="bg-orange-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold mb-3">リスク分析</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>離職リスク: 低（12%）</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>パフォーマンス安定性: 高</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-yellow-500" />
                          <span>初期適応期間: 標準的</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>組織文化適合: 高</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeDemo === 'matching' && (
                <div>
                  <h3 className="text-xl font-semibold mb-6">最適ポジションマッチング</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-green-50 rounded-lg p-6 border-2 border-green-200">
                      <div className="text-center mb-4">
                        <Award className="w-12 h-12 text-green-600 mx-auto mb-2" />
                        <h4 className="font-semibold text-green-800">最適マッチ</h4>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold mb-2">営業企画マネージャー</div>
                        <div className="text-3xl font-bold text-green-600 mb-2">96%</div>
                        <div className="text-sm text-green-700">適合度</div>
                      </div>
                      <div className="mt-4 text-sm space-y-1">
                        <div>• 戦略的思考力が要求される</div>
                        <div>• チームリーダーシップが活かせる</div>
                        <div>• 分析スキルが直接役立つ</div>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                      <div className="text-center mb-4">
                        <Target className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                        <h4 className="font-semibold text-blue-800">代替案</h4>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold mb-2">プロダクトマネージャー</div>
                        <div className="text-3xl font-bold text-blue-600 mb-2">89%</div>
                        <div className="text-sm text-blue-700">適合度</div>
                      </div>
                      <div className="mt-4 text-sm space-y-1">
                        <div>• 技術理解力を活用</div>
                        <div>• 顧客志向の強さが合致</div>
                        <div>• 学習意欲が要求される</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <div className="text-center mb-4">
                        <Users className="w-12 h-12 text-gray-600 mx-auto mb-2" />
                        <h4 className="font-semibold text-gray-800">要検討</h4>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold mb-2">人事マネージャー</div>
                        <div className="text-3xl font-bold text-gray-600 mb-2">73%</div>
                        <div className="text-sm text-gray-700">適合度</div>
                      </div>
                      <div className="mt-4 text-sm space-y-1">
                        <div>• 人事経験の補強が必要</div>
                        <div>• コミュニケーション力は十分</div>
                        <div>• 成長により適合度向上可能</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold mb-4">AIからの採用推奨</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-green-800 mb-2">推奨理由</h5>
                        <ul className="text-sm space-y-1 text-green-700">
                          <li>• 既存チームとの相性が抜群</li>
                          <li>• 即戦力として3ヶ月以内に貢献可能</li>
                          <li>• 長期的な成長ポテンシャルが高い</li>
                          <li>• 企業文化への適応力が優秀</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-blue-800 mb-2">フォロー提案</h5>
                        <ul className="text-sm space-y-1 text-blue-700">
                          <li>• 入社1ヶ月目: 集中的なOJT実施</li>
                          <li>• 3ヶ月目: 目標設定とメンタリング</li>
                          <li>• 6ヶ月目: 昇進・昇格の検討</li>
                          <li>• 継続的: キャリア開発サポート</li>
                        </ul>
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
              科学的人材評価で実現する
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                完璧な採用
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
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100"
              >
                <h3 className="text-xl font-semibold mb-3 text-green-900">{feature.title}</h3>
                <p className="text-gray-700 mb-4">{feature.description}</p>
                <div className="text-sm text-green-600 bg-white rounded-lg px-3 py-2 inline-block">
                  <strong>技術基盤:</strong> {feature.tech}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gradient-to-br from-green-900 to-emerald-800 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">導入企業の成功事例</h2>
            <p className="text-xl text-green-100">AI採用で実現した驚異的改善</p>
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
                <div className="text-4xl font-bold text-green-300">70%</div>
                <div className="text-green-100">採用時間短縮</div>
              </div>
              <h3 className="text-lg font-semibold mb-2">製造業A社</h3>
              <p className="text-green-100 text-sm">従来3週間かかっていた採用プロセスを1週間に短縮。優秀な人材の他社流出を防止。</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
            >
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-green-300">85%</div>
                <div className="text-green-100">コスト削減</div>
              </div>
              <h3 className="text-lg font-semibold mb-2">IT企業B社</h3>
              <p className="text-green-100 text-sm">人材紹介会社への依存を脱却。年間採用コストを1,200万円から180万円に削減。</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
            >
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-green-300">95%</div>
                <div className="text-green-100">定着率向上</div>
              </div>
              <h3 className="text-lg font-semibold mb-2">サービス業C社</h3>
              <p className="text-green-100 text-sm">AI適性診断により、企業文化に適した人材のみを採用。1年以内離職率を5%まで改善。</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              AI採用革命を今すぐ始めませんか？
            </h2>
            <p className="text-xl text-white/90 mb-8">
              30日間の無料トライアルで採用プロセスの革新を体験
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-green-600 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                無料トライアル開始
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-lg font-semibold text-lg hover:bg-white/30 transition-all"
              >
                導入事例資料をダウンロード
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HRAIPage;