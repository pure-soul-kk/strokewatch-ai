'use client';

import React, { useState } from 'react';
import { AlertTriangle, PhoneCall, X, ArrowRight, ShieldAlert } from 'lucide-react';

interface EmergencyBannerProps {
  onOpenFastModal: () => void;
}

export const EmergencyBanner: React.FC<EmergencyBannerProps> = ({ onOpenFastModal }) => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) {
    return (
      <div className="bg-red-950/40 border-b border-red-500/20 px-4 py-1.5 flex items-center justify-between text-xs text-red-200">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span>Suspecting acute stroke? Every second counts (1.9M neurons lost/min).</span>
        </div>
        <button
          onClick={() => setIsDismissed(false)}
          className="underline hover:text-red-100 flex items-center gap-1 font-semibold"
        >
          View Emergency Actions
        </button>
      </div>
    );
  }

  return (
    <aside aria-label="Acute stroke emergency assistance" className="relative bg-gradient-to-r from-red-950/90 via-[#1a0a10] to-red-950/90 border-b border-red-500/40 text-red-100 px-4 py-2.5 shadow-lg backdrop-blur-md z-40 transition-all">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-600/30 border border-red-500/60 flex items-center justify-center text-red-400 flex-shrink-0">
            <ShieldAlert className="w-4 h-4 animate-pulse" />
          </div>
          <div className="text-sm">
            <span className="font-bold tracking-wide uppercase text-red-400 mr-2 flex-inline items-center gap-1">
              [CRITICAL EMERGENCY PROTOCOL]
            </span>
            <span className="text-slate-200">
              Sudden facial droop, arm weakness, or slurred speech? <strong>DO NOT WAIT.</strong> Call emergency services immediately.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenFastModal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-red-600 hover:bg-red-500 text-white rounded-md transition-colors shadow-sm"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Emergency FAST Center</span>
            <ArrowRight className="w-3 h-3 ml-0.5" />
          </button>
          <button
            onClick={() => setIsDismissed(true)}
            className="p-1 text-red-300 hover:text-white rounded hover:bg-red-900/50 transition-colors"
            title="Minimize emergency banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
