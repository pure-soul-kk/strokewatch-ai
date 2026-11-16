"""
app.py — StrokeWatch AI Global Stroke Intelligence Platform
Rebuilt using Gradio & Flash with Gist Stroke Prediction Models.
Calibrated against GBD 2021 Stroke Collaborators, WHO, WSO, and ICMR-NCDIR registries.
"""

import os
import sys

# Ensure local packages directory is prioritized
_pkg_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'packages')
if os.path.exists(_pkg_dir) and _pkg_dir not in sys.path:
    sys.path.insert(0, _pkg_dir)

import gradio as gr
import pandas as pd

from ml_engine import predict_stroke_risk
import data_engine
import ai_engine

# ==============================================================================
# Custom CSS for Bloomberg-Grade Medical Command Center Theme
# ==============================================================================
CUSTOM_CSS = """
/* Command Center Ground */
body, .gradio-container {
    background-color: #080D18 !important;
    color: #F8FAFC !important;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Google Sans Flex", sans-serif !important;
}

/* Glass & Card Elevators */
.strokewatch-card {
    background: #111B2D !important;
    border: 1px solid rgba(59, 130, 246, 0.18) !important;
    border-radius: 14px !important;
    padding: 18px !important;
    box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.45) !important;
}

.strokewatch-card-hero {
    background: linear-gradient(145deg, #111B2D 0%, #16243E 100%) !important;
    border: 1px solid rgba(34, 211, 238, 0.3) !important;
    border-radius: 16px !important;
    padding: 24px !important;
    box-shadow: 0 12px 32px -4px rgba(0, 0, 0, 0.6) !important;
}

.metric-number {
    font-family: "JetBrains Mono", monospace, monospace !important;
    font-weight: 800 !important;
    letter-spacing: -0.02em !important;
}

/* Emergency Alert Styling */
.emergency-banner {
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(185, 28, 28, 0.25) 100%) !important;
    border: 1px solid rgba(239, 68, 68, 0.6) !important;
    border-left: 6px solid #EF4444 !important;
    border-radius: 12px !important;
    padding: 16px !important;
}

/* Tabs and Buttons */
.tab-nav button {
    font-weight: 700 !important;
    font-size: 0.95rem !important;
}

.tab-nav button.selected {
    color: #22D3EE !important;
    border-bottom: 2px solid #22D3EE !important;
}

/* Buttons */
.primary-btn {
    background: linear-gradient(135deg, #0284C7 0%, #0369A1 100%) !important;
    color: #FFFFFF !important;
    font-weight: 700 !important;
    border: none !important;
    border-radius: 10px !important;
    transition: all 0.2s ease !important;
}
.primary-btn:hover {
    background: linear-gradient(135deg, #0369A1 0%, #075985 100%) !important;
    transform: translateY(-1px) !important;
}

.emergency-btn {
    background: linear-gradient(135deg, #DC2626 0%, #991B1B 100%) !important;
    color: #FFFFFF !important;
    font-weight: 800 !important;
    border: none !important;
    border-radius: 10px !important;
}
"""

