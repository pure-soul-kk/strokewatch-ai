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
    <header className="sticky top-0 z-30 h-16 glass-header px-4 lg:px-6 flex items-center justify-between whitespace-nowrap flex-nowrap">
      {/* Left: Mobile hamburger & branding, Desktop Surveillance Beacon */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-white/80 lg:hidden transition-colors"
          title="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Mobile branding */}
        <div className="flex items-center gap-2 lg:hidden">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-sky-50 border border-sky-200 text-sky-600 font-bold shadow-2xs">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <span className="font-extrabold text-sm tracking-tight text-slate-900 heading-rounded">
              Stroke<span className="text-sky-600">Watch</span> AI
            </span>
          </div>
        </div>

        {/* Desktop Status Beacon */}
        <div className="hidden lg:flex items-center gap-2 text-xs font-medium text-slate-700 min-w-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
          <span className="font-mono text-slate-600 uppercase text-[10.5px] font-bold truncate">GBD 2021 & WSO SURVEILLANCE ACTIVE</span>
        </div>
      </div>

      {/* Middle: UTC Live Heartbeat (desktop) */}
      <div className="hidden xl:flex items-center gap-2 px-3.5 py-1.5 rounded-xl reflective-pill text-xs text-slate-700">
        <Clock className="w-3.5 h-3.5 text-sky-600" />
        <span className="font-medium font-mono">{utcTime || 'SYNCHRONIZING UTC...'}</span>
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
            className="appearance-none reflective-pill hover:border-slate-300 text-xs text-slate-800 font-medium rounded-xl pl-8 pr-7 py-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="global">🌐 Global Baseline</option>
            <option value="india">🇮🇳 India Surveillance</option>
            <option value="usa">🇺🇸 United States</option>
            <option value="china">🇨🇳 China</option>
            <option value="uk">🇬🇧 United Kingdom</option>
          </select>
          <Globe2 className="w-3.5 h-3.5 text-sky-600 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Export Data */}
        <button
          onClick={handleExportData}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl reflective-pill text-xs font-medium text-slate-700 hover:text-slate-900 transition-colors"
          title="Export CSV Dataset"
        >
          <Download className="w-3.5 h-3.5 text-sky-600" />
          <span className="hidden md:inline">Export CSV</span>
        </button>

        {/* Methodology / Disclaimers */}
        <button
          onClick={onOpenDisclaimer}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl reflective-pill text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
          title="Methodology & Disclaimers"
        >
          <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
          <span className="hidden lg:inline">Methodology</span>
        </button>

        {/* Direct FAST trigger button */}
        <button
          onClick={onOpenFastCenter}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-bold text-white transition-all shadow-sm heading-rounded border-t border-red-400/40"
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>FAST 911/112</span>
        </button>
      </div>
    </header>
  );
};
