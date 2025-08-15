import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, Building2, Users, Calendar, CheckCircle, Bot } from 'lucide-react';
import CompanyNavbar from '../../components/company/CompanyNavbar';
import CompanyFooter from '../../components/company/CompanyFooter';
import AIChat from '../../components/company/AIChat';

interface FormData {
  company: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  inquiry_type: string;
  products: string[];
  budget: string;
  timeline: string;
  message: string;
}

const CompanyContactPage: React.FC = () => {
  const [showChat, setShowChat] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    company: '',
    name: '',
    email: '',
    phone: '',
    department: '',
    inquiry_type: '',
    products: [],
    budget: '',
    timeline: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string>('');

  const inquiryTypes = [
    '製品に関するお問い合わせ',
    '導入のご相談',
    '見積もり依頼',
    'デモのご依頼',
    'パートナーシップのご相談',
    'その他'
  ];

  const products = [
    'クラウドERP Pro',
    'セキュリティ統合パック',
    'ワークフロー自動化',
    'AI分析ダッシュボード',
    'セキュアクラウドストレージ',
    'セキュアリモートアクセス'
  ];

  const budgets = [
    '〜50万円/月',
    '50万円〜100万円/月',
    '100万円〜300万円/月',
    '300万円/月〜',
    '未定'
  ];

  const timelines = [
    '今すぐ',
    '1ヶ月以内',
    '3ヶ月以内',
    '6ヶ月以内',
    '1年以内',
    '未定'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // AI suggestions based on inquiry type
    if (name === 'inquiry_type' && value === '導入のご相談') {
      setAiSuggestion('AIが分析：貴社の業界と規模から、クラウドERP ProとAI分析ダッシュボードの組み合わせが最適です。平均ROI 320%を実現しています。');
    } else if (name === 'inquiry_type' && value === '見積もり依頼') {
      setAiSuggestion('AIが分析：同規模の企業様では、月額15〜30万円のプランが人気です。初期費用0円キャンペーン実施中です。');
    }
  };

  const handleProductToggle = (product: string) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.includes(product)
        ? prev.products.filter(p => p !== product)
        : [...prev.products, product]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    
    // Reset form after showing success
    setTimeout(() => {
      setFormData({
        company: '',
        name: '',
        email: '',
        phone: '',
        department: '',
        inquiry_type: '',
        products: [],
        budget: '',
        timeline: '',
        message: ''
      });
      setShowSuccess(false);
    }, 5000);
  };

  const officeLocations = [
    {
      name: '東京本社',
      address: '東京都千代田区丸の内1-1-1 テックタワー15F',
      phone: '03-1234-5678',
      hours: '平日 9:00-18:00'
    },
    {
      name: '大阪支社',
      address: '大阪府大阪市北区梅田2-2-2 イノベートビル10F',
      phone: '06-9876-5432',
      hours: '平日 9:00-18:00'
    },
    {
      name: '名古屋支社',
      address: '愛知県名古屋市中村区名駅3-3-3 テクノビル8F',
      phone: '052-1111-2222',
      hours: '平日 9:00-18:00'
    }
  ];

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
              お問い合わせ
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              製品・サービスに関するご質問、導入のご相談など、
              <br />
              お気軽にお問い合わせください。専門スタッフが迅速に対応いたします。
            </p>
            
            {/* Quick Contact Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <motion.a
                href="tel:03-1234-5678"
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <Phone className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">お電話でのお問い合わせ</h3>
                <p className="text-blue-600 font-bold">03-1234-5678</p>
                <p className="text-sm text-gray-600">平日 9:00-18:00</p>
              </motion.a>
              
              <motion.button
                onClick={() => setShowChat(true)}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <MessageSquare className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">AIチャットで相談</h3>
                <p className="text-purple-600 font-bold">24時間対応</p>
                <p className="text-sm text-gray-600">即座に回答</p>
              </motion.button>
              
              <motion.a
                href="mailto:info@techinnovate.jp"
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <Mail className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">メールでのお問い合わせ</h3>
                <p className="text-green-600 font-bold">info@techinnovate.jp</p>
                <p className="text-sm text-gray-600">1営業日以内に返信</p>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-xl p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">お問い合わせフォーム</h2>
                
                {/* AI Suggestion */}
                <AnimatePresence>
                  {aiSuggestion && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6"
                    >
                      <div className="flex items-start gap-3">
                        <Bot className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-blue-800">{aiSuggestion}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        会社名 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        お名前 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        メールアドレス <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        電話番号
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        部署名
                      </label>
                      <input
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        お問い合わせ種別 <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="inquiry_type"
                        value={formData.inquiry_type}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">選択してください</option>
                        {inquiryTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  {/* Products Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      興味のある製品（複数選択可）
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {products.map(product => (
                        <label
                          key={product}
                          className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                            formData.products.includes(product)
                              ? 'bg-blue-50 border-blue-500 text-blue-700'
                              : 'bg-white border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={formData.products.includes(product)}
                            onChange={() => handleProductToggle(product)}
                            className="sr-only"
                          />
                          <div className={`w-4 h-4 rounded border ${
                            formData.products.includes(product)
                              ? 'bg-blue-500 border-blue-500'
                              : 'bg-white border-gray-300'
                          } flex items-center justify-center`}>
                            {formData.products.includes(product) && (
                              <CheckCircle className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <span className="text-sm">{product}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ご予算
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">選択してください</option>
                        {budgets.map(budget => (
                          <option key={budget} value={budget}>{budget}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        導入希望時期
                      </label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">選択してください</option>
                        {timelines.map(timeline => (
                          <option key={timeline} value={timeline}>{timeline}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      お問い合わせ内容 <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="ご質問やご要望を詳しくお聞かせください"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      <span className="text-red-500">*</span> は必須項目です
                    </p>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-8 py-3 rounded-lg font-semibold text-white transition-all flex items-center gap-2 ${
                        isSubmitting
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          送信中...
                        </>
                      ) : (
                        <>
                          送信する
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
            
            {/* Office Information */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-xl p-6 mb-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">営業時間</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium">平日</p>
                      <p className="text-sm">9:00 - 18:00</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">土日祝日</p>
                      <p className="text-sm text-gray-500">休業</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-bold text-gray-900">オフィス所在地</h3>
                {officeLocations.map((office, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-md p-5">
                    <h4 className="font-semibold text-gray-900 mb-2">{office.name}</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                        <p>{office.address}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <p>{office.phone}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <p>{office.hours}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full text-center"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">送信完了しました</h3>
              <p className="text-gray-600 mb-6">
                お問い合わせありがとうございます。
                <br />
                1営業日以内に担当者よりご連絡させていただきます。
              </p>
              <button
                onClick={() => setShowSuccess(false)}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
              >
                閉じる
              </button>
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

export default CompanyContactPage;