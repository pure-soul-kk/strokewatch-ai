import { NextResponse } from 'next/server';
import { COUNTRY_DATASET, GLOBAL_METRICS } from '@/data/global-stroke-stats';
import { INDIA_REGISTRIES } from '@/data/india-registry-data';
import { RISK_FACTORS } from '@/data/risk-factors';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type') || 'countries';

  if (type === 'countries') {
    return NextResponse.json({
      metadata: {
        exportedAt: new Date().toISOString(),
        dataset: 'GBD 2021 & WHO Global Stroke Surveillance',
        count: COUNTRY_DATASET.length
      },
      data: COUNTRY_DATASET
    });
  }

  if (type === 'india') {
    return NextResponse.json({
      metadata: {
        exportedAt: new Date().toISOString(),
        dataset: 'ICMR-NCDIR Stroke Registry Surveillance',
        count: INDIA_REGISTRIES.length
      },
      data: INDIA_REGISTRIES
    });
  }

  if (type === 'risks') {
    return NextResponse.json({
      metadata: {
        exportedAt: new Date().toISOString(),
        dataset: 'GBD Population Attributable Fraction Risk Profile',
        count: RISK_FACTORS.length
      },
      data: RISK_FACTORS
    });
  }

  return NextResponse.json({
    metrics: GLOBAL_METRICS,
    countries: COUNTRY_DATASET,
    indiaRegistries: INDIA_REGISTRIES
  });
}
