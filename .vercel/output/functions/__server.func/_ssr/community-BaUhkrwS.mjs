import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { C as Flag, _ as Lock, c as Sprout, i as UserX, p as MessageSquare, u as ShieldCheck } from "../_libs/lucide-react.mjs";
import { n as Button } from "./router-DqkL3bZ-.mjs";
import { n as CardContent, t as Card } from "./card-B43h9aVt.mjs";
import { n as Separator, t as Badge } from "./separator-Bge0hizt.mjs";
import { i as COMMUNITY_SIGNAL, n as COMMUNITY_POSTS, r as COMMUNITY_ROOMS, t as COMMUNITY_GUIDELINES } from "./community-DNXOxsXp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/community-BaUhkrwS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NOT_INCLUDED = [
	"No private direct messaging",
	"No followers or following",
	"No profile photos",
	"No matching or discovery by person",
	"No public personal information",
	"No exact location sharing"
];
function CommunityPage() {
	const [activeRoom, setActiveRoom] = (0, import_react.useState)("all");
	const posts = (0, import_react.useMemo)(() => activeRoom === "all" ? COMMUNITY_POSTS : COMMUNITY_POSTS.filter((p) => p.room === activeRoom), [activeRoom]);
	const roomName = (slug) => COMMUNITY_ROOMS.find((room) => room.slug === slug)?.name ?? slug;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "max-w-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-semibold sm:text-4xl",
					children: "Community rooms"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-muted-foreground",
					children: "Anonymous, topic-based rooms where farmers talk about what they are actually going through. The principle is simple: connect people through shared experiences, not personal identity."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "outline",
					className: "border-caution/50 bg-caution-soft/70 text-foreground",
					children: "Sample anonymous posts for demonstration — not real community data"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "outline",
					className: "border-border bg-secondary text-foreground",
					children: COMMUNITY_SIGNAL.headline
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "border-border/80",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "px-1 text-sm font-semibold",
								children: "Rooms"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
								"aria-label": "Community rooms",
								className: "mt-2 grid gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-pressed": activeRoom === "all",
									onClick: () => setActiveRoom("all"),
									className: `rounded-lg px-3 py-2 text-left text-sm transition-colors ${activeRoom === "all" ? "bg-accent text-accent-foreground" : "hover:bg-secondary"}`,
									children: "All rooms"
								}), COMMUNITY_ROOMS.map((room) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									"aria-pressed": activeRoom === room.slug,
									onClick: () => setActiveRoom(room.slug),
									className: `grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${activeRoom === room.slug ? "bg-accent text-accent-foreground" : "hover:bg-secondary"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate",
										children: room.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "shrink-0 text-xs text-muted-foreground tabular-nums",
										children: room.postsThisWeek
									})]
								}, room.slug))]
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "border-border/80 bg-sand/60",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "flex items-center gap-2 text-sm font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
									className: "size-4 text-leaf",
									"aria-hidden": "true"
								}), "Safety by design"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-3 space-y-1.5 text-xs text-muted-foreground",
								children: NOT_INCLUDED.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserX, {
										className: "mt-0.5 size-3.5 shrink-0",
										"aria-hidden": "true"
									}), item]
								}, item))
							})]
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [
						activeRoom !== "all" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							className: "border-border/80 bg-secondary/40",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								className: "p-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-lg font-semibold",
									children: roomName(activeRoom)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1.5 text-sm text-muted-foreground",
									children: COMMUNITY_ROOMS.find((room) => room.slug === activeRoom)?.description
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							"aria-label": "Community posts",
							className: "space-y-4",
							children: [posts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
								className: "border-border/80",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
									className: "p-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex min-w-0 items-center gap-2.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "grid size-8 shrink-0 place-items-center rounded-lg bg-leaf-soft text-leaf-deep",
													"aria-hidden": "true",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sprout, { className: "size-4" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "min-w-0",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "truncate text-sm font-semibold",
														children: post.author
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "truncate text-xs text-muted-foreground",
														children: [
															roomName(post.room),
															" · ",
															post.timeAgo
														]
													})]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												variant: "ghost",
												size: "sm",
												className: "shrink-0 text-muted-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, {
													className: "mr-1.5 size-3.5",
													"aria-hidden": "true"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "sr-only sm:not-sr-only",
													children: "Report"
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-4 text-sm leading-relaxed",
											children: post.body
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "my-4" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-center gap-4 text-xs text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-1.5",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, {
														className: "size-3.5",
														"aria-hidden": "true"
													}),
													post.replies,
													" replies"
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-1.5",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
														className: "size-3.5",
														"aria-hidden": "true"
													}),
													post.supports,
													" people said “same here”"
												]
											})]
										})
									]
								})
							}, post.id)), posts.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
								className: "border-dashed",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									className: "p-8 text-center text-sm text-muted-foreground",
									children: "No sample posts in this room yet."
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							className: "border-border/80",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								className: "p-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-lg font-semibold",
										children: "Community guidelines"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
										className: "mt-3 space-y-2 text-sm text-muted-foreground",
										children: COMMUNITY_GUIDELINES.map((rule, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "grid size-5 shrink-0 place-items-center rounded-full bg-secondary text-[0.65rem] font-semibold text-secondary-foreground",
												"aria-hidden": "true",
												children: index + 1
											}), rule]
										}, rule))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-4 text-xs text-muted-foreground",
										children: "Posting, replying, and moderation actions become live once the anonymous community database is connected."
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
export { CommunityPage as component };
