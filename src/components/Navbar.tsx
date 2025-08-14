import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Sparkles } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  
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
      href: '/'
    },
    {
      label: 'AIサービス',
      href: '/features',
      dropdown: [
        { label: 'AI営業代行システム', href: '/sales-ai' },
        { label: 'AI人事・採用システム', href: '/hr-ai' },
        { label: 'AI顧客サポート', href: '/customer-support-ai' },
        { label: 'AI経営参謀', href: '/strategy-ai' },
        { label: 'AI品質管理システム', href: '/quality-ai' }
      ]
    },
    {
      label: '機能詳細',
      href: '/features'
    },
    {
      label: '料金プラン',
      href: '/pricing'
    },
    {
      label: 'リソース',
      href: '/resources',
      dropdown: [
        { label: '導入事例', href: '/case-studies' },
        { label: 'ブログ', href: '/blog' },
        { label: 'お知らせ', href: '/news' },
        { label: 'ヘルプセンター', href: '/help' }
      ]
    },
    {
      label: 'お問い合わせ',
      href: '/contact'
    }
  ];
  
  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-md shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center"
              >
                <span className="text-white font-bold text-xl">AI</span>
              </motion.div>
              <span className={`font-bold text-xl ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                Web Partner
              </span>
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
                      <button
                        className={`flex items-center gap-1 font-medium transition-colors ${
                          isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-300'
                        }`}
                      >
                        {link.label}
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      
                      <AnimatePresence>
                        {activeDropdown === link.label && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
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
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={link.href}
                      className={`font-medium transition-colors ${
                        location.pathname === link.href
                          ? isScrolled ? 'text-blue-600' : 'text-blue-300'
                          : isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-300'
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
              
              <Link to="/demo">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="ml-2 px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>デモ体験</span>
                </motion.button>
              </Link>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow"
              >
                無料相談
              </motion.button>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2 rounded-lg ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-40 bg-white lg:hidden"
          >
            <div className="pt-24 px-4 pb-6">
              {navLinks.map((link, index) => (
                <div key={index} className="mb-4">
                  <Link
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block py-3 text-lg font-medium text-gray-700 hover:text-blue-600"
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
                          className="block py-2 text-gray-600 hover:text-blue-600"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg font-medium shadow-lg"
              >
                無料相談
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;