import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function SplashScreen() {
  const navigate = useNavigate();
  const { loading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!loading) {
      // Navigate based on authentication state
      const timer = setTimeout(() => {
        if (isAuthenticated) {
          navigate('/dashboard');
        } else {
          navigate('/welcome');
        }
      }, 2000); // 2 second splash screen

      return () => clearTimeout(timer);
    }
  }, [loading, isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="mb-6"
        >
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-blue-200 rounded-full blur-xl opacity-50"
            />
            <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl shadow-2xl">
              <BookOpen className="w-16 h-16 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2"
        >
          CamQuiz
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-gray-600 text-lg mb-8"
        >
          Master Your GCE ICT Exams
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="flex items-center justify-center gap-2 text-gray-500"
        >
          <GraduationCap className="w-5 h-5" />
          <span className="text-sm">Loading...</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
