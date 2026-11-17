import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Flame, 
  Trophy, 
  Target, 
  Clock, 
  BookOpen,
  Play,
  LayoutGrid,
  ArrowRight,
  Star
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Progress from '@/components/ui/Progress';

export default function Dashboard() {
  const navigate = useNavigate();
  const { profile } = useAuth();

  // Mock data - will be replaced with actual API calls
  const stats = {
    totalQuizzes: profile?.total_points || 0,
    averageScore: 75,
    streak: profile?.daily_streak || 0,
    xp: profile?.xp || 0,
    level: profile?.level || 1,
  };

  const recentQuizzes = [
    { id: 1, topic: 'Computer Fundamentals', score: 85, date: '2 hours ago' },
    { id: 2, topic: 'Microsoft Office', score: 92, date: 'Yesterday' },
    { id: 3, topic: 'Networking', score: 78, date: '2 days ago' },
  ];

  const dailyChallenge = {
    topic: 'Computer Security',
    questions: 10,
    timeLimit: 300, // 5 minutes
    xpReward: 50,
  };

  return (
    <Navigation>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {profile?.full_name?.split(' ')[0] || 'Student'}! 👋
            </h1>
            <p className="text-gray-600">Ready to continue your GCE ICT preparation?</p>
          </div>
          <div className="flex items-center gap-3">
            {stats.streak > 0 && (
              <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-full">
                <Flame className="w-5 h-5 text-orange-500" />
                <span className="font-semibold text-orange-600">{stats.streak} day streak</span>
              </div>
            )}
            <Badge variant="primary" size="lg">
              Level {stats.level}
            </Badge>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Quizzes', value: stats.totalQuizzes, icon: BookOpen, color: 'blue' },
            { label: 'Average Score', value: `${stats.averageScore}%`, icon: Target, color: 'green' },
            { label: 'Current Streak', value: `${stats.streak} days`, icon: Flame, color: 'orange' },
            { label: 'Total XP', value: stats.xp, icon: Trophy, color: 'purple' },
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

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Daily Challenge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white h-full">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Daily Challenge</h2>
                  <p className="text-blue-100">Complete today's challenge to earn bonus XP!</p>
                </div>
                <div className="bg-white/20 p-3 rounded-xl">
                  <Star className="w-6 h-6" />
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5" />
                  <span className="font-medium">{dailyChallenge.topic}</span>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <LayoutGrid className="w-4 h-4" />
                    <span>{dailyChallenge.questions} questions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{Math.floor(dailyChallenge.timeLimit / 60)} minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4" />
                    <span>+{dailyChallenge.xpReward} XP</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => navigate('/quiz/random')}
                variant="secondary"
                size="lg"
                fullWidth
                className="group"
              >
                Start Challenge
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="h-full">
              <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button
                  onClick={() => navigate('/quiz/random')}
                  variant="primary"
                  fullWidth
                  className="group"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Random Quiz
                </Button>
                <Button
                  onClick={() => navigate('/topics')}
                  variant="secondary"
                  fullWidth
                >
                  <LayoutGrid className="w-5 h-5 mr-2" />
                  Browse Topics
                </Button>
                <Button
                  onClick={() => navigate('/leaderboard')}
                  variant="ghost"
                  fullWidth
                >
                  <Trophy className="w-5 h-5 mr-2" />
                  Leaderboard
                </Button>
              </div>

              {/* Level Progress */}
              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Level Progress</span>
                  <span className="text-sm text-gray-500">Level {stats.level}</span>
                </div>
                <Progress value={stats.xp % 100} max={100} color="blue" showLabel={false} />
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Recent Quizzes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Recent Quizzes</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/history')}
              >
                View All
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            <div className="space-y-3">
              {recentQuizzes.map((quiz, _index) => (
                <div
                  key={quiz.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${
                      quiz.score >= 90 ? 'bg-green-100' : 
                      quiz.score >= 70 ? 'bg-blue-100' : 'bg-yellow-100'
                    }`}>
                      <BookOpen className={`w-5 h-5 ${
                        quiz.score >= 90 ? 'text-green-600' : 
                        quiz.score >= 70 ? 'text-blue-600' : 'text-yellow-600'
                      }`} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{quiz.topic}</p>
                      <p className="text-sm text-gray-500">{quiz.date}</p>
                    </div>
                  </div>
                  <Badge 
                    variant={quiz.score >= 90 ? 'success' : quiz.score >= 70 ? 'primary' : 'warning'}
                  >
                    {quiz.score}%
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </Navigation>
  );
}
