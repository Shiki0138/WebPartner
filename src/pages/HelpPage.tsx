import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Search, ChevronDown, ChevronUp, BookOpen, MessageCircle, Phone, Mail, Clock, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HelpPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: '全カテゴリ', count: 28 },
    { id: 'getting-started', label: '導入・設定', count: 8 },
    { id: 'features', label: '機能・使い方', count: 10 },
    { id: 'billing', label: '料金・請求', count: 5 },
    { id: 'technical', label: '技術・トラブル', count: 3 },
    { id: 'security', label: 'セキュリティ', count: 2 }
  ];

  const faqs = [
    {
      id: 'setup-01',
      category: 'getting-started',
      question: 'AIウェブパートナーの導入にはどのくらいの時間がかかりますか？',
      answer: `導入期間は企業規模やご要望により異なりますが、一般的には以下の通りです：

**小規模企業（従業員50名以下）**
- 導入期間：1-2週間
- 設定：3-5営業日
- 研修：1-2日

**中規模企業（従業員50-300名）**
- 導入期間：2-4週間
- 設定：1-2週間
- 研修：3-5日

**大規模企業（従業員300名以上）**
- 導入期間：4-8週間
- カスタム開発：2-4週間
- 研修・サポート：1-2週間

専任のカスタマーサクセス担当者がスムーズな導入をサポートいたします。`,
      tags: ['導入期間', '設定', '企業規模'],
      popularity: 95
    },
    {
      id: 'setup-02',
      category: 'getting-started',
      question: '既存のウェブサイトにAI機能を追加できますか？',
      answer: `はい、既存のウェブサイトへのAI機能追加は可能です。

**対応可能なシステム：**
- WordPress、Drupal等のCMS
- Shopify、EC-CUBE等のECサイト
- 独自開発のウェブサイト
- React、Vue.js等のSPAアプリケーション

**導入方法：**
1. **タグ埋め込み方式**：HTMLに1行のコードを追加するだけ
2. **API連携方式**：既存システムとAPI連携
3. **プラグイン方式**：主要CMSのプラグインを利用

技術チームが事前調査を行い、最適な導入方法をご提案いたします。`,
      tags: ['既存サイト', '導入方法', 'CMS'],
      popularity: 88
    },
    {
      id: 'features-01',
      category: 'features',
      question: 'AI営業代行システムはどのような業界に適用できますか？',
      answer: `AI営業代行システムは幅広い業界でご活用いただけます。

**実績のある業界：**
- **製造業**：部品調達、設備販売
- **IT・ソフトウェア**：SaaS販売、システム導入
- **不動産**：物件紹介、投資相談
- **金融・保険**：商品提案、リスク分析
- **教育・研修**：コース販売、企業研修
- **医療・ヘルスケア**：機器販売、サービス提案

**業界特化機能：**
- 専門用語の学習・対応
- 業界特有の商慣習への対応
- 規制・コンプライアンス要件への配慮
- カスタムワークフローの構築

導入前の業界分析により、最適な設定をご提供いたします。`,
      tags: ['営業代行', '業界対応', 'カスタマイズ'],
      popularity: 92
    },
    {
      id: 'features-02',
      category: 'features',
      question: 'AIは多言語対応していますか？',
      answer: `はい、50以上の言語に対応しています。

**主要対応言語：**
- **アジア系**：日本語、中国語（簡体字・繁体字）、韓国語、タイ語、ベトナム語
- **欧米系**：英語、フランス語、ドイツ語、スペイン語、イタリア語、ロシア語
- **その他**：アラビア語、ヒンディー語、ポルトガル語等

**機能：**
- リアルタイム翻訳
- 文化的コンテキストの考慮
- 地域特有の商慣習への対応
- 現地時間での自動応答

**追加言語：**
ご要望の言語が対応リストにない場合は、カスタム開発も可能です。`,
      tags: ['多言語', '翻訳', 'グローバル'],
      popularity: 85
    },
    {
      id: 'billing-01',
      category: 'billing',
      question: '月の途中でプラン変更した場合の料金はどうなりますか？',
      answer: `プラン変更時の料金は以下のルールで計算されます：

**アップグレード（上位プランへ変更）**
- 変更日から月末までの日割り料金を請求
- 次月から新プランの正規料金

**ダウングレード（下位プランへ変更）**
- 当月は現行プランの料金
- 次月から新プランの料金

**例：15日にスタータープラン（¥49,000）からビジネスプラン（¥98,000）に変更**
- 追加料金：¥98,000 - ¥49,000 = ¥49,000
- 日割り計算：¥49,000 × (17日/31日) = ¥26,870

**返金対応：**
年額プランのダウングレード時は、差額を次回請求から差し引きます。`,
      tags: ['プラン変更', '料金計算', '日割り'],
      popularity: 78
    },
    {
      id: 'billing-02',
      category: 'billing',
      question: '無料トライアル期間中に解約した場合、料金は発生しますか？',
      answer: `無料トライアル期間中（30日間）に解約された場合、料金は一切発生いたしません。

**重要なポイント：**
- トライアル開始時にクレジットカード情報が必要
- トライアル期間中は課金されません
- 期間終了の24時間前にメール通知
- 解約はいつでもワンクリックで可能

**解約手順：**
1. ダッシュボードの「設定」メニュー
2. 「プラン管理」を選択
3. 「解約」ボタンをクリック
4. 解約理由のアンケート（任意）

**注意事項：**
トライアル期間終了後は自動的に選択したプランに移行します。継続しない場合は期間内に解約手続きを行ってください。`,
      tags: ['無料トライアル', '解約', '料金'],
      popularity: 90
    },
    {
      id: 'technical-01',
      category: 'technical',
      question: 'API連携で問題が発生した場合の対処方法を教えてください',
      answer: `API連携の問題は以下の手順で解決できます：

**1. エラーコードの確認**
- レスポンスのHTTPステータスコード
- エラーメッセージの内容
- API呼び出し時のパラメータ

**2. よくある問題と解決策**

**401エラー（認証エラー）**
- APIキーが正しく設定されているか確認
- APIキーの有効期限をチェック
- リクエストヘッダーの Authorization フィールドを確認

**429エラー（レート制限）**
- API呼び出し頻度を調整
- バッチ処理の間隔を空ける
- より高いプランへのアップグレードを検討

**500エラー（サーバーエラー）**
- 一時的な問題の可能性があるため少し待ってから再試行
- 継続する場合はサポートチームに連絡

**3. サポートへの連絡**
問題が解決しない場合は、以下の情報とともにお問い合わせください：
- エラーメッセージの全文
- API呼び出しのサンプルコード
- 発生日時とアカウント情報`,
      tags: ['API', 'エラー', 'トラブルシューティング'],
      popularity: 72
    },
    {
      id: 'security-01',
      category: 'security',
      question: 'データのセキュリティ対策について教えてください',
      answer: `AIウェブパートナーでは多層的なセキュリティ対策を実施しています。

**暗号化**
- 通信：TLS 1.3による暗号化
- 保存：AES-256による暗号化
- バックアップ：暗号化されたクラウドストレージ

**アクセス制御**
- 二要素認証（2FA）対応
- ロールベースアクセス制御（RBAC）
- IPアドレス制限機能

**監査・ログ**
- 全アクセスログの記録・監視
- 異常検知システムによるリアルタイム監視
- SOC2 Type2準拠の監査体制

**インフラ・物理セキュリティ**
- AWS/Google Cloudの高セキュリティ環境
- 24時間365日の監視体制
- 定期的なペネトレーションテスト

**コンプライアンス**
- GDPR対応
- 個人情報保護法準拠
- ISO27001認証取得予定

**データ保護**
- 定期バックアップ（3-2-1ルール）
- 災害復旧計画（BCP）
- データ削除時の完全消去`,
      tags: ['セキュリティ', '暗号化', 'コンプライアンス'],
      popularity: 82
    }
  ];

  const quickActions = [
    {
      icon: MessageCircle,
      title: 'チャットサポート',
      description: 'リアルタイムでサポートスタッフに相談',
      action: '平日 9:00-18:00',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Phone,
      title: '電話サポート',
      description: '緊急時や詳細な相談に対応',
      action: '0120-123-456',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Mail,
      title: 'メールサポート',
      description: '24時間受付、1営業日以内に回答',
      action: 'support@aiwebpartner.jp',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: BookOpen,
      title: 'ドキュメント',
      description: '詳細な操作手順やAPI仕様',
      action: 'docs.aiwebpartner.jp',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (faqId: string) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
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
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center">
                <HelpCircle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl font-bold">ヘルプセンター</h1>
            </div>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              よくある質問と回答、トラブルシューティングガイド
              <br />
              <span className="font-semibold text-indigo-600">迅速な問題解決をサポートします</span>
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="キーワードで質問を検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">サポートオプション</h2>
            <p className="text-gray-600">お急ぎの場合は直接サポートチームにお問い合わせください</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow cursor-pointer"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${action.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{action.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{action.description}</p>
                  <div className="text-indigo-600 font-medium">{action.action}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold mb-4">よくある質問</h2>
            <p className="text-gray-600">カテゴリを選択して関連するFAQをご覧ください</p>
          </motion.div>

          {/* Category Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                }`}
              >
                {category.label}
                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                  {category.count}
                </span>
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="max-w-4xl mx-auto space-y-4">
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                      <div className="flex flex-wrap gap-2">
                        {faq.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 ml-4">
                      <div className="text-sm text-gray-500">
                        <Clock className="w-4 h-4 inline mr-1" />
                        人気度 {faq.popularity}%
                      </div>
                      {expandedFaq === faq.id ? (
                        <ChevronUp className="w-5 h-5 text-indigo-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </button>
                
                {expandedFaq === faq.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 pb-6 border-t border-gray-100"
                  >
                    <div className="pt-4 prose prose-sm max-w-none">
                      {faq.answer.split('\n').map((paragraph, pIndex) => (
                        <p key={pIndex} className="mb-4 whitespace-pre-line">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">この回答は役に立ちましたか？</span>
                      <button className="text-sm text-indigo-600 hover:text-indigo-700">はい</button>
                      <span className="text-gray-300">|</span>
                      <button className="text-sm text-gray-500 hover:text-gray-700">いいえ</button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-600 mb-2">該当するFAQが見つかりません</h3>
              <p className="text-gray-500 mb-6">検索条件を変更するか、直接サポートチームにお問い合わせください</p>
              <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                サポートに問い合わせる
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              問題が解決しない場合は
            </h2>
            <p className="text-xl text-white/90 mb-8">
              専門スタッフが個別にサポートいたします。お気軽にお問い合わせください。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-indigo-600 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                チャットで相談する
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-lg font-semibold text-lg hover:bg-white/30 transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                電話で相談する
              </motion.button>
            </div>
            <p className="text-white/70 text-sm mt-6">
              サポート時間: 平日 9:00-18:00（土日祝日はメール・チャットのみ対応）
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HelpPage;