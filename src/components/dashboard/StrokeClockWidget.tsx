'use client';

import React, { useState, useEffect } from 'react';
import { Clock, HeartCrack, Activity } from 'lucide-react';

export const StrokeClockWidget: React.FC = () => {
  const [strokeProgress, setStrokeProgress] = useState(0);
  const [deathProgress, setDeathProgress] = useState(0);
  const [totalStrokesThisSession, setTotalStrokesThisSession] = useState(0);

  useEffect(() => {
    const strokeDuration = 2582;
    const deathDuration = 4816;
    const updateRate = 50;

    const timer = setInterval(() => {
      setStrokeProgress((prev) => {
        const next = prev + (updateRate / strokeDuration) * 100;
        if (next >= 100) {
          setTotalStrokesThisSession((c) => c + 1);
          return 0;
        }
        return next;
      });

      setDeathProgress((prev) => {
        const next = prev + (updateRate / deathDuration) * 100;
        if (next >= 100) {
          return 0;
        }
        return next;
      });
    }, updateRate);

    return () => clearInterval(timer);
  }, []);

  // SVG Circular dial calculation
  // Radius = 38, Circumference = 2 * PI * 38 ≈ 238.76
  const strokeCircumference = 238.76;
  const strokeOffset = strokeCircumference - (strokeCircumference * (strokeProgress / 100));

  const deathCircumference = 238.76;
  const deathOffset = deathCircumference - (deathCircumference * (deathProgress / 100));

  return (
    <div className="glass-panel reflective-glint rounded-2xl p-5 flex flex-col justify-between shadow-sm">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-sky-600" />
          <h3 className="text-sm font-bold text-slate-900 heading-rounded tracking-tight">
            The Stroke Clock & Radial Cadence Meter
          </h3>
        </div>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/80 text-sky-800 border border-sky-200/70 shadow-sm font-mono">
          GBD 2021 CALIBRATED
        </span>
      </div>

      <div className="my-3 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
        {/* 1. Stroke Frequency Circular Radial Dial */}
        <div className="p-3.5 rounded-xl reflective-subcard flex items-center gap-3.5">
          <div className="relative flex-shrink-0">
            <svg width="86" height="86" viewBox="0 0 86 86" className="-rotate-90">
              <circle
                cx="43"
                cy="43"
                r="36"
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="6"
              />
              <circle
                cx="43"
                cy="43"
                r="36"
                fill="none"
                stroke="#0284C7"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={strokeCircumference}
                strokeDashoffset={strokeOffset}
                className="transition-all duration-75"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center font-mono font-bold text-slate-900 text-xs">
              <Activity className="w-4 h-4 text-sky-600" />
              <span className="text-[10px] font-extrabold text-sky-700">2.58s</span>
            </div>
          </div>

          <div>
            <div className="text-[10px] font-bold text-sky-700 uppercase font-mono tracking-wide">
              NEW ACUTE STROKE
            </div>
            <div className="text-xl font-black font-mono text-slate-900">
              1 every 2.58s
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              ~23.2 new episodes / min globally
            </p>
          </div>
        </div>

        {/* 2. Mortality Frequency Circular Radial Dial */}
        <div className="p-3.5 rounded-xl reflective-subcard flex items-center gap-3.5">
          <div className="relative flex-shrink-0">
            <svg width="86" height="86" viewBox="0 0 86 86" className="-rotate-90">
              <circle
                cx="43"
                cy="43"
                r="36"
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="6"
              />
              <circle
                cx="43"
                cy="43"
                r="36"
                fill="none"
                stroke="#DC2626"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={deathCircumference}
                strokeDashoffset={deathOffset}
                className="transition-all duration-75"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center font-mono font-bold text-slate-900 text-xs">
              <HeartCrack className="w-4 h-4 text-red-600" />
              <span className="text-[10px] font-extrabold text-red-700">4.81s</span>
            </div>
          </div>

          <div>
            <div className="text-[10px] font-bold text-red-700 uppercase font-mono tracking-wide">
              FATALITY CADENCE
            </div>
            <div className="text-xl font-black font-mono text-slate-900">
              1 every 4.81s
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              ~12.5 deaths / min globally
            </p>
          </div>
        </div>
      </div>

      {/* Session ticker & baseline disclosure */}
      <div className="pt-2 border-t border-slate-200/80 flex flex-wrap items-center justify-between text-[11px] text-slate-600 font-mono">
        <span>Strokes estimated during this browser session:</span>
        <span className="text-sky-700 font-black font-mono text-sm bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
          +{totalStrokesThisSession}
        </span>
      </div>
    </div>
  );
};
