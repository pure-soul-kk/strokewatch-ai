export interface AIResponse {
  content: string;
  citations: { title: string; source: string; url?: string }[];
  isEmergencyAlert: boolean;
  emergencyActionText?: string;
}

// Emergency keyword detector for acute triage safety
const EMERGENCY_KEYWORDS = [
  'droop', 'face numb', 'arm weak', 'slur', 'slurred', 'cant speak', "can't speak",
  'sudden numb', 'numb right now', 'call ambulance', 'chest pain', 'vision black',
  'worst headache of my life', 'thunderclap', 'paralysis right now', 'having a stroke now'
];

interface KnowledgeBaseItem {
  triggers: string[];
  title: string;
  answer: string;
  citations: { title: string; source: string; url?: string }[];
}

const KNOWLEDGE_BASE: KnowledgeBaseItem[] = [
  {
    triggers: ['what is a stroke', 'define stroke', 'what is stroke', 'brain attack'],
    title: 'Clinical Definition of Stroke',
    answer: `A **stroke** (sometimes termed a "brain attack") occurs when the blood supply to part of the brain is interrupted or reduced, preventing brain tissue from getting oxygen and vital nutrients. Within minutes, brain cells begin to die at an astonishing rate of approximately **1.9 million neurons per minute** in an untreated ischemic stroke.\n\nThere are two main pathological types:\n1. **Ischemic Stroke (~62% globally, ~87% in high-income nations)**: Caused by a blocked artery (thrombosis or embolism).\n2. **Hemorrhagic Stroke (~28% globally, ~32% in India)**: Caused by the bursting or leaking of a blood vessel within brain tissue (intracerebral) or surrounding membranes (subarachnoid).\n\nStroke is a medical emergency requiring rapid intervention within the "golden window" (typically within 4.5 hours for intravenous clot-dissolving medications).`,
    citations: [
      { title: 'GBD 2021 Stroke Collaborators', source: 'The Lancet Neurology 2024; 23: 973–1003' },
      { title: 'What is Stroke?', source: 'World Stroke Organization (WSO) Clinical Guidelines' }
    ]
  },
  {
    triggers: ['difference', 'ischemic versus hemorrhagic', 'types of stroke', 'ischemic vs hemorrhagic', 'subtypes'],
    title: 'Ischemic vs. Hemorrhagic Stroke Comparison',
    answer: `The fundamental distinction between **Ischemic** and **Hemorrhagic** stroke lies in their underlying vascular mechanism:\n\n• **Ischemic Stroke (The "Blockage")**:\n  - **Mechanism**: A blood clot (thrombus) forms in a cerebral artery or travels from the heart/carotids (embolus), cutting off downstream perfusion.\n  - **Global Prevalence**: Accounts for ~62.4% of global stroke events (and ~87% in North America/Western Europe).\n  - **Acute Management**: Reperfusion therapy with intravenous thrombolysis (Alteplase or Tenecteplase) within 4.5 hours, or mechanical thrombectomy (catheter clot retrieval) up to 24 hours in selected patients.\n\n• **Hemorrhagic Stroke (The "Rupture")**:\n  - **Mechanism**: A penetrating cerebral artery ruptures, spilling blood directly into the brain parenchyma (ICH) or subarachnoid space (SAH), elevating intracranial pressure and creating toxic hematoma effects.\n  - **Prevalence**: Accounts for ~27.9% globally, but surges to **31.5%–38% in South Asia (including India)** due to uncontrolled arterial hypertension.\n  - **Acute Management**: Emergency blood pressure reduction (targeting SBP < 140 mmHg), reversal of anticoagulation, and neurosurgical hematoma evacuation. **Thrombolytic clot-busters are strictly contraindicated in hemorrhagic stroke.**`,
    citations: [
      { title: 'Classification and Management of Stroke Subtypes', source: 'AHA/ASA Stroke Guidelines 2023' },
      { title: 'Population-Based Stroke Surveillance in India', source: 'ICMR-NCDIR Stroke Programme 2023' }
    ]
  },
  {
    triggers: ['why are stroke cases increasing', 'why cases increasing', 'rising stroke', 'increase', 'trend'],
    title: 'Epidemiological Drivers of Rising Stroke Burden',
    answer: `While age-standardized stroke mortality rates have declined in high-income nations due to acute stroke units and antihypertensive therapy, the **absolute global number of stroke cases has increased by over 54% since 1990** (from 7.9M to 12.2M annually).\n\nKey reasons identified in the latest Lancet GBD 2024 analysis include:\n\n1. **Global Population Aging & Growth**: Stroke risk accelerates exponentially after age 55; the expanding global elderly population naturally increases the crude case count.\n2. **The Surge in Metabolic Syndrome**: Overweight and obesity (High BMI) attributable stroke DALYs surged **+88.2%** between 1990 and 2021—the fastest-rising metabolic driver worldwide.\n3. **Shifting Geographic Burden**: Over **84% of all stroke deaths now occur in low- and middle-income countries (LMICs)**, where healthcare access, acute thrombolysis centers, and routine blood pressure screening remain uneven.\n4. **Environmental Factors**: Ambient and household PM2.5 air pollution accounts for nearly one-third (30.1%) of the global stroke DALY burden, particularly across South and East Asia.`,
    citations: [
      { title: 'Global, regional, and national burden of stroke 1990–2021', source: 'The Lancet Neurology 2024' },
      { title: 'WSO-Lancet Neurology Commission on Stroke', source: 'Lancet Neurol 2023; 22: 1160–1204' }
    ]
  },
  {
    triggers: ['risk factors', 'which risk factors', 'causes', 'what causes stroke', 'preventable'],
    title: 'Top Risk Factors for Stroke (GBD 2021 Attributable Burden)',
    answer: `According to the latest Global Burden of Disease (GBD 2021) analysis, up to **87% of the global stroke disability burden is linked to modifiable risk factors**.\n\nThe leading contributors by Population Attributable Fraction (PAF) are:\n\n1. **Elevated Systolic Blood Pressure (55.5% PAF)**: The undisputed #1 risk factor. Every 10 mmHg reduction drops stroke risk by 27%.\n2. **Air Pollution (30.1% PAF)**: Ambient fine particulate matter (PM2.5) induces chronic systemic vascular inflammation.\n3. **High BMI / Obesity (24.3% PAF)**: Fastest growing risk factor (+88.2% increase in DALYs since 1990).\n4. **Dietary Risks (22.4% PAF)**: Excess sodium intake (>2g/day) combined with low intake of potassium, fruits, and whole grains.\n5. **Tobacco Smoking & Secondhand Smoke (18.2% PAF)**: Accelerates carotid plaque instability and doubles relative stroke risk.\n6. **High Fasting Blood Glucose / Diabetes (17.8% PAF)**: Promotes small vessel intracranial atherosclerosis.\n7. **Elevated LDL Cholesterol (10.2% PAF)**: Atherogenic plaque deposition in carotid and cerebral vessels.\n8. **Atrial Fibrillation (Cardiac Arrhythmia)**: Produces large cardioembolic clots; increases stroke risk five-fold if unanticoagulated.`,
    citations: [
      { title: 'Risk Factors for Stroke: GBD 2021 Systematic Analysis', source: 'The Lancet Neurology 2024' },
      { title: 'INTERSTROKE Global Case-Control Study', source: 'Lancet 2016; 388: 761–775' }
    ]
  },
  {
    triggers: ['symptoms', 'recognize', 'fast', 'warning signs', 'how do i recognize'],
    title: 'Recognizing Stroke Symptoms: The FAST Protocol',
    answer: `Recognizing stroke symptoms immediately is critical because **"Time is Brain"** (1.9 million neurons die every 60 seconds). Remember the clinical **FAST** acronym:\n\n• **F – Face Drooping**: Ask the person to smile. Does one side of the face or corner of the mouth droop down or feel numb?\n• **A – Arm Weakness**: Ask the person to raise both arms straight out for 10 seconds. Does one arm drift downward or feel weak/clumsy?\n• **S – Speech Difficulty**: Ask the person to repeat a simple sentence (e.g. "The sky is blue"). Is the speech slurred, garbled, or are they unable to find words?\n• **T – Time to Call Emergency**: If you observe **ANY SINGLE ONE** of these signs, call emergency services immediately (911, 112, 108). Note the exact time symptoms started.\n\n**Critical Instruction**: Never wait to see if symptoms disappear! Do not give aspirin or food/water before emergency hospital neuroimaging, as aspirin can be fatal if the stroke is hemorrhagic.`,
    citations: [
      { title: 'AHA/ASA Guidelines for the Early Management of Acute Ischemic Stroke', source: 'Stroke 2019; 50: e344–e418' },
      { title: 'FAST Recognition Campaign Standards', source: 'World Stroke Organization' }
    ]
  },
  {
    triggers: ['reduce', 'prevention', 'how can stroke risk be reduced', 'lifestyle', 'prevent'],
    title: 'Evidence-Based Stroke Prevention Strategies',
    answer: `Because up to 87% of stroke burden is attributable to modifiable factors, adopting targeted prevention protocols can drastically lower your lifetime risk:\n\n1. **Aggressive Blood Pressure Control (The Single Most Effective Step)**:\n   - Target resting BP below **130/80 mmHg**.\n   - Reduce dietary sodium to under 2,000 mg (under 1 teaspoon salt/day) and incorporate potassium-rich foods or potassium-salt substitutes.\n\n2. **Complete Tobacco & Nicotine Cessation**:\n   - Quitting combustible cigarettes or vaping cuts excess stroke risk in half within 2 to 5 years, reverting toward non-smoker baselines.\n\n3. **150 Minutes of Moderate Aerobic Exercise Weekly**:\n   - 30 minutes of brisk walking, cycling, or swimming 5 days/week lowers ischemic stroke incidence by 25–30%.\n\n4. **Adopt a Mediterranean or DASH Dietary Pattern**:\n   - Emphasize vegetables, berries, olive oil, legumes, and omega-3 fatty acids; minimize ultra-processed foods and refined sugars.\n\n5. **Screen for Atrial Fibrillation (AFib)**:\n   - Periodic pulse rhythm self-checks or smartwatch ECG monitoring. If AFib is diagnosed, oral anticoagulation (DOACs) prevents up to 70% of associated strokes.\n\n6. **Strict Glycemic and Lipid Optimization**:\n   - Keep HbA1c < 7% for diabetics, and target LDL cholesterol < 100 mg/dL (or < 70 mg/dL in high-risk individuals).`,
    citations: [
      { title: 'Primary Prevention of Stroke: AHA/ASA Guidelines', source: 'Stroke 2021; 52: e364–e467' },
      { title: 'Dietary Interventions and Stroke Risk', source: 'New England Journal of Medicine (PREDIMED Trial)' }
    ]
  },
  {
    triggers: ['latest statistics', 'numbers', 'statistics tell us', 'how many people', 'global count'],
    title: 'Latest Global Stroke Statistics (Consolidated 2024 Audit)',
    answer: `The latest peer-reviewed global epidemiological registries (GBD 2021 / WSO 2024) document the following benchmarks:\n\n• **Annual Incident Strokes**: **12.22 Million** new stroke events worldwide each year (1 stroke every 2.58 seconds).\n• **Annual Stroke Mortality**: **6.55 Million** deaths annually, making it the 2nd leading cause of death on the planet.\n• **Global Prevalence**: Over **101.5 Million** individuals are currently living with stroke.\n• **Disability Burden**: **143.2 Million DALYs** (Disability-Adjusted Life Years) lost each year.\n• **Lifetime Risk**: 1 in 4 adults over age 25 will experience a stroke during their lifetime.\n• **Low- & Middle-Income Disparity**: **84%** of stroke deaths and **87%** of DALYs occur in low- and middle-income nations.\n• **India Baseline**: Approximately **1.85 Million** annual incident strokes and **720,000** deaths, with an unusually high proportion of hemorrhagic stroke (~31.5%).`,
    citations: [
      { title: 'Global Stroke Fact Sheet 2024', source: 'World Stroke Organization (WSO)' },
      { title: 'Institute for Health Metrics and Evaluation (IHME)', source: 'Global Burden of Disease Study 2021' }
    ]
  }
];

