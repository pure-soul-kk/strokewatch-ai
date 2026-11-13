'use client';

import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  Users, 
  Layers, 
  Download, 
  Check 
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

  const maxTrendVal = Math.max(...HISTORICAL_TRENDS.map((t) => (t as any)[trendMetric]));

  return (
    <div className="space-y-6">
      {/* Top Banner & CSV Export Button */}
      <div className="p-5 rounded-2xl glass-panel reflective-glint flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 className="w-5 h-5 text-sky-600" />
            <h2 className="text-xl font-bold text-slate-900 heading-rounded tracking-tight">
              Advanced Neurovascular Analytics & Research
            </h2>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/80 text-sky-800 border border-sky-200/80 shadow-sm">
              GBD 2021 AUDIT
            </span>
          </div>
          <p className="text-xs text-slate-600 max-w-2xl">
            Interactive multi-dimensional epidemiological models covering 1990 to 2035.
            Synthesized across WHO, Lancet Neurology, and ICMR-NCDIR registries.
          </p>
        </div>

        <button
          onClick={handleExportAll}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors shadow-sm heading-rounded border-t border-slate-700"
        >
          <Download className="w-4 h-4" />
          <span>Export Analytics CSV</span>
        </button>
      </div>

      {/* 1. Historical Trends Line / Area Chart */}
      <div className="p-6 rounded-2xl glass-panel reflective-glint shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
          <div>
            <h3 className="text-base font-bold text-slate-900 heading-rounded tracking-tight flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-sky-600" />
              <span>Longitudinal Trends & Demographic Forecast (1990 – 2035)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Historical registries (1990–2023) and model-based projections (2025–2035).
            </p>
          </div>

          {/* Metric Selector */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/60 border border-slate-200/80 backdrop-blur-md shadow-inner text-xs">
            <button
              onClick={() => setTrendMetric('globalCases')}
              className={`px-3 py-1 rounded-lg transition-all ${
                trendMetric === 'globalCases' ? 'reflective-pill-active font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-white/70'
              }`}
            >
              Global Cases (M)
            </button>
            <button
              onClick={() => setTrendMetric('deaths')}
              className={`px-3 py-1 rounded-lg transition-all ${
                trendMetric === 'deaths' ? 'reflective-pill-active font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-white/70'
              }`}
            >
              Global Deaths (M)
            </button>
            <button
              onClick={() => setTrendMetric('dalys')}
              className={`px-3 py-1 rounded-lg transition-all ${
                trendMetric === 'dalys' ? 'reflective-pill-active font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-white/70'
              }`}
            >
              DALYs Lost (M)
            </button>
            <button
              onClick={() => setTrendMetric('indiaCases')}
              className={`px-3 py-1 rounded-lg transition-all ${
                trendMetric === 'indiaCases' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              India Cases (M)
            </button>
          </div>
        </div>

        {/* SVG Trend Visualizer */}
        <div className="mt-6">
          <div className="h-64 w-full relative">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 240" preserveAspectRatio="none">
              <defs>
                <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0284C7" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#0284C7" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="40" x2="1000" y2="40" stroke="#F1F5F9" strokeDasharray="4 4" />
              <line x1="0" y1="100" x2="1000" y2="100" stroke="#F1F5F9" strokeDasharray="4 4" />
              <line x1="0" y1="160" x2="1000" y2="160" stroke="#F1F5F9" strokeDasharray="4 4" />
              <line x1="0" y1="220" x2="1000" y2="220" stroke="#E2E8F0" />

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
                    <path d={dPath} fill="none" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
                    {points.map((p, i) => (
                      <g key={i}>
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r={p.isProjected ? 5 : 4}
                          fill={p.isProjected ? '#9333EA' : '#0284C7'}
                          stroke="#FFFFFF"
                          strokeWidth="2"
                        />
                        <text
                          x={p.x}
                          y={p.y - 12}
                          fill="#0F172A"
                          fontSize="11"
                          fontWeight="bold"
                          textAnchor="middle"
                          fontFamily="Google Sans Flex, sans-serif"
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
          <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-3 pt-2 border-t border-slate-200">
            {HISTORICAL_TRENDS.map((t) => (
              <span key={t.year} className={t.isProjected ? 'text-purple-700 font-bold' : ''}>
                {t.year} {t.isProjected ? '(P)' : ''}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Middle Row: Subtypes & GBD Risk Attribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pathological Subtypes */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-200 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <h3 className="text-base font-bold text-slate-900 heading-rounded tracking-tight flex items-center gap-2">
              <PieChart className="w-4 h-4 text-sky-600" />
              <span>Pathological Subtypes (Global Share)</span>
            </h3>
            <span className="text-[10px] font-bold text-slate-500">100% TOTAL</span>
          </div>

          <div className="space-y-3.5">
            {STROKE_SUBTYPES.map((st) => (
              <div key={st.code} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: st.color }} />
                    <span className="font-bold text-slate-900 text-xs heading-rounded">{st.name} ({st.code})</span>
                  </div>
                  <span className="font-mono font-extrabold text-sm text-slate-900">
                    {st.share}%
                  </span>
                </div>

                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${st.share}%`, backgroundColor: st.color }} />
                </div>

                <div className="text-[11px] text-slate-600 leading-relaxed">
                  {st.mechanism}
                </div>

                <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-200">
                  <strong className="text-slate-700">Treatment Window:</strong> {st.treatmentWindow}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GBD Modifiable Risk Factor Attribution */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-200 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <h3 className="text-base font-bold text-slate-900 heading-rounded tracking-tight flex items-center gap-2">
              <Layers className="w-4 h-4 text-sky-600" />
              <span>GBD Risk Factor Attribution (PAF %)</span>
            </h3>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">87% PREVENTABLE</span>
          </div>

          <p className="text-xs text-slate-500">
            Population Attributable Fraction (PAF) represents the proportion of stroke DALYs averted if risk exposure were reduced to theoretical minimum.
          </p>

          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {RISK_FACTORS.map((rf) => (
              <div key={rf.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-900">{rf.name}</span>
                  <div className="flex items-center gap-3 font-mono">
                    <span className="text-sky-700">Global: <strong>{rf.globalPAF}%</strong></span>
                    <span className="text-amber-800">India: <strong>{rf.indiaPAF}%</strong></span>
                  </div>
                </div>

                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-sky-600 rounded-full" style={{ width: `${rf.globalPAF}%` }} />
                </div>

                <div className="text-[10px] text-slate-500 truncate">
                  {rf.actionableStep}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Age Cohort & Gender Matrix */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-200 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <h3 className="text-base font-bold text-slate-900 heading-rounded tracking-tight flex items-center gap-2">
            <Users className="w-4 h-4 text-sky-600" />
            <span>Age & Gender Epidemiological Cohorts</span>
          </h3>
          <span className="text-[10px] text-slate-500">GBD 2021 AGE COHORTS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Age Cohorts Bar */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 heading-rounded uppercase tracking-wide">
              Age Cohort Distribution of Incident Strokes
            </h4>

            <div className="space-y-2.5">
              {AGE_DISTRIBUTION.map((ac) => (
                <div key={ac.range} className="space-y-1 text-xs">
                  <div className="flex justify-between items-center text-slate-700">
                    <span className="font-semibold text-slate-900">{ac.range}</span>
                    <span className="font-mono text-slate-700">{ac.percent}% ({ac.countM}M cases)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-sky-600 rounded-full" style={{ width: `${ac.percent * 2.5}%` }} />
                  </div>
                  <div className="text-[10px] text-slate-500">{ac.note}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Gender Comparison Cards */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 heading-rounded uppercase tracking-wide">
              Gender-Stratified Lifetime Vulnerability
            </h4>

            <div className="grid grid-cols-2 gap-3">
              {GENDER_DISTRIBUTION.map((g) => (
                <div key={g.gender} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-center">
                  <div className="text-xs uppercase font-semibold text-slate-500">{g.gender} Cohort</div>
                  <div className="text-2xl font-extrabold font-mono text-slate-900">{g.incidenceShare}%</div>
                  <div className="text-[11px] text-slate-500">Share of Incident Strokes</div>

                  <div className="pt-2 border-t border-slate-200 text-xs">
                    <div className="text-slate-500 text-[10px]">Lifetime Risk:</div>
                    <div className="font-bold text-sky-700 font-mono">{g.lifetimeRisk}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
              <strong>Key Gender Insight:</strong> While men have higher age-adjusted stroke incidence in middle age, women experience higher absolute lifetime stroke mortality due to longer longevity and post-menopausal vascular risk factors.
            </div>
          </div>
        </div>
      </div>

      {/* 4. Multi-Country Comparison Matrix */}
      <div className="p-6 rounded-2xl glass-panel reflective-glint space-y-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-200/80">
          <div>
            <h3 className="text-base font-bold text-slate-900 heading-rounded tracking-tight">
              Multi-Country Comparison Matrix
            </h3>
            <p className="text-xs text-slate-500">
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
                  className={`px-3 py-1 text-xs rounded-xl font-medium transition-all flex items-center gap-1 ${
                    isSelected
                      ? 'reflective-pill-active font-bold shadow-sm'
                      : 'reflective-pill text-slate-700 hover:text-slate-900'
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
              <tr className="border-b border-slate-200 text-slate-500 font-semibold text-[10px]">
                <th className="pb-2.5">Country</th>
                <th className="pb-2.5">Incidence / 100k</th>
                <th className="pb-2.5">Mortality / 100k</th>
                <th className="pb-2.5">DALYs / 100k</th>
                <th className="pb-2.5">Annual Total</th>
                <th className="pb-2.5">Ischemic %</th>
                <th className="pb-2.5">Hemorrhagic %</th>
                <th className="pb-2.5">Data Quality</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans text-slate-700">
              {COUNTRY_DATASET.filter((c) => selectedCountries.includes(c.iso)).map((c) => (
                <tr key={c.iso} className="hover:bg-slate-50">
                  <td className="py-3 font-semibold text-slate-900 flex items-center gap-2 heading-rounded">
                    <span className="text-lg">{c.flagEmoji}</span>
                    <span>{c.name}</span>
                  </td>
                  <td className="py-3 font-mono text-slate-900 font-bold">{c.incidenceRate}</td>
                  <td className="py-3 font-mono text-red-600 font-semibold">{c.mortalityRate}</td>
                  <td className="py-3 font-mono text-amber-700">{c.dalyRate}</td>
                  <td className="py-3 font-mono text-slate-900">{formatNumber(c.annualCases)}</td>
                  <td className="py-3 font-mono text-sky-700">{c.ischemicPercent}%</td>
                  <td className="py-3 font-mono text-red-600">{c.hemorrhagicPercent}%</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[10px] text-slate-700 font-medium">
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
