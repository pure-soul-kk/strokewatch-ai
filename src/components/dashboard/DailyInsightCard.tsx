'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { DAILY_HEALTH_INSIGHTS } from '@/data/news-research';

export const DailyInsightCard: React.FC = () => {
  const [index, setIndex] = useState(0);
  const insight = DAILY_HEALTH_INSIGHTS[index];

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % DAILY_HEALTH_INSIGHTS.length);
  };

  return (
    <div className="glass-panel rounded-2xl p-5 border border-slate-200 flex flex-col justify-between">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-sky-600" />
          <h3 className="text-sm font-bold text-slate-900 heading-rounded tracking-tight">
            Daily Verified Health Insight
          </h3>
        </div>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
          {insight.category.toUpperCase()}
        </span>
      </div>

      <div className="my-4">
        <h4 className="text-base font-bold text-slate-900 heading-rounded mb-1.5">
          {insight.title}
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed font-sans">
          "{insight.fact}"
        </p>
      </div>

      <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
          <span className="truncate max-w-[200px]">{insight.source}</span>
        </div>

        <button
          onClick={handleNext}
          className="flex items-center gap-1 text-xs text-sky-600 hover:text-sky-700 font-semibold transition-colors"
        >
          <span>Next Fact</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
