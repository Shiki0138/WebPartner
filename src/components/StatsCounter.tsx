import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import CountUp from 'react-countup';

interface StatItem {
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  duration: number;
}

const StatsCounter: React.FC = () => {
  const [startCounting, setStartCounting] = useState(false);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  
  useEffect(() => {
    if (isInView) {
      setStartCounting(true);
    }
  }, [isInView]);
  
  const stats: StatItem[] = [
    {
      label: '本日のAI応対件数',
      value: 12345,
      suffix: '件',
      duration: 2.5
    },
    {
      label: '自動生成コンテンツ',
      value: 3456,
      suffix: '記事',
      duration: 2.8
    },
    {
      label: '削減人件費',
      value: 234,
      prefix: '月額',
      suffix: '万円相当',
      duration: 3
    },
    {
      label: '平均レスポンス時間',
      value: 0.8,
      suffix: '秒',
      duration: 2
    }
  ];
  
  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          className="text-center"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
              {startCounting && (
                <>
                  {stat.prefix && <span className="text-2xl">{stat.prefix}</span>}
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={stat.duration}
                    decimals={stat.value < 10 ? 1 : 0}
                    separator=","
                  />
                  <span className="text-2xl">{stat.suffix}</span>
                </>
              )}
            </div>
            <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
            
            {/* Live indicator */}
            <div className="flex items-center justify-center mt-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-500">リアルタイム更新</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCounter;