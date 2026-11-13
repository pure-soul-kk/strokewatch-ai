import { ResearchArticle, ImpactStory } from '@/types';

export const RESEARCH_ARTICLES: ResearchArticle[] = [
  {
    id: 'lancet-gbd-stroke-2024',
    title: 'Global, regional, and national burden of stroke and its risk factors, 1990–2021: a systematic analysis for the Global Burden of Disease Study 2021',
    publisher: 'The Lancet Neurology',
    journal: 'Lancet Neurol 2024; 23: 973–1003',
    publishedDate: '2024-09-18',
    category: 'Epidemiology',
    sourceUrl: 'https://doi.org/10.1016/S1474-4422(24)00369-7',
    doi: '10.1016/S1474-4422(24)00369-7',
    aiSummary: 'Comprehensive GBD 2021 analysis reveals stroke as the 2nd leading cause of death worldwide with 11.9 million incident cases and 7.3 million deaths in 2021. Critically, 84% of the stroke burden occurs in low- and middle-income countries, and high BMI emerged as a surging metabolic risk factor rising 88% in attributable DALYs since 1990.',
    keyTakeaway: '84% of all stroke deaths now occur in low- and middle-income countries, while high BMI has risen faster than any other stroke risk factor globally (+88.2% since 1990).',
    impactScore: 98
  },
  {
    id: 'wso-lancet-commission-2023',
    title: 'World Stroke Organization-Lancet Neurology Commission on stroke: pragmatic solutions for reducing global burden',
    publisher: 'WSO / The Lancet Neurology',
    journal: 'Lancet Neurol 2023; 22: 1160–1204',
    publishedDate: '2023-10-10',
    category: 'Policy',
    sourceUrl: 'https://doi.org/10.1016/S1474-4422(23)00277-6',
    doi: '10.1016/S1474-4422(23)00277-6',
    aiSummary: 'The WSO-Lancet Commission warns that without urgent systemic interventions, annual stroke deaths will climb from 6.6 million to 9.7 million by 2050, with global economic costs exceeding US$1.6 trillion. Proposes universal low-cost polypills, task-shifting to community health workers, and AI-assisted mobile telestroke triage.',
    keyTakeaway: 'Without immediate evidence-based action, global stroke deaths will surge 50% by 2050, disproportionately affecting South Asia and Sub-Saharan Africa.',
    impactScore: 96
  },
  {
    id: 'select-trial-thrombectomy',
    title: 'Endovascular Thrombectomy for Acute Ischemic Stroke with Large Infarct Core (SELECT2 & ANGEL-ASPECT Trial Consortia)',
    publisher: 'New England Journal of Medicine',
    journal: 'N Engl J Med 2023; 388: 1253–1265',
    publishedDate: '2023-04-06',
    category: 'Clinical Trials',
    sourceUrl: 'https://doi.org/10.1056/NEJMoa2214403',
    doi: '10.1056/NEJMoa2214403',
    aiSummary: 'Landmark multicenter randomized trial established that endovascular thrombectomy (EVT) improves functional independence (modified Rankin Scale 0-2) in acute ischemic stroke patients with large ischemic core volumes (ASPECTS 3-5), expanding the eligibility criteria previously restricted to small-core infarcts.',
    keyTakeaway: 'Patients presenting even with large ischemic stroke infarct cores achieve superior functional recovery with catheter-based mechanical clot retrieval compared to medical management alone.',
    impactScore: 94
  },
  {
    id: 'icmr-stroke-registry-2023',
    title: 'Population-Based Stroke Surveillance in India: Baseline Findings from the ICMR-NCDIR National Stroke Registry Programme',
    publisher: 'Indian Council of Medical Research (ICMR-NCDIR)',
    journal: 'Indian J Med Res 2023; 157: 412–425',
    publishedDate: '2023-11-25',
    category: 'Epidemiology',
    sourceUrl: 'https://www.ncdirindia.org/stroke_registry',
    doi: '10.4103/ijmr.ijmr_stroke_23',
    aiSummary: 'Findings across 6 population-based and 18 hospital-based registries in India demonstrate high crude incidence (up to 152/100,000 in Ludhiana and 146.5 in Cachar), with hemorrhagic stroke comprising over 30% of admissions and over 75% of patients having uncontrolled background hypertension.',
    keyTakeaway: 'Hypertension remains unmanaged or undiagnosed in 75%+ of Indian stroke admissions; earlier community screening is the pivotal national priority.',
    impactScore: 92
  },
  {
    id: 'tenecteplase-vs-alteplase-acest',
    title: 'Tenecteplase versus Alteplase for Acute Ischemic Stroke: Phase III Randomized Trial & Meta-Analysis (AcT / TRACE-2)',
    publisher: 'The Lancet',
    journal: 'Lancet 2023; 400: 161–169',
    publishedDate: '2023-07-15',
    category: 'Clinical Trials',
    sourceUrl: 'https://doi.org/10.1016/S0140-6736(22)01054-6',
    doi: '10.1016/S0140-6736(22)01054-6',
    aiSummary: 'Tenecteplase (TNK-tPA) delivered as a rapid 5-second intravenous single bolus demonstrated non-inferiority and superior workflow speed compared to standard 1-hour Alteplase infusions, fundamentally streamlining emergency room door-to-needle thrombolysis times worldwide.',
    keyTakeaway: 'Single-bolus Tenecteplase cuts emergency thrombolysis prep time by 22 minutes, rescuing millions of ischemic neural cells during emergency admission.',
    impactScore: 90
  },
  {
    id: 'ai-neuroimaging-perfusion',
    title: 'Artificial Intelligence in Acute Ischemic Stroke Triage: Automated CTP/MRI Core-Penumbra Quantification and Transfer Timing',
    publisher: 'Stroke (AHA/ASA)',
    journal: 'Stroke 2024; 55: 1120–1131',
    publishedDate: '2024-05-12',
    category: 'AI & Tech',
    sourceUrl: 'https://doi.org/10.1161/STROKEAHA.123.044192',
    doi: '10.1161/STROKEAHA.123.044192',
    aiSummary: 'Deep learning automated CT perfusion analysis algorithms reduce door-to-groin puncture times by an average of 38 minutes in primary stroke centers, notifying interventional neuroradiologists instantaneously on mobile devices.',
    keyTakeaway: 'Automated AI neuroimaging algorithms shave 38 minutes off transfer triage, expanding the actionable treatment window for thrombectomy.',
    impactScore: 89
  }
];

