# PRODUCT.md — StrokeWatch AI

## Purpose
StrokeWatch AI is a Bloomberg-style global stroke monitoring, epidemiological surveillance, risk awareness, and emergency response platform. It translates complex neurovascular data from global health authorities (WHO, WSO, IHME/GBD, and ICMR-NCDIR) into actionable clinical intelligence and life-saving public health awareness.

## Primary Users & Jobs to Be Done
1. **Public Health Researchers & Epidemiologists**: Examine longitudinal trends (1990–2035), cross-country comparisons across 204 territories, and regional registry observations (e.g. ICMR sentinel sites in India).
2. **Clinicians & Healthcare Professionals**: Understand pathological subtype variations (ischemic vs. hemorrhagic stroke distributions) and evaluate population attributable fractions (PAF) for modifiable risk factors.
3. **General Public & Patients at Risk**: Assess lifestyle risk factors through the Stroke Risk Awareness Lab, learn symptoms via the interactive FAST protocol, and access real-time emergency dispatch instructions.

## Visitor Modes by Surface
- **Operate**: Executive Command Center, Interactive 3D World Map, India Stroke Intelligence, and What-If? Forecasting Simulator. Prioritizes information density, data scanability, filter latency, and precise numerical readouts.
- **Read**: News & Peer-Reviewed Research Feed, Clinical Case Logs, and Methodology Transparency disclosures. Prioritizes typography rhythm, source citations, and reading comfort.
- **Persuade**: FAST Emergency Awareness Center and Risk Awareness Lab. Prioritizes immediate, unambiguous action directives ("Time is Brain — Call 911 / 112 / 108").

## Core Capabilities
- **Continuous Estimated Stroke Counter**: Poisson-process live estimation based on annual global (12.22M) and Indian (1.85M) incidence baselines.
- **The Stroke Clock**: Real-time cadence visualization (1 stroke event every 2.58 seconds; 1 death every 4.81 seconds globally).
- **Interactive Global Choropleth**: Multi-layer exploration by Incidence, Mortality, Prevalence, and DALYs across 204 countries.
- **India Stroke Intelligence Command**: Highlights 6 ICMR sentinel registries (Ludhiana, Varanasi, Kota, Cuttack, Cachar, Tirunelveli) and tracks the national ~31.5% hemorrhagic proportion.
- **StrokeSense AI**: Retrieved medical knowledge assistant answering questions with peer-reviewed Lancet and WSO citations, with automatic acute symptom emergency triage.
- **FAST Emergency Awareness Center**: Interactive Face, Arms, Speech, Time guide with a live "Time is Brain" neural loss counter (1.9M neurons destroyed per minute of untreated ischemia).
- **What-If? Scenario Predictor**: GBD Joint PAF mathematical forecasting engine modeling blood pressure, smoking, exercise, and air quality interventions through 2035 with 95% uncertainty intervals.

## Non-Negotiable Constraints & Disclaimers
1. **Non-Diagnostic Policy**: StrokeWatch AI does not diagnose individual conditions or calculate clinical personal probabilities.
2. **Estimated Baseline Transparency**: Continuous counters are explicitly disclosed as mathematical annual approximations, not real-time hospital intake feeds.
3. **Zero PHI Collection**: All risk assessments and scenario simulations operate strictly client-side. No private health information is retained.

## Platform & Stack
- **Platform**: Web (Responsive desktop 1440px+, tablet 768px, mobile 390px)
- **Framework**: Next.js 14 (App Router) + React 18 + TypeScript 5
- **Styling & Design System**: Tailwind CSS + Google Sans Flex variable font + Impeccable Design System
- **Deployment**: Vercel Git-integrated hosting
