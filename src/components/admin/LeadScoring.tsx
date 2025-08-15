import React from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, User, Mail, Phone, Building, Award, AlertTriangle } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  score: number;
  status: 'hot' | 'warm' | 'cold';
  lastActivity: Date;
  activities: {
    pageViews: number;
    downloads: number;
    chatInteractions: number;
    emailOpens: number;
  };
  interests: string[];
  readyToBuy: boolean;
}

const LeadScoring: React.FC = () => {
  const leads: Lead[] = [
    {
      id: '1',
      name: '山田太郎',
      company: '株式会社テクノロジー',
      email: 'yamada@example.com',
      score: 92,
      status: 'hot',
      lastActivity: new Date(Date.now() - 3600000),
      activities: {
        pageViews: 15,
        downloads: 3,
        chatInteractions: 2,
        emailOpens: 8
      },
      interests: ['クラウドERP', 'AI分析'],
      readyToBuy: true
    },
    {
      id: '2',
      name: '佐藤花子',
      company: 'サトウ商事',
      email: 'sato@example.com',
      score: 78,
      status: 'warm',
      lastActivity: new Date(Date.now() - 7200000),
      activities: {
        pageViews: 8,
        downloads: 1,
        chatInteractions: 1,
        emailOpens: 5
      },
      interests: ['セキュリティ'],
      readyToBuy: false
    },
    {
      id: '3',
      name: '鈴木一郎',
      company: 'スズキ製造',
      email: 'suzuki@example.com',
      score: 45,
      status: 'cold',
      lastActivity: new Date(Date.now() - 86400000),
      activities: {
        pageViews: 3,
        downloads: 0,
        chatInteractions: 0,
        emailOpens: 2
      },
      interests: ['業務効率化'],
      readyToBuy: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hot': return 'from-red-500 to-orange-500';
      case 'warm': return 'from-yellow-500 to-orange-500';
      case 'cold': return 'from-blue-500 to-cyan-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-red-600 bg-red-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-blue-600 bg-blue-100';
  };

  const formatLastActivity = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000 / 60);
    if (diff < 60) return `${diff}分前`;
    if (diff < 1440) return `${Math.floor(diff / 60)}時間前`;
    return `${Math.floor(diff / 1440)}日前`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-600" />
            AIリード評価システム
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            見込み客の購買確率をリアルタイム分析
          </p>
        </div>
      </div>

      {/* Score Distribution */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-red-50 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-red-600">
            {leads.filter(l => l.status === 'hot').length}
          </div>
          <div className="text-sm text-gray-700 mt-1">ホットリード</div>
          <div className="text-xs text-gray-600">今すぐ対応必要</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-yellow-600">
            {leads.filter(l => l.status === 'warm').length}
          </div>
          <div className="text-sm text-gray-700 mt-1">ウォームリード</div>
          <div className="text-xs text-gray-600">育成中</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-blue-600">
            {leads.filter(l => l.status === 'cold').length}
          </div>
          <div className="text-sm text-gray-700 mt-1">コールドリード</div>
          <div className="text-xs text-gray-600">長期フォロー</div>
        </div>
      </div>

      {/* Lead List */}
      <div className="space-y-4">
        {leads.map((lead, index) => (
          <motion.div
            key={lead.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border rounded-lg p-4 hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 bg-gradient-to-r ${getStatusColor(lead.status)} rounded-full flex items-center justify-center text-white font-bold`}>
                  {lead.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    {lead.name}
                    {lead.readyToBuy && (
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        購買準備完了
                      </span>
                    )}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                    <span className="flex items-center gap-1">
                      <Building className="w-3 h-3" />
                      {lead.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {lead.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    {lead.interests.map((interest, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-lg font-bold ${getScoreColor(lead.score)}`}>
                  <TrendingUp className="w-5 h-5" />
                  {lead.score}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  最終活動: {formatLastActivity(lead.lastActivity)}
                </div>
              </div>
            </div>

            {/* Activity Metrics */}
            <div className="grid grid-cols-4 gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">{lead.activities.pageViews}</div>
                <div className="text-xs text-gray-600">ページ閲覧</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">{lead.activities.downloads}</div>
                <div className="text-xs text-gray-600">資料DL</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">{lead.activities.chatInteractions}</div>
                <div className="text-xs text-gray-600">チャット</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">{lead.activities.emailOpens}</div>
                <div className="text-xs text-gray-600">メール開封</div>
              </div>
            </div>

            {/* AI Recommendation */}
            <div className="mt-3 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-purple-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">AI推奨アクション</p>
                  <p className="text-xs text-gray-700 mt-1">
                    {lead.status === 'hot' && '今すぐ電話連絡を推奨。デモの提案が効果的です。'}
                    {lead.status === 'warm' && '製品資料の送付とフォローアップメールを推奨。'}
                    {lead.status === 'cold' && '定期的なニュースレター配信で関係性を維持。'}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 mt-3">
              <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-1">
                <Phone className="w-4 h-4" />
                電話する
              </button>
              <button className="flex-1 px-3 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-1">
                <Mail className="w-4 h-4" />
                メール送信
              </button>
              <button className="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                詳細
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* AI Insights */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-2">AIインサイト</h3>
        <ul className="space-y-1 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-purple-600">•</span>
            ホットリードの平均コンバージョン率は78%です
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-600">•</span>
            火曜日の午後2-4時が最も応答率が高い時間帯です
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-600">•</span>
            クラウドERP関連のリードが先週比35%増加中
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeadScoring;