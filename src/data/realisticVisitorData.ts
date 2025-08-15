// Realistic visitor simulation data for demo purposes

export interface RealisticVisitor {
  id: string;
  name: string;
  company: string;
  industry: string;
  role: string;
  sessionId: string;
  currentPage: string;
  entryTime: Date;
  lastActivity: Date;
  pageViews: PageView[];
  actions: VisitorAction[];
  leadScore: number;
  interests: string[];
  deviceType: 'desktop' | 'mobile' | 'tablet';
  source: 'direct' | 'search' | 'social' | 'referral' | 'email';
  location: {
    city: string;
    country: string;
    region: string;
  };
  behaviorPattern: 'explorer' | 'researcher' | 'decision_maker' | 'casual_browser';
  conversionProbability: number;
}

export interface PageView {
  page: string;
  timestamp: Date;
  timeSpent: number; // in seconds
  scrollDepth: number; // percentage
  interactions: number;
}

export interface VisitorAction {
  type: 'pageview' | 'click' | 'scroll' | 'chat' | 'download' | 'form' | 'video_play' | 'pdf_view';
  timestamp: Date;
  page: string;
  element?: string;
  details?: any;
}

// Japanese company names and industries for realistic demo
export const japaneseCompanies = [
  { name: '株式会社テクノロジーパートナーズ', industry: 'IT・ソフトウェア' },
  { name: 'デジタルソリューションズ株式会社', industry: 'コンサルティング' },
  { name: '株式会社イノベーション工業', industry: '製造業' },
  { name: 'グローバルトレード株式会社', industry: '商社' },
  { name: '株式会社メディカルケア', industry: '医療・ヘルスケア' },
  { name: 'エデュテック株式会社', industry: '教育・Edtech' },
  { name: '株式会社リテールマックス', industry: '小売業' },
  { name: 'フィナンシャルサービス株式会社', industry: '金融・保険' },
  { name: '株式会社ロジスティクスプロ', industry: '物流・運輸' },
  { name: 'エナジーテック株式会社', industry: 'エネルギー' }
];

export const japaneseNames = [
  '田中太郎', '佐藤花子', '山田次郎', '鈴木美咲', '高橋健太',
  '渡辺香織', '伊藤雄介', '中村智子', '小林大輔', '加藤優子',
  '吉田拓也', '山本恵子', '松本剛史', '井上麻衣', '木村聡',
  '林由美', '清水和也', '森田結衣', '池田隆', '橋本愛'
];

export const rolesByIndustry = {
  'IT・ソフトウェア': ['CTO', 'エンジニアリングマネージャー', 'プロダクトマネージャー', 'システム管理者'],
  'コンサルティング': ['シニアコンサルタント', 'プロジェクトマネージャー', 'ビジネスアナリスト', 'パートナー'],
  '製造業': ['DX推進担当', '品質管理責任者', '生産管理部長', 'IT部門責任者'],
  '商社': ['営業部長', '海外事業部長', 'デジタル戦略担当', '調達部門責任者'],
  '医療・ヘルスケア': ['情報システム責任者', '経営企画室長', '医療情報管理者', '事務長'],
  '教育・Edtech': ['教育システム担当', 'ICT推進責任者', '学習管理システム担当', '教育企画部長'],
  '小売業': ['デジタルマーケティング責任者', 'EC事業部長', '店舗システム担当', '顧客体験責任者'],
  '金融・保険': ['デジタル変革責任者', 'リスク管理部長', 'システム企画担当', '営業企画部長'],
  '物流・運輸': ['物流システム担当', 'オペレーション改善責任者', 'IT企画部長', '配送最適化担当'],
  'エネルギー': ['スマートグリッド担当', 'データ分析責任者', 'IoTシステム管理者', '技術開発部長']
};

