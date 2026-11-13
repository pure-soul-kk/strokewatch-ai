'use client';

import React, { useState, useMemo } from 'react';
import { 
  Sliders, 
  TrendingDown, 
  ShieldAlert, 
  HelpCircle, 
  Sparkles, 
  Calendar, 
  Activity,
  Layers,
  Info,
  CheckCircle2
} from 'lucide-react';
import { WhatIfParameters } from '@/types';
import { runWhatIfSimulation, SimulationSummary } from '@/lib/prediction-engine';

export const WhatIfSimulator: React.FC = () => {
  const [params, setParams] = useState<WhatIfParameters>({
    bloodPressureReduction: 25, // 25% improvement
    smokingReduction: 20,       // 20% reduction
    physicalActivityIncrease: 20, // 20% increase
    airPollutionImprovement: 15,  // 15% PM2.5 reduction
    targetHorizonYear: 2035
  });

  const simulation: SimulationSummary = useMemo(() => {
    return runWhatIfSimulation(params);
  }, [params]);

  const maxVal = Math.max(
    ...simulation.results.map((r) => Math.max(r.baselineCasesM, r.confidenceIntervalUpperM))
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl glass-panel border border-cyan-500/30 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Sliders className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">
              WHAT-IF? SCENARIO PREDICTION LAB
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-semibold">
              GBD PAF SIMULATION
            </span>
          </div>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Model hypothetical epidemiological outcomes by adjusting global modifiable risk exposures.
            Calculated using joint Population Attributable Fraction (PAF) multi-causality formulas.
          </p>
        </div>

        {/* Primary Driver Badge */}
        <div className="p-3 rounded-xl bg-[#09101d] border border-cyan-500/30 text-right font-mono">
          <div className="text-[10px] text-slate-400 uppercase">Primary Driver</div>
          <div className="text-sm font-bold text-cyan-300">{simulation.primaryDriver}</div>
        </div>
      </div>

      {/* Mandatory Scenario Disclosure */}
      <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-3">
        <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-amber-200/90 leading-relaxed">
          <strong className="text-amber-300 font-semibold uppercase mr-1">[MODEL-BASED SCENARIO NOTICE]:</strong>
          Every projection displayed below is a hypothetical mathematical scenario calibrated on historical GBD 2021 hazard ratios, 
          <strong> NOT a confirmed future prediction</strong>. Real outcomes depend on public health policy execution, healthcare infrastructure, and socioeconomic factors.
        </div>
      </div>

      {/* Top 3 Impact KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl glass-panel border border-emerald-500/30">
          <div className="text-xs font-mono uppercase text-emerald-400 flex items-center justify-between">
            <span>Cumulative Cases Averted</span>
            <TrendingDown className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black font-mono text-white mt-1">
            {simulation.cumulativeCasesAvertedM}M
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Strokes prevented between 2024 and {params.targetHorizonYear}
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-cyan-500/30">
          <div className="text-xs font-mono uppercase text-cyan-400 flex items-center justify-between">
            <span>Cumulative Deaths Averted</span>
            <TrendingDown className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-black font-mono text-cyan-300 mt-1">
            {simulation.cumulativeDeathsAvertedM}M
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Fatalities prevented globally under scenario
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-blue-500/30">
          <div className="text-xs font-mono uppercase text-blue-400 flex items-center justify-between">
            <span>Net Joint Risk Reduction</span>
            <Sparkles className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-black font-mono text-white mt-1">
            -{simulation.netRiskReductionPercent}%
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Joint population attributable risk averted
          </div>
        </div>
      </div>

      {/* Sliders Grid Left, Trajectory Chart Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sliders Column */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-5">
          <div className="pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Policy & Risk Levers
            </h3>
            <p className="text-[11px] text-slate-400">
              Simulate percentage changes in global risk factor exposure.
            </p>
          </div>

          {/* Slider 1: Systolic BP */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-200">Systolic BP Control:</span>
              <span className="font-mono text-cyan-300 font-bold">+{params.bloodPressureReduction}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={50}
              step={5}
              value={params.bloodPressureReduction}
              onChange={(e) => setParams({ ...params, bloodPressureReduction: Number(e.target.value) })}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <div className="text-[10px] text-slate-400 flex justify-between">
              <span>0% (Status Quo)</span>
              <span>50% (Max Strategy)</span>
            </div>
          </div>

          {/* Slider 2: Smoking */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-200">Smoking Cessation:</span>
              <span className="font-mono text-red-400 font-bold">-{params.smokingReduction}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={60}
              step={5}
              value={params.smokingReduction}
              onChange={(e) => setParams({ ...params, smokingReduction: Number(e.target.value) })}
              className="w-full accent-red-400 cursor-pointer"
            />
            <div className="text-[10px] text-slate-400 flex justify-between">
              <span>0% (No change)</span>
              <span>60% (Broad cessation)</span>
            </div>
          </div>

          {/* Slider 3: Physical Activity */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-200">Aerobic Activity Boost:</span>
              <span className="font-mono text-emerald-400 font-bold">+{params.physicalActivityIncrease}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={50}
              step={5}
              value={params.physicalActivityIncrease}
              onChange={(e) => setParams({ ...params, physicalActivityIncrease: Number(e.target.value) })}
              className="w-full accent-emerald-400 cursor-pointer"
            />
            <div className="text-[10px] text-slate-400 flex justify-between">
              <span>0%</span>
              <span>50% Increase</span>
            </div>
          </div>

          {/* Slider 4: Air Pollution */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-200">PM2.5 Air Quality Mitigation:</span>
              <span className="font-mono text-amber-400 font-bold">-{params.airPollutionImprovement}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={40}
              step={5}
              value={params.airPollutionImprovement}
              onChange={(e) => setParams({ ...params, airPollutionImprovement: Number(e.target.value) })}
              className="w-full accent-amber-400 cursor-pointer"
            />
            <div className="text-[10px] text-slate-400 flex justify-between">
              <span>0%</span>
              <span>40% Cleaner Air</span>
            </div>
          </div>

          {/* Target Horizon Year */}
          <div className="space-y-2 pt-3 border-t border-slate-800">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-200">Target Horizon Year:</span>
              <span className="font-mono text-cyan-400 font-bold">{params.targetHorizonYear}</span>
            </div>
            <input
              type="range"
              min={2026}
              max={2040}
              step={1}
              value={params.targetHorizonYear}
              onChange={(e) => setParams({ ...params, targetHorizonYear: Number(e.target.value) })}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>
        </div>

        {/* Projection Trajectory Chart Column */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  BASELINE VS. INTERVENTION TRAJECTORY
                </h3>
                <p className="text-xs text-slate-400">
                  Annual Incident Strokes (Millions) with 95% Uncertainty Intervals
                </p>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-red-400 inline-block" />
                  <span className="text-slate-300">Baseline (Aging)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-cyan-400 inline-block" />
                  <span className="text-cyan-300">Scenario</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-cyan-500/20 rounded inline-block" />
                  <span className="text-slate-400">95% UI</span>
                </span>
              </div>
            </div>

            {/* SVG Visual Projection */}
            <div className="mt-6 h-60 w-full relative">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 220" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="uiGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.05" />
                  </linearGradient>
                </defs>

                {/* Grid Lines */}
                <line x1="0" y1="30" x2="1000" y2="30" stroke="#1E293B" strokeDasharray="4 4" />
                <line x1="0" y1="90" x2="1000" y2="90" stroke="#1E293B" strokeDasharray="4 4" />
                <line x1="0" y1="150" x2="1000" y2="150" stroke="#1E293B" strokeDasharray="4 4" />
                <line x1="0" y1="210" x2="1000" y2="210" stroke="#1E293B" />

                {(() => {
                  const points = simulation.results.map((r, idx) => {
                    const x = (idx / (simulation.results.length - 1)) * 1000;
                    const baselineY = 210 - (r.baselineCasesM / (maxVal * 1.2)) * 180;
                    const simY = 210 - (r.simulatedCasesM / (maxVal * 1.2)) * 180;
                    const lowerY = 210 - (r.confidenceIntervalLowerM / (maxVal * 1.2)) * 180;
                    const upperY = 210 - (r.confidenceIntervalUpperM / (maxVal * 1.2)) * 180;
                    return { x, baselineY, simY, lowerY, upperY, ...r };
                  });

                  const baselinePath = points.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x} ${p.baselineY}`, '');
                  const simPath = points.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x} ${p.simY}`, '');

                  // 95% UI polygon
                  const upperPoints = points.map((p) => `${p.x},${p.upperY}`).join(' ');
                  const lowerPoints = [...points].reverse().map((p) => `${p.x},${p.lowerY}`).join(' ');
                  const uiPolyPath = `M ${points[0].x} ${points[0].upperY} L ${upperPoints} L ${lowerPoints} Z`;

                  return (
                    <>
                      <polygon points={`${upperPoints} ${lowerPoints}`} fill="url(#uiGradient)" />
                      <path d={baselinePath} fill="none" stroke="#EF4444" strokeWidth="2.5" strokeDasharray="4 4" />
                      <path d={simPath} fill="none" stroke="#22D3EE" strokeWidth="3" strokeLinecap="round" />

                      {points.map((p, i) => (
                        <g key={i}>
                          <circle cx={p.x} cy={p.simY} r="4" fill="#22D3EE" stroke="#080D18" strokeWidth="2" />
                          {i === points.length - 1 && (
                            <text
                              x={p.x - 10}
                              y={p.simY - 12}
                              fill="#22D3EE"
                              fontSize="12"
                              fontFamily="monospace"
                              fontWeight="bold"
                            >
                              {p.simulatedCasesM}M
                            </text>
                          )}
                          {i === points.length - 1 && (
                            <text
                              x={p.x - 10}
                              y={p.baselineY - 12}
                              fill="#EF4444"
                              fontSize="12"
                              fontFamily="monospace"
                              fontWeight="bold"
                            >
                              {p.baselineCasesM}M (Baseline)
                            </text>
                          )}
                        </g>
                      ))}
                    </>
                  );
                })()}
              </svg>
            </div>

            {/* X-axis years */}
            <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-3 pt-2 border-t border-slate-800">
              {simulation.results.map((r) => (
                <span key={r.year}>{r.year}</span>
              ))}
            </div>
          </div>

          {/* Model Assumptions Footer */}
          <div className="mt-5 pt-3 border-t border-slate-800/80 text-[10px] text-slate-400 space-y-1 font-mono">
            <div>• {simulation.assumptions[0]}</div>
            <div>• {simulation.assumptions[2]}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
