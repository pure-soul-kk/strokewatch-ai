'use client';

import React from 'react';
import { X } from 'lucide-react';
import { CountryStrokeData } from '@/types';
import { formatNumber } from '@/lib/utils';

interface CountryDetailPanelProps {
  country: CountryStrokeData | null;
  onClose: () => void;
}

export const CountryDetailPanel: React.FC<CountryDetailPanelProps> = ({ country, onClose }) => {
  if (!country) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white border-l border-slate-200 shadow-xl p-6 overflow-y-auto animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{country.flagEmoji}</span>
          <div>
            <h2 className="text-xl font-bold text-slate-900 heading-rounded tracking-tight">
              {country.name}
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>{country.region}</span>
              <span>•</span>
              <span className="font-mono">{country.iso}</span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main KPI Badges */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
          <div className="text-[11px] text-slate-500 uppercase font-semibold">Annual Incidence</div>
          <div className="text-xl font-bold font-mono text-sky-700 mt-1">
            {country.incidenceRate}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">per 100,000 population</div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
          <div className="text-[11px] text-slate-500 uppercase font-semibold">Annual Mortality</div>
          <div className="text-xl font-bold font-mono text-red-600 mt-1">
            {country.mortalityRate}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">per 100,000 population</div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
          <div className="text-[11px] text-slate-500 uppercase font-semibold">Disability Burden</div>
          <div className="text-xl font-bold font-mono text-amber-700 mt-1">
            {country.dalyRate}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">DALYs / 100k people</div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
          <div className="text-[11px] text-slate-500 uppercase font-semibold">Estimated Prevalence</div>
          <div className="text-xl font-bold font-mono text-slate-800 mt-1">
            {country.prevalenceRate}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">survivors / 100k</div>
        </div>
      </div>

      {/* Absolute Population & Annual Totals */}
      <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
        <h4 className="text-xs font-bold text-slate-900 heading-rounded uppercase tracking-wide flex items-center justify-between">
          <span>National Volume Totals</span>
          <span className="font-mono text-slate-500 text-[11px]">{country.population}M Population</span>
        </h4>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between items-center text-slate-700">
            <span>Estimated Annual Cases:</span>
            <span className="font-mono font-bold text-slate-900">{formatNumber(country.annualCases)}</span>
          </div>
          <div className="flex justify-between items-center text-slate-700">
            <span>Estimated Annual Deaths:</span>
            <span className="font-mono font-bold text-red-600">{formatNumber(country.annualDeaths)}</span>
          </div>
        </div>
      </div>

      {/* Pathological Subtype Breakdown */}
      <div className="mt-5 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
        <h4 className="text-xs font-bold text-slate-900 heading-rounded uppercase tracking-wide mb-3">
          Stroke Subtype Distribution
        </h4>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-sky-700 font-medium">Ischemic Stroke (Blockage)</span>
              <span className="font-mono font-bold text-slate-900">{country.ischemicPercent}%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-sky-600 rounded-full"
                style={{ width: `${country.ischemicPercent}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-red-700 font-medium">Hemorrhagic Stroke (Bleed)</span>
              <span className="font-mono font-bold text-slate-900">{country.hemorrhagicPercent}%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-600 rounded-full"
                style={{ width: `${country.hemorrhagicPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Data Quality and Primary Attribution */}
      <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Registry Quality Score:</span>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              country.dataQuality === 'High'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : country.dataQuality === 'Moderate'
                ? 'bg-sky-50 text-sky-700 border border-sky-200'
                : 'bg-amber-50 text-amber-700 border border-amber-200'
            }`}
          >
            {country.dataQuality}
          </span>
        </div>

        <div className="flex items-center justify-between text-slate-600">
          <span>Surveillance Baseline:</span>
          <span className="font-mono text-slate-800">Year {country.year}</span>
        </div>

        <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 leading-relaxed">
          <strong className="text-slate-700">Source:</strong> {country.source}
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-6">
        <button
          onClick={onClose}
          className="w-full py-2.5 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition-colors"
        >
          Close Detail Panel
        </button>
      </div>
    </div>
  );
};