export const locations = [
  { city: '東京', country: '日本', region: '関東' },
  { city: '大阪', country: '日本', region: '関西' },
  { city: '名古屋', country: '日本', region: '中部' },
  { city: '福岡', country: '日本', region: '九州' },
  { city: '札幌', country: '日本', region: '北海道' },
  { city: '横浜', country: '日本', region: '関東' },
  { city: '神戸', country: '日本', region: '関西' },
  { city: '仙台', country: '日本', region: '東北' }
];

export const interestsByRole = {
  'CTO': ['AI・機械学習', 'クラウド基盤', 'セキュリティ', 'DevOps'],
  'エンジニアリングマネージャー': ['開発効率化', 'チーム管理', 'プロジェクト管理', 'コード品質'],
  'プロダクトマネージャー': ['ユーザー分析', 'A/Bテスト', 'プロダクト分析', 'グロースハック'],
  'DX推進担当': ['デジタル変革', '業務効率化', 'データ分析', 'プロセス最適化'],
  '営業部長': ['売上向上', '顧客管理', '営業効率化', 'リード管理'],
  'デジタルマーケティング責任者': ['Web解析', 'コンバージョン最適化', 'SEO', 'マーケティングオートメーション']
};

// Realistic behavior patterns
export const behaviorPatterns = {
  explorer: {
    avgPageViews: 8,
    avgTimeSpent: 180, // seconds
    scrollDepthRange: [60, 95],
    interactionRate: 0.7,
    conversionProbability: 0.25
  },
  researcher: {
    avgPageViews: 12,
    avgTimeSpent: 300,
    scrollDepthRange: [80, 100],
    interactionRate: 0.9,
    conversionProbability: 0.45
  },
  decision_maker: {
    avgPageViews: 6,
    avgTimeSpent: 240,
    scrollDepthRange: [70, 90],
    interactionRate: 0.8,
    conversionProbability: 0.65
  },
  casual_browser: {
    avgPageViews: 3,
    avgTimeSpent: 90,
    scrollDepthRange: [30, 60],
    interactionRate: 0.3,
    conversionProbability: 0.08
  }
};

