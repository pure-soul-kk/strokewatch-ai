'use client';

import React from 'react';
import { X, ShieldCheck, Activity, Users, HeartPulse, FileText, AlertCircle, ArrowUpRight } from 'lucide-react';
import { CountryStrokeData } from '@/types';
import { formatNumber } from '@/lib/utils';

interface CountryDetailPanelProps {
  country: CountryStrokeData | null;
  onClose: () => void;
}

export const CountryDetailPanel: React.FC<CountryDetailPanelProps> = ({ country, onClose }) => {
  if (!country) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#0c1424] border-l border-cyan-500/30 shadow-2xl p-6 overflow-y-auto backdrop-blur-2xl animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{country.flagEmoji}</span>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              {country.name}
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>{country.region}</span>
              <span>•</span>
              <span className="font-mono">{country.iso}</span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main KPI Badges */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="text-[11px] text-slate-400 uppercase font-mono">Annual Incidence</div>
          <div className="text-xl font-bold font-mono text-cyan-300 mt-1">
            {country.incidenceRate}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">per 100,000 population</div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="text-[11px] text-slate-400 uppercase font-mono">Annual Mortality</div>
          <div className="text-xl font-bold font-mono text-red-400 mt-1">
            {country.mortalityRate}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">per 100,000 population</div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="text-[11px] text-slate-400 uppercase font-mono">Disability Burden</div>
          <div className="text-xl font-bold font-mono text-amber-400 mt-1">
            {country.dalyRate}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">DALYs / 100k people</div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="text-[11px] text-slate-400 uppercase font-mono">Estimated Prevalence</div>
          <div className="text-xl font-bold font-mono text-blue-400 mt-1">
            {country.prevalenceRate}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">survivors / 100k</div>
        </div>
      </div>

      {/* Absolute Population & Annual Totals */}
      <div className="mt-5 p-4 rounded-xl bg-[#111c30] border border-slate-800 space-y-3">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between">
          <span>National Volume Totals</span>
          <span className="font-mono text-slate-400 text-[11px]">{country.population}M Population</span>
        </h4>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between items-center text-slate-300">
            <span>Estimated Annual Cases:</span>
            <span className="font-mono font-bold text-white">{formatNumber(country.annualCases)}</span>
          </div>
          <div className="flex justify-between items-center text-slate-300">
            <span>Estimated Annual Deaths:</span>
            <span className="font-mono font-bold text-red-400">{formatNumber(country.annualDeaths)}</span>
          </div>
        </div>
      </div>

      {/* Pathological Subtype Breakdown */}
      <div className="mt-5 p-4 rounded-xl bg-[#111c30] border border-slate-800">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
          Stroke Subtype Distribution
        </h4>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-cyan-300">Ischemic Stroke (Blockage)</span>
              <span className="font-mono font-bold text-white">{country.ischemicPercent}%</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-cyan-400 rounded-full"
                style={{ width: `${country.ischemicPercent}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-red-300">Hemorrhagic Stroke (Bleed)</span>
              <span className="font-mono font-bold text-white">{country.hemorrhagicPercent}%</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-400 rounded-full"
                style={{ width: `${country.hemorrhagicPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Data Quality and Primary Attribution */}
      <div className="mt-5 p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Registry Quality Score:</span>
          <span
            className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-full ${
              country.dataQuality === 'High'
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                : country.dataQuality === 'Moderate'
                ? 'bg-blue-950 text-blue-300 border border-blue-500/30'
                : 'bg-amber-950 text-amber-300 border border-amber-500/30'
            }`}
          >
            {country.dataQuality}
          </span>
        </div>

        <div className="flex items-center justify-between text-slate-400">
          <span>Surveillance Baseline:</span>
          <span className="font-mono text-slate-300">Year {country.year}</span>
        </div>

        <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed">
          <strong className="text-slate-300">Source:</strong> {country.source}
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-6 flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors"
        >
          Close Detail Panel
        </button>
      </div>
    </div>
  );
};
