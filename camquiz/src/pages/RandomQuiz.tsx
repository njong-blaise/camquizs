import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ChevronLeft, ChevronRight, Check, X, AlertCircle } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Progress from '@/components/ui/Progress';
import { useTimer } from '@/hooks';

// Mock questions - will be replaced with Supabase data
const MOCK_QUESTIONS = [
  {
    id: '1',
    topic_id: '1',
    difficulty: 'easy',
    question_text: 'What is the brain of the computer?',
    option_a: 'CPU',
    option_b: 'Monitor',
    option_c: 'Keyboard',
    option_d: 'Printer',
    correct_answer: 'A',
    explanation: 'The CPU (Central Processing Unit) is considered the brain of the computer as it processes all instructions.',
  },
  {
    id: '2',
    topic_id: '1',
    difficulty: 'easy',
    question_text: 'Which of the following is an input device?',
    option_a: 'Monitor',
    option_b: 'Printer',
    option_c: 'Keyboard',
    option_d: 'Speaker',
    correct_answer: 'C',
    explanation: 'Keyboard is an input device used to enter data into the computer.',
  },
  {
    id: '3',
    topic_id: '1',
    difficulty: 'medium',
    question_text: 'What does RAM stand for?',
    option_a: 'Read Access Memory',
    option_b: 'Random Access Memory',
    option_c: 'Run Access Memory',
    option_d: 'Random Application Memory',
    correct_answer: 'B',
    explanation: 'RAM stands for Random Access Memory, which is volatile memory used for temporary data storage.',
  },
  {
    id: '4',
    topic_id: '1',
    difficulty: 'medium',
    question_text: 'Which storage device is non-volatile?',
    option_a: 'RAM',
    option_b: 'Cache',
    option_c: 'Hard Disk',
    option_d: 'Registers',
    correct_answer: 'C',
    explanation: 'Hard Disk is non-volatile storage, meaning it retains data even when power is turned off.',
  },
  {
    id: '5',
    topic_id: '1',
    difficulty: 'hard',
    question_text: 'What is the function of the ALU in CPU?',
    option_a: 'Store data',
    option_b: 'Perform arithmetic and logical operations',
    option_c: 'Control data flow',
    option_d: 'Manage memory',
    correct_answer: 'B',
    explanation: 'ALU (Arithmetic Logic Unit) performs all arithmetic and logical operations in the CPU.',
  },
];

const TIME_PER_QUESTION = 30; // seconds

export default function RandomQuiz() {
  const navigate = useNavigate();
  
  const [questions] = useState(MOCK_QUESTIONS);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [answers, setAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const totalTime = questions.length * TIME_PER_QUESTION;
  
  const { seconds, start, pause, reset } = useTimer(TIME_PER_QUESTION, () => {
    handleNextQuestion();
  });

  useEffect(() => {
    start();
    return () => pause();
  }, [currentQuestionIndex]);

  const shuffleAnswers = (question: typeof currentQuestion) => {
    const options = [
      { key: 'A', text: question.option_a },
      { key: 'B', text: question.option_b },
      { key: 'C', text: question.option_c },
      { key: 'D', text: question.option_d },
    ];
    return options.sort(() => Math.random() - 0.5);
  };

  const handleAnswerSelect = (answer: 'A' | 'B' | 'C' | 'D') => {
    if (showExplanation) return;
    
    setSelectedAnswer(answer);
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: answer }));
    setShowExplanation(true);
    pause();
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      reset();
      start();
    } else {
      handleSubmitQuiz();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedAnswer(answers[questions[currentQuestionIndex - 1].id] || null);
      setShowExplanation(!!answers[questions[currentQuestionIndex - 1].id]);
      pause();
    }
  };

  const handleSubmitQuiz = async () => {
    setIsSubmitting(true);
    
    // Calculate score
    let correctCount = 0;
    questions.forEach(question => {
      if (answers[question.id] === question.correct_answer) {
        correctCount++;
      }
    });
    
    const score = correctCount;
    const percentage = Math.round((correctCount / questions.length) * 100);
    
    // Mock submission - replace with actual Supabase call
    setTimeout(() => {
      navigate('/quiz-result/mock-attempt-id', {
        state: {
          score,
          percentage,
          correctAnswers: correctCount,
          totalQuestions: questions.length,
          timeTaken: totalTime,
          questions: questions.map(q => ({
            ...q,
            userAnswer: answers[q.id],
            isCorrect: answers[q.id] === q.correct_answer,
          })),
        },
      });
    }, 1000);
  };

  const shuffledAnswers = shuffleAnswers(currentQuestion);
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  if (isSubmitting) {
    return (
      <Navigation>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Submitting your quiz...</p>
          </div>
        </div>
      </Navigation>
    );
  }

  return (
    <Navigation>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Quiz Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Quiz</h1>
              <p className="text-gray-600">Question {currentQuestionIndex + 1} of {questions.length}</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant={seconds < 10 ? 'danger' : 'primary'} size="lg">
                <Clock className="w-4 h-4 mr-1" />
                {seconds}s
              </Badge>
            </div>
          </div>
          
          <Progress value={progress} max={100} color="blue" showLabel={false} />
        </motion.div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <Badge variant={currentQuestion.difficulty === 'easy' ? 'success' : currentQuestion.difficulty === 'medium' ? 'warning' : 'danger'}>
                    {currentQuestion.difficulty}
                  </Badge>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {currentQuestion.question_text}
                </h2>
              </div>

              {/* Answer Options */}
              <div className="space-y-3 mb-6">
                {shuffledAnswers.map((option) => {
                  const isSelected = selectedAnswer === option.key;
                  const isCorrect = option.key === currentQuestion.correct_answer;
                  const showResult = showExplanation;
                  
                  let bgColor = 'bg-white border-gray-200 hover:border-blue-300';
                  if (showResult) {
                    if (isCorrect) {
                      bgColor = 'bg-green-50 border-green-500';
                    } else if (isSelected && !isCorrect) {
                      bgColor = 'bg-red-50 border-red-500';
                    }
                  } else if (isSelected) {
                    bgColor = 'bg-blue-50 border-blue-500';
                  }

                  return (
                    <button
                      key={option.key}
                      onClick={() => handleAnswerSelect(option.key as 'A' | 'B' | 'C' | 'D')}
                      disabled={showExplanation}
                      className={`w-full p-4 text-left border-2 rounded-xl transition-all ${bgColor} ${
                        !showExplanation && 'hover:shadow-md'
                      } ${showExplanation ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                            showResult && isCorrect ? 'bg-green-500 text-white' :
                            showResult && isSelected && !isCorrect ? 'bg-red-500 text-white' :
                            isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {option.key}
                          </span>
                          <span className="font-medium text-gray-900">{option.text}</span>
                        </div>
                        {showResult && isCorrect && <Check className="w-5 h-5 text-green-500" />}
                        {showResult && isSelected && !isCorrect && <X className="w-5 h-5 text-red-500" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6"
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-blue-900 mb-1">Explanation</p>
                      <p className="text-sm text-blue-800">{currentQuestion.explanation}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>

                {showExplanation ? (
                  <Button onClick={handleNextQuestion}>
                    {currentQuestionIndex === questions.length - 1 ? 'Submit Quiz' : 'Next Question'}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    onClick={() => handleAnswerSelect(selectedAnswer || 'A')}
                    disabled={!selectedAnswer}
                  >
                    Submit Answer
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </Navigation>
  );
}