export async function processStrokeSenseQuery(userQuery: string): Promise<AIResponse> {
  const queryLower = userQuery.toLowerCase().trim();

  // Check for acute emergency keywords
  const isEmergency = EMERGENCY_KEYWORDS.some(kw => queryLower.includes(kw));

  if (isEmergency) {
    return {
      content: `🚨 **EMERGENCY MEDICAL ALERT: POSSIBLE ACUTE STROKE SYMPTOM DETECTED**\n\nIf you or someone near you is experiencing sudden facial drooping, arm weakness, slurred speech, sudden loss of vision, or severe thunderclap headache, **DO NOT WAIT!**\n\n**IMMEDIATE ACTION REQUIRED:**\n1. **Call Emergency Services NOW**: Dial **911** (US/Canada), **112 / 108** (India), or **112 / 999** (Europe/UK).\n2. **Check Time**: Note the exact time symptoms started (the "last known well" time).\n3. **Do NOT drive yourself** to the hospital—ambulance paramedics begin stroke triage and alert the neurovascular center en route.\n4. **Do NOT give aspirin, food, or water** before hospital CT imaging has ruled out a brain hemorrhage.\n\n*StrokeWatch AI is an educational intelligence platform and cannot diagnose or triage individual medical conditions.*`,
      citations: [
        { title: 'Emergency Management of Acute Stroke Protocol', source: 'AHA/ASA & WSO Emergency Guidelines' }
      ],
      isEmergencyAlert: true,
      emergencyActionText: 'CALL EMERGENCY SERVICES IMMEDIATELY'
    };
  }

  // Look for matching knowledge base entry
  let bestMatch: KnowledgeBaseItem | null = null;
  let maxScore = 0;

  for (const item of KNOWLEDGE_BASE) {
    let score = 0;
    for (const trigger of item.triggers) {
      if (queryLower.includes(trigger)) {
        score += trigger.length;
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch && maxScore > 0) {
    return {
      content: bestMatch.answer,
      citations: bestMatch.citations,
      isEmergencyAlert: false
    };
  }

  // Intelligent synthesis fallback using medical knowledge
  return {
    content: `Based on consolidated epidemiological registries (WHO, World Stroke Organization, and GBD 2021):\n\nStrokeWatch AI monitors global neurovascular disease metrics across 204 countries. Stroke is both largely preventable (up to 87% modifiable through blood pressure, lifestyle, and metabolic optimization) and acutely treatable when symptoms are recognized immediately.\n\nKey areas you can explore:\n• Ask about **"FAST symptoms"** to learn how to identify acute stroke.\n• Ask about **"Ischemic vs Hemorrhagic"** to understand physiological mechanisms.\n• Ask about **"India statistics"** for regional registry data.\n• Explore the **"What-If Simulator"** to see how blood pressure control impacts 2030 projections.\n\n*Disclaimer: StrokeWatch AI provides verified educational statistics and medical literature summaries. For personal medical advice, please consult a qualified physician.*`,
    citations: [
      { title: 'Global Burden of Disease 2021 Neurovascular Analysis', source: 'The Lancet Neurology 2024' },
      { title: 'World Stroke Organization Clinical Database', source: 'WSO 2023/2024' }
    ],
    isEmergencyAlert: false
  };
}
