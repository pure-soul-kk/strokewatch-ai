"""
ml_engine.py — StrokeWatch AI Machine Learning Inference Engine
Calibrated directly from the Gist notebook pipeline:
- SimpleImputer (median BMI)
- One-Hot Encoding (drop_first=True)
- StandardScaler (age, avg_glucose_level, bmi)
- SMOTE class balance
- Models: Logistic Regression, Random Forest, Neural Network (MLP)
"""

import os
import sys
import warnings
import numpy as np
import pandas as pd

warnings.filterwarnings('ignore', category=UserWarning)

# Ensure local packages directory is prioritized
_pkg_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'packages')
if os.path.exists(_pkg_dir) and _pkg_dir not in sys.path:
    sys.path.insert(0, _pkg_dir)

import joblib

MODEL_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'models', 'stroke_models.joblib')

# Feature column ordering from Gist notebook
FEATURE_COLS = [
    'age', 'hypertension', 'heart_disease', 'avg_glucose_level', 'bmi',
    'gender_Male', 'ever_married_Yes', 'work_type_Never_worked',
    'work_type_Private', 'work_type_Self-employed', 'work_type_children',
    'Residence_type_Urban', 'smoking_status_formerly smoked',
    'smoking_status_never smoked', 'smoking_status_smokes'
]

# Scaler and model parameters loaded once lazily
_bundle = None

def get_bundle():
    global _bundle
    if _bundle is None:
        if os.path.exists(MODEL_PATH):
            _bundle = joblib.load(MODEL_PATH)
        else:
            raise FileNotFoundError(f"Model bundle not found at {MODEL_PATH}")
    return _bundle

def encode_patient_features(
    gender: str,
    age: float,
    hypertension: int,
    heart_disease: int,
    ever_married: str,
    work_type: str,
    residence_type: str,
    avg_glucose_level: float,
    bmi: float,
    smoking_status: str
):
    """Encodes raw patient features into standard numeric array matching Gist columns."""
    bundle = get_bundle()
    median_bmi = bundle.get('median_bmi', 28.1)
    
    # Handle missing or invalid BMI
    if bmi is None or bmi <= 0 or np.isnan(bmi):
        bmi_val = median_bmi
    else:
        bmi_val = float(bmi)

    # 1. gender (Female is dropped baseline)
    gender_male = 1 if gender.strip().lower() == 'male' else 0

    # 2. ever_married (No is dropped baseline)
    married_yes = 1 if ever_married.strip().lower() in ['yes', 'true', '1'] else 0

    # 3. work_type (Govt_job is dropped baseline)
    wt = work_type.strip()
    wt_never = 1 if wt == 'Never_worked' else 0
    wt_private = 1 if wt == 'Private' else 0
    wt_self = 1 if wt == 'Self-employed' else 0
    wt_children = 1 if wt == 'children' else 0

    # 4. Residence_type (Rural is dropped baseline)
    res_urban = 1 if residence_type.strip().lower() == 'urban' else 0

    # 5. smoking_status (Unknown is dropped baseline)
    sm = smoking_status.strip().lower()
    sm_formerly = 1 if sm == 'formerly smoked' else 0
    sm_never = 1 if sm == 'never smoked' else 0
    sm_smokes = 1 if sm == 'smokes' else 0

    raw_features = {
        'age': float(age),
        'hypertension': int(hypertension),
        'heart_disease': int(heart_disease),
        'avg_glucose_level': float(avg_glucose_level),
        'bmi': bmi_val,
        'gender_Male': gender_male,
        'ever_married_Yes': married_yes,
        'work_type_Never_worked': wt_never,
        'work_type_Private': wt_private,
        'work_type_Self-employed': wt_self,
        'work_type_children': wt_children,
        'Residence_type_Urban': res_urban,
        'smoking_status_formerly smoked': sm_formerly,
        'smoking_status_never smoked': sm_never,
        'smoking_status_smokes': sm_smokes
    }

    # Vector in exact order
    feat_vector = np.array([[raw_features[col] for col in FEATURE_COLS]], dtype=np.float64)

    # Scale numeric columns: age, avg_glucose_level, bmi
    scaler = bundle['scaler']
    # Scaler was fit on 2D array with 3 columns: [age, avg_glucose_level, bmi]
    num_vals = np.array([[raw_features['age'], raw_features['avg_glucose_level'], raw_features['bmi']]])
    scaled_num = scaler.transform(num_vals)[0]

    # Replace numeric columns in vector
    feat_vector[0, 0] = scaled_num[0]  # age
    feat_vector[0, 3] = scaled_num[1]  # avg_glucose_level
    feat_vector[0, 4] = scaled_num[2]  # bmi

    return feat_vector, raw_features

