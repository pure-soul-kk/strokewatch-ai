'use client';

import React, { useState } from 'react';
import { INDIA_REGISTRIES, INDIA_REGIONAL_COMPARISON } from '@/data/india-registry-data';
import { IndiaRegistryData } from '@/types';
import { MapPin, ShieldCheck, Activity, Users, AlertTriangle, Info } from 'lucide-react';

export const IndiaRegistryMap: React.FC = () => {
  const [selectedRegistry, setSelectedRegistry] = useState<IndiaRegistryData>(INDIA_REGISTRIES[0]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Registry Selector & Interactive Visual Board */}
      <div className="lg:col-span-2 glass-panel rounded-2xl p-5 border border-cyan-500/20 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-cyan-400" />
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white tracking-wide">
                  ICMR-NCDIR STROKE SURVEILLANCE REGISTRIES (INDIA)
                </h3>
                <p className="text-xs text-slate-400">
                  Select a sentinel surveillance center to inspect epidemiological data.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30 font-semibold">
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
                  className={`p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-cyan-950/70 border-cyan-400 text-white shadow-glow-cyan'
                      : 'bg-[#0b1322] border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs">{reg.city}</span>
                    <span className="text-[9px] font-mono text-cyan-400">{reg.state}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 font-mono">
                    AAIR: {reg.ageAdjustedIncidenceRate} / 100k
                  </div>
                  <div className="mt-2 text-[9px] font-mono px-1.5 py-0.5 rounded inline-block bg-slate-900 border border-slate-700 text-slate-400">
                    {reg.registryType.includes('Population') ? 'PBSR' : 'HBSR'}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Regional Comparison Table */}
          <div className="mt-4 pt-4 border-t border-slate-800/80">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">
              Regional Surveillance Contrasts (North vs East vs South vs West)
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-mono text-[10px]">
                    <th className="pb-2">Zone</th>
                    <th className="pb-2">Incidence / 100k</th>
                    <th className="pb-2">Hemorrhagic %</th>
                    <th className="pb-2">Mean Age</th>
                    <th className="pb-2">Tobacco Use %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans text-slate-300">
                  {INDIA_REGIONAL_COMPARISON.map((zone, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30">
                      <td className="py-2 font-medium text-white">{zone.region}</td>
                      <td className="py-2 font-mono text-cyan-300">{zone.incidencePer100k}</td>
                      <td className="py-2 font-mono text-red-400 font-semibold">{zone.hemorrhagicPercent}%</td>
                      <td className="py-2 font-mono text-slate-300">{zone.meanAge} yrs</td>
                      <td className="py-2 font-mono text-amber-400">{zone.tobaccoUsePercent}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-cyan-400" />
            <span>PBSR = Population-Based Surveillance; HBSR = Hospital-Based Surveillance.</span>
          </span>
        </div>
      </div>

      {/* Selected Registry Detail Card */}
      <div className="glass-panel-glow rounded-2xl p-5 border border-cyan-500/30 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-mono uppercase text-cyan-400">
                ACTIVE REGISTRY AUDIT
              </span>
              <h3 className="text-xl font-extrabold text-white">
                {selectedRegistry.city}, {selectedRegistry.state}
              </h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40">
              {selectedRegistry.registryType}
            </span>
          </div>

          <div className="mt-4 space-y-3.5 text-xs">
            {/* Rates */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-lg bg-[#09101d] border border-slate-800">
                <div className="text-[10px] text-slate-400 font-mono uppercase">Crude Incidence</div>
                <div className="text-lg font-bold font-mono text-cyan-300">
                  {selectedRegistry.crudeIncidenceRate}
                </div>
                <div className="text-[9px] text-slate-400">/ 100,000 population</div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#09101d] border border-slate-800">
                <div className="text-[10px] text-slate-400 font-mono uppercase">Age-Adjusted (AAIR)</div>
                <div className="text-lg font-bold font-mono text-white">
                  {selectedRegistry.ageAdjustedIncidenceRate}
                </div>
                <div className="text-[9px] text-slate-400">/ 100,000 standardized</div>
              </div>
            </div>

            {/* Ischemic vs Hemorrhagic */}
            <div className="p-3 rounded-xl bg-[#09101d] border border-slate-800">
              <div className="text-xs font-bold text-white mb-2 flex justify-between">
                <span>Pathological Subtype Ratio</span>
                <span className="font-mono text-red-400">{selectedRegistry.hemorrhagicShare}% Hemorrhagic</span>
              </div>
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-cyan-400"
                  style={{ width: `${selectedRegistry.ischemicShare}%` }}
                  title={`Ischemic: ${selectedRegistry.ischemicShare}%`}
                />
                <div
                  className="h-full bg-red-400"
                  style={{ width: `${selectedRegistry.hemorrhagicShare}%` }}
                  title={`Hemorrhagic: ${selectedRegistry.hemorrhagicShare}%`}
                />
              </div>
              <div className="mt-1.5 flex justify-between text-[10px] font-mono text-slate-400">
                <span>Ischemic: {selectedRegistry.ischemicShare}%</span>
                <span>Hemorrhagic: {selectedRegistry.hemorrhagicShare}%</span>
              </div>
            </div>

            {/* Clinical Prevalence in Cohort */}
            <div className="p-3 rounded-xl bg-[#09101d] border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-slate-300">
                <span>Hypertension in Stroke Patients:</span>
                <span className="font-mono font-bold text-red-400">
                  {selectedRegistry.hypertensionPrevalence}%
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Diabetes in Stroke Patients:</span>
                <span className="font-mono font-bold text-amber-400">
                  {selectedRegistry.diabetesPrevalence}%
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Mean Age at Presentation:</span>
                <span className="font-mono font-bold text-white">
                  {selectedRegistry.meanAge} years
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Gender Cohort:</span>
                <span className="font-mono text-slate-300">
                  {selectedRegistry.maleRatio}% M / {selectedRegistry.femaleRatio}% F
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Source info */}
        <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-slate-400">
          <div className="font-semibold text-slate-300">{selectedRegistry.source}</div>
          <div className="mt-0.5">{selectedRegistry.reportingPeriod} (Sample size: {selectedRegistry.sampleSize.toLocaleString()} cases)</div>
        </div>
      </div>
    </div>
  );
};