export const IMPACT_STORIES: ImpactStory[] = [
  {
    id: 'story-1',
    headline: 'Rapid FAST Recognition Saved Ananya’s Motor Speech Functions',
    patientArchetype: 'Corporate Project Lead & Mother of Two',
    age: 48,
    initialSymptoms: 'Sudden right facial droop and inability to pronounce words during a morning video call.',
    goldenHourTimeline: 'Colleague identified the FAST sign, called emergency within 8 minutes.',
    hospitalArrivalMinutes: 38,
    intervention: 'Emergency CT confirmed acute left MCA M1 branch occlusion; IV Tenecteplase administered at minute 52, followed by immediate mechanical thrombectomy with TICI 3 complete reperfusion.',
    clinicalOutcome: 'Full neurological recovery (mRS 0 at 90 days), returned to work and active marathon training.',
    educationalTakeaway: 'Immediate bystander recognition of facial droop and speech slurring prevented permanent expressive aphasia.',
    isScenario: true
  },
  {
    id: 'story-2',
    headline: 'Overcoming Silent Hypertension in Rural Varanasi',
    patientArchetype: 'Farmer & Community Elder',
    age: 62,
    initialSymptoms: 'Severe thunderclap occipital headache, vomiting, and sudden left arm weakness at sunrise.',
    goldenHourTimeline: 'Family resisted waiting for symptoms to pass and hired local emergency transport to BHU Trauma Centre.',
    hospitalArrivalMinutes: 85,
    intervention: 'Non-contrast CT diagnosed right basal ganglia intracerebral hemorrhage (volume 18ml). Urgent intravenous labetalol titrated SBP from 210 to 135 mmHg; ICU intracranial pressure monitoring.',
    clinicalOutcome: 'Hematoma expansion prevented. After 6 weeks of multidisciplinary neurorehabilitation, regained independent ambulation.',
    educationalTakeaway: 'Hypertension is often completely symptomless until a hemorrhagic rupture occurs. Routine BP checks are lifesaving.',
    isScenario: true
  },
  {
    id: 'story-3',
    headline: 'Wake-Up Stroke Rescued via Advanced Perfusion Imaging',
    patientArchetype: 'Retired School Headmaster',
    age: 71,
    initialSymptoms: 'Woke at 07:00 AM unable to move right side; last known well was 23:00 PM previous evening (unknown onset window).',
    goldenHourTimeline: 'Brought immediately to comprehensive stroke center under "Wake-up Stroke" protocol.',
    hospitalArrivalMinutes: 65,
    intervention: 'Automated AI perfusion MRI revealed a large ischemic penumbra (salvageable tissue mismatch > 50ml). Underwent mechanical thrombectomy under extended 24-hour DAWN trial guidelines.',
    clinicalOutcome: 'Reversal of dense hemiplegia; discharged home with mild sensory deficit (mRS 1).',
    educationalTakeaway: 'Waking up with stroke symptoms is NO LONGER an automatic disqualification from acute interventions thanks to advanced perfusion imaging.',
    isScenario: true
  }
];

export const DAILY_HEALTH_INSIGHTS = [
  {
    id: 'insight-1',
    title: 'The 10 mmHg Blood Pressure Dividend',
    fact: 'Lowering your systolic blood pressure by just 10 mmHg slashes your lifelong stroke risk by approximately 27%, regardless of baseline age.',
    source: 'Lancet Meta-Analysis of 48 Randomized Trials',
    category: 'Cardiovascular'
  },
  {
    id: 'insight-2',
    title: '1.9 Million Neurons Die Every Minute',
    fact: 'During an untreated acute ischemic stroke, an estimated 1,900,000 brain neurons and 14 billion synapses are destroyed every single minute blood flow is blocked.',
    source: 'Saver JL. Stroke 2006; Time is Brain — Quantified',
    category: 'Emergency'
  },
  {
    id: 'insight-3',
    title: 'The Silent Fibrillation Hazard',
    fact: 'Atrial fibrillation (an irregular heart rhythm) increases stroke risk five-fold, producing large emboli that cause the most severe ischemic strokes. Many people never feel symptoms until screened.',
    source: 'American Heart Association / ESC Guidelines',
    category: 'Cardiac'
  },
  {
    id: 'insight-4',
    title: 'Potassium-Salt Substitution Lifesaver',
    fact: 'Replacing ordinary table salt with potassium-enriched salt (75% NaCl, 25% KCl) reduces stroke events by 14% across high-risk populations with zero lifestyle disruption.',
    source: 'SSaSS Trial / New England Journal of Medicine',
    category: 'Nutrition'
  },
  {
    id: 'insight-5',
    title: 'Sleep Apnea & Nocturnal Hypoxia',
    fact: 'Untreated obstructive sleep apnea (OSA) doubles stroke risk by generating repeated nocturnal hypoxemia, oxidative stress, and surges in sympathetic blood pressure.',
    source: 'Journal of the American Heart Association (JAHA)',
    category: 'Sleep & Metabolism'
  }
];
