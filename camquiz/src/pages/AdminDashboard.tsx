import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  TrendingUp,
  Award,
  ShieldAlert
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Input from '@/components/ui/Input';
import { useAuth } from '@/contexts/AuthContext';

type TabType = 'overview' | 'questions' | 'topics' | 'users';

// Mock data - will be replaced with Supabase data
const MOCK_STATS = {
  totalUsers: 1250,
  totalQuestions: 450,
  totalQuizzes: 8900,
  avgScore: 72,
};

const MOCK_QUESTIONS = [
  { id: '1', question_text: 'What is the brain of the computer?', topic: 'Computer Fundamentals', difficulty: 'easy' },
  { id: '2', question_text: 'Which of the following is an input device?', topic: 'Computer Fundamentals', difficulty: 'easy' },
  { id: '3', question_text: 'What does RAM stand for?', topic: 'Computer Fundamentals', difficulty: 'medium' },
];

const MOCK_TOPICS = [
  { id: '1', name: 'Computer Fundamentals', question_count: 45 },
  { id: '2', name: 'Computer Hardware', question_count: 32 },
  { id: '3', name: 'Software', question_count: 28 },
];

const MOCK_USERS = [
  { id: '1', name: 'John Doe', email: 'john@example.com', level: 5, xp: 2500 },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', level: 3, xp: 1200 },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', level: 7, xp: 3800 },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { isAdmin, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Redirect non-admin users
  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate('/dashboard');
    }
  }, [isAdmin, loading, navigate]);

  // Show loading state
  if (loading) {
    return (
      <Navigation>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Navigation>
    );
  }

  // Show access denied if not admin
  if (!isAdmin) {
    return (
      <Navigation>
        <div className="flex items-center justify-center min-h-[50vh]">
          <Card className="text-center max-w-md">
            <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
            <p className="text-gray-600 mb-4">You don't have permission to access the admin dashboard.</p>
            <Button onClick={() => navigate('/dashboard')}>Return to Dashboard</Button>
          </Card>
        </div>
      </Navigation>
    );
  }

  const tabs = [
    { id: 'overview' as TabType, label: 'Overview', icon: LayoutDashboard },
    { id: 'questions' as TabType, label: 'Questions', icon: BookOpen },
    { id: 'topics' as TabType, label: 'Topics', icon: Settings },
    { id: 'users' as TabType, label: 'Users', icon: Users },
  ];

  return (
    <Navigation>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your CamQuiz application</p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 overflow-x-auto pb-2"
        >
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'primary' : 'secondary'}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2"
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </Button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <OverviewTab stats={MOCK_STATS} />
            </motion.div>
          )}

          {activeTab === 'questions' && (
            <motion.div
              key="questions"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <QuestionsTab questions={MOCK_QUESTIONS} />
            </motion.div>
          )}

          {activeTab === 'topics' && (
            <motion.div
              key="topics"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <TopicsTab topics={MOCK_TOPICS} />
            </motion.div>
          )}

          {activeTab === 'users' && (
            <motion.div
              key="users"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <UsersTab users={MOCK_USERS} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Navigation>
  );
}

// Overview Tab Component
function OverviewTab({ stats }: { stats: typeof MOCK_STATS }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'blue' },
          { label: 'Total Questions', value: stats.totalQuestions, icon: BookOpen, color: 'green' },
          { label: 'Total Quizzes', value: stats.totalQuizzes, icon: TrendingUp, color: 'purple' },
          { label: 'Avg Score', value: `${stats.avgScore}%`, icon: Award, color: 'orange' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="text-center">
              <div className={`inline-flex items-center justify-center bg-${stat.color}-100 p-3 rounded-xl mb-3`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card>
        <h3 className="font-bold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { action: 'New user registered', user: 'John Doe', time: '2 hours ago' },
            { action: 'Quiz completed', user: 'Jane Smith', time: '1 hour ago' },
            { action: 'Question added', user: 'Admin', time: '30 minutes ago' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-500">by {activity.user}</p>
              </div>
              <span className="text-sm text-gray-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// Questions Tab Component
function QuestionsTab({ questions }: { questions: typeof MOCK_QUESTIONS }) {
  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-gray-900">Manage Questions</h3>
        <Button variant="primary" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Question
        </Button>
      </div>

      <div className="mb-4">
        <Input
          placeholder="Search questions..."
          icon={<Search className="w-5 h-5" />}
        />
      </div>

      <div className="space-y-3">
        {questions.map((question) => (
          <div
            key={question.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex-1">
              <p className="font-medium text-gray-900 mb-1">{question.question_text}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>{question.topic}</span>
                <span>•</span>
                <Badge
                  variant={question.difficulty === 'easy' ? 'success' : question.difficulty === 'medium' ? 'warning' : 'danger'}
                  size="sm"
                >
                  {question.difficulty}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Edit className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// Topics Tab Component
function TopicsTab({ topics }: { topics: typeof MOCK_TOPICS }) {
  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-gray-900">Manage Topics</h3>
        <Button variant="primary" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Topic
        </Button>
      </div>

      <div className="space-y-3">
        {topics.map((topic) => (
          <div
            key={topic.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{topic.name}</p>
                <p className="text-sm text-gray-500">{topic.question_count} questions</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Edit className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// Users Tab Component
function UsersTab({ users }: { users: typeof MOCK_USERS }) {
  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-gray-900">Manage Users</h3>
        <div className="flex gap-2">
          <Input
            placeholder="Search users..."
            icon={<Search className="w-5 h-5" />}
            className="w-64"
          />
        </div>
      </div>

      <div className="space-y-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold">
                {user.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-medium text-gray-900">Level {user.level}</p>
                <p className="text-sm text-gray-500">{user.xp} XP</p>
              </div>
              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
