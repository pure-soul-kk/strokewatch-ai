# StrokeWatch AI — Global Stroke Intelligence Platform

> **A Bloomberg-style Medical Command Center & Global Stroke Surveillance System**  
> Calibrated against **GBD 2021 Stroke Collaborators**, **World Health Organization (WHO)**, **World Stroke Organization (WSO)**, and the **ICMR-NCDIR National Stroke Registry Programme**.

---

## 🌟 Platform Highlights

1. **Executive Command Dashboard**
   - **Continuous Live Estimated Stroke Counter**: Poisson-interpolated counter tracking incident events (~1 every 2.58s globally; ~1 every 17.06s in India) with explicit baseline methodology disclosures.
   - **6 Core Statistic Metric Cards**: Actual counts, reporting intervals, primary data registries, audit dates, and model vs. registry verification badges.
   - **The Stroke Clock**: Real-time visual cadence meter illustrating global event frequency.
   - **Daily Verified Health Insight**: Evidence-based stroke prevention facts with journal citations.

2. **3D Interactive Global Map**
   - Multi-metric choropleth covering 204 territories (Incidence, Mortality, Prevalence, DALYs).
   - Time-horizon selector (2020 through 2030 projected).
   - Instant search and slide-over analytical drawer with pathological subtype breakdowns.

3. **Dedicated India Stroke Intelligence**
   - Comprehensive national overview (~1.85M annual cases, 720k deaths, high hemorrhagic proportion of 31.5%).
   - Sentinel surveillance map highlighting **Ludhiana**, **Varanasi**, **Kota**, **Cuttack**, **Cachar**, and **Tirunelveli**.
   - Clear distinction between Population-Based (PBSR) and Hospital-Based (HBSR) registries.

4. **StrokeSense AI Assistant**
   - Evidence-retrieval medical assistant backed by Lancet Neurology and WSO clinical literature.
   - Real-time acute stroke triage detector with prominent emergency intervention directives.
   - Strict medical non-diagnostic guardrails and citation tracking.

5. **Stroke Risk Awareness Lab**
   - Interactive educational self-check covering blood pressure, tobacco, physical activity, blood glucose, and arrhythmia history.
   - Personalized lifestyle recommendations without claiming clinical diagnostic probability.

6. **FAST Emergency Awareness Center**
   - Visual step-by-step Face, Arms, Speech, Time guide.
   - **"Time is Brain" Neural Loss Simulator**: 1.9M neurons destroyed per minute of untreated acute ischemia.
   - Direct emergency dispatch directory for India (112/108), USA/Canada (911), UK/Europe (999/112), and Australia (000).

7. **Advanced Analytics & Research**
   - Longitudinal trends from 1990 to 2035 with customizable SVG area curves.
   - Pathological subtype comparison (Ischemic vs ICH vs SAH).
   - GBD modifiable risk factor attribution (PAF %).
   - Age and gender distribution pyramids.
   - Multi-country side-by-side comparative matrix.
   - One-click CSV export.

8. **What-If? Scenario Prediction Lab**
   - Joint Population Attributable Fraction (PAF) simulation engine.
   - Interactive sliders for Blood Pressure Control, Smoking Cessation, Aerobic Exercise, and PM2.5 Air Quality.
   - 95% Uncertainty Intervals reflecting epidemiological standard errors.

9. **Latest News & Educational Impact Stories**
   - Real peer-reviewed publications from *The Lancet Neurology*, *NEJM*, and *Stroke*.
   - Educational case scenarios demonstrating golden-hour interventions.

---

## 🚀 Running the Project

### Option A: Gradio & Flash Command Center (Recommended)

Run the full interactive Bloomberg-style medical command center:

```bash
python3 run.py --mode gradio
# Or directly:
python3 app.py
```

Open `http://localhost:7860` in your browser.

