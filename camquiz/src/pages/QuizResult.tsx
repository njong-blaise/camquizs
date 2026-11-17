import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp, Clock, Check, X, RotateCcw, Home, AlertCircle } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

interface QuizResultState {
  score: number;
  percentage: number;
  correctAnswers: number;
  totalQuestions: number;
  timeTaken: number;
  questions: Array<{
    id: string;
    question_text: string;
    option_a: string;
    option_b: string;
    option_c: string;
    option_d: string;
    correct_answer: 'A' | 'B' | 'C' | 'D';
    explanation: string;
    userAnswer?: 'A' | 'B' | 'C' | 'D';
    isCorrect: boolean;
  }>;
}

export default function QuizResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as QuizResultState;

  // Fallback if no state provided
  const result = state || {
    score: 0,
    percentage: 0,
    correctAnswers: 0,
    totalQuestions: 0,
    timeTaken: 0,
    questions: [],
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 90) return 'Excellent!';
    if (percentage >= 70) return 'Great job!';
    if (percentage >= 50) return 'Good effort!';
    return 'Keep practicing!';
  };

  return (
    <Navigation>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Result Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Results</h1>
          <p className="text-gray-600">Here's how you performed</p>
        </motion.div>

        {/* Score Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-center">
            <div className="mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="inline-flex items-center justify-center bg-white/20 p-6 rounded-full mb-4"
              >
                <Trophy className="w-12 h-12" />
              </motion.div>
              <h2 className="text-4xl font-bold mb-2">{getScoreMessage(result.percentage)}</h2>
              <p className="text-blue-100">You scored {result.correctAnswers} out of {result.totalQuestions}</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-3xl font-bold">{result.percentage}%</p>
                <p className="text-sm text-blue-100">Score</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-3xl font-bold">{result.correctAnswers}</p>
                <p className="text-sm text-blue-100">Correct</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-3xl font-bold">{result.totalQuestions - result.correctAnswers}</p>
                <p className="text-sm text-blue-100">Wrong</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{Math.floor(result.timeTaken / 60)}m {result.timeTaken % 60}s</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>{result.totalQuestions} questions</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-4"
        >
          <Button
            onClick={() => navigate('/quiz/random')}
            variant="primary"
            className="flex-1"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Try Again
          </Button>
          <Button
            onClick={() => navigate('/dashboard')}
            variant="secondary"
            className="flex-1"
          >
            <Home className="w-5 h-5 mr-2" />
            Dashboard
          </Button>
        </motion.div>

        {/* Question Review */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <h3 className="font-bold text-gray-900 mb-4">Question Review</h3>
            
            <div className="space-y-4">
              {result.questions.map((question, index) => (
                <div
                  key={question.id}
                  className={`p-4 rounded-xl border-2 ${
                    question.isCorrect
                      ? 'bg-green-50 border-green-200'
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-500">Q{index + 1}</span>
                      <Badge
                        variant={question.isCorrect ? 'success' : 'danger'}
                        size="sm"
                      >
                        {question.isCorrect ? 'Correct' : 'Wrong'}
                      </Badge>
                    </div>
                    {question.isCorrect ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <X className="w-5 h-5 text-red-500" />
                    )}
                  </div>

                  <p className="font-medium text-gray-900 mb-3">{question.question_text}</p>

                  <div className="space-y-2 mb-3">
                    {[
                      { key: 'A', text: question.option_a },
                      { key: 'B', text: question.option_b },
                      { key: 'C', text: question.option_c },
                      { key: 'D', text: question.option_d },
                    ].map((option) => {
                      const isUserAnswer = question.userAnswer === option.key;
                      const isCorrectAnswer = question.correct_answer === option.key;
                      
                      let bgColor = 'bg-white';
                      if (isCorrectAnswer) {
                        bgColor = 'bg-green-100 border-green-500';
                      } else if (isUserAnswer && !isCorrectAnswer) {
                        bgColor = 'bg-red-100 border-red-500';
                      }

                      return (
                        <div
                          key={option.key}
                          className={`p-2 rounded-lg border ${bgColor} text-sm`}
                        >
                          <span className="font-semibold mr-2">{option.key}.</span>
                          {option.text}
                          {isCorrectAnswer && <span className="ml-2 text-green-600">(Correct)</span>}
                          {isUserAnswer && !isCorrectAnswer && <span className="ml-2 text-red-600">(Your answer)</span>}
                        </div>
                      );
                    })}
                  </div>

                  {!question.isCorrect && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-blue-900 text-sm mb-1">Explanation</p>
                          <p className="text-sm text-blue-800">{question.explanation}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </Navigation>
  );
}
