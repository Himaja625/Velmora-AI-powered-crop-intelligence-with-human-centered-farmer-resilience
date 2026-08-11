import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { D as Compass, F as Camera, O as CloudSun, b as Leaf, m as MessageCircleHeart, r as Users, u as ShieldCheck } from "../_libs/lucide-react.mjs";
import { n as Button } from "./router-DqkL3bZ-.mjs";
import { n as CardContent, t as Card } from "./card-B43h9aVt.mjs";
import { i as COMMUNITY_SIGNAL } from "./community-DNXOxsXp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Br9gZAyl.js
var import_jsx_runtime = require_jsx_runtime();
var hero_field_default = "/assets/hero-field-DzMVZBD4.jpg";
var STEPS = [
	{
		icon: Camera,
		title: "Capture what you see",
		body: "Photograph the affected leaf or plant, add your crop and location. That is the whole input."
	},
	{
		icon: Compass,
		title: "Understand what it means",
		body: "Velmora explains the likely issue, what was observed, and how confident the read is."
	},
	{
		icon: CloudSun,
		title: "Act at the right time",
		body: "Current and upcoming weather decide the safe action window, so treatment is not wasted."
	}
];
var JOURNEY = [
	"Field condition",
	"AI analysis",
	"Crop guidance",
	"Weather check",
	"Safe action window"
];
function HomePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "relative overflow-hidden border-b border-border/70",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:py-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground uppercase",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, {
							className: "size-3.5 text-leaf",
							"aria-hidden": "true"
						}), "Farmer livelihood & climate resilience"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-5 text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-6xl",
						children: "From field signals to confident decisions."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-xl text-base text-muted-foreground sm:text-lg",
						children: "Velmora combines crop observations, location, weather, and AI-powered guidance to help farmers understand what is happening in their fields and decide what to do next."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/field-scan",
								children: "Scan My Field"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							variant: "outline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/talk",
								children: "Talk to Velmora"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-10 flex flex-wrap items-center gap-x-2 gap-y-2 text-xs font-medium text-muted-foreground",
						children: JOURNEY.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-md bg-secondary px-2.5 py-1 text-secondary-foreground",
								children: step
							}), index < JOURNEY.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								children: "→"
							})]
						}, step))
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-lift)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: hero_field_default,
							alt: "A farmer's hands holding a tomato leaf showing dark lesions, with crop rows and an overcast sky behind",
							width: 1600,
							height: 1104,
							className: "h-full w-full object-cover"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "absolute -bottom-6 left-4 right-4 border-border/80 bg-card/95 shadow-[var(--shadow-soft)] backdrop-blur sm:left-6 sm:right-auto sm:max-w-xs",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[0.7rem] font-semibold tracking-wide text-muted-foreground uppercase",
									children: "Action window"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1.5 font-display text-base font-semibold",
									children: "Wait until leaves are dry"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: "Rain expected within hours — treatment applied now would likely wash off."
								})
							]
						})
					})]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20",
			"aria-labelledby": "how-it-works",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "how-it-works",
					className: "text-2xl font-semibold sm:text-3xl",
					children: "Three steps, one clear decision"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-2xl text-muted-foreground",
					children: "Velmora is built around the moment a farmer notices something wrong and has to decide what to do about it today."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-8 grid gap-4 md:grid-cols-3",
					children: STEPS.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "h-full border-border/80",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid size-10 place-items-center rounded-xl bg-leaf-soft text-leaf-deep",
										"aria-hidden": "true",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(step.icon, { className: "size-5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs font-semibold tracking-wide text-muted-foreground uppercase",
										children: ["Step ", index + 1]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-4 text-lg font-semibold",
									children: step.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted-foreground",
									children: step.body
								})
							]
						})
					}) }, step.title))
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y border-border/70 bg-sand/60",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-6xl gap-6 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "border-border/80",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-sky",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircleHeart, {
									className: "size-5",
									"aria-hidden": "true"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-lg font-semibold text-foreground",
									children: "When the season gets heavy"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-muted-foreground",
								children: "Crop problems carry financial and personal weight. Velmora offers a private conversation where you can say what is actually going on and get a response that engages with it — not a script of wellness tips."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 rounded-lg border border-border bg-secondary/60 p-3 text-sm",
								children: "“Losing part of a crop can feel frightening when your livelihood depends on it. You don't have to explain everything at once.”"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "outline",
								className: "mt-5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/talk",
									children: "Talk to Velmora"
								})
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "border-border/80",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-leaf-deep",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
									className: "size-5",
									"aria-hidden": "true"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-lg font-semibold text-foreground",
									children: "You are not alone in this week"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-display text-xl leading-snug font-semibold",
								children: COMMUNITY_SIGNAL.headline
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs text-muted-foreground",
								children: COMMUNITY_SIGNAL.detail
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "mt-4 space-y-2 text-sm text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
										className: "mt-0.5 size-4 shrink-0 text-leaf",
										"aria-hidden": "true"
									}), "Anonymous identities, topic-based rooms, no private messaging or profiles."]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
										className: "mt-0.5 size-4 shrink-0 text-leaf",
										"aria-hidden": "true"
									}), "Connection through shared experience, never personal identity."]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "outline",
								className: "mt-5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/community",
									children: "Open community rooms"
								})
							})
						]
					})
				})]
			})
		})
	] });
}
//#endregion
export { HomePage as component };
