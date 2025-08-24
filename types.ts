
export interface AnalysisResult {
  diagnosis: string;
  confidence: number;
}

export enum AppStatus {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  RESULT = 'RESULT',
  ERROR = 'ERROR',
}
