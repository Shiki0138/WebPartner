import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Lock, UserCheck, Database, Settings } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPage: React.FC = () => {
  const dataTypes = [
    {
      icon: UserCheck,
      title: '個人識別情報',
      description: '氏名、メールアドレス、電話番号、会社名等',
      usage: 'サービス提供・お客様サポート'
    },
    {
      icon: Database,
      title: 'ウェブサイト利用情報',
      description: 'アクセス状況、クリック履歴、滞在時間等',
      usage: 'サービス改善・パーソナライズ'
    },
    {
      icon: Settings,
      title: 'システム利用情報',
      description: 'AI機能の利用状況、設定情報、ログデータ等',
      usage: 'サービス品質向上・技術サポート'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl font-bold">プライバシーポリシー</h1>
            </div>
            <p className="text-lg text-gray-600 mb-4">
              個人情報保護方針
            </p>
            <p className="text-sm text-gray-500">
              最終更新日: 2024年12月14日
            </p>
          </motion.div>
        </div>
      </section>

      {/* Privacy Commitment */}
      <section className="pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white mb-12">
              <div className="flex items-start gap-4">
                <Eye className="w-8 h-8 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-4">私たちの約束</h2>
                  <p className="text-blue-100 leading-relaxed">
                    株式会社AIウェブパートナーは、お客様の個人情報を大切な資産として認識し、
                    個人情報保護法をはじめとする関連法令を遵守し、適切に保護・管理いたします。
                    透明性を重視し、お客様に安心してサービスをご利用いただけるよう努めています。
                  </p>
                </div>
              </div>
            </div>

            {/* Data Collection Types */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {dataTypes.map((type, index) => {
                const Icon = type.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{type.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{type.description}</p>
                    <div className="text-blue-600 text-xs font-medium">
                      利用目的: {type.usage}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
            >
              <div className="prose prose-lg max-w-none">
                
                <h2>1. 個人情報の定義</h2>
                <p>
                  本プライバシーポリシーにおいて「個人情報」とは、個人情報保護法に定める個人情報、
                  すなわち生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日その他の記述等により
                  特定の個人を識別することができるものを指します。
                </p>

                <h2>2. 個人情報の収集</h2>
                <h3>2.1 収集する情報</h3>
                <p>当社は、以下の個人情報を収集する場合があります：</p>
                <ul>
                  <li><strong>お客様が提供する情報：</strong>氏名、メールアドレス、電話番号、会社名、住所等</li>
                  <li><strong>サービス利用情報：</strong>ログイン履歴、機能利用状況、設定情報等</li>
                  <li><strong>ウェブサイト利用情報：</strong>IPアドレス、ブラウザ情報、アクセス履歴、Cookie等</li>
                  <li><strong>お問い合わせ情報：</strong>お問い合わせ内容、サポート履歴等</li>
                </ul>

                <h3>2.2 収集方法</h3>
                <p>個人情報は、以下の方法により収集します：</p>
                <ul>
                  <li>サービス利用登録時</li>
                  <li>お問い合わせフォームでの入力時</li>
                  <li>サービス利用時の自動収集</li>
                  <li>アンケート回答時</li>
                  <li>その他当社との取引において</li>
                </ul>

                <h2>3. 個人情報の利用目的</h2>
                <p>当社は、収集した個人情報を以下の目的で利用します：</p>
                <ol>
                  <li><strong>サービス提供：</strong>AIウェブパートナーサービスの提供・運営</li>
                  <li><strong>顧客サポート：</strong>お問い合わせ対応、技術サポート</li>
                  <li><strong>サービス改善：</strong>機能改善、新サービス開発</li>
                  <li><strong>マーケティング：</strong>サービス案内、キャンペーン情報の送信</li>
                  <li><strong>契約管理：</strong>利用料金の請求、契約履行</li>
                  <li><strong>法令遵守：</strong>法的義務の履行、紛争解決</li>
                  <li><strong>統計分析：</strong>匿名化されたデータでの利用動向分析</li>
                </ol>

                <h2>4. 個人情報の第三者提供</h2>
                <h3>4.1 原則</h3>
                <p>
                  当社は、お客様の同意なく個人情報を第三者に提供することはありません。
                  ただし、以下の場合を除きます：
                </p>
                <ul>
                  <li>法令に基づく場合</li>
                  <li>人の生命、身体又は財産の保護のために必要がある場合</li>
                  <li>公衆衛生の向上又は児童の健全な育成の推進のために必要がある場合</li>
                  <li>国の機関等が法令の定める事務を遂行することに対して協力する必要がある場合</li>
                </ul>

                <h3>4.2 業務委託</h3>
                <p>
                  サービス提供に必要な範囲で、以下の業務を信頼できる第三者に委託する場合があります：
                </p>
                <ul>
                  <li>クラウドサーバー運営事業者（AWS、Google Cloud等）</li>
                  <li>決済処理代行業者</li>
                  <li>メール配信サービス業者</li>
                  <li>アクセス解析サービス業者</li>
                </ul>
                <p>委託先には適切な管理・監督を行い、機密保持契約を締結いたします。</p>

                <h2>5. 個人情報の管理</h2>
                <h3>5.1 安全管理措置</h3>
                <p>当社は、個人情報への不正アクセス、紛失、破壊、改ざん、漏洩等を防ぐため、以下の対策を実施します：</p>
                <ul>
                  <li><strong>技術的安全管理：</strong>SSL暗号化通信、ファイアウォール、アクセス制御</li>
                  <li><strong>物理的安全管理：</strong>サーバー室の入退室管理、機器の盗難防止</li>
                  <li><strong>人的安全管理：</strong>社員教育、機密保持契約の締結</li>
                  <li><strong>組織的安全管理：</strong>責任者の明確化、定期的な安全点検</li>
                </ul>

                <h3>5.2 データの保存期間</h3>
                <p>
                  個人情報は、利用目的達成に必要な期間、又は法令で定められた保存期間に基づいて保存します。
                  不要となった個人情報は適切に削除・廃棄いたします。
                </p>

                <h2>6. Cookie等の利用</h2>
                <h3>6.1 Cookieについて</h3>
                <p>
                  当サイトでは、サービス向上のためCookieを使用します。Cookieは、ウェブサイトがお客様のコンピューターに送信する小さなデータファイルです。
                </p>

                <h3>6.2 利用目的</h3>
                <ul>
                  <li>ウェブサイトの利用状況分析</li>
                  <li>ユーザー体験の向上</li>
                  <li>広告配信の最適化</li>
                  <li>セキュリティ機能の提供</li>
                </ul>

                <h3>6.3 拒否設定</h3>
                <p>
                  ブラウザの設定によりCookieの受け入れを拒否できますが、
                  一部機能が制限される場合があります。
                </p>

                <h2>7. お客様の権利</h2>
                <p>お客様は、ご自身の個人情報について以下の権利を有します：</p>
                <ul>
                  <li><strong>利用目的の通知要求：</strong>個人情報の利用目的について通知を求める権利</li>
                  <li><strong>開示請求：</strong>保有する個人情報の開示を求める権利</li>
                  <li><strong>訂正・追加・削除：</strong>個人情報の訂正、追加、削除を求める権利</li>
                  <li><strong>利用停止・消去：</strong>個人情報の利用停止、消去を求める権利</li>
                  <li><strong>第三者提供の停止：</strong>第三者への提供停止を求める権利</li>
                </ul>

                <h2>8. 国際的なデータ移転</h2>
                <p>
                  当社は、サービス提供の一部として海外のクラウドサービスを利用する場合があります。
                  この場合、適切な安全管理措置を講じた上で、個人データを海外に移転することがあります。
                </p>

                <h2>9. 未成年者の個人情報</h2>
                <p>
                  当社は、16歳未満の方から個人情報を収集する際は、
                  親権者の同意を得ることを原則とします。
                </p>

                <h2>10. プライバシーポリシーの変更</h2>
                <p>
                  当社は、法令の変更やサービス内容の変更に伴い、
                  本プライバシーポリシーを変更することがあります。
                  変更時は、当サイトでの公表により通知いたします。
                </p>

                <h2>11. お問い合わせ窓口</h2>
                <p>
                  個人情報の取扱いに関するお問い合わせ、苦情等については、
                  以下の窓口までご連絡ください：
                </p>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-8">
                  <div className="flex items-start gap-3">
                    <Lock className="w-6 h-6 text-gray-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-gray-800 font-semibold mb-3">個人情報保護管理者</h3>
                      <div className="text-sm text-gray-600 space-y-2">
                        <p><strong>株式会社AIウェブパートナー</strong></p>
                        <p><strong>個人情報保護責任者：</strong>田中 太郎</p>
                        <p><strong>住所：</strong>〒105-0001 東京都港区虎ノ門1-23-4 AIウェブパートナービル 10F</p>
                        <p><strong>電話：</strong>0120-123-456</p>
                        <p><strong>メール：</strong>privacy@aiwebpartner.jp</p>
                        <p><strong>受付時間：</strong>平日 9:00-18:00</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
                  <h3 className="text-blue-800 font-semibold mb-2">認定個人情報保護団体</h3>
                  <p className="text-blue-700 text-sm">
                    当社は、一般財団法人日本情報経済社会推進協会（JIPDEC）の
                    プライバシーマーク制度の認定を取得予定です。
                  </p>
                </div>

                <p className="text-center text-gray-500 text-sm mt-8">
                  制定日: 2024年4月1日<br />
                  改訂日: 2024年12月14日
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPage;