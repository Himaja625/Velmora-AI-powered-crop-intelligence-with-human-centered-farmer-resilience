import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CloudSun, Image as ImageIcon, Loader2, MapPin, Upload, X } from "lucide-react";
import { useRef, useState, type ChangeEvent, type DragEvent } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CROP_TYPES, buildDemoAdvisory } from "@/lib/velmora/demo-advisory";
import { saveScanSession } from "@/lib/velmora/scan-store";
import type { ScanSubmission } from "@/lib/velmora/types";

export const Route = createFileRoute("/field-scan")({
  head: () => ({
    meta: [
      { title: "Field Scan — Velmora" },
      {
        name: "description",
        content:
          "Upload a crop or leaf photo, add your crop type and location, and Velmora combines it with local weather to guide your next step.",
      },
      { property: "og:title", content: "Field Scan — Velmora" },
      {
        property: "og:description",
        content: "Photo, location, and weather together — the inputs behind every Velmora advisory.",
      },
    ],
  }),
  component: FieldScanPage,
});

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

type Errors = { image?: string | undefined; crop?: string | undefined; location?: string | undefined };

function FieldScanPage() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<{ url: string; name: string } | null>(null);
  const [cropType, setCropType] = useState("");
  const [location, setLocation] = useState("");
  const [locationSource, setLocationSource] = useState<ScanSubmission["locationSource"]>("manual");
  const [locating, setLocating] = useState(false);
  const [locationNote, setLocationNote] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  function acceptFile(file: File) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      setErrors((prev) => ({ ...prev, image: "Use a JPG, PNG, or WEBP image of the crop or leaf." }));
      return;
    }
    if (file.size > MAX_BYTES) {
      setErrors((prev) => ({ ...prev, image: "That image is over 8 MB. Please use a smaller photo." }));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPreview({ url: String(reader.result), name: file.name });
      setErrors((prev) => ({ ...prev, image: undefined }));
    };
    reader.onerror = () =>
      setErrors((prev) => ({ ...prev, image: "That image could not be read. Try another photo." }));
    reader.readAsDataURL(file);
  }

  function onFileInput(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) acceptFile(file);
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
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
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Coordinates are rounded before display and never shared publicly.
        const lat = position.coords.latitude.toFixed(2);
        const lon = position.coords.longitude.toFixed(2);
        setLocation(`Approximate area ${lat}, ${lon}`);
        setLocationSource("device");
        setLocating(false);
        setErrors((prev) => ({ ...prev, location: undefined }));
        setLocationNote("Location approximated to about 1 km and kept private to your device session.");
      },
      () => {
        setLocating(false);
        setLocationNote("Location access was not granted. Please type your village, district, or state.");
      },
      { timeout: 10000 },
    );
  }

  function validate(): boolean {
    const next: Errors = {};
    if (!preview) next.image = "Add a photo of the affected crop or leaf.";
    if (!cropType) next.crop = "Select the crop you are scanning.";
    if (location.trim().length < 3) next.location = "Enter your village, district, or state.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function onSubmit() {
    if (!validate() || !preview) return;
    setSubmitting(true);
    const submission: ScanSubmission = {
      imageDataUrl: preview.url,
      imageName: preview.name,
      cropType,
      location: location.trim(),
      locationSource,
      submittedAt: new Date().toISOString(),
    };
    saveScanSession(submission, buildDemoAdvisory(submission));
    window.setTimeout(() => {
      void navigate({ to: "/advisory" });
    }, 700);
  }

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="max-w-2xl">
        <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Step 1 of 3</p>
        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Scan your field</h1>
        <p className="mt-3 text-muted-foreground">
          Velmora reads three things together: the photo you take, where your field is, and what the weather
          is doing there. Any one of them alone is not enough to time an action safely.
        </p>
      </header>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        <Card className="border-border/80">
          <CardContent className="space-y-8 p-6">
            <fieldset>
              <legend className="text-sm font-semibold">Crop or leaf photo</legend>
              <p className="mt-1 text-sm text-muted-foreground">
                A close, well-lit photo of the affected leaf works best. JPG, PNG, or WEBP up to 8 MB.
              </p>

              {preview ? (
                <div className="mt-4 overflow-hidden rounded-xl border border-border">
                  <img
                    src={preview.url}
                    alt={`Preview of uploaded crop photo: ${preview.name}`}
                    className="max-h-72 w-full object-cover"
                  />
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-t border-border bg-secondary/50 p-3">
                    <p className="truncate text-sm text-muted-foreground">{preview.name}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="shrink-0"
                      onClick={() => setPreview(null)}
                    >
                      <X className="mr-1 size-4" aria-hidden="true" />
                      Remove
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  role="button"
                  tabIndex={0}
                  aria-describedby={errors.image ? "image-error" : undefined}
                  onClick={() => inputRef.current?.click()}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      inputRef.current?.click();
                    }
                  }}
                  onDragOver={(event) => {
                    event.preventDefault();
                    setDragging(true);
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={onDrop}
                  className={`mt-4 grid cursor-pointer place-items-center rounded-xl border-2 border-dashed p-10 text-center transition-colors ${
                    dragging ? "border-leaf bg-leaf-soft/60" : "border-border bg-secondary/40 hover:bg-secondary/70"
                  }`}
                >
                  <Upload className="size-7 text-muted-foreground" aria-hidden="true" />
                  <p className="mt-3 text-sm font-medium">Drag a photo here, or select a file</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Nothing is uploaded to a server in this prototype.
                  </p>
                </div>
              )}

              <input
                ref={inputRef}
                type="file"
                accept={ALLOWED_TYPES.join(",")}
                className="sr-only"
                aria-label="Upload a crop or leaf photo"
                onChange={onFileInput}
              />
              {errors.image && (
                <p id="image-error" role="alert" className="mt-2 text-sm text-destructive">
                  {errors.image}
                </p>
              )}
            </fieldset>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="crop-type">Crop type</Label>
                <Select
                  value={cropType}
                  onValueChange={(value) => {
                    setCropType(value);
                    setErrors((prev) => ({ ...prev, crop: undefined }));
                  }}
                >
                  <SelectTrigger
                    id="crop-type"
                    className="mt-2 w-full"
                    aria-describedby={errors.crop ? "crop-error" : undefined}
                  >
                    <SelectValue placeholder="Select your crop" />
                  </SelectTrigger>
                  <SelectContent>
                    {CROP_TYPES.map((crop) => (
                      <SelectItem key={crop} value={crop}>
                        {crop}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.crop && (
                  <p id="crop-error" role="alert" className="mt-2 text-sm text-destructive">
                    {errors.crop}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="location">Field location</Label>
                <Input
                  id="location"
                  className="mt-2"
                  placeholder="Village, district, or state"
                  value={location}
                  maxLength={120}
                  aria-describedby={errors.location ? "location-error location-help" : "location-help"}
                  onChange={(event) => {
                    setLocation(event.target.value);
                    setLocationSource("manual");
                    setErrors((prev) => ({ ...prev, location: undefined }));
                  }}
                />
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <Button type="button" variant="outline" size="sm" onClick={useDeviceLocation} disabled={locating}>
                    {locating ? (
                      <Loader2 className="mr-1.5 size-4 animate-spin" aria-hidden="true" />
                    ) : (
                      <MapPin className="mr-1.5 size-4" aria-hidden="true" />
                    )}
                    Use my location
                  </Button>
                  <span id="location-help" className="text-xs text-muted-foreground">
                    Used for weather only. Never shown publicly.
                  </span>
                </div>
                {locationNote && (
                  <p className="mt-2 text-xs text-muted-foreground">{locationNote}</p>
                )}
                {errors.location && (
                  <p id="location-error" role="alert" className="mt-2 text-sm text-destructive">
                    {errors.location}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p aria-live="polite" className="text-sm text-muted-foreground">
                {errorCount > 0
                  ? `${errorCount} item${errorCount > 1 ? "s" : ""} still need attention.`
                  : "Photo, crop, and location are combined with local weather in the next step."}
              </p>
              <Button size="lg" onClick={onSubmit} disabled={submitting}>
                {submitting && <Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" />}
                {submitting ? "Preparing advisory" : "Continue to analysis"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <aside className="space-y-4">
          <Card className="border-border/80 bg-sand/60">
            <CardContent className="p-6">
              <h2 className="text-base font-semibold">What Velmora uses together</h2>
              <ul className="mt-4 space-y-4 text-sm">
                <li className="flex gap-3">
                  <ImageIcon className="mt-0.5 size-4 shrink-0 text-leaf" aria-hidden="true" />
                  <span>
                    <strong className="font-semibold">Your photo</strong> — the visible symptom pattern on
                    the plant.
                  </span>
                </li>
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-clay" aria-hidden="true" />
                  <span>
                    <strong className="font-semibold">Your location</strong> — to pull the weather that
                    actually applies to your field.
                  </span>
                </li>
                <li className="flex gap-3">
                  <CloudSun className="mt-0.5 size-4 shrink-0 text-sky" aria-hidden="true" />
                  <span>
                    <strong className="font-semibold">Current &amp; upcoming weather</strong> — to decide
                    whether acting today is worthwhile.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-caution/40 bg-caution-soft/70">
            <CardContent className="p-5 text-sm">
              <h2 className="text-sm font-semibold">Prototype honesty note</h2>
              <p className="mt-2 text-muted-foreground">
                No crop-vision model or weather API is connected yet, so the advisory you see next is clearly
                labeled demo output. Your photo stays in this browser session only.
              </p>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
