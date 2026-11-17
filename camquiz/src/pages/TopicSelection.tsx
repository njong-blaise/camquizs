import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, BookOpen, ArrowRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Input from '@/components/ui/Input';

// Mock topics data - will be replaced with Supabase data
const TOPICS = [
  {
    id: '1',
    name: 'Computer Fundamentals',
    description: 'Basic computer concepts, hardware, and software fundamentals',
    icon: '💻',
    color: 'blue',
    question_count: 45,
    difficulty: 'easy',
  },
  {
    id: '2',
    name: 'Computer Hardware',
    description: 'CPU, memory, storage, input/output devices',
    icon: '🔧',
    color: 'purple',
    question_count: 32,
    difficulty: 'medium',
  },
  {
    id: '3',
    name: 'Software',
    description: 'System software, application software, operating systems',
    icon: '📦',
    color: 'green',
    question_count: 28,
    difficulty: 'easy',
  },
  {
    id: '4',
    name: 'Operating Systems',
    description: 'Windows, Linux, macOS, file management',
    icon: '🪟',
    color: 'orange',
    question_count: 35,
    difficulty: 'medium',
  },
  {
    id: '5',
    name: 'Microsoft Office',
    description: 'Word, Excel, PowerPoint, Access',
    icon: '📊',
    color: 'blue',
    question_count: 50,
    difficulty: 'easy',
  },
  {
    id: '6',
    name: 'Networking',
    description: 'LAN, WAN, internet, protocols, security',
    icon: '🌐',
    color: 'indigo',
    question_count: 40,
    difficulty: 'hard',
  },
  {
    id: '7',
    name: 'Internet',
    description: 'WWW, email, web browsers, search engines',
    icon: '🔍',
    color: 'cyan',
    question_count: 38,
    difficulty: 'easy',
  },
  {
    id: '8',
    name: 'Programming',
    description: 'Algorithms, flowcharts, basic programming concepts',
    icon: '⌨️',
    color: 'pink',
    question_count: 42,
    difficulty: 'hard',
  },
  {
    id: '9',
    name: 'Database',
    description: 'DBMS, SQL, data models, normalization',
    icon: '🗄️',
    color: 'emerald',
    question_count: 30,
    difficulty: 'medium',
  },
  {
    id: '10',
    name: 'Computer Security',
    description: 'Viruses, malware, encryption, best practices',
    icon: '🔒',
    color: 'red',
    question_count: 25,
    difficulty: 'medium',
  },
];

export default function TopicSelection() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');

  const filteredTopics = TOPICS.filter((topic) => {
    const matchesSearch = topic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         topic.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'all' || topic.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const handleStartQuiz = (topicId: string) => {
    navigate(`/quiz/${topicId}`);
  };

  return (
    <Navigation>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Topics</h1>
          <p className="text-gray-600">Choose a topic to test your knowledge</p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4"
        >
          <div className="flex-1">
            <Input
              placeholder="Search topics..."
              icon={<Search className="w-5 h-5" />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'easy', 'medium', 'hard'] as const).map((difficulty) => (
              <Button
                key={difficulty}
                variant={selectedDifficulty === difficulty ? 'primary' : 'secondary'}
                size="md"
                onClick={() => setSelectedDifficulty(difficulty)}
              >
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Topics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTopics.map((topic, index) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 + 0.2 }}
            >
              <Card 
                hover
                onClick={() => handleStartQuiz(topic.id)}
                className="h-full"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{topic.icon}</div>
                  <Badge variant={topic.difficulty === 'easy' ? 'success' : topic.difficulty === 'medium' ? 'warning' : 'danger'}>
                    {topic.difficulty}
                  </Badge>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{topic.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{topic.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <BookOpen className="w-4 h-4" />
                    <span>{topic.question_count} questions</span>
                  </div>
                  <div className="flex items-center gap-1 text-blue-600">
                    <span className="text-sm font-medium">Start</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredTopics.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No topics found</h3>
            <p className="text-gray-600">Try adjusting your search or filter</p>
          </motion.div>
        )}
      </div>
    </Navigation>
  );
}
