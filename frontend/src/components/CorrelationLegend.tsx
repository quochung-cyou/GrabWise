import React from 'react';

const CorrelationLegend = () => {
  return (
    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex items-center space-x-6 bg-white/95 p-4 rounded-lg shadow-lg backdrop-blur-sm border border-gray-200">
      <div className="flex items-center">
        <div className="w-4 h-4 bg-[#2c5282] mr-2 rounded"></div>
        <span className="text-xs font-medium">Strong Negative</span>
      </div>
      <div className="flex items-center">
        <div className="w-4 h-4 bg-[#4a7ab7] mr-2 rounded"></div>
        <span className="text-xs font-medium">Moderate Negative</span>
      </div>
      <div className="flex items-center">
        <div className="w-4 h-4 bg-[#b3d1f1] mr-2 rounded"></div>
        <span className="text-xs font-medium">Weak Negative</span>
      </div>
      <div className="flex items-center">
        <div className="w-4 h-4 bg-[#f4a9a9] mr-2 rounded"></div>
        <span className="text-xs font-medium">Weak Positive</span>
      </div>
      <div className="flex items-center">
        <div className="w-4 h-4 bg-[#e05252] mr-2 rounded"></div>
        <span className="text-xs font-medium">Moderate Positive</span>
      </div>
      <div className="flex items-center">
        <div className="w-4 h-4 bg-[#9b2c2c] mr-2 rounded"></div>
        <span className="text-xs font-medium">Strong Positive</span>
      </div>
    </div>
  );
};

export default CorrelationLegend;