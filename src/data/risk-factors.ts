import { RiskFactorPAF } from '@/types';

export const RISK_FACTORS: RiskFactorPAF[] = [
  {
    id: 'hypertension',
    name: 'Elevated Systolic Blood Pressure',
    category: 'Metabolic',
    globalPAF: 55.5,
    indiaPAF: 58.2,
    relativeRisk: 3.8,
    description: 'The single largest modifiable risk factor. Systolic BP > 130 mmHg damages endothelium and induces microaneurysms.',
    interventionPotential: 'Every 10 mmHg reduction in systolic BP decreases stroke risk by 27%.',
    actionableStep: 'Target blood pressure < 130/80 mmHg through DASH dietary approach, sodium restriction (<2g/day), and antihypertensive therapy.'
  },
  {
    id: 'air-pollution',
    name: 'Particulate Matter Air Pollution (Ambient & Household)',
    category: 'Environmental',
    globalPAF: 30.1,
    indiaPAF: 37.4,
    relativeRisk: 1.45,
    description: 'Fine particles (PM2.5) enter bloodstream inducing systemic inflammation, autonomic dysregulation, and accelerated arterial thrombosis.',
    interventionPotential: 'Transition to clean household cooking fuels and urban particulate filters reduces stroke burden substantially.',
    actionableStep: 'Minimize high-AQI outdoor exposure, use HEPA air filtration indoors, and advocate for industrial emission standards.'
  },
  {
    id: 'tobacco',
    name: 'Tobacco Use & Secondhand Smoke',
    category: 'Behavioral',
    globalPAF: 18.2,
    indiaPAF: 21.6,
    relativeRisk: 2.1,
    description: 'Nicotine increases heart rate and arterial pressure, while carbon monoxide displaces oxygen and degrades arterial elastic lamina.',
    interventionPotential: 'Smoking cessation halves excess stroke risk within 2 to 5 years, returning to non-smoker baseline at 10-15 years.',
    actionableStep: 'Complete cessation of combustible cigarettes, bidis, gutkha, and vaping products with pharmacotherapy support.'
  },
  {
    id: 'fasting-glucose',
    name: 'High Fasting Plasma Glucose / Diabetes',
    category: 'Metabolic',
    globalPAF: 17.8,
    indiaPAF: 22.1,
    relativeRisk: 2.3,
    description: 'Chronic hyperglycemia accelerates atherosclerosis in large cerebral vessels and damages small intracranial penetrating arterioles.',
    interventionPotential: 'Strict glycemic control (HbA1c < 7%) coupled with SGLT2 inhibitors or GLP-1 receptor agonists provides neurovascular protection.',
    actionableStep: 'Maintain fasting blood glucose < 100 mg/dL and post-prandial < 140 mg/dL via low glycemic load diet and physical activity.'
  },
  {
    id: 'high-bmi',
    name: 'High Body Mass Index (Overweight / Obesity)',
    category: 'Metabolic',
    globalPAF: 24.3,
    indiaPAF: 19.8,
    relativeRisk: 1.64,
    description: 'Excess visceral adiposity triggers chronic systemic inflammation, insulin resistance, obstructive sleep apnea, and dyslipidemia.',
    interventionPotential: 'A 5-10% weight loss significantly reduces systemic vascular resistance and improves cerebral perfusion autoregulation.',
    actionableStep: 'Target BMI between 18.5 - 24.9 kg/m² (or < 23 kg/m² for Asian populations) and waist circumference < 90cm (men) / < 80cm (women).'
  },
  {
    id: 'dietary-risks',
    name: 'Dietary Risks (High Sodium, Low Whole Grains/Fruits)',
    category: 'Behavioral',
    globalPAF: 22.4,
    indiaPAF: 26.5,
    relativeRisk: 1.55,
    description: 'Diets heavy in refined carbohydrates, trans-fats, and excessive sodium directly elevate arterial pressure and endothelial stiffness.',
    interventionPotential: 'Replacing 3g dietary salt with potassium-enriched salts drops population stroke incidence by 13%.',
    actionableStep: 'Adopt Mediterranean or whole-food plant-forward eating; cap daily salt intake at under 5 grams (1 teaspoon) total.'
  },
  {
    id: 'high-ldl',
    name: 'Elevated Non-HDL / LDL Cholesterol',
    category: 'Metabolic',
    globalPAF: 10.2,
    indiaPAF: 11.5,
    relativeRisk: 1.48,
    description: 'Circulating atherogenic apolipoprotein B particles infiltrate carotid and intracranial arterial walls forming vulnerable plaques.',
    interventionPotential: 'Statins and PCSK9 inhibitors stabilize vulnerable carotid plaques and reduce ischemic stroke recurrences by 21% per mmol/L LDL reduction.',
    actionableStep: 'Keep LDL-C < 100 mg/dL (or < 70 mg/dL for high-risk cardiovascular individuals) through diet and lipid-lowering therapy.'
  },
  {
    id: 'low-activity',
    name: 'Low Physical Activity / Sedentary Behavior',
    category: 'Behavioral',
    globalPAF: 8.5,
    indiaPAF: 9.8,
    relativeRisk: 1.35,
    description: 'Prolonged sitting promotes endothelial shear stress abnormalities, hypercoagulability, and reduced cerebral collateral vessel development.',
    interventionPotential: '150 minutes of moderate aerobic exercise weekly reduces ischemic stroke risk by 25-30%.',
    actionableStep: 'Engage in at least 30 minutes of brisk walking, cycling, or swimming 5 days per week, and break up prolonged sitting every 45 minutes.'
  },
  {
    id: 'alcohol',
    name: 'Excessive Alcohol Consumption',
    category: 'Behavioral',
    globalPAF: 6.2,
    indiaPAF: 7.1,
    relativeRisk: 1.7,
    description: 'Heavy binge drinking causes acute blood pressure spikes, cardiac arrhythmias (atrial fibrillation), and platelet rebound hyperactivity.',
    interventionPotential: 'Cessation of binge drinking drastically curtails both intracerebral hemorrhage and cardioembolic stroke risks.',
    actionableStep: 'Limit alcohol intake to zero or strictly adhere to clinical guidelines (max 1 standard drink/day for women, 2 for men).'
  },
  {
    id: 'kidney-dysfunction',
    name: 'Kidney Dysfunction (Low eGFR / Albuminuria)',
    category: 'Metabolic',
    globalPAF: 8.1,
    indiaPAF: 9.4,
    relativeRisk: 1.85,
    description: 'Chronic renal impairment accelerates vascular calcification and small vessel cerebral microangiopathy.',
    interventionPotential: 'Renoprotective ACEi/ARB therapy and blood pressure management preserves both nephron and cerebral microvascular integrity.',
    actionableStep: 'Regular annual screening of serum creatinine, eGFR, and urinary albumin-to-creatinine ratio (UACR).'
  }
];
