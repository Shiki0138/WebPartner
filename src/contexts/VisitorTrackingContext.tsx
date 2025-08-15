import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Visitor {
  id: string;
  sessionId: string;
  currentPage: string;
  entryTime: Date;
  lastActivity: Date;
  pageViews: string[];
  actions: VisitorAction[];
  leadScore: number;
  interests: string[];
  deviceType: 'desktop' | 'mobile' | 'tablet';
  source: 'direct' | 'search' | 'social' | 'referral';
}

interface VisitorAction {
  type: 'pageview' | 'click' | 'scroll' | 'chat' | 'download' | 'form';
  timestamp: Date;
  page: string;
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

  // Initialize current visitor
  useEffect(() => {
    const visitor: Visitor = {
      id: `visitor_${Math.random().toString(36).substr(2, 9)}`,
      sessionId: `session_${Date.now()}`,
      currentPage: window.location.pathname,
      entryTime: new Date(),
      lastActivity: new Date(),
      pageViews: [window.location.pathname],
      actions: [],
      leadScore: 0,
      interests: [],
      deviceType: window.innerWidth < 768 ? 'mobile' : 'desktop',
      source: 'direct'
    };
    setCurrentVisitor(visitor);
  }, []);

  // Simulate other visitors
  useEffect(() => {
    const simulateVisitor = () => {
      const pages = ['/company', '/company/products', '/company/cases', '/company/contact'];
      const sources = ['direct', 'search', 'social', 'referral'] as const;
      const devices = ['desktop', 'mobile', 'tablet'] as const;
      
      const newVisitor: Visitor = {
        id: `visitor_${Math.random().toString(36).substr(2, 9)}`,
        sessionId: `session_${Date.now()}_${Math.random()}`,
        currentPage: pages[Math.floor(Math.random() * pages.length)],
        entryTime: new Date(),
        lastActivity: new Date(),
        pageViews: [pages[Math.floor(Math.random() * pages.length)]],
        actions: [],
        leadScore: Math.floor(Math.random() * 100),
        interests: ['クラウド', 'セキュリティ', 'AI分析'].filter(() => Math.random() > 0.5),
        deviceType: devices[Math.floor(Math.random() * devices.length)],
        source: sources[Math.floor(Math.random() * sources.length)]
      };

      setActiveVisitors(prev => {
        const updated = [...prev, newVisitor].slice(-20); // Keep last 20 visitors
        return updated;
      });

      // Remove visitor after random time
      setTimeout(() => {
        setActiveVisitors(prev => prev.filter(v => v.id !== newVisitor.id));
      }, Math.random() * 60000 + 30000); // 30-90 seconds
    };

    const interval = setInterval(simulateVisitor, 5000); // New visitor every 5 seconds
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
      predictions.push({
        nextPage: '/company/products',
        probability: 65,
        reason: '新規訪問者の65%が製品ページを次に閲覧'
      });
      predictions.push({
        nextPage: '/company/cases',
        probability: 25,
        reason: '導入事例への関心が高い'
      });
    } else if (currentPage === '/company/products') {
      if (currentVisitor.leadScore > 50) {
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
      Math.min(95, currentVisitor.leadScore * 1.2) : 0;

    return {
      totalActive,
      averageEngagement,
      hotPages,
      conversionProbability
    };
  };

  const simulateVisitors = () => {
    // Force simulate multiple visitors for demo
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const pages = ['/company', '/company/products', '/company/cases'];
        const visitor: Visitor = {
          id: `demo_visitor_${i}`,
          sessionId: `demo_session_${i}`,
          currentPage: pages[i % pages.length],
          entryTime: new Date(),
          lastActivity: new Date(),
          pageViews: [pages[i % pages.length]],
          actions: [],
          leadScore: 20 + i * 15,
          interests: ['AI', 'クラウド', 'セキュリティ'].slice(0, i % 3 + 1),
          deviceType: ['desktop', 'mobile', 'tablet'][i % 3] as any,
          source: ['search', 'social', 'direct', 'referral'][i % 4] as any
        };
        setActiveVisitors(prev => [...prev, visitor].slice(-20));
      }, i * 1000);
    }
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