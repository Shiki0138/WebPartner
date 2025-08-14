import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, BarChart3, FileText, Brain } from 'lucide-react';

interface InteractiveDemoProps {
  type: 'chat' | 'analytics' | 'content' | 'personalization' | 'insights' | 'integration';
}

const InteractiveDemo: React.FC<InteractiveDemoProps> = ({ type }) => {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'ai'; content: string }>>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Chat Demo Component
  const ChatDemo = () => {
    const handleSend = () => {
      if (!inputValue.trim()) return;
      
      setMessages([...messages, { role: 'user', content: inputValue }]);
      setInputValue('');
      setIsTyping(true);
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponses = [
          'ご質問ありがとうございます。私はAI営業アシスタントです。お客様のニーズに合わせて最適なプランをご提案させていただきます。',
          '弊社のサービスは初期費用0円でスタート可能です。まずは30日間の無料トライアルをお試しください。',
          'お見積もりをすぐに作成いたします。どのような機能をご希望でしょうか？'
        ];
        
        setMessages(prev => [...prev, {
          role: 'ai',
          content: aiResponses[Math.floor(Math.random() * aiResponses.length)]
        }]);
        setIsTyping(false);
      }, 1500);
    };
    
    return (
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-2xl mx-auto">
        <div className="border-b pb-4 mb-4">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Bot className="w-6 h-6 text-blue-600" />
            AI営業アシスタント デモ
          </h3>
        </div>
        
        <div className="h-96 overflow-y-auto mb-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 mt-8">
              <Bot className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p>AI営業アシスタントに何でも質問してください</p>
            </div>
          )}
          
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.role === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {message.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-gray-100 px-4 py-2 rounded-lg">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="メッセージを入力..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  };
  
  // Analytics Demo Component
  const AnalyticsDemo = () => {
    const [heatmapData, setHeatmapData] = useState<number[][]>([]);
    
    useEffect(() => {
      // Generate random heatmap data
      const data = Array(10).fill(0).map(() =>
        Array(10).fill(0).map(() => Math.random())
      );
      setHeatmapData(data);
    }, []);
    
    return (
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-4xl mx-auto">
        <div className="border-b pb-4 mb-6">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-purple-600" />
            AIヒートマップ分析 デモ
          </h3>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-4">リアルタイムヒートマップ</h4>
            <div className="grid grid-cols-10 gap-1">
              {heatmapData.map((row, i) => (
                row.map((value, j) => (
                  <motion.div
                    key={`${i}-${j}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: (i + j) * 0.02 }}
                    className="aspect-square rounded"
                    style={{
                      backgroundColor: `rgba(239, 68, 68, ${value})`,
                    }}
                  />
                ))
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">AI分析結果</h4>
            <div className="space-y-3">
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm font-medium text-red-800">離脱リスク: 高</p>
                <p className="text-xs text-red-600 mt-1">ページ下部のCTAボタンが見つけにくい</p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm font-medium text-yellow-800">改善提案</p>
                <p className="text-xs text-yellow-600 mt-1">CTAボタンを上部に追加することで成約率15%向上見込み</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-sm font-medium text-green-800">高エンゲージメントエリア</p>
                <p className="text-xs text-green-600 mt-1">価格表セクションに最も注目が集まっています</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Content Demo Component
  const ContentDemo = () => {
    const [generatingContent, setGeneratingContent] = useState(false);
    const [generatedContent, setGeneratedContent] = useState('');
    
    const generateContent = () => {
      setGeneratingContent(true);
      setGeneratedContent('');
      
      const content = `# 中小企業がAIを活用して売上を3倍にする方法

## はじめに
デジタル化が進む現代において、中小企業こそAIの恩恵を最大限に活用すべきです。本記事では、実際の成功事例を交えながら、AIを活用した売上向上の具体的な方法をご紹介します。

## 1. 顧客対応の自動化
AIチャットボットを導入することで、24時間365日の顧客対応が可能になります...`;
      
      // Simulate typing effect
      let index = 0;
      const interval = setInterval(() => {
        if (index < content.length) {
          setGeneratedContent(prev => prev + content[index]);
          index++;
        } else {
          clearInterval(interval);
          setGeneratingContent(false);
        }
      }, 10);
    };
    
    return (
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-4xl mx-auto">
        <div className="border-b pb-4 mb-6">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <FileText className="w-6 h-6 text-green-600" />
            AIコンテンツマネージャー デモ
          </h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-4">コンテンツ設定</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">業界</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>小売業</option>
                  <option>製造業</option>
                  <option>サービス業</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">記事タイプ</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>ハウツー記事</option>
                  <option>事例紹介</option>
                  <option>トレンド分析</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ターゲットキーワード</label>
                <input
                  type="text"
                  placeholder="AI, 売上向上, 中小企業"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <button
                onClick={generateContent}
                disabled={generatingContent}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {generatingContent ? '生成中...' : '記事を生成'}
              </button>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">生成プレビュー</h4>
            <div className="bg-gray-50 rounded-lg p-4 h-96 overflow-y-auto">
              {generatedContent ? (
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap font-sans">{generatedContent}</pre>
                </div>
              ) : (
                <div className="text-center text-gray-500 mt-8">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>設定を選択して「記事を生成」をクリック</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Render appropriate demo based on type
  const renderDemo = () => {
    switch (type) {
      case 'chat':
        return <ChatDemo />;
      case 'analytics':
        return <AnalyticsDemo />;
      case 'content':
        return <ContentDemo />;
      default:
        return (
          <div className="bg-white rounded-2xl shadow-xl p-12 max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">インタラクティブデモ準備中</h3>
            <p className="text-gray-600">この機能のデモは現在準備中です。詳細はお問い合わせください。</p>
          </div>
        );
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {renderDemo()}
    </motion.div>
  );
};

export default InteractiveDemo;