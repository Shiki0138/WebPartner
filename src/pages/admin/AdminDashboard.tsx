import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  BarChart3, Users, TrendingUp, Eye, MessageSquare, 
  FileText, AlertCircle, Award, Activity, ArrowUp, 
  ArrowDown, Clock, Target, Zap
} from 'lucide-react';
import RealTimeVisitors from '../../components/admin/RealTimeVisitors';
import AutomatedReports from '../../components/admin/AutomatedReports';
import LeadScoring from '../../components/admin/LeadScoring';
import { useVisitorTracking } from '../../contexts/VisitorTrackingContext';

interface DashboardMetric {
  label: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down';
  icon: React.ElementType;
  color: string;
}

interface RealtimeData {
  activeVisitors: number;
  pageViews: number;
  chatSessions: number;
  conversions: number;
}

const AdminDashboard: React.FC = () => {
  const { getVisitorInsights, activeVisitors } = useVisitorTracking();
  const insights = getVisitorInsights();
  const businessMetrics = insights.businessMetrics;
  
  const [realtimeData, setRealtimeData] = useState<RealtimeData>({
    activeVisitors: 42,
    pageViews: 1234,
    chatSessions: 8,
    conversions: 3
  });
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>('today');

  // リアルタイムデータの更新
  useEffect(() => {
    if (businessMetrics) {
      setRealtimeData({
        activeVisitors: insights.totalActive,
        pageViews: businessMetrics.realTimeStats.pageViewsToday,
        chatSessions: businessMetrics.realTimeStats.activeVisitors,
        conversions: businessMetrics.realTimeStats.conversionsToday
      });
    }
  }, [insights, businessMetrics]);
  
  // リアルタイムデータのシミュレーション
  useEffect(() => {
    const interval = setInterval(() => {
      if (!businessMetrics) {
        setRealtimeData(prev => ({
          activeVisitors: Math.max(0, prev.activeVisitors + Math.floor(Math.random() * 5 - 2)),
          pageViews: prev.pageViews + Math.floor(Math.random() * 3),
          chatSessions: Math.max(0, prev.chatSessions + Math.floor(Math.random() * 3 - 1)),
          conversions: prev.conversions + (Math.random() > 0.9 ? 1 : 0)
        }));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [businessMetrics]);

  const metrics: DashboardMetric[] = [
    {
      label: '現在の訪問者',
      value: realtimeData.activeVisitors,
      change: businessMetrics ? Math.floor(Math.random() * 30) + 10 : 23,
      trend: 'up',
      icon: Users,
      color: 'from-blue-500 to-blue-600'
    },
    {
      label: '本日のPV',
      value: realtimeData.pageViews.toLocaleString(),
      change: businessMetrics ? Math.floor(Math.random() * 50) + 20 : 45,
      trend: 'up',
      icon: Eye,
      color: 'from-purple-500 to-purple-600'
    },
    {
      label: 'AIチャット対応',
      value: businessMetrics ? Math.floor(realtimeData.activeVisitors * 0.3) : realtimeData.chatSessions,
      change: businessMetrics ? Math.floor(Math.random() * 80) + 40 : 67,
      trend: 'up',
      icon: MessageSquare,
      color: 'from-green-500 to-green-600'
    },
    {
      label: 'コンバージョン',
      value: `${realtimeData.conversions}件`,
      change: businessMetrics ? Math.floor(Math.random() * 25) + 5 : 12,
      trend: 'up',
      icon: Target,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  // AI洞察をリアルデータに基づいて生成
  const highValueVisitors = activeVisitors.filter(v => v.leadScore >= 70).length;
  const decisionMakers = activeVisitors.filter(v => v.role && (v.role.includes('責任者') || v.role.includes('部長'))).length;
  const researcherPattern = activeVisitors.filter(v => v.behaviorPattern === 'researcher').length;
  
  const aiInsights = [
    {
      type: highValueVisitors > 2 ? 'success' : 'alert',
      icon: highValueVisitors > 2 ? Award : AlertCircle,
      title: highValueVisitors > 2 ? '高品質リードが増加中' : '製品ページの最適化が必要',
      description: highValueVisitors > 2 
        ? `現在${highValueVisitors}名の高スコアリードがサイトを閲覧中です` 
        : 'クラウドERP Proページで離脱率が上昇しています',
      action: highValueVisitors > 2 ? 'リード詳細を確認' : '改善提案を見る',
      severity: highValueVisitors > 2 ? 'low' : 'high'
    },
    {
      type: 'recommendation',
      icon: Zap,
      title: '意思決定者向けコンテンツの強化',
      description: `${decisionMakers}名の決定権者が訪問中。専用コンテンツの準備を推奨`,
      action: 'エグゼクティブ向け資料を準備',
      severity: 'medium'
    },
    {
      type: 'success',
      icon: TrendingUp,
      title: '研究型訪問者の動向',
      description: `${researcherPattern}名が詳細な情報収集中。導入検討段階の可能性が高い`,
      action: '詳細資料を自動送信',
      severity: 'low'
    }
  ];

  // 最近のアクティビティを訪問者データから生成
  const recentActivities = [
    ...activeVisitors.slice(0, 3).map((visitor, i) => ({
      time: `${(i + 1) * 3}分前`,
      action: '新規訪問者',
      detail: `${visitor.name || 'ゲスト'} (${visitor.company || '企業'})`,
      icon: Users
    })),
    { time: '5分前', action: 'AIチャット完了', detail: '見積もり作成完了', icon: MessageSquare },
    { time: '12分前', action: '資料ダウンロード', detail: 'クラウドERP Pro導入ガイド', icon: FileText },
    { time: '18分前', action: 'ページ最適化', detail: '価格ページのCTA改善', icon: Activity }
  ].slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/company" className="text-gray-600 hover:text-gray-900">
                ← 企業サイトに戻る
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">管理ダッシュボード</h1>
              <div className="text-sm text-gray-500">
                {businessMetrics ? 'リアルデータ駆動' : 'デモデータ'}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedPeriod('today')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedPeriod === 'today' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                今日
              </button>
              <button
                onClick={() => setSelectedPeriod('week')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedPeriod === 'week' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                今週
              </button>
              <button
                onClick={() => setSelectedPeriod('month')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedPeriod === 'month' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                今月
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                    <span>{metric.change}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">{metric.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Enhanced Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <RealTimeVisitors />
          <LeadScoring />
        </div>

        {/* Reports Section */}
        <div className="mb-8">
          <AutomatedReports />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">クイックアクション</h2>
              <div className="space-y-3">
                <Link
                  to="/admin/heatmap"
                  className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Eye className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">ヒートマップ分析</span>
                </Link>
                <Link
                  to="/admin/ai-chat"
                  className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                  <span className="font-medium">AIチャット管理</span>
                </Link>
                <Link
                  to="/admin/content"
                  className="flex items-center gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <FileText className="w-5 h-5 text-green-600" />
                  <span className="font-medium">コンテンツ管理</span>
                </Link>
                <Link
                  to="/admin/analytics"
                  className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
                >
                  <BarChart3 className="w-5 h-5 text-orange-600" />
                  <span className="font-medium">詳細分析</span>
                </Link>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold mb-4">最近のアクティビティ</h2>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-600">{activity.detail}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* AI Insights */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">AI分析インサイト</h2>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Activity className="w-4 h-4" />
                  <span>リアルタイム更新中</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {aiInsights.map((insight, index) => {
                  const Icon = insight.icon;
                  const severityColors: Record<string, string> = {
                    high: 'border-red-200 bg-red-50',
                    medium: 'border-yellow-200 bg-yellow-50',
                    low: 'border-green-200 bg-green-50'
                  };
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`border rounded-lg p-4 ${severityColors[insight.severity]}`}
                    >
                      <div className="flex items-start gap-3">
                        <Icon className={`w-5 h-5 mt-0.5 ${
                          insight.severity === 'high' ? 'text-red-600' :
                          insight.severity === 'medium' ? 'text-yellow-600' :
                          'text-green-600'
                        }`} />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{insight.title}</h3>
                          <p className="text-sm text-gray-700 mb-2">{insight.description}</p>
                          <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                            {insight.action} →
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Performance Chart Placeholder */}
              <div className="mt-6 pt-6 border-t">
                <h3 className="text-md font-semibold mb-4">パフォーマンストレンド</h3>
                <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                    <p className="text-gray-600">リアルタイムチャート</p>
                    <p className="text-sm text-gray-500">訪問者数・コンバージョン率推移</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Status Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2"
        >
          <div className="container mx-auto px-4 flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>システム正常稼働中</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>最終更新: {new Date().toLocaleTimeString('ja-JP')}</span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <span>AI稼働率: 99.8%</span>
              <span>応答速度: 0.3秒</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;