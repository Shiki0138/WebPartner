import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { VisitorTrackingProvider } from './contexts/VisitorTrackingContext';
import HomePage from './pages/HomePage';
import FeaturesPage from './pages/FeaturesPage';
import SalesAIPage from './pages/SalesAIPage';
import HRAIPage from './pages/HRAIPage';
import CustomerSupportAIPage from './pages/CustomerSupportAIPage';
import StrategyAIPage from './pages/StrategyAIPage';
import QualityAIPage from './pages/QualityAIPage';
import ContactPage from './pages/ContactPage';
import PricingPage from './pages/PricingPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import BlogPage from './pages/BlogPage';
import NewsPage from './pages/NewsPage';
import HelpPage from './pages/HelpPage';
import DemoPage from './pages/DemoPage';
// Company Demo Pages
import CompanyHomePage from './pages/company/CompanyHomePage';
import CompanyProductsPage from './pages/company/CompanyProductsPage';
import CompanyCasesPage from './pages/company/CompanyCasesPage';
import CompanyContactPage from './pages/company/CompanyContactPage';
// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminHeatmap from './pages/admin/AdminHeatmap';
import AdminAIChat from './pages/admin/AdminAIChat';
import AdminContent from './pages/admin/AdminContent';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import UIComponentsDemo from './pages/admin/UIComponentsDemo';

function App() {
  return (
    <Router basename="/WebPartner">
      <VisitorTrackingProvider>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/sales-ai" element={<SalesAIPage />} />
        <Route path="/hr-ai" element={<HRAIPage />} />
        <Route path="/customer-support-ai" element={<CustomerSupportAIPage />} />
        <Route path="/strategy-ai" element={<StrategyAIPage />} />
        <Route path="/quality-ai" element={<QualityAIPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/case-studies" element={<CaseStudiesPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/demo" element={<DemoPage />} />
        
        {/* Company Demo Site */}
        <Route path="/company" element={<CompanyHomePage />} />
        <Route path="/company/products" element={<CompanyProductsPage />} />
        <Route path="/company/cases" element={<CompanyCasesPage />} />
        <Route path="/company/contact" element={<CompanyContactPage />} />
        
        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/heatmap" element={<AdminHeatmap />} />
        <Route path="/admin/ai-chat" element={<AdminAIChat />} />
        <Route path="/admin/content" element={<AdminContent />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
        <Route path="/admin/ui-components" element={<UIComponentsDemo />} />
      </Routes>
      </VisitorTrackingProvider>
    </Router>
  );
}

export default App;