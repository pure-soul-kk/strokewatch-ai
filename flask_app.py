"""
flask_app.py — StrokeWatch AI Flask REST API & Web Service
Provides RESTful endpoints for StrokeWatch AI:
- / : Status & Dashboard Landing
- /api/predict : Stroke Risk Prediction (Gist Pipeline)
- /api/chat : StrokeSense AI Assistant (Flash / Knowledge Engine)
- /api/simulate : Joint PAF Forecasting Simulation
- /api/stats : Real-time Poisson Surveillance Metrics
- /api/registries : ICMR-NCDIR Registry Data
- /api/neural-loss : Acute Ischemic Neural Destruction Calculator
"""

import os
import sys

# Ensure local packages directory is prioritized
_pkg_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'packages')
if os.path.exists(_pkg_dir) and _pkg_dir not in sys.path:
    sys.path.insert(0, _pkg_dir)

from flask import Flask, request, jsonify, render_template_string
from ml_engine import predict_stroke_risk
import data_engine
import ai_engine

app = Flask(__name__)

HOME_HTML = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>StrokeWatch AI — Flask API & Command Center</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            background-color: #080D18;
            color: #F8FAFC;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            margin: 0;
            padding: 40px 20px;
            display: flex;
            justify-content: center;
        }
        .container {
            max-width: 800px;
            width: 100%;
        }
        .card {
            background: #111B2D;
            border: 1px solid rgba(59, 130, 246, 0.2);
            border-radius: 14px;
            padding: 24px;
            margin-bottom: 20px;
        }
        h1 { color: #22D3EE; margin-top: 0; }
        h2 { color: #38BDF8; font-size: 18px; }
        .endpoint {
            background: #16243E;
            padding: 10px 14px;
            border-radius: 8px;
            font-family: monospace;
            margin: 8px 0;
            color: #34D399;
        }
        .btn {
            display: inline-block;
            background: linear-gradient(135deg, #0284C7 0%, #0369A1 100%);
            color: #FFFFFF;
            padding: 12px 24px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 700;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <h1>🧠 StrokeWatch AI — Flask & Gradio Intelligence Platform</h1>
            <p style="color: #CBD5E1; line-height: 1.6;">
                The platform is operational with calibrated GBD 2021 & WSO data and the Gist Machine Learning inference pipeline.
            </p>
            <a href="http://localhost:7860" target="_blank" class="btn">🚀 Open Gradio Interactive Dashboard</a>
        </div>

        <div class="card">
            <h2>Available REST API Endpoints</h2>
            <div class="endpoint">POST /api/predict</div>
            <div style="font-size: 13px; color: #94A3B8; margin-bottom: 12px;">Evaluates patient stroke risk using Logistic Regression, Random Forest, and MLP models.</div>

            <div class="endpoint">POST /api/chat</div>
            <div style="font-size: 13px; color: #94A3B8; margin-bottom: 12px;">StrokeSense AI assistant with acute emergency triage detection.</div>

            <div class="endpoint">POST /api/simulate</div>
            <div style="font-size: 13px; color: #94A3B8; margin-bottom: 12px;">What-If? Joint PAF simulation engine for risk factor interventions.</div>

            <div class="endpoint">GET /api/stats</div>
            <div style="font-size: 13px; color: #94A3B8; margin-bottom: 12px;">Live Poisson surveillance estimates (Global and India).</div>

            <div class="endpoint">GET /api/registries</div>
            <div style="font-size: 13px; color: #94A3B8;">ICMR-NCDIR sentinel stroke registry dataset.</div>
        </div>
    </div>
</body>
</html>
"""

@app.route("/", methods=["GET"])
def index():
    return render_template_string(HOME_HTML)

@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "healthy", "service": "StrokeWatch AI", "framework": "Flask & Gradio"})

@app.route("/api/stats", methods=["GET"])
def get_stats():
    region = request.args.get("region", "Global")
    estimates = data_engine.calculate_live_stroke_estimates(region)
    return jsonify({
        "status": "success",
        "live_estimates": estimates,
        "global_metrics": data_engine.GLOBAL_METRICS,
        "india_overview": data_engine.INDIA_OVERVIEW
    })

@app.route("/api/registries", methods=["GET"])
def get_registries():
    return jsonify({
        "status": "success",
        "registries": data_engine.INDIA_REGISTRIES
    })

@app.route("/api/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json(force=True) or {}
        gender = data.get("gender", "Male")
        age = float(data.get("age", 55))
        hypertension = int(data.get("hypertension", 0))
        heart_disease = int(data.get("heart_disease", 0))
        ever_married = data.get("ever_married", "Yes")
        work_type = data.get("work_type", "Private")
        residence_type = data.get("residence_type", "Urban")
        avg_glucose_level = float(data.get("avg_glucose_level", 105.0))
        bmi = float(data.get("bmi", 28.1))
        smoking_status = data.get("smoking_status", "formerly smoked")
        model_choice = data.get("model", "Ensemble / All Models Comparison")

        result = predict_stroke_risk(
            gender=gender,
            age=age,
            hypertension=hypertension,
            heart_disease=heart_disease,
            ever_married=ever_married,
            work_type=work_type,
            residence_type=residence_type,
            avg_glucose_level=avg_glucose_level,
            bmi=bmi,
            smoking_status=smoking_status,
            selected_model=model_choice
        )
        return jsonify({"status": "success", "result": result})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400

@app.route("/api/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json(force=True) or {}
        message = data.get("message", "")
        history = data.get("history", [])
        updated_history, response = ai_engine.process_chat_message(message, history)
        is_emergency = ai_engine.check_acute_emergency(message)
        return jsonify({
            "status": "success",
            "response": response,
            "is_emergency": is_emergency,
            "history": updated_history
        })
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400

@app.route("/api/simulate", methods=["POST"])
def simulate():
    try:
        data = request.get_json(force=True) or {}
        bp = float(data.get("bp_reduction_pct", 25))
        smoke = float(data.get("smoking_cessation_pct", 20))
        ex = float(data.get("exercise_increase_pct", 20))
        pm = float(data.get("air_quality_pct", 15))
        result = data_engine.calculate_what_if_simulation(bp, smoke, ex, pm)
        return jsonify({"status": "success", "simulation": result})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400

@app.route("/api/neural-loss", methods=["POST"])
def neural_loss():
    try:
        data = request.get_json(force=True) or {}
        minutes = float(data.get("minutes", 60))
        result = data_engine.calculate_neural_loss(minutes)
        return jsonify({"status": "success", "neural_loss": result})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)
