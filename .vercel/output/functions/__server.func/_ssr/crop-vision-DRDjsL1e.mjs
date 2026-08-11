import { r as createServerFn } from "./server-DGKc9AX82.mjs";
import { a as objectType, i as numberType, n as booleanType, o as stringType, r as enumType, t as arrayType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-C-9K6sCB.mjs";
import { n as Type, t as GoogleGenAI } from "../_libs/@google/genai.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/crop-vision-DRDjsL1e.js
var GeminiCropAnalysisSchema = objectType({
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
function buildPromptText(cropType) {
	return `
You are an expert agricultural AI assistant providing non-clinical crop intelligence to farmers.
The farmer has submitted a photo of a plant/leaf along with the specified crop type: "${cropType}".

Analyze the image carefully and return a structured JSON response following these strict guidelines:

1. DIAGNOSIS SAFETY & NON-CLINICAL PHRASING:
   - Do NOT claim a definitive diagnosis. Always use non-clinical, supportive phrasing such as "likely", "possible", or "consistent with".
   - If the photo does NOT clearly depict a plant, leaf, or agricultural crop (e.g. it is a person, building, animal, vehicle, or non-plant object):
     - Set "isPlantImage": false
     - Set "likelyIssue": "Unable to identify a crop condition"
     - Set "confidence": 15
     - Set "severity": "uncertain"
     - Set "needsExpertConfirmation": true
     - Set "summary": "The uploaded photo does not appear to show a crop leaf requiring plant health diagnosis."
     - Provide 2-3 brief observations explaining what is visible.
   - If the image IS a plant/leaf, but is too dark, blurry, out of focus, or damaged for reliable diagnosis:
     - Clearly state in "summary" and "observations" that the photo quality restricts reliable analysis.
     - Set "confidence" below 50.
     - Set "needsExpertConfirmation": true.

2. AGRICULTURAL TREATMENT SAFETY:
   - Do NOT invent specific chemical pesticide brand names, exact chemical formulations, hazardous concentration ratios, or dangerous application rates.
   - Keep treatment guidance general, safe, and practical (e.g., removing severely damaged lower foliage, improving canopy airflow, avoiding unnecessary overhead watering, rotating treatment types).
   - Instruct the farmer to confirm product selection, dosage, and local regulations with a qualified local agricultural extension officer.

3. STRUCTURED DATA FIELDS:
   - "likelyIssue": Concise issue title (e.g., "Likely Early Blight", "Possible Fungal Leaf Spot").
   - "confidence": Integer from 0 to 100 representing pattern match certainty.
   - "summary": 1-2 sentence overview of observed leaf health.
   - "observations": Array of 3-4 bullet points describing visible symptoms (lesion pattern, chlorosis, location on leaf/canopy).
   - "nextSteps": Array of 3-4 practical cultural or agronomic actions the farmer can take.
   - "treatmentGuidance": Array of 2-3 safe treatment timing, resistance management, or extension officer guidelines.
   - "severity": One of "low", "moderate", "high", or "uncertain".
   - "isPlantImage": boolean.
   - "needsExpertConfirmation": boolean.
`;
}
/**
* Server Function: Performs server-side Gemini Vision image analysis.
* Accesses `process.env.GEMINI_API_KEY` securely without exposing it to the client.
*/
var analyzeCropImageServerFn_createServerFn_handler = createServerRpc({
	id: "9eb927ef849c6a4ccc4270c7eb454c246ba8d012730b5ad40e4a6723ce3a2a8a",
	name: "analyzeCropImageServerFn",
	filename: "src/lib/velmora/crop-vision.ts"
}, (opts) => analyzeCropImageServerFn.__executeServer(opts));
var analyzeCropImageServerFn = createServerFn({ method: "POST" }).validator((data) => data).handler(analyzeCropImageServerFn_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env["GEMINI_API_KEY"];
	if (!apiKey) return {
		success: false,
		error: "GEMINI_API_KEY environment variable is not configured on the server."
	};
	try {
		const match = data.imageDataUrl.match(/^data:(image\/\w+);base64,(.+)$/);
		if (!match || !match[1] || !match[2]) return {
			success: false,
			error: "Invalid or unsupported image data format."
		};
		const mimeType = match[1];
		const base64Data = match[2];
		const text = (await new GoogleGenAI({ apiKey }).models.generateContent({
			model: "gemini-3.6-flash",
			contents: [{ inlineData: {
				mimeType,
				data: base64Data
			} }, buildPromptText(data.cropType)],
			config: {
				responseMimeType: "application/json",
				responseSchema: {
					type: Type.OBJECT,
					properties: {
						likelyIssue: { type: Type.STRING },
						confidence: { type: Type.NUMBER },
						summary: { type: Type.STRING },
						observations: {
							type: Type.ARRAY,
							items: { type: Type.STRING }
						},
						nextSteps: {
							type: Type.ARRAY,
							items: { type: Type.STRING }
						},
						treatmentGuidance: {
							type: Type.ARRAY,
							items: { type: Type.STRING }
						},
						severity: {
							type: Type.STRING,
							enum: [
								"low",
								"moderate",
								"high",
								"uncertain"
							]
						},
						isPlantImage: { type: Type.BOOLEAN },
						needsExpertConfirmation: { type: Type.BOOLEAN }
					},
					required: [
						"likelyIssue",
						"confidence",
						"summary",
						"observations",
						"nextSteps",
						"treatmentGuidance",
						"severity",
						"isPlantImage",
						"needsExpertConfirmation"
					]
				}
			}
		})).text;
		if (!text) return {
			success: false,
			error: "Gemini Vision returned an empty response."
		};
		const parsedJson = JSON.parse(text);
		const validated = GeminiCropAnalysisSchema.safeParse(parsedJson);
		if (!validated.success) {
			console.error("Gemini response schema validation failed:", validated.error);
			return {
				success: false,
				error: "Gemini output failed schema validation."
			};
		}
		const visionData = validated.data;
		const healthStatus = !visionData.isPlantImage ? "watch" : visionData.severity === "high" || visionData.severity === "moderate" ? "action-needed" : "watch";
		return {
			success: true,
			cropAnalysis: {
				likelyIssue: visionData.likelyIssue,
				cropType: data.cropType,
				confidence: Math.min(100, Math.max(0, Math.round(visionData.confidence))),
				healthStatus,
				healthSummary: visionData.summary,
				observations: visionData.observations,
				nextSteps: visionData.nextSteps,
				treatmentGuidance: visionData.treatmentGuidance,
				isPlantImage: visionData.isPlantImage,
				severity: visionData.severity
			}
		};
	} catch (err) {
		console.error("Error calling Gemini Vision API:", err);
		return {
			success: false,
			error: String(err)
		};
	}
});
//#endregion
export { analyzeCropImageServerFn_createServerFn_handler };
