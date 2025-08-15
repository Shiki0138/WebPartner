import React from 'react';
import { motion } from 'framer-motion';
import { Users, Globe, Smartphone, Monitor, Tablet, TrendingUp, Clock } from 'lucide-react';
import { useVisitorTracking } from '../../contexts/VisitorTrackingContext';

const RealTimeVisitors: React.FC = () => {
  const { activeVisitors, getVisitorInsights } = useVisitorTracking();
  const insights = getVisitorInsights();

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'mobile': return Smartphone;
      case 'tablet': return Tablet;
      default: return Monitor;
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'search': return 'text-blue-600 bg-blue-100';
      case 'social': return 'text-purple-600 bg-purple-100';
      case 'referral': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diff < 60) return `${diff}秒前`;
    if (diff < 3600) return `${Math.floor(diff / 60)}分前`;
    return `${Math.floor(diff / 3600)}時間前`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            リアルタイム訪問者
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            現在サイトを閲覧中のユーザー
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-blue-600">{insights.totalActive}</div>
          <div className="text-sm text-gray-600">アクティブ</div>
        </div>
      </div>

      {/* Insights Bar */}
      <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {Math.round(insights.averageEngagement)}%
          </div>
          <div className="text-xs text-gray-600">平均エンゲージメント</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {insights.conversionProbability}%
          </div>
          <div className="text-xs text-gray-600">コンバージョン予測</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">
            {insights.hotPages.length}
          </div>
          <div className="text-xs text-gray-600">人気ページ</div>
        </div>
      </div>

      {/* Visitor List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {activeVisitors.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Users className="w-12 h-12 mx-auto mb-2 opacity-30" />
            <p>現在アクティブな訪問者はいません</p>
          </div>
        ) : (
          activeVisitors.map((visitor, index) => {
            const DeviceIcon = getDeviceIcon(visitor.deviceType);
            return (
              <motion.div
                key={visitor.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {visitor.id.charAt(8).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900">
                          訪問者 {visitor.id.substring(8, 13)}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getSourceColor(visitor.source)}`}>
                          {visitor.source}
                        </span>
                        <DeviceIcon className="w-4 h-4 text-gray-500" />
                      </div>
                      <div className="text-sm text-gray-600">
                        現在: <span className="font-medium">
                          {visitor.currentPage === '/company' && 'トップページ'}
                          {visitor.currentPage === '/company/products' && '製品ページ'}
                          {visitor.currentPage === '/company/cases' && '導入事例'}
                          {visitor.currentPage === '/company/contact' && 'お問い合わせ'}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatTime(visitor.entryTime)}
                        </span>
                        <span>閲覧: {visitor.pageViews.length}ページ</span>
                        {visitor.interests.length > 0 && (
                          <span>関心: {visitor.interests.join(', ')}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-lg font-semibold text-green-600">
                        {visitor.leadScore}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600">スコア</div>
                  </div>
                </div>
                
                {/* Action Timeline */}
                {visitor.actions.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <span className="font-medium">最近のアクション:</span>
                      {visitor.actions.slice(-3).map((action, i) => (
                        <span key={i} className="px-2 py-0.5 bg-white rounded">
                          {action.type}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })
        )}
      </div>

      {/* Hot Pages */}
      {insights.hotPages.length > 0 && (
        <div className="mt-6 pt-6 border-t">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            <Globe className="w-4 h-4 inline-block mr-1" />
            現在の人気ページ
          </h3>
          <div className="space-y-2">
            {insights.hotPages.map((page, index) => (
              <div key={page} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">
                  {page === '/company' && 'トップページ'}
                  {page === '/company/products' && '製品ページ'}
                  {page === '/company/cases' && '導入事例'}
                  {page === '/company/contact' && 'お問い合わせ'}
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(3 - index) * 33}%` }}
                      className="bg-blue-600 h-2 rounded-full"
                    />
                  </div>
                  <span className="text-xs text-gray-600 w-12 text-right">
                    {activeVisitors.filter(v => v.currentPage === page).length}人
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RealTimeVisitors;