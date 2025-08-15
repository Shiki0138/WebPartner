import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { generateRealisticVisitor, generateBusinessMetrics, RealisticVisitor } from '../data/realisticVisitorData';

interface Visitor extends Omit<RealisticVisitor, 'pageViews'> {
  pageViews: string[];
}

interface VisitorAction {
  type: 'pageview' | 'click' | 'scroll' | 'chat' | 'download' | 'form' | 'video_play' | 'pdf_view';
  timestamp: Date;
  page: string;
  element?: string;
  details?: any;
}

interface PredictedNavigation {
  nextPage: string;
  probability: number;
  reason: string;
}

interface VisitorTrackingContextType {
  currentVisitor: Visitor | null;
  activeVisitors: Visitor[];
  recordAction: (action: VisitorAction) => void;
  getPredictedNavigation: () => PredictedNavigation[];
  getVisitorInsights: () => VisitorInsights;
  simulateVisitors: () => void;
}

interface VisitorInsights {
  totalActive: number;
  averageEngagement: number;
  hotPages: string[];
  conversionProbability: number;
  businessMetrics?: any;
}

const VisitorTrackingContext = createContext<VisitorTrackingContextType | undefined>(undefined);

export const useVisitorTracking = () => {
  const context = useContext(VisitorTrackingContext);
  if (!context) {
    throw new Error('useVisitorTracking must be used within VisitorTrackingProvider');
  }
  return context;
};

interface VisitorTrackingProviderProps {
  children: ReactNode;
}

