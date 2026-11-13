'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Calendar, 
  Globe2, 
  Info, 
  Layers, 
  Sparkles,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { COUNTRY_DATASET } from '@/data/global-stroke-stats';
import { CountryStrokeData } from '@/types';
import { CountryDetailPanel } from './CountryDetailPanel';

type MapMetric = 'incidenceRate' | 'mortalityRate' | 'prevalenceRate' | 'dalyRate';

const METRIC_LABELS: Record<MapMetric, { label: string; unit: string; color: string }> = {
  incidenceRate: { label: 'Incidence Rate', unit: 'cases / 100k', color: '#22D3EE' },
  mortalityRate: { label: 'Mortality Rate', unit: 'deaths / 100k', color: '#EF4444' },
  prevalenceRate: { label: 'Prevalence Rate', unit: 'survivors / 100k', color: '#3B82F6' },
  dalyRate: { label: 'Disability (DALYs)', unit: 'DALYs / 100k', color: '#F59E0B' },
};

export const InteractiveWorldMap: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<MapMetric>('incidenceRate');
  const [selectedYear, setSelectedYear] = useState<number>(2023);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegionFilter, setSelectedRegionFilter] = useState('All');
  const [activeCountry, setActiveCountry] = useState<CountryStrokeData | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<CountryStrokeData | null>(null);

  // Filtered country list
  const filteredCountries = useMemo(() => {
    return COUNTRY_DATASET.filter((c) => {
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            c.iso.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = selectedRegionFilter === 'All' || c.region.includes(selectedRegionFilter);
      return matchesSearch && matchesRegion;
    });
  }, [searchQuery, selectedRegionFilter]);

  // Color scale helper for value
  const getMetricColor = (val: number, metric: MapMetric) => {
    if (metric === 'incidenceRate') {
      if (val > 250) return '#EF4444'; // critical red
      if (val > 200) return '#F59E0B'; // amber
      if (val > 160) return '#38BDF8'; // cyan-light
      return '#22D3EE';
    }
    if (metric === 'mortalityRate') {
      if (val > 100) return '#EF4444';
      if (val > 60) return '#F97316';
      if (val > 40) return '#F59E0B';
      return '#38BDF8';
    }
    if (metric === 'dalyRate') {
      if (val > 2200) return '#EF4444';
      if (val > 1500) return '#F59E0B';
      return '#22D3EE';
    }
    return '#3B82F6';
  };

  return (
    <div className="space-y-6">
      {/* Control Panel: Filters, Metric, Year, Search */}
      <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        {/* Metric Selector Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono uppercase text-slate-400 mr-1 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Layer:</span>
          </span>
          {(Object.keys(METRIC_LABELS) as MapMetric[]).map((metric) => {
            const isSelected = selectedMetric === metric;
            return (
              <button
                key={metric}
                onClick={() => setSelectedMetric(metric)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-glow-cyan'
                    : 'bg-slate-900/90 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {METRIC_LABELS[metric].label}
              </button>
            );
          })}
        </div>

        {/* Right Tools: Year Selector & Search */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Year Selector */}
          <div className="flex items-center gap-1.5 bg-[#09101d] px-3 py-1.5 rounded-lg border border-slate-800 text-xs">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="bg-transparent text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value={2020}>2020 (Historical)</option>
              <option value={2021}>2021 (GBD Baseline)</option>
              <option value={2022}>2022 (Consolidated)</option>
              <option value={2023}>2023 (Latest Audit)</option>
              <option value={2025}>2025 (Projected)</option>
              <option value={2030}>2030 (Projected)</option>
            </select>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search country or ISO..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-lg bg-[#09101d] border border-slate-800 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 w-44 sm:w-56"
            />
          </div>
        </div>
      </div>

      {/* 3D-Styled Command Map Canvas */}
      <div className="relative rounded-2xl glass-panel border border-cyan-500/20 p-5 sm:p-7 overflow-hidden min-h-[520px] flex flex-col justify-between">
        {/* Subtle scanning radar beam effect */}
        <div className="scanline-effect" />

        {/* Map Header Status & Active Metric Legend */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <Globe2 className="w-5 h-5 text-cyan-400 animate-pulse" />
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white tracking-wide">
                GLOBAL STROKE BURDEN CHOROPLETH (3D PROJECTION)
              </h3>
              <p className="text-xs text-slate-400">
                Visualizing {METRIC_LABELS[selectedMetric].label} across verified national surveillance registries.
              </p>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-400">Burden Scale:</span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-cyan-400 inline-block" />
              <span className="text-slate-300">Lower</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-amber-400 inline-block" />
              <span className="text-slate-300">Moderate</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-red-500 inline-block" />
              <span className="text-slate-300">Critical</span>
            </span>
          </div>
        </div>

        {/* Interactive Futuristic Geographic Matrix */}
        <div className="relative z-10 my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {filteredCountries.length === 0 ? (
            <div className="col-span-full py-16 text-center text-slate-400 text-sm">
              No matching country found. (For unrepresented countries, data is labelled "Data unavailable" per protocol).
            </div>
          ) : (
            filteredCountries.map((country) => {
              const val = country[selectedMetric];
              const color = getMetricColor(val, selectedMetric);
              const isSelected = activeCountry?.iso === country.iso;

              return (
                <div
                  key={country.iso}
                  onClick={() => setActiveCountry(country)}
                  onMouseEnter={() => setHoveredCountry(country)}
                  onMouseLeave={() => setHoveredCountry(null)}
                  className={`cursor-pointer group p-3.5 rounded-xl border transition-all duration-200 relative overflow-hidden ${
                    isSelected
                      ? 'bg-cyan-950/60 border-cyan-400 shadow-glow-cyan'
                      : 'bg-[#0b1322]/80 border-slate-800/80 hover:border-cyan-500/50 hover:bg-[#101b2f]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{country.flagEmoji}</span>
                      <div>
                        <div className="font-bold text-xs text-white group-hover:text-cyan-300 transition-colors">
                          {country.name}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {country.iso} • {country.region}
                        </div>
                      </div>
                    </div>

                    <div
                      className="w-2 h-2 rounded-full mt-1 flex-shrink-0"
                      style={{ backgroundColor: color }}
                    />
                  </div>

                  <div className="mt-3 flex items-baseline justify-between">
                    <span className="text-xs text-slate-400">
                      {METRIC_LABELS[selectedMetric].unit}:
                    </span>
                    <span
                      className="text-base font-extrabold font-mono"
                      style={{ color }}
                    >
                      {val.toLocaleString()}
                    </span>
                  </div>

                  {/* Subtype quick proportion bar */}
                  <div className="mt-2 w-full h-1 bg-slate-800 rounded-full overflow-hidden flex">
                    <div
                      className="h-full bg-cyan-400"
                      style={{ width: `${country.ischemicPercent}%` }}
                      title={`Ischemic: ${country.ischemicPercent}%`}
                    />
                    <div
                      className="h-full bg-red-400"
                      style={{ width: `${country.hemorrhagicPercent}%` }}
                      title={`Hemorrhagic: ${country.hemorrhagicPercent}%`}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Notice */}
        <div className="relative z-10 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
          <div className="flex items-center gap-1.5">
            <Info className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span>Click any country card to inspect its full epidemiological slide-over analytics panel.</span>
          </div>

          <div className="text-[11px] font-mono text-slate-400">
            Audit standard: GBD 2021 & WSO Clinical Surveillance
          </div>
        </div>
      </div>

      {/* Slide-over Analytics Panel */}
      <CountryDetailPanel
        country={activeCountry}
        onClose={() => setActiveCountry(null)}
      />
    </div>
  );
};
