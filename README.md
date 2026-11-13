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

### Option A: Next.js Full-Stack App (Recommended for Production)

```bash
cd strokewatch-ai
npm install
npm run dev
```

Visit `http://localhost:3000` to interact with the full Next.js App Router command center.

### Option B: Standalone Zero-Dependency Instant Preview

If you want to view the platform instantly in any browser without Node or build tools:

```bash
cd strokewatch-ai
# Open standalone.html in your browser or serve locally:
python3 -m http.server 3000
```

Open `http://localhost:3000/standalone.html` in your browser.

---

## 🛡️ Medical Disclaimer & Provenance

*StrokeWatch AI is an educational surveillance platform designed for public health awareness, epidemiology analysis, and clinical training. It does NOT provide individual medical diagnoses. In the event of acute stroke symptoms, immediately dial emergency dispatch services (911 / 112 / 108).*
