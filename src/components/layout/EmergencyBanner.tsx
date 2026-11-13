'use client';

import React, { useState } from 'react';
import { PhoneCall, X, ArrowRight, ShieldAlert } from 'lucide-react';

interface EmergencyBannerProps {
  onOpenFastModal: () => void;
}

export const EmergencyBanner: React.FC<EmergencyBannerProps> = ({ onOpenFastModal }) => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) {
    return (
      <div className="bg-red-50 border-b border-red-200 px-4 py-1.5 flex items-center justify-between text-xs text-red-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-600" />
          <span>Suspecting acute stroke? Every second counts (1.9M neurons lost/min).</span>
        </div>
        <button
          onClick={() => setIsDismissed(false)}
          className="underline hover:text-red-950 font-semibold"
        >
          View Emergency Actions
        </button>
      </div>
    );
  }

  return (
    <aside aria-label="Acute stroke emergency assistance" className="bg-red-50/90 backdrop-blur-md border-b border-red-200/80 text-red-950 px-4 py-2.5 z-40 transition-all shadow-2xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-red-100/90 border border-red-200/90 flex items-center justify-center text-red-600 flex-shrink-0 shadow-2xs">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div className="text-sm">
            <span className="font-bold text-red-700 mr-2">
              EMERGENCY PROTOCOL:
            </span>
            <span className="text-slate-800">
              Sudden facial droop, arm weakness, or slurred speech? <strong>DO NOT WAIT.</strong> Call emergency services immediately.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenFastModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all shadow-sm heading-rounded border-t border-red-400/40"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Emergency FAST Center</span>
            <ArrowRight className="w-3 h-3 ml-0.5" />
          </button>
          <button
            onClick={() => setIsDismissed(true)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-white/70 transition-colors"
            title="Minimize emergency banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
