export interface LiveCounterConfig {
  id: string;
  name: string;
  annualIncidence: number; // annual cases
  annualDeaths: number; // annual fatalities
  perSecondIncidence: number;
  perSecondDeaths: number;
  intervalBetweenStrokesMs: number;
  intervalBetweenDeathsMs: number;
  dataSource: string;
  baselineYear: number;
}

export const COUNTER_CONFIGS: Record<string, LiveCounterConfig> = {
  global: {
    id: 'global',
    name: 'Global',
    annualIncidence: 12224000,
    annualDeaths: 6552000,
    perSecondIncidence: 12224000 / (365.25 * 86400),
    perSecondDeaths: 6552000 / (365.25 * 86400),
    intervalBetweenStrokesMs: (365.25 * 86400 * 1000) / 12224000, // ~2582 ms
    intervalBetweenDeathsMs: (365.25 * 86400 * 1000) / 6552000, // ~4816 ms
    dataSource: 'GBD 2021 Stroke Collaborators & World Stroke Organization (WSO 2023)',
    baselineYear: 2023
  },
  india: {
    id: 'india',
    name: 'India',
    annualIncidence: 1850000,
    annualDeaths: 720000,
    perSecondIncidence: 1850000 / (365.25 * 86400),
    perSecondDeaths: 720000 / (365.25 * 86400),
    intervalBetweenStrokesMs: (365.25 * 86400 * 1000) / 1850000, // ~17060 ms
    intervalBetweenDeathsMs: (365.25 * 86400 * 1000) / 720000, // ~43830 ms
    dataSource: 'ICMR-NCDIR Stroke Registry & GBD India Collaborators',
    baselineYear: 2023
  },
  china: {
    id: 'china',
    name: 'China',
    annualIncidence: 3940000,
    annualDeaths: 2190000,
    perSecondIncidence: 3940000 / (365.25 * 86400),
    perSecondDeaths: 2190000 / (365.25 * 86400),
    intervalBetweenStrokesMs: (365.25 * 86400 * 1000) / 3940000, // ~8010 ms
    intervalBetweenDeathsMs: (365.25 * 86400 * 1000) / 2190000, // ~14410 ms
    dataSource: 'National Center for Neurological Disorders & GBD China',
    baselineYear: 2023
  },
  usa: {
    id: 'usa',
    name: 'United States',
    annualIncidence: 795000,
    annualDeaths: 165000,
    perSecondIncidence: 795000 / (365.25 * 86400),
    perSecondDeaths: 165000 / (365.25 * 86400),
    intervalBetweenStrokesMs: (365.25 * 86400 * 1000) / 795000, // ~39700 ms
    intervalBetweenDeathsMs: (365.25 * 86400 * 1000) / 165000, // ~191200 ms
    dataSource: 'American Heart Association (AHA) Stroke Statistics 2024',
    baselineYear: 2023
  },
  uk: {
    id: 'uk',
    name: 'United Kingdom',
    annualIncidence: 100000,
    annualDeaths: 34000,
    perSecondIncidence: 100000 / (365.25 * 86400),
    perSecondDeaths: 34000 / (365.25 * 86400),
    intervalBetweenStrokesMs: (365.25 * 86400 * 1000) / 100000, // ~315600 ms
    intervalBetweenDeathsMs: (365.25 * 86400 * 1000) / 34000, // ~928100 ms
    dataSource: 'Sentinel Stroke National Audit Programme (SSNAP)',
    baselineYear: 2023
  }
};

/**
 * Calculates the elapsed strokes since the start of the current calendar year,
 * plus live elapsed milliseconds in current session.
 */
export function calculateYearToDateStrokes(configKey: string, now: Date = new Date()): {
  yearToDateStrokes: number;
  yearToDateDeaths: number;
  todayStrokes: number;
  todayDeaths: number;
} {
  const config = COUNTER_CONFIGS[configKey] || COUNTER_CONFIGS.global;
  
  // Start of current calendar year (UTC)
  const startOfYear = new Date(Date.UTC(now.getUTCFullYear(), 0, 1, 0, 0, 0));
  const secondsSinceYearStart = (now.getTime() - startOfYear.getTime()) / 1000;
  
  // Start of today (UTC)
  const startOfToday = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0));
  const secondsSinceTodayStart = (now.getTime() - startOfToday.getTime()) / 1000;

  return {
    yearToDateStrokes: Math.floor(secondsSinceYearStart * config.perSecondIncidence),
    yearToDateDeaths: Math.floor(secondsSinceYearStart * config.perSecondDeaths),
    todayStrokes: Math.floor(secondsSinceTodayStart * config.perSecondIncidence),
    todayDeaths: Math.floor(secondsSinceTodayStart * config.perSecondDeaths)
  };
}
