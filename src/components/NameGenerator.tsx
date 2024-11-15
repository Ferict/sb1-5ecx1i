import React, { useState } from 'react';
import { ScrollText, BookOpen, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import { calculateBazi } from '../utils/bazi';
import { generateNames } from '../utils/openai';
import { generateNamesWithQianwen } from '../utils/qianwen';
import BaziAnalysis from './BaziAnalysis';

interface NameResult {
  name: string;
  meaning: string;
  source: string;
}

const NameGenerator: React.FC = () => {
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [gender, setGender] = useState('');
  const [style, setStyle] = useState('诗经');
  const [aiModel, setAiModel] = useState('gpt');
  const [results, setResults] = useState<NameResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [baziResult, setBaziResult] = useState(null);
  const [error, setError] = useState('');

  const generateName = async () => {
    try {
      setLoading(true);
      setError('');

      // 计算生辰八字
      const date = new Date(birthDate);
      const hour = parseInt(birthTime.split(':')[0], 10);
      const bazi = calculateBazi(date, hour);
      setBaziResult(bazi);

      // 生成名字
      let names;
      if (aiModel === 'gpt') {
        names = await generateNames(bazi, gender, style);
      } else {
        const baziInfo = `生辰八字：
年柱：${bazi.year}（${bazi.yearElement}）
月柱：${bazi.month}（${bazi.monthElement}）
日柱：${bazi.day}（${bazi.dayElement}）
时柱：${bazi.hour}（${bazi.hourElement}）

命理分析建议：${bazi.luck.join('；')}`;
        names = await generateNamesWithQianwen(baziInfo, gender, style);
      }
      setResults(names);
    } catch (err) {
      setError(err.message || '生成名字时出现错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 gap-8"
      >
        <div className="chinese-pattern rounded-lg p-6 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-2">
            个人信息
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                出生日期
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 bg-white/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                出生时辰
              </label>
              <input
                type="time"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 bg-white/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                性别
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 bg-white/50"
              >
                <option value="">请选择</option>
                <option value="男">男</option>
                <option value="女">女</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                起名风格
              </label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 bg-white/50"
              >
                <option value="诗经">诗经</option>
                <option value="道德经">道德经</option>
                <option value="唐诗">唐诗</option>
                <option value="宋词">宋词</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                AI模型
              </label>
              <select
                value={aiModel}
                onChange={(e) => setAiModel(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 bg-white/50"
              >
                <option value="gpt">GPT-4</option>
                <option value="qianwen">通义千问</option>
              </select>
            </div>

            <button
              onClick={generateName}
              disabled={loading || !birthDate || !birthTime || !gender}
              className="w-full bg-red-700 text-white py-3 px-4 rounded-md hover:bg-red-800 disabled:bg-gray-400 transition duration-200 font-medium"
            >
              {loading ? '正在分析八字生成名字...' : '开始起名'}
            </button>

            {error && (
              <div className="text-red-500 text-sm mt-2">
                {error}
              </div>
            )}
          </div>
        </div>

        {baziResult && <BaziAnalysis bazi={baziResult} />}

        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="scroll-bg rounded-lg p-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-2">
              推荐名字
            </h2>
            
            <div className="space-y-6">
              {results.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition duration-200 bg-white/50"
                >
                  <h3 className="text-3xl font-bold text-red-700 mb-3">
                    {result.name}
                  </h3>
                  <p className="text-gray-700 mb-3 text-lg">{result.meaning}</p>
                  <p className="text-sm text-gray-600 italic">{result.source}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="chinese-pattern rounded-lg p-6 text-center"
          >
            <BookOpen className="w-8 h-8 mx-auto mb-4 text-red-700" />
            <h3 className="text-lg font-semibold mb-2">传统文化传承</h3>
            <p className="text-gray-600">融合诗经、道德经等传统文化精髓</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="chinese-pattern rounded-lg p-6 text-center"
          >
            <Compass className="w-8 h-8 mx-auto mb-4 text-red-700" />
            <h3 className="text-lg font-semibold mb-2">八字五行分析</h3>
            <p className="text-gray-600">根据生辰八字，选择最适合的名字</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="chinese-pattern rounded-lg p-6 text-center"
          >
            <ScrollText className="w-8 h-8 mx-auto mb-4 text-red-700" />
            <h3 className="text-lg font-semibold mb-2">双AI智能推荐</h3>
            <p className="text-gray-600">GPT-4与通义千问双引擎，提供更全面的起名建议</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default NameGenerator;