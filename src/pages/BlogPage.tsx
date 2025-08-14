import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, User, ArrowRight, Search, Tag, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const categories = [
    { id: 'all', label: '全記事', count: 24 },
    { id: 'ai-technology', label: 'AI技術', count: 8 },
    { id: 'business-strategy', label: '経営戦略', count: 6 },
    { id: 'case-study', label: '事例紹介', count: 5 },
    { id: 'product-update', label: '製品情報', count: 3 },
    { id: 'industry-trend', label: '業界動向', count: 2 }
  ];

  const blogPosts = [
    {
      id: 'ai-sales-future-2025',
      title: '2025年のAI営業：人間とAIの協働で実現する次世代営業戦略',
      excerpt: 'AI技術の進歩により営業活動が劇的に変化している中で、人間とAIの最適な協働方法について詳しく解説します。成功企業の事例とともに、未来の営業スタイルを探ります。',
      category: 'ai-technology',
      author: {
        name: '田中 AI博士',
        avatar: '/avatar-tanaka.jpg'
      },
      publishedAt: '2024-12-10',
      readTime: '8分',
      tags: ['AI営業', '未来予測', '営業戦略', 'DX'],
      image: '/blog-ai-sales-future.jpg',
      featured: true,
      views: 2834
    },
    {
      id: 'customer-support-ai-success',
      title: 'AI顧客サポートで実現する24時間カスタマーエクスペリエンス革命',
      excerpt: '従来の電話・メールサポートから、AIチャットボット、感情分析まで。最新の顧客サポートAI技術と導入効果を実例とともに紹介します。',
      category: 'case-study',
      author: {
        name: '佐藤 カスタマーサクセス',
        avatar: '/avatar-sato.jpg'
      },
      publishedAt: '2024-12-08',
      readTime: '6分',
      tags: ['AI顧客サポート', 'CX', 'チャットボット'],
      image: '/blog-customer-support.jpg',
      featured: true,
      views: 1923
    },
    {
      id: 'hr-ai-recruitment-revolution',
      title: '人事AIが変える採用の未来：データ駆動型採用で優秀人材を見極める',
      excerpt: '履歴書だけでは分からない候補者の真の能力をAIが分析。面接官のバイアスを排除し、客観的な人材評価を実現する最新AI採用システムをご紹介。',
      category: 'ai-technology',
      author: {
        name: '山田 HR戦略',
        avatar: '/avatar-yamada.jpg'
      },
      publishedAt: '2024-12-05',
      readTime: '7分',
      tags: ['AI人事', '採用DX', 'HR-Tech'],
      image: '/blog-hr-ai.jpg',
      featured: false,
      views: 1654
    },
    {
      id: 'manufacturing-quality-ai',
      title: '製造業の品質管理革命：AIが実現する100%品質保証システム',
      excerpt: '従来の目視検査から卒業。AIによる画像認識と深層学習で、人間では見つけられない微細な不良も検出する次世代品質管理システム。',
      category: 'industry-trend',
      author: {
        name: '鈴木 製造AI',
        avatar: '/avatar-suzuki.jpg'
      },
      publishedAt: '2024-12-03',
      readTime: '9分',
      tags: ['AI品質管理', '製造業DX', '画像認識'],
      image: '/blog-quality-ai.jpg',
      featured: true,
      views: 2156
    },
    {
      id: 'business-strategy-ai-advisor',
      title: 'AI経営参謀で実現するデータドリブン経営：中小企業の成功事例',
      excerpt: '大企業だけでなく中小企業でも活用できるAI経営分析システム。リアルタイムな市場分析と予測により、迅速で的確な経営判断を支援します。',
      category: 'business-strategy',
      author: {
        name: '高橋 経営戦略',
        avatar: '/avatar-takahashi.jpg'
      },
      publishedAt: '2024-12-01',
      readTime: '10分',
      tags: ['AI経営', 'データ分析', '中小企業DX'],
      image: '/blog-strategy-ai.jpg',
      featured: false,
      views: 1432
    },
    {
      id: 'product-update-december',
      title: '【製品アップデート】AIウェブパートナー v2.5 新機能リリース',
      excerpt: '12月の大型アップデートで追加された新機能をご紹介。多言語対応の強化、レポート機能の改善、新しいAPI連携機能など。',
      category: 'product-update',
      author: {
        name: 'プロダクトチーム',
        avatar: '/avatar-product.jpg'
      },
      publishedAt: '2024-11-30',
      readTime: '5分',
      tags: ['製品アップデート', '新機能', 'API'],
      image: '/blog-product-update.jpg',
      featured: false,
      views: 982
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
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
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl font-bold">AI Tech Blog</h1>
            </div>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              AI技術の最新動向、ビジネス活用事例、製品情報をお届け
              <br />
              <span className="font-semibold text-blue-600">ビジネスの未来を一緒に考える知識とインサイト</span>
            </p>

            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="記事を検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredPosts.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">注目記事</h2>
              <p className="text-gray-600">今読むべき重要な記事をピックアップ</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.slice(0, 2).map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow"
                >
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-blue-300" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        注目記事
                      </span>
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <TrendingUp className="w-4 h-4" />
                        {post.views.toLocaleString()} views
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-700 text-sm font-medium">
                            {post.author.name.charAt(0)}
                          </span>
                        </div>
                        <div className="text-sm">
                          <div className="font-medium">{post.author.name}</div>
                          <div className="text-gray-500">{formatDate(post.publishedAt)}</div>
                        </div>
                      </div>
                      <Link
                        to={`/blog/${post.id}`}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm"
                      >
                        続きを読む
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
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

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-blue-100 flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-blue-300" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      post.category === 'ai-technology' ? 'bg-purple-100 text-purple-700' :
                      post.category === 'business-strategy' ? 'bg-green-100 text-green-700' :
                      post.category === 'case-study' ? 'bg-orange-100 text-orange-700' :
                      post.category === 'product-update' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {categories.find(cat => cat.id === post.category)?.label}
                    </span>
                    {post.featured && (
                      <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium">
                        注目
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                      >
                        <Tag className="w-3 h-3 inline mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{post.author.name}</span>
                    </div>
                    <div className="flex items-center gap-4 text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(post.publishedAt)}
                      </div>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <Link
                    to={`/blog/${post.id}`}
                    className="mt-4 flex items-center justify-center gap-2 w-full py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                  >
                    記事を読む
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-600 mb-2">記事が見つかりません</h3>
              <p className="text-gray-500">検索条件を変更してお試しください</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              最新記事をメールで受け取る
            </h2>
            <p className="text-xl text-white/90 mb-8">
              AI技術の最新情報やビジネス活用のヒントを定期的にお届け
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
                className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                登録
              </motion.button>
            </div>
            <p className="text-white/70 text-sm mt-4">
              いつでも配信停止可能です。プライバシーポリシーに基づき管理いたします。
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;