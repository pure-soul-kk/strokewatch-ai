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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="disclaimer-modal-title"
        className="relative w-full max-w-2xl glass-panel reflective-glint rounded-2xl shadow-2xl p-6 text-slate-800 overflow-hidden"
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-200/80">
          <div className="flex items-center gap-2.5">
            <Scale className="w-5 h-5 text-sky-600" />
            <h2 id="disclaimer-modal-title" className="text-lg font-bold text-slate-900 heading-rounded">
              Clinical & Methodology Disclosures
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl reflective-pill text-slate-500 hover:text-slate-800 transition-colors shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-3.5 text-sm max-h-[70vh] overflow-y-auto pr-2">
          {/* Section 1: Non-Diagnostic Disclaimer */}
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex gap-3">
            <AlertOctagon className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-red-900 mb-1">Non-Diagnostic & Educational Purpose Only</h4>
              <p className="text-xs text-red-800 leading-relaxed">
                StrokeWatch AI is a public health surveillance, research synthesis, and educational awareness tool.
                It is <strong>NOT a certified medical diagnostic device</strong> and must not be used to replace direct physician consultation,
                clinical triage, or emergency medical response.
              </p>
            </div>
          </div>

          {/* Section 2: Estimated Counters Methodology */}
          <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 flex gap-3">
            <Database className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sky-900 mb-1">Live Estimated Counter Methodology</h4>
              <p className="text-xs text-sky-800 leading-relaxed">
                Continuous stroke event counters displayed across this platform represent <strong>mathematical approximations</strong> derived
                from peer-reviewed annual incidence baselines (e.g. GBD 2021: 12.22M incident strokes/year globally; ICMR-NCDIR: ~1.85M strokes/year in India).
                They represent an interpolated baseline frequency (approx. 1 stroke every 2.58 seconds worldwide) and are 
                <strong> NOT real-time hospital registry intake counts</strong>.
              </p>
            </div>
          </div>

          {/* Section 3: Primary Data Registries & Citations */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex gap-3">
            <FileText className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900 mb-1">Primary Epidemiological Sources</h4>
              <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                <li><strong className="text-slate-800">GBD 2021:</strong> Global Burden of Disease Study 2021 Stroke Collaborators (The Lancet Neurology 2024).</li>
                <li><strong className="text-slate-800">WHO:</strong> World Health Organization Global Health Estimates (GHE 2023/2024).</li>
                <li><strong className="text-slate-800">WSO:</strong> World Stroke Organization Global Stroke Factsheet 2024.</li>
                <li><strong className="text-slate-800">ICMR-NCDIR:</strong> National Stroke Registry Programme (Population-Based & Hospital-Based registries, India).</li>
                <li><strong className="text-slate-800">AHA/ASA:</strong> Heart Disease and Stroke Statistics (Circulation 2024).</li>
              </ul>
            </div>
          </div>

          {/* Section 4: Privacy & Ethics */}
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-emerald-900 mb-1">Zero Private Health Information (PHI) Collection</h4>
              <p className="text-xs text-emerald-800 leading-relaxed">
                StrokeWatch AI operates completely client-side for risk educational questionnaires and scenario simulations.
                No personal medical history, names, or location traces are permanently logged or shared.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-lg transition-colors shadow-sm"
          >
            I Acknowledge & Understand
          </button>
        </div>
      </div>
    </div>
  );
};
