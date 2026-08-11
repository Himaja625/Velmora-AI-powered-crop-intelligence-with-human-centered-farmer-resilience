import { createServerFn } from "@tanstack/react-start";

import type { ActionWindow, CropAnalysis, WeatherOutlook } from "./types";

/**
 * Real Weather Module using Open-Meteo APIs via TanStack Start Server Functions.
 *
 * Open-Meteo is a free, open-source weather API that requires no API key.
 * Geocoding: https://geocoding-api.open-meteo.com/v1/search
 * Forecast:  https://api.open-meteo.com/v1/forecast
 */

export type OpenMeteoForecastResponse = {
  latitude: number;
  longitude: number;
  timezone: string;
  current?: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    precipitation: number;
    rain: number;
    showers: number;
    wind_speed_10m: number;
    weather_code: number;
  };
  hourly?: {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    precipitation_probability: number[];
    precipitation: number[];
    rain: number[];
    showers: number[];
    wind_speed_10m: number[];
    weather_code: number[];
  };
};

export type OpenMeteoGeocodingResponse = {
  results?: Array<{
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    elevation?: number;
    feature_code?: string;
    country_code?: string;
    country?: string;
    admin1?: string;
    admin2?: string;
  }>;
};

/**
 * WMO Weather interpretation codes (WW) helper.
 */
function interpretWmoCode(code: number): { condition: string; riskSummary: string } {
  if (code === 0) return { condition: "Clear sky", riskSummary: "Clear conditions." };
  if (code <= 3) return { condition: "Partly cloudy", riskSummary: "Mild cloud cover." };
  if (code === 45 || code === 48) return { condition: "Foggy", riskSummary: "High humidity and fog." };
  if (code >= 51 && code <= 57) return { condition: "Drizzle", riskSummary: "Light drizzle present." };
  if (code >= 61 && code <= 67) return { condition: "Rain active", riskSummary: "Rain active — high treatment wash-off risk." };
  if (code >= 71 && code <= 77) return { condition: "Snow", riskSummary: "Freezing conditions present." };
  if (code >= 80 && code <= 82) return { condition: "Rain showers", riskSummary: "Passing rain showers likely." };
  if (code >= 95) return { condition: "Thunderstorm", riskSummary: "Severe weather and thunderstorm risk." };
  return { condition: "Variable", riskSummary: "Unstable weather conditions." };
}

/**
 * Resolve location text or approximate coordinates to lat/lon via Open-Meteo Geocoding API.
 */
