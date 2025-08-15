import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Shield, Users, BarChart3 } from 'lucide-react';

const CompanyNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navLinks = [
    {
      label: 'ホーム',
      href: '/company'
    },
    {
      label: '製品・サービス',
      href: '/company/products',
      dropdown: [
        { label: 'クラウドソリューション', href: '/company/products#cloud' },
        { label: 'セキュリティ製品', href: '/company/products#security' },
        { label: '業務効率化ツール', href: '/company/products#efficiency' },
        { label: 'AIソリューション', href: '/company/products#ai' }
      ]
    },
    {
      label: '導入事例',
      href: '/company/cases'
    },
    {
      label: '会社情報',
      href: '/company/about',
      dropdown: [
        { label: '企業理念', href: '/company/about#philosophy' },
        { label: '会社概要', href: '/company/about#overview' },
        { label: 'アクセス', href: '/company/about#access' }
      ]
    },
    {
      label: 'お問い合わせ',
      href: '/company/contact'
    }
  ];
  
  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white shadow-lg' 
            : 'bg-white/90 backdrop-blur-md'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/company" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-bold text-xl text-gray-900">テックイノベート</span>
                <span className="block text-xs text-gray-600">Tech Innovate Inc.</span>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <div key={index} className="relative">
                  {link.dropdown ? (
                    <div
                      onMouseEnter={() => setActiveDropdown(link.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <button className="flex items-center gap-1 font-medium text-gray-700 hover:text-blue-600 transition-colors">
                        {link.label}
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      
                      {activeDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-2"
                        >
                          {link.dropdown.map((item, idx) => (
                            <Link
                              key={idx}
                              to={item.href}
                              className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={link.href}
                      className="font-medium text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
              
              {/* Admin Link */}
              <Link to="/admin" className="flex items-center gap-2 text-gray-500 hover:text-gray-700">
                <BarChart3 className="w-4 h-4" />
                <span className="text-sm">管理画面</span>
              </Link>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Live Visitor Counter */}
        <div className="absolute top-4 right-4 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>現在 <strong>{Math.floor(Math.random() * 50) + 20}</strong> 名が閲覧中</span>
        </div>
      </motion.nav>
      
      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed inset-0 z-40 bg-white lg:hidden pt-20"
        >
          <div className="px-4 py-6">
            {navLinks.map((link, index) => (
              <div key={index} className="mb-4">
                <Link
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-3 text-lg font-medium text-gray-700"
                >
                  {link.label}
                </Link>
                {link.dropdown && (
                  <div className="ml-4 mt-2">
                    {link.dropdown.map((item, idx) => (
                      <Link
                        key={idx}
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className="block py-2 text-gray-600"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 py-3 text-gray-500"
            >
              <BarChart3 className="w-4 h-4" />
              <span>管理画面</span>
            </Link>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default CompanyNavbar;