def create_ui():
    theme = gr.themes.Soft(
        primary_hue="sky",
        secondary_hue="cyan",
        neutral_hue="slate",
        font=[gr.themes.GoogleFont("Inter"), "sans-serif"]
    ).set(
        body_background_fill="#080D18",
        body_background_fill_dark="#080D18",
        block_background_fill="#111B2D",
        block_background_fill_dark="#111B2D",
        block_border_color="rgba(59, 130, 246, 0.2)",
        block_border_color_dark="rgba(59, 130, 246, 0.2)",
        block_title_text_color="#22D3EE",
        body_text_color="#E2E8F0",
        body_text_color_dark="#E2E8F0"
    )

    with gr.Blocks(title="StrokeWatch AI — Global Stroke Intelligence Platform", css=CUSTOM_CSS, theme=theme) as demo:
        # ======================================================================
        # Header & Command Ribbon
        # ======================================================================
        with gr.Row():
            with gr.Column(scale=8):
                gr.Markdown(
                    """
                    # 🧠 StrokeWatch AI — Global Stroke Intelligence Platform
                    **A Bloomberg-Style Medical Command Center & Global Stroke Surveillance System**  
                    *Calibrated against GBD 2021 Stroke Collaborators, WHO Global Health Estimates, WSO, and ICMR-NCDIR Registries.*
                    """
                )
            with gr.Column(scale=4):
                gr.Markdown(
                    """
                    <div style="text-align: right; padding-top: 10px;">
                        <span style="background: rgba(16, 185, 129, 0.2); color: #10B981; border: 1px solid #10B981; padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-weight: 700; margin-right: 6px;">● LIVE SURVEILLANCE</span>
                        <span style="background: rgba(34, 211, 238, 0.2); color: #22D3EE; border: 1px solid #22D3EE; padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-weight: 700; margin-right: 6px;">FLASH ACCELERATED</span>
                        <span style="background: rgba(245, 158, 11, 0.2); color: #F59E0B; border: 1px solid #F59E0B; padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-weight: 700;">GBD 2021 CALIBRATED</span>
                    </div>
                    """
                )

        # ======================================================================
        # Navigation Tabs
        # ======================================================================
        with gr.Tabs():
            # ------------------------------------------------------------------
            # TAB 1: EXECUTIVE COMMAND DASHBOARD
            # ------------------------------------------------------------------
            with gr.Tab("⚡ Command Dashboard"):
                with gr.Row():
                    region_select = gr.Radio(
                        choices=["Global", "India"],
                        value="Global",
                        label="Surveillance Scope",
                        interactive=True
                    )
                    refresh_counter_btn = gr.Button("🔄 Sync Real-Time Counters", variant="secondary")

                # Counter Display Box
                counter_html = gr.HTML()

                def update_counter_view(scope):
                    data = data_engine.calculate_live_stroke_estimates(scope)
                    return f"""
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin-top: 14px; margin-bottom: 20px;">
                        <div class="strokewatch-card">
                            <div style="font-size: 12px; font-weight: 700; color: #94A3B8; text-transform: uppercase;">YTD Estimated Strokes</div>
                            <div class="metric-number" style="font-size: 32px; color: #38BDF8; margin-top: 6px;">{data['ytd_strokes']}</div>
                            <div style="font-size: 11px; color: #64748B; margin-top: 4px;">Baseline: {data['annual_baseline']} annual events</div>
                        </div>
                        <div class="strokewatch-card">
                            <div style="font-size: 12px; font-weight: 700; color: #94A3B8; text-transform: uppercase;">Today's Estimated Incidents</div>
                            <div class="metric-number" style="font-size: 32px; color: #F8FAFC; margin-top: 6px;">{data['today_strokes']}</div>
                            <div style="font-size: 11px; color: #22D3EE; margin-top: 4px;">{data['cadence_text']}</div>
                        </div>
                        <div class="strokewatch-card">
                            <div style="font-size: 12px; font-weight: 700; color: #94A3B8; text-transform: uppercase;">YTD Estimated Fatalities</div>
                            <div class="metric-number" style="font-size: 32px; color: #EF4444; margin-top: 6px;">{data['ytd_deaths']}</div>
                            <div style="font-size: 11px; color: #F87171; margin-top: 4px;">{data['death_cadence_text']}</div>
                        </div>
                        <div class="strokewatch-card">
                            <div style="font-size: 12px; font-weight: 700; color: #94A3B8; text-transform: uppercase;">The Stroke Clock Cadence</div>
                            <div class="metric-number" style="font-size: 32px; color: #F59E0B; margin-top: 6px;">2.58s</div>
                            <div style="font-size: 11px; color: #CBD5E1; margin-top: 4px;">UTC Timestamp: {data['utc_time']}</div>
                        </div>
                    </div>
                    """

                # 6 Core Statistic Metrics Cards
                gr.Markdown("### 🌐 Core Global Stroke Surveillance Indicators")
                with gr.Row():
                    for metric in data_engine.GLOBAL_METRICS[:3]:
                        with gr.Column():
                            gr.Markdown(
                                f"""
                                <div class="strokewatch-card">
                                    <div style="display: flex; justify-content: space-between; align-items: center;">
                                        <span style="font-size: 11px; font-weight: 700; color: #38BDF8;">{metric['unit']}</span>
                                        <span style="background: rgba(59, 130, 246, 0.2); color: #60A5FA; font-size: 10px; padding: 2px 6px; border-radius: 4px;">Verified</span>
                                    </div>
                                    <div style="font-size: 26px; font-weight: 800; color: #FFFFFF; margin-top: 8px;">{metric['formatted']}</div>
                                    <div style="font-size: 13px; font-weight: 700; color: #CBD5E1; margin-top: 2px;">{metric['label']}</div>
                                    <div style="font-size: 11px; color: #94A3B8; margin-top: 6px;">95% CI: {metric['ci']}</div>
                                    <div style="font-size: 10px; color: #64748B; margin-top: 4px;">Source: {metric['source']}</div>
                                </div>
                                """
                            )
                with gr.Row():
                    for metric in data_engine.GLOBAL_METRICS[3:]:
                        with gr.Column():
                            gr.Markdown(
                                f"""
                                <div class="strokewatch-card">
                                    <div style="display: flex; justify-content: space-between; align-items: center;">
                                        <span style="font-size: 11px; font-weight: 700; color: #34D399;">{metric['unit']}</span>
                                        <span style="background: rgba(16, 185, 129, 0.2); color: #34D399; font-size: 10px; padding: 2px 6px; border-radius: 4px;">Verified</span>
                                    </div>
                                    <div style="font-size: 26px; font-weight: 800; color: #FFFFFF; margin-top: 8px;">{metric['formatted']}</div>
                                    <div style="font-size: 13px; font-weight: 700; color: #CBD5E1; margin-top: 2px;">{metric['label']}</div>
                                    <div style="font-size: 11px; color: #94A3B8; margin-top: 6px;">95% CI: {metric['ci']}</div>
                                    <div style="font-size: 10px; color: #64748B; margin-top: 4px;">Source: {metric['source']}</div>
                                </div>
                                """
                            )

                # Daily Verified Clinical Insight
                gr.Markdown(
                    """
                    <div class="strokewatch-card-hero" style="margin-top: 16px;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="font-size: 18px;">💡</span>
                            <span style="font-size: 14px; font-weight: 700; color: #22D3EE; text-transform: uppercase;">Daily Verified Clinical Health Insight</span>
                        </div>
                        <div style="font-size: 15px; color: #F1F5F9; margin-top: 8px; line-height: 1.6;">
                            <b>The 10 mmHg Antihypertensive Rule:</b> Lowering resting systolic blood pressure by just <b>10 mmHg</b> reduces the relative risk of stroke by <b>27%</b> across both ischemic and hemorrhagic subtypes. Up to 87% of all lifetime stroke burden is directly tied to modifiable factors.
                        </div>
                        <div style="font-size: 11px; color: #94A3B8; margin-top: 8px;">
                            Citation: <i>GBD 2021 Stroke Collaborators. Global, regional, and national burden of stroke (1990–2021). The Lancet Neurology 2024; 23: 973–1003.</i>
                        </div>
                    </div>
                    """
                )

                region_select.change(update_counter_view, inputs=[region_select], outputs=[counter_html])
                refresh_counter_btn.click(update_counter_view, inputs=[region_select], outputs=[counter_html])
                demo.load(update_counter_view, inputs=[region_select], outputs=[counter_html])

            # ------------------------------------------------------------------
            # TAB 2: STROKE RISK PREDICTION LAB (MODELS FROM GIST)
            # ------------------------------------------------------------------
            with gr.Tab("🧠 Stroke Risk Prediction Lab"):
                gr.Markdown(
                    """
                    ### 🔬 Clinical Stroke Risk Assessment Engine
                    Powered by the **Gist Machine Learning Pipeline** (Logistic Regression, Random Forest Classifier, and Neural Network MLP) trained on the 5,110-patient healthcare benchmark dataset with SMOTE class balancing.
                    """
                )

                with gr.Row():
                    with gr.Column(scale=6):
                        with gr.Group():
                            gr.Markdown("#### 1. Demographic Profile")
                            with gr.Row():
                                in_age = gr.Slider(minimum=18, maximum=100, value=58, step=1, label="Patient Age (Years)")
                                in_gender = gr.Radio(choices=["Male", "Female"], value="Male", label="Biological Gender")
                            with gr.Row():
                                in_married = gr.Radio(choices=["Yes", "No"], value="Yes", label="Ever Married")
                                in_residence = gr.Radio(choices=["Urban", "Rural"], value="Urban", label="Residence Area")
                                in_work = gr.Dropdown(
                                    choices=["Private", "Self-employed", "Govt_job", "Never_worked", "children"],
                                    value="Private",
                                    label="Employment Sector"
                                )

                        with gr.Group():
                            gr.Markdown("#### 2. Medical & Clinical Indicators")
                            with gr.Row():
                                in_htn = gr.Checkbox(label="Diagnosed Arterial Hypertension (High BP)", value=True)
                                in_hd = gr.Checkbox(label="Diagnosed Heart Disease (CAD/Arrhythmia)", value=False)
                            with gr.Row():
                                in_glucose = gr.Slider(
                                    minimum=50.0, maximum=300.0, value=145.0, step=1.0,
                                    label="Average Blood Glucose Level (mg/dL) [Normal: <100 | Pre-diabetes: 100-140 | Diabetes: >140]"
                                )
                                in_bmi = gr.Slider(
                                    minimum=15.0, maximum=55.0, value=28.1, step=0.1,
                                    label="Body Mass Index - BMI (kg/m²) [Dataset Median: 28.1]"
                                )

                        with gr.Group():
                            gr.Markdown("#### 3. Behavioral Factors & Model Engine")
                            with gr.Row():
                                in_smoking = gr.Dropdown(
                                    choices=["never smoked", "formerly smoked", "smokes", "Unknown"],
                                    value="formerly smoked",
                                    label="Tobacco Smoking History"
                                )
                                in_model_choice = gr.Dropdown(
                                    choices=[
                                        "Ensemble / All Models Comparison",
                                        "Logistic Regression",
                                        "Random Forest",
                                        "Neural Network (MLP)"
                                    ],
                                    value="Ensemble / All Models Comparison",
                                    label="Active Prediction Model"
                                )

                        predict_btn = gr.Button("⚡ Compute Stroke Risk Assessment", variant="primary")

                    with gr.Column(scale=6):
                        pred_output_html = gr.HTML(
                            """
                            <div class="strokewatch-card" style="text-align: center; padding: 40px 20px;">
                                <div style="font-size: 40px; margin-bottom: 12px;">🩺</div>
                                <div style="font-size: 16px; font-weight: 700; color: #CBD5E1;">Awaiting Patient Parameters</div>
                                <div style="font-size: 12px; color: #64748B; margin-top: 6px;">
                                    Adjust demographic, medical, and lifestyle inputs on the left, then click <b>Compute Stroke Risk Assessment</b>.
                                </div>
                            </div>
                            """
                        )

                def run_prediction_ui(gender, age, htn, hd, married, work, res, glucose, bmi, smoking, model_sel):
                    htn_val = 1 if htn else 0
                    hd_val = 1 if hd else 0
                    result = predict_stroke_risk(
                        gender=gender,
                        age=age,
                        hypertension=htn_val,
                        heart_disease=hd_val,
                        ever_married=married,
                        work_type=work,
                        residence_type=res,
                        avg_glucose_level=glucose,
                        bmi=bmi,
                        smoking_status=smoking,
                        selected_model=model_sel
                    )

                    category = result["risk_category"]
                    prob = result["primary_prob"]
                    scores = result["model_scores"]
                    factors = result["identified_factors"]
                    recs = result["recommendations"]

                    # Styling based on category
                    if category == "High Risk":
                        badge_bg = "rgba(239, 68, 68, 0.2)"
                        badge_color = "#EF4444"
                        border_color = "#EF4444"
                    elif category == "Moderate Risk":
                        badge_bg = "rgba(245, 158, 11, 0.2)"
                        badge_color = "#F59E0B"
                        border_color = "#F59E0B"
                    else:
                        badge_bg = "rgba(16, 185, 129, 0.2)"
                        badge_color = "#10B981"
                        border_color = "#10B981"

                    factors_html = "".join([f"<li style='margin-bottom: 6px;'>{f}</li>" for f in factors]) if factors else "<li>No high-acuity modifiable risk drivers detected.</li>"
                    recs_html = "".join([f"<li style='margin-bottom: 6px;'>{r}</li>" for r in recs])

                    return f"""
                    <div class="strokewatch-card" style="border-top: 4px solid {border_color};">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-size: 12px; font-weight: 700; color: #94A3B8; text-transform: uppercase;">Stratified Risk Classification</span>
                            <span style="background: {badge_bg}; color: {badge_color}; border: 1px solid {badge_color}; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 800;">{category}</span>
                        </div>
                        <div class="metric-number" style="font-size: 42px; color: {badge_color}; margin-top: 10px;">{prob}%</div>
                        <div style="font-size: 12px; color: #CBD5E1; margin-top: 2px;">Estimated 10-Year Probability of Acute Cerebrovascular Event</div>

                        <!-- Model Comparison Bar Chart -->
                        <div style="margin-top: 20px; padding: 14px; background: rgba(15, 23, 42, 0.6); border-radius: 8px;">
                            <div style="font-size: 12px; font-weight: 700; color: #38BDF8; margin-bottom: 10px;">Cross-Model Probability Scores (Gist Pipeline):</div>
                            <div style="margin-bottom: 8px;">
                                <div style="display: flex; justify-content: space-between; font-size: 11px; color: #CBD5E1;">
                                    <span>Logistic Regression (ROC-AUC 0.8226)</span><span><b>{scores['Logistic Regression']}%</b></span>
                                </div>
                                <div style="background: #1E293B; height: 6px; border-radius: 3px; overflow: hidden; margin-top: 3px;">
                                    <div style="background: #38BDF8; height: 100%; width: {min(100, scores['Logistic Regression'])}%;"></div>
                                </div>
                            </div>
                            <div style="margin-bottom: 8px;">
                                <div style="display: flex; justify-content: space-between; font-size: 11px; color: #CBD5E1;">
                                    <span>Random Forest Classifier (ROC-AUC 0.7510)</span><span><b>{scores['Random Forest']}%</b></span>
                                </div>
                                <div style="background: #1E293B; height: 6px; border-radius: 3px; overflow: hidden; margin-top: 3px;">
                                    <div style="background: #34D399; height: 100%; width: {min(100, scores['Random Forest'])}%;"></div>
                                </div>
                            </div>
                            <div style="margin-bottom: 8px;">
                                <div style="display: flex; justify-content: space-between; font-size: 11px; color: #CBD5E1;">
                                    <span>Neural Network MLP (ROC-AUC 0.7660)</span><span><b>{scores['Neural Network (MLP)']}%</b></span>
                                </div>
                                <div style="background: #1E293B; height: 6px; border-radius: 3px; overflow: hidden; margin-top: 3px;">
                                    <div style="background: #F472B6; height: 100%; width: {min(100, scores['Neural Network (MLP)'])}%;"></div>
                                </div>
                            </div>
                        </div>

                        <!-- Risk Factors Identified -->
                        <div style="margin-top: 18px;">
                            <div style="font-size: 13px; font-weight: 700; color: #F59E0B;">⚠️ Patient Risk Factors Detected:</div>
                            <ul style="font-size: 12px; color: #CBD5E1; margin-top: 6px; padding-left: 18px; line-height: 1.5;">
                                {factors_html}
                            </ul>
                        </div>

                        <!-- Recommendations -->
                        <div style="margin-top: 14px;">
                            <div style="font-size: 13px; font-weight: 700; color: #10B981;">🛡️ Evidence-Based Clinical Actions:</div>
                            <ul style="font-size: 12px; color: #CBD5E1; margin-top: 6px; padding-left: 18px; line-height: 1.5;">
                                {recs_html}
                            </ul>
                        </div>

                        <div style="margin-top: 16px; font-size: 10px; color: #64748B; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 10px;">
                            *Disclaimer: For educational surveillance only. Not a medical diagnosis. If experiencing acute neurological deficits, immediately dial emergency services (911 / 112 / 108).*
                        </div>
                    </div>
                    """

                predict_btn.click(
                    run_prediction_ui,
                    inputs=[in_gender, in_age, in_htn, in_hd, in_married, in_work, in_residence, in_glucose, in_bmi, in_smoking, in_model_choice],
                    outputs=[pred_output_html]
                )

            # ------------------------------------------------------------------
            # TAB 3: GIST ARCHITECTURE & MODEL EVALUATION
            # ------------------------------------------------------------------
            with gr.Tab("📊 Gist Model Architecture & Evaluation"):
                gr.Markdown(
                    """
                    ### 📐 Model Architecture & Training Methodology (From Gist)
                    This section documents the end-to-end data pipeline and evaluation performance from your notebook:
                    """
                )
                with gr.Row():
                    with gr.Column():
                        gr.Markdown(
                            """
                            <div class="strokewatch-card">
                                <h4 style="color: #22D3EE; margin-bottom: 8px;">1. Data Preprocessing & Cleaning</h4>
                                <ul style="font-size: 12px; color: #CBD5E1; line-height: 1.6; padding-left: 16px;">
                                    <li><b>ID Removal:</b> Dropped patient identifier column to eliminate spurious correlation.</li>
                                    <li><b>Gender Filtering:</b> Excluded rare 'Other' sample for binary encoding stability.</li>
                                    <li><b>Imputation:</b> <code>SimpleImputer(strategy='median')</code> filled missing BMI values (median: <b>28.1 kg/m²</b>).</li>
                                    <li><b>One-Hot Encoding:</b> <code>pd.get_dummies(..., drop_first=True)</code> converted categorical features to 15 numeric dimensions.</li>
                                </ul>
                            </div>
                            """
                        )
                    with gr.Column():
                        gr.Markdown(
                            """
                            <div class="strokewatch-card">
                                <h4 style="color: #34D399; margin-bottom: 8px;">2. Class Imbalance & Feature Scaling</h4>
                                <ul style="font-size: 12px; color: #CBD5E1; line-height: 1.6; padding-left: 16px;">
                                    <li><b>Train/Test Split:</b> 80/20 stratified split preserving the ~4.9% positive stroke incidence.</li>
                                    <li><b>StandardScaler:</b> Fitted on <code>['age', 'avg_glucose_level', 'bmi']</code> to standardize continuous scales.</li>
                                    <li><b>SMOTE (Synthetic Minority Over-sampling):</b> Synthesized positive minority cases on training set to eliminate negative bias.</li>
                                    <li><b>Zero Data Leakage:</b> Scaler and SMOTE applied strictly to training partition.</li>
                                </ul>
                            </div>
                            """
                        )

                # ROC-AUC Metric Table
                gr.Markdown("#### 📈 Benchmark Model Performance Comparison")
                perf_df = pd.DataFrame([
                    {"Model Architecture": "Logistic Regression (L2 Penalty)", "ROC-AUC Score": "0.8226", "Sensitivity": "High (Best Screening Filter)", "Parameters": "16 Coefficients"},
                    {"Model Architecture": "Neural Network MLP (32-16-1 ReLU)", "ROC-AUC Score": "0.7660", "Sensitivity": "Balanced Non-Linear", "Parameters": "1,041 Weights"},
                    {"Model Architecture": "Random Forest (100 Estimators)", "ROC-AUC Score": "0.7510", "Sensitivity": "High Precision Ensemble", "Parameters": "100 Decision Trees"}
                ])
                gr.DataFrame(perf_df, interactive=False)

                # Visual Plots from Gist
                with gr.Row():
                    with gr.Column():
                        gr.Markdown("#### 🎯 Confusion Matrix & Feature Importances (Gist Cell 5 & 6)")
                        plot1_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static', 'plots', 'gist_eval_plots.png')
                        if os.path.exists(plot1_path):
                            gr.Image(plot1_path, label="Confusion Matrix (Logistic Regression) & Random Forest Top 10 Features", show_label=True)
                    with gr.Column():
                        gr.Markdown("#### 📉 Receiver Operating Characteristic (ROC) Comparison")
                        plot2_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static', 'plots', 'roc_curves.png')
                        if os.path.exists(plot2_path):
                            gr.Image(plot2_path, label="ROC Curves (Logistic Regression vs. Random Forest vs. MLP)", show_label=True)

            # ------------------------------------------------------------------
            # TAB 4: STROKESENSE AI ASSISTANT (POWERED BY FLASH)
            # ------------------------------------------------------------------
            with gr.Tab("🤖 StrokeSense AI Assistant"):
                gr.Markdown(
                    """
                    ### 💬 StrokeSense Clinical Evidence Assistant
                    Powered by **Google Gemini Flash** & the **Lancet Neurology / WSO Knowledge Base**.  
                    *Includes real-time acute symptom triage safety alarms and peer-reviewed journal citations.*
                    """
                )

                # Emergency Banner Note
                gr.Markdown(
                    """
                    <div class="emergency-banner" style="margin-bottom: 14px;">
                        <span style="font-weight: 800; color: #EF4444;">🚨 ACUTE SYMPTOM SAFETY DIRECTIVE:</span>
                        <span style="font-size: 13px; color: #F8FAFC;">
                            If you or someone near you exhibits facial drooping, arm weakness, slurred speech, or sudden vision loss, <b>DIAL 911 (US) or 112 / 108 (India) IMMEDIATELY</b>.
                        </span>
                    </div>
                    """
                )

                chatbot = gr.Chatbot(height=420)
                with gr.Row():
                    chat_input = gr.Textbox(
                        placeholder="Ask about stroke causes, prevention, FAST guidelines, or type acute symptoms...",
                        label="Your Clinical Query",
                        scale=9
                    )
                    send_chat_btn = gr.Button("Ask StrokeSense", variant="primary", scale=3)

                gr.Markdown("#### 💡 Quick Evidence Queries:")
                with gr.Row():
                    q1 = gr.Button("Ischemic vs. Hemorrhagic Difference?")
                    q2 = gr.Button("Why are global stroke cases increasing?")
                    q3 = gr.Button("What are the top modifiable risk factors?")
                    q4 = gr.Button("How to recognize stroke with FAST?")

                def handle_chat_submission(user_msg, hist):
                    if hist is None:
                        hist = []
                    new_hist, _ = ai_engine.process_chat_message(user_msg, hist)
                    return new_hist, ""

                send_chat_btn.click(handle_chat_submission, inputs=[chat_input, chatbot], outputs=[chatbot, chat_input])
                chat_input.submit(handle_chat_submission, inputs=[chat_input, chatbot], outputs=[chatbot, chat_input])

                q1.click(lambda h: ai_engine.process_chat_message("What is the difference between ischemic and hemorrhagic stroke?", h or [])[0], inputs=[chatbot], outputs=[chatbot])
                q2.click(lambda h: ai_engine.process_chat_message("Why are stroke cases increasing worldwide?", h or [])[0], inputs=[chatbot], outputs=[chatbot])
                q3.click(lambda h: ai_engine.process_chat_message("What are the top 5 modifiable risk factors for stroke?", h or [])[0], inputs=[chatbot], outputs=[chatbot])
                q4.click(lambda h: ai_engine.process_chat_message("How do I recognize acute stroke using the FAST protocol?", h or [])[0], inputs=[chatbot], outputs=[chatbot])

            # ------------------------------------------------------------------
            # TAB 5: FAST EMERGENCY CENTER & NEURAL LOSS SIMULATOR
            # ------------------------------------------------------------------
            with gr.Tab("🚨 FAST Emergency Awareness"):
                gr.Markdown(
                    """
                    ### ⏱️ Acute Stroke Emergency Command & "Time is Brain" Simulator
                    Every minute an ischemic stroke goes untreated, approximately **1.9 Million brain neurons** and **14 Billion synapses** perish.
                    """
                )

                # FAST Cards Visual
                with gr.Row():
                    with gr.Column():
                        gr.Markdown(
                            """
                            <div class="strokewatch-card" style="border-top: 4px solid #38BDF8;">
                                <div style="font-size: 24px; font-weight: 800; color: #38BDF8;">F — Face Drooping</div>
                                <div style="font-size: 13px; color: #CBD5E1; margin-top: 6px;">
                                    Ask the person to smile. Does one side of the mouth droop or feel numb?
                                </div>
                            </div>
                            """
                        )
                    with gr.Column():
                        gr.Markdown(
                            """
                            <div class="strokewatch-card" style="border-top: 4px solid #34D399;">
                                <div style="font-size: 24px; font-weight: 800; color: #34D399;">A — Arm Weakness</div>
                                <div style="font-size: 13px; color: #CBD5E1; margin-top: 6px;">
                                    Ask them to raise both arms. Does one arm drift downward or feel clumsy/numb?
                                </div>
                            </div>
                            """
                        )
                    with gr.Column():
                        gr.Markdown(
                            """
                            <div class="strokewatch-card" style="border-top: 4px solid #F59E0B;">
                                <div style="font-size: 24px; font-weight: 800; color: #F59E0B;">S — Speech Slurring</div>
                                <div style="font-size: 13px; color: #CBD5E1; margin-top: 6px;">
                                    Ask them to repeat: "The sky is blue". Is speech garbled, slurred, or absent?
                                </div>
                            </div>
                            """
                        )
                    with gr.Column():
                        gr.Markdown(
                            """
                            <div class="strokewatch-card" style="border-top: 4px solid #EF4444;">
                                <div style="font-size: 24px; font-weight: 800; color: #EF4444;">T — Time to Call 911</div>
                                <div style="font-size: 13px; color: #CBD5E1; margin-top: 6px;">
                                    If ANY sign is present, dial <b>911 / 112 / 108</b> immediately. Note onset time!
                                </div>
                            </div>
                            """
                        )

                # Neural Loss Interactive Calculator
                gr.Markdown("#### 🧠 The Saver (Stroke 2006) \"Time is Brain\" Neural Destruction Simulator")
                with gr.Row():
                    with gr.Column(scale=5):
                        mins_slider = gr.Slider(
                            minimum=1, maximum=240, value=60, step=1,
                            label="Minutes Elapsed Since Stroke Symptom Onset"
                        )
                    with gr.Column(scale=7):
                        neural_loss_html = gr.HTML()

                def update_neural_calc(mins):
                    res = data_engine.calculate_neural_loss(mins)
                    return f"""
                    <div class="strokewatch-card" style="border-left: 4px solid #EF4444;">
                        <div style="font-size: 13px; font-weight: 700; color: #EF4444; text-transform: uppercase;">Estimated Ischemic Neurological Destruction ({res['minutes']:.0f} Minutes Elapsed):</div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px;">
                            <div>
                                <div style="font-size: 11px; color: #94A3B8;">Neurons Destroyed:</div>
                                <div class="metric-number" style="font-size: 22px; color: #F8FAFC;">{res['neurons_lost']}</div>
                            </div>
                            <div>
                                <div style="font-size: 11px; color: #94A3B8;">Synapses Lost:</div>
                                <div class="metric-number" style="font-size: 22px; color: #F8FAFC;">{res['synapses_lost']}</div>
                            </div>
                            <div>
                                <div style="font-size: 11px; color: #94A3B8;">Myelinated Fibers Lost:</div>
                                <div style="font-size: 16px; font-weight: 700; color: #38BDF8;">{res['fibers_km']}</div>
                            </div>
                            <div>
                                <div style="font-size: 11px; color: #94A3B8;">Accelerated Brain Aging:</div>
                                <div style="font-size: 16px; font-weight: 700; color: #F59E0B;">{res['aging_equivalent']}</div>
                            </div>
                        </div>
                    </div>
                    """

                mins_slider.change(update_neural_calc, inputs=[mins_slider], outputs=[neural_loss_html])
                demo.load(update_neural_calc, inputs=[mins_slider], outputs=[neural_loss_html])

                # Emergency Dispatch Hotlines Directory
                gr.Markdown("#### 📞 Direct Regional Emergency Dispatch Directory")
                with gr.Row():
                    gr.Markdown(
                        """
                        <div class="strokewatch-card">
                            <div style="font-size: 18px; font-weight: 800; color: #FFFFFF;">🇮🇳 India</div>
                            <div class="metric-number" style="font-size: 26px; color: #38BDF8; margin-top: 4px;">112 / 108</div>
                            <div style="font-size: 11px; color: #94A3B8;">Unified Emergency & Medical Ambulance</div>
                        </div>
                        """
                    )
                    gr.Markdown(
                        """
                        <div class="strokewatch-card">
                            <div style="font-size: 18px; font-weight: 800; color: #FFFFFF;">🇺🇸 / 🇨🇦 USA & Canada</div>
                            <div class="metric-number" style="font-size: 26px; color: #34D399; margin-top: 4px;">911</div>
                            <div style="font-size: 11px; color: #94A3B8;">National Emergency Dispatch Services</div>
                        </div>
                        """
                    )
                    gr.Markdown(
                        """
                        <div class="strokewatch-card">
                            <div style="font-size: 18px; font-weight: 800; color: #FFFFFF;">🇬🇧 / 🇪🇺 UK & Europe</div>
                            <div class="metric-number" style="font-size: 26px; color: #F59E0B; margin-top: 4px;">999 / 112</div>
                            <div style="font-size: 11px; color: #94A3B8;">NHS Emergency / European Union SOS</div>
                        </div>
                        """
                    )
                    gr.Markdown(
                        """
                        <div class="strokewatch-card">
                            <div style="font-size: 18px; font-weight: 800; color: #FFFFFF;">🇦🇺 Australia</div>
                            <div class="metric-number" style="font-size: 26px; color: #F472B6; margin-top: 4px;">000</div>
                            <div style="font-size: 11px; color: #94A3B8;">Triple Zero Emergency Services</div>
                        </div>
                        """
                    )

            # ------------------------------------------------------------------
            # TAB 6: DEDICATED INDIA STROKE INTELLIGENCE
            # ------------------------------------------------------------------
            with gr.Tab("🗺️ Dedicated India & Global Surveillance"):
                gr.Markdown(
                    """
                    ### 🇮🇳 Indian Council of Medical Research (ICMR-NCDIR) Sentinel Surveillance
                    India experiences ~1.85 Million annual strokes and 720,000 fatalities, marked by an unusually high hemorrhagic proportion of **~31.5%** (double Western rates).
                    """
                )

                with gr.Row():
                    registry_dropdown = gr.Dropdown(
                        choices=[r["city"] for r in data_engine.INDIA_REGISTRIES],
                        value="Ludhiana",
                        label="Select ICMR Sentinel Stroke Registry Center"
                    )

                reg_card_html = gr.HTML()

                def update_registry_card(city_name):
                    reg = next((r for r in data_engine.INDIA_REGISTRIES if r["city"] == city_name), data_engine.INDIA_REGISTRIES[0])
                    return f"""
                    <div class="strokewatch-card-hero">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <span style="font-size: 22px; font-weight: 800; color: #FFFFFF;">{reg['city']}, {reg['state']}</span>
                                <span style="background: rgba(34, 211, 238, 0.2); color: #22D3EE; font-size: 11px; padding: 2px 8px; border-radius: 4px; margin-left: 8px;">{reg['registryType']}</span>
                            </div>
                            <div style="font-size: 11px; color: #94A3B8;">Source: {reg['source']}</div>
                        </div>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 14px; margin-top: 16px;">
                            <div>
                                <div style="font-size: 11px; color: #94A3B8;">Age-Adjusted Rate (AAR):</div>
                                <div class="metric-number" style="font-size: 24px; color: #38BDF8;">{reg['ageAdjustedRate']} / 100k</div>
                            </div>
                            <div>
                                <div style="font-size: 11px; color: #94A3B8;">Hypertension Prevalence:</div>
                                <div class="metric-number" style="font-size: 24px; color: #EF4444;">{reg['hypertensionPrevalence']}%</div>
                            </div>
                            <div>
                                <div style="font-size: 11px; color: #94A3B8;">Ischemic vs. Hemorrhagic:</div>
                                <div style="font-size: 16px; font-weight: 700; color: #F8FAFC;">{reg['ischemicShare']}% Isch / {reg['hemorrhagicShare']}% Hem</div>
                            </div>
                            <div>
                                <div style="font-size: 11px; color: #94A3B8;">Diabetes Prevalence:</div>
                                <div class="metric-number" style="font-size: 24px; color: #F59E0B;">{reg['diabetesPrevalence']}%</div>
                            </div>
                            <div>
                                <div style="font-size: 11px; color: #94A3B8;">Registry Sample Size:</div>
                                <div style="font-size: 16px; font-weight: 700; color: #34D399;">{reg['sampleSize']:,} Cases Audited</div>
                            </div>
                        </div>
                    </div>
                    """

                registry_dropdown.change(update_registry_card, inputs=[registry_dropdown], outputs=[reg_card_html])
                demo.load(update_registry_card, inputs=[registry_dropdown], outputs=[reg_card_html])

                # Global Country Comparison Table
                gr.Markdown("#### 🌐 Global Territory Epidemiological Comparison (2024 Audit)")
                country_df = pd.DataFrame(data_engine.COUNTRY_DATASET)
                gr.DataFrame(country_df, interactive=False)

            # ------------------------------------------------------------------
            # TAB 7: WHAT-IF? SCENARIO PREDICTION LAB
            # ------------------------------------------------------------------
            with gr.Tab("🔬 What-If? Scenario Prediction Lab"):
                gr.Markdown(
                    """
                    ### 🎛️ Joint Population Attributable Fraction (PAF) Forecasting Engine
                    Simulate how population-level risk reductions in blood pressure, smoking, exercise, and air pollution avert acute stroke events and fatalities worldwide through 2035.
                    """
                )

                with gr.Row():
                    with gr.Column(scale=5):
                        sim_bp = gr.Slider(minimum=0, maximum=50, value=25, step=1, label="Systolic Blood Pressure Control Increase (%) [PAF: 55.5%]")
                        sim_smoke = gr.Slider(minimum=0, maximum=60, value=20, step=1, label="Tobacco Smoking Cessation Rate (%) [PAF: 18.2%]")
                        sim_ex = gr.Slider(minimum=0, maximum=50, value=20, step=1, label="Aerobic Physical Activity Increase (%) [PAF: 15.0%]")
                        sim_pm = gr.Slider(minimum=0, maximum=50, value=15, step=1, label="Ambient PM2.5 Air Pollution Reduction (%) [PAF: 30.1%]")

                    with gr.Column(scale=7):
                        sim_results_html = gr.HTML()

                def update_sim_view(bp, smoke, ex, pm):
                    res = data_engine.calculate_what_if_simulation(bp, smoke, ex, pm)
                    return f"""
                    <div class="strokewatch-card" style="border-top: 4px solid #10B981;">
                        <div style="font-size: 12px; font-weight: 700; color: #94A3B8; text-transform: uppercase;">Joint Population Prevention Forecast</div>
                        <div class="metric-number" style="font-size: 42px; color: #10B981; margin-top: 8px;">{res['strokes_averted_str']}</div>
                        <div style="font-size: 13px; font-weight: 700; color: #F8FAFC;">Annual Incident Strokes Averted Globally</div>
                        <div style="font-size: 11px; color: #94A3B8; margin-top: 2px;">95% Uncertainty Interval: {res['ci_lower_str']} – {res['ci_upper_str']} cases</div>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 20px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 14px;">
                            <div>
                                <div style="font-size: 11px; color: #94A3B8;">Annual Fatalities Prevented:</div>
                                <div class="metric-number" style="font-size: 24px; color: #38BDF8;">{res['deaths_averted_str']}</div>
                            </div>
                            <div>
                                <div style="font-size: 11px; color: #94A3B8;">DALYs Burden Avoided:</div>
                                <div class="metric-number" style="font-size: 24px; color: #34D399;">{res['dalys_averted_str']}</div>
                            </div>
                            <div>
                                <div style="font-size: 11px; color: #94A3B8;">Combined Relative Burden Reduction:</div>
                                <div style="font-size: 18px; font-weight: 700; color: #F59E0B;">-{res['combined_reduction_pct']}%</div>
                            </div>
                            <div>
                                <div style="font-size: 11px; color: #94A3B8;">Epidemiological Mathematical Model:</div>
                                <div style="font-size: 12px; color: #CBD5E1;">Multiplicative Joint PAF</div>
                            </div>
                        </div>
                    </div>
                    """

                for s in [sim_bp, sim_smoke, sim_ex, sim_pm]:
                    s.change(update_sim_view, inputs=[sim_bp, sim_smoke, sim_ex, sim_pm], outputs=[sim_results_html])
                demo.load(update_sim_view, inputs=[sim_bp, sim_smoke, sim_ex, sim_pm], outputs=[sim_results_html])

            # ------------------------------------------------------------------
            # TAB 8: CLINICAL RESEARCH & CASE STUDIES
            # ------------------------------------------------------------------
            with gr.Tab("📚 Research & Case Studies"):
                gr.Markdown("### 📖 Peer-Reviewed Publications & Clinical Literature Feed")
                for item in data_engine.RESEARCH_FEED:
                    gr.Markdown(
                        f"""
                        <div class="strokewatch-card" style="margin-bottom: 12px;">
                            <div style="font-size: 15px; font-weight: 800; color: #38BDF8;">{item['title']}</div>
                            <div style="font-size: 12px; font-weight: 700; color: #94A3B8; margin-top: 2px;">{item['journal']} | DOI/ID: {item['doi']}</div>
                            <div style="font-size: 13px; color: #CBD5E1; margin-top: 8px; line-height: 1.5;">{item['summary']}</div>
                        </div>
                        """
                    )

        # ======================================================================
        # Footer & Provenance Disclaimer
        # ======================================================================
        gr.Markdown(
            """
            ---
            <div style="text-align: center; font-size: 11px; color: #64748B; padding: 16px 0;">
                <b>Medical Disclaimer:</b> StrokeWatch AI is an educational surveillance, epidemiological modeling, and public health awareness tool.
                It does <b>NOT</b> provide individual clinical diagnoses or replace emergency medical advice.
                In the event of acute stroke symptoms, immediately dial emergency dispatch (<b>911 / 112 / 108 / 999</b>).<br>
                Calibrated against GBD 2021 Stroke Collaborators, WHO, WSO, and ICMR-NCDIR registries.
            </div>
            """
        )

    return demo

if __name__ == "__main__":
    app = create_ui()
    # Launch on 0.0.0.0 port 7860
    app.launch(server_name="0.0.0.0", server_port=7860, share=False)
