export interface StatisticMetric {
  id: string;
  label: string;
  value: number;
  formattedValue: string;
  unit: string;
  reportingPeriod: string;
  source: string;
  lastUpdated: string;
  isEstimate: boolean;
  trendPercentage: number;
  trendDirection: 'up' | 'down' | 'neutral';
  confidenceInterval?: [number, number];
  description: string;
}

export interface CountryStrokeData {
  iso: string;
  name: string;
  region: string;
  flagEmoji: string;
  population: number; // in millions
  incidenceRate: number; // per 100k
  mortalityRate: number; // per 100k
  prevalenceRate: number; // per 100k
  dalyRate: number; // DALYs per 100k
  annualCases: number;
  annualDeaths: number;
  ischemicPercent: number;
  hemorrhagicPercent: number;
  dataQuality: 'High' | 'Moderate' | 'Modelled' | 'Unavailable';
  source: string;
  year: number;
}

export interface IndiaRegistryData {
  id: string;
  city: string;
  state: string;
  coordinates: [number, number]; // [lat, lng]
  crudeIncidenceRate: number; // per 100,000
  ageAdjustedIncidenceRate: number; // AAMR/AAIR per 100k
  ischemicShare: number; // %
  hemorrhagicShare: number; // %
  meanAge: number;
  hypertensionPrevalence: number; // % in stroke registry
  diabetesPrevalence: number; // %
  maleRatio: number; // %
  femaleRatio: number; // %
  registryType: 'Population-Based (PBSR)' | 'Hospital-Based (HBSR)';
  reportingPeriod: string;
  sampleSize: number;
  source: string;
}

export interface RiskFactorPAF {
  id: string;
  name: string;
  category: 'Metabolic' | 'Behavioral' | 'Environmental';
  globalPAF: number; // Population Attributable Fraction %
  indiaPAF: number;
  description: string;
  relativeRisk: number;
  interventionPotential: string;
  actionableStep: string;
}

export interface ResearchArticle {
  id: string;
  title: string;
  publisher: string;
  journal: string;
  publishedDate: string;
  category: 'Epidemiology' | 'Clinical Trials' | 'Prevention' | 'AI & Tech' | 'Policy';
  sourceUrl: string;
  doi?: string;
  aiSummary: string;
  keyTakeaway: string;
  impactScore: number;
}

export interface ImpactStory {
  id: string;
  headline: string;
  patientArchetype: string;
  age: number;
  initialSymptoms: string;
  goldenHourTimeline: string;
  hospitalArrivalMinutes: number;
  intervention: string;
  clinicalOutcome: string;
  educationalTakeaway: string;
  isScenario: boolean; // Educational scenario flag
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  citations?: { title: string; source: string; url?: string }[];
  isEmergencyAlert?: boolean;
}

export interface WhatIfParameters {
  bloodPressureReduction: number; // percentage reduction (0-50%)
  smokingReduction: number; // percentage reduction (0-60%)
  physicalActivityIncrease: number; // percentage increase (0-50%)
  airPollutionImprovement: number; // percentage reduction in PM2.5 (0-40%)
  targetHorizonYear: number; // 2025 to 2040
}
