'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  PhoneCall, 
  AlertTriangle, 
  Clock, 
  Activity, 
  Zap, 
  ArrowRight,
  HelpCircle,
  CheckCircle,
  Play,
  RotateCcw
} from 'lucide-react';
import { FAST_SYMPTOMS, EMERGENCY_NUMBERS } from '@/data/educational-content';
import { formatNumber } from '@/lib/utils';

export const FastEmergencyCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'F' | 'A' | 'S' | 'T'>('F');
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Time is brain calculations: 1.9M neurons/minute = ~31,666 neurons/second
  const neuronsLost = Math.floor(elapsedSeconds * 31666);
  const synapsesLost = Math.floor(elapsedSeconds * 233333333); // 14B / 60s

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

  return (
    <div className="space-y-6">
      {/* Hero Alert Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-red-950 via-[#1e0a12] to-red-950 border border-red-500/60 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
              <span className="text-xs font-mono uppercase tracking-widest text-red-400 font-bold">
                CRITICAL EMERGENCY DIRECTIVE
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              FAST EMERGENCY AWARENESS CENTER
            </h2>
            <p className="text-sm text-red-200/90 mt-2 leading-relaxed">
              Acute stroke is a medical emergency of the highest order. <strong>Never wait for symptoms to disappear.</strong>
              Calling emergency services immediately ensures paramedics initiate pre-hospital stroke triage and notify the comprehensive stroke center en route.
            </p>
          </div>

          {/* Quick Direct Emergency Phone */}
          <div className="p-4 rounded-xl bg-red-900/60 border border-red-500 text-center font-mono shadow-glow-red">
            <div className="text-[11px] text-red-200 uppercase font-bold">IMMEDIATE EMERGENCY</div>
            <div className="text-3xl font-extrabold text-white mt-0.5">911 / 112 / 108</div>
            <div className="text-[10px] text-red-200 mt-1">Free 24/7 National Dispatch</div>
          </div>
        </div>

        {/* Pulsing red accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* The FAST Visual Protocol Navigator */}
      <div className="p-6 rounded-2xl glass-panel border border-cyan-500/30">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
              THE F.A.S.T. RECOGNITION METHOD
            </h3>
            <p className="text-xs text-slate-400">
              Click each letter to understand how to recognize stroke signs in seconds.
            </p>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 font-semibold">
            GOLD STANDARD
          </span>
        </div>

        {/* 4 FAST Step Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
          {FAST_SYMPTOMS.map((item) => {
            const isSelected = activeTab === item.letter;
            return (
              <button
                key={item.letter}
                onClick={() => setActiveTab(item.letter as any)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-gradient-to-br from-cyan-950/80 to-blue-950/50 border-cyan-400 text-white shadow-glow-cyan'
                    : 'bg-[#09101d] border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <div className="text-3xl font-black font-mono" style={{ color: item.color }}>
                  {item.letter}
                </div>
                <div className="text-xs font-bold text-white mt-1">
                  {item.word}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5 truncate">
                  {item.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Symptom Inspection Board */}
        <div className="p-6 rounded-xl bg-[#091122] border border-cyan-500/20 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl font-black font-mono" style={{ color: activeSymptom.color }}>
                {activeSymptom.letter}
              </span>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  {activeSymptom.word}
                </span>
                <h4 className="text-lg font-bold text-white">
                  {activeSymptom.title}
                </h4>
              </div>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed font-sans">
              {activeSymptom.subtitle}
            </p>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-[11px] font-mono text-cyan-400 uppercase font-semibold">
                What to look for:
              </div>
              <div className="text-xs text-slate-300">
                {activeSymptom.visualHint}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between p-4 rounded-xl bg-[#0e172a] border border-slate-800">
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>Action Directive</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeSymptom.actionTip}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
              *If ANY one of these three signs is present, the probability of acute stroke exceeds 72%.
            </div>
          </div>
        </div>
      </div>

      {/* "Time is Brain" Interactive Loss Counter */}
      <div className="p-6 rounded-2xl glass-panel border border-red-500/30 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-red-400" />
            <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
              "TIME IS BRAIN" — NEURAL LOSS SIMULATOR
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            During an untreated acute ischemic stroke, cerebral tissue is deprived of oxygenated blood.
            Scientific quantification establishes that <strong>every single minute</strong> of delay destroys:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-[#140b12] border border-red-500/30 text-center">
              <div className="text-xl font-bold font-mono text-red-400">1.9 Million</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Neurons Lost / Min</div>
            </div>
            <div className="p-3 rounded-xl bg-[#140b12] border border-red-500/30 text-center">
              <div className="text-xl font-bold font-mono text-amber-400">14 Billion</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Synapses Lost / Min</div>
            </div>
            <div className="p-3 rounded-xl bg-[#140b12] border border-red-500/30 text-center">
              <div className="text-xl font-bold font-mono text-white">12 km (7.5 mi)</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Nerve Fibers / Min</div>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 pt-1 font-mono">
            Reference: Saver JL. "Time is Brain — Quantified." Stroke 2006; 37: 263–266.
          </div>
        </div>

        {/* Interactive Stopwatch */}
        <div className="p-4 rounded-xl bg-[#09101d] border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-mono uppercase">Simulation Stopwatch</span>
              <span className="font-mono text-red-400 font-bold">{elapsedSeconds}s elapsed</span>
            </div>

            <div className="text-2xl font-black font-mono text-white">
              {formatNumber(neuronsLost)}
            </div>
            <div className="text-xs text-red-400 font-medium">
              Neurons permanently lost in delay
            </div>

            <div className="mt-2 text-xs text-slate-400">
              Synapses: <strong className="text-slate-300 font-mono">{formatNumber(synapsesLost)}</strong>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                isTimerRunning
                  ? 'bg-amber-600 hover:bg-amber-500 text-white'
                  : 'bg-red-600 hover:bg-red-500 text-white shadow-glow-red'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              <span>{isTimerRunning ? 'Pause Stopwatch' : 'Simulate Delay'}</span>
            </button>
            <button
              onClick={() => {
                setIsTimerRunning(false);
                setElapsedSeconds(0);
              }}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Global Emergency Numbers Directory */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-800">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm sm:text-base font-bold text-white tracking-wide">
              WORLDWIDE EMERGENCY DISPATCH DIRECTORY
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            CALL WITHOUT DELAY
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {EMERGENCY_NUMBERS.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-[#09101d] border border-slate-800/80 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{item.country}</span>
                  <span className="text-[10px] font-mono text-slate-400">{item.code}</span>
                </div>
                <div className="text-xl font-black font-mono text-red-400 mt-1">
                  {item.dial}
                </div>
              </div>
              <p className="text-[10px] text-slate-400 mt-2">
                {item.notes}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
