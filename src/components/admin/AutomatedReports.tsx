import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Send, Calendar, Clock, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';

interface Report {
  id: string;
  title: string;
  type: 'daily' | 'weekly' | 'monthly' | 'custom';
  status: 'generating' | 'ready' | 'scheduled' | 'sent';
  generatedAt?: Date;
  scheduledFor?: Date;
  recipients?: string[];
  insights: number;
  fileSize?: string;
}

const AutomatedReports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([
    {
      id: '1',
      title: '日次パフォーマンスレポート',
      type: 'daily',
      status: 'ready',
      generatedAt: new Date(Date.now() - 3600000),
      recipients: ['manager@example.com'],
      insights: 12,
      fileSize: '2.4MB'
    },
    {
      id: '2',
      title: '週次AI分析レポート',
      type: 'weekly',
      status: 'scheduled',
      scheduledFor: new Date(Date.now() + 86400000),
      recipients: ['team@example.com', 'ceo@example.com'],
      insights: 28
    },
    {
      id: '3',
      title: '月次ROIレポート',
      type: 'monthly',
      status: 'generating',
      insights: 0
    }
  ]);

  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedType, setSelectedType] = useState<'daily' | 'weekly' | 'monthly' | 'custom'>('daily');

  const generateReport = () => {
    setIsGenerating(true);
    
    const newReport: Report = {
      id: Date.now().toString(),
      title: `AI生成 ${selectedType === 'daily' ? '日次' : selectedType === 'weekly' ? '週次' : '月次'}レポート`,
      type: selectedType,
      status: 'generating',
      insights: 0
    };

    setReports(prev => [newReport, ...prev]);

    // Simulate report generation
    setTimeout(() => {
      setReports(prev => prev.map(r => 
        r.id === newReport.id 
          ? { 
              ...r, 
              status: 'ready', 
              generatedAt: new Date(),
              insights: Math.floor(Math.random() * 20) + 10,
              fileSize: `${(Math.random() * 3 + 1).toFixed(1)}MB`
            }
          : r
      ));
      setIsGenerating(false);
    }, 3000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'scheduled': return <Clock className="w-4 h-4 text-blue-600" />;
      case 'generating': return <AlertCircle className="w-4 h-4 text-yellow-600 animate-pulse" />;
      case 'sent': return <Send className="w-4 h-4 text-purple-600" />;
      default: return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ready': return '生成完了';
      case 'scheduled': return 'スケジュール済み';
      case 'generating': return '生成中...';
      case 'sent': return '送信済み';
      default: return status;
    }
  };

  const formatDate = (date?: Date) => {
    if (!date) return '';
    return new Intl.DateTimeFormat('ja-JP', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            自動レポート生成
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            AIが自動で分析レポートを作成・配信
          </p>
        </div>
      </div>

      {/* Report Generation */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">新規レポート生成</h3>
        <div className="flex items-center gap-3">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as any)}
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isGenerating}
          >
            <option value="daily">日次レポート</option>
            <option value="weekly">週次レポート</option>
            <option value="monthly">月次レポート</option>
            <option value="custom">カスタムレポート</option>
          </select>
          <button
            onClick={generateReport}
            disabled={isGenerating}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isGenerating ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <AlertCircle className="w-4 h-4" />
                </motion.div>
                生成中...
              </>
            ) : (
              <>
                <FileText className="w-4 h-4" />
                生成開始
              </>
            )}
          </button>
        </div>
        <p className="text-xs text-gray-600 mt-2">
          AIが過去のデータを分析し、重要なインサイトを自動抽出します
        </p>
      </div>

      {/* Report List */}
      <div className="space-y-3">
        {reports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-semibold text-gray-900">{report.title}</h4>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(report.status)}
                    <span className="text-sm text-gray-600">{getStatusText(report.status)}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  {report.generatedAt && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(report.generatedAt)}
                    </span>
                  )}
                  {report.scheduledFor && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      予定: {formatDate(report.scheduledFor)}
                    </span>
                  )}
                  {report.insights > 0 && (
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {report.insights}個のインサイト
                    </span>
                  )}
                  {report.fileSize && (
                    <span>{report.fileSize}</span>
                  )}
                </div>

                {report.recipients && report.recipients.length > 0 && (
                  <div className="mt-2 text-xs text-gray-500">
                    配信先: {report.recipients.join(', ')}
                  </div>
                )}
              </div>

              {report.status === 'ready' && (
                <div className="flex items-center gap-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* AI Insights Preview */}
            {report.status === 'ready' && report.insights > 0 && (
              <div className="mt-3 pt-3 border-t">
                <p className="text-sm font-medium text-gray-700 mb-2">主要インサイト:</p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    コンバージョン率が前日比15%向上
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    製品ページの滞在時間が平均2分増加
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span>
                    AIチャットでの問題解決率が92%に到達
                  </li>
                </ul>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Scheduled Reports */}
      <div className="mt-6 pt-6 border-t">
        <h3 className="font-semibold text-gray-900 mb-3">定期配信設定</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">日次レポート</span>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
            <p className="text-xs text-gray-600">毎朝9:00に配信</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">週次レポート</span>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
            <p className="text-xs text-gray-600">毎週月曜10:00</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">月次レポート</span>
              <input type="checkbox" className="rounded" />
            </div>
            <p className="text-xs text-gray-600">月初営業日</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomatedReports;