'use client';

import React from 'react';
import { 
  Activity, 
  AlertTriangle, 
  TrendingUp, 
  ShieldCheck, 
  MapPin, 
  FileText,
  Clock,
  HeartPulse
} from 'lucide-react';
import { INDIA_OVERVIEW, INDIA_TRENDS } from '@/data/india-registry-data';
import { IndiaRegistryMap } from './IndiaRegistryMap';

export const IndiaDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0d1b33] via-[#112344] to-[#0d1b33] border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🇮🇳</span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                INDIA STROKE INTELLIGENCE COMMAND
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                ICMR-NCDIR & GBD
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              India bears one of the world's steepest stroke burdens with an estimated <strong>1.85 million new stroke episodes</strong> annually.
              Crucially, hemorrhagic stroke accounts for <strong>~31.5%</strong> of cases—more than double the Western proportion—primarily driven by underdiagnosed primary arterial hypertension.
            </p>
          </div>

          <div className="text-right font-mono">
            <div className="text-xs text-slate-400">NATIONAL CRUDE INCIDENCE</div>
            <div className="text-2xl font-extrabold text-cyan-400">{INDIA_OVERVIEW.crudeIncidenceRateAvg}</div>
            <div className="text-[10px] text-slate-400">per 100,000 population / year</div>
          </div>
        </div>

        {/* Ambient lighting */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 4 Primary India KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl glass-panel border border-slate-800">
          <div className="text-xs font-mono text-slate-400 uppercase">Annual Incident Strokes</div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-300 mt-1">
            {INDIA_OVERVIEW.annualIncidenceDisplay}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">~5,068 new strokes daily</div>
          <div className="mt-2 text-[9px] font-mono text-slate-400">Nationwide Estimate (ICMR/GBD)</div>
        </div>

        <div className="p-4 rounded-xl glass-panel border border-slate-800">
          <div className="text-xs font-mono text-red-400 uppercase">Annual Stroke Mortality</div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-red-400 mt-1">
            {INDIA_OVERVIEW.annualMortalityDisplay}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">~1,972 deaths daily</div>
          <div className="mt-2 text-[9px] font-mono text-slate-400">2nd leading cause of mortality</div>
        </div>

        <div className="p-4 rounded-xl glass-panel border border-slate-800">
          <div className="text-xs font-mono text-amber-400 uppercase">Hemorrhagic Proportion</div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-300 mt-1">
            {INDIA_OVERVIEW.hemorrhagicProportion}%
          </div>
          <div className="text-[10px] text-slate-400 mt-1">vs ~13% Western baseline</div>
          <div className="mt-2 text-[9px] font-mono text-slate-400">High early case fatality</div>
        </div>

        <div className="p-4 rounded-xl glass-panel border border-slate-800">
          <div className="text-xs font-mono text-blue-400 uppercase">Survivors Living With Stroke</div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-blue-300 mt-1">
            {INDIA_OVERVIEW.prevalenceDisplay}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">{INDIA_OVERVIEW.dalysBurden} lost</div>
          <div className="mt-2 text-[9px] font-mono text-slate-400">Prevalence Baseline</div>
        </div>
      </div>

      {/* Distinction Alert: Population Registries vs National Estimates */}
      <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300 leading-relaxed">
          <strong className="text-cyan-300 font-semibold uppercase mr-1">[SURVEILLANCE ARCHITECTURE DISTINCTION]:</strong>
          Population-Based Stroke Registries (PBSR) track all incident strokes in a geographically defined population (e.g. Ludhiana, Cachar, Tirunelveli),
          providing gold-standard localized rates. Hospital-Based Stroke Registries (HBSR) reflect clinical inpatient patterns at tertiary referral centers (e.g. Varanasi, Kota).
          Nationwide totals represent demographic modeling syntheses calibrated against ICMR and GBD data.
        </div>
      </div>

      {/* Sentinel Registries Map & Data */}
      <IndiaRegistryMap />

      {/* India Historical Trends Bar & Trajectory */}
      <div className="p-5 rounded-2xl glass-panel border border-slate-800">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm sm:text-base font-bold text-white tracking-wide">
              INDIA INCIDENCE TRAJECTORY & REGISTRY EXPANSION (2000 – 2030)
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            GBD India Collaborators & ICMR-NCDIR
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {INDIA_TRENDS.map((t) => (
            <div
              key={t.year}
              className={`p-3 rounded-xl border text-center ${
                t.isProjected
                  ? 'bg-purple-950/20 border-purple-500/30 text-purple-200'
                  : 'bg-[#09101d] border-slate-800 text-slate-300'
              }`}
            >
              <div className="text-[11px] font-mono font-bold text-slate-400 flex items-center justify-center gap-1">
                <span>{t.year}</span>
                {t.isProjected && <span className="text-[9px] text-purple-400 font-normal">(Proj)</span>}
              </div>
              <div className="text-lg font-bold font-mono text-cyan-300 mt-1">
                {t.cases}M
              </div>
              <div className="text-[10px] text-red-400 font-mono mt-0.5">
                {t.deaths}M deaths
              </div>
              <div className="mt-2 text-[9px] text-slate-400">
                {t.registrySites} registry sites
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
