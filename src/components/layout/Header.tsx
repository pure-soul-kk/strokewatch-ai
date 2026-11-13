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
    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 lg:px-6 flex items-center justify-between shadow-sm">
      {/* Left: Mobile hamburger & branding */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 lg:hidden"
          title="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-sky-50 border border-sky-200 text-sky-600 font-bold">
            <Activity className="w-5 h-5" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base lg:text-lg tracking-tight text-slate-900 heading-rounded">
                Stroke<span className="text-sky-600">Watch</span> AI
              </span>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                v2.4
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              <span>Global Surveillance Active • GBD 2021 & WSO</span>
            </div>
          </div>
        </div>
      </div>

      {/* Middle: UTC Live Heartbeat (desktop) */}
      <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600">
        <Clock className="w-3.5 h-3.5 text-sky-600" />
        <span className="font-medium">{utcTime || 'SYNCHRONIZING UTC...'}</span>
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
            className="appearance-none bg-slate-50 border border-slate-200 hover:border-slate-300 text-xs text-slate-800 font-medium rounded-lg pl-8 pr-7 py-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-500"
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
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 transition-colors"
          title="Export CSV Dataset"
        >
          <Download className="w-3.5 h-3.5 text-sky-600" />
          <span className="hidden md:inline">Export CSV</span>
        </button>

        {/* Methodology / Disclaimers */}
        <button
          onClick={onOpenDisclaimer}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-medium text-slate-600 transition-colors"
          title="Methodology & Disclaimers"
        >
          <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
          <span className="hidden lg:inline">Methodology</span>
        </button>

        {/* Direct FAST trigger button */}
        <button
          onClick={onOpenFastCenter}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-xs font-bold text-white transition-all shadow-sm"
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>FAST 911/112</span>
        </button>
      </div>
    </header>
  );
};
