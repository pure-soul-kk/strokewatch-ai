export interface RiskQuestion {
  id: string;
  category: string;
  question: string;
  subtext: string;
  iconName: string;
  options: {
    label: string;
    sublabel?: string;
    score: number; // educational risk score weighting
    guidance: string;
  }[];
}

export const RISK_LAB_QUESTIONS: RiskQuestion[] = [
  {
    id: 'age_bracket',
    category: 'Demographics',
    question: 'What is your current age category?',
    subtext: 'Stroke risk doubles every decade after age 55, though 1 in 7 strokes now occur in individuals aged 18 to 50.',
    iconName: 'User',
    options: [
      { label: 'Under 45 years', sublabel: 'Young adult cohort', score: 0, guidance: 'Young onset strokes are less common but rising due to lifestyle, vaping, and silent vascular conditions.' },
      { label: '45 to 54 years', sublabel: 'Early middle age', score: 1, guidance: 'Vascular elasticity begins shifting; baseline blood pressure and lipid checks become vital.' },
      { label: '55 to 64 years', sublabel: 'Middle age transition', score: 2, guidance: 'Cumulative exposure to metabolic and lifestyle risk factors starts manifesting in arterial stiffness.' },
      { label: '65 years or older', sublabel: 'Peak incidence demographic', score: 3, guidance: 'Two-thirds of all strokes occur in this cohort. Strict BP management and arrhythmia screening are essential.' }
    ]
  },
  {
    id: 'blood_pressure',
    category: 'Cardiovascular',
    question: 'What is your typical resting blood pressure reading?',
    subtext: 'Hypertension is the single greatest modifiable contributor to both ischemic and hemorrhagic strokes.',
    iconName: 'Activity',
    options: [
      { label: 'Normal (< 120 / 80 mmHg)', sublabel: 'Optimal vascular pressure', score: 0, guidance: 'Excellent. Maintaining normal blood pressure preserves arterial endothelium and microvessels.' },
      { label: 'Elevated (120–129 / < 80 mmHg)', sublabel: 'Pre-hypertension stage', score: 1, guidance: 'Lifestyle adjustments (salt reduction, aerobic exercise) can revert elevated pressure to normal.' },
      { label: 'Stage 1 Hypertension (130–139 / 80–89 mmHg)', sublabel: 'Moderate risk threshold', score: 2, guidance: 'Doubles long-term stroke risk if left unmonitored. Medical consultation is recommended.' },
      { label: 'Stage 2 or Unknown (≥ 140 / 90 mmHg)', sublabel: 'Significant clinical risk', score: 3, guidance: 'Triples stroke risk. Requires urgent clinical evaluation, daily tracking, and targeted therapy.' }
    ]
  },
  {
    id: 'smoking_status',
    category: 'Behavioral',
    question: 'What is your tobacco or nicotine consumption status?',
    subtext: 'Tobacco chemicals accelerate atherosclerosis, induce platelet clotting, and constrict cerebral blood vessels.',
    iconName: 'Flame',
    options: [
      { label: 'Never smoked or consumed tobacco', sublabel: 'Zero exposure', score: 0, guidance: 'You avoid the 200% elevated stroke risk associated with sustained tobacco inhalation.' },
      { label: 'Quit more than 5 years ago', sublabel: 'Former smoker', score: 0, guidance: 'After 5 years of cessation, stroke risk approaches that of a lifelong non-smoker.' },
      { label: 'Quit within the past 1 to 4 years', sublabel: 'Recent cessation', score: 1, guidance: 'Your arterial lining is actively recovering. Endothelial function improves continuously post-quitting.' },
      { label: 'Active smoker / tobacco user', sublabel: 'Daily or occasional use', score: 3, guidance: 'Smoking doubles your stroke risk and promotes clot formation. Cessation support programs are highly effective.' }
    ]
  },
  {
    id: 'physical_activity',
    category: 'Lifestyle',
    question: 'How much moderate-to-vigorous physical exercise do you get weekly?',
    subtext: 'Regular exercise promotes cerebral collateral vessel growth, regulates insulin sensitivity, and lowers blood pressure.',
    iconName: 'Zap',
    options: [
      { label: '150+ minutes per week', sublabel: 'Meets WHO physical guidelines', score: 0, guidance: 'Superb! Active adults have a 25–30% lower incidence of stroke compared to sedentary peers.' },
      { label: '60 to 149 minutes per week', sublabel: 'Moderate activity level', score: 1, guidance: 'Good foundation. Increasing to 30 minutes 5 days a week provides optimal cardiovascular shielding.' },
      { label: 'Less than 60 minutes per week', sublabel: 'Predominantly sedentary', score: 2, guidance: 'Prolonged sitting elevates arterial stiffness. Small brisk daily walks generate rapid improvements.' }
    ]
  },
  {
    id: 'blood_sugar',
    category: 'Metabolic',
    question: 'Have you been diagnosed with pre-diabetes or diabetes?',
    subtext: 'Excess circulating glucose damages the fragile endothelial microcirculation of the deep cerebral white matter.',
    iconName: 'Droplet',
    options: [
      { label: 'Normal glucose / No diabetes', sublabel: 'Fasting glucose < 100 mg/dL', score: 0, guidance: 'Normal glycemic parameters protect against cerebral microvascular ischemia.' },
      { label: 'Pre-diabetes / Impaired tolerance', sublabel: 'Fasting 100–125 mg/dL or HbA1c 5.7–6.4%', score: 1, guidance: 'Weight optimization and fiber-rich nutrition can prevent progression to type 2 diabetes.' },
      { label: 'Diagnosed Diabetes (Well-Controlled)', sublabel: 'HbA1c < 7.0% on medication', score: 2, guidance: 'Good control mitigates large vessel stroke risk, but requires ongoing lipid and renal monitoring.' },
      { label: 'Diagnosed Diabetes (Uncontrolled or Unknown)', sublabel: 'HbA1c ≥ 7.0%', score: 3, guidance: 'Elevates stroke risk 2 to 4-fold. Requires close endocrinology care to prevent small vessel occlusion.' }
    ]
  },
  {
    id: 'cardiac_history',
    category: 'Cardiovascular',
    question: 'Do you have a personal history of Atrial Fibrillation, TIA (Mini-stroke), or prior stroke?',
    subtext: 'Atrial fibrillation allows stagnant blood to pool in the left atrial appendage, forming emboli that can migrate directly to the brain.',
    iconName: 'HeartPulse',
    options: [
      { label: 'No cardiac arrhythmias or prior stroke events', sublabel: 'Clear personal baseline', score: 0, guidance: 'No prior high-risk thromboembolic triggers identified.' },
      { label: 'Family history of stroke only', sublabel: 'Genetic predisposition', score: 1, guidance: 'Family history warrants proactive risk profiling, but lifestyle choices modify up to 87% of personal risk.' },
      { label: 'Diagnosed Atrial Fibrillation (AFib)', sublabel: 'Arrhythmia on anticoagulation', score: 3, guidance: 'AFib raises stroke risk 500%. Daily compliance with prescribed oral anticoagulants (DOACs) is critical.' },
      { label: 'Prior TIA (Mini-stroke) or prior stroke', sublabel: 'Established vascular event', score: 4, guidance: 'A TIA is a red alert warning: up to 15% experience a full stroke within 90 days without rapid intervention.' }
    ]
  }
];

