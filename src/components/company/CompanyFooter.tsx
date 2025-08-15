import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Youtube, Sparkles } from 'lucide-react';

const CompanyFooter: React.FC = () => {
  const footerLinks = {
    products: [
      { label: 'クラウドソリューション', href: '/company/products#cloud' },
      { label: 'セキュリティ製品', href: '/company/products#security' },
      { label: '業務効率化ツール', href: '/company/products#efficiency' },
      { label: 'AIソリューション', href: '/company/products#ai' }
    ],
    support: [
      { label: '導入事例', href: '/company/cases' },
      { label: 'よくある質問', href: '/company/faq' },
      { label: 'サポートセンター', href: '/company/support' },
      { label: '資料ダウンロード', href: '/company/download' }
    ],
    company: [
      { label: '会社概要', href: '/company/about' },
      { label: '採用情報', href: '/company/careers' },
      { label: 'ニュース', href: '/company/news' },
      { label: 'プライバシーポリシー', href: '/company/privacy' }
    ]
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-bold text-xl">テックイノベート</span>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              最先端のIT技術で、お客様のビジネスを次のステージへ。
              私たちは革新的なソリューションで企業のDXを支援します。
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="w-4 h-4" />
                <span>03-1234-5678</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="w-4 h-4" />
                <span>info@tech-innovate.jp</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>東京都渋谷区渋谷1-2-3 イノベートビル</span>
              </div>
            </div>
          </div>
          
          {/* Products */}
          <div>
            <h3 className="font-semibold text-lg mb-4">製品・サービス</h3>
            <ul className="space-y-2">
              {footerLinks.products.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-4">サポート</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4">企業情報</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Social Links & Newsletter */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Newsletter */}
            <div className="w-full md:w-auto">
              <h4 className="font-semibold mb-3">最新情報をお届け</h4>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="メールアドレス"
                  className="px-4 py-2 bg-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-medium hover:opacity-90 transition-opacity">
                  登録
                </button>
              </form>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm">フォローする</span>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <div>
            © 2024 Tech Innovate Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/company/terms" className="hover:text-gray-300">利用規約</Link>
            <Link to="/company/privacy" className="hover:text-gray-300">プライバシーポリシー</Link>
            <Link to="/company/sitemap" className="hover:text-gray-300">サイトマップ</Link>
          </div>
        </div>
        
        {/* AI Partner Badge */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
            <Sparkles className="w-4 h-4" />
            <span>Powered by AI Web Partner</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CompanyFooter;