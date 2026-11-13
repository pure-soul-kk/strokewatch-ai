'use client';

import React, { useState, useEffect } from 'react';
import { Clock, HeartCrack, Activity, AlertTriangle, ShieldCheck } from 'lucide-react';

export const StrokeClockWidget: React.FC = () => {
  const [strokeProgress, setStrokeProgress] = useState(0);
  const [deathProgress, setDeathProgress] = useState(0);
  const [totalStrokesThisSession, setTotalStrokesThisSession] = useState(0);

  // Stroke interval: 2580ms, Death interval: 4816ms
  useEffect(() => {
    const strokeDuration = 2582;
    const deathDuration = 4816;
    const updateRate = 50; // ms

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

  return (
    <div className="glass-panel rounded-2xl p-5 border border-cyan-500/20 relative overflow-hidden flex flex-col justify-between">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-bold text-white tracking-wide">
            THE STROKE CLOCK
          </h3>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
          GLOBAL CADENCE
        </span>
      </div>

      <div className="my-4 grid grid-cols-2 gap-4">
        {/* Stroke Frequency Meter */}
        <div className="p-3.5 rounded-xl bg-[#09101d] border border-cyan-500/30 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-mono text-cyan-400 font-semibold">NEW STROKE EVENT</span>
            <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          </div>
          <div className="text-2xl font-mono font-extrabold text-white">
            1 every 2.58s
          </div>
          
          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-slate-800 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-cyan-400 transition-all duration-75 shadow-glow-cyan"
              style={{ width: `${strokeProgress}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-400 mt-2 font-mono">
            ~23 new cases / minute worldwide
          </p>
        </div>

        {/* Mortality Frequency Meter */}
        <div className="p-3.5 rounded-xl bg-[#09101d] border border-red-500/30 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-mono text-red-400 font-semibold">FATALITY CADENCE</span>
            <HeartCrack className="w-3.5 h-3.5 text-red-400 animate-pulse" />
          </div>
          <div className="text-2xl font-mono font-extrabold text-white">
            1 every 4.81s
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-slate-800 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-red-400 transition-all duration-75 shadow-glow-red"
              style={{ width: `${deathProgress}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-400 mt-2 font-mono">
            ~12.5 deaths / minute worldwide
          </p>
        </div>
      </div>

      {/* Session ticker & baseline disclosure */}
      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <span>Strokes estimated during this visit:</span>
        <span className="font-mono font-bold text-cyan-400">
          +{totalStrokesThisSession}
        </span>
      </div>
      <div className="text-[9px] text-slate-400 mt-1">
        *Disclosed statistical baseline: 12.22M annual incident cases (GBD 2021). Not a direct hospital counter.
      </div>
    </div>
  );
};
