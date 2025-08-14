import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Shield, AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
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
              <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-blue-600 rounded-2xl flex items-center justify-center">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl font-bold">利用規約</h1>
            </div>
            <p className="text-lg text-gray-600 mb-4">
              AIウェブパートナーサービス利用規約
            </p>
            <p className="text-sm text-gray-500">
              最終更新日: 2024年12月14日
            </p>
          </motion.div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
            >
              <div className="prose prose-lg max-w-none">
                
                {/* 重要な注意事項 */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-blue-800 font-semibold mb-2">重要なお知らせ</h3>
                      <p className="text-blue-700 text-sm">
                        本規約は、株式会社AIウェブパートナー（以下「当社」）が提供するサービスをご利用いただくお客様との間の権利義務関係を定めるものです。
                        サービスをご利用になる前に必ずお読みください。
                      </p>
                    </div>
                  </div>
                </div>

                <h2>第1条（定義）</h2>
                <p>本規約において、次の各号に掲げる用語の意義は、当該各号に定めるところによります。</p>
                <ol>
                  <li><strong>「サービス」</strong>とは、当社が提供するAIウェブパートナーに関連する全てのサービスをいいます。</li>
                  <li><strong>「利用者」</strong>とは、本規約に同意の上、サービスを利用する個人または法人をいいます。</li>
                  <li><strong>「利用契約」</strong>とは、本規約及び当社が別途定める個別規約を含む、サービスの利用に関する契約をいいます。</li>
                  <li><strong>「個人情報」</strong>とは、個人情報保護法に定める個人情報をいいます。</li>
                  <li><strong>「コンテンツ」</strong>とは、文字、音声、画像、動画、ソフトウェア、プログラム、コード等の情報をいいます。</li>
                </ol>

                <h2>第2条（本規約への同意）</h2>
                <ol>
                  <li>利用者は、本規約に同意いただいた場合のみサービスをご利用いただけます。</li>
                  <li>利用者が未成年の場合は、親権者の同意を得てサービスをご利用ください。</li>
                  <li>利用者が法人の場合は、サービス利用の権限を有する代表者がお申し込みください。</li>
                </ol>

                <h2>第3条（サービス内容）</h2>
                <ol>
                  <li>当社は、以下のサービスを提供します：
                    <ul>
                      <li>AI営業代行システム</li>
                      <li>AI人事・採用システム</li>
                      <li>AI顧客サポートシステム</li>
                      <li>AI経営参謀システム</li>
                      <li>AI品質管理システム</li>
                      <li>その他当社が提供するAI関連サービス</li>
                    </ul>
                  </li>
                  <li>サービス内容は、技術の進歩や市場の変化に応じて変更される場合があります。</li>
                  <li>当社は、サービスの機能向上のため、予告なくサービス内容を変更することがあります。</li>
                </ol>

                <h2>第4条（利用登録）</h2>
                <ol>
                  <li>サービスの利用を希望する方は、当社所定の方法により利用登録を行うものとします。</li>
                  <li>当社は、利用登録の申請について、以下の事由がある場合には、これを承認しないことがあります：
                    <ul>
                      <li>申請内容に虚偽、誤記または記入漏れがあった場合</li>
                      <li>過去に本規約違反により利用停止処分を受けたことがある場合</li>
                      <li>その他当社が利用登録を適当でないと判断した場合</li>
                    </ul>
                  </li>
                </ol>

                <h2>第5条（料金及び支払い）</h2>
                <ol>
                  <li>利用者は、サービス利用料金を当社の定める方法により支払うものとします。</li>
                  <li>料金は、選択したプランに応じて月額または年額で課金されます。</li>
                  <li>支払期日を過ぎても料金の支払いがない場合、当社はサービスの利用を停止することができます。</li>
                  <li>一度支払われた料金は、当社に特別の事情がない限り返金いたしません。</li>
                </ol>

                <h2>第6条（禁止事項）</h2>
                <p>利用者は、サービス利用にあたり、以下の行為を行ってはなりません：</p>
                <ol>
                  <li>法令または本規約に違反する行為</li>
                  <li>犯罪行為に関連する行為</li>
                  <li>当社のサーバー等に過度な負荷をかける行為</li>
                  <li>当社のサービス運営を妨害する行為</li>
                  <li>他の利用者に関する個人情報等を収集する行為</li>
                  <li>他の利用者に迷惑をかける行為</li>
                  <li>反社会的勢力に対する利益供与その他協力行為</li>
                  <li>宗教活動または政治活動に関する行為</li>
                  <li>その他、当社が不適切と判断する行為</li>
                </ol>

                <h2>第7条（知的財産権）</h2>
                <ol>
                  <li>サービスに関する知的財産権は、全て当社または当社にライセンスを許諾している者に帰属します。</li>
                  <li>利用者は、サービス利用により得られる情報を、本規約で定める利用目的以外で使用することはできません。</li>
                  <li>利用者が作成したコンテンツの知的財産権は利用者に帰属しますが、当社はサービス運営に必要な範囲で当該コンテンツを利用できるものとします。</li>
                </ol>

                <h2>第8条（個人情報の取扱い）</h2>
                <ol>
                  <li>当社は、個人情報保護法その他の関連法令を遵守し、利用者の個人情報を適切に取り扱います。</li>
                  <li>個人情報の取扱いに関する詳細は、別途定めるプライバシーポリシーによります。</li>
                </ol>

                <h2>第9条（サービスの停止・中断）</h2>
                <ol>
                  <li>当社は、以下の場合にはサービスの全部または一部の提供を停止または中断することができます：
                    <ul>
                      <li>システムの保守・点検を行う場合</li>
                      <li>システム障害、自然災害等により提供が困難となった場合</li>
                      <li>その他当社が必要と判断した場合</li>
                    </ul>
                  </li>
                  <li>サービス停止により利用者に損害が生じた場合でも、当社は責任を負わないものとします。</li>
                </ol>

                <h2>第10条（利用契約の解除）</h2>
                <ol>
                  <li>利用者は、当社所定の手続きによりいつでも利用契約を解除できます。</li>
                  <li>当社は、利用者が以下に該当する場合、事前通知なく利用契約を解除できます：
                    <ul>
                      <li>本規約に違反した場合</li>
                      <li>料金の支払いを怠った場合</li>
                      <li>その他利用契約を継続することが適当でないと判断される場合</li>
                    </ul>
                  </li>
                </ol>

                <h2>第11条（免責事項）</h2>
                <ol>
                  <li>当社は、サービスに関して、システムの完全性、正確性、確実性、有用性等について保証いたしません。</li>
                  <li>利用者によるサービス利用により第三者に損害が生じた場合、利用者の責任において解決するものとします。</li>
                  <li>当社の責任は、契約責任、不法行為責任を問わず、利用者に現実に発生した直接かつ通常の損害についてのみ、当該損害発生月に利用者が当社に支払った利用料金を限度として賠償責任を負うものとします。</li>
                </ol>

                <h2>第12条（規約の変更）</h2>
                <ol>
                  <li>当社は、利用者の同意なく本規約を変更できるものとします。</li>
                  <li>変更後の規約は、当社ウェブサイトに掲載した時点で効力を生じます。</li>
                  <li>規約変更後もサービスを利用し続けた場合、変更後の規約に同意したものとみなします。</li>
                </ol>

                <h2>第13条（準拠法・管轄裁判所）</h2>
                <ol>
                  <li>本規約の解釈・適用については、日本法に準拠するものとします。</li>
                  <li>サービスに関して紛争が生じた場合は、東京地方裁判所を第一審の専属的合意管轄裁判所とします。</li>
                </ol>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-12">
                  <div className="flex items-start gap-3">
                    <Shield className="w-6 h-6 text-gray-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-gray-800 font-semibold mb-2">お問い合わせ</h3>
                      <p className="text-gray-600 text-sm mb-4">
                        本規約に関するご質問やご不明な点がございましたら、お気軽にお問い合わせください。
                      </p>
                      <div className="text-sm text-gray-600">
                        <p><strong>株式会社AIウェブパートナー</strong></p>
                        <p>〒105-0001 東京都港区虎ノ門1-23-4 AIウェブパートナービル 10F</p>
                        <p>TEL: 0120-123-456</p>
                        <p>Email: legal@aiwebpartner.jp</p>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-center text-gray-500 text-sm mt-8">
                  以上
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

export default TermsPage;