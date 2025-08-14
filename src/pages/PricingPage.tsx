import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown, ArrowRight, Phone } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PricingPage: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      name: 'スタータープラン',
      description: '小規模企業向け',
      icon: Star,
      color: 'from-blue-500 to-cyan-500',
      monthly: 49000,
      annual: 490000,
      popular: false,
      features: [
        'AI営業代行システム（基本機能）',
        'AIヒートマップ分析',
        'レポート機能（週次）',
        '5,000ページビュー/月',
        'メールサポート',
        '基本的なセキュリティ',
        'ダッシュボードアクセス'
      ],
      limitations: [
        '同時接続ユーザー数: 3名まで',
        'カスタム設定制限あり'
      ]
    },
    {
      name: 'ビジネスプラン',
      description: '成長企業向け',
      icon: Zap,
      color: 'from-purple-500 to-pink-500',
      monthly: 98000,
      annual: 980000,
      popular: true,
      features: [
        'AI営業代行システム（全機能）',
        'AI人事・採用システム',
        'AI顧客サポート',
        'AIヒートマップ分析（高度）',
        'レポート機能（日次・カスタム）',
        '50,000ページビュー/月',
        'チャット・電話サポート',
        'セキュリティ強化',
        'API連携',
        'A/Bテスト機能'
      ],
      limitations: [
        '同時接続ユーザー数: 10名まで'
      ]
    },
    {
      name: 'エンタープライズ',
      description: '大企業向け',
      icon: Crown,
      color: 'from-orange-500 to-red-500',
      monthly: 198000,
      annual: 1980000,
      popular: false,
      features: [
        '全AIサービス利用可能',
        'AI経営参謀（戦略分析）',
        'AI品質管理システム',
        '無制限ページビュー',
        '24時間専用サポート',
        'エンタープライズセキュリティ',
        'カスタムAPI開発',
        '専任アカウントマネージャー',
        '導入・運用コンサルティング',
        'オンプレミス対応可能',
        '複数サイト管理',
        'White Label対応'
      ],
      limitations: []
    }
  ];

  const addOns = [
    {
      name: '追加ユーザーライセンス',
      price: 5000,
      unit: '/月・1ユーザー',
      description: '同時接続可能ユーザーを追加'
    },
    {
      name: 'カスタムAIモデル開発',
      price: 500000,
      unit: '/1モデル',
      description: '業界特化AIモデルの開発・実装'
    },
    {
      name: '専用サーバー構築',
      price: 100000,
      unit: '/月',
      description: '高セキュリティ専用環境の提供'
    },
    {
      name: 'データ移行サポート',
      price: 200000,
      unit: '/一式',
      description: '既存システムからのデータ移行'
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ja-JP').format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto mb-12"
          >
            <h1 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                料金プラン
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              あなたのビジネス規模に合わせた最適なプランをお選びください。
              <br />
              全プラン30日間の無料トライアル付き
            </p>

            {/* Billing Period Toggle */}
            <div className="inline-flex items-center bg-white rounded-full p-1 shadow-lg border">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  billingPeriod === 'monthly'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                月額
              </button>
              <button
                onClick={() => setBillingPeriod('annual')}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  billingPeriod === 'annual'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                年額 <span className="text-green-600 text-sm ml-1">(2ヶ月分お得)</span>
              </button>
            </div>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              const price = billingPeriod === 'monthly' ? plan.monthly : plan.annual;
              const savings = billingPeriod === 'annual' ? (plan.monthly * 12 - plan.annual) : 0;
              
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative bg-white rounded-2xl shadow-xl p-8 ${
                    plan.popular ? 'ring-2 ring-purple-500 scale-105' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                        人気プラン
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-gray-600">{plan.description}</p>
                  </div>

                  <div className="text-center mb-8">
                    <div className="text-4xl font-bold mb-2">
                      ¥{formatPrice(price)}
                    </div>
                    <div className="text-gray-600">
                      /{billingPeriod === 'monthly' ? '月' : '年'}（税込）
                    </div>
                    {billingPeriod === 'annual' && savings > 0 && (
                      <div className="text-green-600 text-sm mt-2">
                        年間 ¥{formatPrice(savings)} お得
                      </div>
                    )}
                  </div>

                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                    
                    {plan.limitations.map((limitation, limitIndex) => (
                      <div key={limitIndex} className="flex items-start gap-3">
                        <div className="w-5 h-5 flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mx-auto mt-1.5"></div>
                        </div>
                        <span className="text-gray-600 text-sm">{limitation}</span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-4 px-6 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition-all ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    無料トライアル開始
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              );
            })}
          </div>

          {/* Add-ons Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-bold text-center mb-8">オプションサービス</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {addOns.map((addon, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-lg">{addon.name}</h3>
                    <div className="text-right">
                      <div className="text-xl font-bold text-purple-600">
                        ¥{formatPrice(addon.price)}
                      </div>
                      <div className="text-sm text-gray-600">{addon.unit}</div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{addon.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-center mb-12">よくあるご質問</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="font-semibold mb-3">プランの変更はいつでも可能ですか？</h3>
                  <p className="text-gray-600 text-sm">
                    はい、いつでもプランの変更が可能です。アップグレードは即座に反映され、ダウングレードは次回請求日から適用されます。
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="font-semibold mb-3">無料トライアルに制限はありますか？</h3>
                  <p className="text-gray-600 text-sm">
                    30日間、選択したプランの全機能をお試しいただけます。クレジットカードの登録は必要ですが、トライアル期間中は課金されません。
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="font-semibold mb-3">導入サポートはありますか？</h3>
                  <p className="text-gray-600 text-sm">
                    全プランで導入サポートを提供しています。エンタープライズプランでは専任のアカウントマネージャーが付きます。
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="font-semibold mb-3">解約はいつでもできますか？</h3>
                  <p className="text-gray-600 text-sm">
                    はい、いつでも解約可能です。月額プランは即座に、年額プランは次回更新日に解約となります。データのエクスポートも可能です。
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="font-semibold mb-3">セキュリティ対策は十分ですか？</h3>
                  <p className="text-gray-600 text-sm">
                    全プランでSSL暗号化、定期バックアップを実施。エンタープライズプランではISO27001準拠のセキュリティ体制を提供します。
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="font-semibold mb-3">カスタマイズは可能ですか？</h3>
                  <p className="text-gray-600 text-sm">
                    ビジネス・エンタープライズプランでは、APIを通じたカスタマイズが可能です。特別な要件がある場合はお気軽にご相談ください。
                  </p>
                </div>
              </div>
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
              まずは無料で体験してください
            </h2>
            <p className="text-xl text-white/90 mb-8">
              30日間の無料トライアルで、AIウェブパートナーの効果を実感
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                無料トライアル開始
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-lg font-semibold text-lg hover:bg-white/30 transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                相談予約（無料）
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PricingPage;