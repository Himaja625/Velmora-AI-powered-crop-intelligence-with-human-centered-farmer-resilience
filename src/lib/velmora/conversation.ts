/**
 * DEMO CONVERSATION ENGINE — clearly labeled placeholder for an LLM.
 *
 * No language model is connected yet. This module produces context-aware,
 * non-clichéd replies from the farmer's own words so the interaction pattern can
 * be demonstrated and reviewed. Replace `generateVelmoraReply` with a server-side
 * LLM call (system prompt: warm, non-clinical, agricultural context, never claims
 * to be human or a therapist) without changing the UI.
 */

export type ChatRole = "farmer" | "velmora";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
  at: number;
};

export type ConversationContext = {
  mentionedCrops: string[];
  mentionedTopics: string[];
  turns: number;
};

const CROP_WORDS = [
  "tomato",
  "rice",
  "paddy",
  "wheat",
  "maize",
  "cotton",
  "potato",
  "chilli",
  "groundnut",
  "sugarcane",
  "banana",
  "onion",
];

const EMOTION_WORDS = [
  "scared",
  "afraid",
  "fear",
  "worried",
  "worry",
  "anxious",
  "stress",
  "stressed",
  "overwhelmed",
  "tired",
  "exhausted",
  "alone",
  "lonely",
  "hopeless",
  "ashamed",
  "guilty",
  "angry",
  "cry",
  "sad",
  "can't sleep",
  "cannot sleep",
];

const MONEY_WORDS = ["loan", "debt", "money", "income", "rate", "price", "cost", "bank", "credit", "sell"];
const WEATHER_WORDS = ["rain", "hail", "drought", "heat", "flood", "wind", "storm", "monsoon", "dry"];
const DISEASE_WORDS = ["spots", "lesion", "blight", "fungus", "yellow", "wilting", "pest", "insect", "rot", "curl"];
const CRISIS_WORDS = ["end my life", "kill myself", "suicide", "no reason to live", "want to die", "harm myself"];

export const CRISIS_RESPONSE =
  "What you just wrote matters, and I don't want you to carry it alone. I'm an AI and I can't be the support you need for this — please reach out right now to someone you trust or a local emergency or crisis helpline in your area. If you are in immediate danger, contact local emergency services. I'm still here if you want to keep writing in the meantime.";

function has(text: string, words: string[]) {
  return words.filter((word) => text.includes(word));
}

function titleCase(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function updateContext(previous: ConversationContext, text: string): ConversationContext {
  const lower = text.toLowerCase();
  const crops = new Set(previous.mentionedCrops);
  has(lower, CROP_WORDS).forEach((crop) => crops.add(titleCase(crop)));

  const topics = new Set(previous.mentionedTopics);
  if (has(lower, MONEY_WORDS).length) topics.add("income pressure");
  if (has(lower, WEATHER_WORDS).length) topics.add("weather");
  if (has(lower, DISEASE_WORDS).length) topics.add("crop symptoms");
  if (has(lower, EMOTION_WORDS).length) topics.add("how this feels");

  return {
    mentionedCrops: [...crops],
    mentionedTopics: [...topics],
    turns: previous.turns + 1,
  };
}

export function isCrisisMessage(text: string) {
  const lower = text.toLowerCase();
  return CRISIS_WORDS.some((word) => lower.includes(word));
}

/**
 * Demo reply generation. Reflects what the farmer actually said, keeps
 * agricultural and emotional threads distinct, and asks one open question.
 */
export function generateVelmoraReply(text: string, context: ConversationContext): string {
  if (isCrisisMessage(text)) return CRISIS_RESPONSE;

  const lower = text.toLowerCase();
  const emotions = has(lower, EMOTION_WORDS);
  const money = has(lower, MONEY_WORDS);
  const weather = has(lower, WEATHER_WORDS);
  const disease = has(lower, DISEASE_WORDS);
  const crop = context.mentionedCrops[0];
  const cropPhrase = crop ? `your ${crop.toLowerCase()}` : "your crop";

  const parts: string[] = [];

  if (emotions.length && money.length) {
    parts.push(
      `When the field and the money are tied together, a bad patch stops being only about plants. Being ${emotions[0]} about that is a reasonable response, not a weakness.`,
    );
  } else if (emotions.length) {
    parts.push(
      `That sounds heavy to be holding while still having to walk the field every day. You don't have to explain all of it at once.`,
    );
  } else if (money.length) {
    parts.push(
      `Input costs and uncertain rates change what any field decision is really worth, so it makes sense you're weighing this carefully.`,
    );
  }

  if (disease.length) {
    parts.push(
      `On what you're seeing on ${cropPhrase}: the pattern matters more than any single leaf. Where the marks start, whether they move upward, and how fast, all narrow the likely cause. A Field Scan with a clear photo, plus your location and weather, will give you a more specific read than guesswork.`,
    );
  } else if (weather.length) {
    parts.push(
      `Weather is doing a lot of the deciding here. Even when the treatment is right, applying it just before rain usually wastes it — timing is often the part you still control.`,
    );
  }

  if (!parts.length) {
    parts.push(
      `I'm following what you're describing. I'd rather understand your situation properly than give you a general answer.`,
    );
  }

  const questions = [
    disease.length
      ? "How much of the field is showing it — a few plants, one patch, or spreading across rows?"
      : null,
    weather.length && !disease.length ? "What has the weather done on your land over the last week?" : null,
    emotions.length ? "What has been the hardest part of the last few days?" : null,
    money.length && !emotions.length ? "What decision is in front of you right now?" : null,
    context.turns > 2 ? "Where would you like to take this next?" : null,
  ].filter(Boolean) as string[];

  parts.push(questions[0] ?? "Tell me what has happened so far, in whatever order it comes.");

  return parts.join(" ");
}

export const CONVERSATION_STARTERS = [
  "My crop is failing and I'm scared because this is my income.",
  "There are dark spots on my tomato leaves and I don't know what it is.",
  "Rain ruined part of my harvest last week.",
  "I have too much to handle this season and no one to share it with.",
];

export const OPENING_MESSAGE =
  "I'm Velmora. You can tell me what's happening in your field, or what's sitting heavy on you — both are fine here. Where would you like to start?";
