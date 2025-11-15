
import React, { useState, useEffect } from 'react';

const CurrentTimeDisplay: React.FC = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour12: false,
      };
      const formattedTime = new Intl.DateTimeFormat('vi-VN', options).format(new Date());
      setCurrentTime(formattedTime.replace(',', ' -'));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full flex justify-center items-center gap-2 text-gray-400 bg-gray-900/50 px-4 py-2 rounded-full border border-gray-700/50">
      <i className="ph-fill ph-clock text-teal-400"></i>
      <span className="font-mono text-sm">{currentTime || 'Loading...'} (GMT+7)</span>
    </div>
  );
};

export default CurrentTimeDisplay;
