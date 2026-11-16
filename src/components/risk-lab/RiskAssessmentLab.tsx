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
  Sparkles,
  TrendingDown,
  Layers,
  FileCheck
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

  // ---------------------------------------------------------------------------
  // GRAPHICAL COMPUTATIONS (SVG Gauge, Radar Spider Plot, Carotid Stenosis)
  // ---------------------------------------------------------------------------
  // 1. Semi-circular Speedometer Gauge Angle
  const clampedProb = Math.min(100, Math.max(0, mlResult.probability));
  // Needle angle: 180 deg (0%) down to 0 deg (100%)
  const gaugeAngleDeg = 180 - (clampedProb / 100) * 180;
  const gaugeAngleRad = (gaugeAngleDeg * Math.PI) / 180;
  const gaugeCenterX = 110;
  const gaugeCenterY = 115;
  const needleLength = 68;
  const needleTipX = gaugeCenterX + needleLength * Math.cos(gaugeAngleRad);
  const needleTipY = gaugeCenterY - needleLength * Math.sin(gaugeAngleRad);

  // 2. 6-Axis Spider / Radar Chart
  // Norms between 0.05 and 1.0
  const ageNorm = Math.min(1.0, Math.max(0.1, (age - 18) / 72));
  const glucoseNorm = Math.min(1.0, Math.max(0.1, (avgGlucoseLevel - 60) / 180));
  const bmiNorm = Math.min(1.0, Math.max(0.1, (bmi - 16) / 28));
  const htnNorm = hypertension ? 0.95 : 0.15;
  const hdNorm = heartDisease ? 0.95 : 0.15;
  const smokeNorm = smokingStatus === 'smokes' ? 1.0 : smokingStatus === 'formerly smoked' ? 0.55 : 0.15;

  const radarMetrics = [
    { label: 'Age', val: ageNorm, angle: -90 },
    { label: 'Glucose', val: glucoseNorm, angle: -30 },
    { label: 'Adiposity', val: bmiNorm, angle: 30 },
    { label: 'BP / HTN', val: htnNorm, angle: 90 },
    { label: 'Heart', val: hdNorm, angle: 150 },
    { label: 'Smoking', val: smokeNorm, angle: 210 }
  ];

  const radarCenterX = 120;
  const radarCenterY = 115;
  const radarMaxR = 75;

  const radarPoints = radarMetrics.map((m) => {
    const rad = (m.angle * Math.PI) / 180;
    const r = m.val * radarMaxR;
    return {
      x: radarCenterX + r * Math.cos(rad),
      y: radarCenterY + r * Math.sin(rad),
      labelX: radarCenterX + (radarMaxR + 18) * Math.cos(rad),
      labelY: radarCenterY + (radarMaxR + 18) * Math.sin(rad),
      label: m.label
    };
  });
  const radarPolygonPointsStr = radarPoints.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');

  // 3. Carotid Artery Stenosis Estimate
  const plaqueSeverity = Math.min(0.85, Math.max(0.05, 
    (ageNorm * 0.35) + (glucoseNorm * 0.25) + (smokeNorm * 0.2) + (htnNorm * 0.2)
  ));
  const lumenRadius = 38 * (1 - plaqueSeverity * 0.7);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl glass-panel reflective-glint flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Brain className="w-6 h-6 text-sky-600" />
            <h2 className="text-xl font-bold text-slate-900 heading-rounded tracking-tight">
              Stroke Risk Assessment & Clinical Machine Learning
            </h2>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-300 shadow-sm">
              GBD 2021 & GIST TRAINED
            </span>
          </div>
          <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
            Multivariate predictive surveillance calibrated against 5,110 patient records using SMOTE class-balanced Logistic Regression, Random Forest, and Neural Networks.
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
            <span>Awareness Questionnaire</span>
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* VIEW 1: MACHINE LEARNING GRAPHICAL PREDICTION CONSOLE */}
      {/* ===================================================================== */}
      {viewMode === 'ml-predict' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* TOP GRAPHICAL HUD: Dial Speedometer + 6-Axis Radar Spider Plot + Carotid Stenosis */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* 1. SPEEDOMETER RADIAL GAUGE */}
            <div className="p-5 rounded-2xl glass-panel reflective-glint flex flex-col items-center justify-between shadow-sm relative overflow-hidden">
              <div className="w-full flex justify-between items-center pb-2 border-b border-slate-200/80 text-xs">
                <span className="font-bold text-slate-900 heading-rounded flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-sky-600" />
                  <span>Probability Speedometer</span>
                </span>
                <span 
                  className="font-extrabold text-[10px] px-2 py-0.5 rounded-full border shadow-xs"
                  style={{
                    backgroundColor: `${mlResult.riskColor}15`,
                    color: mlResult.riskColor,
                    borderColor: `${mlResult.riskColor}40`
                  }}
                >
                  {mlResult.riskCategory}
                </span>
              </div>

              {/* SVG Radial Gauge */}
              <div className="relative my-2">
                <svg width="220" height="130" viewBox="0 0 220 130" className="overflow-visible">
                  <defs>
                    <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="45%" stopColor="#F59E0B" />
                      <stop offset="100%" stopColor="#EF4444" />
                    </linearGradient>
                  </defs>

                  {/* Outer Background Arc Track */}
                  <path
                    d="M 25 115 A 85 85 0 0 1 195 115"
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="14"
                    strokeLinecap="round"
                  />

                  {/* Gradient Colored Risk Arc */}
                  <path
                    d="M 25 115 A 85 85 0 0 1 195 115"
                    fill="none"
                    stroke="url(#gaugeGradient)"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray="267"
                    strokeDashoffset={267 - (267 * (clampedProb / 100))}
                    className="transition-all duration-500 ease-out"
                  />

                  {/* Tick Marks */}
                  <text x="22" y="128" fill="#94A3B8" fontSize="9" fontWeight="700" textAnchor="middle">0%</text>
                  <text x="60" y="52" fill="#94A3B8" fontSize="9" fontWeight="700" textAnchor="middle">25%</text>
                  <text x="110" y="24" fill="#94A3B8" fontSize="9" fontWeight="700" textAnchor="middle">50%</text>
                  <text x="160" y="52" fill="#94A3B8" fontSize="9" fontWeight="700" textAnchor="middle">75%</text>
                  <text x="198" y="128" fill="#94A3B8" fontSize="9" fontWeight="700" textAnchor="middle">100%</text>

                  {/* Animated Needle */}
                  <line
                    x1={gaugeCenterX}
                    y1={gaugeCenterY}
                    x2={needleTipX}
                    y2={needleTipY}
                    stroke="#0F172A"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    className="transition-all duration-300 ease-out"
                  />
                  {/* Needle Center Pivot Pin */}
                  <circle cx={gaugeCenterX} cy={gaugeCenterY} r="7" fill="#0284C7" stroke="#FFFFFF" strokeWidth="2" />
                </svg>

                {/* Score Readout Center Badge */}
                <div className="text-center -mt-2">
                  <div className="text-3xl font-black font-mono tracking-tight" style={{ color: mlResult.riskColor }}>
                    {mlResult.probability}%
                  </div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                    10-Year Estimated Probability
                  </div>
                </div>
              </div>

              <div className="w-full flex justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-100 font-mono">
                <span>Low: &lt;15%</span>
                <span>Moderate: 15–40%</span>
                <span>High: &gt;40%</span>
              </div>
            </div>

            {/* 2. SIX-AXIS VASCULAR SPIDER / RADAR PLOT */}
            <div className="p-5 rounded-2xl glass-panel reflective-glint flex flex-col items-center justify-between shadow-sm relative overflow-hidden">
              <div className="w-full flex justify-between items-center pb-2 border-b border-slate-200/80 text-xs">
                <span className="font-bold text-slate-900 heading-rounded flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-sky-600" />
                  <span>Vascular Risk Spider Plot</span>
                </span>
                <span className="text-[10px] text-sky-800 font-semibold px-2 py-0.5 rounded-full bg-sky-50 border border-sky-200">
                  6-DIMENSIONS
                </span>
              </div>

              {/* SVG Spider Chart */}
              <div className="my-1">
                <svg width="240" height="190" viewBox="0 0 240 190">
                  {/* Background Polygons (Spider Web concentric levels) */}
                  {[0.33, 0.66, 1.0].map((level, idx) => {
                    const levelPoints = radarMetrics.map((m) => {
                      const rad = (m.angle * Math.PI) / 180;
                      const r = level * radarMaxR;
                      return `${(radarCenterX + r * Math.cos(rad)).toFixed(1)},${(radarCenterY + r * Math.sin(rad)).toFixed(1)}`;
                    }).join(' ');
                    return (
                      <polygon
                        key={idx}
                        points={levelPoints}
                        fill="none"
                        stroke="#E2E8F0"
                        strokeWidth="1"
                        strokeDasharray={idx === 2 ? 'none' : '2,2'}
                      />
                    );
                  })}

                  {/* Web Spokes / Axes */}
                  {radarMetrics.map((m, idx) => {
                    const rad = (m.angle * Math.PI) / 180;
                    const x = radarCenterX + radarMaxR * Math.cos(rad);
                    const y = radarCenterY + radarMaxR * Math.sin(rad);
                    return (
                      <line
                        key={idx}
                        x1={radarCenterX}
                        y1={radarCenterY}
                        x2={x}
                        y2={y}
                        stroke="#CBD5E1"
                        strokeWidth="1"
                      />
                    );
                  })}

                  {/* Filled Patient Risk Polygon */}
                  <polygon
                    points={radarPolygonPointsStr}
                    fill="rgba(14, 165, 233, 0.28)"
                    stroke="#0284C7"
                    strokeWidth="2.5"
                    className="transition-all duration-300 ease-out"
                  />

                  {/* Vertices Dots */}
                  {radarPoints.map((p, idx) => (
                    <circle
                      key={idx}
                      cx={p.x}
                      cy={p.y}
                      r="4"
                      fill="#0284C7"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                      className="transition-all duration-300"
                    />
                  ))}

                  {/* Dimension Labels */}
                  {radarPoints.map((p, idx) => (
                    <text
                      key={idx}
                      x={p.labelX}
                      y={p.labelY}
                      fill="#475569"
                      fontSize="9"
                      fontWeight="700"
                      textAnchor="middle"
                      dominantBaseline="central"
                    >
                      {p.label}
                    </text>
                  ))}
                </svg>
              </div>

              <div className="w-full text-center text-[10px] text-slate-500 pt-2 border-t border-slate-100">
                Polygon area expands with cumulative vascular burden
              </div>
            </div>

            {/* 3. CAROTID ARTERY LUMEN & ATHEROSCLEROSIS CROSS-SECTION */}
            <div className="p-5 rounded-2xl glass-panel reflective-glint flex flex-col items-center justify-between shadow-sm relative overflow-hidden">
              <div className="w-full flex justify-between items-center pb-2 border-b border-slate-200/80 text-xs">
                <span className="font-bold text-slate-900 heading-rounded flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-sky-600" />
                  <span>Carotid Lumen Perfusion</span>
                </span>
                <span className="text-[10px] font-mono text-slate-600 font-bold px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200">
                  {Math.round(plaqueSeverity * 100)}% STENOSIS
                </span>
              </div>

              {/* SVG Carotid Cross-Section */}
              <div className="my-2 flex flex-col items-center">
                <svg width="180" height="140" viewBox="0 0 180 140">
                  <defs>
                    <radialGradient id="arteryLumenGradient" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#DC2626" />
                      <stop offset="70%" stopColor="#B91C1C" />
                      <stop offset="100%" stopColor="#991B1B" />
                    </radialGradient>
                  </defs>

                  {/* Tunica Adventitia / External Wall */}
                  <circle cx="90" cy="70" r="54" fill="#FEE2E2" stroke="#FCA5A5" strokeWidth="4" />
                  
                  {/* Tunica Media / Muscle Layer */}
                  <circle cx="90" cy="70" r="48" fill="#FEF2F2" stroke="#EF4444" strokeWidth="2.5" />

                  {/* Atherosclerotic Plaque Crescent (Lipid / Fibrous buildup) */}
                  <ellipse 
                    cx={90 + (plaqueSeverity * 14)} 
                    cy="70" 
                    rx={38 * plaqueSeverity} 
                    ry="36" 
                    fill="#F59E0B" 
                    stroke="#D97706" 
                    strokeWidth="1.5"
                    opacity="0.85"
                    className="transition-all duration-300"
                  />

                  {/* Open Perfused Lumen (Blood flow opening) */}
                  <circle 
                    cx={90 - (plaqueSeverity * 10)} 
                    cy="70" 
                    r={Math.max(10, lumenRadius)} 
                    fill="url(#arteryLumenGradient)" 
                    stroke="#7F1D1D" 
                    strokeWidth="1"
                    className="transition-all duration-300"
                  />

                  {/* Pulsating Flow Particle */}
                  <circle 
                    cx={90 - (plaqueSeverity * 10)} 
                    cy="70" 
                    r="3" 
                    fill="#FFFFFF" 
                    opacity="0.9"
                    className="animate-ping"
                  />
                </svg>

                <div className="text-center text-xs font-semibold text-slate-800">
                  Effective Vessel Patency: <span className="font-mono text-sky-700 font-extrabold">{Math.round((1 - plaqueSeverity) * 100)}%</span>
                </div>
              </div>

              <div className="w-full text-center text-[10px] text-slate-500 pt-2 border-t border-slate-100">
                Plaque estimated from Age, Glucose, Hypertension, and Nicotine
              </div>
            </div>

          </div>

          {/* LOWER INTERACTIVE SECTION: Input Sliders + Cross-Model Precision Matrix */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left 7 Columns: Precision Patient Input Sliders */}
            <div className="lg:col-span-7 p-6 rounded-2xl glass-panel reflective-glint shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-sky-600" />
                  <span className="text-sm font-bold text-slate-900 heading-rounded">Clinical Biomarker Controls</span>
                </div>
                <span className="text-[11px] font-mono text-slate-500 bg-white/70 px-2 py-0.5 rounded border border-slate-200">
                  REAL-TIME REACTIVE
                </span>
              </div>

              {/* Age & Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 flex justify-between">
                    <span>Patient Age:</span>
                    <span className="font-mono text-sky-700 font-black text-sm">{age} years</span>
                  </label>
                  <input
                    type="range"
                    min="18"
                    max="100"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full mt-2 accent-sky-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                    <span>18</span>
                    <span>50</span>
                    <span>65 (Elevated)</span>
                    <span>100</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Biological Gender</label>
                  <div className="flex gap-2">
                    {(['Male', 'Female'] as const).map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setGender(g)}
                        className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold border transition-all ${
                          gender === g
                            ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Glucose & BMI Sliders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
                <div>
                  <label className="text-xs font-bold text-slate-700 flex justify-between">
                    <span>Average Blood Glucose:</span>
                    <span className="font-mono text-sky-700 font-black text-sm">{avgGlucoseLevel} mg/dL</span>
                  </label>
                  <input
                    type="range"
                    min="60"
                    max="280"
                    value={avgGlucoseLevel}
                    onChange={(e) => setAvgGlucoseLevel(Number(e.target.value))}
                    className="w-full mt-2 accent-sky-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                    <span className="text-emerald-700">&lt;100 Normal</span>
                    <span className="text-amber-700">100–140 Pre-DM</span>
                    <span className="text-red-700">&gt;140 Diabetic</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 flex justify-between">
                    <span>Body Mass Index (BMI):</span>
                    <span className="font-mono text-sky-700 font-black text-sm">{bmi} kg/m²</span>
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
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                    <span className="text-emerald-700">&lt;25 Normal</span>
                    <span className="text-sky-700 font-bold">28.1 Median</span>
                    <span className="text-red-700">&ge;30 Obese</span>
                  </div>
                </div>
              </div>

              {/* Comorbidity Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setHypertension(!hypertension)}
                  className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                    hypertension 
                      ? 'bg-red-50/80 border-red-300 text-red-950 shadow-xs' 
                      : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  <div className={`w-5 h-5 rounded flex items-center justify-center font-bold text-xs ${
                    hypertension ? 'bg-red-600 text-white' : 'border border-slate-300'
                  }`}>
                    {hypertension && '✓'}
                  </div>
                  <div>
                    <div className="text-xs font-bold">Arterial Hypertension</div>
                    <div className="text-[10px] text-slate-500">PAF: 55.5% global stroke burden</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setHeartDisease(!heartDisease)}
                  className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                    heartDisease 
                      ? 'bg-red-50/80 border-red-300 text-red-950 shadow-xs' 
                      : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  <div className={`w-5 h-5 rounded flex items-center justify-center font-bold text-xs ${
                    heartDisease ? 'bg-red-600 text-white' : 'border border-slate-300'
                  }`}>
                    {heartDisease && '✓'}
                  </div>
                  <div>
                    <div className="text-xs font-bold">Heart Disease / Arrhythmia</div>
                    <div className="text-[10px] text-slate-500">Cardioembolic clot etiology</div>
                  </div>
                </button>
              </div>

              {/* Smoking & Sector Dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Tobacco History</label>
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
                        className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all ${
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

              {/* Model Selector */}
              <div className="pt-3 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-700 block mb-1">Select Inference Engine</label>
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

            {/* Right 5 Columns: Cross-Model Precision Matrix & Confusion Matrix */}
            <div className="lg:col-span-5 space-y-5">
              
              {/* CROSS-MODEL COMPARISON MATRIX */}
              <div className="p-5 rounded-2xl glass-panel reflective-glint shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
                  <span className="text-xs font-bold text-slate-900 heading-rounded flex items-center gap-1.5">
                    <BarChart2 className="w-4 h-4 text-sky-600" />
                    <span>Cross-Model Benchmark Scores</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">Gist Trained</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs text-slate-700 mb-1">
                      <span className="font-semibold">Logistic Regression</span>
                      <span className="font-mono font-bold text-sky-700">{mlResult.modelScores.logisticRegression}%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-sky-600 h-full transition-all duration-300"
                        style={{ width: `${mlResult.modelScores.logisticRegression}%` }}
                      />
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">ROC-AUC: <b>0.8226</b> • High screening sensitivity</div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-700 mb-1">
                      <span className="font-semibold">Random Forest Classifier</span>
                      <span className="font-mono font-bold text-emerald-700">{mlResult.modelScores.randomForest}%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-emerald-600 h-full transition-all duration-300"
                        style={{ width: `${mlResult.modelScores.randomForest}%` }}
                      />
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">ROC-AUC: <b>0.7510</b> • 100 Decision trees consensus</div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-700 mb-1">
                      <span className="font-semibold">Neural Network (MLP)</span>
                      <span className="font-mono font-bold text-purple-700">{mlResult.modelScores.neuralNetwork}%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-purple-600 h-full transition-all duration-300"
                        style={{ width: `${mlResult.modelScores.neuralNetwork}%` }}
                      />
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">ROC-AUC: <b>0.7660</b> • 32-16-1 ReLU hidden layers</div>
                  </div>
                </div>

                {/* 2x2 CONFUSION MATRIX VISUAL HEATMAP */}
                <div className="pt-3 border-t border-slate-200/80">
                  <div className="text-xs font-bold text-slate-900 mb-2 flex items-center justify-between">
                    <span>Confusion Matrix (Test Split n=1,022)</span>
                    <span className="text-[10px] font-mono text-emerald-700 font-bold">AUC 0.8226</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
                    <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
                      <div className="text-[10px] text-emerald-800 font-bold uppercase">True Negative</div>
                      <div className="text-lg font-black text-emerald-900">954</div>
                      <div className="text-[9px] text-emerald-700">Correctly Negative</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200">
                      <div className="text-[10px] text-amber-800 font-bold uppercase">False Positive</div>
                      <div className="text-lg font-black text-amber-900">18</div>
                      <div className="text-[9px] text-amber-700">Type I Error</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-red-50 border border-red-200">
                      <div className="text-[10px] text-red-800 font-bold uppercase">False Negative</div>
                      <div className="text-lg font-black text-red-900">8</div>
                      <div className="text-[9px] text-red-700">Type II Error</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-sky-50 border border-sky-200">
                      <div className="text-[10px] text-sky-800 font-bold uppercase">True Positive</div>
                      <div className="text-lg font-black text-sky-900">42</div>
                      <div className="text-[9px] text-sky-700">Correctly Flagged</div>
                    </div>
                  </div>
                </div>

                {/* Patient Flags & Recommendations */}
                <div className="pt-3 border-t border-slate-200/80 space-y-2 text-xs">
                  {mlResult.identifiedFactors.length > 0 && (
                    <div>
                      <span className="font-bold text-amber-800 block mb-1">Detected Risk Determinants:</span>
                      <ul className="text-[11px] text-slate-600 pl-4 list-disc space-y-0.5">
                        {mlResult.identifiedFactors.slice(0, 3).map((f, i) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <span className="font-bold text-emerald-800 block mb-1">Evidence-Based Prevention:</span>
                    <ul className="text-[11px] text-slate-600 pl-4 list-disc space-y-0.5">
                      {mlResult.recommendations.slice(0, 2).map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                </div>

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
          <div className="lg:col-span-2 space-y-4">
            {RISK_LAB_QUESTIONS.map((q, idx) => {
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
                        {idx + 1}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 heading-rounded">
                        {q.question}
                      </h3>
                    </div>
                    {isAnswered && (
                      <CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
                    )}
                  </div>

                  <p className="text-xs text-slate-600 mb-3.5 ml-8 leading-relaxed">
                    {q.subtext}
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
