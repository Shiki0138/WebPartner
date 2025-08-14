import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building, Users, Award, ArrowRight, Calendar, MapPin, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CaseStudiesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCase, setSelectedCase] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: '全業界', count: 12 },
    { id: 'manufacturing', label: '製造業', count: 4 },
    { id: 'retail', label: '小売・EC', count: 3 },
    { id: 'finance', label: '金融・保険', count: 2 },
    { id: 'healthcare', label: '医療・介護', count: 2 },
    { id: 'education', label: '教育・研修', count: 1 }
  ];

  const caseStudies = [
    {
      id: 'manufacturing-a',
      category: 'manufacturing',
      company: 'A製造株式会社',
      industry: '自動車部品製造',
      location: '愛知県',
      employees: 450,
      period: '2024年6月〜',
      services: ['AI品質管理システム', 'AI営業代行システム'],
      challenge: '品質検査の人手不足と営業効率の低下',
      solution: 'AI品質管理で検査精度を99.7%に向上、営業代行で商談数3倍増',
      results: [
        { metric: '品質検査精度', before: '95.2%', after: '99.7%', improvement: '+4.5%' },
        { metric: '検査時間', before: '30分/個', after: '3分/個', improvement: '90%短縮' },
        { metric: '営業商談数', before: '月15件', after: '月45件', improvement: '3倍増' },
        { metric: 'コスト削減', before: '-', after: '月額180万円', improvement: '削減' }
      ],
      testimonial: {
        quote: 'AI品質管理の導入で、これまで見落としていた微細な不良も検出できるようになりました。営業代行システムも24時間稼働で、海外からの問い合わせにも即座に対応できています。',
        author: '山田 太郎',
        position: '代表取締役社長'
      },
      image: '/case-study-manufacturing.jpg',
      featured: true
    },
    {
      id: 'retail-b',
      category: 'retail',
      company: 'Bオンラインストア',
      industry: 'Eコマース',
      location: '東京都',
      employees: 85,
      period: '2024年4月〜',
      services: ['AI顧客サポート', 'AI経営参謀'],
      challenge: 'カスタマーサポートの人手不足と経営判断の遅れ',
      solution: 'AI顧客サポートで24時間対応を実現、経営参謀で迅速な意思決定',
      results: [
        { metric: '顧客満足度', before: '78%', after: '96%', improvement: '+18%' },
        { metric: 'サポート応答時間', before: '2時間', after: '30秒', improvement: '99%改善' },
        { metric: '売上成長率', before: '月3%', after: '月12%', improvement: '4倍' },
        { metric: '経営判断速度', before: '1週間', after: '1日', improvement: '7倍高速化' }
      ],
      testimonial: {
        quote: 'AIサポートのおかげで夜間や休日の問い合わせも逃さず、売上が大幅に向上しました。経営参謀の市場分析も的確で、新商品企画が成功しています。',
        author: '佐藤 花子',
        position: 'マーケティング部長'
      },
      image: '/case-study-retail.jpg',
      featured: true
    },
    {
      id: 'finance-c',
      category: 'finance',
      company: 'C投資顧問',
      industry: '金融サービス',
      location: '大阪府',
      employees: 120,
      period: '2024年8月〜',
      services: ['AI人事・採用システム', 'AI経営参謀'],
      challenge: '優秀な人材確保の困難と投資判断の精度向上',
      solution: 'AI採用で適性の高い人材を効率的に発掘、経営参謀でリスク管理強化',
      results: [
        { metric: '採用精度', before: '60%', after: '89%', improvement: '+29%' },
        { metric: '採用期間', before: '3ヶ月', after: '3週間', improvement: '75%短縮' },
        { metric: '離職率', before: '25%', after: '8%', improvement: '68%改善' },
        { metric: 'ポートフォリオ収益', before: '+3%', after: '+12%', improvement: '4倍向上' }
      ],
      testimonial: {
        quote: 'AIの人材評価は感情に左右されず客観的で、実際に優秀な人材を多数採用できました。投資判断でもリスクを事前に察知し、大きな損失を回避できています。',
        author: '田中 一郎',
        position: '人事部長'
      },
      image: '/case-study-finance.jpg',
      featured: false
    },
    {
      id: 'healthcare-d',
      category: 'healthcare',
      company: 'D医療グループ',
      industry: '医療・介護',
      location: '福岡県',
      employees: 340,
      period: '2024年5月〜',
      services: ['AI品質管理システム', 'AI顧客サポート'],
      challenge: '医療品質の標準化と患者対応の効率化',
      solution: 'AI品質管理で医療ミス削減、AIサポートで患者満足度向上',
      results: [
        { metric: '医療事故件数', before: '月3件', after: '月0件', improvement: '100%削減' },
        { metric: '患者満足度', before: '82%', after: '95%', improvement: '+13%' },
        { metric: '業務効率', before: '-', after: '+35%', improvement: '向上' },
        { metric: '人件費削減', before: '-', after: '月120万円', improvement: '削減' }
      ],
      testimonial: {
        quote: '患者様の安全を最優先に考えており、AIの品質管理は医療ミスの防止に大変有効でした。AIサポートも患者様からの評価が高く、信頼関係の構築に役立っています。',
        author: '鈴木 三郎',
        position: '院長'
      },
      image: '/case-study-healthcare.jpg',
      featured: false
    },
    {
      id: 'manufacturing-e',
      category: 'manufacturing',
      company: 'E精密機械',
      industry: '精密機械製造',
      location: '静岡県',
      employees: 280,
      period: '2024年7月〜',
      services: ['AI営業代行システム', 'AI品質管理システ'],
      challenge: '海外展開と高精度品質要求への対応',
      solution: '多言語AI営業で海外市場開拓、品質管理で国際基準クリア',
      results: [
        { metric: '海外売上比率', before: '10%', after: '35%', improvement: '3.5倍' },
        { metric: '品質基準適合率', before: '97%', after: '99.9%', improvement: '+2.9%' },
        { metric: '営業効率', before: '-', after: '+250%', improvement: '向上' },
        { metric: '新規顧客獲得', before: '月2社', after: '月12社', improvement: '6倍' }
      ],
      testimonial: {
        quote: '多言語対応のAI営業で、これまでアプローチできなかった海外市場に進出できました。品質管理も国際基準を上回る精度を実現し、競争力が大幅に向上しました。',
        author: '高橋 次郎',
        position: '営業部長'
      },
      image: '/case-study-precision.jpg',
      featured: true
    },
    {
      id: 'retail-f',
      category: 'retail',
      company: 'Fファッション',
      industry: 'アパレル',
      location: '東京都',
      employees: 65,
      period: '2024年9月〜',
      services: ['AI顧客サポート', 'AI営業代行システム'],
      challenge: 'オンライン接客の質向上とパーソナライゼーション',
      solution: 'AIサポートで個別対応強化、営業代行でレコメンド精度向上',
      results: [
        { metric: '平均購買額', before: '¥8,500', after: '¥15,200', improvement: '79%増' },
        { metric: 'リピート率', before: '25%', after: '68%', improvement: '+43%' },
        { metric: '接客満足度', before: '72%', after: '91%', improvement: '+19%' },
        { metric: 'コンバージョン率', before: '2.1%', after: '5.8%', improvement: '2.8倍' }
      ],
      testimonial: {
        quote: 'AIが一人ひとりの好みを学習して、まるで専属スタイリストのような提案をしてくれます。お客様からの評価も高く、売上が大幅に向上しました。',
        author: '伊藤 美香',
        position: 'EC事業部長'
      },
      image: '/case-study-fashion.jpg',
      featured: false
    }
  ];

  const filteredCases = selectedCategory === 'all' 
    ? caseStudies 
    : caseStudies.filter(caseStudy => caseStudy.category === selectedCategory);

  const featuredCases = caseStudies.filter(caseStudy => caseStudy.featured);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
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
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl font-bold">導入事例</h1>
            </div>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              AIウェブパートナーを導入いただいたお客様の成功事例をご紹介
              <br />
              <span className="font-semibold text-green-600">業界を問わず、劇的な改善効果を実現しています</span>
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl p-4 shadow-lg"
              >
                <div className="text-2xl font-bold text-green-600">500+</div>
                <div className="text-sm text-gray-600">導入企業数</div>
              </motion.div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl p-4 shadow-lg"
              >
                <div className="text-2xl font-bold text-blue-600">98%</div>
                <div className="text-sm text-gray-600">顧客満足度</div>
              </motion.div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl p-4 shadow-lg"
              >
                <div className="text-2xl font-bold text-purple-600">340%</div>
                <div className="text-sm text-gray-600">平均ROI</div>
              </motion.div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-xl p-4 shadow-lg"
              >
                <div className="text-2xl font-bold text-orange-600">2週間</div>
                <div className="text-sm text-gray-600">平均導入期間</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Cases */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              注目の導入事例
            </h2>
            <p className="text-gray-600 text-lg">特に大きな成果を上げた代表的な事例をご紹介</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {featuredCases.slice(0, 3).map((caseStudy, index) => (
              <motion.div
                key={caseStudy.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-shadow cursor-pointer"
                onClick={() => setSelectedCase(caseStudy.id)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Building className="w-8 h-8 text-green-600" />
                  <div>
                    <h3 className="text-lg font-bold">{caseStudy.company}</h3>
                    <p className="text-sm text-gray-600">{caseStudy.industry}</p>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{caseStudy.solution}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {caseStudy.results.slice(0, 2).map((result, resultIndex) => (
                    <div key={resultIndex} className="text-center">
                      <div className="text-xl font-bold text-green-600">{result.improvement}</div>
                      <div className="text-xs text-gray-600">{result.metric}</div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{caseStudy.location}</span>
                  </div>
                  <button className="flex items-center gap-1 text-green-600 hover:text-green-700 text-sm font-medium">
                    詳細を見る
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
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
            <h2 className="text-3xl font-bold mb-4">業界別導入事例</h2>
            <p className="text-gray-600">業界を選択して関連する導入事例をご覧ください</p>
          </motion.div>

          {/* Category Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? 'bg-green-600 text-white shadow-lg'
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

          {/* Case Studies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCases.map((caseStudy, index) => (
              <motion.div
                key={caseStudy.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => setSelectedCase(caseStudy.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Building className="w-6 h-6 text-green-600" />
                    <div>
                      <h3 className="font-bold">{caseStudy.company}</h3>
                      <p className="text-sm text-gray-600">{caseStudy.industry}</p>
                    </div>
                  </div>
                  {caseStudy.featured && (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                      注目
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {caseStudy.employees}名
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {caseStudy.period}
                  </div>
                </div>

                <p className="text-gray-700 mb-4 text-sm">{caseStudy.challenge}</p>

                <div className="space-y-2 mb-4">
                  {caseStudy.services.map((service, serviceIndex) => (
                    <span
                      key={serviceIndex}
                      className="inline-block bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs mr-2"
                    >
                      {service}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-green-600">
                    {caseStudy.results[0]?.improvement}
                  </div>
                  <button className="flex items-center gap-1 text-green-600 hover:text-green-700 text-sm font-medium">
                    詳細
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Case Modal */}
      {selectedCase && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setSelectedCase(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-8 max-w-4xl mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const caseStudy = caseStudies.find(cs => cs.id === selectedCase);
              if (!caseStudy) return null;

              return (
                <>
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-3xl font-bold mb-2">{caseStudy.company}</h2>
                      <p className="text-gray-600">{caseStudy.industry} • {caseStudy.location}</p>
                    </div>
                    <button
                      onClick={() => setSelectedCase(null)}
                      className="text-gray-400 hover:text-gray-600 text-2xl"
                    >
                      ×
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="text-xl font-bold mb-4">課題</h3>
                      <p className="text-gray-700 mb-6">{caseStudy.challenge}</p>
                      
                      <h3 className="text-xl font-bold mb-4">解決策</h3>
                      <p className="text-gray-700 mb-6">{caseStudy.solution}</p>
                      
                      <h3 className="text-xl font-bold mb-4">導入サービス</h3>
                      <div className="space-y-2">
                        {caseStudy.services.map((service, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span>{service}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-4">導入効果</h3>
                      <div className="space-y-4">
                        {caseStudy.results.map((result, index) => (
                          <div key={index} className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">{result.metric}</span>
                              <span className="text-green-600 font-bold">{result.improvement}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-600">
                              <span>導入前: {result.before}</span>
                              <span>導入後: {result.after}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-green-700 font-bold">
                          {caseStudy.testimonial.author.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <blockquote className="text-gray-700 mb-3">
                          "{caseStudy.testimonial.quote}"
                        </blockquote>
                        <div className="text-sm">
                          <div className="font-semibold">{caseStudy.testimonial.author}</div>
                          <div className="text-gray-600">{caseStudy.testimonial.position}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })()}
          </motion.div>
        </motion.div>
      )}

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
              あなたの会社も成功事例の一つに
            </h2>
            <p className="text-xl text-white/90 mb-8">
              無料相談で、あなたのビジネスに最適なAIソリューションをご提案
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-green-600 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                無料相談を予約
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-lg font-semibold text-lg hover:bg-white/30 transition-all"
              >
                導入事例集をダウンロード
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudiesPage;