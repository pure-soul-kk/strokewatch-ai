'use client';

import React, { useState } from 'react';
import { 
  HeartPulse, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  RotateCcw, 
  ArrowRight, 
  FileText,
  Activity,
  Zap,
  Info
} from 'lucide-react';
import { RISK_LAB_QUESTIONS } from '@/data/educational-content';

export const RiskAssessmentLab: React.FC = () => {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const totalQuestions = RISK_LAB_QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  // Compute educational score
  const totalScore = Object.entries(answers).reduce((acc, [qId, optIdx]) => {
    const q = RISK_LAB_QUESTIONS.find((item) => item.id === qId);
    if (!q) return acc;
    return acc + (q.options[optIdx]?.score || 0);
  }, 0);

  const getTier = (score: number) => {
    if (score <= 3) {
      return {
        label: 'Low Risk Awareness Tier',
        color: 'text-emerald-400',
        badgeBg: 'bg-emerald-950 border-emerald-500/40 text-emerald-300',
        summary: 'Your reported lifestyle and vascular indicators reflect favorable neurovascular shielding habits.'
      };
    }
    if (score <= 7) {
      return {
        label: 'Moderate Risk Awareness Tier',
        color: 'text-amber-400',
        badgeBg: 'bg-amber-950 border-amber-500/40 text-amber-300',
        summary: 'Several modifiable areas (such as blood pressure tracking or physical activity) present significant opportunities to reduce your lifetime stroke burden.'
      };
    }
    return {
      label: 'Elevated Risk Awareness Tier',
      color: 'text-red-400',
      badgeBg: 'bg-red-950 border-red-500/40 text-red-300',
      summary: 'You reported multiple high-impact stroke risk factors (e.g. elevated blood pressure, tobacco, or prior vascular events). We strongly recommend scheduling a clinical assessment with your physician.'
    };
  };

  const tier = getTier(totalScore);

  const handleReset = () => {
    setAnswers({});
    setIsCompleted(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl glass-panel border border-cyan-500/30 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <HeartPulse className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">
              STROKE RISK AWARENESS LAB
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40">
              EDUCATIONAL PROTOCOL
            </span>
          </div>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Evaluate your familiarity with the primary modifiable contributors to stroke.
            Up to <strong>87% of stroke disability</strong> is preventable through proactive vascular and lifestyle management.
          </p>
        </div>

        {/* Progress & Reset */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-xs font-mono text-slate-400">Completion</div>
            <div className="text-lg font-bold font-mono text-cyan-400">
              {answeredCount} / {totalQuestions}
            </div>
          </div>
          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
            title="Reset Assessment"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mandatory Non-Diagnostic Disclaimer */}
      <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-3">
        <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-amber-200/90 leading-relaxed">
          <strong className="text-amber-300 font-semibold uppercase mr-1">[EDUCATIONAL NOTICE]:</strong>
          This tool is for health education and risk factor awareness only. It is <strong>NOT a clinical risk calculator</strong> and does not output a diagnostic probability. Please consult a licensed medical provider for diagnostic testing.
        </div>
      </div>

      {/* Main Grid: Questionnaire Left, Live Results Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Questions Column */}
        <div className="lg:col-span-2 space-y-4">
          {RISK_LAB_QUESTIONS.map((q, qIndex) => {
            const selectedOptIdx = answers[q.id];

            return (
              <div
                key={q.id}
                className="p-5 rounded-2xl glass-panel border border-slate-800/90 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-cyan-400 font-semibold">
                      FACTOR 0{qIndex + 1} • {q.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white mt-0.5">
                      {q.question}
                    </h3>
                  </div>
                  {selectedOptIdx !== undefined && (
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  )}
                </div>

                <p className="text-xs text-slate-400">
                  {q.subtext}
                </p>

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedOptIdx === optIdx;

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={`p-3 rounded-xl border text-left transition-all text-xs flex flex-col justify-between ${
                          isSelected
                            ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-glow-cyan'
                            : 'bg-[#0a1120] border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                        }`}
                      >
                        <div>
                          <div className="font-semibold text-white">{opt.label}</div>
                          {opt.sublabel && (
                            <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
                              {opt.sublabel}
                            </div>
                          )}
                        </div>

                        {isSelected && (
                          <div className="mt-2 pt-2 border-t border-cyan-500/20 text-[10px] text-cyan-300 leading-snug font-sans">
                            {opt.guidance}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Educational Summary Sidebar */}
        <div className="space-y-4">
          <div className="glass-panel-glow rounded-2xl p-5 border border-cyan-500/30 sticky top-20 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                AWARENESS PROFILE
              </span>
              <span className="text-[10px] font-mono text-cyan-400 font-bold">
                {answeredCount} of {totalQuestions} answered
              </span>
            </div>

            {/* Score Tier Card */}
            <div className="p-4 rounded-xl bg-[#09101d] border border-slate-800 text-center space-y-2">
              <div className="text-[11px] text-slate-400 uppercase font-mono">
                Awareness Tier
              </div>
              <div className={`text-lg font-black tracking-tight ${tier.color}`}>
                {tier.label}
              </div>
              <div className="text-xs text-slate-300 font-sans leading-relaxed">
                {tier.summary}
              </div>
            </div>

            {/* Actionable Educational Points */}
            <div className="space-y-2.5 pt-2">
              <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>Priority Action Recommendations</span>
              </div>

              <ul className="text-xs text-slate-300 space-y-2">
                <li className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1 flex-shrink-0" />
                  <span><strong>Blood Pressure:</strong> Target resting BP below 130/80 mmHg. Routine home BP monitoring detects hypertension before vascular damage occurs.</span>
                </li>
                <li className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1 flex-shrink-0" />
                  <span><strong>Aerobic Movement:</strong> Target at least 150 minutes of moderate aerobic exercise per week to optimize arterial elasticity.</span>
                </li>
                <li className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1 flex-shrink-0" />
                  <span><strong>Nutrition & Salt:</strong> Cap dietary salt under 2g sodium/day (1 teaspoon salt) and adopt a Mediterranean whole-food diet.</span>
                </li>
              </ul>
            </div>

            {/* Emergency reminder */}
            <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-[11px] text-red-200">
              <strong>Remember:</strong> If you or anyone experiences acute FAST symptoms (facial drooping, arm weakness, slurred speech), call emergency services immediately.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
