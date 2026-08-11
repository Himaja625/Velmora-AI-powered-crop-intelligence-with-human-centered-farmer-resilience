import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { A as Clock, O as CloudSun, T as Droplets, b as Leaf, j as CircleCheck, k as CloudRain, l as Sparkles, n as Wind, o as TriangleAlert, s as Thermometer, v as LoaderCircle, w as Eye, x as Info, y as ListChecks } from "../_libs/lucide-react.mjs";
import { n as Button, r as cn } from "./router-DqkL3bZ-.mjs";
import { n as CardContent, t as Card } from "./card-B43h9aVt.mjs";
import { n as Separator, t as Badge } from "./separator-Bge0hizt.mjs";
import { i as COMMUNITY_SIGNAL } from "./community-DNXOxsXp.mjs";
import { a as loadScanSession, i as buildDemoAdvisory, n as SAMPLE_SUBMISSION, r as buildAdvisoryWithWeather } from "./scan-store-B5NyFMSu.mjs";
import { n as Root, t as Indicator } from "../_libs/radix-ui__react-progress.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/advisory-BTlffnT5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Progress = import_react.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Indicator, {
		className: "h-full w-full flex-1 bg-primary transition-all",
		style: { transform: `translateX(-${100 - (value || 0)}%)` }
	})
}));
Progress.displayName = Root.displayName;
var HEALTH_LABEL = {
	healthy: "Healthy",
	watch: "Watch closely",
	"action-needed": "Action needed"
};
function AdvisoryPage() {
	const [state, setState] = (0, import_react.useState)({
		submission: null,
		advisory: null
	});
	const [isSample, setIsSample] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const session = loadScanSession();
		if (session.advisory && session.submission) {
			setState(session);
			return;
		}
		setIsSample(true);
		buildAdvisoryWithWeather(SAMPLE_SUBMISSION).then(({ advisory }) => {
			setState({
				submission: SAMPLE_SUBMISSION,
				advisory
			});
		}).catch(() => {
			setState({
				submission: SAMPLE_SUBMISSION,
				advisory: buildDemoAdvisory(SAMPLE_SUBMISSION)
			});
		});
	}, []);
	const { advisory, submission } = state;
	if (!advisory || !submission) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-4 py-24 text-center sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
			className: "mx-auto size-8 animate-spin text-muted-foreground",
			"aria-hidden": "true"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-muted-foreground",
			children: "Analysing crop photo & retrieving live weather…"
		})]
	});
	const { analysis, weather, actionWindow } = advisory;
	const waiting = actionWindow.status === "wait";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold tracking-wide text-muted-foreground uppercase",
							children: "Step 2 of 3"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-2 text-3xl font-semibold sm:text-4xl",
							children: "Field advisory"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 max-w-2xl text-muted-foreground",
							children: [
								analysis.cropType,
								" · ",
								weather.location,
								" · generated",
								" ",
								new Date(advisory.generatedAt).toLocaleString()
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/field-scan",
						children: "Run a new scan"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex flex-wrap gap-2",
				children: [
					!advisory.isDemoAnalysis ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "outline",
						className: "border-leaf/50 bg-leaf-soft/80 text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
							className: "mr-1.5 size-3.5 text-leaf",
							"aria-hidden": "true"
						}), "AI crop analysis · Gemini Vision"]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "outline",
						className: "border-caution/50 bg-caution-soft/70 text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
							className: "mr-1.5 size-3.5",
							"aria-hidden": "true"
						}), "Sample crop diagnosis model (offline fallback)"]
					}),
					!advisory.isDemoData ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "outline",
						className: "border-leaf/50 bg-leaf-soft/80 text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudSun, {
							className: "mr-1.5 size-3.5 text-leaf",
							"aria-hidden": "true"
						}), "Live weather · Open-Meteo"]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "outline",
						className: "border-caution/50 bg-caution-soft/70 text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudSun, {
							className: "mr-1.5 size-3.5",
							"aria-hidden": "true"
						}), "Sample weather data (offline fallback)"]
					}),
					analysis.isPlantImage === false && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "outline",
						className: "border-destructive/50 bg-destructive/10 text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
							className: "mr-1.5 size-3.5 text-destructive",
							"aria-hidden": "true"
						}), "Photo does not appear to show a crop leaf — please upload a clear leaf photo"]
					}),
					isSample && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "outline",
						className: "border-border bg-secondary text-foreground",
						children: "Sample scan shown — no field scan submitted in this session"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"aria-labelledby": "combined-basis",
				className: "mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "combined-basis",
					className: "sr-only",
					children: "Basis of this recommendation"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid items-stretch gap-0 md:grid-cols-[1fr_auto_1fr_auto_1.2fr]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[0.7rem] font-semibold tracking-wide text-muted-foreground uppercase",
									children: "Crop analysis"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1.5 font-display text-lg font-semibold",
									children: analysis.likelyIssue
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: [analysis.confidence, "% confidence"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid place-items-center px-3 text-muted-foreground md:border-x md:border-border",
							"aria-hidden": "true",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "py-2 text-lg",
								children: "+"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[0.7rem] font-semibold tracking-wide text-muted-foreground uppercase",
									children: ["Weather at ", weather.location]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1.5 font-display text-lg font-semibold",
									children: weather.summary
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: [weather.rainChancePercent, "% rain chance in the coming hours"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid place-items-center px-3 text-muted-foreground md:border-x md:border-border",
							"aria-hidden": "true",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "py-2 text-lg",
								children: "="
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `p-5 ${waiting ? "bg-caution-soft/70" : "bg-leaf-soft/70"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[0.7rem] font-semibold tracking-wide text-muted-foreground uppercase",
									children: "Recommended action window"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1.5 font-display text-lg font-semibold",
									children: actionWindow.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: actionWindow.timing
								})
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "border-border/80",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[0.7rem] font-semibold tracking-wide text-muted-foreground uppercase",
												children: "Likely issue"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
												className: "mt-1.5 text-2xl font-semibold",
												children: analysis.likelyIssue
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 text-sm text-muted-foreground",
												children: analysis.healthSummary
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										className: analysis.healthStatus === "action-needed" ? "shrink-0 bg-caution text-primary-foreground" : "shrink-0 bg-leaf text-primary-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, {
											className: "mr-1.5 size-3.5",
											"aria-hidden": "true"
										}), HEALTH_LABEL[analysis.healthStatus]]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "my-6" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium",
											children: "Confidence"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "tabular-nums",
											children: [analysis.confidence, "%"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
										value: analysis.confidence,
										className: "mt-2",
										"aria-label": `Analysis confidence ${analysis.confidence} percent`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-xs text-muted-foreground",
										children: "Confidence describes how closely the observed pattern matches this condition. It is not a confirmed diagnosis — confirm with a local agricultural officer before major treatment."
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "my-6" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "flex items-center gap-2 text-base font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {
										className: "size-4 text-leaf",
										"aria-hidden": "true"
									}), "What we observed"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-3 space-y-2 text-sm text-muted-foreground",
									children: analysis.observations.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-2 size-1.5 shrink-0 rounded-full bg-leaf",
											"aria-hidden": "true"
										}), item]
									}, item))
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "border-border/80",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "flex items-center gap-2 text-lg font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListChecks, {
										className: "size-5 text-leaf",
										"aria-hidden": "true"
									}), "What to do"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
									className: "mt-4 space-y-3",
									children: analysis.nextSteps.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex gap-3 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "grid size-6 shrink-0 place-items-center rounded-full bg-leaf-soft text-xs font-semibold text-leaf-deep",
											"aria-hidden": "true",
											children: index + 1
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: step })]
									}, step))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "my-6" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-base font-semibold",
									children: "Treatment guidance"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-3 space-y-2 text-sm text-muted-foreground",
									children: analysis.treatmentGuidance.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
											className: "mt-0.5 size-4 shrink-0 text-leaf",
											"aria-hidden": "true"
										}), item]
									}, item))
								})
							]
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							className: "border-border/80",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								className: "p-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
										className: "flex items-center gap-2 text-lg font-semibold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudRain, {
											className: "size-5 text-sky",
											"aria-hidden": "true"
										}), "Weather check"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm text-muted-foreground",
										children: weather.summary
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
										className: "mt-4 grid grid-cols-3 gap-3 text-center",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-lg bg-secondary/60 p-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
													className: "text-[0.65rem] tracking-wide text-muted-foreground uppercase",
													children: "Temp"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
													className: "mt-1 flex items-center justify-center gap-1 text-sm font-semibold tabular-nums",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thermometer, {
															className: "size-3.5 text-clay",
															"aria-hidden": "true"
														}),
														weather.temperatureC,
														"°C"
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-lg bg-secondary/60 p-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
													className: "text-[0.65rem] tracking-wide text-muted-foreground uppercase",
													children: "Humidity"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
													className: "mt-1 flex items-center justify-center gap-1 text-sm font-semibold tabular-nums",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplets, {
															className: "size-3.5 text-sky",
															"aria-hidden": "true"
														}),
														weather.humidityPercent,
														"%"
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-lg bg-secondary/60 p-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
													className: "text-[0.65rem] tracking-wide text-muted-foreground uppercase",
													children: "Wind"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
													className: "mt-1 flex items-center justify-center gap-1 text-sm font-semibold tabular-nums",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wind, {
														className: "size-3.5 text-muted-foreground",
														"aria-hidden": "true"
													}), weather.windKph]
												})]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "mt-5 space-y-2",
										"aria-label": "Hourly rain chance",
										children: weather.hourly.map((hour) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "grid grid-cols-[3rem_1fr_5.5rem] items-center gap-3 text-xs",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground",
													children: hour.label
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "h-2 overflow-hidden rounded-full bg-secondary",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "block h-full rounded-full bg-sky",
														style: { width: `${hour.rainChance}%` }
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-right text-muted-foreground tabular-nums",
													children: [
														hour.rainChance,
														"% · ",
														hour.condition
													]
												})
											]
										}, hour.label))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "my-6" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "flex items-center gap-2 text-base font-semibold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
											className: "size-4 text-caution",
											"aria-hidden": "true"
										}), "Weather risks"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "mt-3 space-y-2 text-sm text-muted-foreground",
										children: weather.risks.map((risk) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "mt-2 size-1.5 shrink-0 rounded-full bg-caution",
												"aria-hidden": "true"
											}), risk]
										}, risk))
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							className: waiting ? "border-caution/50 bg-caution-soft/60" : "border-leaf/40 bg-leaf-soft/60",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								className: "p-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
										className: "flex items-center gap-2 text-lg font-semibold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
											className: "size-5",
											"aria-hidden": "true"
										}), "Action window"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 font-display text-xl font-semibold",
										children: actionWindow.label
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm",
										children: actionWindow.timing
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-5 text-sm font-semibold",
										children: "Why this window"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "mt-2 space-y-2 text-sm",
										children: actionWindow.reasoning.map((reason) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
												className: "mt-0.5 size-4 shrink-0",
												"aria-hidden": "true"
											}), reason]
										}, reason))
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							className: "border-border/80",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								className: "p-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-base font-semibold",
										children: "You are not alone in this"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm text-muted-foreground",
										children: COMMUNITY_SIGNAL.supportive
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs text-muted-foreground",
										children: COMMUNITY_SIGNAL.detail
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 flex flex-wrap gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											asChild: true,
											size: "sm",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/talk",
												children: "Talk to Velmora"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											asChild: true,
											size: "sm",
											variant: "outline",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/community",
												children: "Community rooms"
											})
										})]
									})
								]
							})
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { AdvisoryPage as component };
