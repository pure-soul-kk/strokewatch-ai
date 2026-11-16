"""
ai_engine.py — StrokeSense AI Intelligence Assistant
Combines Gemini Flash LLM (cloud API) with an offline Lancet Neurology / WSO
clinical evidence retrieval engine and an acute stroke emergency triage system.
"""

import os
import re
import json
import urllib.request
import urllib.error

EMERGENCY_KEYWORDS = [
    'droop', 'face numb', 'arm weak', 'arm weakness', 'slur', 'slurred', 'cant speak', "can't speak",
    'sudden numb', 'numb right now', 'call ambulance', 'chest pain', 'vision black',
    'worst headache of my life', 'thunderclap', 'paralysis right now', 'having a stroke now',
    'paralyzed', 'mouth crooked', 'cant walk', "can't walk", 'passed out'
]

KNOWLEDGE_BASE = [
    {
        "triggers": ['what is a stroke', 'define stroke', 'what is stroke', 'brain attack', 'types of stroke'],
        "title": "Clinical Definition and Pathophysiology of Stroke",
        "answer": (
            "A **stroke** (clinically termed a cerebrovascular accident or \"brain attack\") occurs when cerebral "
            "perfusion is acutely compromised, depriving brain tissue of oxygen and glucose. In an untreated acute "
            "ischemic stroke, brain cells die at an estimated rate of **1.9 million neurons per minute**.\n\n"
            "**Primary Pathological Subtypes:**\n"
            "1. **Ischemic Stroke (~62.4% globally, ~87% in High-Income Nations)**: Caused by vascular occlusion from "
            "an in-situ thrombus or circulating embolus (commonly from the heart or carotid bifurcation).\n"
            "2. **Hemorrhagic Stroke (~27.9% globally, ~31.5% in India)**: Caused by the spontaneous rupture of a cerebral "
            "artery, classified into Intracerebral Hemorrhage (ICH, into brain parenchyma) and Subarachnoid Hemorrhage (SAH, into CSF spaces).\n"
            "3. **Transient Ischemic Attack (TIA)**: Temporary neurological deficit without acute infarction, but carrying a 10–20% 90-day stroke risk."
        ),
        "citations": [
            "GBD 2021 Stroke Collaborators, The Lancet Neurology 2024; 23: 973–1003",
            "World Stroke Organization (WSO) Global Stroke Fact Sheet 2024"
        ]
    },
    {
        "triggers": ['difference', 'ischemic versus hemorrhagic', 'types of stroke', 'ischemic vs hemorrhagic', 'subtypes'],
        "title": "Ischemic vs. Hemorrhagic Stroke Comparison",
        "answer": (
            "The critical clinical difference lies in the underlying vascular mechanism and acute intervention:\n\n"
            "• **Ischemic Stroke (The Clot / Blockage)**:\n"
            "  - **Mechanism**: Arterial occlusion causing focal cerebral ischemia and penumbral tissue starvation.\n"
            "  - **Global Burden**: ~62% globally; ~87% in Western nations; ~68.5% in India.\n"
            "  - **Acute Management**: Emergency intravenous thrombolysis (rtPA / Tenecteplase) within **4.5 hours**, "
            "or catheter-based mechanical thrombectomy up to **24 hours**.\n\n"
            "• **Hemorrhagic Stroke (The Rupture / Bleed)**:\n"
            "  - **Mechanism**: Arterial wall failure, spilling pressurized blood into brain tissue, elevating intracranial pressure.\n"
            "  - **Regional Disparity**: Accounts for **31.5% in India** (double Western rates) due to untreated rural hypertension.\n"
            "  - **Acute Management**: Emergency BP reduction (targeting SBP < 140 mmHg), reversal of coagulopathy, and surgical hematoma evacuation. "
            "**Clot-busting thrombolytics are strictly contraindicated in hemorrhage.**"
        ),
        "citations": [
            "AHA/ASA Guidelines for the Management of Spontaneous Intracerebral Hemorrhage, Stroke 2022",
            "ICMR-NCDIR Population-Based Stroke Registry Programme 2023"
        ]
    },
    {
        "triggers": ['fast', 'symptoms', 'warning signs', 'recognize', 'how do i recognize'],
        "title": "Recognizing Stroke Symptoms: The FAST Protocol",
        "answer": (
            "Stroke is a hyper-acute medical emergency where **\"Time is Brain\"**. Use the clinical **FAST** assessment:\n\n"
            "• **F — Face Drooping**: Ask the person to smile. Does one side of the face or mouth droop or feel numb?\n"
            "• **A — Arm Weakness**: Ask the person to raise both arms straight out for 10 seconds. Does one arm drift downward or feel weak?\n"
            "• **S — Speech Difficulty**: Ask the person to repeat a simple phrase. Is speech slurred, garbled, or are they unable to produce words?\n"
            "• **T — Time to Call Emergency**: If you observe **ANY SINGLE ONE** of these signs, immediately call **911** (US) or **112 / 108** (India).\n\n"
            "**Emergency Golden Rules**:\n"
            "- Note the exact time symptoms started (\"last known normal\").\n"
            "- Do NOT give aspirin or food/water before emergency hospital CT scan confirms absence of hemorrhage."
        ),
        "citations": [
            "AHA/ASA Acute Ischemic Stroke Clinical Practice Guidelines, Stroke 2019",
            "World Stroke Organization FAST Recognition Standards"
        ]
    },
    {
        "triggers": ['risk factors', 'causes', 'what causes stroke', 'modifiable', 'paf'],
        "title": "Top Modifiable Risk Factors (GBD 2021 Attributable Burden)",
        "answer": (
            "According to the Global Burden of Disease (GBD 2021) study, up to **87% of stroke disability is preventable**.\n\n"
            "The top population-attributable risk factors are:\n"
            "1. **Elevated Systolic Blood Pressure (55.5% PAF)**: Undisputed #1 driver. Every 10 mmHg reduction drops stroke risk by 27%.\n"
            "2. **Particulate Matter Air Pollution (30.1% PAF)**: Ambient PM2.5 triggers systemic vascular inflammation and arterial stiffness.\n"
            "3. **High BMI / Obesity (24.3% PAF)**: Fastest growing metabolic factor (+88.2% surge in DALYs since 1990).\n"
            "4. **Dietary Risks (22.4% PAF)**: High sodium (>2g/day) combined with insufficient potassium, fruits, and vegetables.\n"
            "5. **Tobacco Smoking (18.2% PAF)**: Accelerates atherosclerosis and doubles relative stroke risk.\n"
            "6. **High Fasting Blood Glucose / Diabetes (17.8% PAF)**: Promotes intracranial small vessel microangiopathy.\n"
            "7. **Elevated LDL Cholesterol (10.2% PAF)**: Atherogenic carotid and intracranial plaque deposition."
        ),
        "citations": [
            "Global Burden of Disease Study 2021, The Lancet Neurology 2024",
            "INTERSTROKE Global Case-Control Study, Lancet 2016"
        ]
    },
    {
        "triggers": ['prevention', 'reduce', 'how can stroke risk be reduced', 'lifestyle', 'prevent'],
        "title": "Evidence-Based Primary Stroke Prevention Strategies",
        "answer": (
            "Because 87% of stroke burden is attributable to modifiable factors, evidence-based lifestyle optimization delivers profound protection:\n\n"
            "1. **Strict Blood Pressure Control**: Target resting BP < 130/80 mmHg. Lower sodium intake to < 2,000 mg/day (1 teaspoon salt).\n"
            "2. **Complete Tobacco Cessation**: Quitting cigarettes cuts excess stroke risk in half within 2 to 5 years.\n"
            "3. **150 Minutes Weekly Aerobic Exercise**: 30 minutes of brisk walking or cycling 5 days/week lowers ischemic risk by 25–30%.\n"
            "4. **DASH / Mediterranean Diet**: Emphasize leafy greens, potassium-rich foods, legumes, and omega-3s; minimize ultra-processed foods.\n"
            "5. **Screen for Atrial Fibrillation**: Periodic pulse palpation or smartwatch ECG monitoring. Oral anticoagulants (DOACs) prevent up to 70% of cardioembolic strokes.\n"
            "6. **Optimize Glycemic & Lipid Targets**: Keep HbA1c < 7.0% and LDL cholesterol < 100 mg/dL (or < 70 mg/dL in high-risk patients)."
        ),
        "citations": [
            "Primary Prevention of Stroke Guidelines, AHA/ASA, Stroke 2021",
            "New England Journal of Medicine (PREDIMED Mediterranean Diet Trial)"
        ]
    },
    {
        "triggers": ['india', 'indian registries', 'icmr', 'hemorrhagic in india'],
        "title": "India Stroke Epidemiology and ICMR-NCDIR Surveillance",
        "answer": (
            "India faces an immense neurovascular burden characterized by distinctive clinical and demographic factors:\n\n"
            "• **Incidence**: ~1.85 Million incident strokes annually (~1 stroke every 17.06 seconds).\n"
            "• **Mortality**: ~720,000 deaths each year.\n"
            "• **The Hemorrhagic Disparity**: In India, **hemorrhagic strokes account for ~31.5%** of all cases (compared to ~13% in Western cohorts). "
            "This is directly linked to undetected and poorly controlled primary arterial hypertension in rural and semi-urban communities.\n"
            "• **ICMR-NCDIR Sentinel Registries**:\n"
            "  - **Ludhiana (PBSR)**: 165.4 age-adjusted rate; 78.4% hypertension prevalence in stroke patients.\n"
            "  - **Cachar/Silchar (PBSR)**: 38.0% hemorrhagic share; 83.1% hypertension prevalence.\n"
            "  - **Cuttack (PBSR)**: 36.0% hemorrhagic share; 81.2% hypertension prevalence."
        ),
        "citations": [
            "Indian Council of Medical Research (ICMR-NCDIR) National Stroke Registry Programme 2023",
            "Indian Stroke Association (ISA) Clinical Guidelines"
        ]
    }
]

