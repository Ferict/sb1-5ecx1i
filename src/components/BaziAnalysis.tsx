import React from 'react';
import { motion } from 'framer-motion';
import type { BaziResult } from '../utils/bazi';

interface BaziAnalysisProps {
  bazi: BaziResult;
}

const BaziAnalysis: React.FC<BaziAnalysisProps> = ({ bazi }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="scroll-bg rounded-lg p-6 mb-6"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
        生辰八字分析
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <div className="text-sm text-gray-600">年柱</div>
          <div className="text-lg font-bold text-indigo-700">{bazi.year}</div>
          <div className="text-sm text-gray-500">{bazi.yearElement}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-600">月柱</div>
          <div className="text-lg font-bold text-indigo-700">{bazi.month}</div>
          <div className="text-sm text-gray-500">{bazi.monthElement}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-600">日柱</div>
          <div className="text-lg font-bold text-indigo-700">{bazi.day}</div>
          <div className="text-sm text-gray-500">{bazi.dayElement}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-600">时柱</div>
          <div className="text-lg font-bold text-indigo-700">{bazi.hour}</div>
          <div className="text-sm text-gray-500">{bazi.hourElement}</div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-700 mb-2">五行分析建议：</h4>
        <ul className="list-disc list-inside space-y-1">
          {bazi.luck.map((analysis, index) => (
            <li key={index} className="text-gray-600">{analysis}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default BaziAnalysis;