def predict_stroke_risk(
    gender: str,
    age: float,
    hypertension: int,
    heart_disease: int,
    ever_married: str,
    work_type: str,
    residence_type: str,
    avg_glucose_level: float,
    bmi: float,
    smoking_status: str,
    selected_model: str = "Ensemble / All Models Comparison"
):
    """
    Runs inference using the models trained from the Gist.
    Returns:
    - risk_category: "Low Risk", "Moderate Risk", "High Risk"
    - primary_prob: float (0.0 to 100.0)
    - model_scores: dict mapping model name to probability %
    - identified_factors: list of clinical risk flags
    - recommendations: list of actionable lifestyle/clinical steps
    """
    bundle = get_bundle()
    feat_vector, raw_features = encode_patient_features(
        gender, age, hypertension, heart_disease, ever_married,
        work_type, residence_type, avg_glucose_level, bmi, smoking_status
    )

    log_model = bundle['log_model']
    rf_model = bundle['rf_model']
    mlp_model = bundle['mlp_model']

    prob_log = float(log_model.predict_proba(feat_vector)[0, 1]) * 100
    prob_rf = float(rf_model.predict_proba(feat_vector)[0, 1]) * 100
    prob_mlp = float(mlp_model.predict_proba(feat_vector)[0, 1]) * 100
    prob_ensemble = (prob_log + prob_rf + prob_mlp) / 3.0

    model_scores = {
        "Logistic Regression": round(prob_log, 1),
        "Random Forest": round(prob_rf, 1),
        "Neural Network (MLP)": round(prob_mlp, 1),
        "Ensemble Average": round(prob_ensemble, 1)
    }

    if "logistic" in selected_model.lower():
        active_prob = prob_log
    elif "random forest" in selected_model.lower():
        active_prob = prob_rf
    elif "neural" in selected_model.lower() or "mlp" in selected_model.lower():
        active_prob = prob_mlp
    else:
        active_prob = prob_ensemble

    # Clinical risk stratification
    if active_prob < 15.0:
        risk_category = "Low Risk"
        risk_color = "emerald"
    elif active_prob < 40.0:
        risk_category = "Moderate Risk"
        risk_color = "amber"
    else:
        risk_category = "High Risk"
        risk_color = "red"

    # Identify clinical risk factors present in this patient
    identified_factors = []
    recommendations = []

    if raw_features['age'] >= 65:
        identified_factors.append(f"Age ≥ 65 yrs ({raw_features['age']} yrs): Advanced vascular aging is the strongest demographic determinant.")
    elif raw_features['age'] >= 50:
        identified_factors.append(f"Age 50–64 yrs ({raw_features['age']} yrs): Entering the elevated stroke risk window.")

    if raw_features['hypertension'] == 1:
        identified_factors.append("Arterial Hypertension present: Contributes up to 55.5% of population attributable stroke risk.")
        recommendations.append("Target systolic blood pressure < 130/80 mmHg via daily monitoring and physician consultation.")

    if raw_features['heart_disease'] == 1:
        identified_factors.append("Pre-existing Heart Disease: Elevated risk of cardioembolic clot formation.")
        recommendations.append("Undergo routine cardiac arrhythmia screening (ECG for occult Atrial Fibrillation).")

    if raw_features['avg_glucose_level'] >= 200:
        identified_factors.append(f"Marked Hyperglycemia ({raw_features['avg_glucose_level']} mg/dL): Severe endothelial microvascular injury risk.")
        recommendations.append("Urgent endocrine evaluation to target HbA1c < 7.0%.")
    elif raw_features['avg_glucose_level'] >= 140:
        identified_factors.append(f"Pre-diabetic / Elevated Glucose ({raw_features['avg_glucose_level']} mg/dL): Promotes intracranial atherosclerosis.")
        recommendations.append("Implement low glycemic load diet and fasting glucose screening.")

    if raw_features['bmi'] >= 30:
        identified_factors.append(f"Class I/II Obesity (BMI {raw_features['bmi']:.1f}): Induces chronic vascular inflammation and obstructive sleep apnea.")
        recommendations.append("Target 5–10% body weight reduction through caloric deficit and structured activity.")
    elif raw_features['bmi'] >= 25:
        identified_factors.append(f"Overweight (BMI {raw_features['bmi']:.1f}): Mildly elevated metabolic burden.")

    if raw_features['smoking_status_smokes'] == 1:
        identified_factors.append("Active Tobacco Smoker: Doubles relative stroke risk and accelerates carotid plaque destabilization.")
        recommendations.append("Smoking cessation: Quitting halves excess stroke risk within 2 to 5 years.")
    elif raw_features['smoking_status_formerly smoked'] == 1:
        identified_factors.append("Former Tobacco Smoker: Vascular recovery ongoing; maintain total abstinence.")

    if not recommendations:
        recommendations.append("Maintain 150 minutes of moderate aerobic physical activity per week.")
        recommendations.append("Follow a DASH or Mediterranean dietary pattern rich in leafy greens, potassium, and omega-3 fatty acids.")
        recommendations.append("Annual blood pressure, fasting lipid panel, and blood glucose check.")

    return {
        "risk_category": risk_category,
        "risk_color": risk_color,
        "primary_prob": round(active_prob, 1),
        "model_scores": model_scores,
        "identified_factors": identified_factors,
        "recommendations": recommendations,
        "metrics": bundle.get('metrics', {})
    }