export const FAST_SYMPTOMS = [
  {
    letter: 'F',
    word: 'FACE',
    title: 'Facial Droop or Asymmetry',
    subtitle: 'Ask the person to smile. Does one side of the face or mouth droop down?',
    visualHint: 'Smile asymmetry, uneven corners of mouth, sudden numbness on one side of face',
    actionTip: 'Look closely at eye crinkles and mouth corners. A sudden uneven smile is a prime motor cortex indicator.',
    color: '#22D3EE'
  },
  {
    letter: 'A',
    word: 'ARMS',
    title: 'Arm Weakness or Drift',
    subtitle: 'Ask the person to raise both arms straight out for 10 seconds. Does one arm drift downward?',
    visualHint: 'Pronator drift, inability to lift arm, numbness, sudden loss of grip strength in hand',
    actionTip: 'Even subtle downward drifting or wrist pronation indicates contralateral motor tract impairment.',
    color: '#3B82F6'
  },
  {
    letter: 'S',
    word: 'SPEECH',
    title: 'Speech Difficulty or Slurring',
    subtitle: 'Ask the person to repeat a simple sentence (e.g. "The sky is blue in the morning"). Can they speak clearly?',
    visualHint: 'Slurred words (dysarthria), wrong words, inability to speak or comprehend language (aphasia)',
    actionTip: 'Listen for mumbled pronunciation, garbled word salads, or failure to understand your spoken words.',
    color: '#F59E0B'
  },
  {
    letter: 'T',
    word: 'TIME',
    title: 'Time to Call Emergency Immediately',
    subtitle: 'If you observe ANY one of these symptoms, call emergency services immediately (911, 112, 102). Do NOT wait.',
    visualHint: 'Check exact time of symptom onset or "last known well". Every second saves 32,000 neurons.',
    actionTip: 'Do not wait for symptoms to disappear. Do not let the person sleep. Transport via emergency ambulance immediately.',
    color: '#EF4444'
  }
];

export const EMERGENCY_NUMBERS = [
  { country: 'India', code: 'IND', dial: '112 / 102', ambulance: '108', notes: 'National Emergency / Catastrophe Ambulance Network' },
  { country: 'United States & Canada', code: 'USA/CAN', dial: '911', ambulance: '911', notes: 'Request primary stroke-certified comprehensive center' },
  { country: 'European Union & UK', code: 'EU/UK', dial: '112 / 999', ambulance: '112', notes: 'Pan-European single emergency number' },
  { country: 'Australia', code: 'AUS', dial: '000', ambulance: '000', notes: 'Direct ambulance dispatch with stroke triage protocols' },
  { country: 'Japan', code: 'JPN', dial: '119', ambulance: '119', notes: 'Fire and ambulance emergency dispatch' }
];
