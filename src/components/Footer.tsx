import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = {
    product: {
      title: '製品',
      links: [
        { label: 'AI営業アシスタント', href: '/features#ai-assistant' },
        { label: 'AIヒートマップ分析', href: '/features#heatmap' },
        { label: 'AIコンテンツマネージャー', href: '/features#content' },
        { label: 'パーソナライズエンジン', href: '/features#personalization' },
        { label: 'ビジネスインサイトAI', href: '/features#insights' },
        { label: 'マルチチャネル連携', href: '/features#integration' }
      ]
    },
    company: {
      title: '会社情報',
      links: [
        { label: '企業理念', href: '/about#philosophy' },
        { label: '経営陣', href: '/about#team' },
        { label: 'パートナー', href: '/about#partners' },
        { label: '採用情報', href: '/careers' },
        { label: 'お知らせ', href: '/news' },
        { label: 'プレスリリース', href: '/press' }
      ]
    },
    resources: {
      title: 'リソース',
      links: [
        { label: '導入事例', href: '/case-studies' },
        { label: 'ブログ', href: '/blog' },
        { label: 'ヘルプセンター', href: '/help' },
        { label: 'APIドキュメント', href: '/api-docs' },
        { label: 'セキュリティ', href: '/security' },
        { label: 'ステータス', href: '/status' }
      ]
    },
    legal: {
      title: '法務',
      links: [
        { label: '利用規約', href: '/terms' },
        { label: 'プライバシーポリシー', href: '/privacy' },
        { label: '特定商取引法', href: '/commercial-law' },
        { label: 'Cookie設定', href: '/cookies' }
      ]
    }
  };
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">AI</span>
              </div>
              <span className="font-bold text-xl">Web Partner</span>
            </Link>
            <p className="text-gray-400 mb-4">
              次世代型AIウェブシステムで
              <br />
              ビジネスの未来を創造する
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Links Sections */}
          {Object.values(footerLinks).map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Contact Info */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-400">お問い合わせ</p>
                <a href="mailto:info@aiwebpartner.jp" className="hover:text-blue-400 transition-colors">
                  info@aiwebpartner.jp
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-400">お電話でのお問い合わせ</p>
                <a href="tel:0120-123-456" className="hover:text-blue-400 transition-colors">
                  0120-123-456
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-400">本社</p>
                <p>東京都港区虎ノ門1-23-4</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} AI Web Partner Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link to="/sitemap" className="text-gray-400 hover:text-white transition-colors">
              サイトマップ
            </Link>
            <Link to="/accessibility" className="text-gray-400 hover:text-white transition-colors">
              アクセシビリティ
            </Link>
            <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
              お問い合わせ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;