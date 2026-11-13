'use client';

import React from 'react';
import { X, ShieldCheck, Database, FileText, AlertOctagon, Scale } from 'lucide-react';

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="disclaimer-modal-title"
        className="relative w-full max-w-2xl bg-[#0F172A] border border-cyan-500/30 rounded-xl shadow-2xl p-6 text-slate-200 overflow-hidden"
      >
        {/* Glow accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500" />
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <Scale className="w-5 h-5 text-cyan-400" />
            <h2 id="disclaimer-modal-title" className="text-lg font-bold text-white tracking-tight">
              Clinical & Methodology Transparency Disclosures
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4 text-sm max-h-[70vh] overflow-y-auto pr-2">
          {/* Section 1: Non-Diagnostic Disclaimer */}
          <div className="p-3.5 rounded-lg bg-red-950/30 border border-red-500/30 flex gap-3">
            <AlertOctagon className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-red-200 mb-1">Non-Diagnostic & Educational Purpose Only</h4>
              <p className="text-xs text-red-200/80 leading-relaxed">
                StrokeWatch AI is a public health surveillance, research synthesis, and educational awareness tool.
                It is <strong>NOT a certified medical diagnostic device</strong> and must not be used to replace direct physician consultation,
                clinical triage, or emergency medical response.
              </p>
            </div>
          </div>

          {/* Section 2: Estimated Counters Methodology */}
          <div className="p-3.5 rounded-lg bg-cyan-950/20 border border-cyan-500/20 flex gap-3">
            <Database className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-cyan-200 mb-1">Live Estimated Counter Methodology</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Continuous stroke event counters displayed across this platform represent <strong>mathematical approximations</strong> derived
                from peer-reviewed annual incidence baselines (e.g. GBD 2021: 12.22M incident strokes/year globally; ICMR-NCDIR: ~1.85M strokes/year in India).
                They represent an interpolated baseline frequency (approx. 1 stroke every 2.58 seconds worldwide) and are 
                <strong> NOT real-time hospital registry intake counts</strong>.
              </p>
            </div>
          </div>

          {/* Section 3: Primary Data Registries & Citations */}
          <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 flex gap-3">
            <FileText className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-slate-200 mb-1">Primary Epidemiological Sources</h4>
              <ul className="text-xs text-slate-400 space-y-1 list-disc pl-4">
                <li><strong className="text-slate-300">GBD 2021:</strong> Global Burden of Disease Study 2021 Stroke Collaborators (The Lancet Neurology 2024).</li>
                <li><strong className="text-slate-300">WHO:</strong> World Health Organization Global Health Estimates (GHE 2023/2024).</li>
                <li><strong className="text-slate-300">WSO:</strong> World Stroke Organization Global Stroke Factsheet 2024.</li>
                <li><strong className="text-slate-300">ICMR-NCDIR:</strong> National Stroke Registry Programme (Population-Based & Hospital-Based registries, India).</li>
                <li><strong className="text-slate-300">AHA/ASA:</strong> Heart Disease and Stroke Statistics (Circulation 2024).</li>
              </ul>
            </div>
          </div>

          {/* Section 4: Privacy & Ethics */}
          <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 flex gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-slate-200 mb-1">Zero Private Health Information (PHI) Collection</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                StrokeWatch AI operates completely client-side for risk educational questionnaires and scenario simulations.
                No personal medical history, names, or location traces are permanently logged or shared with third parties.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs rounded-lg transition-colors shadow-md"
          >
            I Acknowledge & Understand
          </button>
        </div>
      </div>
    </div>
  );
};
