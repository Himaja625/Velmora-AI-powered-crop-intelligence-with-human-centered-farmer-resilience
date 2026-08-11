/**
 * Shared Velmora domain types.
 *
 * These shapes are intentionally the same ones a real backend would return, so
 * the demo generators in this folder can later be swapped for:
 *  - a crop/leaf image analysis model  -> CropAnalysis
 *  - a live weather API                -> WeatherOutlook
 *  - an LLM API                        -> conversation replies
 *  - a database of anonymous reports    -> CommunitySignal / CommunityPost
 */

export type ScanSubmission = {
  imageDataUrl: string;
  imageName: string;
  cropType: string;
  location: string;
  locationSource: "manual" | "device";
  submittedAt: string;
};

export type CropAnalysis = {
  likelyIssue: string;
  cropType: string;
  confidence: number;
  healthStatus: "healthy" | "watch" | "action-needed";
  healthSummary: string;
  observations: string[];
  nextSteps: string[];
  treatmentGuidance: string[];
  isPlantImage?: boolean;
  severity?: "low" | "moderate" | "high" | "uncertain";
};

export type WeatherOutlook = {
  location: string;
  summary: string;
  temperatureC: number;
  humidityPercent: number;
  windKph: number;
  rainChancePercent: number;
  risks: string[];
  hourly: { label: string; rainChance: number; condition: string }[];
};

export type ActionWindow = {
  label: string;
  timing: string;
  status: "wait" | "go" | "caution";
  reasoning: string[];
};

export type Advisory = {
  analysis: CropAnalysis;
  weather: WeatherOutlook;
  actionWindow: ActionWindow;
  generatedAt: string;
  isDemoData: boolean;
  isDemoAnalysis?: boolean;
  weatherNote?: string;
  visionNote?: string;
};
