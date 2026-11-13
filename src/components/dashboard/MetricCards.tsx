'use client';

import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  HeartPulse, 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  Calendar, 
  Info,
  Clock,
  AlertCircle
} from 'lucide-react';
import { GLOBAL_METRICS } from '@/data/global-stroke-stats';
import { StatisticMetric } from '@/types';

export const MetricCards: React.FC = () => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedProgress(1), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {GLOBAL_METRICS.map((metric: StatisticMetric, idx: number) => {
        return (
          <div
            key={metric.id}
            className="group glass-panel rounded-2xl p-5 border border-slate-800/80 hover:border-cyan-500/40 relative overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-0.5"
          >
            {/* Top Row: Metric Category Label & Estimate Tag */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  {metric.label}
                </span>

                <span
                  className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-full border font-semibold ${
                    metric.isEstimate
                      ? 'bg-blue-950/70 text-cyan-300 border-cyan-500/30'
                      : 'bg-emerald-950/70 text-emerald-300 border-emerald-500/30'
                  }`}
                >
                  {metric.isEstimate ? 'Modelled Estimate' : 'Verified Registry'}
                </span>
              </div>

              {/* Big Animated Statistic Value */}
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl lg:text-4xl font-extrabold font-mono tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  {metric.formattedValue}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {metric.unit}
                </span>
              </div>

              {/* Confidence Interval if applicable */}
              {metric.confidenceInterval && (
                <div className="text-[11px] font-mono text-cyan-400/80 mt-1">
                  95% UI: [{metric.confidenceInterval[0]}M – {metric.confidenceInterval[1]}M]
                </div>
              )}

              {/* Narrative description */}
              <p className="text-xs text-slate-300 mt-2.5 leading-relaxed font-sans line-clamp-2">
                {metric.description}
              </p>
            </div>

            {/* Bottom Metadata: Reporting Period, Source, Last Updated */}
            <div className="mt-5 pt-3 border-t border-slate-800/80 space-y-1.5 text-[10px]">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-slate-400">Reporting Period:</span>
                <span className="font-mono text-slate-300 text-right truncate max-w-[200px]">
                  {metric.reportingPeriod}
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-400">
                <span className="text-slate-400">Data Source:</span>
                <span className="text-cyan-400 text-right truncate max-w-[200px]" title={metric.source}>
                  {metric.source}
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-400">
                <span className="text-slate-400">Last Audit:</span>
                <span className="text-slate-400 text-right">
                  {metric.lastUpdated}
                </span>
              </div>
            </div>

            {/* Accent hover glow */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-all pointer-events-none" />
          </div>
        );
      })}
    </div>
  );
};
