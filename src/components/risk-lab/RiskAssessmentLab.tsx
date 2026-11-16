'use client';

import React, { useState, useMemo } from 'react';
import { 
  HeartPulse, 
  CheckCircle2, 
  RotateCcw, 
  Zap, 
  Info,
  Brain,
  Activity,
  Sliders,
  BarChart2,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { RISK_LAB_QUESTIONS } from '@/data/educational-content';
import { predictGistStrokeRisk, GistPredictionInput } from '@/lib/gist-ml-engine';

export const RiskAssessmentLab: React.FC = () => {
  const [viewMode, setViewMode] = useState<'ml-predict' | 'questionnaire'>('ml-predict');

  // ML Form State
  const [age, setAge] = useState<number>(58);
  const [gender, setGender] = useState<'Male' | 'Female'>('Male');
  const [everMarried, setEverMarried] = useState<'Yes' | 'No'>('Yes');
  const [workType, setWorkType] = useState<'Private' | 'Self-employed' | 'Govt_job' | 'children' | 'Never_worked'>('Private');
  const [residenceType, setResidenceType] = useState<'Urban' | 'Rural'>('Urban');
  const [hypertension, setHypertension] = useState<boolean>(true);
  const [heartDisease, setHeartDisease] = useState<boolean>(false);
  const [avgGlucoseLevel, setAvgGlucoseLevel] = useState<number>(145);
  const [bmi, setBmi] = useState<number>(28.1);
  const [smokingStatus, setSmokingStatus] = useState<'formerly smoked' | 'never smoked' | 'smokes' | 'Unknown'>('formerly smoked');
  const [modelChoice, setModelChoice] = useState<string>('Ensemble / All Models Comparison');

  // Compute ML Prediction Reactively
  const mlResult = useMemo(() => {
    const input: GistPredictionInput = {
      age,
      gender,
      hypertension,
      heartDisease,
      everMarried,
      workType,
      residenceType,
      avgGlucoseLevel,
      bmi,
      smokingStatus,
      modelChoice
    };
    return predictGistStrokeRisk(input);
  }, [age, gender, hypertension, heartDisease, everMarried, workType, residenceType, avgGlucoseLevel, bmi, smokingStatus, modelChoice]);

  // Educational Questionnaire State
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const totalQuestions = RISK_LAB_QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

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

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl glass-panel reflective-glint flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Brain className="w-6 h-6 text-sky-600" />
            <h2 className="text-xl font-bold text-slate-900 heading-rounded tracking-tight">
              Stroke Risk Assessment & Machine Learning Lab
            </h2>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-300 shadow-sm">
              GIST ML PIPELINE
            </span>
          </div>
          <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
            Assess clinical risk using machine learning models trained on 5,110 patient records (Logistic Regression, Random Forest, Neural Network MLP) with SMOTE class balancing.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-slate-100/90 p-1.5 rounded-xl border border-slate-200/80 shadow-xs">
          <button
            onClick={() => setViewMode('ml-predict')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'ml-predict'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>ML Stroke Predictor</span>
          </button>
          <button
            onClick={() => setViewMode('questionnaire')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'questionnaire'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HeartPulse className="w-3.5 h-3.5" />
            <span>Lifestyle Questionnaire</span>
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* VIEW 1: MACHINE LEARNING PREDICTION LAB */}
      {/* ===================================================================== */}
      {viewMode === 'ml-predict' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-300">
          {/* Left Column: Clinical Parameters Input Form */}
          <div className="lg:col-span-7 space-y-5">
            <div className="p-6 rounded-2xl glass-panel reflective-glint shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-sky-600" />
                  <span className="text-sm font-bold text-slate-900 heading-rounded">Patient Clinical Inputs</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">Live Auto-Inference</span>
              </div>

              {/* Demographics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 flex justify-between">
                    <span>Patient Age:</span>
                    <span className="font-mono text-sky-700 font-extrabold">{age} years</span>
                  </label>
                  <input
                    type="range"
                    min="18"
                    max="100"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full mt-2 accent-sky-600 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Biological Gender</label>
                  <div className="flex gap-2">
                    {(['Male', 'Female'] as const).map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setGender(g)}
                        className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold border transition-all ${
                          gender === g
                            ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                            : 'bg-white/80 text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Vitals & Biomarkers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                <div>
                  <label className="text-xs font-bold text-slate-700 flex justify-between">
                    <span>Avg Glucose Level:</span>
                    <span className="font-mono text-sky-700 font-extrabold">{avgGlucoseLevel} mg/dL</span>
                  </label>
                  <input
                    type="range"
                    min="60"
                    max="280"
                    value={avgGlucoseLevel}
                    onChange={(e) => setAvgGlucoseLevel(Number(e.target.value))}
                    className="w-full mt-2 accent-sky-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>Normal &lt;100</span>
                    <span>Pre-diabetes 100–140</span>
                    <span>Diabetes &gt;140</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 flex justify-between">
                    <span>Body Mass Index (BMI):</span>
                    <span className="font-mono text-sky-700 font-extrabold">{bmi} kg/m²</span>
                  </label>
                  <input
                    type="range"
                    min="16"
                    max="50"
                    step="0.1"
                    value={bmi}
                    onChange={(e) => setBmi(Number(e.target.value))}
                    className="w-full mt-2 accent-sky-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>Normal 18.5–24.9</span>
                    <span>Median: 28.1</span>
                    <span>Obesity ≥30</span>
                  </div>
                </div>
              </div>

              {/* Comorbidities */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200/80 bg-white/60 hover:bg-white cursor-pointer transition-all">
                  <input
                    type="checkbox"
                    checked={hypertension}
                    onChange={(e) => setHypertension(e.target.checked)}
                    className="w-4 h-4 rounded text-sky-600 accent-sky-600 cursor-pointer"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Arterial Hypertension</div>
                    <div className="text-[10px] text-slate-500">History of high blood pressure</div>
                  </div>
                </label>

                <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200/80 bg-white/60 hover:bg-white cursor-pointer transition-all">
                  <input
                    type="checkbox"
                    checked={heartDisease}
                    onChange={(e) => setHeartDisease(e.target.checked)}
                    className="w-4 h-4 rounded text-sky-600 accent-sky-600 cursor-pointer"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Heart Disease</div>
                    <div className="text-[10px] text-slate-500">CAD / Prior cardiac arrhythmia</div>
                  </div>
                </label>
              </div>

              {/* Lifestyle & Socioeconomic */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Smoking History</label>
                  <select
                    value={smokingStatus}
                    onChange={(e) => setSmokingStatus(e.target.value as any)}
                    className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white font-medium focus:outline-sky-500"
                  >
                    <option value="never smoked">Never Smoked</option>
                    <option value="formerly smoked">Formerly Smoked</option>
                    <option value="smokes">Active Smoker</option>
                    <option value="Unknown">Unknown</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Employment Sector</label>
                  <select
                    value={workType}
                    onChange={(e) => setWorkType(e.target.value as any)}
                    className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white font-medium focus:outline-sky-500"
                  >
                    <option value="Private">Private Company</option>
                    <option value="Self-employed">Self-Employed</option>
                    <option value="Govt_job">Government Service</option>
                    <option value="Never_worked">Never Worked</option>
                    <option value="children">Children</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Residence Setting</label>
                  <div className="flex gap-1.5">
                    {(['Urban', 'Rural'] as const).map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setResidenceType(r)}
                        className={`flex-1 py-2 px-2 rounded-lg text-xs font-semibold border transition-all ${
                          residenceType === r
                            ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Model Choice Selector */}
              <div className="pt-2 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-700 block mb-1">Active Model Architecture</label>
                <select
                  value={modelChoice}
                  onChange={(e) => setModelChoice(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white font-medium focus:outline-sky-500"
                >
                  <option value="Ensemble / All Models Comparison">Ensemble Consensus (Average of all 3 models)</option>
                  <option value="Logistic Regression">Logistic Regression (ROC-AUC 0.8226 — High Sensitivity)</option>
                  <option value="Neural Network (MLP)">Neural Network MLP (ROC-AUC 0.7660 — Non-Linear)</option>
                  <option value="Random Forest">Random Forest Classifier (ROC-AUC 0.7510 — 100 Trees)</option>
                </select>
              </div>
            </div>

            {/* Gist Training Pipeline Provenance */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 text-xs text-slate-600 space-y-1.5">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                <span>Gist ML Training Pipeline Architecture:</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Trained on the benchmark 5,110 patient dataset using <strong>SMOTE</strong> (Synthetic Minority Over-sampling) on training partitions to address the 4.9% positive stroke class imbalance, <strong>StandardScaler</strong> on continuous age/glucose/BMI, and median BMI imputation.
              </p>
            </div>
          </div>

          {/* Right Column: Real-Time Results & Cross-Model Comparison */}
          <div className="lg:col-span-5 space-y-5">
            {/* Main Risk Output Card */}
            <div className="p-6 rounded-2xl glass-panel reflective-glint shadow-sm border-t-4 border-t-sky-600 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Stratified Risk Tier</span>
                <span
                  className="text-xs font-extrabold px-3 py-1 rounded-full border shadow-xs"
                  style={{
                    backgroundColor: `${mlResult.riskColor}15`,
                    color: mlResult.riskColor,
                    borderColor: `${mlResult.riskColor}40`
                  }}
                >
                  {mlResult.riskCategory}
                </span>
              </div>

              <div>
                <div className="text-4xl font-black font-mono tracking-tight" style={{ color: mlResult.riskColor }}>
                  {mlResult.probability}%
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Estimated 10-Year Probability of Acute Cerebrovascular Event
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="h-full transition-all duration-300"
                  style={{ 
                    width: `${Math.min(100, Math.max(2, mlResult.probability))}%`,
                    backgroundColor: mlResult.riskColor
                  }}
                />
              </div>

              {/* Cross-Model Comparison Bar Charts */}
              <div className="p-4 rounded-xl bg-slate-50/90 border border-slate-200/80 space-y-3">
                <div className="text-xs font-bold text-slate-800 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <BarChart2 className="w-3.5 h-3.5 text-sky-600" />
                    <span>Cross-Model Probabilities:</span>
                  </span>
                  <span className="text-[10px] text-slate-500">From Gist Notebook</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-600 mb-1">
                      <span>Logistic Regression (AUC 0.8226)</span>
                      <span className="font-mono font-bold text-slate-900">{mlResult.modelScores.logisticRegression}%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-sky-500 h-full" style={{ width: `${mlResult.modelScores.logisticRegression}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-slate-600 mb-1">
                      <span>Random Forest (AUC 0.7510)</span>
                      <span className="font-mono font-bold text-slate-900">{mlResult.modelScores.randomForest}%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full" style={{ width: `${mlResult.modelScores.randomForest}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-slate-600 mb-1">
                      <span>Neural Network MLP (AUC 0.7660)</span>
                      <span className="font-mono font-bold text-slate-900">{mlResult.modelScores.neuralNetwork}%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-purple-500 h-full" style={{ width: `${mlResult.modelScores.neuralNetwork}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Patient Flags */}
              {mlResult.identifiedFactors.length > 0 && (
                <div className="space-y-1.5 pt-2">
                  <div className="text-xs font-bold text-amber-800 flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                    <span>Vascular Risk Flags Detected:</span>
                  </div>
                  <ul className="text-[11px] text-slate-700 space-y-1 pl-4 list-disc">
                    {mlResult.identifiedFactors.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Recommendations */}
              <div className="space-y-1.5 pt-2 border-t border-slate-200/80">
                <div className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Clinical & Lifestyle Action Directives:</span>
                </div>
                <ul className="text-[11px] text-slate-700 space-y-1 pl-4 list-disc">
                  {mlResult.recommendations.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>

              <div className="text-[10px] text-slate-400 pt-2 border-t border-slate-100">
                *Disclaimer: For educational surveillance only. Not an individual medical diagnosis.*
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* VIEW 2: LIFESTYLE QUESTIONNAIRE */}
      {/* ===================================================================== */}
      {viewMode === 'questionnaire' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
          {/* Questions Stream */}
          <div className="lg:col-span-2 space-y-4">
            {RISK_LAB_QUESTIONS.map((q) => {
              const selectedOpt = answers[q.id];
              const isAnswered = selectedOpt !== undefined;

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-2xl glass-panel reflective-glint transition-all duration-200 shadow-sm ${
                    isAnswered ? 'border-sky-300 bg-sky-50/20' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-800 font-bold text-xs flex items-center justify-center font-mono">
                        {q.order}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 heading-rounded">
                        {q.title}
                      </h3>
                    </div>
                    {isAnswered && (
                      <CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
                    )}
                  </div>

                  <p className="text-xs text-slate-600 mb-3.5 ml-8 leading-relaxed">
                    {q.explanation}
                  </p>

                  <div className="space-y-2 ml-8">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedOpt === optIdx;

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          className={`w-full text-left p-3 rounded-xl text-xs transition-all border ${
                            isSelected
                              ? 'bg-sky-600 text-white font-medium border-sky-600 shadow-xs'
                              : 'bg-white/80 hover:bg-white text-slate-700 border-slate-200/80 hover:border-slate-300'
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Questionnaire Summary Sidebar */}
          <div className="space-y-4">
            <div className="glass-panel reflective-glint rounded-2xl p-5 sticky top-20 space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
                <span className="text-xs uppercase font-semibold tracking-wide text-slate-500">
                  Awareness Profile
                </span>
                <span className="text-[10px] font-bold text-sky-700 font-mono">
                  {answeredCount} of {totalQuestions} answered
                </span>
              </div>

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

              <button
                onClick={() => setAnswers({})}
                className="w-full py-2 px-3 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Questionnaire</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
