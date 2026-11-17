import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Trophy, Target, Zap, ArrowRight, LogIn } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function Welcome() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'GCE Focused',
      description: 'Questions tailored specifically for Cameroon GCE ICT examinations',
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: 'Track Progress',
      description: 'Monitor your improvement with detailed analytics and statistics',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Learn Fast',
      description: 'Interactive quizzes with instant feedback and explanations',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="p-6"
      >
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-xl">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            CamQuiz
          </span>
        </div>
      </motion.header>

      {/* Hero Section */}
      <div className="px-6 pt-8 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Master Your
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
              GCE ICT Exams
            </span>
          </h1>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Prepare for your Cameroon GCE ICT examinations with interactive quizzes, 
            progress tracking, and gamified learning.
          </p>
        </motion.div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <Card className="text-center h-full">
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-600">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-4 max-w-sm mx-auto"
        >
          <Button
            onClick={() => navigate('/register')}
            fullWidth
            size="lg"
            className="group"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button
            onClick={() => navigate('/login')}
            variant="secondary"
            fullWidth
            size="lg"
          >
            <LogIn className="w-5 h-5 mr-2" />
            I Already Have an Account
          </Button>
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center text-sm text-gray-500"
        >
          <p>Join thousands of students preparing for GCE success</p>
        </motion.div>
      </div>
    </div>
  );
}
