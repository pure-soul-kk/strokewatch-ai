'use client';

import React, { useState } from 'react';
import { 
  HeartPulse, 
  CheckCircle2, 
  RotateCcw, 
  Zap, 
  Info 
} from 'lucide-react';
import { RISK_LAB_QUESTIONS } from '@/data/educational-content';

export const RiskAssessmentLab: React.FC = () => {
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const totalQuestions = RISK_LAB_QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;

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
        color: 'text-emerald-700',
        badgeBg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
        summary: 'Your reported lifestyle and vascular indicators reflect favorable neurovascular shielding habits.'
      };
    }
    if (score <= 7) {
      return {
        label: 'Moderate Risk Awareness Tier',
        color: 'text-amber-700',
        badgeBg: 'bg-amber-50 border-amber-200 text-amber-800',
        summary: 'Several modifiable areas (such as blood pressure tracking or physical activity) present significant opportunities to reduce your lifetime stroke burden.'
      };
    }
    return {
      label: 'Elevated Risk Awareness Tier',
      color: 'text-red-700',
      badgeBg: 'bg-red-50 border-red-200 text-red-800',
      summary: 'You reported multiple high-impact stroke risk factors (e.g. elevated blood pressure, tobacco, or prior vascular events). We strongly recommend scheduling a clinical assessment with your physician.'
    };
  };

  const tier = getTier(totalScore);

  const handleReset = () => {
    setAnswers({});
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl glass-panel reflective-glint flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <HeartPulse className="w-5 h-5 text-sky-600" />
            <h2 className="text-xl font-bold text-slate-900 heading-rounded tracking-tight">
              Stroke Risk Awareness Lab
            </h2>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/80 text-sky-800 border border-sky-200/80 shadow-sm">
              EDUCATIONAL PROTOCOL
            </span>
          </div>
          <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
            Evaluate your familiarity with the primary modifiable contributors to stroke.
            Up to <strong>87% of stroke disability</strong> is preventable through proactive vascular and lifestyle management.
          </p>
        </div>

        {/* Progress & Reset */}
        <div className="flex items-center gap-4">
          <div className="text-right p-3 rounded-xl reflective-subcard">
            <div className="text-xs font-semibold text-slate-500 uppercase">Completed</div>
            <div className="text-lg font-bold font-mono text-slate-900">
              {answeredCount} / {totalQuestions}
            </div>
          </div>
          <button
            onClick={handleReset}
            className="p-2.5 rounded-xl reflective-pill text-slate-600 hover:text-slate-900 transition-colors shadow-sm"
            title="Reset Assessment"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mandatory Non-Diagnostic Disclaimer */}
      <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 backdrop-blur-sm flex items-start gap-3">
        <Info className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 leading-relaxed">
          <strong className="text-amber-800 font-semibold uppercase mr-1">[EDUCATIONAL NOTICE]:</strong>
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
                className="p-5 rounded-2xl glass-panel reflective-glint space-y-3 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-sky-700 tracking-wide">
                      Factor 0{qIndex + 1} • {q.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 heading-rounded mt-0.5">
                      {q.question}
                    </h3>
                  </div>
                  {selectedOptIdx !== undefined && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  )}
                </div>

                <p className="text-xs text-slate-500">
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
                        className={`p-3 rounded-xl text-left transition-all text-xs flex flex-col justify-between ${
                          isSelected
                            ? 'reflective-subcard bg-white/95 border-sky-300 ring-2 ring-sky-300 shadow-sm'
                            : 'reflective-subcard text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div>
                          <div className="font-semibold text-slate-900">{opt.label}</div>
                          {opt.sublabel && (
                            <div className="text-[10px] text-slate-500 mt-0.5">
                              {opt.sublabel}
                            </div>
                          )}
                        </div>

                        {isSelected && (
                          <div className="mt-2 pt-2 border-t border-sky-200/80 text-[10px] text-sky-900 leading-snug font-sans">
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
          <div className="glass-panel reflective-glint rounded-2xl p-5 sticky top-20 space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
              <span className="text-xs uppercase font-semibold tracking-wide text-slate-500">
                Awareness Profile
              </span>
              <span className="text-[10px] font-bold text-sky-700">
                {answeredCount} of {totalQuestions} answered
              </span>
            </div>

            {/* Score Tier Card */}
            <div className="p-4 rounded-xl reflective-subcard text-center space-y-2">
              <div className="text-[11px] text-slate-500 uppercase font-semibold">
                Awareness Tier
              </div>
              <div className={`text-lg font-bold heading-rounded ${tier.color}`}>
                {tier.label}
              </div>
              <div className="text-xs text-slate-600 font-sans leading-relaxed">
                {tier.summary}
              </div>
            </div>

            {/* Actionable Points */}
            <div className="space-y-2.5 pt-2">
              <div className="text-xs font-bold text-slate-900 heading-rounded uppercase tracking-wide flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-sky-600" />
                <span>Priority Action Recommendations</span>
              </div>

              <ul className="text-xs text-slate-700 space-y-2">
                <li className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-600 mt-1.5 flex-shrink-0" />
                  <span><strong>Blood Pressure:</strong> Target resting BP below 130/80 mmHg. Routine home BP tracking prevents silent vascular deterioration.</span>
                </li>
                <li className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-600 mt-1.5 flex-shrink-0" />
                  <span><strong>Aerobic Movement:</strong> Target at least 150 minutes of moderate aerobic exercise weekly to optimize vascular elasticity.</span>
                </li>
                <li className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-600 mt-1.5 flex-shrink-0" />
                  <span><strong>Nutrition:</strong> Cap dietary salt under 2g sodium/day and prioritize potassium-rich vegetables and fruits.</span>
                </li>
              </ul>
            </div>

            {/* Emergency reminder */}
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-[11px] text-red-900 leading-snug">
              <strong>Remember:</strong> If you or anyone experiences acute FAST symptoms (facial drooping, arm weakness, slurred speech), call emergency services immediately.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
