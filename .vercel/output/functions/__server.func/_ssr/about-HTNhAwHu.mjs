import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { E as Database, I as Brain, O as CloudSun, f as ScanLine, u as ShieldCheck } from "../_libs/lucide-react.mjs";
import { n as Button } from "./router-DqkL3bZ-.mjs";
import { n as CardContent, t as Card } from "./card-B43h9aVt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-HTNhAwHu.js
var import_jsx_runtime = require_jsx_runtime();
var JOURNEY = [
	"A farmer sees something wrong in the field.",
	"Velmora reads the crop image.",
	"Velmora combines the farmer's location with current and upcoming weather.",
	"Velmora explains what may be happening.",
	"Velmora recommends what to do.",
	"Velmora says when conditions are more suitable to act.",
	"If the farmer is overwhelmed, Velmora also listens.",
	"If they want human connection, Velmora opens anonymous, topic-based community rooms."
];
var INTEGRATIONS = [
	{
		icon: ScanLine,
		title: "Crop / leaf image analysis model",
		status: "Not connected",
		detail: "Advisory content comes from labeled demo logic in src/lib/velmora/demo-advisory.ts."
	},
	{
		icon: CloudSun,
		title: "Live weather API",
		status: "Not connected",
		detail: "Weather summaries, risks, and hourly rain chance are demo values shaped like a real forecast."
	},
	{
		icon: Brain,
		title: "LLM API for conversation",
		status: "Not connected",
		detail: "Replies come from a rule-based demo engine that reflects the farmer's own words."
	},
	{
		icon: Database,
		title: "Anonymous community database",
		status: "Not connected",
		detail: "Rooms, posts, and the weekly signal are clearly labeled sample content."
	}
];
function AboutPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "max-w-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-semibold sm:text-4xl",
				children: "About Velmora"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted-foreground",
				children: "Velmora is an AI-powered farmer livelihood and climate-resilience platform. It exists to shorten the distance between a field observation and a confident decision — and to stay honest about what it does not yet know."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-10 grid gap-6 lg:grid-cols-[1.2fr_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "border-border/80",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-semibold",
							children: "The journey Velmora supports"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "mt-4 space-y-3",
							children: JOURNEY.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid size-6 shrink-0 place-items-center rounded-full bg-leaf-soft text-xs font-semibold text-leaf-deep",
									"aria-hidden": "true",
									children: index + 1
								}), step]
							}, step))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/field-scan",
									children: "Scan My Field"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "outline",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/talk",
									children: "Talk to Velmora"
								})
							})]
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "border-border/80",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg font-semibold",
								children: "Ready to connect"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-4 space-y-4",
								children: INTEGRATIONS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-secondary text-secondary-foreground",
										"aria-hidden": "true",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm font-semibold",
												children: item.title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs font-medium text-caution",
												children: item.status
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-sm text-muted-foreground",
												children: item.detail
											})
										]
									})]
								}, item.title))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 text-xs text-muted-foreground",
								children: "Each provider will be called from server-side code with credentials held in environment variables — no API keys are ever placed in the frontend."
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "border-border/80 bg-sand/60",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "flex items-center gap-2 text-lg font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
								className: "size-5 text-leaf",
								"aria-hidden": "true"
							}), "Privacy and safety choices"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-3 space-y-2 text-sm text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Uploaded photos stay in the browser session; nothing is sent to a server yet." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Device location is rounded to an approximate area and used only for weather." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Community identities are anonymous, with no profiles, photos, or private messaging." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Velmora never claims to be human, a therapist, or a licensed agronomist." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Guidance uses “likely issue” language, never an absolute diagnosis." })
							]
						})]
					})
				})]
			})]
		})]
	});
}
//#endregion
export { AboutPage as component };
