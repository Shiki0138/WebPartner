import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, Shield, Zap, Bot, Check, ArrowRight, Star, TrendingUp, Server, Lock, Globe, Cpu } from 'lucide-react';
import CompanyNavbar from '../../components/company/CompanyNavbar';
import CompanyFooter from '../../components/company/CompanyFooter';
import AIChat from '../../components/company/AIChat';

interface Product {
  id: string;
  category: string;
  name: string;
  shortDesc: string;
  description: string;
  features: string[];
  pricing: {
    starter: { price: string; users: string };
    professional: { price: string; users: string };
    enterprise: { price: string; users: string };
  };
  testimonial?: {
    company: string;
    text: string;
    improvement: string;
  };
  icon: any;
  color: string;
  badge?: string;
}

const CompanyProductsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [compareProducts, setCompareProducts] = useState<string[]>([]);

  const products: Product[] = [
    {
      id: 'cloud-erp',
      category: 'cloud',
      name: 'クラウドERP Pro',
      shortDesc: '次世代の統合業務管理システム',
      description: '財務、人事、在庫、CRMを一元管理。AIが業務を自動最適化し、経営判断を支援します。',
      features: [
        'リアルタイムダッシュボード',
        'AI予測分析',
        '自動レポート生成',
        'モバイル完全対応',
        'APIによる外部連携',
        '多言語・多通貨対応'
      ],
      pricing: {
        starter: { price: '¥50,000/月', users: '〜50名' },
        professional: { price: '¥150,000/月', users: '〜200名' },
        enterprise: { price: 'お問い合わせ', users: '無制限' }
      },
      testimonial: {
        company: '株式会社ABC商事',
        text: '導入後3ヶ月で業務効率が劇的に改善しました',
        improvement: '業務時間65%削減'
      },
      icon: Cloud,
      color: 'from-blue-500 to-cyan-500',
      badge: '人気No.1'
    },
    {
      id: 'security-suite',
      category: 'security',
      name: 'セキュリティ統合パック',
      shortDesc: 'ゼロトラスト対応の包括的セキュリティ',
      description: 'エンドポイント、ネットワーク、クラウドを統合的に保護。24時間AIが監視し、脅威を自動遮断。',
      features: [
        'AI脅威検知システム',
        'ゼロトラストアーキテクチャ',
        '自動インシデント対応',
        'コンプライアンス支援',
        'セキュリティ教育プログラム',
        'ランサムウェア対策'
      ],
      pricing: {
        starter: { price: '¥30,000/月', users: '〜50台' },
        professional: { price: '¥100,000/月', users: '〜200台' },
        enterprise: { price: 'お問い合わせ', users: '無制限' }
      },
      testimonial: {
        company: 'XYZ製造株式会社',
        text: 'セキュリティインシデントがゼロになりました',
        improvement: 'インシデント100%削減'
      },
      icon: Shield,
      color: 'from-purple-500 to-pink-500',
      badge: '最高評価'
    },
    {
      id: 'workflow-automation',
      category: 'efficiency',
      name: 'ワークフロー自動化',
      shortDesc: 'ノーコードで業務プロセスを自動化',
      description: 'ドラッグ&ドロップで業務フローを設計。AIが最適な自動化を提案し、人的ミスを削減。',
      features: [
        'ビジュアルワークフロー設計',
        'AI自動化提案',
        '承認フロー管理',
        'RPA連携',
        'リアルタイム進捗管理',
        'カスタムトリガー設定'
      ],
      pricing: {
        starter: { price: '¥20,000/月', users: '〜30フロー' },
        professional: { price: '¥60,000/月', users: '〜100フロー' },
        enterprise: { price: 'お問い合わせ', users: '無制限' }
      },
      icon: Zap,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'ai-analytics',
      category: 'ai',
      name: 'AI分析ダッシュボード',
      shortDesc: '経営判断を支援するAI分析基盤',
      description: 'ビッグデータをAIが分析し、経営に必要な洞察を提供。予測分析で未来の意思決定を支援。',
      features: [
        '予測分析エンジン',
        '自然言語クエリ',
        'カスタムKPI設定',
        'リアルタイムアラート',
        'What-if分析',
        'レポート自動生成'
      ],
      pricing: {
        starter: { price: '¥40,000/月', users: '〜10GB' },
        professional: { price: '¥120,000/月', users: '〜100GB' },
        enterprise: { price: 'お問い合わせ', users: '無制限' }
      },
      testimonial: {
        company: 'DEF小売チェーン',
        text: '売上予測の精度が飛躍的に向上しました',
        improvement: '予測精度94%達成'
      },
      icon: Bot,
      color: 'from-green-500 to-teal-500',
      badge: '新製品'
    },
    {
      id: 'cloud-storage',
      category: 'cloud',
      name: 'セキュアクラウドストレージ',
      shortDesc: '高速・安全・無制限のストレージ',
      description: '軍事レベルの暗号化と99.999%の可用性。AIが自動でファイルを整理・最適化。',
      features: [
        'エンドツーエンド暗号化',
        '自動バックアップ',
        'AIファイル整理',
        'バージョン管理',
        '高速同期',
        'コラボレーション機能'
      ],
      pricing: {
        starter: { price: '¥5,000/月', users: '1TB' },
        professional: { price: '¥20,000/月', users: '10TB' },
        enterprise: { price: 'お問い合わせ', users: '無制限' }
      },
      icon: Server,
      color: 'from-indigo-500 to-blue-500'
    },
    {
      id: 'remote-access',
      category: 'security',
      name: 'セキュアリモートアクセス',
      shortDesc: 'どこからでも安全に社内システムへ',
      description: 'VPN不要のゼロトラストアクセス。多要素認証とAI行動分析で不正アクセスを防止。',
      features: [
        'ゼロトラストネットワーク',
        '多要素認証',
        'AI行動分析',
        'セッション録画',
        'デバイス管理',
        'アクセス制御'
      ],
      pricing: {
        starter: { price: '¥1,000/月', users: '1ユーザー' },
        professional: { price: '¥800/月', users: '1ユーザー' },
        enterprise: { price: 'お問い合わせ', users: 'ボリューム割引' }
      },
      icon: Lock,
      color: 'from-red-500 to-pink-500'
    }
  ];

  const categories = [
    { id: 'all', label: 'すべて', icon: Globe },
    { id: 'cloud', label: 'クラウド', icon: Cloud },
    { id: 'security', label: 'セキュリティ', icon: Shield },
    { id: 'efficiency', label: '業務効率化', icon: Zap },
    { id: 'ai', label: 'AI', icon: Bot }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const handleCompareToggle = (productId: string) => {
    if (compareProducts.includes(productId)) {
      setCompareProducts(compareProducts.filter(id => id !== productId));
    } else if (compareProducts.length < 3) {
      setCompareProducts([...compareProducts, productId]);
    }
  };

  // Simulate real-time pricing updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Add random "viewing" indicator
      const elements = document.querySelectorAll('.product-card');
      elements.forEach((el, index) => {
        if (Math.random() > 0.8) {
          el.classList.add('viewing');
          setTimeout(() => el.classList.remove('viewing'), 3000);
        }
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <CompanyNavbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              製品・サービス
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              業界をリードする最先端のITソリューション。
              <br />
              あなたのビジネスに最適な製品をAIがご提案します。
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <motion.button
                    key={cat.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                      selectedCategory === cat.id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:shadow-md'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {cat.label}
                  </motion.button>
                );
              })}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setComparisonMode(!comparisonMode)}
              className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
            >
              {comparisonMode ? '比較モードを終了' : '製品を比較する'}
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Comparison Mode Banner */}
      <AnimatePresence>
        {comparisonMode && compareProducts.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-blue-600 text-white"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <span>{compareProducts.length}個の製品を選択中</span>
                {compareProducts.length >= 2 && (
                  <button
                    onClick={() => {
                      // Show comparison modal
                      alert('比較機能は準備中です');
                    }}
                    className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                  >
                    比較する
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => {
              const Icon = product.icon;
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="product-card bg-white rounded-2xl shadow-lg overflow-hidden group relative"
                >
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Gradient Header */}
                  <div className={`h-2 bg-gradient-to-r ${product.color}`}></div>
                  
                  <div className="p-6">
                    {/* Icon and Title */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 bg-gradient-to-r ${product.color} rounded-xl flex items-center justify-center`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                          <p className="text-sm text-gray-600">{product.shortDesc}</p>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 mb-4 line-clamp-2">{product.description}</p>

                    {/* Features Preview */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">主な機能</h4>
                      <ul className="space-y-1">
                        {product.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                            <Check className="w-4 h-4 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Pricing Preview */}
                    <div className="mb-4">
                      <p className="text-sm text-gray-600">料金</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {product.pricing.starter.price}
                        <span className="text-sm font-normal text-gray-600">〜</span>
                      </p>
                    </div>

                    {/* Testimonial */}
                    {product.testimonial && (
                      <div className="bg-gray-50 rounded-lg p-3 mb-4">
                        <p className="text-xs text-gray-600 mb-1">{product.testimonial.company}</p>
                        <p className="text-sm font-medium text-gray-800 mb-1">"{product.testimonial.text}"</p>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4 text-green-500" />
                          <span className="text-xs text-green-600 font-semibold">{product.testimonial.improvement}</span>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
                      >
                        詳細を見る
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      {comparisonMode && (
                        <button
                          onClick={() => handleCompareToggle(product.id)}
                          className={`px-4 py-2 rounded-lg font-medium transition-all ${
                            compareProducts.includes(product.id)
                              ? 'bg-blue-100 text-blue-600'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {compareProducts.includes(product.id) ? '✓' : '+'}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Real-time viewing indicator */}
                  <div className="hidden absolute top-4 left-4 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs group-hover:flex items-center gap-1">
                    <span className="animate-pulse">●</span> 閲覧中
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className={`h-3 bg-gradient-to-r ${selectedProduct.color}`}></div>
              
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${selectedProduct.color} rounded-2xl flex items-center justify-center`}>
                      <selectedProduct.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">{selectedProduct.name}</h2>
                      <p className="text-lg text-gray-600">{selectedProduct.shortDesc}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <p className="text-gray-700 mb-8 text-lg leading-relaxed">{selectedProduct.description}</p>

                {/* Features */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">機能一覧</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedProduct.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">料金プラン</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Object.entries(selectedProduct.pricing).map(([plan, details]) => (
                      <div key={plan} className="bg-gray-50 rounded-xl p-6 text-center">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2 capitalize">
                          {plan === 'starter' ? 'スターター' : plan === 'professional' ? 'プロフェッショナル' : 'エンタープライズ'}
                        </h4>
                        <p className="text-3xl font-bold text-gray-900 mb-2">{details.price}</p>
                        <p className="text-gray-600">{details.users}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowChat(true)}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold text-lg hover:shadow-lg transition-all"
                  >
                    導入について相談する
                  </button>
                  <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold text-lg hover:bg-gray-200 transition-all">
                    資料をダウンロード
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Chat Widget */}
      <AnimatePresence>
        {showChat && <AIChat onClose={() => setShowChat(false)} />}
      </AnimatePresence>

      {/* Floating Chat Button */}
      {!showChat && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => setShowChat(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg z-40"
        >
          <Bot className="w-8 h-8 text-white" />
        </motion.button>
      )}

      <CompanyFooter />

    </div>
  );
};

export default CompanyProductsPage;