EMERGENCY_PATTERNS = [
    r'droop',
    r'slur',
    r'cant speak',
    r"can't speak",
    r'thunderclap',
    r'worst headache',
    r'having a stroke',
    r'call ambulance',
    r'paraly[sz]',
    r'face\s+(?:is\s+)?(?:numb|droop|weak|crooked)',
    r'mouth\s+(?:is\s+)?(?:numb|droop|crooked)',
    r'arm\s+(?:is\s+)?(?:numb|weak|limp|drifting)',
    r'leg\s+(?:is\s+)?(?:numb|weak|limp)',
    r'vision\s+(?:is\s+)?(?:black|blurred|lost|gone)',
    r'loss\s+of\s+vision',
    r'sudden\s+weakness',
    r'sudden\s+numbness'
]

def check_acute_emergency(query: str) -> bool:
    """Checks if query describes acute active stroke symptoms."""
    q = query.lower()
    return any(re.search(pat, q) for pat in EMERGENCY_PATTERNS)

def get_emergency_response() -> str:
    """Returns high-priority RED ALERT instructions."""
    return (
        "🚨 **CRITICAL MEDICAL EMERGENCY ALERT: POSSIBLE ACUTE STROKE SYMPTOM DETECTED**\n\n"
        "> [!CAUTION]\n"
        "> **DO NOT WAIT TO SEE IF SYMPTOMS IMPROVE. \"TIME IS BRAIN\" (1.9 MILLION NEURONS DIE EVERY MINUTE).**\n\n"
        "### Immediate Action Checklist:\n"
        "1. **Call Emergency Medical Dispatch IMMEDIATELY**:\n"
        "   - **India**: Dial **112** (Unified) or **108** (Ambulance)\n"
        "   - **USA / Canada**: Dial **911**\n"
        "   - **UK / Europe**: Dial **999** or **112**\n"
        "   - **Australia**: Dial **000**\n"
        "2. **Record the Exact Time**: Note the \"last known well\" time when the person was last seen normal.\n"
        "3. **Do NOT Drive**: Always call an ambulance. Paramedics begin acute triage and pre-alert the stroke center.\n"
        "4. **Strict Contraindication**: **Do NOT give aspirin, medications, food, or water** until an emergency hospital CT scan confirms whether the stroke is ischemic or hemorrhagic.\n\n"
        "*Disclaimer: StrokeWatch AI is an educational surveillance system, not a substitute for emergency medical care.*"
    )

