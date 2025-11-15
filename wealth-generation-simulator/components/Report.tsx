
import React from 'react';
import type { CalculationResult } from '../types';

interface ReportProps {
  results: CalculationResult[];
  onReset: () => void;
  onDownload: () => void;
}

const Report = React.forwardRef<HTMLDivElement, ReportProps>(({ results, onReset, onDownload }, ref) => {
    const reportDate = new Intl.DateTimeFormat('vi-VN', {
        dateStyle: 'full',
        timeStyle: 'long',
        timeZone: 'Asia/Ho_Chi_Minh'
    }).format(new Date());

    return (
    <div className="flex flex-col items-center animate-fade-in">
        <div ref={ref} className="bg-gray-900 p-8 rounded-lg w-full max-w-2xl">
            <header className="text-center mb-6 border-b-2 border-teal-400 pb-4">
                <h2 className="text-3xl font-bold text-teal-300">BÁO CÁO TÀI SẢN KIẾN TẠO</h2>
                <p className="text-gray-400 text-sm mt-1">{reportDate}</p>
            </header>
            <div className="text-center mb-6">
                <p className="text-lg text-gray-200">
                    <span className="font-bold">Chủ tịch Lê Trường</span> đã hoàn thành phiên làm việc và kiến tạo thành công:
                </p>
            </div>
            <div className="space-y-3">
                {results.map((result) => (
                    <div key={result.categoryName} className="bg-gray-800 p-3 rounded-md flex justify-between items-baseline">
                        <span className="text-gray-300 font-semibold">{result.categoryName}:</span>
                        <span className="font-mono text-teal-300 text-lg font-bold text-right break-all">
                            {result.amount} <span className="text-xs text-gray-500">VND</span>
                        </span>
                    </div>
                ))}
            </div>
        </div>
        <div className="mt-8 flex items-center gap-4">
            <button
                onClick={onDownload}
                className="px-8 py-3 font-bold rounded-lg text-lg transition-all duration-300 ease-in-out flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105 shadow-lg"
            >
                <i className="ph-fill ph-download-simple"></i>
                Tải Báo Cáo
            </button>
            <button
                onClick={onReset}
                className="px-6 py-3 font-semibold bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-300 ease-in-out flex items-center gap-2 transform hover:scale-105"
            >
                <i className="ph-fill ph-arrow-counter-clockwise"></i>
                Bắt đầu lại
            </button>
        </div>
    </div>
    );
});

Report.displayName = 'Report';

export default Report;