**Features included:**
- **Executive Command Dashboard**: Live Poisson estimated stroke cadence, 6 core metrics, and verified health insights.
- **Stroke Risk Prediction Lab**: Patient risk stratification powered by the **Gist models** (Logistic Regression, Random Forest, Neural Network MLP).
- **Gist Model Architecture & Evaluation**: Preprocessing pipeline breakdown, SMOTE class balancing, ROC-AUC comparison table, and confusion matrix/feature importance charts.
- **StrokeSense AI Assistant**: Powered by **Google Gemini Flash** (with Lancet/WSO knowledge retrieval fallback) and acute symptom emergency detection.
- **FAST Emergency Awareness & Neural Loss Simulator**: 1.9M neurons destroyed per minute with emergency dispatch directory.
- **Dedicated India Surveillance**: ICMR-NCDIR sentinel registries (Ludhiana, Varanasi, Kota, Cuttack, Cachar, Tirunelveli).
- **What-If? Scenario Prediction Lab**: Joint PAF simulation engine modeling BP control, smoking cessation, exercise, and air quality.
- **Clinical Research Feed**: Real peer-reviewed publications from *The Lancet Neurology*, *NEJM*, and *WSO*.

### Option B: Flask REST API Backend

Run the Flask server providing RESTful endpoints (`/api/predict`, `/api/chat`, `/api/simulate`, `/api/stats`, `/api/registries`):

```bash
python3 run.py --mode flask
# Or directly:
python3 flask_app.py
```

Access the API and status page at `http://localhost:5000`.

### Option C: Run Both Gradio and Flask Simultaneously

```bash
python3 run.py --mode all
```

- Gradio UI: `http://localhost:7860`
- Flask REST API: `http://localhost:5000`

---

## ⚡ Deploying to Vercel (Zero Local PC Resource Consumption)

The platform is fully configured for serverless deployment on **Vercel** with zero compute or RAM load on your local PC.

### Method 1: Git Push to Vercel (Instant 1-Click)

1. Push your repository to **GitHub** (or GitLab / Bitbucket).
2. Go to [vercel.com/new](https://vercel.com/new) and import your repository.
3. Keep default settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
4. Click **Deploy**.

Vercel will automatically build the Next.js frontend and the serverless functions (`api/index.py` & `requirements.txt`).

### Method 2: Vercel CLI

```bash
# In the strokewatch-ai directory:
vercel
# For production deployment:
vercel --prod
```

### Serverless Architecture on Vercel:
- **Frontend**: High-speed Next.js command center served globally on the Vercel Edge Network.
- **Serverless API**: Python endpoints (`/api/predict`, `/api/chat`, `/api/simulate`, `/api/stats`, `/api/registries`) served via `@vercel/python` in `api/index.py`.
- **Zero Local Resource Load**: All calculations, predictions, and simulations run entirely in Vercel's serverless cloud infrastructure.
- **Instant Cold Starts**: The Gist machine learning models use a calibrated pure-Python formula that executes in `< 1ms` with no heavy C++ library cold starts.


---

## 🔬 Machine Learning Pipeline (From Gist)

Trained on the benchmark 5,110-patient healthcare stroke dataset:
1. **Cleaning**: Dropped `id`, removed gender `Other`, median imputation for `bmi` (28.1 kg/m²).
2. **Encoding**: One-Hot Encoding with `drop_first=True` across 5 categorical variables.
3. **Scaling**: `StandardScaler` on numerical features (`age`, `avg_glucose_level`, `bmi`).
4. **Balancing**: SMOTE (Synthetic Minority Over-sampling) on training set.
5. **Evaluation**:
   - Logistic Regression: **ROC-AUC = 0.8226**
   - Neural Network (MLP): **ROC-AUC = 0.7660**
   - Random Forest: **ROC-AUC = 0.7510**


---

## 🛡️ Medical Disclaimer & Provenance

*StrokeWatch AI is an educational surveillance platform designed for public health awareness, epidemiology analysis, and clinical training. It does NOT provide individual medical diagnoses. In the event of acute stroke symptoms, immediately dial emergency dispatch services (911 / 112 / 108).*
