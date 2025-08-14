import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FeaturesPage from './pages/FeaturesPage';
import SalesAIPage from './pages/SalesAIPage';
import HRAIPage from './pages/HRAIPage';
import CustomerSupportAIPage from './pages/CustomerSupportAIPage';
import StrategyAIPage from './pages/StrategyAIPage';
import QualityAIPage from './pages/QualityAIPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/sales-ai" element={<SalesAIPage />} />
        <Route path="/hr-ai" element={<HRAIPage />} />
        <Route path="/customer-support-ai" element={<CustomerSupportAIPage />} />
        <Route path="/strategy-ai" element={<StrategyAIPage />} />
        <Route path="/quality-ai" element={<QualityAIPage />} />
      </Routes>
    </Router>
  );
}

export default App;