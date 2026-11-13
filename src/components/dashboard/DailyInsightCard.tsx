'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Bookmark, Share2 } from 'lucide-react';
import { DAILY_HEALTH_INSIGHTS } from '@/data/news-research';

export const DailyInsightCard: React.FC = () => {
  const [index, setIndex] = useState(0);
  const insight = DAILY_HEALTH_INSIGHTS[index];

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % DAILY_HEALTH_INSIGHTS.length);
  };

  return (
    <div className="glass-panel rounded-2xl p-5 border border-blue-500/20 relative overflow-hidden flex flex-col justify-between">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-bold text-white tracking-wide">
            DAILY VERIFIED HEALTH INSIGHT
          </h3>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-500/30">
          {insight.category.toUpperCase()}
        </span>
      </div>

      <div className="my-4">
        <h4 className="text-base font-bold text-cyan-300 mb-2">
          {insight.title}
        </h4>
        <p className="text-xs text-slate-300 leading-relaxed font-sans">
          "{insight.fact}"
        </p>
      </div>

      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
          <span className="truncate max-w-[180px]">{insight.source}</span>
        </div>

        <button
          onClick={handleNext}
          className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
        >
          <span>Next Fact</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
