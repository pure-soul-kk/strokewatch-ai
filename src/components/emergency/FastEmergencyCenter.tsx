'use client';

import React, { useState, useEffect } from 'react';
import { 
  PhoneCall, 
  Clock, 
  Zap, 
  Play, 
  RotateCcw,
  Activity,
  AlertTriangle,
  Timer
} from 'lucide-react';
import { FAST_SYMPTOMS, EMERGENCY_NUMBERS } from '@/data/educational-content';
import { formatNumber } from '@/lib/utils';

export const FastEmergencyCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'F' | 'A' | 'S' | 'T'>('F');
  const [elapsedSeconds, setElapsedSeconds] = useState(45);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Time is brain: 1.9M neurons/min = ~31,666 neurons/second
  const neuronsLost = Math.floor(elapsedSeconds * 31666);
  const synapsesLost = Math.floor(elapsedSeconds * 233333333);
  const fibersKmLost = (elapsedSeconds * 0.2).toFixed(1);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const activeSymptom = FAST_SYMPTOMS.find((s) => s.letter === activeTab) || FAST_SYMPTOMS[0];

  // Graphical penumbra calculations
  // Elapsed time up to 270 minutes (4.5 hours golden window)
  const simulatedMins = Math.max(1, Math.min(270, elapsedSeconds));
  const coreRadius = Math.min(38, Math.max(8, 8 + Math.sqrt(simulatedMins) * 1.8));
  const penumbraRadius = Math.min(52, coreRadius + 14);

  return (
    <div className="space-y-6">
      {/* Hero Alert Banner */}
      <div className="p-6 rounded-2xl glass-panel-critical relative overflow-hidden shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
              <span className="text-xs uppercase tracking-wider text-red-700 font-bold font-mono">
                CRITICAL HYPERACUTE DIRECTIVE
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 heading-rounded tracking-tight">
              FAST Emergency Response Command Center
            </h2>
            <p className="text-sm text-slate-700 mt-2 leading-relaxed">
              Acute stroke is an immediate neurovascular emergency. <strong>Never wait for symptoms to improve.</strong>
              Calling emergency dispatch services immediately initiates acute mobile triage and comprehensive stroke center pre-notification en route.
            </p>
          </div>

          {/* Quick Direct Emergency Phone */}
          <div className="p-4 rounded-xl reflective-subcard text-center shadow-sm">
            <div className="text-[11px] text-red-700 uppercase font-bold font-mono">24/7 EMERGENCY DISPATCH</div>
            <div className="text-3xl font-black text-slate-900 mt-0.5 font-mono">911 / 112 / 108</div>
            <div className="text-[10px] text-slate-500 mt-1 font-mono">Direct Toll-Free Dispatch</div>
          </div>
        </div>
      </div>

      {/* The FAST Protocol Navigator */}
      <div className="p-6 rounded-2xl glass-panel reflective-glint">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200/80">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 heading-rounded tracking-tight">
              The F.A.S.T. Clinical Recognition Protocol
            </h3>
            <p className="text-xs text-slate-500">
              Interactive clinical criteria for acute cerebrovascular event recognition.
            </p>
          </div>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/80 text-sky-800 border border-sky-200/80 shadow-sm font-mono">
            AHA / WSO STANDARD
          </span>
        </div>

        {/* 4 FAST Step Buttons with Vector Icon Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
          {FAST_SYMPTOMS.map((item) => {
            const isSelected = activeTab === item.letter;
            return (
              <button
                key={item.letter}
                onClick={() => setActiveTab(item.letter as any)}
                className={`p-4 rounded-xl text-left transition-all ${
                  isSelected
                    ? 'reflective-subcard bg-white/95 border-sky-400 ring-2 ring-sky-300 shadow-md'
                    : 'reflective-subcard text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="text-3xl font-black font-mono text-slate-900">
                    {item.letter}
                  </div>
                  {item.letter === 'F' && (
                    <span className="text-xs text-sky-600 bg-sky-50 px-1.5 py-0.5 rounded font-mono font-bold">Face</span>
                  )}
                  {item.letter === 'A' && (
                    <span className="text-xs text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-mono font-bold">Arms</span>
                  )}
                  {item.letter === 'S' && (
                    <span className="text-xs text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded font-mono font-bold">Speech</span>
                  )}
                  {item.letter === 'T' && (
                    <span className="text-xs text-red-600 bg-red-50 px-1.5 py-0.5 rounded font-mono font-bold">Time</span>
                  )}
                </div>
                <div className="text-xs font-bold text-slate-900 heading-rounded mt-2">
                  {item.word}
                </div>
                <div className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                  {item.subtitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Clinical Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-2xl bg-slate-50/80 border border-slate-200/90 shadow-inner">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-sky-600 text-white font-mono font-black text-sm flex items-center justify-center shadow-xs">
                {activeSymptom.letter}
              </span>
              <div>
                <span className="text-xs font-bold text-sky-700 uppercase tracking-wide font-mono">
                  CLINICAL ASSESSMENT
                </span>
                <h4 className="text-lg font-bold text-slate-900 heading-rounded">
                  {activeSymptom.title}
                </h4>
              </div>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed font-sans">
              {activeSymptom.subtitle}
            </p>

            <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 space-y-1 shadow-xs">
              <div className="text-[11px] font-bold text-sky-700 uppercase font-mono">
                Visual Inspection Protocol:
              </div>
              <div className="text-xs text-slate-700 leading-relaxed">
                {activeSymptom.visualHint}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs">
            <div>
              <div className="text-xs font-bold text-slate-900 heading-rounded uppercase tracking-wide mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4 text-sky-600" />
                <span>Action Directive</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {activeSymptom.actionTip}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-mono">
              *Presence of any single symptom indicates &gt;72% acute stroke probability.
            </div>
          </div>
        </div>
      </div>

      {/* GRAPHICAL "TIME IS BRAIN" PENUMBRA SIMULATOR */}
      <div className="p-6 rounded-2xl glass-panel reflective-glint space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-200/80">
          <div className="flex items-center gap-2.5">
            <Clock className="w-5 h-5 text-red-600" />
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 heading-rounded tracking-tight">
                "Time is Brain" — Cerebral Tissue Loss Simulator
              </h3>
              <p className="text-xs text-slate-500">
                Mathematical modeling of acute ischemic neuronal infarction based on Saver (Stroke 2006).
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
            1.9M NEURONS / MIN
          </span>
        </div>

        {/* Graphic Area: SVG Penumbra Diagram + Live Delay Stopwatch */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left 5 Cols: SVG Brain Ischemic Penumbra Visualizer */}
          <div className="lg:col-span-5 p-4 rounded-xl bg-slate-900 text-white flex flex-col items-center justify-center shadow-md relative overflow-hidden">
            <div className="w-full flex justify-between text-[11px] font-mono text-slate-400 pb-2 border-b border-slate-800">
              <span>CEREBRAL ISCHEMIA PENUMBRA</span>
              <span className="text-red-400 font-bold">{simulatedMins}m Elapsed</span>
            </div>

            {/* SVG Brain Cross-Section Vector */}
            <svg width="220" height="170" viewBox="0 0 220 170" className="my-2">
              <defs>
                <radialGradient id="penumbraGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#991B1B" />
                  <stop offset="65%" stopColor="#EA580C" />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.8" />
                </radialGradient>
              </defs>

              {/* Brain Hemisphere Outline Vector */}
              <path
                d="M 110 15 C 60 15, 25 50, 25 100 C 25 135, 55 155, 95 155 C 105 155, 110 150, 110 150 C 110 150, 115 155, 125 155 C 165 155, 195 135, 195 100 C 195 50, 160 15, 110 15 Z"
                fill="#1E293B"
                stroke="#334155"
                strokeWidth="2.5"
              />

              {/* Middle Cerebral Artery (MCA) Vascular Tree Trunk */}
              <path
                d="M 110 145 Q 110 110, 85 95 Q 65 85, 50 80 M 85 95 Q 90 75, 75 55 M 85 95 Q 105 80, 115 65"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="2"
                opacity="0.6"
              />

              {/* Thrombus Occlusion Clot Point */}
              <circle cx="85" cy="95" r="4.5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1.5" />

              {/* Ischemic Penumbra Halo (Salvageable Perfusion Territory) */}
              <circle
                cx="85"
                cy="95"
                r={penumbraRadius}
                fill="rgba(245, 158, 11, 0.22)"
                stroke="#F59E0B"
                strokeWidth="1.5"
                strokeDasharray="3,3"
                className="transition-all duration-300"
              />

              {/* Irreversible Infarct Core (Expanding Necrotic Zone) */}
              <circle
                cx="85"
                cy="95"
                r={coreRadius}
                fill="url(#penumbraGrad)"
                stroke="#7F1D1D"
                strokeWidth="1.5"
                className="transition-all duration-300"
              />

              {/* Core Label */}
              <text x="85" y="98" fill="#FFFFFF" fontSize="8" fontWeight="800" textAnchor="middle">
                CORE
              </text>
            </svg>

            {/* Legend */}
            <div className="w-full flex justify-between text-[10px] text-slate-400 font-mono pt-2 border-t border-slate-800">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-600 inline-block" />
                <span>Infarcted Core</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                <span>Salvageable Penumbra</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-sky-400 inline-block" />
                <span>MCA Vessel</span>
              </span>
            </div>
          </div>

          {/* Right 7 Cols: Metric Cards & Live Delay Stopwatch */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl reflective-subcard text-center">
                <div className="text-xl font-bold font-mono text-red-600">1.9 Million</div>
                <div className="text-[11px] text-slate-600 mt-0.5">Neurons / Minute</div>
              </div>
              <div className="p-3.5 rounded-xl reflective-subcard text-center">
                <div className="text-xl font-bold font-mono text-amber-700">14 Billion</div>
                <div className="text-[11px] text-slate-600 mt-0.5">Synapses / Minute</div>
              </div>
              <div className="p-3.5 rounded-xl reflective-subcard text-center">
                <div className="text-xl font-bold font-mono text-slate-900">12 km (7.5 mi)</div>
                <div className="text-[11px] text-slate-600 mt-0.5">Nerve Fibers / Min</div>
              </div>
            </div>

            {/* Interactive Delay Stopwatch */}
            <div className="p-4 rounded-xl reflective-subcard border-l-4 border-l-red-600 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="uppercase font-bold tracking-wide flex items-center gap-1.5 text-slate-800">
                  <Timer className="w-4 h-4 text-red-600" />
                  <span>Simulated Treatment Delay</span>
                </span>
                <span className="font-mono text-red-600 font-extrabold text-sm">{elapsedSeconds}s elapsed</span>
              </div>

              <div className="flex flex-wrap items-baseline gap-3">
                <div className="text-3xl font-black font-mono text-slate-900">
                  {formatNumber(neuronsLost)}
                </div>
                <div className="text-xs text-red-600 font-bold uppercase font-mono">
                  Permanent Brain Neurons Destroyed
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 font-mono">
                <div>Synapses: <strong className="text-slate-900">{formatNumber(synapsesLost)}</strong></div>
                <div>Nerve Fibers: <strong className="text-slate-900">{fibersKmLost} km</strong></div>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-xs ${
                    isTimerRunning
                      ? 'bg-amber-600 hover:bg-amber-700 text-white'
                      : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>{isTimerRunning ? 'Pause Stopwatch' : 'Run Live Delay Simulator'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsTimerRunning(false);
                    setElapsedSeconds(0);
                  }}
                  className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 shadow-xs"
                  title="Reset"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 font-mono">
              Scientific Reference: Saver JL. "Time is Brain — Quantified." <i>Stroke 2006; 37: 263–266.</i>
            </div>
          </div>

        </div>
      </div>

      {/* Global Emergency Numbers Directory */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-5 h-5 text-sky-600" />
            <h3 className="text-sm sm:text-base font-bold text-slate-900 heading-rounded tracking-tight">
              Worldwide Emergency Dispatch Directory
            </h3>
          </div>
          <span className="text-[10px] font-semibold text-slate-500 uppercase font-mono">
            FREE TOLL-FREE CALLS
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {EMERGENCY_NUMBERS.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 heading-rounded">{item.country}</span>
                  <span className="text-[10px] text-slate-500 font-mono">{item.code}</span>
                </div>
                <div className="text-2xl font-black font-mono text-red-600 mt-1">
                  {item.dial}
                </div>
              </div>
              <p className="text-[10px] text-slate-600 mt-2 font-sans">
                {item.notes}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
