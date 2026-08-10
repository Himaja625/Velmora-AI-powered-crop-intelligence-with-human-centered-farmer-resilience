import type { Advisory, CropAnalysis, ScanSubmission, WeatherOutlook, ActionWindow } from "./types";

/**
 * DEMO ADVISORY ENGINE — clearly labeled placeholder logic.
 *
 * No image model or weather API is connected yet, so nothing here inspects the
 * uploaded photo. Results are deterministic per crop + location so a demo is
 * repeatable. Replace `buildDemoAdvisory` with real calls when the crop-vision
 * model and weather provider are wired up.
 */

export const CROP_TYPES = [
  "Tomato",
  "Rice (Paddy)",
  "Wheat",
  "Maize",
  "Cotton",
  "Potato",
  "Chilli",
  "Groundnut",
  "Sugarcane",
  "Banana",
  "Other",
] as const;

function hash(input: string) {
  let h = 0;
  for (let i = 0; i < input.length; i += 1) h = (h * 31 + input.charCodeAt(i)) % 100003;
  return h;
}

const ISSUE_LIBRARY: Record<string, Omit<CropAnalysis, "cropType" | "confidence">> = {
  Tomato: {
    likelyIssue: "Tomato Early Blight",
    healthStatus: "action-needed",
    healthSummary: "Moderate leaf damage on lower canopy, upper growth still developing normally.",
    observations: [
      "Dark concentric lesions on older, lower leaves.",
      "Yellowing spreading outward from lesion edges.",
      "Damage concentrated where airflow is likely restricted.",
    ],
    nextSteps: [
      "Remove severely affected leaves and take them out of the field.",
      "Improve air circulation by thinning dense lower growth.",
      "Avoid unnecessary overhead watering; water at the base early in the day.",
      "Follow locally appropriate agricultural treatment guidance before spraying.",
    ],
    treatmentGuidance: [
      "Protective treatments work best applied to dry foliage that stays dry for several hours.",
      "Rotate active ingredients across applications to reduce resistance build-up.",
      "Confirm product choice and dosage with your local agricultural extension officer.",
    ],
  },
  Default: {
    likelyIssue: "Leaf stress with possible fungal involvement",
    healthStatus: "watch",
    healthSummary: "Visible stress on part of the canopy; overall plant structure appears intact.",
    observations: [
      "Discolouration and patchy leaf margins in the observed area.",
      "Pattern is uneven across the canopy rather than uniform.",
      "Condition consistent with moisture-related leaf stress.",
    ],
    nextSteps: [
      "Mark the affected patch and re-check the same plants in 48 hours.",
      "Remove clearly damaged leaves to slow spread.",
      "Reduce leaf wetness duration where irrigation allows.",
      "Follow locally appropriate agricultural treatment guidance.",
    ],
    treatmentGuidance: [
      "Hold off on broad spraying until the pattern is confirmed over two observations.",
      "Keep a photo record so change over time can be compared.",
      "Confirm any product use with your local agricultural extension officer.",
    ],
  },
};

function buildWeather(location: string, seed: number): WeatherOutlook {
  const rainSoon = seed % 3 !== 0;
  const rainChance = rainSoon ? 60 + (seed % 30) : 12 + (seed % 18);
  const hourlyLabels = ["Now", "+2h", "+4h", "+6h", "+9h", "+12h"];

  return {
    location,
    summary: rainSoon
      ? "Humid and overcast. Rain expected within the next several hours."
      : "Mostly clear with light breeze. No rain expected through the evening.",
    temperatureC: 24 + (seed % 8),
    humidityPercent: rainSoon ? 78 + (seed % 12) : 48 + (seed % 15),
    windKph: 6 + (seed % 12),
    rainChancePercent: rainChance,
    risks: rainSoon
      ? [
          "Rainfall likely to wash off treatment applied in the next few hours.",
          "Extended leaf wetness favours fungal spread overnight.",
          "Soft soil may make in-field movement damaging to roots.",
        ]
      : [
          "Low humidity may increase plant water stress by midday.",
          "Breeze can cause spray drift during the afternoon.",
        ],
    hourly: hourlyLabels.map((label, index) => {
      const value = rainSoon
        ? Math.max(8, Math.min(95, rainChance - index * 9 + ((seed + index) % 10)))
        : Math.max(4, Math.min(45, rainChance + index * 3 - ((seed + index) % 7)));
      return {
        label,
        rainChance: value,
        condition: value > 55 ? "Rain likely" : value > 30 ? "Cloudy" : "Clear",
      };
    }),
  };
}

function buildActionWindow(weather: WeatherOutlook, analysis: CropAnalysis): ActionWindow {
  const rainSoon = weather.rainChancePercent >= 50;

  if (rainSoon) {
    return {
      label: "Wait before applying treatment",
      timing: "Best window: tomorrow morning, after leaves dry",
      status: "wait",
      reasoning: [
        `${analysis.likelyIssue} responds to protective treatment only when foliage stays dry after application.`,
        `Rain chance is ${weather.rainChancePercent}% within the next few hours, so treatment would likely wash off.`,
        "Leaf removal and airflow work can be done now — they are not affected by rain.",
      ],
    };
  }

  return {
    label: "Conditions are suitable to act",
    timing: "Best window: within the next 4 hours, before wind picks up",
    status: "go",
    reasoning: [
      `Dry foliage and ${weather.windKph} km/h wind support even, low-drift application.`,
      `Rain chance stays near ${weather.rainChancePercent}%, so treatment has time to settle.`,
      "Re-check the same plants after 48 hours to confirm the pattern is not spreading.",
    ],
  };
}

export function buildDemoAdvisory(submission: ScanSubmission): Advisory {
  const seed = hash(`${submission.cropType}|${submission.location}`);
  const template = ISSUE_LIBRARY[submission.cropType] ?? ISSUE_LIBRARY["Default"]!;
  const analysis: CropAnalysis = {
    ...template,
    cropType: submission.cropType,
    confidence: 72 + (seed % 20),
  };
  const weather = buildWeather(submission.location, seed);

  return {
    analysis,
    weather,
    actionWindow: buildActionWindow(weather, analysis),
    generatedAt: new Date().toISOString(),
    isDemoData: true,
  };
}

export const SAMPLE_SUBMISSION: ScanSubmission = {
  imageDataUrl: "",
  imageName: "sample-tomato-leaf.jpg",
  cropType: "Tomato",
  location: "Nashik, Maharashtra",
  locationSource: "manual",
  submittedAt: new Date().toISOString(),
};
