'use client';

import React, { useState } from 'react';
import { INDIA_REGISTRIES, INDIA_REGIONAL_COMPARISON } from '@/data/india-registry-data';
import { IndiaRegistryData } from '@/types';
import { MapPin, Info } from 'lucide-react';

export const IndiaRegistryMap: React.FC = () => {
  const [selectedRegistry, setSelectedRegistry] = useState<IndiaRegistryData>(INDIA_REGISTRIES[0]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Registry Selector & Table */}
      <div className="lg:col-span-2 glass-panel reflective-glint rounded-2xl p-5 flex flex-col justify-between shadow-sm">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-sky-600" />
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 heading-rounded tracking-tight">
                  ICMR-NCDIR Stroke Surveillance Registries (India)
                </h3>
                <p className="text-xs text-slate-500">
                  Select a sentinel surveillance center to inspect epidemiological data.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/80 text-emerald-800 border border-emerald-200/80 shadow-sm">
              6 SENTINEL SITES
            </span>
          </div>

          {/* Registry Site Selection Pills */}
          <div className="my-5 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {INDIA_REGISTRIES.map((reg) => {
              const isSelected = selectedRegistry.id === reg.id;
              return (
                <button
                  key={reg.id}
                  onClick={() => setSelectedRegistry(reg)}
                  className={`p-3 rounded-xl text-left transition-all ${
                    isSelected
                      ? 'reflective-subcard bg-white/95 border-sky-300 ring-2 ring-sky-300 shadow-md'
                      : 'reflective-subcard text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900 heading-rounded">{reg.city}</span>
                    <span className="text-[9px] text-sky-700 font-medium">{reg.state}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1 font-mono">
                    AAIR: {reg.ageAdjustedIncidenceRate} / 100k
                  </div>
                  <div className="mt-2 text-[9px] px-1.5 py-0.5 rounded inline-block bg-white/90 border border-slate-200/80 text-slate-700 font-medium shadow-2xs">
                    {reg.registryType.includes('Population') ? 'PBSR' : 'HBSR'}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Regional Comparison Table */}
          <div className="mt-4 pt-4 border-t border-slate-200/80">
            <h4 className="text-xs font-bold text-slate-900 heading-rounded uppercase tracking-wide mb-2.5">
              Regional Surveillance Contrasts
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-medium text-[10px]">
                    <th className="pb-2">Zone</th>
                    <th className="pb-2">Incidence / 100k</th>
                    <th className="pb-2">Hemorrhagic %</th>
                    <th className="pb-2">Mean Age</th>
                    <th className="pb-2">Tobacco Use %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans text-slate-700">
                  {INDIA_REGIONAL_COMPARISON.map((zone, idx) => (
                    <tr key={idx} className="hover:bg-white/60 transition-colors">
                      <td className="py-2.5 font-medium text-slate-900">{zone.region}</td>
                      <td className="py-2.5 font-mono text-slate-900 font-semibold">{zone.incidencePer100k}</td>
                      <td className="py-2.5 font-mono text-red-600 font-bold">{zone.hemorrhagicPercent}%</td>
                      <td className="py-2.5 font-mono text-slate-600">{zone.meanAge} yrs</td>
                      <td className="py-2.5 font-mono text-amber-700">{zone.tobaccoUsePercent}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-sky-600" />
            <span>PBSR = Population-Based Surveillance; HBSR = Hospital-Based Surveillance.</span>
          </span>
        </div>
      </div>

      {/* Selected Registry Detail Card */}
      <div className="glass-panel reflective-glint rounded-2xl p-5 flex flex-col justify-between shadow-sm">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
            <div>
              <span className="text-[10px] uppercase font-semibold text-sky-700">
                Active Registry Audit
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 heading-rounded tracking-tight">
                {selectedRegistry.city}, {selectedRegistry.state}
              </h3>
            </div>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/80 text-slate-700 border border-slate-200/80 shadow-sm">
              {selectedRegistry.registryType.includes('Population') ? 'PBSR' : 'HBSR'}
            </span>
          </div>

          <div className="mt-4 space-y-3.5 text-xs">
            {/* Rates */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 rounded-xl reflective-subcard">
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Crude Incidence</div>
                <div className="text-lg font-bold font-mono text-slate-900 mt-0.5">
                  {selectedRegistry.crudeIncidenceRate}
                </div>
                <div className="text-[9px] text-slate-500">/ 100k population</div>
              </div>

              <div className="p-3 rounded-xl reflective-subcard">
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Age-Adjusted (AAIR)</div>
                <div className="text-lg font-bold font-mono text-slate-900 mt-0.5">
                  {selectedRegistry.ageAdjustedIncidenceRate}
                </div>
                <div className="text-[9px] text-slate-500">/ 100k standardized</div>
              </div>
            </div>

            {/* Ischemic vs Hemorrhagic */}
            <div className="p-3.5 rounded-xl reflective-subcard">
              <div className="text-xs font-bold text-slate-900 heading-rounded mb-2 flex justify-between">
                <span>Pathological Subtype Ratio</span>
                <span className="font-mono text-red-600">{selectedRegistry.hemorrhagicShare}% Hemorrhagic</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-sky-600"
                  style={{ width: `${selectedRegistry.ischemicShare}%` }}
                />
                <div
                  className="h-full bg-red-600"
                  style={{ width: `${selectedRegistry.hemorrhagicShare}%` }}
                />
              </div>
              <div className="mt-1.5 flex justify-between text-[10px] font-mono text-slate-500">
                <span>Ischemic: {selectedRegistry.ischemicShare}%</span>
                <span>Hemorrhagic: {selectedRegistry.hemorrhagicShare}%</span>
              </div>
            </div>

            {/* Clinical Prevalence in Cohort */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between items-center text-slate-700">
                <span>Hypertension in Registry:</span>
                <span className="font-mono font-bold text-red-600">
                  {selectedRegistry.hypertensionPrevalence}%
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-700">
                <span>Diabetes in Registry:</span>
                <span className="font-mono font-bold text-amber-700">
                  {selectedRegistry.diabetesPrevalence}%
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-700">
                <span>Mean Presentation Age:</span>
                <span className="font-mono font-bold text-slate-900">
                  {selectedRegistry.meanAge} years
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-700">
                <span>Gender Cohort:</span>
                <span className="font-mono text-slate-800">
                  {selectedRegistry.maleRatio}% M / {selectedRegistry.femaleRatio}% F
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Source info */}
        <div className="mt-4 pt-3 border-t border-slate-200 text-[10px] text-slate-500">
          <div className="font-semibold text-slate-700">{selectedRegistry.source}</div>
          <div className="mt-0.5">{selectedRegistry.reportingPeriod} (Sample: {selectedRegistry.sampleSize.toLocaleString()} cases)</div>
        </div>
      </div>
    </div>
  );
};
