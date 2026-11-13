'use client';

import React from 'react';
import { GLOBAL_METRICS } from '@/data/global-stroke-stats';
import { StatisticMetric } from '@/types';

export const MetricCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {GLOBAL_METRICS.map((metric: StatisticMetric) => {
        return (
          <div
            key={metric.id}
            className="glass-panel rounded-2xl p-5 border border-slate-200 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5"
          >
            {/* Top Row: Metric Category Label & Estimate Tag */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  {metric.label}
                </span>

                <span
                  className={`text-[9px] uppercase px-2 py-0.5 rounded-full border font-semibold ${
                    metric.isEstimate
                      ? 'bg-sky-50 text-sky-700 border-sky-200'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}
                >
                  {metric.isEstimate ? 'Modelled Estimate' : 'Verified Registry'}
                </span>
              </div>

              {/* Big Statistic Value */}
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl lg:text-4xl font-extrabold font-mono tracking-tight text-slate-900">
                  {metric.formattedValue}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {metric.unit}
                </span>
              </div>

              {/* Confidence Interval if applicable */}
              {metric.confidenceInterval && (
                <div className="text-[11px] font-mono text-sky-700 mt-1">
                  95% UI: [{metric.confidenceInterval[0]}M – {metric.confidenceInterval[1]}M]
                </div>
              )}

              {/* Narrative description */}
              <p className="text-xs text-slate-600 mt-2.5 leading-relaxed font-sans line-clamp-2">
                {metric.description}
              </p>
            </div>

            {/* Bottom Metadata: Reporting Period, Source, Last Updated */}
            <div className="mt-5 pt-3 border-t border-slate-100 space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between text-slate-500">
                <span>Reporting Period:</span>
                <span className="font-mono text-slate-700 text-right truncate max-w-[200px]">
                  {metric.reportingPeriod}
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-500">
                <span>Data Source:</span>
                <span className="text-sky-700 font-medium text-right truncate max-w-[200px]" title={metric.source}>
                  {metric.source}
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-500">
                <span>Last Audit:</span>
                <span className="text-slate-600 text-right">
                  {metric.lastUpdated}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
