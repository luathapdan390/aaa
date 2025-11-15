
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { INITIAL_TIME_IN_SECONDS, VND_PER_MINUTE, CATEGORIES } from './constants';
import type { CalculationResult } from './types';
import TimerDisplay from './components/TimerDisplay';
import CurrentTimeDisplay from './components/CurrentTimeDisplay';
import ControlPanel from './components/ControlPanel';
import Report from './components/Report';

const App: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME_IN_SECONDS);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [years, setYears] = useState(10);
  const [dailyRate, setDailyRate] = useState(1); // Storing as percentage, e.g., 1 for 1%
  const [results, setResults] = useState<CalculationResult[]>([]);
  const reportRef = useRef<HTMLDivElement>(null);

  const calculateWealth = useCallback(() => {
    const timeWorkedInSeconds = INITIAL_TIME_IN_SECONDS - timeLeft;
    const minutesWorked = Math.floor(timeWorkedInSeconds / 60);

    if (minutesWorked <= 0) {
      const newResults = CATEGORIES.map(cat => ({
        categoryName: cat.name,
        amount: '0',
      }));
      setResults(newResults);
      return;
    }

    const P = BigInt(minutesWorked * VND_PER_MINUTE);
    const n = years * 365;
    
    // Using scaled integers for compound interest with BigInt to avoid floating point issues.
    // Formula: A = P * (1 + r)^n => A = P * ((100 + dailyRate) / 100)^n
    // We calculate: (P * (100 + dailyRate)^n) / (100^n)
    
    // Ensure dailyRate is a positive integer for BigInt operations
    const safeDailyRate = Math.max(0, Math.floor(dailyRate));
    
    const base = BigInt(100 + safeDailyRate); // e.g., 101 for 1%
    const divisor = BigInt(100);

    try {
      const numerator = P * (base ** BigInt(n));
      const denominator = divisor ** BigInt(n);
      
      const finalAmount = numerator / denominator;
      const formattedAmount = formatBigInt(finalAmount);

      const newResults = CATEGORIES.map(cat => ({
        categoryName: cat.name,
        amount: formattedAmount,
      }));
      setResults(newResults);
    } catch (error) {
        console.error("Error during calculation, likely due to extremely large numbers:", error);
        const errorMessage = "Số quá lớn để hiển thị";
        const newResults = CATEGORIES.map(cat => ({
            categoryName: cat.name,
            amount: errorMessage,
        }));
        setResults(newResults);
    }
  }, [years, dailyRate, timeLeft]);

  useEffect(() => {
    // FIX: Replaced `NodeJS.Timeout` with `ReturnType<typeof setInterval>` for browser compatibility.
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setIsFinished(true);
      calculateWealth();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, calculateWealth]);

  const formatBigInt = (value: bigint): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleStartPause = () => {
    if (isFinished) return;

    if (isActive) {
      // User is pausing the timer. Stop, finish, and calculate.
      setIsActive(false);
      setIsFinished(true);
      calculateWealth();
    } else {
      // User is starting or resuming the timer.
      setIsActive(true);
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setIsFinished(false);
    setTimeLeft(INITIAL_TIME_IN_SECONDS);
    setResults([]);
  };

  const handleDownloadImage = useCallback(async () => {
    if (reportRef.current === null) {
      return;
    }
    try {
      // @ts-ignore htmlToImage is loaded from CDN
      const dataUrl = await htmlToImage.toPng(reportRef.current, { 
        quality: 1, 
        pixelRatio: 2,
        backgroundColor: '#111827' 
      });
      const link = document.createElement('a');
      link.download = `bao-cao-tai-san-chu-tich-le-truong.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to generate report image', err);
    }
  }, []);

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen flex flex-col items-center justify-center p-4 selection:bg-teal-400 selection:text-gray-900">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-blue-500">
            Trình mô phỏng Kiến tạo Quy mô lớn
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            "The Large-Scale App Generator App Generator"
          </p>
        </header>

        <main className="bg-gray-800/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-2xl border border-gray-700/50">
          {!isFinished ? (
            <div className="flex flex-col items-center">
                <CurrentTimeDisplay />
                <TimerDisplay timeLeft={timeLeft} />
                <ControlPanel
                    isActive={isActive}
                    isFinished={isFinished}
                    years={years}
                    setYears={setYears}
                    dailyRate={dailyRate}
                    setDailyRate={setDailyRate}
                    onStartPause={handleStartPause}
                    onReset={handleReset}
                />
            </div>
          ) : (
            <Report
                ref={reportRef}
                results={results}
                onReset={handleReset}
                onDownload={handleDownloadImage}
            />
          )}
        </main>
        <footer className="text-center mt-8 text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Lê Trường Corporation. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
