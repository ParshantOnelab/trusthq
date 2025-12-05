
import React, { useEffect, useState } from 'react';

interface ScoreGaugeProps {
  score: number;
}

const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score }) => {
  const [displayedScore, setDisplayedScore] = useState(score);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);
  
  // Detect initial render
  useEffect(() => {
    setIsInitialRender(false);
    
    // Initial animation
    setIsAnimating(true);
    const animateScore = (start: number, end: number, duration: number) => {
      const startTime = performance.now();
      
      const updateScore = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Ease-out function for smoother ending
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        
        const currentScore = Math.round(start + (end - start) * easedProgress);
        setDisplayedScore(currentScore);
        
        if (progress < 1) {
          requestAnimationFrame(updateScore);
        } else {
          setDisplayedScore(end);
          setTimeout(() => setIsAnimating(false), 500);
        }
      };
      
      requestAnimationFrame(updateScore);
    };
    
    animateScore(0, score, 2000);
  }, []);
  
  // Detect score changes and animate
  useEffect(() => {
    if (!isInitialRender && score !== displayedScore) {
      setIsAnimating(true);
      
      // Animate score change
      const duration = 1500; // 1.5 seconds
      const startTime = performance.now();
      const startScore = displayedScore;
      
      const animateScore = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Ease-out function for smoother ending
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        
        const currentScore = Math.round(startScore + (score - startScore) * easedProgress);
        setDisplayedScore(currentScore);
        
        if (progress < 1) {
          requestAnimationFrame(animateScore);
        } else {
          setDisplayedScore(score);
          
          // Keep glow effect for a moment after animation completes
          setTimeout(() => {
            setIsAnimating(false);
          }, 500);
        }
      };
      
      requestAnimationFrame(animateScore);
    }
  }, [score, isInitialRender]);

  // Calculate the score color
  const getScoreColor = () => {
    if (displayedScore >= 70) return '#10b981'; // Green
    if (displayedScore >= 40) return '#f59e0b'; // Yellow/Orange
    return '#ef4444'; // Red
  };

  const scoreColor = getScoreColor();
  
  // Calculate the circumference and stroke-dasharray for the full circle
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (displayedScore / 100) * circumference;

  // Get label based on score
  const getScoreLabel = () => {
    if (displayedScore >= 70) return 'Trusted';
    if (displayedScore >= 40) return 'Caution';
    return 'Risky';
  };

  return (
    <div className={`relative ${isAnimating ? 'animate-pulse' : ''}`}>
      {/* Add decorative elements behind the gauge */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <div className="h-32 w-32 rounded-full border-8 border-dashed border-gray-300 animate-spin" style={{ animationDuration: '30s' }} />
      </div>
      
      <svg className="w-48 h-48" viewBox="0 0 120 120">
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          
          {/* Enhanced glow filter */}
          <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feFlood floodColor={scoreColor} floodOpacity="0.6" />
            <feComposite in2="blur" operator="in" />
            <feComposite in="SourceGraphic" />
          </filter>
          
          {/* Add subtle inner shadow */}
          <filter id="innerShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
            <feOffset dx="0" dy="1" in="blur" result="offsetBlur" />
            <feComposite in="SourceGraphic" in2="offsetBlur" operator="over" />
          </filter>
        </defs>
        
        {/* Background track with pattern */}
        <circle 
          cx="60" 
          cy="60" 
          r={radius + 2} 
          fill="none" 
          stroke="#f1f5f9" 
          strokeWidth="1" 
          strokeDasharray="1,3"
          className="opacity-50 dark:opacity-20"
        />
        
        {/* Background circle */}
        <circle 
          cx="60" 
          cy="60" 
          r={radius} 
          fill="none" 
          stroke="#e2e8f0" 
          strokeWidth="8" 
          className="dark:stroke-gray-700"
          filter="url(#innerShadow)"
        />
        
        {/* Progress circle with gradient or solid color */}
        <circle 
          cx="60" 
          cy="60" 
          r={radius} 
          fill="none" 
          stroke={isAnimating ? "url(#scoreGradient)" : scoreColor}
          strokeWidth="10" 
          strokeLinecap="round" 
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 60 60)"
          filter={isAnimating ? "url(#glow)" : undefined}
          className="transition-all duration-1000 ease-out"
          style={{ filter: isAnimating ? "url(#glow)" : "drop-shadow(0 1px 2px rgba(0,0,0,0.1))" }}
        />
        
        {/* Center fill circle - making this transparent */}
        <circle 
          cx="60" 
          cy="60" 
          r="36" 
          fill="transparent" 
          className="dark:fill-gray-800/50"
          filter="url(#innerShadow)"
        />
        
        {/* Score value text */}
        <text 
          x="60" 
          y="54" 
          textAnchor="middle" 
          dominantBaseline="middle"
          fontSize="24" 
          fontWeight="bold" 
          fill={scoreColor}
          className="select-none">
          {displayedScore}
        </text>
        
        {/* Score label */}
        <text 
          x="60" 
          y="74" 
          textAnchor="middle" 
          fontSize="12" 
          fontWeight="medium"
          fill={scoreColor}
          className="select-none">
          {getScoreLabel()}
        </text>
      </svg>
    </div>
  );
};

export default ScoreGauge;
