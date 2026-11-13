'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Calendar, 
  Globe2, 
  Info, 
  Layers
} from 'lucide-react';
import { COUNTRY_DATASET } from '@/data/global-stroke-stats';
import { CountryStrokeData } from '@/types';
import { CountryDetailPanel } from './CountryDetailPanel';

type MapMetric = 'incidenceRate' | 'mortalityRate' | 'prevalenceRate' | 'dalyRate';

const METRIC_LABELS: Record<MapMetric, { label: string; unit: string }> = {
  incidenceRate: { label: 'Incidence Rate', unit: 'cases / 100k' },
  mortalityRate: { label: 'Mortality Rate', unit: 'deaths / 100k' },
  prevalenceRate: { label: 'Prevalence Rate', unit: 'survivors / 100k' },
  dalyRate: { label: 'Disability (DALYs)', unit: 'DALYs / 100k' },
};

export const InteractiveWorldMap: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<MapMetric>('incidenceRate');
  const [selectedYear, setSelectedYear] = useState<number>(2023);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCountry, setActiveCountry] = useState<CountryStrokeData | null>(null);

  const filteredCountries = useMemo(() => {
    return COUNTRY_DATASET.filter((c) => {
      return c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             c.iso.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [searchQuery]);

  const getMetricBadgeStyle = (val: number, metric: MapMetric) => {
    if (metric === 'incidenceRate') {
      if (val > 250) return 'text-red-700 bg-red-50 border-red-200';
      if (val > 200) return 'text-amber-700 bg-amber-50 border-amber-200';
      return 'text-sky-700 bg-sky-50 border-sky-200';
    }
    if (metric === 'mortalityRate') {
      if (val > 100) return 'text-red-700 bg-red-50 border-red-200';
      if (val > 50) return 'text-amber-700 bg-amber-50 border-amber-200';
      return 'text-sky-700 bg-sky-50 border-sky-200';
    }
    return 'text-slate-800 bg-slate-100 border-slate-200';
  };

  return (
    <div className="space-y-6">
      {/* Control Panel: Filters, Metric, Year, Search */}
      <div className="p-4 sm:p-5 rounded-2xl glass-panel reflective-glint flex flex-wrap items-center justify-between gap-4 shadow-sm">
        {/* Metric Selector Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-sky-600" />
            <span>Indicator:</span>
          </span>
          {(Object.keys(METRIC_LABELS) as MapMetric[]).map((metric) => {
            const isSelected = selectedMetric === metric;
            return (
              <button
                key={metric}
                onClick={() => setSelectedMetric(metric)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                  isSelected
                    ? 'reflective-pill-active font-bold shadow-sm'
                    : 'reflective-pill text-slate-700 hover:text-slate-900'
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
          <div className="flex items-center gap-1.5 reflective-pill px-3 py-1.5 rounded-xl text-xs">
            <Calendar className="w-3.5 h-3.5 text-sky-600" />
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="bg-transparent text-slate-800 font-medium focus:outline-none cursor-pointer"
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
              className="pl-8 pr-3 py-1.5 rounded-xl reflective-input text-xs text-slate-900 placeholder-slate-400 focus:outline-none w-44 sm:w-56"
            />
          </div>
        </div>
      </div>

      {/* Command Map Canvas */}
      <div className="rounded-2xl glass-panel reflective-glint p-5 sm:p-7 flex flex-col justify-between shadow-sm">
        {/* Map Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
          <div className="flex items-center gap-2.5">
            <Globe2 className="w-5 h-5 text-sky-600" />
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 heading-rounded tracking-tight">
                Global Stroke Burden Choropleth & Registry Explorer
              </h3>
              <p className="text-xs text-slate-500">
                Visualizing {METRIC_LABELS[selectedMetric].label} across verified national surveillance registries.
              </p>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">Scale:</span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block" />
              <span className="text-slate-700">Lower</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
              <span className="text-slate-700">Moderate</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block" />
              <span className="text-slate-700">Elevated</span>
            </span>
          </div>
        </div>

        {/* Geographic Grid */}
        <div className="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {filteredCountries.length === 0 ? (
            <div className="col-span-full py-16 text-center text-slate-500 text-sm">
              No matching country found. (For unlisted countries, data is labelled "Data unavailable" per protocol).
            </div>
          ) : (
            filteredCountries.map((country) => {
              const val = country[selectedMetric];
              const badgeStyle = getMetricBadgeStyle(val, selectedMetric);
              const isSelected = activeCountry?.iso === country.iso;

              return (
                <div
                  key={country.iso}
                  onClick={() => setActiveCountry(country)}
                  className={`cursor-pointer p-3.5 rounded-xl transition-all duration-200 ${
                    isSelected
                      ? 'reflective-subcard bg-white/95 border-sky-300 ring-2 ring-sky-300 shadow-md'
                      : 'reflective-subcard text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{country.flagEmoji}</span>
                      <div>
                        <div className="font-bold text-xs text-slate-900 heading-rounded">
                          {country.name}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {country.iso} • {country.region}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-baseline justify-between">
                    <span className="text-xs text-slate-500">
                      {METRIC_LABELS[selectedMetric].unit}:
                    </span>
                    <span
                      className={`text-sm font-bold font-mono px-2 py-0.5 rounded border ${badgeStyle}`}
                    >
                      {val.toLocaleString()}
                    </span>
                  </div>

                  {/* Subtype quick proportion bar */}
                  <div className="mt-2.5 w-full h-1.5 bg-slate-100 rounded-full overflow-hidden flex">
                    <div
                      className="h-full bg-sky-600"
                      style={{ width: `${country.ischemicPercent}%` }}
                      title={`Ischemic: ${country.ischemicPercent}%`}
                    />
                    <div
                      className="h-full bg-red-600"
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
        <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
          <div className="flex items-center gap-1.5">
            <Info className="w-4 h-4 text-sky-600 flex-shrink-0" />
            <span>Click any country card to inspect its full epidemiological breakdown.</span>
          </div>

          <div className="text-[11px] text-slate-500">
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
