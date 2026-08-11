import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { M as ChevronUp, N as ChevronDown, O as CloudSun, P as Check, S as Image, a as Upload, g as MapPin, t as X, v as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as Button, r as cn } from "./router-DqkL3bZ-.mjs";
import { n as CardContent, t as Card } from "./card-B43h9aVt.mjs";
import { i as buildDemoAdvisory, o as saveScanSession, r as buildAdvisoryWithWeather, t as CROP_TYPES } from "./scan-store-B5NyFMSu.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
import { a as SelectItemIndicator, c as SelectPortal, d as SelectSeparator$1, f as SelectTrigger$1, i as SelectItem$1, l as SelectScrollDownButton$1, m as SelectViewport, n as SelectContent$1, o as SelectItemText, p as SelectValue$1, r as SelectIcon, s as SelectLabel$1, t as Select$1, u as SelectScrollUpButton$1 } from "../_libs/@radix-ui/react-select+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/field-scan-D6efVooS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn(labelVariants(), className),
	...props
}));
Label.displayName = Root.displayName;
var Select = Select$1;
var SelectValue = SelectValue$1;
var SelectTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger$1, {
	ref,
	className: cn("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 opacity-50" })
	})]
}));
SelectTrigger.displayName = SelectTrigger$1.displayName;
var SelectScrollUpButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-4 w-4" })
}));
SelectScrollUpButton.displayName = SelectScrollUpButton$1.displayName;
var SelectScrollDownButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })
}));
SelectScrollDownButton.displayName = SelectScrollDownButton$1.displayName;
var SelectContent = import_react.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent$1, {
	ref,
	className: cn("relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
	position,
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectViewport, {
			className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton, {})
	]
}) }));
SelectContent.displayName = SelectContent$1.displayName;
var SelectLabel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectLabel$1, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", className),
	...props
}));
SelectLabel.displayName = SelectLabel$1.displayName;
var SelectItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem$1, {
	ref,
	className: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemText, { children })]
}));
SelectItem.displayName = SelectItem$1.displayName;
var SelectSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSeparator$1, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
SelectSeparator.displayName = SelectSeparator$1.displayName;
var MAX_BYTES = 8388608;
var ALLOWED_TYPES = [
	"image/jpeg",
	"image/png",
	"image/webp"
];
function FieldScanPage() {
	const navigate = useNavigate();
	const inputRef = (0, import_react.useRef)(null);
	const [preview, setPreview] = (0, import_react.useState)(null);
	const [cropType, setCropType] = (0, import_react.useState)("");
	const [location, setLocation] = (0, import_react.useState)("");
	const [locationSource, setLocationSource] = (0, import_react.useState)("manual");
	const [locating, setLocating] = (0, import_react.useState)(false);
	const [locationNote, setLocationNote] = (0, import_react.useState)(null);
	const [dragging, setDragging] = (0, import_react.useState)(false);
	const [errors, setErrors] = (0, import_react.useState)({});
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	function acceptFile(file) {
		if (!ALLOWED_TYPES.includes(file.type)) {
			setErrors((prev) => ({
				...prev,
				image: "Use a JPG, PNG, or WEBP image of the crop or leaf."
			}));
			return;
		}
		if (file.size > MAX_BYTES) {
			setErrors((prev) => ({
				...prev,
				image: "That image is over 8 MB. Please use a smaller photo."
			}));
			return;
		}
		const reader = new FileReader();
		reader.onload = () => {
			setPreview({
				url: String(reader.result),
				name: file.name
			});
			setErrors((prev) => ({
				...prev,
				image: void 0
			}));
		};
		reader.onerror = () => setErrors((prev) => ({
			...prev,
			image: "That image could not be read. Try another photo."
		}));
		reader.readAsDataURL(file);
	}
	function onFileInput(event) {
		const file = event.target.files?.[0];
		if (file) acceptFile(file);
	}
	function onDrop(event) {
		event.preventDefault();
		setDragging(false);
		const file = event.dataTransfer.files?.[0];
		if (file) acceptFile(file);
	}
	function useDeviceLocation() {
		if (typeof navigator === "undefined" || !navigator.geolocation) {
			setLocationNote("This device cannot share location. Please type your village, district, or state.");
			return;
		}
		setLocating(true);
		setLocationNote(null);
		navigator.geolocation.getCurrentPosition((position) => {
			const lat = position.coords.latitude.toFixed(2);
			const lon = position.coords.longitude.toFixed(2);
			setLocation(`Approximate area ${lat}, ${lon}`);
			setLocationSource("device");
			setLocating(false);
			setErrors((prev) => ({
				...prev,
				location: void 0
			}));
			setLocationNote("Location approximated to about 1 km and kept private to your device session.");
		}, () => {
			setLocating(false);
			setLocationNote("Location access was not granted. Please type your village, district, or state.");
		}, { timeout: 1e4 });
	}
	function validate() {
		const next = {};
		if (!preview) next.image = "Add a photo of the affected crop or leaf.";
		if (!cropType) next.crop = "Select the crop you are scanning.";
		if (location.trim().length < 3) next.location = "Enter your village, district, or state.";
		setErrors(next);
		return Object.keys(next).length === 0;
	}
	async function onSubmit() {
		if (!validate() || !preview) return;
		setSubmitting(true);
		const submission = {
			imageDataUrl: preview.url,
			imageName: preview.name,
			cropType,
			location: location.trim(),
			locationSource,
			submittedAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		try {
			const { advisory } = await buildAdvisoryWithWeather(submission);
			saveScanSession(submission, advisory);
			navigate({ to: "/advisory" });
		} catch (err) {
			console.error("Error generating advisory with weather:", err);
			saveScanSession(submission, buildDemoAdvisory(submission));
			navigate({ to: "/advisory" });
		} finally {
			setSubmitting(false);
		}
	}
	const errorCount = Object.values(errors).filter(Boolean).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "max-w-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold tracking-wide text-muted-foreground uppercase",
					children: "Step 1 of 3"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 text-3xl font-semibold sm:text-4xl",
					children: "Scan your field"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-muted-foreground",
					children: "Velmora reads three things together: the photo you take, where your field is, and what the weather is doing there. Any one of them alone is not enough to time an action safely."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-6 lg:grid-cols-[1.35fr_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "border-border/80",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "space-y-8 p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
								className: "text-sm font-semibold",
								children: "Crop or leaf photo"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "A close, well-lit photo of the affected leaf works best. JPG, PNG, or WEBP up to 8 MB."
							}),
							preview ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 overflow-hidden rounded-xl border border-border",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: preview.url,
									alt: `Preview of uploaded crop photo: ${preview.name}`,
									className: "max-h-72 w-full object-cover"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-t border-border bg-secondary/50 p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-sm text-muted-foreground",
										children: preview.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "ghost",
										size: "sm",
										className: "shrink-0",
										onClick: () => setPreview(null),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
											className: "mr-1 size-4",
											"aria-hidden": "true"
										}), "Remove"]
									})]
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								role: "button",
								tabIndex: 0,
								"aria-describedby": errors.image ? "image-error" : void 0,
								onClick: () => inputRef.current?.click(),
								onKeyDown: (event) => {
									if (event.key === "Enter" || event.key === " ") {
										event.preventDefault();
										inputRef.current?.click();
									}
								},
								onDragOver: (event) => {
									event.preventDefault();
									setDragging(true);
								},
								onDragLeave: () => setDragging(false),
								onDrop,
								className: `mt-4 grid cursor-pointer place-items-center rounded-xl border-2 border-dashed p-10 text-center transition-colors ${dragging ? "border-leaf bg-leaf-soft/60" : "border-border bg-secondary/40 hover:bg-secondary/70"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {
										className: "size-7 text-muted-foreground",
										"aria-hidden": "true"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-sm font-medium",
										children: "Drag a photo here, or select a file"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs text-muted-foreground",
										children: "Nothing is uploaded to a server in this prototype."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: inputRef,
								type: "file",
								accept: ALLOWED_TYPES.join(","),
								className: "sr-only",
								"aria-label": "Upload a crop or leaf photo",
								onChange: onFileInput
							}),
							errors.image && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								id: "image-error",
								role: "alert",
								className: "mt-2 text-sm text-destructive",
								children: errors.image
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-6 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "crop-type",
									children: "Crop type"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: cropType,
									onValueChange: (value) => {
										setCropType(value);
										setErrors((prev) => ({
											...prev,
											crop: void 0
										}));
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										id: "crop-type",
										className: "mt-2 w-full",
										"aria-describedby": errors.crop ? "crop-error" : void 0,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select your crop" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: CROP_TYPES.map((crop) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: crop,
										children: crop
									}, crop)) })]
								}),
								errors.crop && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									id: "crop-error",
									role: "alert",
									className: "mt-2 text-sm text-destructive",
									children: errors.crop
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "location",
									children: "Field location"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "location",
									className: "mt-2",
									placeholder: "Village, district, or state",
									value: location,
									maxLength: 120,
									"aria-describedby": errors.location ? "location-error location-help" : "location-help",
									onChange: (event) => {
										setLocation(event.target.value);
										setLocationSource("manual");
										setErrors((prev) => ({
											...prev,
											location: void 0
										}));
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex flex-wrap items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "button",
										variant: "outline",
										size: "sm",
										onClick: useDeviceLocation,
										disabled: locating,
										children: [locating ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
											className: "mr-1.5 size-4 animate-spin",
											"aria-hidden": "true"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
											className: "mr-1.5 size-4",
											"aria-hidden": "true"
										}), "Use my location"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										id: "location-help",
										className: "text-xs text-muted-foreground",
										children: "Used for weather only. Never shown publicly."
									})]
								}),
								locationNote && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs text-muted-foreground",
									children: locationNote
								}),
								errors.location && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									id: "location-error",
									role: "alert",
									className: "mt-2 text-sm text-destructive",
									children: errors.location
								})
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"aria-live": "polite",
								className: "text-sm text-muted-foreground",
								children: errorCount > 0 ? `${errorCount} item${errorCount > 1 ? "s" : ""} still need attention.` : "Photo, crop, and location are combined with local weather in the next step."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "lg",
								onClick: onSubmit,
								disabled: submitting,
								children: [submitting && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									className: "mr-2 size-4 animate-spin",
									"aria-hidden": "true"
								}), submitting ? "Analyzing crop photo & live weather..." : "Continue to analysis"]
							})]
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "border-border/80 bg-sand/60",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-base font-semibold",
							children: "What Velmora uses together"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-4 space-y-4 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {
										className: "mt-0.5 size-4 shrink-0 text-leaf",
										"aria-hidden": "true"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "font-semibold",
										children: "Your photo"
									}), " — the visible symptom pattern on the plant."] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
										className: "mt-0.5 size-4 shrink-0 text-clay",
										"aria-hidden": "true"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "font-semibold",
										children: "Your location"
									}), " — to pull the weather that actually applies to your field."] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudSun, {
										className: "mt-0.5 size-4 shrink-0 text-sky",
										"aria-hidden": "true"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "font-semibold",
										children: "Current & upcoming weather"
									}), " — to decide whether acting today is worthwhile."] })]
								})
							]
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "border-border/80 bg-secondary/50",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "p-5 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-semibold",
							children: "Live weather integration"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-muted-foreground",
							children: "Live forecast is fetched from Open-Meteo for your field location. The crop diagnosis model remains sample output."
						})]
					})
				})]
			})]
		})]
	});
}
//#endregion
export { FieldScanPage as component };
