import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Eye, Activity, MousePointer, TrendingUp, 
  BarChart3, ArrowLeft, Download, Calendar, Filter
} from 'lucide-react';

interface HeatmapPoint {
  x: number;
  y: number;
  timestamp: number;
  type: 'click' | 'move' | 'scroll';
  pageUrl: string;
  userId: string;
}

interface PageMetrics {
  page: string;
  clicks: number;
  avgTime: string;
  scrollDepth: number;
  exitRate: number;
}

const AdminHeatmap: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState('/company');
  const [heatmapData, setHeatmapData] = useState<HeatmapPoint[]>([]);
  const [isLive, setIsLive] = useState(true);
  const [dateRange, setDateRange] = useState('today');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // ヒートマップデータのシミュレーション
  useEffect(() => {
    if (!isLive) return;

    const generatePoint = () => {
      const pages = ['/company', '/company/products', '/company/cases'];
      const point: HeatmapPoint = {
        x: Math.random() * 800,
        y: Math.random() * 600,
        timestamp: Date.now(),
        type: Math.random() > 0.7 ? 'click' : 'move',
        pageUrl: pages[Math.floor(Math.random() * pages.length)],
        userId: `user_${Math.floor(Math.random() * 100)}`
      };

      setHeatmapData(prev => [...prev, point].slice(-1000));
    };

    const interval = setInterval(generatePoint, 200);
    return () => clearInterval(interval);
  }, [isLive]);

  // ヒートマップの描画
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // キャンバスサイズ設定
    canvas.width = 800;
    canvas.height = 600;

    // 背景をクリア
    ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // フィルタリングされたデータを描画
    const filteredData = heatmapData.filter(point => point.pageUrl === selectedPage);
    
    filteredData.forEach(point => {
      const age = Date.now() - point.timestamp;
      const opacity = Math.max(0, 1 - age / 10000);

      if (point.type === 'click') {
        // クリックポイント
        ctx.beginPath();
        ctx.arc(point.x, point.y, 20, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(239, 68, 68, ${opacity * 0.6})`;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(point.x, point.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(239, 68, 68, ${opacity})`;
        ctx.fill();
      } else {
        // マウス移動
        ctx.beginPath();
        ctx.arc(point.x, point.y, 15, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${opacity * 0.2})`;
        ctx.fill();
      }
    });
  }, [heatmapData, selectedPage]);

  const pageMetrics: PageMetrics[] = [
    { page: 'トップページ', clicks: 1234, avgTime: '2:45', scrollDepth: 68, exitRate: 25 },
    { page: '製品ページ', clicks: 892, avgTime: '3:12', scrollDepth: 82, exitRate: 18 },
    { page: '導入事例', clicks: 567, avgTime: '4:23', scrollDepth: 91, exitRate: 12 },
    { page: 'お問い合わせ', clicks: 234, avgTime: '1:56', scrollDepth: 100, exitRate: 5 }
  ];

  const hotspots = [
    { element: 'CTAボタン（無料デモ）', clicks: 342, conversion: 23 },
    { element: '料金表', clicks: 287, conversion: 18 },
    { element: 'お客様の声', clicks: 198, conversion: 12 },
    { element: 'ナビゲーション（製品）', clicks: 156, conversion: 8 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                to="/admin" 
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">ヒートマップ分析</h1>
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                isLive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-500'
                }`}></div>
                <span>{isLive ? 'ライブ' : '停止中'}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="today">今日</option>
                <option value="week">今週</option>
                <option value="month">今月</option>
              </select>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                レポート出力
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Page Selector */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h3 className="font-semibold mb-3">ページ選択</h3>
              <select
                value={selectedPage}
                onChange={(e) => setSelectedPage(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="/company">トップページ</option>
                <option value="/company/products">製品ページ</option>
                <option value="/company/cases">導入事例</option>
                <option value="/company/contact">お問い合わせ</option>
              </select>
            </div>

            {/* Hotspots */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h3 className="font-semibold mb-3">ホットスポット</h3>
              <div className="space-y-3">
                {hotspots.map((spot, index) => (
                  <div key={index} className="border-b pb-3 last:border-0">
                    <p className="text-sm font-medium text-gray-900">{spot.element}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-600">{spot.clicks} クリック</span>
                      <span className="text-xs text-green-600">{spot.conversion}% CV</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h3 className="font-semibold mb-3">表示設定</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">クリック表示</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">マウス軌跡表示</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">スクロール深度表示</span>
                </label>
              </div>
              
              <button
                onClick={() => setIsLive(!isLive)}
                className={`w-full mt-4 py-2 rounded-lg font-medium transition-colors ${
                  isLive 
                    ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                {isLive ? '記録を停止' : '記録を開始'}
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Heatmap Visualization */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">リアルタイムヒートマップ</h2>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Activity className="w-4 h-4" />
                  <span>現在 {heatmapData.filter(p => p.pageUrl === selectedPage).length} ポイント</span>
                </div>
              </div>
              
              <div ref={containerRef} className="relative bg-gray-100 rounded-lg overflow-hidden">
                <canvas
                  ref={canvasRef}
                  className="w-full h-[600px] object-contain"
                />
                
                {/* Sample Page Overlay */}
                <div className="absolute inset-0 pointer-events-none p-8">
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
                    <div className="h-20 bg-gray-200 rounded mb-4 animate-pulse"></div>
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                      <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
                      <div className="flex gap-4">
                        <div className="h-10 bg-blue-200 rounded-lg flex-1 animate-pulse"></div>
                        <div className="h-10 bg-gray-200 rounded-lg flex-1 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span>クリック</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full opacity-30"></div>
                  <span>マウス移動</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span>注目エリア</span>
                </div>
              </div>
            </div>

            {/* Page Metrics */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold mb-4">ページ別パフォーマンス</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">ページ</th>
                      <th className="text-center py-3 px-4">クリック数</th>
                      <th className="text-center py-3 px-4">平均滞在時間</th>
                      <th className="text-center py-3 px-4">スクロール深度</th>
                      <th className="text-center py-3 px-4">離脱率</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageMetrics.map((metric, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{metric.page}</td>
                        <td className="text-center py-3 px-4">{metric.clicks.toLocaleString()}</td>
                        <td className="text-center py-3 px-4">{metric.avgTime}</td>
                        <td className="text-center py-3 px-4">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${metric.scrollDepth}%` }}
                              ></div>
                            </div>
                            <span className="text-sm">{metric.scrollDepth}%</span>
                          </div>
                        </td>
                        <td className="text-center py-3 px-4">
                          <span className={`text-sm ${
                            metric.exitRate < 20 ? 'text-green-600' : 
                            metric.exitRate < 40 ? 'text-yellow-600' : 
                            'text-red-600'
                          }`}>
                            {metric.exitRate}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                AI分析による改善提案
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span>CTAボタンの位置を画面上部に移動することで、クリック率が推定35%向上します</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span>製品説明セクションでの離脱が多いため、要約を追加することを推奨</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span>モバイルユーザーの80%が横スクロールエリアを見逃しています</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeatmap;