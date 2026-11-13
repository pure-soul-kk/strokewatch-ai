'use client';

import React, { useState, useEffect } from 'react';
import { 
  PhoneCall, 
  Clock, 
  Zap, 
  Play, 
  RotateCcw 
} from 'lucide-react';
import { FAST_SYMPTOMS, EMERGENCY_NUMBERS } from '@/data/educational-content';
import { formatNumber } from '@/lib/utils';

export const FastEmergencyCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'F' | 'A' | 'S' | 'T'>('F');
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Time is brain: 1.9M neurons/min = ~31,666 neurons/second
  const neuronsLost = Math.floor(elapsedSeconds * 31666);
  const synapsesLost = Math.floor(elapsedSeconds * 233333333);

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
      <div className="p-6 rounded-2xl bg-red-50 border border-red-200 shadow-sm relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
              <span className="text-xs uppercase tracking-wider text-red-700 font-bold">
                CRITICAL EMERGENCY DIRECTIVE
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 heading-rounded tracking-tight">
              FAST Emergency Awareness Center
            </h2>
            <p className="text-sm text-slate-700 mt-2 leading-relaxed">
              Acute stroke is a medical emergency of the highest order. <strong>Never wait for symptoms to disappear.</strong>
              Calling emergency services immediately ensures paramedics initiate pre-hospital stroke triage and notify the comprehensive stroke center en route.
            </p>
          </div>

          {/* Quick Direct Emergency Phone */}
          <div className="p-4 rounded-xl bg-white border border-red-200 text-center shadow-sm">
            <div className="text-[11px] text-red-700 uppercase font-bold">IMMEDIATE EMERGENCY</div>
            <div className="text-3xl font-extrabold text-slate-900 mt-0.5 font-mono">911 / 112 / 108</div>
            <div className="text-[10px] text-slate-500 mt-1">Free 24/7 National Dispatch</div>
          </div>
        </div>
      </div>

      {/* The FAST Protocol Navigator */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 heading-rounded tracking-tight">
              The F.A.S.T. Recognition Method
            </h3>
            <p className="text-xs text-slate-500">
              Click each letter to understand how to recognize stroke signs in seconds.
            </p>
          </div>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
            CLINICAL STANDARD
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
                    ? 'bg-sky-50 border-sky-400 ring-2 ring-sky-300'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="text-3xl font-black font-mono text-slate-900">
                  {item.letter}
                </div>
                <div className="text-xs font-bold text-slate-900 heading-rounded mt-1">
                  {item.word}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 truncate">
                  {item.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Symptom Inspection Board */}
        <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl font-black font-mono text-slate-900">
                {activeSymptom.letter}
              </span>
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                  {activeSymptom.word}
                </span>
                <h4 className="text-lg font-bold text-slate-900 heading-rounded">
                  {activeSymptom.title}
                </h4>
              </div>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed font-sans">
              {activeSymptom.subtitle}
            </p>

            <div className="p-3.5 rounded-lg bg-white border border-slate-200 space-y-1">
              <div className="text-[11px] font-semibold text-sky-700 uppercase">
                What to look for:
              </div>
              <div className="text-xs text-slate-700">
                {activeSymptom.visualHint}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between p-4 rounded-xl bg-white border border-slate-200">
            <div>
              <div className="text-xs font-bold text-slate-900 heading-rounded uppercase tracking-wide mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4 text-sky-600" />
                <span>Action Directive</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {activeSymptom.actionTip}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
              *If ANY one of these three signs is present, the probability of acute stroke exceeds 72%.
            </div>
          </div>
        </div>
      </div>

      {/* "Time is Brain" Simulator */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-200 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-red-600" />
            <h3 className="text-base sm:text-lg font-bold text-slate-900 heading-rounded tracking-tight">
              "Time is Brain" — Neural Loss Quantification
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            During an untreated acute ischemic stroke, cerebral tissue is deprived of oxygenated blood.
            Scientific quantification establishes that <strong>every single minute</strong> of delay destroys:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <div className="text-xl font-bold font-mono text-red-600">1.9 Million</div>
              <div className="text-[11px] text-slate-600 mt-0.5">Neurons Lost / Min</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <div className="text-xl font-bold font-mono text-amber-700">14 Billion</div>
              <div className="text-[11px] text-slate-600 mt-0.5">Synapses Lost / Min</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <div className="text-xl font-bold font-mono text-slate-900">12 km (7.5 mi)</div>
              <div className="text-[11px] text-slate-600 mt-0.5">Nerve Fibers / Min</div>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 pt-1 font-mono">
            Reference: Saver JL. "Time is Brain — Quantified." Stroke 2006; 37: 263–266.
          </div>
        </div>

        {/* Interactive Stopwatch */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="uppercase font-semibold">Delay Stopwatch</span>
              <span className="font-mono text-red-600 font-bold">{elapsedSeconds}s elapsed</span>
            </div>

            <div className="text-2xl font-black font-mono text-slate-900">
              {formatNumber(neuronsLost)}
            </div>
            <div className="text-xs text-red-600 font-semibold">
              Neurons permanently lost in delay
            </div>

            <div className="mt-2 text-xs text-slate-600">
              Synapses: <strong className="text-slate-800 font-mono">{formatNumber(synapsesLost)}</strong>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                isTimerRunning
                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                  : 'bg-red-600 hover:bg-red-700 text-white shadow-xs'
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
              className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
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
          <span className="text-[10px] font-semibold text-slate-500 uppercase">
            CALL WITHOUT DELAY
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
                  <span className="text-[10px] text-slate-500">{item.code}</span>
                </div>
                <div className="text-xl font-bold font-mono text-red-600 mt-1">
                  {item.dial}
                </div>
              </div>
              <p className="text-[10px] text-slate-600 mt-2">
                {item.notes}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