export async function geocodeLocation(
  locationStr: string,
): Promise<{ latitude: number; longitude: number; name: string } | null> {
  const trimmed = locationStr.trim();

  // Check if string contains coordinates like "Approximate area 19.99, 73.78" or "19.99, 73.78"
  const match = trimmed.match(/(-?\d+\.?\d*)[,\s]+(-?\d+\.?\d*)/);
  if (match && match[1] && match[2]) {
    const lat = parseFloat(match[1]);
    const lon = parseFloat(match[2]);
    if (!isNaN(lat) && !isNaN(lon) && Math.abs(lat) <= 90 && Math.abs(lon) <= 180) {
      return { latitude: lat, longitude: lon, name: `Location (${lat.toFixed(2)}, ${lon.toFixed(2)})` };
    }
  }

  // Strip prefix words like "Approximate area"
  const cleanName = trimmed.replace(/^Approximate area\s*/i, "").trim();
  if (cleanName.length < 2) return null;

  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cleanName)}&count=1&language=en&format=json`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = (await res.json()) as OpenMeteoGeocodingResponse;

    if (data.results && data.results.length > 0) {
      const item = data.results[0];
      const placeName = [item.name, item.admin1, item.country].filter(Boolean).join(", ");
      return {
        latitude: item.latitude,
        longitude: item.longitude,
        name: placeName || item.name,
      };
    }
  } catch (err) {
    console.error("Geocoding fetch failed:", err);
  }

  return null;
}

/**
 * Fetch raw forecast data from Open-Meteo.
 */
export async function fetchOpenMeteoForecast(lat: number, lon: number): Promise<OpenMeteoForecastResponse | null> {
  try {
    const url = new URL("https://api.open-meteo.com/v1/forecast");
    url.searchParams.set("latitude", lat.toString());
    url.searchParams.set("longitude", lon.toString());
    url.searchParams.set(
      "current",
      "temperature_2m,relative_humidity_2m,precipitation,rain,showers,wind_speed_10m,weather_code",
    );
    url.searchParams.set(
      "hourly",
      "temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,rain,showers,wind_speed_10m,weather_code",
    );
    url.searchParams.set("forecast_days", "2");
    url.searchParams.set("wind_speed_unit", "kmh");
    url.searchParams.set("timezone", "auto");

    const res = await fetch(url.toString());
    if (!res.ok) return null;
    return (await res.json()) as OpenMeteoForecastResponse;
  } catch (err) {
    console.error("Forecast fetch failed:", err);
    return null;
  }
}

/**
 * Transform Open-Meteo API response to Velmora's WeatherOutlook shape.
 */
export function transformOpenMeteoToWeatherOutlook(
  locationDisplay: string,
  forecast: OpenMeteoForecastResponse,
): WeatherOutlook {
  const current = forecast.current;
  const hourly = forecast.hourly;

  const tempC = current ? Math.round(current.temperature_2m) : 25;
  const humidity = current ? Math.round(current.relative_humidity_2m) : 60;
  const windKph = current ? Math.round(current.wind_speed_10m) : 10;
  const currentPrecip = current ? current.precipitation ?? 0 : 0;
  const currentWmo = current ? current.weather_code : 0;
  const { condition } = interpretWmoCode(currentWmo);

  // Determine current hour index in hourly array
  let startIndex = 0;
  if (hourly && hourly.time && hourly.time.length > 0) {
    const nowIso = new Date().toISOString().slice(0, 13);
    const foundIdx = hourly.time.findIndex((t) => t.startsWith(nowIso));
    if (foundIdx >= 0) startIndex = foundIdx;
  }

  const intervalOffsets = [0, 2, 4, 6, 9, 12];
  const intervalLabels = ["Now", "+2h", "+4h", "+6h", "+9h", "+12h"];
  const hourlyItems: { label: string; rainChance: number; condition: string }[] = [];

  for (let i = 0; i < intervalOffsets.length; i++) {
    const idx = startIndex + intervalOffsets[i];
    const rainProb =
      hourly && hourly.precipitation_probability && hourly.precipitation_probability[idx] != null
        ? Math.round(hourly.precipitation_probability[idx])
        : 0;
    const wCode =
      hourly && hourly.weather_code && hourly.weather_code[idx] != null ? hourly.weather_code[idx] : 0;
    const { condition: hourCondition } = interpretWmoCode(wCode);

    hourlyItems.push({
      label: intervalLabels[i],
      rainChance: rainProb,
      condition: hourCondition,
    });
  }

  // Calculate near-term max rain chance (next 6 hours)
  const nextRainProbabilities: number[] = [];
  for (let idx = startIndex; idx < startIndex + 6; idx++) {
    if (hourly && hourly.precipitation_probability && hourly.precipitation_probability[idx] != null) {
      nextRainProbabilities.push(hourly.precipitation_probability[idx]);
    }
  }

  const maxRainChanceNearTerm =
    nextRainProbabilities.length > 0
      ? Math.max(...nextRainProbabilities)
      : (hourlyItems[0]?.rainChance ?? 0);

  const rainSoon = maxRainChanceNearTerm >= 40 || currentPrecip > 0;

  const risks: string[] = [];
  if (rainSoon) {
    risks.push(
      `High rain chance (${Math.round(maxRainChanceNearTerm)}%) over the next several hours increases treatment wash-off risk.`,
    );
    risks.push("Extended leaf wetness favours fungal spore germination and spread.");
  } else {
    risks.push("Foliage expected to stay dry, allowing spray treatments time to adhere properly.");
  }

  if (windKph >= 20) {
    risks.push(`Elevated wind speed (${windKph} km/h) may cause spray drift and uneven application.`);
  } else {
    risks.push(`Breeze is calm (${windKph} km/h), supporting low-drift spraying conditions.`);
  }

  if (tempC >= 32) {
    risks.push(`High temperature (${tempC}°C) increases liquid evaporation rate on leaves.`);
  }

  const summary = rainSoon
    ? `${condition}. Rain expected nearby (peak ${Math.round(maxRainChanceNearTerm)}% chance in upcoming hours).`
    : `${condition} with ${tempC}°C and ${windKph} km/h wind. Low immediate rain risk (${Math.round(maxRainChanceNearTerm)}% max).`;

  return {
    location: locationDisplay,
    summary,
    temperatureC: tempC,
    humidityPercent: humidity,
    windKph,
    rainChancePercent: Math.round(maxRainChanceNearTerm),
    risks,
    hourly: hourlyItems,
  };
}

/**
 * Calculate weather-aware Action Window based on real weather forecast.
 */
export function buildRealActionWindow(
  weather: WeatherOutlook,
  analysis: CropAnalysis,
  hourlyPrecipProbs: number[] = [],
  hourlyWinds: number[] = [],
): ActionWindow {
  const currentRainProb = weather.rainChancePercent;
  const currentWind = weather.windKph;
  const currentTemp = weather.temperatureC;

  const nearTermProbs = hourlyPrecipProbs.length > 0 ? hourlyPrecipProbs.slice(0, 6) : [];
  const maxRainProbNearTerm = nearTermProbs.length > 0 ? Math.max(...nearTermProbs) : currentRainProb;

  // Case 1: High Rain Risk (>= 45%)
  if (maxRainProbNearTerm >= 45) {
    const suitableOffset = hourlyPrecipProbs.findIndex((p, idx) => idx >= 4 && p < 30);
    const timing =
      suitableOffset > -1
        ? `Best window: in approx. +${suitableOffset} hours after rain passes and leaves dry`
        : "Best window: Tomorrow morning, after leaves dry completely";

    return {
      label: "Wait before applying treatment",
      timing,
      status: "wait",
      reasoning: [
        `${analysis.likelyIssue || "Crop treatments"} require dry foliage for several hours after application to work effectively.`,
        `Near-term rain probability reaches ${Math.round(maxRainProbNearTerm)}%, posing a high risk of washing off treatment.`,
        "Leaf removal and canopy airflow work can still be done now as rain does not affect manual work.",
        "Note: Weather window guides application timing only; confirm product choice and dosage with local extension officers.",
      ],
    };
  }

  // Case 2: High Wind (> 22 km/h)
  if (currentWind >= 22) {
    return {
      label: "Exercise caution — high wind",
      timing: "Best window: Early morning or late evening when wind calms (<15 km/h)",
      status: "caution",
      reasoning: [
        `Current wind speed is ${currentWind} km/h, which increases spray drift risk onto non-target areas.`,
        `Rain chance stays manageable (${Math.round(maxRainProbNearTerm)}%), but wind reduces spraying efficiency.`,
        "Wait for calmer winds before applying liquid foliage treatments.",
        "Note: Weather window guides application timing only; confirm product choice with local extension officers.",
      ],
    };
  }

  // Case 3: High Temperature (> 34°C)
  if (currentTemp >= 34) {
    return {
      label: "Suitable with heat caution",
      timing: "Best window: Late afternoon or early morning to avoid peak midday heat",
      status: "caution",
      reasoning: [
        `High temperature (${currentTemp}°C) can increase droplet evaporation or leaf stress during treatment.`,
        `Rain chance is low (${Math.round(maxRainProbNearTerm)}%) and wind is calm (${currentWind} km/h).`,
        "Apply during cooler morning or evening hours.",
        "Note: Weather window guides application timing only; confirm product choice with local extension officers.",
      ],
    };
  }

  // Case 4: Suitable Conditions
  return {
    label: "Conditions are suitable to act",
    timing: "Best window: Within the next 4 to 6 hours before evening",
    status: "go",
    reasoning: [
      `Foliage is expected to stay dry with rain chance under ${Math.round(maxRainProbNearTerm)}% over the next 6 hours.`,
      `Wind speed (${currentWind} km/h) supports even coverage with low spray drift risk.`,
      "Re-check affected plants after 48 hours to confirm condition is not spreading.",
      "Note: Weather window guides application timing only; confirm product choice with local extension officers.",
    ],
  };
}

/**
 * Server Function: Fetches real weather from Open-Meteo on the server side.
 */
export type FetchWeatherInput = {
  location: string;
  latitude?: number;
  longitude?: number;
};

export const fetchWeatherServerFn = createServerFn({ method: "GET" })
  .validator((data: FetchWeatherInput) => data)
  .handler(async ({ data }) => {
    try {
      let lat = data.latitude;
      let lon = data.longitude;
      let displayLocation = data.location;

      if (lat == null || lon == null) {
        const geo = await geocodeLocation(data.location);
        if (!geo) {
          return { success: false as const, error: "Location could not be resolved." };
        }
        lat = geo.latitude;
        lon = geo.longitude;
        displayLocation = geo.name;
      }

      const forecast = await fetchOpenMeteoForecast(lat, lon);
      if (!forecast) {
        return { success: false as const, error: "Forecast data could not be retrieved from Open-Meteo." };
      }

      const weatherOutlook = transformOpenMeteoToWeatherOutlook(displayLocation, forecast);
      const hourlyPrecipProbs = forecast.hourly?.precipitation_probability || [];
      const hourlyWinds = forecast.hourly?.wind_speed_10m || [];

      return {
        success: true as const,
        weather: weatherOutlook,
        hourlyPrecipProbs,
        hourlyWinds,
        coordinates: { latitude: lat, longitude: lon },
      };
    } catch (err) {
      console.error("Error in fetchWeatherServerFn:", err);
      return { success: false as const, error: String(err) };
    }
  });