def query_gemini_flash(user_prompt: str, api_key: str) -> str:
    """Calls Gemini Flash cloud endpoint."""
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={api_key}"
    system_instruction = (
        "You are StrokeSense AI, the clinical intelligence assistant for StrokeWatch AI. "
        "Provide clear, evidence-based answers calibrated against WHO, WSO, and Lancet Neurology literature. "
        "Include peer-reviewed citations where applicable. Never diagnose individuals or provide personalized medical orders. "
        "Always maintain clinical accuracy and clarity."
    )
    payload = {
        "contents": [
            {
                "role": "user",
                "parts": [{"text": f"System Context: {system_instruction}\n\nUser Question: {user_prompt}"}]
            }
        ],
        "generationConfig": {
            "temperature": 0.2,
            "maxOutputTokens": 800
        }
    }
    
    headers = {"Content-Type": "application/json"}
    req = urllib.request.Request(url, data=json.dumps(payload).encode('utf-8'), headers=headers, method='POST')
    with urllib.request.urlopen(req, timeout=5) as response:
        res_data = json.loads(response.read().decode('utf-8'))
        return res_data['candidates'][0]['content']['parts'][0]['text']

def query_knowledge_base(user_prompt: str) -> str:
    """Searches clinical knowledge base for best matching topic."""
    q = user_prompt.lower()
    
    best_item = None
    best_score = 0
    
    for item in KNOWLEDGE_BASE:
        score = sum(1 for trigger in item["triggers"] if trigger in q)
        if score > best_score:
            best_score = score
            best_item = item
            
    if best_item and best_score > 0:
        citations_str = "\n".join([f"- *{c}*" for c in best_item["citations"]])
        return (
            f"### {best_item['title']}\n\n"
            f"{best_item['answer']}\n\n"
            f"**Evidence & Literature Citations:**\n"
            f"{citations_str}"
        )
    
    # Default helpful response
    return (
        "### StrokeWatch AI Clinical Intelligence\n\n"
        f"Thank you for asking: *\"{user_prompt}\"*\n\n"
        "According to the **Global Burden of Disease 2021 (Lancet Neurology 2024)** and the **World Stroke Organization**:\n\n"
        "- **Global Incident Burden**: 12.22 Million new stroke episodes occur annually (~1 stroke every 2.58 seconds).\n"
        "- **Modifiable Risk Attributable Fraction**: Up to 87% of all stroke disability is preventable through blood pressure control, tobacco cessation, aerobic exercise, and healthy dietary sodium limits.\n"
        "- **Emergency Awareness**: Any sudden onset of Facial drooping, Arm weakness, or Speech difficulty (**FAST**) demands immediate emergency dispatch call (**911** or **112 / 108**).\n\n"
        "**Key Literature Citations:**\n"
        "- *The Lancet Neurology 2024; 23: 973–1003 (GBD 2021 Stroke Collaborators)*\n"
        "- *World Stroke Organization (WSO) Global Stroke Fact Sheet 2024*\n"
        "- *ICMR-NCDIR National Stroke Registry Programme 2023*"
    )

def process_chat_message(user_message: str, history: list) -> tuple:
    """
    Main entry point for chat.
    Returns (updated_history, response_text).
    """
    if not user_message or not user_message.strip():
        return history, ""

    clean_query = user_message.strip()

    # 1. Emergency safety check
    if check_acute_emergency(clean_query):
        response = get_emergency_response()
    else:
        # 2. Try Gemini Flash if API key exists
        api_key = os.environ.get("GEMINI_API_KEY")
        if api_key:
            try:
                response = query_gemini_flash(clean_query, api_key)
            except Exception:
                response = query_knowledge_base(clean_query)
        else:
            response = query_knowledge_base(clean_query)

    # Format history for Gradio Chatbot (messages format or tuple format)
    new_history = history + [
        {"role": "user", "content": clean_query},
        {"role": "assistant", "content": response}
    ]
    return new_history, response
