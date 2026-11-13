'use client';

import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  Users, 
  Layers, 
  Download, 
  Filter, 
  Check, 
  Info,
  Calendar,
  ShieldCheck
} from 'lucide-react';
import { 
  HISTORICAL_TRENDS, 
  STROKE_SUBTYPES, 
  AGE_DISTRIBUTION, 
  GENDER_DISTRIBUTION, 
  COUNTRY_DATASET 
} from '@/data/global-stroke-stats';
import { RISK_FACTORS } from '@/data/risk-factors';
import { downloadCSV, formatNumber } from '@/lib/utils';
import { CountryStrokeData } from '@/types';

export const AnalyticsCenter: React.FC = () => {
  const [trendMetric, setTrendMetric] = useState<'globalCases' | 'deaths' | 'dalys' | 'indiaCases'>('globalCases');
  const [selectedCountries, setSelectedCountries] = useState<string[]>(['IND', 'CHN', 'USA', 'DEU']);

  const handleExportAll = () => {
    downloadCSV('strokewatch_historical_epidemiology.csv', HISTORICAL_TRENDS);
  };

  const handleToggleCountry = (iso: string) => {
    if (selectedCountries.includes(iso)) {
      if (selectedCountries.length > 1) {
        setSelectedCountries(selectedCountries.filter((c) => c !== iso));
      }
    } else {
      if (selectedCountries.length < 4) {
        setSelectedCountries([...selectedCountries, iso]);
      }
    }
  };

  // Find max value in historical trends for SVG chart scaling
  const maxTrendVal = Math.max(...HISTORICAL_TRENDS.map((t) => (t as any)[trendMetric]));

  return (
    <div className="space-y-6">
      {/* Top Banner & CSV Export Button */}
      <div className="p-5 rounded-2xl glass-panel border border-cyan-500/30 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">
              ADVANCED NEUROVASCULAR ANALYTICS & RESEARCH
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-semibold">
              GBD 2021 AUDIT
            </span>
          </div>
          <p className="text-xs text-slate-300 max-w-2xl">
            Interactive multi-dimensional epidemiological models covering 1990 to 2035.
            Synthesized across WHO, Lancet Neurology, and ICMR-NCDIR registries.
          </p>
        </div>

        <button
          onClick={handleExportAll}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors shadow-glow-cyan"
        >
          <Download className="w-4 h-4" />
          <span>Export Analytics CSV</span>
        </button>
      </div>

      {/* 1. Historical Trends Line / Area Chart */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <span>LONGITUDINAL TRENDS & DEMOGRAPHIC FORECAST (1990 – 2035)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Historical registries (1990–2023) and model-based projections (2025–2035).
            </p>
          </div>

          {/* Metric Selector */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#09101d] border border-slate-800 text-xs">
            <button
              onClick={() => setTrendMetric('globalCases')}
              className={`px-3 py-1 rounded-lg transition-all ${
                trendMetric === 'globalCases' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Global Cases (M)
            </button>
            <button
              onClick={() => setTrendMetric('deaths')}
              className={`px-3 py-1 rounded-lg transition-all ${
                trendMetric === 'deaths' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Global Deaths (M)
            </button>
            <button
              onClick={() => setTrendMetric('dalys')}
              className={`px-3 py-1 rounded-lg transition-all ${
                trendMetric === 'dalys' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              DALYs Lost (M)
            </button>
            <button
              onClick={() => setTrendMetric('indiaCases')}
              className={`px-3 py-1 rounded-lg transition-all ${
                trendMetric === 'indiaCases' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              India Cases (M)
            </button>
          </div>
        </div>

        {/* SVG Interactive Trend Visualizer */}
        <div className="mt-6">
          <div className="h-64 w-full relative">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 240" preserveAspectRatio="none">
              <defs>
                <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="40" x2="1000" y2="40" stroke="#1E293B" strokeDasharray="4 4" />
              <line x1="0" y1="100" x2="1000" y2="100" stroke="#1E293B" strokeDasharray="4 4" />
              <line x1="0" y1="160" x2="1000" y2="160" stroke="#1E293B" strokeDasharray="4 4" />
              <line x1="0" y1="220" x2="1000" y2="220" stroke="#1E293B" />

              {/* Data points path */}
              {(() => {
                const points = HISTORICAL_TRENDS.map((item, index) => {
                  const x = (index / (HISTORICAL_TRENDS.length - 1)) * 1000;
                  const val = (item as any)[trendMetric];
                  const y = 220 - (val / (maxTrendVal * 1.15)) * 180;
                  return { x, y, val, year: item.year, isProjected: item.isProjected };
                });

                const dPath = points.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`, '');
                const areaPath = `${dPath} L 1000 220 L 0 220 Z`;

                return (
                  <>
                    <path d={areaPath} fill="url(#trendGradient)" />
                    <path d={dPath} fill="none" stroke="#22D3EE" strokeWidth="3" strokeLinecap="round" />
                    {points.map((p, i) => (
                      <g key={i}>
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r={p.isProjected ? 5 : 4}
                          fill={p.isProjected ? '#A855F7' : '#22D3EE'}
                          stroke="#080D18"
                          strokeWidth="2"
                        />
                        <text
                          x={p.x}
                          y={p.y - 12}
                          fill="#FFFFFF"
                          fontSize="11"
                          textAnchor="middle"
                          fontFamily="monospace"
                        >
                          {p.val}M
                        </text>
                      </g>
                    ))}
                  </>
                );
              })()}
            </svg>
          </div>

          {/* X-axis years */}
          <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-3 pt-2 border-t border-slate-800">
            {HISTORICAL_TRENDS.map((t) => (
              <span key={t.year} className={t.isProjected ? 'text-purple-400 font-bold' : ''}>
                {t.year} {t.isProjected ? '(P)' : ''}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Middle Row: Subtypes & GBD Risk Attribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pathological Subtypes */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <PieChart className="w-4 h-4 text-cyan-400" />
              <span>PATHOLOGICAL SUBTYPES (GLOBAL BREAKDOWN)</span>
            </h3>
            <span className="text-[10px] font-mono text-cyan-400 font-bold">100% SHARE</span>
          </div>

          <div className="space-y-4">
            {STROKE_SUBTYPES.map((st) => (
              <div key={st.code} className="p-3.5 rounded-xl bg-[#09101d] border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: st.color }} />
                    <span className="font-bold text-white text-xs">{st.name} ({st.code})</span>
                  </div>
                  <span className="font-mono font-extrabold text-sm" style={{ color: st.color }}>
                    {st.share}%
                  </span>
                </div>

                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${st.share}%`, backgroundColor: st.color }} />
                </div>

                <div className="text-[11px] text-slate-300 leading-relaxed">
                  {st.mechanism}
                </div>

                <div className="text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-800/60">
                  <strong className="text-slate-300">Acute Window:</strong> {st.treatmentWindow}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GBD Modifiable Risk Factor Attribution */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>GBD RISK FACTOR ATTRIBUTION (PAF %)</span>
            </h3>
            <span className="text-[10px] font-mono text-emerald-400">87% PREVENTABLE</span>
          </div>

          <p className="text-xs text-slate-400">
            Population Attributable Fraction (PAF) represents the proportion of stroke DALYs averted if risk exposure were reduced to theoretical minimum.
          </p>

          <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
            {RISK_FACTORS.map((rf) => (
              <div key={rf.id} className="p-3 rounded-xl bg-[#09101d] border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-200">{rf.name}</span>
                  <div className="flex items-center gap-3 font-mono">
                    <span className="text-cyan-400">Global: <strong>{rf.globalPAF}%</strong></span>
                    <span className="text-amber-400">India: <strong>{rf.indiaPAF}%</strong></span>
                  </div>
                </div>

                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${rf.globalPAF}%` }} />
                </div>

                <div className="text-[10px] text-slate-400 truncate">
                  {rf.actionableStep}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Age Cohort & Gender Matrix */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-cyan-400" />
            <span>AGE & GENDER EPIDEMIOLOGICAL PYRAMID</span>
          </h3>
          <span className="text-[10px] font-mono text-slate-400">GBD 2021 AGE COHORTS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Age Cohorts Bar */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Age Cohort Distribution of Incident Strokes
            </h4>

            <div className="space-y-2.5">
              {AGE_DISTRIBUTION.map((ac) => (
                <div key={ac.range} className="space-y-1 text-xs">
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="font-semibold text-white">{ac.range}</span>
                    <span className="font-mono text-cyan-300">{ac.percent}% ({ac.countM}M cases)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${ac.percent * 2.5}%` }} />
                  </div>
                  <div className="text-[10px] text-slate-400">{ac.note}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Gender Comparison Cards */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Gender-Stratified Lifetime Vulnerability
            </h4>

            <div className="grid grid-cols-2 gap-3">
              {GENDER_DISTRIBUTION.map((g) => (
                <div key={g.gender} className="p-4 rounded-xl bg-[#09101d] border border-slate-800 space-y-2 text-center">
                  <div className="text-xs font-mono uppercase text-slate-400">{g.gender} Cohort</div>
                  <div className="text-2xl font-black font-mono text-white">{g.incidenceShare}%</div>
                  <div className="text-[11px] text-slate-400">Share of Incident Strokes</div>

                  <div className="pt-2 border-t border-slate-800/80 text-xs">
                    <div className="text-slate-400 text-[10px]">Lifetime Risk:</div>
                    <div className="font-bold text-cyan-400 font-mono">{g.lifetimeRisk}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed">
              <strong>Key Gender Insight:</strong> While men have higher age-adjusted stroke incidence in middle age, women have higher lifetime stroke mortality due to longer life expectancy and post-menopausal vascular risk escalation.
            </div>
          </div>
        </div>
      </div>

      {/* 4. Multi-Country Comparison Matrix */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white">
              MULTI-COUNTRY COMPARISON MATRIX (SELECT UP TO 4)
            </h3>
            <p className="text-xs text-slate-400">
              Side-by-side benchmarking of national stroke indicators.
            </p>
          </div>

          {/* Quick Select Buttons */}
          <div className="flex flex-wrap gap-1.5">
            {COUNTRY_DATASET.slice(0, 8).map((c) => {
              const isSelected = selectedCountries.includes(c.iso);
              return (
                <button
                  key={c.iso}
                  onClick={() => handleToggleCountry(c.iso)}
                  className={`px-2.5 py-1 text-xs rounded-lg border font-mono transition-colors flex items-center gap-1 ${
                    isSelected
                      ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400'
                      : 'bg-[#09101d] border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <span>{c.flagEmoji}</span>
                  <span>{c.iso}</span>
                  {isSelected && <Check className="w-3 h-3 ml-0.5" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono text-[10px]">
                <th className="pb-2">Country</th>
                <th className="pb-2">Incidence / 100k</th>
                <th className="pb-2">Mortality / 100k</th>
                <th className="pb-2">DALYs / 100k</th>
                <th className="pb-2">Annual Incident Total</th>
                <th className="pb-2">Ischemic %</th>
                <th className="pb-2">Hemorrhagic %</th>
                <th className="pb-2">Data Quality</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans text-slate-200">
              {COUNTRY_DATASET.filter((c) => selectedCountries.includes(c.iso)).map((c) => (
                <tr key={c.iso} className="hover:bg-slate-800/30">
                  <td className="py-3 font-semibold text-white flex items-center gap-2">
                    <span className="text-lg">{c.flagEmoji}</span>
                    <span>{c.name}</span>
                  </td>
                  <td className="py-3 font-mono text-cyan-300 font-bold">{c.incidenceRate}</td>
                  <td className="py-3 font-mono text-red-400">{c.mortalityRate}</td>
                  <td className="py-3 font-mono text-amber-400">{c.dalyRate}</td>
                  <td className="py-3 font-mono text-white">{formatNumber(c.annualCases)}</td>
                  <td className="py-3 font-mono text-cyan-300">{c.ischemicPercent}%</td>
                  <td className="py-3 font-mono text-red-400">{c.hemorrhagicPercent}%</td>
                  <td className="py-3 font-mono">
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-[10px] text-slate-300">
                      {c.dataQuality}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
