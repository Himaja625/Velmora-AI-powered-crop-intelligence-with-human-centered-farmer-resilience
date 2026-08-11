import { i as getServerFnById, r as createServerFn, t as TSS_SERVER_FUNCTION } from "./server-DGKc9AX82.mjs";
import { a as objectType, i as numberType, n as booleanType, o as stringType, r as enumType, t as arrayType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scan-store-B5NyFMSu.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
objectType({
	likelyIssue: stringType(),
	confidence: numberType().min(0).max(100),
	summary: stringType(),
	observations: arrayType(stringType()),
	nextSteps: arrayType(stringType()),
	treatmentGuidance: arrayType(stringType()),
	severity: enumType([
		"low",
		"moderate",
		"high",
		"uncertain"
	]),
	isPlantImage: booleanType(),
	needsExpertConfirmation: booleanType()
});
/**
* Server Function: Performs server-side Gemini Vision image analysis.
* Accesses `process.env.GEMINI_API_KEY` securely without exposing it to the client.
*/
var analyzeCropImageServerFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("9eb927ef849c6a4ccc4270c7eb454c246ba8d012730b5ad40e4a6723ce3a2a8a"));
/**
* Calculate weather-aware Action Window based on real weather forecast.
*/
function buildRealActionWindow(weather, analysis, hourlyPrecipProbs = [], hourlyWinds = []) {
	const currentRainProb = weather.rainChancePercent;
	const currentWind = weather.windKph;
	const currentTemp = weather.temperatureC;
	const nearTermProbs = hourlyPrecipProbs.length > 0 ? hourlyPrecipProbs.slice(0, 6) : [];
	const maxRainProbNearTerm = nearTermProbs.length > 0 ? Math.max(...nearTermProbs) : currentRainProb;
	if (maxRainProbNearTerm >= 45) {
		const suitableOffset = hourlyPrecipProbs.findIndex((p, idx) => idx >= 4 && p < 30);
		return {
			label: "Wait before applying treatment",
			timing: suitableOffset > -1 ? `Best window: in approx. +${suitableOffset} hours after rain passes and leaves dry` : "Best window: Tomorrow morning, after leaves dry completely",
			status: "wait",
			reasoning: [
				`${analysis.likelyIssue || "Crop treatments"} require dry foliage for several hours after application to work effectively.`,
				`Near-term rain probability reaches ${Math.round(maxRainProbNearTerm)}%, posing a high risk of washing off treatment.`,
				"Leaf removal and canopy airflow work can still be done now as rain does not affect manual work.",
				"Note: Weather window guides application timing only; confirm product choice and dosage with local extension officers."
			]
		};
	}
	if (currentWind >= 22) return {
		label: "Exercise caution — high wind",
		timing: "Best window: Early morning or late evening when wind calms (<15 km/h)",
		status: "caution",
		reasoning: [
			`Current wind speed is ${currentWind} km/h, which increases spray drift risk onto non-target areas.`,
			`Rain chance stays manageable (${Math.round(maxRainProbNearTerm)}%), but wind reduces spraying efficiency.`,
			"Wait for calmer winds before applying liquid foliage treatments.",
			"Note: Weather window guides application timing only; confirm product choice with local extension officers."
		]
	};
	if (currentTemp >= 34) return {
		label: "Suitable with heat caution",
		timing: "Best window: Late afternoon or early morning to avoid peak midday heat",
		status: "caution",
		reasoning: [
			`High temperature (${currentTemp}°C) can increase droplet evaporation or leaf stress during treatment.`,
			`Rain chance is low (${Math.round(maxRainProbNearTerm)}%) and wind is calm (${currentWind} km/h).`,
			"Apply during cooler morning or evening hours.",
			"Note: Weather window guides application timing only; confirm product choice with local extension officers."
		]
	};
	return {
		label: "Conditions are suitable to act",
		timing: "Best window: Within the next 4 to 6 hours before evening",
		status: "go",
		reasoning: [
			`Foliage is expected to stay dry with rain chance under ${Math.round(maxRainProbNearTerm)}% over the next 6 hours.`,
			`Wind speed (${currentWind} km/h) supports even coverage with low spray drift risk.`,
			"Re-check affected plants after 48 hours to confirm condition is not spreading.",
			"Note: Weather window guides application timing only; confirm product choice with local extension officers."
		]
	};
}
/**
* Server Function: Fetches real weather from Open-Meteo on the server side.
*/
var fetchWeatherServerFn = createServerFn({ method: "GET" }).validator((data) => data).handler(createSsrRpc("9a495fc54678410630e7b724ff9a1b70c6948dbfb0b94565527e4d1704ddc1e0"));
/**
* DEMO & PRODUCTION ADVISORY ENGINE — combines Gemini Vision and Open-Meteo Weather.
*
* `buildAdvisoryWithWeather` fetches live crop image analysis via Gemini Vision
* and live weather signals via Open-Meteo server functions.
* `buildDemoAdvisory` remains as the deterministic offline fallback.
*/
var CROP_TYPES = [
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
	"Other"
];
function hash(input) {
	let h = 0;
	for (let i = 0; i < input.length; i += 1) h = (h * 31 + input.charCodeAt(i)) % 100003;
	return h;
}
var ISSUE_LIBRARY = {
	Tomato: {
		likelyIssue: "Tomato Early Blight",
		healthStatus: "action-needed",
		healthSummary: "Moderate leaf damage on lower canopy, upper growth still developing normally.",
		observations: [
			"Dark concentric lesions on older, lower leaves.",
			"Yellowing spreading outward from lesion edges.",
			"Damage concentrated where airflow is likely restricted."
		],
		nextSteps: [
			"Remove severely affected leaves and take them out of the field.",
			"Improve air circulation by thinning dense lower growth.",
			"Avoid unnecessary overhead watering; water at the base early in the day.",
			"Follow locally appropriate agricultural treatment guidance before spraying."
		],
		treatmentGuidance: [
			"Protective treatments work best applied to dry foliage that stays dry for several hours.",
			"Rotate active ingredients across applications to reduce resistance build-up.",
			"Confirm product choice and dosage with your local agricultural extension officer."
		]
	},
	Default: {
		likelyIssue: "Leaf stress with possible fungal involvement",
		healthStatus: "watch",
		healthSummary: "Visible stress on part of the canopy; overall plant structure appears intact.",
		observations: [
			"Discolouration and patchy leaf margins in the observed area.",
			"Pattern is uneven across the canopy rather than uniform.",
			"Condition consistent with moisture-related leaf stress."
		],
		nextSteps: [
			"Mark the affected patch and re-check the same plants in 48 hours.",
			"Remove clearly damaged leaves to slow spread.",
			"Reduce leaf wetness duration where irrigation allows.",
			"Follow locally appropriate agricultural treatment guidance."
		],
		treatmentGuidance: [
			"Hold off on broad spraying until the pattern is confirmed over two observations.",
			"Keep a photo record so change over time can be compared.",
			"Confirm any product use with your local agricultural extension officer."
		]
	}
};
function buildWeather(location, seed) {
	const rainSoon = seed % 3 !== 0;
	const rainChance = rainSoon ? 60 + seed % 30 : 12 + seed % 18;
	return {
		location,
		summary: rainSoon ? "Humid and overcast. Rain expected within the next several hours." : "Mostly clear with light breeze. No rain expected through the evening.",
		temperatureC: 24 + seed % 8,
		humidityPercent: rainSoon ? 78 + seed % 12 : 48 + seed % 15,
		windKph: 6 + seed % 12,
		rainChancePercent: rainChance,
		risks: rainSoon ? [
			"Rainfall likely to wash off treatment applied in the next few hours.",
			"Extended leaf wetness favours fungal spread overnight.",
			"Soft soil may make in-field movement damaging to roots."
		] : ["Low humidity may increase plant water stress by midday.", "Breeze can cause spray drift during the afternoon."],
		hourly: [
			"Now",
			"+2h",
			"+4h",
			"+6h",
			"+9h",
			"+12h"
		].map((label, index) => {
			const value = rainSoon ? Math.max(8, Math.min(95, rainChance - index * 9 + (seed + index) % 10)) : Math.max(4, Math.min(45, rainChance + index * 3 - (seed + index) % 7));
			return {
				label,
				rainChance: value,
				condition: value > 55 ? "Rain likely" : value > 30 ? "Cloudy" : "Clear"
			};
		})
	};
}
function buildActionWindow(weather, analysis) {
	if (weather.rainChancePercent >= 50) return {
		label: "Wait before applying treatment",
		timing: "Best window: tomorrow morning, after leaves dry",
		status: "wait",
		reasoning: [
			`${analysis.likelyIssue} responds to protective treatment only when foliage stays dry after application.`,
			`Rain chance is ${weather.rainChancePercent}% within the next few hours, so treatment would likely wash off.`,
			"Leaf removal and airflow work can be done now — they are not affected by rain."
		]
	};
	return {
		label: "Conditions are suitable to act",
		timing: "Best window: within the next 4 hours, before wind picks up",
		status: "go",
		reasoning: [
			`Dry foliage and ${weather.windKph} km/h wind support even, low-drift application.`,
			`Rain chance stays near ${weather.rainChancePercent}%, so treatment has time to settle.`,
			"Re-check the same plants after 48 hours to confirm the pattern is not spreading."
		]
	};
}
function buildDemoAdvisory(submission) {
	const seed = hash(`${submission.cropType}|${submission.location}`);
	const analysis = {
		...ISSUE_LIBRARY[submission.cropType] ?? ISSUE_LIBRARY["Default"],
		cropType: submission.cropType,
		confidence: 72 + seed % 20
	};
	const weather = buildWeather(submission.location, seed);
	return {
		analysis,
		weather,
		actionWindow: buildActionWindow(weather, analysis),
		generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
		isDemoData: true,
		isDemoAnalysis: true
	};
}
async function buildAdvisoryWithWeather(submission) {
	const seed = hash(`${submission.cropType}|${submission.location}`);
	let analysis = {
		...ISSUE_LIBRARY[submission.cropType] ?? ISSUE_LIBRARY["Default"],
		cropType: submission.cropType,
		confidence: 72 + seed % 20
	};
	let isLiveVision = false;
	let visionNote;
	if (submission.imageDataUrl && submission.imageDataUrl.startsWith("data:image")) try {
		const visionResult = await analyzeCropImageServerFn({ data: {
			imageDataUrl: submission.imageDataUrl,
			cropType: submission.cropType
		} });
		if (visionResult.success && visionResult.cropAnalysis) {
			analysis = visionResult.cropAnalysis;
			isLiveVision = true;
		} else {
			console.warn("Gemini vision analysis fallback triggered:", visionResult.error);
			visionNote = "AI crop vision unavailable (missing GEMINI_API_KEY or offline); using demo analysis.";
		}
	} catch (err) {
		console.warn("Gemini vision analysis exception:", err);
		visionNote = "AI crop vision unavailable; using demo analysis.";
	}
	else visionNote = "No image data URL provided; using sample crop analysis.";
	let weather = buildWeather(submission.location, seed);
	let isLiveWeather = false;
	let weatherNote;
	let hourlyPrecipProbs = [];
	let hourlyWinds = [];
	try {
		let lat;
		let lon;
		const match = submission.location.match(/(-?\d+\.?\d*)[,\s]+(-?\d+\.?\d*)/);
		if (match && match[1] && match[2]) {
			lat = parseFloat(match[1]);
			lon = parseFloat(match[2]);
		}
		const weatherResult = await fetchWeatherServerFn({ data: {
			location: submission.location,
			...typeof lat === "number" && { latitude: lat },
			...typeof lon === "number" && { longitude: lon }
		} });
		if (weatherResult.success && weatherResult.weather) {
			weather = weatherResult.weather;
			isLiveWeather = true;
			hourlyPrecipProbs = weatherResult.hourlyPrecipProbs || [];
			hourlyWinds = weatherResult.hourlyWinds || [];
		} else weatherNote = "Live weather lookup unavailable for this location; displaying sample weather data.";
	} catch (err) {
		console.warn("Live weather lookup exception:", err);
		weatherNote = "Live weather lookup unavailable for this location; displaying sample weather data.";
	}
	const actionWindow = isLiveWeather ? buildRealActionWindow(weather, analysis, hourlyPrecipProbs, hourlyWinds) : buildActionWindow(weather, analysis);
	return {
		advisory: {
			analysis,
			weather,
			actionWindow,
			generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
			isDemoData: !isLiveWeather,
			isDemoAnalysis: !isLiveVision,
			...weatherNote !== void 0 && { weatherNote },
			...visionNote !== void 0 && { visionNote }
		},
		isLiveWeather,
		isLiveVision
	};
}
var SAMPLE_SUBMISSION = {
	imageDataUrl: "",
	imageName: "sample-tomato-leaf.jpg",
	cropType: "Tomato",
	location: "Nashik, Maharashtra",
	locationSource: "manual",
	submittedAt: (/* @__PURE__ */ new Date()).toISOString()
};
/**
* Session-scoped store for the current field scan and its advisory.
*
* Uses sessionStorage so a farmer can refresh the Advisory page without losing
* the scan, while nothing persists beyond the session. Swap for a database-backed
* record when accounts exist.
*/
var SCAN_KEY = "velmora:scan";
var ADVISORY_KEY = "velmora:advisory";
function read(key) {
	if (typeof window === "undefined") return null;
	try {
		const raw = window.sessionStorage.getItem(key);
		return raw ? JSON.parse(raw) : null;
	} catch {
		return null;
	}
}
function write(key, value) {
	if (typeof window === "undefined") return;
	try {
		window.sessionStorage.setItem(key, JSON.stringify(value));
	} catch {}
}
function saveScanSession(submission, advisory) {
	write(SCAN_KEY, submission);
	write(ADVISORY_KEY, advisory);
}
function loadScanSession() {
	return {
		submission: read(SCAN_KEY),
		advisory: read(ADVISORY_KEY)
	};
}
//#endregion
export { loadScanSession as a, buildDemoAdvisory as i, SAMPLE_SUBMISSION as n, saveScanSession as o, buildAdvisoryWithWeather as r, CROP_TYPES as t };
