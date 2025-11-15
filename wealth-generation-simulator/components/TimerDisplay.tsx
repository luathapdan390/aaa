
import React from 'react';

interface TimerDisplayProps {
  timeLeft: number;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ timeLeft }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="my-8 text-center">
      <p className="text-gray-400 text-sm uppercase tracking-widest">Thời gian còn lại</p>
      <div className="text-7xl md:text-9xl font-black text-teal-300 tracking-tighter">
        <span>{String(minutes).padStart(2, '0')}</span>
        <span className="animate-pulse">:</span>
        <span>{String(seconds).padStart(2, '0')}</span>
      </div>
    </div>
  );
};

export default TimerDisplay;
