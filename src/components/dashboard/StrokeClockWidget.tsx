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

  return (
    <div className="glass-panel reflective-glint rounded-2xl p-5 flex flex-col justify-between shadow-sm">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-sky-600" />
          <h3 className="text-sm font-bold text-slate-900 heading-rounded tracking-tight">
            The Stroke Clock
          </h3>
        </div>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/80 text-sky-800 border border-sky-200/70 shadow-sm">
          GLOBAL CADENCE
        </span>
      </div>

      <div className="my-4 grid grid-cols-2 gap-4">
        {/* Stroke Frequency Meter */}
        <div className="p-3.5 rounded-xl reflective-subcard">
          <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
            <span className="font-semibold text-sky-700">NEW STROKE EVENT</span>
            <Activity className="w-3.5 h-3.5 text-sky-600" />
          </div>
          <div className="text-2xl font-mono font-extrabold text-slate-900">
            1 every 2.58s
          </div>
          
          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-slate-200/80 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-sky-600 transition-all duration-75 shadow-sm"
              style={{ width: `${strokeProgress}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-500 mt-2">
            ~23 new cases / minute worldwide
          </p>
        </div>

        {/* Mortality Frequency Meter */}
        <div className="p-3.5 rounded-xl reflective-subcard">
          <div className="flex items-center justify-between text-xs text-red-600 mb-1">
            <span className="font-semibold text-red-700">FATALITY CADENCE</span>
            <HeartCrack className="w-3.5 h-3.5 text-red-600" />
          </div>
          <div className="text-2xl font-mono font-extrabold text-slate-900">
            1 every 4.81s
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-slate-200/80 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-red-600 transition-all duration-75 shadow-sm"
              style={{ width: `${deathProgress}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-500 mt-2">
            ~12.5 deaths / minute worldwide
          </p>
        </div>
      </div>

      {/* Session ticker & baseline disclosure */}
      <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-600">
        <span>Strokes estimated during this visit:</span>
        <span className="font-mono font-bold text-sky-700">
          +{totalStrokesThisSession}
        </span>
      </div>
      <div className="text-[9px] text-slate-400 mt-1">
        *Disclosed statistical baseline: 12.22M annual incident cases (GBD 2021). Not a direct hospital counter.
      </div>
    </div>
  );
};
