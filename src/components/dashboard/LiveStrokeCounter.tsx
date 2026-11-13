'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Activity, 
  AlertCircle, 
  RefreshCw, 
  Calendar, 
  Info,
  ShieldCheck,
  Zap,
  Globe2
} from 'lucide-react';
import { 
  COUNTER_CONFIGS, 
  calculateYearToDateStrokes, 
  LiveCounterConfig 
} from '@/lib/stroke-counter';
import { formatLargeInt } from '@/lib/utils';

interface LiveStrokeCounterProps {
  currentRegion: string;
  onRegionChange: (regionKey: string) => void;
}

export const LiveStrokeCounter: React.FC<LiveStrokeCounterProps> = ({
  currentRegion,
  onRegionChange
}) => {
  const config: LiveCounterConfig = useMemo(() => {
    return COUNTER_CONFIGS[currentRegion] || COUNTER_CONFIGS.global;
  }, [currentRegion]);

  const [counterData, setCounterData] = useState(() => calculateYearToDateStrokes(config.id));
  const [pulseActive, setPulseActive] = useState(false);

  useEffect(() => {
    // High-resolution ticker updating continuously based on fractional increments
    const interval = setInterval(() => {
      const updated = calculateYearToDateStrokes(config.id);
      setCounterData(updated);
      setPulseActive(true);
      setTimeout(() => setPulseActive(false), 300);
    }, 1000);

    return () => clearInterval(interval);
  }, [config.id]);

  const secondsPerStroke = (config.intervalBetweenStrokesMs / 1000).toFixed(2);
  const secondsPerDeath = (config.intervalBetweenDeathsMs / 1000).toFixed(2);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0c162d] via-[#111B2D] to-[#0A101D] border border-cyan-500/30 p-5 sm:p-7 shadow-2xl backdrop-blur-xl">
      {/* Background ambient medical grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#22d3ee_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.04] pointer-events-none" />

      {/* Top Bar: Title & Region Pill Selector */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400">
            <Activity className={`w-5 h-5 ${pulseActive ? 'scale-110 text-cyan-300' : 'scale-100'} transition-transform duration-200`} />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <span>ESTIMATED LIVE STROKE COUNTER</span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30 font-semibold">
                  SURVEILLANCE CLOCK
                </span>
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Continuous mathematical approximation based on verified annual incidence rates.
            </p>
          </div>
        </div>

        {/* Quick Region Selector Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/90 border border-slate-800">
          {(['global', 'india', 'usa', 'china', 'uk'] as const).map((regKey) => {
            const isSelected = currentRegion === regKey;
            const item = COUNTER_CONFIGS[regKey];
            return (
              <button
                key={regKey}
                onClick={() => onRegionChange(regKey)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-glow-cyan'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Big Ticking Numbers Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 py-6">
        {/* YTD Strokes */}
        <div className="p-4 rounded-xl bg-[#0B1322]/80 border border-slate-800/80 hover:border-cyan-500/40 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-mono uppercase tracking-wider text-slate-400">Year-To-Date Estimated Cases</span>
            <span className="flex items-center gap-1 text-cyan-400 text-[11px] font-semibold">
              <Zap className="w-3 h-3" />
              <span>LIVE TICK</span>
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-300 tracking-tight">
            {formatLargeInt(counterData.yearToDateStrokes)}
          </div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1.5">
            <Calendar className="w-3 h-3 text-slate-400" />
            <span>Cumulative since Jan 1 (UTC)</span>
          </div>
        </div>

        {/* Today's Estimated Cases */}
        <div className="p-4 rounded-xl bg-[#0B1322]/80 border border-slate-800/80 hover:border-cyan-500/40 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-mono uppercase tracking-wider text-slate-400">Today's Estimated Cases</span>
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight">
            {formatLargeInt(counterData.todayStrokes)}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Rate: <strong>~1 event every {secondsPerStroke}s</strong>
          </div>
        </div>

        {/* YTD Deaths */}
        <div className="p-4 rounded-xl bg-[#0B1322]/80 border border-slate-800/80 hover:border-red-500/40 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-mono uppercase tracking-wider text-red-400">YTD Estimated Fatalities</span>
            <span className="w-2 h-2 rounded-full bg-red-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-red-300 tracking-tight">
            {formatLargeInt(counterData.yearToDateDeaths)}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Rate: <strong>~1 fatality every {secondsPerDeath}s</strong>
          </div>
        </div>

        {/* Baseline Source */}
        <div className="p-4 rounded-xl bg-[#0B1322]/80 border border-slate-800/80 flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
              Annual Incidence Baseline
            </div>
            <div className="text-xl font-bold font-mono text-cyan-400">
              {formatLargeInt(config.annualIncidence)}
            </div>
            <div className="text-[11px] text-slate-400">
              New cases / calendar year
            </div>
          </div>
          <div className="text-[10px] text-slate-400 mt-2 truncate flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400 flex-shrink-0" />
            <span className="truncate">{config.dataSource}</span>
          </div>
        </div>
      </div>

      {/* Mandatory Prominent Disclosure Banner */}
      <div className="relative z-10 mt-2 p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-start sm:items-center gap-3">
        <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5 sm:mt-0" />
        <div className="text-xs text-amber-200/90 leading-relaxed flex-1">
          <strong className="text-amber-300 uppercase tracking-wide mr-1">[DATA METHODOLOGY NOTICE]:</strong>
          Estimated number based on historical annual statistics – not a real-time hospital case count.
          Baseline calibrated to {config.baselineYear} {config.dataSource}.
        </div>
      </div>
    </div>
  );
};
