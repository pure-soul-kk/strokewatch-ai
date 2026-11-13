'use client';

import React from 'react';
import { 
  TrendingUp, 
  ShieldCheck
} from 'lucide-react';
import { INDIA_OVERVIEW, INDIA_TRENDS } from '@/data/india-registry-data';
import { IndiaRegistryMap } from './IndiaRegistryMap';

export const IndiaDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="p-6 rounded-2xl glass-panel reflective-glint shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🇮🇳</span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 heading-rounded tracking-tight">
                India Stroke Intelligence Command
              </h2>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/80 text-sky-800 border border-sky-200/80 shadow-sm">
                ICMR-NCDIR & GBD
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
              India bears one of the world's steepest stroke burdens with an estimated <strong>1.85 million new stroke episodes</strong> annually.
              Crucially, hemorrhagic stroke accounts for <strong>~31.5%</strong> of cases—more than double the Western proportion—primarily driven by underdiagnosed primary arterial hypertension.
            </p>
          </div>

          <div className="text-right p-4 rounded-xl reflective-subcard shadow-sm">
            <div className="text-xs text-slate-500 uppercase font-semibold">National Crude Incidence</div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono">{INDIA_OVERVIEW.crudeIncidenceRateAvg}</div>
            <div className="text-[10px] text-slate-500">per 100,000 population / year</div>
          </div>
        </div>
      </div>

      {/* 4 Primary India KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl glass-panel reflective-glint">
          <div className="text-xs text-slate-500 uppercase font-semibold">Annual Incident Strokes</div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 mt-1">
            {INDIA_OVERVIEW.annualIncidenceDisplay}
          </div>
          <div className="text-[10px] text-slate-500 mt-1">~5,068 new strokes daily</div>
          <div className="mt-2 text-[9px] text-slate-500">Nationwide Estimate (ICMR/GBD)</div>
        </div>

        <div className="p-4 rounded-xl glass-panel reflective-glint">
          <div className="text-xs text-red-600 uppercase font-semibold">Annual Stroke Mortality</div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-red-600 mt-1">
            {INDIA_OVERVIEW.annualMortalityDisplay}
          </div>
          <div className="text-[10px] text-slate-500 mt-1">~1,972 deaths daily</div>
          <div className="mt-2 text-[9px] text-slate-500">2nd leading cause of mortality</div>
        </div>

        <div className="p-4 rounded-xl glass-panel reflective-glint">
          <div className="text-xs text-amber-700 uppercase font-semibold">Hemorrhagic Proportion</div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-700 mt-1">
            {INDIA_OVERVIEW.hemorrhagicProportion}%
          </div>
          <div className="text-[10px] text-slate-500 mt-1">vs ~13% Western baseline</div>
          <div className="mt-2 text-[9px] text-slate-500">High early case fatality</div>
        </div>

        <div className="p-4 rounded-xl glass-panel reflective-glint">
          <div className="text-xs text-sky-700 uppercase font-semibold">Survivors Living With Stroke</div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-sky-800 mt-1">
            {INDIA_OVERVIEW.prevalenceDisplay}
          </div>
          <div className="text-[10px] text-slate-500 mt-1">{INDIA_OVERVIEW.dalysBurden} lost</div>
          <div className="mt-2 text-[9px] text-slate-500">Prevalence Baseline</div>
        </div>
      </div>

      {/* Distinction Alert: Population Registries vs National Estimates */}
      <div className="p-4 rounded-xl reflective-subcard flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-sky-900 leading-relaxed">
          <strong className="text-sky-800 font-semibold uppercase mr-1">[SURVEILLANCE ARCHITECTURE DISTINCTION]:</strong>
          Population-Based Stroke Registries (PBSR) track all incident strokes in a geographically defined population (e.g. Ludhiana, Cachar, Tirunelveli),
          providing gold-standard localized rates. Hospital-Based Stroke Registries (HBSR) reflect clinical inpatient patterns at tertiary referral centers (e.g. Varanasi, Kota).
          Nationwide totals represent demographic modeling syntheses calibrated against ICMR and GBD data.
        </div>
      </div>

      {/* Sentinel Registries Map & Data */}
      <IndiaRegistryMap />

      {/* India Historical Trends */}
      <div className="p-5 rounded-2xl glass-panel reflective-glint">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-sky-600" />
            <h3 className="text-sm sm:text-base font-bold text-slate-900 heading-rounded tracking-tight">
              India Incidence Trajectory & Registry Expansion (2000 – 2030)
            </h3>
          </div>
          <span className="text-[10px] text-slate-500">
            GBD India Collaborators & ICMR-NCDIR
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {INDIA_TRENDS.map((t) => (
            <div
              key={t.year}
              className={`p-3 rounded-xl reflective-subcard text-center ${
                t.isProjected
                  ? 'border-purple-200/90 text-purple-900'
                  : 'text-slate-700'
              }`}
            >
              <div className="text-[11px] font-bold text-slate-600 flex items-center justify-center gap-1">
                <span>{t.year}</span>
                {t.isProjected && <span className="text-[9px] text-purple-600 font-normal">(Proj)</span>}
              </div>
              <div className="text-lg font-bold font-mono text-slate-900 mt-1">
                {t.cases}M
              </div>
              <div className="text-[10px] text-red-600 font-mono mt-0.5">
                {t.deaths}M deaths
              </div>
              <div className="mt-2 text-[9px] text-slate-500">
                {t.registrySites} sites
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
