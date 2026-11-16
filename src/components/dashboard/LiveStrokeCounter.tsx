'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Activity, 
  AlertCircle, 
  Calendar, 
  ShieldCheck,
  Zap
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
    <div className="relative overflow-hidden rounded-2xl glass-panel reflective-glint p-5 sm:p-7 shadow-sm">
      {/* Top Bar: Title & Region Pill Selector */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-200/80">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-sky-50/90 border border-sky-200/90 text-sky-600 shadow-sm">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 heading-rounded tracking-tight">
                Estimated Live Stroke Counter
              </h2>
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-white/80 text-sky-800 border border-sky-200/70 shadow-sm">
                Surveillance Clock
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Continuous mathematical approximation based on verified annual incidence rates.
            </p>
          </div>
        </div>

        {/* Quick Region Selector Tabs & ECG Vector Wave */}
        <div className="flex items-center gap-3">
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 text-sky-400 border border-slate-700 font-mono text-[11px] shadow-inner">
            <svg width="64" height="20" viewBox="0 0 64 20" className="overflow-visible">
              <path
                d="M 0 10 L 15 10 L 20 4 L 25 18 L 30 2 L 35 14 L 40 10 L 64 10"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="2"
                strokeLinecap="round"
                className="animate-pulse"
              />
            </svg>
            <span className="font-bold">CADENCE ACTIVE</span>
          </div>

          <div className="flex items-center gap-1 p-1 rounded-xl bg-white/60 border border-slate-200/80 backdrop-blur-md shadow-inner">
            {(['global', 'india', 'usa', 'china', 'uk'] as const).map((regKey) => {
              const isSelected = currentRegion === regKey;
              const item = COUNTER_CONFIGS[regKey];
              return (
                <button
                  key={regKey}
                  onClick={() => onRegionChange(regKey)}
                  className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                    isSelected
                      ? 'reflective-pill-active font-bold shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/70'
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Big Ticking Numbers Grid with Clinical Medical Accents */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-6">
        {/* YTD Strokes */}
        <div className="p-4 rounded-xl reflective-subcard border-t-4 border-t-sky-500 bg-gradient-to-b from-sky-50/40 to-transparent">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="uppercase font-semibold tracking-wide text-sky-900">YTD Incident Cases</span>
            <span className="flex items-center gap-1 text-sky-600 text-[11px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
              <span>LIVE</span>
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 tracking-tight">
            {formatLargeInt(counterData.yearToDateStrokes)}
          </div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1.5">
            <Calendar className="w-3 h-3 text-sky-600" />
            <span>Cumulative since Jan 1 (UTC)</span>
          </div>
        </div>

        {/* Today's Estimated Cases */}
        <div className="p-4 rounded-xl reflective-subcard border-t-4 border-t-blue-500 bg-gradient-to-b from-blue-50/40 to-transparent">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="uppercase font-semibold tracking-wide text-blue-900">Today's Estimated Cases</span>
            <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">24H</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-blue-950 tracking-tight">
            {formatLargeInt(counterData.todayStrokes)}
          </div>
          <div className="text-[11px] text-slate-600 mt-1">
            Cadence: <strong className="text-blue-900">~1 event every {secondsPerStroke}s</strong>
          </div>
        </div>

        {/* YTD Deaths */}
        <div className="p-4 rounded-xl reflective-subcard border-t-4 border-t-rose-500 bg-gradient-to-b from-rose-50/40 to-transparent">
          <div className="flex items-center justify-between text-xs text-rose-700 mb-1">
            <span className="uppercase font-semibold tracking-wide">YTD Fatalities</span>
            <span className="text-[10px] font-mono text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">MORTALITY</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-rose-600 tracking-tight">
            {formatLargeInt(counterData.yearToDateDeaths)}
          </div>
          <div className="text-[11px] text-slate-600 mt-1">
            Fatality Cadence: <strong className="text-rose-700">~1 every {secondsPerDeath}s</strong>
          </div>
        </div>

        {/* Baseline Source */}
        <div className="p-4 rounded-xl reflective-subcard border-t-4 border-t-emerald-500 bg-gradient-to-b from-emerald-50/40 to-transparent flex flex-col justify-between">
          <div>
            <div className="text-xs uppercase font-semibold tracking-wide text-emerald-900 mb-1">
              Annual Incidence Baseline
            </div>
            <div className="text-xl font-black font-mono text-emerald-800">
              {formatLargeInt(config.annualIncidence)}
            </div>
            <div className="text-[11px] text-slate-600">
              New cases / calendar year
            </div>
          </div>
          <div className="text-[10px] text-slate-500 mt-2 truncate flex items-center gap-1 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span className="truncate">{config.dataSource}</span>
          </div>
        </div>
      </div>

      {/* Mandatory Prominent Disclosure Banner */}
      <div className="mt-1 p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 backdrop-blur-sm flex items-start sm:items-center gap-3">
        <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5 sm:mt-0" />
        <div className="text-xs text-amber-900 leading-relaxed flex-1">
          <strong className="text-amber-800 uppercase tracking-wide mr-1">[DATA METHODOLOGY NOTICE]:</strong>
          Estimated number based on historical annual statistics – not a real-time hospital case count.
          Baseline calibrated to {config.baselineYear} {config.dataSource}.
        </div>
      </div>
    </div>
  );
};