export const VisitorTrackingProvider: React.FC<VisitorTrackingProviderProps> = ({ children }) => {
  const [currentVisitor, setCurrentVisitor] = useState<Visitor | null>(null);
  const [activeVisitors, setActiveVisitors] = useState<Visitor[]>([]);
  const [businessMetrics, setBusinessMetrics] = useState<any>(null);

  // Initialize current visitor and business metrics
  useEffect(() => {
    const realisticVisitor = generateRealisticVisitor();
    const visitor: Visitor = {
      ...realisticVisitor,
      currentPage: window.location.pathname,
      pageViews: [window.location.pathname],
      deviceType: window.innerWidth < 768 ? 'mobile' : realisticVisitor.deviceType
    };
    setCurrentVisitor(visitor);
    setBusinessMetrics(generateBusinessMetrics());
  }, []);

  // Simulate realistic visitors
  useEffect(() => {
    const simulateVisitor = () => {
      const realisticVisitor = generateRealisticVisitor();
      const newVisitor: Visitor = {
        ...realisticVisitor,
        pageViews: realisticVisitor.pageViews.map(pv => pv.page)
      };

      setActiveVisitors(prev => {
        const updated = [...prev, newVisitor].slice(-25); // Keep last 25 visitors for more activity
        return updated;
      });

      // Remove visitor after realistic session time
      const sessionDuration = realisticVisitor.pageViews.reduce((sum, pv) => sum + pv.timeSpent, 0) * 1000;
      setTimeout(() => {
        setActiveVisitors(prev => prev.filter(v => v.id !== newVisitor.id));
      }, Math.min(sessionDuration + Math.random() * 30000, 180000)); // Max 3 minutes
    };

    // Start with some initial visitors
    for (let i = 0; i < 8; i++) {
      setTimeout(() => simulateVisitor(), i * 2000);
    }

    const interval = setInterval(simulateVisitor, 8000); // New visitor every 8 seconds
    return () => clearInterval(interval);
  }, []);

  const recordAction = (action: VisitorAction) => {
    if (!currentVisitor) return;

    const updatedVisitor = {
      ...currentVisitor,
      lastActivity: new Date(),
      actions: [...currentVisitor.actions, action],
      leadScore: calculateLeadScore([...currentVisitor.actions, action])
    };

    if (action.type === 'pageview') {
      updatedVisitor.pageViews = [...currentVisitor.pageViews, action.page];
      updatedVisitor.currentPage = action.page;
    }

    setCurrentVisitor(updatedVisitor);
  };

  const calculateLeadScore = (actions: VisitorAction[]): number => {
    let score = 0;
    actions.forEach(action => {
      switch (action.type) {
        case 'pageview': score += 5; break;
        case 'click': score += 10; break;
        case 'chat': score += 30; break;
        case 'download': score += 25; break;
        case 'form': score += 40; break;
        default: score += 3;
      }
    });
    return Math.min(100, score);
  };

  const getPredictedNavigation = (): PredictedNavigation[] => {
    if (!currentVisitor) return [];

    const predictions: PredictedNavigation[] = [];
    const currentPage = currentVisitor.currentPage;

    // AI-based predictions based on visitor behavior
    if (currentPage === '/company') {
      if (currentVisitor.role?.includes('責任者') || currentVisitor.role?.includes('部長')) {
        predictions.push({
          nextPage: '/company/products',
          probability: 78,
          reason: `${currentVisitor.role}は製品詳細を重視する傾向`
        });
      } else {
        predictions.push({
          nextPage: '/company/products',
          probability: 65,
          reason: '新規訪問者の65%が製品ページを次に閲覧'
        });
      }
      predictions.push({
        nextPage: '/company/cases',
        probability: 25,
        reason: '導入事例への関心が高い'
      });
    } else if (currentPage === '/company/products') {
      if (currentVisitor.behaviorPattern === 'decision_maker') {
        predictions.push({
          nextPage: '/company/contact',
          probability: 82,
          reason: '意思決定者パターン: 即座にコンタクト傾向'
        });
      } else if (currentVisitor.behaviorPattern === 'researcher') {
        predictions.push({
          nextPage: '/company/cases',
          probability: 74,
          reason: '研究者パターン: 詳細な事例調査を実施'
        });
      } else if (currentVisitor.leadScore > 50) {
        predictions.push({
          nextPage: '/company/contact',
          probability: 75,
          reason: '高スコアリードはお問い合わせへ'
        });
      } else {
        predictions.push({
          nextPage: '/company/cases',
          probability: 60,
          reason: '実績確認後の購買確率UP'
        });
      }
    }

    return predictions.sort((a, b) => b.probability - a.probability).slice(0, 3);
  };

  const getVisitorInsights = (): VisitorInsights => {
    const totalActive = activeVisitors.length;
    const averageEngagement = activeVisitors.reduce((sum, v) => sum + v.leadScore, 0) / (totalActive || 1);
    
    // Count page views
    const pageViewCounts: { [key: string]: number } = {};
    activeVisitors.forEach(visitor => {
      visitor.pageViews.forEach(page => {
        pageViewCounts[page] = (pageViewCounts[page] || 0) + 1;
      });
    });

    const hotPages = Object.entries(pageViewCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([page]) => page);

    const conversionProbability = currentVisitor ? 
      Math.min(95, currentVisitor.conversionProbability * 100) : 0;

    return {
      totalActive,
      averageEngagement,
      hotPages,
      conversionProbability,
      businessMetrics
    };
  };

  const simulateVisitors = () => {
    // Generate realistic demo visitors
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        const realisticVisitor = generateRealisticVisitor();
        const visitor: Visitor = {
          ...realisticVisitor,
          id: `demo_visitor_${i}_${Date.now()}`,
          pageViews: realisticVisitor.pageViews.map(pv => pv.page)
        };
        setActiveVisitors(prev => [...prev, visitor].slice(-25));
      }, i * 800);
    }
    
    // Update business metrics
    setBusinessMetrics(generateBusinessMetrics());
  };

  return (
    <VisitorTrackingContext.Provider
      value={{
        currentVisitor,
        activeVisitors,
        recordAction,
        getPredictedNavigation,
        getVisitorInsights,
        simulateVisitors
      }}
    >
      {children}
    </VisitorTrackingContext.Provider>
  );
};