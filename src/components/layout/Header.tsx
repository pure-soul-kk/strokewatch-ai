'use client';

import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Globe2, 
  Clock, 
  HelpCircle, 
  ShieldAlert, 
  Download,
  Menu,
  ChevronDown
} from 'lucide-react';
import { downloadCSV } from '@/lib/utils';
import { COUNTRY_DATASET } from '@/data/global-stroke-stats';

interface HeaderProps {
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
  onOpenDisclaimer: () => void;
  onOpenFastCenter: () => void;
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedRegion,
  onSelectRegion,
  onOpenDisclaimer,
  onOpenFastCenter,
  onToggleSidebar
}) => {
  const [utcTime, setUtcTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().replace('GMT', 'UTC'));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleExportData = () => {
    downloadCSV('strokewatch_global_dataset_2024.csv', COUNTRY_DATASET);
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#080D18]/90 backdrop-blur-xl border-b border-slate-800/80 px-4 lg:px-6 flex items-center justify-between">
      {/* Left: Mobile hamburger & branding */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 lg:hidden"
          title="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-[1px] shadow-glow-cyan">
            <div className="w-full h-full bg-[#080D18] rounded-[11px] flex items-center justify-center">
              <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#080D18] animate-ping" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base lg:text-lg tracking-wider text-white">
                STROKE<span className="text-cyan-400">WATCH</span>
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-semibold tracking-wide">
                AI 2.4
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              <span>GLOBAL STROKE SURVEILLANCE ACTIVE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Middle: UTC Live Heartbeat (desktop) */}
      <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111B2D]/90 border border-slate-800 text-xs font-mono text-slate-300">
        <Clock className="w-3.5 h-3.5 text-cyan-400" />
        <span>{utcTime || 'SYNCHRONIZING UTC...'}</span>
      </div>

      {/* Right: Region Selector, Emergency FAST, Methodology */}
      <div className="flex items-center gap-2.5">
        {/* Region Switcher */}
        <div className="relative">
          <label htmlFor="region-selector" className="sr-only">Select Surveillance Region</label>
          <select
            id="region-selector"
            value={selectedRegion}
            onChange={(e) => onSelectRegion(e.target.value)}
            className="appearance-none bg-[#111B2D] border border-slate-700 hover:border-cyan-500/50 text-xs text-white rounded-lg pl-8 pr-7 py-1.5 cursor-pointer focus:outline-none focus:ring-1 focus:ring-cyan-400"
          >
            <option value="global">🌐 Global Baseline</option>
            <option value="india">🇮🇳 India Surveillance</option>
            <option value="usa">🇺🇸 United States</option>
            <option value="china">🇨🇳 China</option>
            <option value="uk">🇬🇧 United Kingdom</option>
          </select>
          <Globe2 className="w-3.5 h-3.5 text-cyan-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Export Data */}
        <button
          onClick={handleExportData}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-xs text-slate-200 transition-colors"
          title="Export CSV Dataset"
        >
          <Download className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden md:inline">Export CSV</span>
        </button>

        {/* Methodology / Disclaimers */}
        <button
          onClick={onOpenDisclaimer}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-xs text-slate-300 transition-colors"
          title="Methodology & Disclaimers"
        >
          <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden lg:inline">Methodology</span>
        </button>

        {/* Direct FAST trigger button */}
        <button
          onClick={onOpenFastCenter}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600/90 hover:bg-red-500 border border-red-500 text-xs font-bold text-white transition-all shadow-glow-red"
        >
          <ShieldAlert className="w-3.5 h-3.5 animate-pulse" />
          <span>FAST 911/112</span>
        </button>
      </div>
    </header>
  );
};
