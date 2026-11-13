---
name: StrokeWatch AI Design System
description: Bloomberg-grade medical intelligence command center with high-contrast precision and clinical warmth.
colors:
  bg-primary: "#080D18"
  bg-card: "#111B2D"
  bg-card-elevated: "#162238"
  border-subtle: "#1E293B"
  accent-cyan: "#22D3EE"
  accent-blue: "#3B82F6"
  accent-amber: "#F59E0B"
  accent-red: "#EF4444"
  accent-emerald: "#10B981"
  accent-purple: "#A855F7"
  text-primary: "#FFFFFF"
  text-secondary: "#CBD5E1"
  text-muted: "#94A3B8"
typography:
  display:
    fontFamily: "Google Sans Flex, sans-serif"
    fontWeight: 800
    letterSpacing: "-0.02em"
  heading:
    fontFamily: "Google Sans Flex, sans-serif"
    fontWeight: 700
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Google Sans Flex, -apple-system, sans-serif"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "-0.01em"
  numeric:
    fontFamily: "JetBrains Mono, monospace"
    fontWeight: 700
    letterSpacing: "-0.02em"
rounded:
  sm: "6px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.accent-cyan}"
    textColor: "#080D18"
    rounded: "{rounded.md}"
    padding: "10px 18px"
  button-emergency:
    backgroundColor: "{colors.accent-red}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
    padding: "10px 20px"
---

## Overview
StrokeWatch AI uses a high-density, low-fatigue command center visual language inspired by mission-critical financial analytics (Bloomberg) and acute neurovascular imaging consoles. The interface is optimized for rapid pattern recognition, continuous real-time data inspection, and immediate emergency triage comprehension.

## Colors
- **Ground (`#080D18`)**: Deep obsidian navy ground prevents eye strain during prolonged surveillance shifts.
- **Surface (`#111B2D`)**: Muted slate-blue card container with soft 12px blur backdrop filtering.
- **Electric Cyan (`#22D3EE`)**: Primary navigational accent, live metric ticks, and ischemic stroke indicators.
- **Deep Blue (`#3B82F6`)**: Secondary supportive indicators, prevalence benchmarks, and categorical grouping.
- **Critical Red (`#EF4444`)**: Acute stroke emergency protocols, hemorrhagic stroke proportion, and mortality statistics.
- **Alert Amber (`#F59E0B`)**: Disability-adjusted life years (DALYs), subarachnoid hemorrhage, and caution boundaries.
- **Clinical Emerald (`#10B981`)**: Modifiable risk prevention fractions and verified registry quality indicators.

## Typography
- **Primary Typeface**: `Google Sans Flex` (Variable font supporting weights 100 to 1000). Provides balanced glyphs for headings, clinical body copy, and UI controls.
- **Data & Measurement**: `JetBrains Mono` for all tabular data, time intervals, incidence rates, and Poisson counter tickers.
- **Rhythm**: Paragraph measures stay strictly between 60–75 characters. Headings always maintain greater top margin than bottom margin (`mt-6 mb-2`) to avoid orphaned section headings.

## Layout
- **Scaffold**: Collapsible 240px intelligence sidebar coupled with a high-density primary viewport.
- **Grid Structure**: 12-column responsive fluid grid with equal edge padding (16px on mobile, 32px on wide desktop displays).
- **One Section Per Screen**: Hero command panel and primary modules (Choropleth, India Command, What-If Lab) occupy calibrated viewport heights at 1440x900 without jarring multi-section visual collisions.

## Elevation & Depth
- **Soft Layering**: Cards declare depth via soft blurred offsets (`box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4)`) combined with subtle translucent borders (`border: 1px solid rgba(59, 130, 246, 0.15)`).
- **Restraint**: Zero-offset colored halos are restricted strictly to acute emergency alarms. Standard cards never use garish neon borders.

## Shapes
- **Card Radius**: Fixed at 16px (`rounded-2xl`) for primary panels and 12px (`rounded-xl`) for metric tiles.
- **Pills**: Reserved for status badges (`Modelled Estimate`, `PBSR`, `Verified Registry`) and filter chips.

## Components
- **Live Estimated Counter**: Multi-column tabular layout displaying continuous ticks with microsecond pulse feedback and mandatory disclosure badges.
- **Stroke Clock Widget**: Dual-cadence cyclical meter displaying event frequencies (1 stroke every 2.58s; 1 death every 4.81s) with session accumulator.
- **FAST Emergency Banner**: Persistent high-priority banner at screen top directing immediate 911 / 112 dispatch.
- **What-If Scenario Sliders**: Precision horizontal range controls with immediate reactive calculation of averted strokes and 95% uncertainty interval bands.

## Do's and Don'ts
### Do
- Always display the data provenance (e.g. GBD 2021, WHO, ICMR-NCDIR) alongside any statistic.
- Always include the mandatory non-real-time disclosure on continuous live counters.
- Use tabular numerals (`font-mono font-bold`) for all changing numbers to prevent layout jitter.
- Tint secondary and muted copy from the surface palette (`text-slate-300`, `text-slate-400`), never flat unstyled gray.

### Don't
- Never invent real-time hospital admission figures or fake patient names.
- Never use emojis as replacements for interface icons; use calibrated Lucide SVG vectors.
- Never use side-stripe borders (`border-left: 4px solid red`) on information cards.
- Never hide emergency dispatch contact numbers behind nested sub-menus.
