import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Users, TrendingUp, Award, Calendar, ArrowRight, Filter, ChevronRight, Target, Lightbulb, Rocket, Bot } from 'lucide-react';
import CompanyNavbar from '../../components/company/CompanyNavbar';
import CompanyFooter from '../../components/company/CompanyFooter';
import AIChat from '../../components/company/AIChat';

interface CaseStudy {
  id: string;
  company: string;
  industry: string;
  size: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    improvement: string;
    detail: string;
  }[];
  products: string[];
  testimonial: {
    quote: string;
    author: string;
    position: string;
    image: string;
  };
  implementationTime: string;
  roi: string;
  year: string;
  tags: string[];
}

const CompanyCasesPage: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const [showChat, setShowChat] = useState(false);

  const caseStudies: CaseStudy[] = [
    {
      id: 'abc-trading',
      company: '株式会社ABC商事',
      industry: '卸売・小売',
      size: '従業員500名',
      challenge: '複数拠点間の在庫管理が複雑化し、欠品や過剰在庫が頻発。手作業でのデータ入力によるミスも多発。',
      solution: 'クラウドERP Proを導入し、全拠点の在庫をリアルタイムで一元管理。AIが需要予測を行い、自動発注システムを構築。',
      results: [
        {
          metric: '在庫回転率',
          improvement: '45%向上',
          detail: '過剰在庫を大幅削減し、キャッシュフローが改善'
        },
        {
          metric: '欠品率',
          improvement: '87%削減',
          detail: 'AI予測により適正在庫を維持'
        },
        {
          metric: '業務時間',
          improvement: '65%削減',
          detail: '在庫管理にかかる人件費を大幅削減'
        }
      ],
      products: ['クラウドERP Pro', 'AI分析ダッシュボード'],
      testimonial: {
        quote: '導入後3ヶ月で効果が現れ始め、半年でROIを達成しました。特にAIの需要予測精度には驚いています。',
        author: '田中太郎',
        position: '物流部門統括部長',
        image: '/avatars/tanaka.jpg'
      },
      implementationTime: '3ヶ月',
      roi: '320%',
      year: '2024',
      tags: ['在庫管理', 'AI予測', '業務効率化']
    },
    {
      id: 'xyz-manufacturing',
      company: 'XYZ製造株式会社',
      industry: '製造業',
      size: '従業員1,200名',
      challenge: 'サイバー攻撃の増加と複雑化する脅威に対し、既存のセキュリティ体制では対応が困難に。',
      solution: 'セキュリティ統合パックを導入。ゼロトラストアーキテクチャとAIによる24時間監視体制を構築。',
      results: [
        {
          metric: 'セキュリティインシデント',
          improvement: '100%削減',
          detail: '導入後、重大なセキュリティ侵害はゼロ'
        },
        {
          metric: '脅威検知時間',
          improvement: '96%短縮',
          detail: 'AIがリアルタイムで異常を検知'
        },
        {
          metric: 'コンプライアンスコスト',
          improvement: '70%削減',
          detail: '自動化により監査対応が効率化'
        }
      ],
      products: ['セキュリティ統合パック', 'セキュアリモートアクセス'],
      testimonial: {
        quote: '以前はセキュリティ対策に追われる毎日でしたが、今では安心して本業に集中できます。',
        author: '佐藤花子',
        position: '情報システム部長',
        image: '/avatars/sato.jpg'
      },
      implementationTime: '2ヶ月',
      roi: '450%',
      year: '2024',
      tags: ['セキュリティ', 'ゼロトラスト', 'AI監視']
    },
    {
      id: 'def-retail',
      company: 'DEF小売チェーン',
      industry: '小売業',
      size: '従業員3,000名（50店舗）',
      challenge: '店舗毎の売上データ分析に時間がかかり、迅速な経営判断が困難。需要予測の精度も低い。',
      solution: 'AI分析ダッシュボードを導入し、全店舗のデータを統合分析。AIが売上予測と最適在庫を自動計算。',
      results: [
        {
          metric: '売上予測精度',
          improvement: '94%達成',
          detail: 'AIによる高精度な需要予測を実現'
        },
        {
          metric: '分析レポート作成時間',
          improvement: '85%削減',
          detail: '自動レポート生成で工数を大幅削減'
        },
        {
          metric: '売上',
          improvement: '23%増加',
          detail: 'データ駆動型経営で売上向上'
        }
      ],
      products: ['AI分析ダッシュボード', 'クラウドERP Pro'],
      testimonial: {
        quote: 'データを見てから判断するまでの時間が劇的に短縮され、経営スピードが大幅に向上しました。',
        author: '鈴木一郎',
        position: '代表取締役',
        image: '/avatars/suzuki.jpg'
      },
      implementationTime: '4ヶ月',
      roi: '280%',
      year: '2023',
      tags: ['AI分析', 'データ駆動', '売上向上']
    },
    {
      id: 'ghi-finance',
      company: 'GHI金融サービス',
      industry: '金融',
      size: '従業員800名',
      challenge: '多様な業務プロセスが乱立し、効率が悪くミスも多発。コンプライアンス対応も負担大。',
      solution: 'ワークフロー自動化ツールで全業務プロセスを標準化・自動化。AIが最適なフローを提案。',
      results: [
        {
          metric: '業務処理時間',
          improvement: '72%削減',
          detail: '自動化により大幅な効率化を実現'
        },
        {
          metric: 'ヒューマンエラー',
          improvement: '89%削減',
          detail: 'システム化によりミスを大幅削減'
        },
        {
          metric: 'コンプライアンス対応コスト',
          improvement: '60%削減',
          detail: '自動記録・監査対応の効率化'
        }
      ],
      products: ['ワークフロー自動化', 'クラウドERP Pro'],
      testimonial: {
        quote: '業務の可視化と自動化で、働き方改革が実現しました。社員の満足度も大幅に向上しています。',
        author: '高橋美由紀',
        position: '業務改革推進部長',
        image: '/avatars/takahashi.jpg'
      },
      implementationTime: '5ヶ月',
      roi: '410%',
      year: '2023',
      tags: ['業務自動化', '働き方改革', 'コンプライアンス']
    },
    {
      id: 'jkl-healthcare',
      company: 'JKL医療法人',
      industry: '医療・ヘルスケア',
      size: '従業員400名',
      challenge: '患者情報の管理が複雑化し、セキュリティリスクも増大。医療スタッフの業務負担も大きい。',
      solution: 'セキュリティ統合パックとクラウドストレージを導入。医療情報を安全に一元管理。',
      results: [
        {
          metric: '情報セキュリティインシデント',
          improvement: '100%防止',
          detail: '患者情報の漏洩ゼロを実現'
        },
        {
          metric: '医療スタッフの事務作業時間',
          improvement: '55%削減',
          detail: 'システム化により本来の医療業務に集中'
        },
        {
          metric: 'コンプライアンス適合率',
          improvement: '100%達成',
          detail: '医療情報保護法完全準拠'
        }
      ],
      products: ['セキュリティ統合パック', 'セキュアクラウドストレージ'],
      testimonial: {
        quote: '患者様の大切な情報を守りながら、スタッフの負担も軽減できました。安心して医療に専念できます。',
        author: '山田太郎',
        position: '院長',
        image: '/avatars/yamada.jpg'
      },
      implementationTime: '3ヶ月',
      roi: '350%',
      year: '2024',
      tags: ['医療', 'セキュリティ', 'コンプライアンス']
    }
  ];

  const industries = [
    { id: 'all', label: 'すべて', icon: Building2 },
    { id: '卸売・小売', label: '卸売・小売', icon: Building2 },
    { id: '製造業', label: '製造業', icon: Building2 },
    { id: '小売業', label: '小売業', icon: Building2 },
    { id: '金融', label: '金融', icon: Building2 },
    { id: '医療・ヘルスケア', label: '医療', icon: Building2 }
  ];

  const filteredCases = selectedIndustry === 'all'
    ? caseStudies
    : caseStudies.filter(c => c.industry === selectedIndustry);

  const getImprovementIcon = (metric: string) => {
    if (metric.includes('効率') || metric.includes('時間')) return Rocket;
    if (metric.includes('売上') || metric.includes('ROI')) return TrendingUp;
    if (metric.includes('セキュリティ') || metric.includes('インシデント')) return Target;
    return Lightbulb;
  };

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
              導入事例
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              テックイノベートのソリューションが、
              <br />
              お客様のビジネスをどのように変革したかご覧ください。
            </p>
            
            {/* Industry Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {industries.map((industry) => {
                const Icon = industry.icon;
                return (
                  <motion.button
                    key={industry.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedIndustry(industry.id)}
                    className={`px-5 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 ${
                      selectedIndustry === industry.id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:shadow-md'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {industry.label}
                  </motion.button>
                );
              })}
            </div>
            
            {/* Stats Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-3xl font-bold text-blue-600">2,500+</div>
                <div className="text-sm text-gray-600">導入企業数</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-3xl font-bold text-green-600">98.5%</div>
                <div className="text-sm text-gray-600">顧客満足度</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-3xl font-bold text-purple-600">平地67%</div>
                <div className="text-sm text-gray-600">業務効率改善</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-3xl font-bold text-orange-600">320%</div>
                <div className="text-sm text-gray-600">平均ROI</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCases.map((caseStudy, index) => (
              <motion.div
                key={caseStudy.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedCase(caseStudy)}
                className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{caseStudy.company}</h3>
                      <p className="text-blue-100 text-sm">{caseStudy.industry} • {caseStudy.size}</p>
                    </div>
                    <Award className="w-8 h-8 text-yellow-300" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  {/* Challenge */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">課題</h4>
                    <p className="text-gray-600 text-sm line-clamp-2">{caseStudy.challenge}</p>
                  </div>
                  
                  {/* Key Results */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">主な成果</h4>
                    <div className="space-y-2">
                      {caseStudy.results.slice(0, 2).map((result, idx) => {
                        const Icon = getImprovementIcon(result.metric);
                        return (
                          <div key={idx} className="flex items-center gap-3">
                            <Icon className="w-5 h-5 text-blue-600 flex-shrink-0" />
                            <div className="flex-1">
                              <span className="font-semibold text-lg text-blue-600">{result.improvement}</span>
                              <span className="text-sm text-gray-600 ml-2">{result.metric}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* ROI Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      ROI {caseStudy.roi}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {caseStudy.implementationTime}
                    </div>
                  </div>
                  
                  {/* Products Used */}
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-gray-500 mb-1">導入製品</h4>
                    <div className="flex flex-wrap gap-2">
                      {caseStudy.products.map((product, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* CTA */}
                  <div className="flex items-center justify-between group-hover:text-blue-600 transition-colors">
                    <span className="font-medium">詳細を見る</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Detail Modal */}
      <AnimatePresence>
        {selectedCase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCase(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-8 text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{selectedCase.company}</h2>
                    <p className="text-blue-100">{selectedCase.industry} • {selectedCase.size} • {selectedCase.year}</p>
                  </div>
                  <button
                    onClick={() => setSelectedCase(null)}
                    className="text-white/80 hover:text-white text-2xl"
                  >
                    ×
                  </button>
                </div>
              </div>
              
              <div className="p-8">
                {/* Challenge Section */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">直面していた課題</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedCase.challenge}</p>
                </div>
                
                {/* Solution Section */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">導入したソリューション</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">{selectedCase.solution}</p>
                  <div className="flex flex-wrap gap-3">
                    {selectedCase.products.map((product, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-medium">
                        {product}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Results Section */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">導入成果</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {selectedCase.results.map((result, idx) => {
                      const Icon = getImprovementIcon(result.metric);
                      return (
                        <div key={idx} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                          <Icon className="w-8 h-8 text-blue-600 mb-3" />
                          <div className="text-3xl font-bold text-blue-600 mb-1">{result.improvement}</div>
                          <div className="font-semibold text-gray-900 mb-2">{result.metric}</div>
                          <p className="text-sm text-gray-600">{result.detail}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Testimonial */}
                <div className="mb-8 bg-gray-50 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gray-300 rounded-full flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-lg text-gray-700 italic mb-4">"{selectedCase.testimonial.quote}"</p>
                      <div>
                        <p className="font-semibold text-gray-900">{selectedCase.testimonial.author}</p>
                        <p className="text-sm text-gray-600">{selectedCase.testimonial.position}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">{selectedCase.roi}</div>
                    <div className="text-gray-600">ROI</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">{selectedCase.implementationTime}</div>
                    <div className="text-gray-600">導入期間</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-600 mb-2">{selectedCase.year}</div>
                    <div className="text-gray-600">導入年</div>
                  </div>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedCase.tags.map((tag, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                {/* CTA */}
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowChat(true)}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold text-lg hover:shadow-lg transition-all"
                  >
                    同様の課題を相談する
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

export default CompanyCasesPage;