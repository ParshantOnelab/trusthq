
import React, { useEffect, useState } from 'react';
import ScoreGauge from '@/components/ScoreGauge';
import ScoreBadge from './ScoreBadge';

interface ScoreSummaryProps {
  score: number;
  updatedScore: { oldScore: number, newScore: number } | null;
}

const ScoreSummary: React.FC<ScoreSummaryProps> = ({ score, updatedScore }) => {
  // Add animation when score changes
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    if (updatedScore) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [updatedScore]);

  return (
    <div className="flex flex-col items-center">
      <div className={`transition-all duration-700 relative ${isAnimating ? 'scale-110' : 'scale-100'}`}>
        {/* Add subtle glow effect behind gauge */}
        <div 
          className="absolute inset-0 blur-xl rounded-full opacity-20"
          style={{ 
            background: `radial-gradient(circle, ${score >= 70 ? '#10b981' : score >= 40 ? '#f59e0b' : '#ef4444'} 0%, transparent 70%)`,
            transform: 'scale(1.2)',
            zIndex: -1
          }}
        />
        <ScoreGauge score={score} />
      </div>
      
      <div className="mt-4 text-center">
        <ScoreBadge score={score} />
      </div>
    </div>
  );
};

export default ScoreSummary;
