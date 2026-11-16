'use client';

import React, { useState } from 'react';
import { INDIA_REGISTRIES, INDIA_REGIONAL_COMPARISON } from '@/data/india-registry-data';
import { IndiaRegistryData } from '@/types';
import { MapPin, Info, Crosshair, ShieldCheck, Activity } from 'lucide-react';

export const IndiaRegistryMap: React.FC = () => {
  const [selectedRegistry, setSelectedRegistry] = useState<IndiaRegistryData>(INDIA_REGISTRIES[0]);

  // Normalized (x, y) coordinates for Sentinel Sites on the SVG map (viewBox 0 0 320 340)
  const sentinelCoordinates: Record<string, { x: number; y: number; labelPos: 'top' | 'right' | 'left' | 'bottom' }> = {
    ludhiana: { x: 105, y: 70, labelPos: 'left' },
    varanasi: { x: 175, y: 130, labelPos: 'right' },
    kota: { x: 95, y: 135, labelPos: 'left' },
    cuttack: { x: 205, y: 175, labelPos: 'right' },
    cachar: { x: 280, y: 115, labelPos: 'top' },
    tirunelveli: { x: 125, y: 310, labelPos: 'bottom' }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & India Geographic Radar Map Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 5 Cols: SVG India Sentinel Radar Map */}
        <div className="lg:col-span-5 p-5 rounded-2xl glass-panel reflective-glint shadow-sm flex flex-col items-center justify-between relative overflow-hidden bg-slate-900 text-white">
          <div className="w-full flex justify-between items-center pb-2 border-b border-slate-800 text-xs">
            <span className="font-bold tracking-wide flex items-center gap-1.5 font-mono text-sky-400">
              <Crosshair className="w-4 h-4 text-sky-400 animate-spin" style={{ animationDuration: '8s' }} />
              <span>SENTINEL RADAR SURVEILLANCE</span>
            </span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
              ICMR ACTIVE
            </span>
          </div>

          {/* SVG Map of India Geographic Boundary & Radar Beacons */}
          <div className="relative my-3">
            <svg width="290" height="330" viewBox="0 0 320 340" className="overflow-visible">
              <defs>
                <radialGradient id="radarPulse" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#0284C7" stopOpacity="0.8" />
                  <stop offset="60%" stopColor="#0284C7" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Simplified Geometric Boundary of India */}
              <path
                d="M 105 40 
                   L 125 30 L 145 45 L 140 70 L 165 75 L 195 85 L 235 90 L 270 95 L 305 105 L 300 130 L 270 135 L 245 130 
                   L 215 155 L 210 195 L 190 220 L 165 260 L 140 315 L 125 330 L 115 315 L 95 240 L 80 195 L 65 170 
                   L 55 140 L 70 115 L 90 90 Z"
                fill="#1E293B"
                stroke="#334155"
                strokeWidth="2"
                strokeLinejoin="round"
              />

              {/* Zone Latitude Grid Lines */}
              <line x1="40" y1="90" x2="280" y2="90" stroke="#1E293B" strokeWidth="1" strokeDasharray="2,2" />
              <line x1="40" y1="160" x2="280" y2="160" stroke="#1E293B" strokeWidth="1" strokeDasharray="2,2" />
              <line x1="40" y1="240" x2="280" y2="240" stroke="#1E293B" strokeWidth="1" strokeDasharray="2,2" />

              {/* Radar Beacon Connections */}
              <polyline
                points="105,70 175,130 205,175 125,310 95,135 105,70"
                fill="none"
                stroke="#0284C7"
                strokeWidth="1"
                strokeDasharray="3,3"
                opacity="0.35"
              />
              <line x1="175" y1="130" x2="280" y2="115" stroke="#0284C7" strokeWidth="1" strokeDasharray="3,3" opacity="0.35" />

              {/* Sentinel Nodes & Interactive Pulsing Beacons */}
              {INDIA_REGISTRIES.map((reg) => {
                const coords = sentinelCoordinates[reg.id] || { x: 160, y: 170, labelPos: 'right' };
                const isSelected = selectedRegistry.id === reg.id;

                return (
                  <g
                    key={reg.id}
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => setSelectedRegistry(reg)}
                  >
                    {/* Pulsing ring if selected */}
                    {isSelected && (
                      <circle
                        cx={coords.x}
                        cy={coords.y}
                        r="18"
                        fill="url(#radarPulse)"
                        className="animate-ping"
                      />
                    )}

                    {/* Outer Beacon Target Circle */}
                    <circle
                      cx={coords.x}
                      cy={coords.y}
                      r={isSelected ? "9" : "6"}
                      fill={isSelected ? "#EF4444" : "#0284C7"}
                      stroke="#FFFFFF"
                      strokeWidth="2"
                    />

                    {/* Center Core Dot */}
                    <circle
                      cx={coords.x}
                      cy={coords.y}
                      r="2.5"
                      fill="#FFFFFF"
                    />

                    {/* Site City Name Tag */}
                    <rect
                      x={coords.labelPos === 'left' ? coords.x - 70 : coords.x + 10}
                      y={coords.y - 10}
                      width="60"
                      height="18"
                      rx="4"
                      fill={isSelected ? '#0284C7' : '#0F172A'}
                      stroke={isSelected ? '#38BDF8' : '#334155'}
                      strokeWidth="1"
                    />
                    <text
                      x={coords.labelPos === 'left' ? coords.x - 40 : coords.x + 40}
                      y={coords.y + 2}
                      fill="#F8FAFC"
                      fontSize="9"
                      fontWeight="800"
                      fontFamily="monospace"
                      textAnchor="middle"
                    >
                      {reg.city}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="w-full text-center text-[10px] text-slate-400 font-mono pt-2 border-t border-slate-800">
            Click any beacon on the map to inspect regional ICMR data
          </div>
        </div>

        {/* Right 7 Cols: Active Sentinel Detail Card & AAIR Metrics */}
        <div className="lg:col-span-7 glass-panel reflective-glint rounded-2xl p-6 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
              <div>
                <span className="text-[10px] uppercase font-bold text-sky-700 font-mono tracking-wider">
                  ACTIVE SENTINEL REGISTRY AUDIT
                </span>
                <h3 className="text-2xl font-black text-slate-900 heading-rounded tracking-tight mt-0.5">
                  {selectedRegistry.city}, {selectedRegistry.state}
                </h3>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-sky-50 border border-sky-300 text-sky-800 shadow-xs">
                {selectedRegistry.registryType.includes('Population') ? 'PBSR (Population-Based)' : 'HBSR (Hospital-Based)'}
              </span>
            </div>

            {/* Quick KPI Tiles */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-4">
              <div className="p-3.5 rounded-xl reflective-subcard border-l-4 border-l-sky-600">
                <div className="text-[10px] text-slate-500 uppercase font-semibold font-mono">Age-Adjusted Rate</div>
                <div className="text-2xl font-black font-mono text-slate-900 mt-1">
                  {selectedRegistry.ageAdjustedIncidenceRate}
                </div>
                <div className="text-[10px] text-slate-500">/ 100k standardized</div>
              </div>

              <div className="p-3.5 rounded-xl reflective-subcard border-l-4 border-l-red-600">
                <div className="text-[10px] text-slate-500 uppercase font-semibold font-mono">Hemorrhagic Share</div>
                <div className="text-2xl font-black font-mono text-red-600 mt-1">
                  {selectedRegistry.hemorrhagicShare}%
                </div>
                <div className="text-[10px] text-slate-500">Double Western rate</div>
              </div>

              <div className="p-3.5 rounded-xl reflective-subcard border-l-4 border-l-amber-600">
                <div className="text-[10px] text-slate-500 uppercase font-semibold font-mono">Hypertension %</div>
                <div className="text-2xl font-black font-mono text-amber-700 mt-1">
                  {selectedRegistry.hypertensionPrevalence}%
                </div>
                <div className="text-[10px] text-slate-500">In stroke cohort</div>
              </div>
            </div>

            {/* Pathological Subtype Graphical Bar */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-900">
                <span>Pathological Subtype Ratio in {selectedRegistry.city}:</span>
                <span className="font-mono text-slate-700">
                  {selectedRegistry.ischemicShare}% Ischemic / {selectedRegistry.hemorrhagicShare}% Hemorrhagic
                </span>
              </div>
              <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden flex shadow-inner">
                <div
                  className="h-full bg-sky-600 transition-all duration-300"
                  style={{ width: `${selectedRegistry.ischemicShare}%` }}
                  title={`Ischemic: ${selectedRegistry.ischemicShare}%`}
                />
                <div
                  className="h-full bg-red-600 transition-all duration-300"
                  style={{ width: `${selectedRegistry.hemorrhagicShare}%` }}
                  title={`Hemorrhagic: ${selectedRegistry.hemorrhagicShare}%`}
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-sky-600 inline-block" />
                  <span>Ischemic Arterial Thrombosis</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-600 inline-block" />
                  <span>Hemorrhagic Rupture (Uncontrolled HTN)</span>
                </span>
              </div>
            </div>

            {/* Demographics & Clinical Profile */}
            <div className="grid grid-cols-2 gap-3 mt-3 text-xs">
              <div className="p-3 rounded-xl bg-white border border-slate-200/80 flex justify-between items-center">
                <span className="text-slate-600">Mean Presentation Age:</span>
                <span className="font-mono font-black text-slate-900">{selectedRegistry.meanAge} yrs</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200/80 flex justify-between items-center">
                <span className="text-slate-600">Gender Ratio:</span>
                <span className="font-mono font-black text-slate-900">{selectedRegistry.maleRatio}% M / {selectedRegistry.femaleRatio}% F</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 text-[10px] text-slate-500 font-mono flex items-center justify-between">
            <span className="flex items-center gap-1 text-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{selectedRegistry.source}</span>
            </span>
            <span>Sample: {selectedRegistry.sampleSize.toLocaleString()} cases</span>
          </div>
        </div>

      </div>

      {/* Sentinel Site Buttons & Regional Contrast Table */}
      <div className="glass-panel reflective-glint rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
          <h4 className="text-sm font-bold text-slate-900 heading-rounded uppercase tracking-wide">
            All 6 Sentinel Centers Quick Switcher
          </h4>
          <span className="text-xs text-slate-500 font-mono">ICMR Phase II Programme</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
          {INDIA_REGISTRIES.map((reg) => {
            const isSelected = selectedRegistry.id === reg.id;
            return (
              <button
                key={reg.id}
                onClick={() => setSelectedRegistry(reg)}
                className={`p-3 rounded-xl text-left transition-all ${
                  isSelected
                    ? 'bg-sky-600 text-white shadow-md font-bold'
                    : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="text-xs heading-rounded">{reg.city}</div>
                <div className={`text-[10px] font-mono mt-1 ${isSelected ? 'text-sky-100' : 'text-slate-500'}`}>
                  AAIR {reg.ageAdjustedIncidenceRate}
                </div>
              </button>
            );
          })}
        </div>

        {/* Regional Epidemiological Contrasts Table */}
        <div className="pt-3 border-t border-slate-200/80">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-medium text-[10px] uppercase font-mono">
                  <th className="pb-2">Zone</th>
                  <th className="pb-2">Standardized AAIR / 100k</th>
                  <th className="pb-2">Hemorrhagic Proportion</th>
                  <th className="pb-2">Mean Presentation Age</th>
                  <th className="pb-2">Tobacco Use Prevalence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans text-slate-700">
                {INDIA_REGIONAL_COMPARISON.map((zone, idx) => (
                  <tr key={idx} className="hover:bg-white/60 transition-colors">
                    <td className="py-2.5 font-bold text-slate-900">{zone.region}</td>
                    <td className="py-2.5 font-mono text-slate-900 font-bold">{zone.incidencePer100k}</td>
                    <td className="py-2.5 font-mono text-red-600 font-black">{zone.hemorrhagicPercent}%</td>
                    <td className="py-2.5 font-mono text-slate-600">{zone.meanAge} years</td>
                    <td className="py-2.5 font-mono text-amber-700 font-bold">{zone.tobaccoUsePercent}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
