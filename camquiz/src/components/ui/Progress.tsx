import { motion } from 'framer-motion';

interface ProgressProps {
  value: number;
  max?: number;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const Progress = ({
  value,
  max = 100,
  color = 'blue',
  size = 'md',
  showLabel = false,
  className = '',
}: ProgressProps) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const colors = {
    blue: 'from-blue-400 to-blue-600',
    green: 'from-green-400 to-green-600',
    red: 'from-red-400 to-red-600',
    yellow: 'from-yellow-400 to-yellow-600',
    purple: 'from-purple-400 to-purple-600',
  };
  
  const sizes = {
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6',
  };
  
  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between mb-2 text-sm font-medium text-gray-600">
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizes[size]}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`h-full bg-gradient-to-r ${colors[color]} rounded-full`}
        />
      </div>
    </div>
  );
};

export default Progress;
