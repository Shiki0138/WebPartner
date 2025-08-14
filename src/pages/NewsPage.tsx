import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Megaphone, Calendar, Tag, ArrowRight, Bell, Star, Award } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const NewsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: '全お知らせ', count: 15 },
    { id: 'product', label: '製品情報', count: 6 },
    { id: 'company', label: '会社情報', count: 4 },
    { id: 'press', label: 'プレスリリース', count: 3 },
    { id: 'event', label: 'イベント', count: 2 }
  ];

  const news = [
    {
      id: 'product-update-v25',
      title: 'AIウェブパートナー v2.5 大型アップデートリリース',
      summary: '多言語対応強化、新しいレポート機能、API連携機能など50以上の新機能・改善を実装',
      content: `
        この度、AIウェブパートナーの大型アップデート v2.5 をリリースいたしました。

        【主な新機能・改善点】
        • 50言語に対応した多言語サポート機能
        • カスタマイズ可能な詳細レポート機能
        • 外部システムとのAPI連携機能強化
        • ユーザーインターフェースの大幅刷新
        • セキュリティ機能の強化

        【対象ユーザー】
        全プランのお客様に順次適用されます。

        【リリーススケジュール】
        12月15日より段階的にロールアウト開始
      `,
      category: 'product',
      publishedAt: '2024-12-14',
      urgent: true,
      tags: ['製品アップデート', '新機能', 'API'],
      image: '/news-product-update.jpg'
    },
    {
      id: 'funding-series-b',
      title: 'シリーズB資金調達完了のお知らせ - 総額50億円を調達',
      summary: '事業拡大とAI研究開発強化のため、シリーズB資金調達を完了いたしました',
      content: `
        株式会社AIウェブパートナーは、シリーズB資金調達ラウンドにおいて、
        総額50億円の資金調達を完了したことをお知らせいたします。

        【調達資金の使途】
        • AI技術研究開発の強化
        • 優秀な人材の採用
        • 海外展開の加速
        • サービス基盤の拡充

        【主要投資家】
        • ベンチャーキャピタルA社（リード投資家）
        • 大手IT企業B社
        • 著名エンジェル投資家複数名

        今回の資金調達により、より多くの企業様にAI技術の恩恵をお届けできるよう
        サービス向上に努めてまいります。
      `,
      category: 'press',
      publishedAt: '2024-12-10',
      urgent: false,
      tags: ['資金調達', '事業拡大', 'プレスリリース'],
      image: '/news-funding.jpg'
    },
    {
      id: 'partnership-tech-giant',
      title: '大手クラウド企業との戦略的パートナーシップ締結',
      summary: 'グローバル展開とサービス品質向上を目的とした戦略的パートナーシップを締結',
      content: `
        この度、世界的クラウドサービス企業との戦略的パートナーシップを締結いたしました。

        【パートナーシップの内容】
        • グローバルインフラの共同利用
        • AI技術の共同研究開発
        • 相互のサービス連携強化
        • 海外市場での協力体制構築

        【お客様へのメリット】
        • サービス安定性の向上
        • グローバル対応の強化
        • 新機能の早期提供
        • セキュリティレベルの向上

        今後ともより良いサービス提供に努めてまいります。
      `,
      category: 'company',
      publishedAt: '2024-12-05',
      urgent: false,
      tags: ['パートナーシップ', 'グローバル展開', '戦略提携'],
      image: '/news-partnership.jpg'
    },
    {
      id: 'ai-expo-2025',
      title: 'AI EXPO 2025 出展決定 - 最新AI技術をデモンストレーション',
      summary: '2025年3月開催のAI EXPO 2025に出展し、最新のAI技術をご紹介します',
      content: `
        2025年3月12日〜14日に東京ビッグサイトで開催される
        「AI EXPO 2025」への出展が決定いたしました。

        【展示内容】
        • AIウェブパートナーの最新機能デモ
        • 実際の導入事例紹介
        • AI技術者によるライブプレゼンテーション
        • 個別相談会の実施

        【来場特典】
        • 無料トライアル期間の延長
        • 導入事例集の無料配布
        • AI活用コンサルティング無料相談

        【ブース情報】
        会場：東京ビッグサイト 西展示棟
        ブース番号：W-15-32

        皆様のご来場を心よりお待ちしております。
      `,
      category: 'event',
      publishedAt: '2024-12-01',
      urgent: false,
      tags: ['展示会', 'AI EXPO', 'デモンストレーション'],
      image: '/news-expo.jpg'
    },
    {
      id: 'security-update',
      title: '【重要】セキュリティアップデートの実施について',
      summary: 'セキュリティ強化のため、システムメンテナンスを実施いたします',
      content: `
        セキュリティ強化のため、下記日程でシステムメンテナンスを実施いたします。

        【メンテナンス日時】
        2024年12月20日（金） 2:00 〜 6:00（予定）

        【影響範囲】
        • 全サービスの一時停止
        • ダッシュボードへのアクセス不可
        • API機能の一時停止

        【実施内容】
        • セキュリティパッチの適用
        • システム基盤の強化
        • パフォーマンス改善

        【ご注意事項】
        メンテナンス中はサービスをご利用いただけません。
        ご不便をおかけいたしますが、ご理解ください。

        完了次第、改めてご連絡いたします。
      `,
      category: 'product',
      publishedAt: '2024-11-28',
      urgent: true,
      tags: ['メンテナンス', 'セキュリティ', '重要'],
      image: '/news-security.jpg'
    },
    {
      id: 'award-ai-startup',
      title: 'AI Startup Award 2024 最優秀賞を受賞',
      summary: '革新的なAI技術とビジネスモデルが評価され、AI Startup Award 2024で最優秀賞を受賞',
      content: `
        この度、「AI Startup Award 2024」において最優秀賞を受賞いたしました。

        【受賞理由】
        • 中小企業でも導入しやすいAIソリューション
        • 実用的で成果の出る技術開発
        • 優れたカスタマーサクセス体制
        • 社会課題解決への貢献

        【審査委員からのコメント】
        「技術力の高さだけでなく、実際のビジネス現場での成果が
        非常に優れており、AI技術の民主化に大きく貢献している」

        【今後の取り組み】
        この受賞を励みに、より多くの企業様にAI技術の価値を
        お届けできるよう、サービス向上に努めてまいります。

        今後ともご支援のほど、よろしくお願いいたします。
      `,
      category: 'company',
      publishedAt: '2024-11-25',
      urgent: false,
      tags: ['受賞', 'スタートアップ', 'AI技術'],
      image: '/news-award.jpg'
    }
  ];

  const filteredNews = selectedCategory === 'all' 
    ? news 
    : news.filter(item => item.category === selectedCategory);

  const urgentNews = news.filter(item => item.urgent);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
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
              <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl flex items-center justify-center">
                <Megaphone className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl font-bold">お知らせ</h1>
            </div>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              AIウェブパートナーの最新情報・重要なお知らせ
              <br />
              <span className="font-semibold text-orange-600">製品アップデート、会社情報、イベント情報など</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Urgent News */}
      {urgentNews.length > 0 && (
        <section className="py-12 bg-red-50 border-t border-b border-red-200">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <Bell className="w-6 h-6 text-red-600" />
                <h2 className="text-2xl font-bold text-red-800">重要なお知らせ</h2>
              </div>
            </motion.div>

            <div className="space-y-4">
              {urgentNews.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border-l-4 border-red-500 rounded-lg p-6 shadow-lg"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
                          重要
                        </span>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          {formatDate(item.publishedAt)}
                        </div>
                      </div>
                      <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.summary}</p>
                    </div>
                    <button className="flex items-center gap-1 text-red-600 hover:text-red-700 font-medium text-sm ml-4">
                      詳細
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? 'bg-orange-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-md'
                }`}
              >
                {category.label}
                <span className="bg-white text-gray-700 px-2 py-1 rounded-full text-xs">
                  {category.count}
                </span>
              </button>
            ))}
          </div>

          {/* News List */}
          <div className="max-w-4xl mx-auto space-y-8">
            {filteredNews.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-2xl shadow-lg p-6 border-l-4 hover:shadow-xl transition-shadow ${
                  item.urgent ? 'border-red-500' :
                  item.category === 'product' ? 'border-blue-500' :
                  item.category === 'company' ? 'border-green-500' :
                  item.category === 'press' ? 'border-purple-500' :
                  'border-orange-500'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {item.urgent && (
                        <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
                          重要
                        </span>
                      )}
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.category === 'product' ? 'bg-blue-100 text-blue-700' :
                        item.category === 'company' ? 'bg-green-100 text-green-700' :
                        item.category === 'press' ? 'bg-purple-100 text-purple-700' :
                        item.category === 'event' ? 'bg-orange-100 text-orange-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {categories.find(cat => cat.id === item.category)?.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {formatDate(item.publishedAt)}
                    </div>
                  </div>
                  
                  {item.category === 'company' && item.title.includes('受賞') && (
                    <Award className="w-6 h-6 text-yellow-500" />
                  )}
                  {item.category === 'product' && (
                    <Star className="w-6 h-6 text-blue-500" />
                  )}
                </div>

                <h2 className="text-xl font-bold mb-3">{item.title}</h2>
                <p className="text-gray-600 mb-4">{item.summary}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {item.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs flex items-center gap-1"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <button className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium">
                    続きを読む
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  
                  <div className="text-sm text-gray-500">
                    {item.category === 'product' && 'Product Team'}
                    {item.category === 'company' && 'Corporate Communications'}
                    {item.category === 'press' && 'PR Department'}
                    {item.category === 'event' && 'Marketing Team'}
                  </div>
                </div>

                {/* Expanded Content (would be toggled) */}
                <div className="hidden mt-6 pt-6 border-t border-gray-200">
                  <div className="prose prose-sm max-w-none">
                    {item.content.split('\n').map((paragraph, pIndex) => (
                      <p key={pIndex} className="mb-4 whitespace-pre-line">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-12">
              <Megaphone className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-600 mb-2">お知らせがありません</h3>
              <p className="text-gray-500">選択したカテゴリにはお知らせがありません</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              重要なお知らせをメールで受け取る
            </h2>
            <p className="text-xl text-white/90 mb-8">
              製品アップデートやメンテナンス情報を見逃さないよう、メール通知を設定しませんか？
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="メールアドレス"
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-orange-600 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                通知設定
              </motion.button>
            </div>
            <p className="text-white/70 text-sm mt-4">
              重要度の高いお知らせのみお送りします。いつでも配信停止可能です。
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NewsPage;