// Generate realistic visitor
export const generateRealisticVisitor = (): RealisticVisitor => {
  const company = japaneseCompanies[Math.floor(Math.random() * japaneseCompanies.length)];
  const name = japaneseNames[Math.floor(Math.random() * japaneseNames.length)];
  const roles = rolesByIndustry[company.industry as keyof typeof rolesByIndustry];
  const role = roles[Math.floor(Math.random() * roles.length)];
  const location = locations[Math.floor(Math.random() * locations.length)];
  const behaviorType = Object.keys(behaviorPatterns)[Math.floor(Math.random() * 4)] as keyof typeof behaviorPatterns;
  const behavior = behaviorPatterns[behaviorType];

  const pages = ['/company', '/company/products', '/company/cases', '/company/contact'];
  const currentPage = pages[Math.floor(Math.random() * pages.length)];
  
  const devices = ['desktop', 'mobile', 'tablet'];
  const deviceWeights = [0.6, 0.3, 0.1]; // Desktop more likely for B2B
  const deviceType = devices[weightedRandom(deviceWeights)] as 'desktop' | 'mobile' | 'tablet';

  const sources = ['search', 'direct', 'referral', 'social', 'email'];
  const sourceWeights = [0.4, 0.25, 0.15, 0.1, 0.1]; // Search most likely for B2B
  const source = sources[weightedRandom(sourceWeights)] as any;

  const interests = interestsByRole[role as keyof typeof interestsByRole] || ['業務効率化'];
  
  const baseScore = Math.floor(Math.random() * 40) + 20;
  const roleMultiplier = role.includes('責任者') || role.includes('部長') ? 1.3 : 1.0;
  const behaviorMultiplier = {
    'decision_maker': 1.4,
    'researcher': 1.2,
    'explorer': 1.0,
    'casual_browser': 0.7
  }[behaviorType];

  const leadScore = Math.min(100, Math.floor(baseScore * roleMultiplier * behaviorMultiplier));

  return {
    id: `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    name,
    company: company.name,
    industry: company.industry,
    role,
    sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    currentPage,
    entryTime: new Date(Date.now() - Math.random() * 3600000), // Within last hour
    lastActivity: new Date(),
    pageViews: generatePageViews(behavior, currentPage),
    actions: [],
    leadScore,
    interests,
    deviceType,
    source,
    location,
    behaviorPattern: behaviorType,
    conversionProbability: behavior.conversionProbability
  };
};

function weightedRandom(weights: number[]): number {
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  let random = Math.random() * totalWeight;
  
  for (let i = 0; i < weights.length; i++) {
    if (random < weights[i]) {
      return i;
    }
    random -= weights[i];
  }
  return weights.length - 1;
}

function generatePageViews(behavior: any, currentPage: string): PageView[] {
  const pages = ['/company', '/company/products', '/company/cases', '/company/contact'];
  const pageViews: PageView[] = [];
  
  const numPages = Math.min(pages.length, Math.floor(Math.random() * 3) + 1);
  const viewedPages = [currentPage];
  
  for (let i = 1; i < numPages; i++) {
    const availablePages = pages.filter(p => !viewedPages.includes(p));
    if (availablePages.length > 0) {
      const nextPage = availablePages[Math.floor(Math.random() * availablePages.length)];
      viewedPages.push(nextPage);
    }
  }

  viewedPages.forEach((page, index) => {
    const timeSpent = Math.floor(
      behavior.avgTimeSpent * (0.7 + Math.random() * 0.6) / viewedPages.length
    );
    const scrollDepth = Math.floor(
      behavior.scrollDepthRange[0] + 
      Math.random() * (behavior.scrollDepthRange[1] - behavior.scrollDepthRange[0])
    );
    
    pageViews.push({
      page,
      timestamp: new Date(Date.now() - (viewedPages.length - index) * timeSpent * 1000),
      timeSpent,
      scrollDepth,
      interactions: Math.floor(Math.random() * 5 * behavior.interactionRate)
    });
  });

  return pageViews;
}

// Real-time metrics simulation
export const generateBusinessMetrics = () => {
  const now = new Date();
  const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  
  return {
    realTimeStats: {
      activeVisitors: Math.floor(Math.random() * 15) + 8, // 8-22 active visitors
      pageViewsToday: Math.floor(Math.random() * 200) + 450, // 450-650 page views
      conversionsToday: Math.floor(Math.random() * 8) + 3, // 3-11 conversions
      avgSessionDuration: Math.floor(Math.random() * 120) + 180 // 180-300 seconds
    },
    hourlyData: Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      visitors: Math.floor(Math.random() * 20) + 5,
      conversions: Math.floor(Math.random() * 3),
      bounceRate: Math.random() * 40 + 30 // 30-70%
    })),
    topPages: [
      { page: '/company', views: Math.floor(Math.random() * 100) + 200, conversionRate: Math.random() * 5 + 2 },
      { page: '/company/products', views: Math.floor(Math.random() * 80) + 150, conversionRate: Math.random() * 8 + 4 },
      { page: '/company/cases', views: Math.floor(Math.random() * 60) + 100, conversionRate: Math.random() * 10 + 6 },
      { page: '/company/contact', views: Math.floor(Math.random() * 40) + 80, conversionRate: Math.random() * 25 + 15 }
    ],
    leadSources: [
      { source: 'Organic Search', leads: Math.floor(Math.random() * 20) + 30, conversionRate: Math.random() * 5 + 3 },
      { source: 'Direct', leads: Math.floor(Math.random() * 15) + 20, conversionRate: Math.random() * 8 + 4 },
      { source: 'Referral', leads: Math.floor(Math.random() * 10) + 15, conversionRate: Math.random() * 7 + 5 },
      { source: 'Social Media', leads: Math.floor(Math.random() * 8) + 10, conversionRate: Math.random() * 3 + 2 },
      { source: 'Email Campaign', leads: Math.floor(Math.random() * 5) + 8, conversionRate: Math.random() * 12 + 8 }
    ]
  };
};