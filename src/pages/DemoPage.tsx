import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Bot, Brain, Eye, BarChart3, MessageSquare, Zap, TrendingUp, Layers, FileText, Target } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface HeatmapPoint {
  x: number;
  y: number;
  timestamp: number;
  type: 'click' | 'move';
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AnalyticsData {
  visitors: number;
  conversions: number;
  revenue: number;
  engagement: number;
}

const DemoPage: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState<string>('heatmap');
  const [heatmapPoints, setHeatmapPoints] = useState<HeatmapPoint[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'こんにちは！AI営業アシスタントです。どのような製品をお探しですか？',
      timestamp: new Date()
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    visitors: 1234,
    conversions: 89,
    revenue: 2450000,
    engagement: 78
  });
  
  const demoAreaRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ヒートマップのマウストラッキング
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isRecording || !demoAreaRef.current) return;
    
    const rect = demoAreaRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setHeatmapPoints(prev => [...prev, {
      x,
      y,
      timestamp: Date.now(),
      type: 'move' as const
    }].slice(-500)); // 最新500ポイントのみ保持
  }, [isRecording]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isRecording || !demoAreaRef.current) return;
    
    const rect = demoAreaRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setHeatmapPoints(prev => [...prev, {
      x,
      y,
      timestamp: Date.now(),
      type: 'click' as const
    }]);
  }, [isRecording]);

  // ヒートマップの描画
  useEffect(() => {
    if (!canvasRef.current || activeDemo !== 'heatmap') return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // キャンバスをクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ヒートマップを描画
    heatmapPoints.forEach((point, index) => {
      const age = Date.now() - point.timestamp;
      const opacity = Math.max(0, 1 - age / 5000); // 5秒でフェードアウト
      
      if (point.type === 'click') {
        // クリックポイント
        ctx.beginPath();
        ctx.arc(point.x, point.y, 20, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 59, 48, ${opacity * 0.6})`;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(point.x, point.y, 30, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 59, 48, ${opacity * 0.3})`;
        ctx.fill();
      } else {
        // 移動軌跡
        ctx.beginPath();
        ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(52, 199, 89, ${opacity * 0.4})`;
        ctx.fill();
      }
    });

    // アニメーションループ
    const animationId = requestAnimationFrame(() => {});
    return () => cancelAnimationFrame(animationId);
  }, [heatmapPoints, activeDemo]);

  // チャット機能
  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: userInput,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsTyping(true);

    // AIレスポンスのシミュレーション
    setTimeout(() => {
      const responses = [
        'なるほど！その用途でしたら、弊社のプレミアムプランがおすすめです。月額98,000円で全機能をご利用いただけます。',
        'お客様のビジネス規模ですと、ROI340%の改善が期待できます。詳しい資料をお送りしましょうか？',
        '競合他社と比較して、弊社のAIは学習速度が3倍速く、精度も20%高いという実績があります。',
        '無料トライアルで30日間、全機能をお試しいただけます。今すぐ始めますか？'
      ];

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  // リアルタイムアナリティクス更新
  useEffect(() => {
    if (activeDemo !== 'analytics') return;

    const interval = setInterval(() => {
      setAnalyticsData(prev => ({
        visitors: prev.visitors + Math.floor(Math.random() * 5),
        conversions: prev.conversions + (Math.random() > 0.7 ? 1 : 0),
        revenue: prev.revenue + Math.floor(Math.random() * 50000),
        engagement: Math.min(100, prev.engagement + (Math.random() - 0.3) * 2)
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [activeDemo]);

  const demos = [
    {
      id: 'heatmap',
      title: 'リアルタイムヒートマップ',
      icon: Eye,
      description: 'ユーザー行動を瞬時に可視化'
    },
    {
      id: 'chat',
      title: 'AI営業チャット',
      icon: MessageSquare,
      description: '24時間365日の自動接客'
    },
    {
      id: 'analytics',
      title: 'AI分析ダッシュボード',
      icon: BarChart3,
      description: 'リアルタイムビジネス分析'
    },
    {
      id: 'auto-heatmap',
      title: 'AIヒートマップ自動生成',
      icon: Layers,
      description: 'AIがユーザー行動を自動解析'
    },
    {
      id: 'predictive',
      title: 'AI予測ページ提案',
      icon: Target,
      description: '訪問者に最適なページを予測'
    },
    {
      id: 'report',
      title: 'AIレポート自動生成',
      icon: FileText,
      description: '日次レポートを自動作成'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-blue-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center"
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                AIの魔法を体験
              </h1>
            </div>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              実際のAI機能をリアルタイムで体験してください
              <br />
              <span className="font-semibold text-purple-600">これが未来のウェブサイトです</span>
            </p>
          </motion.div>

          {/* Demo Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {demos.map((demo) => {
              const Icon = demo.icon;
              return (
                <motion.button
                  key={demo.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveDemo(demo.id)}
                  className={`px-6 py-4 rounded-2xl font-medium transition-all flex items-center gap-3 ${
                    activeDemo === demo.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-semibold">{demo.title}</div>
                    <div className="text-xs opacity-80">{demo.description}</div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Demo Area */}
          <motion.div
            layout
            className="max-w-6xl mx-auto"
          >
            <AnimatePresence mode="wait">
              {/* Heatmap Demo */}
              {activeDemo === 'heatmap' && (
                <motion.div
                  key="heatmap"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white rounded-3xl shadow-2xl overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold mb-2">リアルタイムヒートマップデモ</h2>
                        <p className="opacity-90">マウスを動かしてクリックしてみてください</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsRecording(!isRecording)}
                        className={`px-6 py-3 rounded-lg font-medium transition-all ${
                          isRecording
                            ? 'bg-red-500 text-white'
                            : 'bg-white text-purple-600'
                        }`}
                      >
                        {isRecording ? '記録停止' : '記録開始'}
                      </motion.button>
                    </div>
                  </div>

                  <div
                    ref={demoAreaRef}
                    onMouseMove={handleMouseMove}
                    onClick={handleClick}
                    className="relative h-[600px] bg-gray-50 cursor-crosshair"
                  >
                    <canvas
                      ref={canvasRef}
                      width={1200}
                      height={600}
                      className="absolute inset-0 w-full h-full pointer-events-none"
                    />
                    
                    {/* Sample Website Layout */}
                    <div className="p-8 pointer-events-none">
                      <div className="bg-white rounded-lg shadow p-6 mb-6">
                        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                        <div className="grid grid-cols-3 gap-4">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-gray-100 rounded-lg p-4">
                              <div className="h-32 bg-gray-200 rounded mb-3"></div>
                              <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white rounded-lg shadow p-6">
                          <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                          <div className="space-y-2">
                            {[1, 2, 3, 4].map((i) => (
                              <div key={i} className="h-4 bg-gray-100 rounded"></div>
                            ))}
                          </div>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                          <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                          <div className="h-24 bg-gray-100 rounded"></div>
                        </div>
                      </div>
                    </div>

                    {isRecording && (
                      <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full flex items-center gap-2"
                      >
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                        記録中
                      </motion.div>
                    )}
                  </div>

                  <div className="p-6 bg-gray-50 border-t">
                    <div className="grid grid-cols-4 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-purple-600">{heatmapPoints.filter(p => p.type === 'click').length}</div>
                        <div className="text-sm text-gray-600">クリック数</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">{heatmapPoints.length}</div>
                        <div className="text-sm text-gray-600">トラッキングポイント</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600">リアルタイム</div>
                        <div className="text-sm text-gray-600">更新頻度</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-orange-600">99.9%</div>
                        <div className="text-sm text-gray-600">精度</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Chat Demo */}
              {activeDemo === 'chat' && (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white rounded-3xl shadow-2xl overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6">
                    <div className="flex items-center gap-3">
                      <Bot className="w-8 h-8" />
                      <div>
                        <h2 className="text-2xl font-bold">AI営業アシスタント</h2>
                        <p className="opacity-90">24時間365日対応・成約率3倍向上</p>
                      </div>
                    </div>
                  </div>

                  <div className="h-[500px] flex flex-col">
                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                      {chatMessages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                            message.role === 'user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {message.role === 'assistant' && (
                              <div className="flex items-center gap-2 mb-1">
                                <Bot className="w-4 h-4" />
                                <span className="text-xs font-medium">AI営業</span>
                              </div>
                            )}
                            <p>{message.content}</p>
                          </div>
                        </motion.div>
                      ))}
                      
                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex justify-start"
                        >
                          <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                            <div className="flex gap-1">
                              <motion.div
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 0.5, repeat: Infinity, delay: 0 }}
                                className="w-2 h-2 bg-gray-400 rounded-full"
                              />
                              <motion.div
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
                                className="w-2 h-2 bg-gray-400 rounded-full"
                              />
                              <motion.div
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                                className="w-2 h-2 bg-gray-400 rounded-full"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Input Area */}
                    <div className="border-t p-4">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={userInput}
                          onChange={(e) => setUserInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder="メッセージを入力..."
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleSendMessage}
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        >
                          送信
                        </motion.button>
                      </div>
                      <div className="mt-2 flex gap-2">
                        <button className="text-xs bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200">
                          価格について
                        </button>
                        <button className="text-xs bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200">
                          デモを見たい
                        </button>
                        <button className="text-xs bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200">
                          導入事例
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-gray-50 border-t">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">0.8秒</div>
                        <div className="text-sm text-gray-600">平均応答時間</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">95%</div>
                        <div className="text-sm text-gray-600">顧客満足度</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-600">24/7</div>
                        <div className="text-sm text-gray-600">稼働時間</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Analytics Demo */}
              {activeDemo === 'analytics' && (
                <motion.div
                  key="analytics"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white rounded-3xl shadow-2xl overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Brain className="w-8 h-8" />
                        <div>
                          <h2 className="text-2xl font-bold">AI経営分析ダッシュボード</h2>
                          <p className="opacity-90">リアルタイムでビジネスを最適化</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
                        <Zap className="w-4 h-4" />
                        <span className="font-medium">ライブ更新中</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* KPI Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-600">訪問者数</span>
                          <TrendingUp className="w-5 h-5 text-blue-600" />
                        </div>
                        <motion.div
                          key={analyticsData.visitors}
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          className="text-3xl font-bold text-blue-600"
                        >
                          {analyticsData.visitors.toLocaleString()}
                        </motion.div>
                        <div className="text-sm text-green-600 mt-1">+12.5%</div>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-6"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-600">コンバージョン</span>
                          <TrendingUp className="w-5 h-5 text-green-600" />
                        </div>
                        <motion.div
                          key={analyticsData.conversions}
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          className="text-3xl font-bold text-green-600"
                        >
                          {analyticsData.conversions}
                        </motion.div>
                        <div className="text-sm text-green-600 mt-1">+8.3%</div>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl p-6"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-600">売上高</span>
                          <TrendingUp className="w-5 h-5 text-purple-600" />
                        </div>
                        <motion.div
                          key={analyticsData.revenue}
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          className="text-3xl font-bold text-purple-600"
                        >
                          ¥{(analyticsData.revenue / 1000).toFixed(1)}K
                        </motion.div>
                        <div className="text-sm text-green-600 mt-1">+24.1%</div>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-6"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-600">エンゲージメント</span>
                          <TrendingUp className="w-5 h-5 text-orange-600" />
                        </div>
                        <motion.div
                          key={analyticsData.engagement}
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          className="text-3xl font-bold text-orange-600"
                        >
                          {analyticsData.engagement.toFixed(1)}%
                        </motion.div>
                        <div className="text-sm text-green-600 mt-1">+5.7%</div>
                      </motion.div>
                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="bg-gray-50 rounded-2xl p-6">
                        <h3 className="text-lg font-semibold mb-4">売上予測AI分析</h3>
                        <div className="h-64 flex items-end justify-between gap-2">
                          {[65, 72, 68, 85, 79, 92, 88, 95, 105, 98, 112, 125].map((value, index) => (
                            <motion.div
                              key={index}
                              initial={{ height: 0 }}
                              animate={{ height: `${value}%` }}
                              transition={{ delay: index * 0.1 }}
                              className="flex-1 bg-gradient-to-t from-green-600 to-emerald-400 rounded-t-lg relative group"
                            >
                              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs px-2 py-1 rounded">
                                ¥{value}K
                              </div>
                            </motion.div>
                          ))}
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-gray-600">
                          <span>1月</span>
                          <span>6月</span>
                          <span>12月</span>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-2xl p-6">
                        <h3 className="text-lg font-semibold mb-4">AIが検出した改善ポイント</h3>
                        <div className="space-y-3">
                          <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center justify-between p-3 bg-white rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              <span className="text-sm">ランディングページの離脱率が高い</span>
                            </div>
                            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">要対応</span>
                          </motion.div>
                          
                          <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="flex items-center justify-between p-3 bg-white rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                              <span className="text-sm">モバイル表示の最適化が必要</span>
                            </div>
                            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">改善推奨</span>
                          </motion.div>
                          
                          <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="flex items-center justify-between p-3 bg-white rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-sm">商品ページのCVRが向上中</span>
                            </div>
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">好調</span>
                          </motion.div>
                        </div>
                      </div>
                    </div>

                    {/* AI Insights */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white"
                    >
                      <div className="flex items-start gap-4">
                        <Brain className="w-8 h-8 flex-shrink-0" />
                        <div>
                          <h3 className="text-xl font-semibold mb-2">AIからの提案</h3>
                          <p className="opacity-90">
                            現在のトレンドを分析した結果、商品ページのA/Bテストを実施することで、
                            コンバージョン率を15-20%向上させる可能性があります。
                            特に価格表示とCTAボタンの配置を最適化することをお勧めします。
                          </p>
                          <button className="mt-3 bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                            詳細を見る
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Auto Heatmap Generation Demo */}
              {activeDemo === 'auto-heatmap' && (
                <motion.div
                  key="auto-heatmap"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white rounded-3xl shadow-2xl overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6">
                    <div className="flex items-center gap-3">
                      <Layers className="w-8 h-8" />
                      <div>
                        <h2 className="text-2xl font-bold">AIヒートマップ自動生成</h2>
                        <p className="opacity-90">AIが自動でユーザー行動パターンを解析・可視化</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Live Heatmap Visualization */}
                      <div className="bg-gray-50 rounded-2xl p-6">
                        <h3 className="text-lg font-semibold mb-4">AIが検出した注目エリア</h3>
                        <div className="relative bg-white rounded-lg shadow-inner h-96 overflow-hidden">
                          {/* Simulated heatmap zones */}
                          <motion.div
                            animate={{ opacity: [0.3, 0.8, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute top-10 left-10 w-32 h-32 bg-red-500 rounded-full filter blur-xl"
                          />
                          <motion.div
                            animate={{ opacity: [0.5, 0.9, 0.5] }}
                            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                            className="absolute top-20 right-20 w-40 h-40 bg-orange-500 rounded-full filter blur-xl"
                          />
                          <motion.div
                            animate={{ opacity: [0.4, 0.7, 0.4] }}
                            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                            className="absolute bottom-20 left-1/3 w-36 h-36 bg-yellow-500 rounded-full filter blur-xl"
                          />
                          
                          {/* Overlay content */}
                          <div className="relative z-10 p-6">
                            <div className="bg-white/80 backdrop-blur rounded p-4 mb-4">
                              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="bg-white/80 backdrop-blur rounded p-3">
                                <div className="h-20 bg-gray-300 rounded mb-2"></div>
                                <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                              </div>
                              <div className="bg-white/80 backdrop-blur rounded p-3">
                                <div className="h-20 bg-gray-300 rounded mb-2"></div>
                                <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* AI Insights */}
                      <div className="space-y-4">
                        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-4">
                          <h4 className="font-semibold text-red-700 mb-2">🔥 ホットスポット検出</h4>
                          <p className="text-sm text-gray-700">購入ボタン周辺に87%のクリックが集中。配置最適化を推奨。</p>
                          <div className="mt-2 flex items-center gap-2">
                            <div className="flex-1 bg-red-200 rounded-full h-2">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "87%" }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="bg-red-600 h-full rounded-full"
                              />
                            </div>
                            <span className="text-sm font-medium">87%</span>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
                          <h4 className="font-semibold text-blue-700 mb-2">💡 スクロール深度分析</h4>
                          <p className="text-sm text-gray-700">65%のユーザーがページ中央で離脱。コンテンツ改善が必要。</p>
                          <div className="mt-2 flex items-center gap-2">
                            <div className="flex-1 bg-blue-200 rounded-full h-2">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "65%" }}
                                transition={{ duration: 1, delay: 0.7 }}
                                className="bg-blue-600 h-full rounded-full"
                              />
                            </div>
                            <span className="text-sm font-medium">65%</span>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
                          <h4 className="font-semibold text-green-700 mb-2">⚡ リアルタイム最適化</h4>
                          <p className="text-sm text-gray-700">AIが自動でA/Bテストを実行中。CVR +23%改善見込み。</p>
                          <motion.div
                            className="mt-2 grid grid-cols-2 gap-2"
                          >
                            <div className="bg-white rounded p-2 text-center">
                              <div className="text-xs text-gray-600">バージョンA</div>
                              <div className="text-lg font-bold text-gray-800">3.2%</div>
                            </div>
                            <div className="bg-green-100 rounded p-2 text-center border-2 border-green-500">
                              <div className="text-xs text-green-700">バージョンB</div>
                              <div className="text-lg font-bold text-green-700">3.9%</div>
                            </div>
                          </motion.div>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full bg-indigo-600 text-white rounded-lg py-3 font-medium hover:bg-indigo-700 transition-colors"
                        >
                          詳細レポートを生成
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Predictive Page Suggestion Demo */}
              {activeDemo === 'predictive' && (
                <motion.div
                  key="predictive"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white rounded-3xl shadow-2xl overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6">
                    <div className="flex items-center gap-3">
                      <Target className="w-8 h-8" />
                      <div>
                        <h2 className="text-2xl font-bold">AI予測ページ提案システム</h2>
                        <p className="opacity-90">訪問者の興味を予測し、最適なページを自動提案</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Current Visitor Analysis */}
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">現在の訪問者分析</h3>
                        <motion.div
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="bg-emerald-500 text-white text-xs px-3 py-1 rounded-full"
                        >
                          リアルタイム解析中
                        </motion.div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white rounded-lg p-4">
                          <div className="text-sm text-gray-600 mb-1">訪問元</div>
                          <div className="font-semibold">Google検索</div>
                          <div className="text-xs text-emerald-600">「ECサイト 売上向上」</div>
                        </div>
                        <div className="bg-white rounded-lg p-4">
                          <div className="text-sm text-gray-600 mb-1">滞在時間</div>
                          <div className="font-semibold">2分34秒</div>
                          <div className="text-xs text-emerald-600">平均より+45%</div>
                        </div>
                        <div className="bg-white rounded-lg p-4">
                          <div className="text-sm text-gray-600 mb-1">行動パターン</div>
                          <div className="font-semibold">情報収集型</div>
                          <div className="text-xs text-emerald-600">導入事例に興味</div>
                        </div>
                      </div>
                    </div>

                    {/* AI Predictions */}
                    <h3 className="text-lg font-semibold mb-4">AIが予測する最適なコンテンツ</h3>
                    <div className="space-y-3">
                      {[
                        { title: 'EC業界向けAI売上改善事例', match: 94, icon: '📈', color: 'emerald' },
                        { title: 'ROI計算シミュレーター', match: 87, icon: '💰', color: 'blue' },
                        { title: '無料診断：あなたのECサイト改善ポイント', match: 82, icon: '🔍', color: 'purple' },
                        { title: '競合他社との機能比較表', match: 76, icon: '📊', color: 'orange' }
                      ].map((prediction, index) => (
                        <motion.div
                          key={index}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="text-2xl">{prediction.icon}</div>
                              <div>
                                <div className="font-medium">{prediction.title}</div>
                                <div className="text-sm text-gray-600">クリック予測率</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={`text-2xl font-bold text-${prediction.color}-600`}>
                                {prediction.match}%
                              </div>
                              <motion.div
                                className="w-20 bg-gray-200 rounded-full h-2 mt-1"
                              >
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${prediction.match}%` }}
                                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                                  className={`bg-${prediction.color}-500 h-full rounded-full`}
                                />
                              </motion.div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Auto-suggest in action */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="mt-6 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-6 text-white"
                    >
                      <h4 className="text-xl font-semibold mb-3">💡 自動提案が有効です</h4>
                      <p className="opacity-90 mb-4">
                        このシステムを導入すると、各訪問者に最適化されたコンテンツが自動表示され、
                        平均滞在時間が2.3倍、コンバージョン率が34%向上します。
                      </p>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-3xl font-bold">2.3x</div>
                          <div className="text-sm opacity-80">滞在時間</div>
                        </div>
                        <div>
                          <div className="text-3xl font-bold">+34%</div>
                          <div className="text-sm opacity-80">CVR向上</div>
                        </div>
                        <div>
                          <div className="text-3xl font-bold">-68%</div>
                          <div className="text-sm opacity-80">離脱率</div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Auto Report Generation Demo */}
              {activeDemo === 'report' && (
                <motion.div
                  key="report"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white rounded-3xl shadow-2xl overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white p-6">
                    <div className="flex items-center gap-3">
                      <FileText className="w-8 h-8" />
                      <div>
                        <h2 className="text-2xl font-bold">AIレポート自動生成</h2>
                        <p className="opacity-90">毎日の成果を分かりやすいレポートで自動配信</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="bg-gray-50 rounded-xl p-6 mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">本日のレポート生成状況</h3>
                        <motion.button
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="bg-violet-100 text-violet-600 p-2 rounded-lg"
                        >
                          <Sparkles className="w-5 h-5" />
                        </motion.button>
                      </div>

                      {/* Report Preview */}
                      <div className="bg-white rounded-lg shadow-lg p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-gray-600">2024年12月14日 日次レポート</span>
                        </div>

                        <h4 className="text-xl font-bold mb-4">📊 本日のハイライト</h4>
                        
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4"
                          >
                            <div className="text-3xl font-bold text-blue-600">¥485,000</div>
                            <div className="text-sm text-gray-600">本日の売上</div>
                            <div className="text-xs text-green-600 mt-1">前日比 +23%</div>
                          </motion.div>
                          
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4"
                          >
                            <div className="text-3xl font-bold text-green-600">127</div>
                            <div className="text-sm text-gray-600">新規リード</div>
                            <div className="text-xs text-green-600 mt-1">目標達成率 142%</div>
                          </motion.div>
                        </div>

                        <h5 className="font-semibold mb-2">🎯 AIからの改善提案</h5>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-violet-500 rounded-full mt-1.5"></div>
                            <p className="text-sm">午後2-4時の訪問者が多いため、この時間帯にキャンペーンを実施すると効果的</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-violet-500 rounded-full mt-1.5"></div>
                            <p className="text-sm">商品Aの離脱率が高いため、価格表示を見直すことを推奨</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-violet-500 rounded-full mt-1.5"></div>
                            <p className="text-sm">モバイルユーザーが65%に増加。モバイル最適化の優先度を上げましょう</p>
                          </div>
                        </div>

                        <div className="border-t pt-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">自動生成時刻: 18:00</span>
                            <div className="flex gap-2">
                              <button className="text-sm bg-violet-100 text-violet-700 px-3 py-1 rounded hover:bg-violet-200">
                                PDF出力
                              </button>
                              <button className="text-sm bg-violet-100 text-violet-700 px-3 py-1 rounded hover:bg-violet-200">
                                メール送信
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Report Settings */}
                    <div className="bg-violet-50 rounded-xl p-6">
                      <h4 className="font-semibold mb-4">レポート配信設定</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span>日次レポート</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>週次サマリー</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>異常検知アラート</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                          </label>
                        </div>
                      </div>
                      <div className="mt-4 text-sm text-gray-600">
                        配信先: admin@example.com, team@example.com
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Feature Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <h2 className="text-3xl font-bold mb-12">なぜAIウェブパートナーが選ばれるのか</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <motion.div
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">圧倒的な速度</h3>
                <p className="text-gray-600">
                  従来の10倍速い処理速度で、リアルタイムな分析と対応を実現
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">自己学習AI</h3>
                <p className="text-gray-600">
                  使えば使うほど賢くなり、あなたのビジネスに最適化されます
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">確実な成果</h3>
                <p className="text-gray-600">
                  平均ROI 340%、導入企業の98%が満足という実績
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              体験してみていかがでしたか？
            </h2>
            <p className="text-xl text-white/90 mb-8">
              これはほんの一部の機能です。実際のシステムではさらに多くの驚きが待っています。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                無料デモを予約
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-lg font-semibold text-lg hover:bg-white/30 transition-all"
              >
                詳しい資料を請求
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DemoPage;