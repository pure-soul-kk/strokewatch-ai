'use client';

import React, { useState, useMemo } from 'react';
import { 
  Sliders, 
  TrendingDown, 
  Sparkles, 
  Info
} from 'lucide-react';
import { WhatIfParameters } from '@/types';
import { runWhatIfSimulation, SimulationSummary } from '@/lib/prediction-engine';

export const WhatIfSimulator: React.FC = () => {
  const [params, setParams] = useState<WhatIfParameters>({
    bloodPressureReduction: 25,
    smokingReduction: 20,
    physicalActivityIncrease: 20,
    airPollutionImprovement: 15,
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
      <div className="p-6 rounded-2xl glass-panel reflective-glint flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Sliders className="w-5 h-5 text-sky-600" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 heading-rounded tracking-tight">
              What-If? Scenario Prediction Lab
            </h2>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/80 text-sky-800 border border-sky-200/80 shadow-sm">
              GBD PAF SIMULATION
            </span>
          </div>
          <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
            Model hypothetical epidemiological outcomes by adjusting global modifiable risk exposures.
            Calculated using joint Population Attributable Fraction (PAF) multi-causality formulas.
          </p>
        </div>

        {/* Primary Driver Badge */}
        <div className="p-3.5 rounded-xl reflective-subcard text-right shadow-sm">
          <div className="text-[10px] text-slate-500 uppercase font-semibold">Primary Driver</div>
          <div className="text-sm font-bold text-sky-700 heading-rounded">{simulation.primaryDriver}</div>
        </div>
      </div>

      {/* Mandatory Scenario Disclosure */}
      <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 backdrop-blur-sm flex items-start gap-3">
        <Info className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 leading-relaxed">
          <strong className="text-amber-800 font-semibold uppercase mr-1">[MODEL-BASED SCENARIO NOTICE]:</strong>
          Every projection displayed below is a hypothetical mathematical scenario calibrated on historical GBD 2021 hazard ratios, 
          <strong> NOT a confirmed future prediction</strong>. Real outcomes depend on public health policy execution, healthcare infrastructure, and socioeconomic factors.
        </div>
      </div>

      {/* Top 3 Impact KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl glass-panel reflective-glint shadow-sm">
          <div className="text-xs uppercase font-semibold text-emerald-700 flex items-center justify-between">
            <span>Cumulative Cases Averted</span>
            <TrendingDown className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-slate-900 mt-1">
            {simulation.cumulativeCasesAvertedM}M
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Strokes prevented between 2024 and {params.targetHorizonYear}
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-panel reflective-glint shadow-sm">
          <div className="text-xs uppercase font-semibold text-sky-700 flex items-center justify-between">
            <span>Cumulative Deaths Averted</span>
            <TrendingDown className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-slate-900 mt-1">
            {simulation.cumulativeDeathsAvertedM}M
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Fatalities prevented globally under scenario
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-panel reflective-glint shadow-sm">
          <div className="text-xs uppercase font-semibold text-slate-700 flex items-center justify-between">
            <span>Net Joint Risk Reduction</span>
            <Sparkles className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-sky-700 mt-1">
            -{simulation.netRiskReductionPercent}%
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Joint population attributable risk averted
          </div>
        </div>
      </div>

      {/* Sliders Grid Left, Trajectory Chart Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sliders Column */}
        <div className="glass-panel reflective-glint rounded-2xl p-6 space-y-5 shadow-sm">
          <div className="pb-3 border-b border-slate-200/80">
            <h3 className="text-sm font-bold text-slate-900 heading-rounded uppercase tracking-wide">
              Policy & Risk Levers
            </h3>
            <p className="text-[11px] text-slate-500">
              Simulate percentage changes in global risk factor exposure.
            </p>
          </div>

          {/* Slider 1: Systolic BP */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-800">Systolic BP Control:</span>
              <span className="font-mono text-sky-700 font-bold">+{params.bloodPressureReduction}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={50}
              step={5}
              value={params.bloodPressureReduction}
              onChange={(e) => setParams({ ...params, bloodPressureReduction: Number(e.target.value) })}
              className="w-full accent-sky-600 cursor-pointer"
            />
            <div className="text-[10px] text-slate-500 flex justify-between">
              <span>0% (Status Quo)</span>
              <span>50% (Max Strategy)</span>
            </div>
          </div>

          {/* Slider 2: Smoking */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-800">Smoking Cessation:</span>
              <span className="font-mono text-red-600 font-bold">-{params.smokingReduction}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={60}
              step={5}
              value={params.smokingReduction}
              onChange={(e) => setParams({ ...params, smokingReduction: Number(e.target.value) })}
              className="w-full accent-red-600 cursor-pointer"
            />
            <div className="text-[10px] text-slate-500 flex justify-between">
              <span>0% (No change)</span>
              <span>60% (Broad cessation)</span>
            </div>
          </div>

          {/* Slider 3: Physical Activity */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-800">Aerobic Activity Boost:</span>
              <span className="font-mono text-emerald-700 font-bold">+{params.physicalActivityIncrease}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={50}
              step={5}
              value={params.physicalActivityIncrease}
              onChange={(e) => setParams({ ...params, physicalActivityIncrease: Number(e.target.value) })}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="text-[10px] text-slate-500 flex justify-between">
              <span>0%</span>
              <span>50% Increase</span>
            </div>
          </div>

          {/* Slider 4: Air Pollution */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-800">PM2.5 Air Quality Mitigation:</span>
              <span className="font-mono text-amber-700 font-bold">-{params.airPollutionImprovement}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={40}
              step={5}
              value={params.airPollutionImprovement}
              onChange={(e) => setParams({ ...params, airPollutionImprovement: Number(e.target.value) })}
              className="w-full accent-amber-600 cursor-pointer"
            />
            <div className="text-[10px] text-slate-500 flex justify-between">
              <span>0%</span>
              <span>40% Cleaner Air</span>
            </div>
          </div>

          {/* Target Horizon Year */}
          <div className="space-y-2 pt-3 border-t border-slate-200">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-800">Target Horizon Year:</span>
              <span className="font-mono text-slate-900 font-bold">{params.targetHorizonYear}</span>
            </div>
            <input
              type="range"
              min={2026}
              max={2040}
              step={1}
              value={params.targetHorizonYear}
              onChange={(e) => setParams({ ...params, targetHorizonYear: Number(e.target.value) })}
              className="w-full accent-sky-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Projection Trajectory Chart Column */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 heading-rounded tracking-tight">
                  Baseline vs. Intervention Trajectory
                </h3>
                <p className="text-xs text-slate-500">
                  Annual Incident Strokes (Millions) with 95% Uncertainty Intervals
                </p>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-red-600 inline-block" />
                  <span className="text-slate-600">Baseline (Aging)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-sky-600 inline-block" />
                  <span className="text-sky-800 font-medium">Scenario</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-sky-100 rounded inline-block border border-sky-200" />
                  <span className="text-slate-500">95% UI</span>
                </span>
              </div>
            </div>

            {/* SVG Visual Projection */}
            <div className="mt-6 h-60 w-full relative">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 220" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="uiGradientLight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0284C7" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#0284C7" stopOpacity="0.02" />
                  </linearGradient>
                </defs>

                {/* Grid Lines */}
                <line x1="0" y1="30" x2="1000" y2="30" stroke="#F1F5F9" strokeDasharray="4 4" />
                <line x1="0" y1="90" x2="1000" y2="90" stroke="#F1F5F9" strokeDasharray="4 4" />
                <line x1="0" y1="150" x2="1000" y2="150" stroke="#F1F5F9" strokeDasharray="4 4" />
                <line x1="0" y1="210" x2="1000" y2="210" stroke="#E2E8F0" />

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

                  const upperPoints = points.map((p) => `${p.x},${p.upperY}`).join(' ');
                  const lowerPoints = [...points].reverse().map((p) => `${p.x},${p.lowerY}`).join(' ');

                  return (
                    <>
                      <polygon points={`${upperPoints} ${lowerPoints}`} fill="url(#uiGradientLight)" />
                      <path d={baselinePath} fill="none" stroke="#DC2626" strokeWidth="2.5" strokeDasharray="4 4" />
                      <path d={simPath} fill="none" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />

                      {points.map((p, i) => (
                        <g key={i}>
                          <circle cx={p.x} cy={p.simY} r="4" fill="#0284C7" stroke="#FFFFFF" strokeWidth="2" />
                          {i === points.length - 1 && (
                            <text
                              x={p.x - 10}
                              y={p.simY - 12}
                              fill="#0284C7"
                              fontSize="12"
                              fontFamily="Google Sans Flex, sans-serif"
                              fontWeight="bold"
                            >
                              {p.simulatedCasesM}M
                            </text>
                          )}
                          {i === points.length - 1 && (
                            <text
                              x={p.x - 10}
                              y={p.baselineY - 12}
                              fill="#DC2626"
                              fontSize="12"
                              fontFamily="Google Sans Flex, sans-serif"
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
            <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-3 pt-2 border-t border-slate-200">
              {simulation.results.map((r) => (
                <span key={r.year}>{r.year}</span>
              ))}
            </div>
          </div>

          {/* Model Assumptions Footer */}
          <div className="mt-5 pt-3 border-t border-slate-200 text-[10px] text-slate-500 space-y-1">
            <div>• {simulation.assumptions[0]}</div>
            <div>• {simulation.assumptions[2]}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
