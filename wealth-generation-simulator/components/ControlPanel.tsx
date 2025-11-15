
import React from 'react';

interface ControlPanelProps {
  isActive: boolean;
  isFinished: boolean;
  years: number;
  setYears: (years: number) => void;
  dailyRate: number;
  setDailyRate: (rate: number) => void;
  onStartPause: () => void;
  onReset: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  isActive,
  isFinished,
  years,
  setYears,
  dailyRate,
  setDailyRate,
  onStartPause,
  onReset,
}) => {
  return (
    <div className="w-full max-w-lg mt-4 flex flex-col items-center gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        <div>
          <label htmlFor="years" className="block text-sm font-medium text-gray-300 mb-1">
            Số năm tính lãi kép
          </label>
          <input
            type="number"
            id="years"
            value={years}
            onChange={(e) => setYears(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full bg-gray-900 border border-gray-700 rounded-md p-2 text-center text-white focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none"
            disabled={isActive}
          />
        </div>
        <div>
          <label htmlFor="dailyRate" className="block text-sm font-medium text-gray-300 mb-1">
            Lãi suất mỗi ngày (%)
          </label>
          <input
            type="number"
            id="dailyRate"
            value={dailyRate}
            onChange={(e) => setDailyRate(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full bg-gray-900 border border-gray-700 rounded-md p-2 text-center text-white focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none"
            disabled={isActive}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onStartPause}
          disabled={isFinished}
          className={`px-8 py-3 font-bold rounded-lg text-lg transition-all duration-300 ease-in-out flex items-center gap-2
            ${isActive 
              ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900' 
              : 'bg-teal-500 hover:bg-teal-600 text-white'}
            disabled:bg-gray-600 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg`}
        >
          {isActive ? <i className="ph-fill ph-pause"></i> : <i className="ph-fill ph-play"></i>}
          {isActive ? 'Tạm dừng' : 'Bắt đầu'}
        </button>
        <button
          onClick={onReset}
          className="px-6 py-3 font-semibold bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-300 ease-in-out flex items-center gap-2 transform hover:scale-105"
        >
          <i className="ph-fill ph-arrow-counter-clockwise"></i>
          <span>Cài lại</span>
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
