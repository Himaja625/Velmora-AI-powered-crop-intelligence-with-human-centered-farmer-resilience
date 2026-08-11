import { r as createServerFn } from "./server-DGKc9AX82.mjs";
import { t as createServerRpc } from "./createServerRpc-C-9K6sCB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/weather-BCV5sPjX.js
/**
* WMO Weather interpretation codes (WW) helper.
*/
function interpretWmoCode(code) {
	if (code === 0) return {
		condition: "Clear sky",
		riskSummary: "Clear conditions."
	};
	if (code <= 3) return {
		condition: "Partly cloudy",
		riskSummary: "Mild cloud cover."
	};
	if (code === 45 || code === 48) return {
		condition: "Foggy",
		riskSummary: "High humidity and fog."
	};
	if (code >= 51 && code <= 57) return {
		condition: "Drizzle",
		riskSummary: "Light drizzle present."
	};
	if (code >= 61 && code <= 67) return {
		condition: "Rain active",
		riskSummary: "Rain active — high treatment wash-off risk."
	};
	if (code >= 71 && code <= 77) return {
		condition: "Snow",
		riskSummary: "Freezing conditions present."
	};
	if (code >= 80 && code <= 82) return {
		condition: "Rain showers",
		riskSummary: "Passing rain showers likely."
	};
	if (code >= 95) return {
		condition: "Thunderstorm",
		riskSummary: "Severe weather and thunderstorm risk."
	};
	return {
		condition: "Variable",
		riskSummary: "Unstable weather conditions."
	};
}
/**
* Resolve location text or approximate coordinates to lat/lon via Open-Meteo Geocoding API.
*/
async function geocodeLocation(locationStr) {
	const trimmed = locationStr.trim();
	const match = trimmed.match(/(-?\d+\.?\d*)[,\s]+(-?\d+\.?\d*)/);
	if (match && match[1] && match[2]) {
		const lat = parseFloat(match[1]);
		const lon = parseFloat(match[2]);
		if (!isNaN(lat) && !isNaN(lon) && Math.abs(lat) <= 90 && Math.abs(lon) <= 180) return {
			latitude: lat,
			longitude: lon,
			name: `Location (${lat.toFixed(2)}, ${lon.toFixed(2)})`
		};
	}
	const cleanName = trimmed.replace(/^Approximate area\s*/i, "").trim();
	if (cleanName.length < 2) return null;
	try {
		const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cleanName)}&count=1&language=en&format=json`;
		const res = await fetch(url);
		if (!res.ok) return null;
		const data = await res.json();
		if (data.results && data.results.length > 0) {
			const item = data.results[0];
			const placeName = [
				item.name,
				item.admin1,
				item.country
			].filter(Boolean).join(", ");
			return {
				latitude: item.latitude,
				longitude: item.longitude,
				name: placeName || item.name
			};
		}
	} catch (err) {
		console.error("Geocoding fetch failed:", err);
	}
	return null;
}
async function fetchOpenMeteoForecast(lat, lon) {
	try {
		const url = new URL("https://api.open-meteo.com/v1/forecast");
		url.searchParams.set("latitude", lat.toString());
		url.searchParams.set("longitude", lon.toString());
		url.searchParams.set("current", "temperature_2m,relative_humidity_2m,precipitation,rain,showers,wind_speed_10m,weather_code");
		url.searchParams.set("hourly", "temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,rain,showers,wind_speed_10m,weather_code");
		url.searchParams.set("forecast_days", "2");
		url.searchParams.set("wind_speed_unit", "kmh");
		url.searchParams.set("timezone", "auto");
		const res = await fetch(url.toString());
		if (!res.ok) return null;
		return await res.json();
	} catch (err) {
		console.error("Forecast fetch failed:", err);
		return null;
	}
}
function transformOpenMeteoToWeatherOutlook(locationDisplay, forecast) {
	const current = forecast.current;
	const hourly = forecast.hourly;
	const tempC = current ? Math.round(current.temperature_2m) : 25;
	const humidity = current ? Math.round(current.relative_humidity_2m) : 60;
	const windKph = current ? Math.round(current.wind_speed_10m) : 10;
	const currentPrecip = current ? current.precipitation ?? 0 : 0;
	const { condition } = interpretWmoCode(current ? current.weather_code : 0);
	let startIndex = 0;
	if (hourly && hourly.time && hourly.time.length > 0) {
		const nowIso = (/* @__PURE__ */ new Date()).toISOString().slice(0, 13);
		const foundIdx = hourly.time.findIndex((t) => t.startsWith(nowIso));
		if (foundIdx >= 0) startIndex = foundIdx;
	}
	const intervalOffsets = [
		0,
		2,
		4,
		6,
		9,
		12
	];
	const intervalLabels = [
		"Now",
		"+2h",
		"+4h",
		"+6h",
		"+9h",
		"+12h"
	];
	const hourlyItems = [];
	for (let i = 0; i < intervalOffsets.length; i++) {
		const idx = startIndex + intervalOffsets[i];
		const rainProb = hourly && hourly.precipitation_probability && hourly.precipitation_probability[idx] != null ? Math.round(hourly.precipitation_probability[idx]) : 0;
		const { condition: hourCondition } = interpretWmoCode(hourly && hourly.weather_code && hourly.weather_code[idx] != null ? hourly.weather_code[idx] : 0);
		hourlyItems.push({
			label: intervalLabels[i],
			rainChance: rainProb,
			condition: hourCondition
		});
	}
	const nextRainProbabilities = [];
	for (let idx = startIndex; idx < startIndex + 6; idx++) if (hourly && hourly.precipitation_probability && hourly.precipitation_probability[idx] != null) nextRainProbabilities.push(hourly.precipitation_probability[idx]);
	const maxRainChanceNearTerm = nextRainProbabilities.length > 0 ? Math.max(...nextRainProbabilities) : hourlyItems[0]?.rainChance ?? 0;
	const rainSoon = maxRainChanceNearTerm >= 40 || currentPrecip > 0;
	const risks = [];
	if (rainSoon) {
		risks.push(`High rain chance (${Math.round(maxRainChanceNearTerm)}%) over the next several hours increases treatment wash-off risk.`);
		risks.push("Extended leaf wetness favours fungal spore germination and spread.");
	} else risks.push("Foliage expected to stay dry, allowing spray treatments time to adhere properly.");
	if (windKph >= 20) risks.push(`Elevated wind speed (${windKph} km/h) may cause spray drift and uneven application.`);
	else risks.push(`Breeze is calm (${windKph} km/h), supporting low-drift spraying conditions.`);
	if (tempC >= 32) risks.push(`High temperature (${tempC}°C) increases liquid evaporation rate on leaves.`);
	return {
		location: locationDisplay,
		summary: rainSoon ? `${condition}. Rain expected nearby (peak ${Math.round(maxRainChanceNearTerm)}% chance in upcoming hours).` : `${condition} with ${tempC}°C and ${windKph} km/h wind. Low immediate rain risk (${Math.round(maxRainChanceNearTerm)}% max).`,
		temperatureC: tempC,
		humidityPercent: humidity,
		windKph,
		rainChancePercent: Math.round(maxRainChanceNearTerm),
		risks,
		hourly: hourlyItems
	};
}
var fetchWeatherServerFn_createServerFn_handler = createServerRpc({
	id: "9a495fc54678410630e7b724ff9a1b70c6948dbfb0b94565527e4d1704ddc1e0",
	name: "fetchWeatherServerFn",
	filename: "src/lib/velmora/weather.ts"
}, (opts) => fetchWeatherServerFn.__executeServer(opts));
var fetchWeatherServerFn = createServerFn({ method: "GET" }).validator((data) => data).handler(fetchWeatherServerFn_createServerFn_handler, async ({ data }) => {
	try {
		let lat = data.latitude;
		let lon = data.longitude;
		let displayLocation = data.location;
		if (lat == null || lon == null) {
			const geo = await geocodeLocation(data.location);
			if (!geo) return {
				success: false,
				error: "Location could not be resolved."
			};
			lat = geo.latitude;
			lon = geo.longitude;
			displayLocation = geo.name;
		}
		const forecast = await fetchOpenMeteoForecast(lat, lon);
		if (!forecast) return {
			success: false,
			error: "Forecast data could not be retrieved from Open-Meteo."
		};
		return {
			success: true,
			weather: transformOpenMeteoToWeatherOutlook(displayLocation, forecast),
			hourlyPrecipProbs: forecast.hourly?.precipitation_probability || [],
			hourlyWinds: forecast.hourly?.wind_speed_10m || [],
			coordinates: {
				latitude: lat,
				longitude: lon
			}
		};
	} catch (err) {
		console.error("Error in fetchWeatherServerFn:", err);
		return {
			success: false,
			error: String(err)
		};
	}
});
//#endregion
export { fetchWeatherServerFn_createServerFn_handler };
