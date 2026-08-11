import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { c as Sprout, d as Send, r as Users, u as ShieldCheck, x as Info } from "../_libs/lucide-react.mjs";
import { n as Button, r as cn } from "./router-DqkL3bZ-.mjs";
import { n as CardContent, t as Card } from "./card-B43h9aVt.mjs";
import { i as COMMUNITY_SIGNAL } from "./community-DNXOxsXp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/talk-DjJY67wY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
var CROP_WORDS = [
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
	"onion"
];
var EMOTION_WORDS = [
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
	"cannot sleep"
];
var MONEY_WORDS = [
	"loan",
	"debt",
	"money",
	"income",
	"rate",
	"price",
	"cost",
	"bank",
	"credit",
	"sell"
];
var WEATHER_WORDS = [
	"rain",
	"hail",
	"drought",
	"heat",
	"flood",
	"wind",
	"storm",
	"monsoon",
	"dry"
];
var DISEASE_WORDS = [
	"spots",
	"lesion",
	"blight",
	"fungus",
	"yellow",
	"wilting",
	"pest",
	"insect",
	"rot",
	"curl"
];
var CRISIS_WORDS = [
	"end my life",
	"kill myself",
	"suicide",
	"no reason to live",
	"want to die",
	"harm myself"
];
var CRISIS_RESPONSE = "What you just wrote matters, and I don't want you to carry it alone. I'm an AI and I can't be the support you need for this — please reach out right now to someone you trust or a local emergency or crisis helpline in your area. If you are in immediate danger, contact local emergency services. I'm still here if you want to keep writing in the meantime.";
function has(text, words) {
	return words.filter((word) => text.includes(word));
}
function titleCase(word) {
	return word.charAt(0).toUpperCase() + word.slice(1);
}
function updateContext(previous, text) {
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
		turns: previous.turns + 1
	};
}
function isCrisisMessage(text) {
	const lower = text.toLowerCase();
	return CRISIS_WORDS.some((word) => lower.includes(word));
}
/**
* Demo reply generation. Reflects what the farmer actually said, keeps
* agricultural and emotional threads distinct, and asks one open question.
*/
function generateVelmoraReply(text, context) {
	if (isCrisisMessage(text)) return CRISIS_RESPONSE;
	const lower = text.toLowerCase();
	const emotions = has(lower, EMOTION_WORDS);
	const money = has(lower, MONEY_WORDS);
	const weather = has(lower, WEATHER_WORDS);
	const disease = has(lower, DISEASE_WORDS);
	const crop = context.mentionedCrops[0];
	const cropPhrase = crop ? `your ${crop.toLowerCase()}` : "your crop";
	const parts = [];
	if (emotions.length && money.length) parts.push(`When the field and the money are tied together, a bad patch stops being only about plants. Being ${emotions[0]} about that is a reasonable response, not a weakness.`);
	else if (emotions.length) parts.push(`That sounds heavy to be holding while still having to walk the field every day. You don't have to explain all of it at once.`);
	else if (money.length) parts.push(`Input costs and uncertain rates change what any field decision is really worth, so it makes sense you're weighing this carefully.`);
	if (disease.length) parts.push(`On what you're seeing on ${cropPhrase}: the pattern matters more than any single leaf. Where the marks start, whether they move upward, and how fast, all narrow the likely cause. A Field Scan with a clear photo, plus your location and weather, will give you a more specific read than guesswork.`);
	else if (weather.length) parts.push(`Weather is doing a lot of the deciding here. Even when the treatment is right, applying it just before rain usually wastes it — timing is often the part you still control.`);
	if (!parts.length) parts.push(`I'm following what you're describing. I'd rather understand your situation properly than give you a general answer.`);
	const questions = [
		disease.length ? "How much of the field is showing it — a few plants, one patch, or spreading across rows?" : null,
		weather.length && !disease.length ? "What has the weather done on your land over the last week?" : null,
		emotions.length ? "What has been the hardest part of the last few days?" : null,
		money.length && !emotions.length ? "What decision is in front of you right now?" : null,
		context.turns > 2 ? "Where would you like to take this next?" : null
	].filter(Boolean);
	parts.push(questions[0] ?? "Tell me what has happened so far, in whatever order it comes.");
	return parts.join(" ");
}
var CONVERSATION_STARTERS = [
	"My crop is failing and I'm scared because this is my income.",
	"There are dark spots on my tomato leaves and I don't know what it is.",
	"Rain ruined part of my harvest last week.",
	"I have too much to handle this season and no one to share it with."
];
var OPENING_MESSAGE = "I'm Velmora. You can tell me what's happening in your field, or what's sitting heavy on you — both are fine here. Where would you like to start?";
var MAX_LENGTH = 1200;
function TalkPage() {
	const [messages, setMessages] = (0, import_react.useState)([{
		id: "opening",
		role: "velmora",
		text: OPENING_MESSAGE,
		at: Date.now()
	}]);
	const [context, setContext] = (0, import_react.useState)({
		mentionedCrops: [],
		mentionedTopics: [],
		turns: 0
	});
	const [draft, setDraft] = (0, import_react.useState)("");
	const [thinking, setThinking] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const endRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		endRef.current?.scrollIntoView({
			block: "end",
			behavior: "smooth"
		});
	}, [messages, thinking]);
	function send(text) {
		const trimmed = text.trim();
		if (!trimmed) {
			setError("Write a few words about what is happening, and Velmora will respond.");
			return;
		}
		if (trimmed.length > MAX_LENGTH) {
			setError(`Please keep it under ${MAX_LENGTH} characters for now.`);
			return;
		}
		setError(null);
		const nextContext = updateContext(context, trimmed);
		setContext(nextContext);
		setMessages((prev) => [...prev, {
			id: `f-${Date.now()}`,
			role: "farmer",
			text: trimmed,
			at: Date.now()
		}]);
		setDraft("");
		setThinking(true);
		window.setTimeout(() => {
			setMessages((prev) => [...prev, {
				id: `v-${Date.now()}`,
				role: "velmora",
				text: generateVelmoraReply(trimmed, nextContext),
				at: Date.now()
			}]);
			setThinking(false);
		}, 750);
	}
	function onSubmit(event) {
		event.preventDefault();
		send(draft);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "max-w-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-semibold sm:text-4xl",
				children: "Talk to Velmora"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted-foreground",
				children: "Field questions and heavier things both belong here. Velmora responds to what you actually wrote — no scripts, no motivational filler."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "border-border/80",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex h-[34rem] flex-col p-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 space-y-4 overflow-y-auto p-5",
						role: "log",
						"aria-live": "polite",
						"aria-label": "Conversation with Velmora",
						children: [
							messages.map((message) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: message.role === "farmer" ? "flex justify-end" : "flex gap-3",
								children: [message.role === "velmora" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-leaf-soft text-leaf-deep",
									"aria-hidden": "true",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sprout, { className: "size-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${message.role === "farmer" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "sr-only",
										children: message.role === "farmer" ? "You said:" : "Velmora said:"
									}), message.text]
								})]
							}, message.id)),
							thinking && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "pl-11 text-sm text-muted-foreground",
								children: "Velmora is reading what you wrote…"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: endRef })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit,
						className: "border-t border-border p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "message",
								className: "text-sm font-medium",
								children: "Your message"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "message",
								value: draft,
								onChange: (event) => setDraft(event.target.value),
								onKeyDown: (event) => {
									if (event.key === "Enter" && !event.shiftKey) {
										event.preventDefault();
										send(draft);
									}
								},
								maxLength: MAX_LENGTH,
								rows: 3,
								placeholder: "Tell Velmora what is happening in your field, or what is weighing on you.",
								"aria-describedby": error ? "message-error" : "message-help",
								className: "mt-2 resize-none"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									id: "message-help",
									className: "min-w-0 text-xs text-muted-foreground",
									children: "Enter to send, Shift + Enter for a new line. This conversation stays in your browser."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "submit",
									disabled: thinking,
									className: "shrink-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, {
										className: "mr-1.5 size-4",
										"aria-hidden": "true"
									}), "Send"]
								})]
							}),
							error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								id: "message-error",
								role: "alert",
								className: "mt-2 text-sm text-destructive",
								children: error
							})
						]
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "border-border/80 bg-sand/60",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-sm font-semibold",
								children: "Not sure how to start?"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-3 space-y-2",
								children: CONVERSATION_STARTERS.map((starter) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => send(starter),
									className: "w-full rounded-lg border border-border bg-card px-3 py-2.5 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
									children: starter
								}) }, starter))
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "border-border/80",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "flex items-center gap-2 text-sm font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
										className: "size-4 text-leaf",
										"aria-hidden": "true"
									}), "You are not alone"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted-foreground",
									children: COMMUNITY_SIGNAL.supportive
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: COMMUNITY_SIGNAL.detail
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "sm",
									variant: "outline",
									className: "mt-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/community",
										children: "Open community rooms"
									})
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "border-border/80",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "flex items-center gap-2 text-sm font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
										className: "size-4 text-leaf",
										"aria-hidden": "true"
									}), "Field questions welcome too"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted-foreground",
									children: "For a specific symptom on a plant, a Field Scan gives Velmora the photo, location, and weather it needs to be precise."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "sm",
									variant: "outline",
									className: "mt-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/field-scan",
										children: "Scan my field"
									})
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex gap-2 rounded-lg border border-border bg-secondary/50 p-4 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
							className: "mt-0.5 size-4 shrink-0",
							"aria-hidden": "true"
						}), "Velmora is an AI support tool, not a person, a therapist, or a licensed agronomist. It does not diagnose health conditions. For urgent personal or agricultural situations, please contact qualified local help. In this prototype no language model is connected yet, so replies are generated by clearly labeled demo logic."]
					})
				]
			})]
		})]
	});
}
//#endregion
export { TalkPage as component };
