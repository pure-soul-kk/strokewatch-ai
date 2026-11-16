import { NextRequest, NextResponse } from 'next/server';
import { predictGistStrokeRisk, GistPredictionInput } from '@/lib/gist-ml-engine';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const input: GistPredictionInput = {
      age: Number(body.age ?? 55),
      gender: body.gender === 'Female' ? 'Female' : 'Male',
      hypertension: Boolean(body.hypertension),
      heartDisease: Boolean(body.heart_disease || body.heartDisease),
      everMarried: body.ever_married === 'No' ? 'No' : 'Yes',
      workType: body.work_type || 'Private',
      residenceType: body.residence_type === 'Rural' ? 'Rural' : 'Urban',
      avgGlucoseLevel: Number(body.avg_glucose_level ?? body.avgGlucoseLevel ?? 105.0),
      bmi: Number(body.bmi ?? 28.1),
      smokingStatus: body.smoking_status || body.smokingStatus || 'formerly smoked',
      modelChoice: body.model
    };

    const result = predictGistStrokeRisk(input);
    return NextResponse.json({ status: 'success', result });
  } catch (error: any) {
    console.error('Error in predict API:', error);
    return NextResponse.json(
      { status: 'error', message: error.message || 'Error computing prediction' },
      { status: 400 }
    );
  }
}
