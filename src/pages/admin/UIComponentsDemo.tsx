import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Users, BarChart3, FileText, Settings, 
  Download, Upload, Edit, Trash2, Eye, Mail, Phone
} from 'lucide-react';
import {
  // Cards
  Card, MetricCard, ActionCard, InfoCard,
  // Buttons
  Button, IconButton, ButtonGroup, ToggleButton,
  // Forms
  Input, TextArea, Select, Checkbox, Radio, FormGroup, FormSection,
  // Tables
  Table, TableAction, Pagination,
  // Charts
  LineChart, BarChart, PieChart, Sparkline, ProgressBar,
  // Navigation
  Tabs, Breadcrumb, SideNavigation, Steps,
  // Modals
  Modal, ConfirmModal, AlertModal, Drawer,
  // Alerts
  Alert, Toast, Notification, Banner,
  // Badges
  Badge, StatusBadge, CountBadge, Label, Tag,
  // Loading
  Spinner, DotsLoader, ProgressLoader, Skeleton, LoadingOverlay, LoadingCard, LoadingTable
} from '../../components/ui';

const UIComponentsDemo: React.FC = () => {
  // State for interactive components
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    category: '',
    subscribe: false,
    plan: 'basic'
  });

  // Sample data
  const metricsData = [
    { label: '1月', value: 45 },
    { label: '2月', value: 52 },
    { label: '3月', value: 61 },
    { label: '4月', value: 73 },
    { label: '5月', value: 89 },
    { label: '6月', value: 105 }
  ];

  const pieData = [
    { label: '営業', value: 35, color: '#3B82F6' },
    { label: 'マーケティング', value: 25, color: '#8B5CF6' },
    { label: 'サポート', value: 20, color: '#10B981' },
    { label: '開発', value: 20, color: '#F59E0B' }
  ];

  const tableData = [
    { id: 1, name: '山田太郎', email: 'yamada@example.com', role: '管理者', status: 'active' },
    { id: 2, name: '佐藤花子', email: 'sato@example.com', role: 'ユーザー', status: 'active' },
    { id: 3, name: '鈴木一郎', email: 'suzuki@example.com', role: 'ユーザー', status: 'inactive' },
    { id: 4, name: '田中美香', email: 'tanaka@example.com', role: '編集者', status: 'active' },
    { id: 5, name: '高橋健', email: 'takahashi@example.com', role: 'ユーザー', status: 'pending' }
  ];

  const tabItems = [
    { key: 'overview', label: '概要', icon: BarChart3, badge: 'New' },
    { key: 'users', label: 'ユーザー', icon: Users, badge: 24 },
    { key: 'settings', label: '設定', icon: Settings }
  ];

  const navigationItems = [
    { label: 'ダッシュボード', href: '/admin', icon: BarChart3, badge: '3' },
    { label: 'ユーザー管理', href: '/admin/users', icon: Users },
    { label: 'コンテンツ', href: '/admin/content', icon: FileText },
    { label: '設定', href: '/admin/settings', icon: Settings }
  ];

  const steps = [
    { title: '基本情報', description: 'アカウント情報を入力' },
    { title: 'プラン選択', description: '利用プランを選択' },
    { title: '確認', description: '入力内容を確認' },
    { title: '完了', description: '登録完了' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">UIコンポーネントデモ</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Banner */}
        <div className="mb-8">
          <Banner
            variant="info"
            action={{ label: '詳細を見る', onClick: () => {} }}
            dismissible
          >
            新しいUIコンポーネントライブラリが利用可能になりました！
          </Banner>
        </div>

        {/* Navigation Demo */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6">ナビゲーション</h2>
          
          {/* Breadcrumb */}
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: 'ホーム', href: '/' },
                { label: '管理画面', href: '/admin' },
                { label: 'UIコンポーネント' }
              ]}
            />
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <Tabs
              items={tabItems}
              activeKey={activeTab}
              onChange={setActiveTab}
              variant="default"
            />
            <div className="mt-4 p-4 bg-white rounded-lg">
              <p>選択中のタブ: {activeTab}</p>
            </div>
          </div>

          {/* Steps */}
          <Card className="mb-6">
            <h3 className="text-lg font-medium mb-4">ステップナビゲーション</h3>
            <Steps
              items={steps}
              current={currentStep}
              direction="horizontal"
            />
            <div className="mt-6 flex justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
              >
                前へ
              </Button>
              <Button
                onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                disabled={currentStep === steps.length - 1}
              >
                次へ
              </Button>
            </div>
          </Card>
        </section>

        {/* Cards Demo */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6">カード</h2>
          
          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <MetricCard
              icon={Users}
              label="総ユーザー数"
              value="1,234"
              change={12}
              trend="up"
              color="from-blue-500 to-blue-600"
            />
            <MetricCard
              icon={BarChart3}
              label="売上高"
              value="¥2.4M"
              change={8}
              trend="down"
              color="from-purple-500 to-purple-600"
            />
            <MetricCard
              icon={FileText}
              label="コンテンツ数"
              value="456"
              change={23}
              trend="up"
              color="from-green-500 to-green-600"
            />
            <MetricCard
              icon={Eye}
              label="ページビュー"
              value="89.3K"
              change={0}
              trend="neutral"
              color="from-orange-500 to-orange-600"
            />
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <ActionCard
              icon={Download}
              title="レポートダウンロード"
              description="最新の分析レポートをダウンロードできます"
              badge="New"
              onClick={() => {}}
            />
            <ActionCard
              icon={Upload}
              title="データインポート"
              description="CSVファイルからデータをインポート"
              onClick={() => {}}
            />
          </div>
        </section>

        {/* Forms Demo */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6">フォーム</h2>
          
          <Card>
            <FormSection
              title="お問い合わせフォーム"
              description="以下の情報を入力してください"
            >
              <FormGroup>
                <Input
                  label="お名前"
                  placeholder="山田太郎"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <Input
                  label="メールアドレス"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  icon={Mail}
                  required
                />
                <Select
                  label="カテゴリー"
                  options={[
                    { value: 'sales', label: '営業' },
                    { value: 'support', label: 'サポート' },
                    { value: 'other', label: 'その他' }
                  ]}
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
                <TextArea
                  label="メッセージ"
                  placeholder="お問い合わせ内容を入力してください"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
                <div className="space-y-2">
                  <Label>プラン選択</Label>
                  <div className="space-y-2">
                    <Radio
                      label="ベーシックプラン"
                      name="plan"
                      value="basic"
                      checked={formData.plan === 'basic'}
                      onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                    />
                    <Radio
                      label="プロプラン"
                      name="plan"
                      value="pro"
                      checked={formData.plan === 'pro'}
                      onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                    />
                  </div>
                </div>
                <Checkbox
                  label="ニュースレターを受け取る"
                  checked={formData.subscribe}
                  onChange={(e) => setFormData({ ...formData, subscribe: e.target.checked })}
                />
                <div className="flex gap-3">
                  <Button>送信</Button>
                  <Button variant="outline">キャンセル</Button>
                </div>
              </FormGroup>
            </FormSection>
          </Card>
        </section>

        {/* Tables Demo */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6">テーブル</h2>
          
          <div className="space-y-4">
            <Table
              columns={[
                { key: 'name', header: '名前', sortable: true },
                { key: 'email', header: 'メールアドレス' },
                { key: 'role', header: '役割' },
                {
                  key: 'status',
                  header: 'ステータス',
                  render: (value) => (
                    <Badge
                      variant={value === 'active' ? 'success' : value === 'inactive' ? 'danger' : 'warning'}
                    >
                      {value === 'active' ? 'アクティブ' : value === 'inactive' ? '非アクティブ' : '保留中'}
                    </Badge>
                  )
                }
              ]}
              data={tableData}
              selectable
              selectedRows={selectedRows}
              onSelectRow={(index) => {
                setSelectedRows(prev =>
                  prev.includes(index)
                    ? prev.filter(i => i !== index)
                    : [...prev, index]
                );
              }}
              onSelectAll={() => {
                setSelectedRows(
                  selectedRows.length === tableData.length
                    ? []
                    : tableData.map((_, index) => index)
                );
              }}
              actions={(item) => (
                <div className="flex gap-2">
                  <TableAction icon={Eye} label="表示" onClick={() => {}} />
                  <TableAction icon={Edit} label="編集" onClick={() => {}} />
                  <TableAction icon={Trash2} label="削除" onClick={() => {}} variant="danger" />
                </div>
              )}
            />
            
            <Pagination
              currentPage={currentPage}
              totalPages={10}
              onPageChange={setCurrentPage}
              itemsPerPage={10}
              totalItems={100}
            />
          </div>
        </section>

        {/* Charts Demo */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6">チャート</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-lg font-medium mb-4">売上推移</h3>
              <LineChart data={metricsData} height={200} />
            </Card>
            
            <Card>
              <h3 className="text-lg font-medium mb-4">部門別売上</h3>
              <div className="flex justify-center">
                <PieChart data={pieData} size={200} donut />
              </div>
            </Card>
            
            <Card>
              <h3 className="text-lg font-medium mb-4">月別実績</h3>
              <BarChart data={metricsData} height={200} showValues />
            </Card>
            
            <Card>
              <h3 className="text-lg font-medium mb-4">進捗状況</h3>
              <div className="space-y-4">
                <ProgressBar value={75} label="タスク完了率" />
                <ProgressBar value={45} max={100} label="売上目標達成率" color="from-green-500 to-green-600" />
                <ProgressBar value={90} label="顧客満足度" color="from-purple-500 to-purple-600" />
              </div>
            </Card>
          </div>
        </section>

        {/* Buttons Demo */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6">ボタン</h2>
          
          <Card>
            <div className="space-y-6">
              {/* Regular Buttons */}
              <div className="space-y-2">
                <h3 className="text-md font-medium">通常ボタン</h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary">プライマリー</Button>
                  <Button variant="secondary">セカンダリー</Button>
                  <Button variant="outline">アウトライン</Button>
                  <Button variant="ghost">ゴースト</Button>
                  <Button variant="danger">危険</Button>
                </div>
              </div>
              
              {/* Sizes */}
              <div className="space-y-2">
                <h3 className="text-md font-medium">サイズ</h3>
                <div className="flex items-center gap-3">
                  <Button size="sm">小</Button>
                  <Button size="md">中</Button>
                  <Button size="lg">大</Button>
                </div>
              </div>
              
              {/* With Icons */}
              <div className="space-y-2">
                <h3 className="text-md font-medium">アイコン付き</h3>
                <div className="flex flex-wrap gap-3">
                  <Button icon={Download}>ダウンロード</Button>
                  <Button icon={Upload} iconPosition="right">アップロード</Button>
                  <Button loading>処理中</Button>
                </div>
              </div>
              
              {/* Toggle Button */}
              <div className="space-y-2">
                <h3 className="text-md font-medium">トグルボタン</h3>
                <ToggleButton
                  options={[
                    { value: 'day', label: '日' },
                    { value: 'week', label: '週' },
                    { value: 'month', label: '月' },
                    { value: 'year', label: '年' }
                  ]}
                  value={selectedPeriod}
                  onChange={setSelectedPeriod}
                />
              </div>
            </div>
          </Card>
        </section>

        {/* Modals Demo */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6">モーダル・ドロワー</h2>
          
          <Card>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => setIsModalOpen(true)}>モーダルを開く</Button>
              <Button onClick={() => setIsConfirmModalOpen(true)} variant="danger">確認モーダル</Button>
              <Button onClick={() => setIsDrawerOpen(true)} variant="outline">ドロワーを開く</Button>
            </div>
          </Card>
          
          {/* Regular Modal */}
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="サンプルモーダル"
            footer={
              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  キャンセル
                </Button>
                <Button onClick={() => setIsModalOpen(false)}>
                  保存
                </Button>
              </div>
            }
          >
            <p className="text-gray-600">
              これはモーダルウィンドウのサンプルです。フォームやコンテンツを表示できます。
            </p>
          </Modal>
          
          {/* Confirm Modal */}
          <ConfirmModal
            isOpen={isConfirmModalOpen}
            onClose={() => setIsConfirmModalOpen(false)}
            onConfirm={() => {
              console.log('Confirmed!');
              setIsConfirmModalOpen(false);
            }}
            title="削除の確認"
            message="本当にこのアイテムを削除しますか？この操作は取り消せません。"
            variant="danger"
          />
          
          {/* Drawer */}
          <Drawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            title="設定"
            position="right"
          >
            <div className="space-y-4">
              <p className="text-gray-600">ドロワーコンテンツのサンプルです。</p>
              <FormGroup>
                <Input label="設定1" placeholder="値を入力" />
                <Input label="設定2" placeholder="値を入力" />
              </FormGroup>
            </div>
          </Drawer>
        </section>

        {/* Alerts Demo */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6">アラート・通知</h2>
          
          <Card>
            <div className="space-y-4">
              <Alert variant="info" title="情報">
                これは情報メッセージです。
              </Alert>
              <Alert variant="success" title="成功" dismissible>
                操作が正常に完了しました。
              </Alert>
              <Alert variant="warning" title="警告">
                注意が必要な状況です。
              </Alert>
              <Alert variant="error" title="エラー">
                エラーが発生しました。
              </Alert>
            </div>
          </Card>
        </section>

        {/* Badges Demo */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6">バッジ・タグ</h2>
          
          <Card>
            <div className="space-y-6">
              {/* Badges */}
              <div className="space-y-2">
                <h3 className="text-md font-medium">バッジ</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge>デフォルト</Badge>
                  <Badge variant="primary">プライマリー</Badge>
                  <Badge variant="secondary">セカンダリー</Badge>
                  <Badge variant="success">成功</Badge>
                  <Badge variant="warning">警告</Badge>
                  <Badge variant="danger">危険</Badge>
                  <Badge variant="info">情報</Badge>
                </div>
              </div>
              
              {/* Status Badges */}
              <div className="space-y-2">
                <h3 className="text-md font-medium">ステータスバッジ</h3>
                <div className="flex flex-wrap gap-4">
                  <StatusBadge status="online" />
                  <StatusBadge status="offline" />
                  <StatusBadge status="busy" />
                  <StatusBadge status="away" />
                </div>
              </div>
              
              {/* Count Badges */}
              <div className="space-y-2">
                <h3 className="text-md font-medium">カウントバッジ</h3>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Button variant="outline">通知</Button>
                    <div className="absolute -top-2 -right-2">
                      <CountBadge count={5} />
                    </div>
                  </div>
                  <div className="relative">
                    <Button variant="outline">メッセージ</Button>
                    <div className="absolute -top-2 -right-2">
                      <CountBadge count={123} variant="danger" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Tags */}
              <div className="space-y-2">
                <h3 className="text-md font-medium">タグ</h3>
                <div className="flex flex-wrap gap-2">
                  <Tag>React</Tag>
                  <Tag onRemove={() => {}}>TypeScript</Tag>
                  <Tag color="bg-blue-100 text-blue-700">Tailwind CSS</Tag>
                  <Tag color="bg-purple-100 text-purple-700" onRemove={() => {}}>Framer Motion</Tag>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Loading Demo */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6">ローディング</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-lg font-medium mb-4">スピナー</h3>
              <div className="flex items-center gap-4">
                <Spinner size="sm" />
                <Spinner size="md" />
                <Spinner size="lg" />
                <Spinner size="xl" />
              </div>
            </Card>
            
            <Card>
              <h3 className="text-lg font-medium mb-4">ドットローダー</h3>
              <div className="flex items-center gap-4">
                <DotsLoader size="sm" />
                <DotsLoader size="md" />
                <DotsLoader size="lg" />
              </div>
            </Card>
            
            <Card>
              <h3 className="text-lg font-medium mb-4">スケルトン</h3>
              <div className="space-y-3">
                <Skeleton height={20} width="60%" />
                <Skeleton height={16} />
                <Skeleton height={16} width="80%" />
                <div className="flex gap-4 items-center">
                  <Skeleton variant="circular" width={48} height={48} />
                  <div className="flex-1 space-y-2">
                    <Skeleton height={16} width="50%" />
                    <Skeleton height={14} />
                  </div>
                </div>
              </div>
            </Card>
            
            <Card>
              <h3 className="text-lg font-medium mb-4">プログレスローダー</h3>
              <ProgressLoader progress={65} />
            </Card>
          </div>
          
          <div className="mt-6">
            <LoadingCard rows={3} showAvatar showActions />
          </div>
        </section>
      </div>
    </div>
  );
};

export default UIComponentsDemo;