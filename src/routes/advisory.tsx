import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  CheckCircle2,
  CloudRain,
  CloudSun,
  Clock,
  Droplets,
  Eye,
  Info,
  Leaf,
  ListChecks,
  Loader2,
  Sparkles,
  Thermometer,
  Wind,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { COMMUNITY_SIGNAL } from "@/lib/velmora/community";
import { SAMPLE_SUBMISSION, buildAdvisoryWithWeather, buildDemoAdvisory } from "@/lib/velmora/demo-advisory";
import { loadScanSession } from "@/lib/velmora/scan-store";
import type { Advisory, ScanSubmission } from "@/lib/velmora/types";

export const Route = createFileRoute("/advisory")({
  head: () => ({
    meta: [
      { title: "Advisory — Velmora" },
      {
        name: "description",
        content:
          "Velmora's advisory combines crop analysis with local weather to show the likely issue, recommended steps, and a safe action window.",
      },
      { property: "og:title", content: "Advisory — Velmora" },
      {
        property: "og:description",
        content: "Likely issue, confidence, treatment guidance, weather risks, and when it is safe to act.",
      },
    ],
  }),
  component: AdvisoryPage,
});

const HEALTH_LABEL: Record<string, string> = {
  healthy: "Healthy",
  watch: "Watch closely",
  "action-needed": "Action needed",
};

function AdvisoryPage() {
  const [state, setState] = useState<{ submission: ScanSubmission | null; advisory: Advisory | null }>({
    submission: null,
    advisory: null,
  });
  const [isSample, setIsSample] = useState(false);

  useEffect(() => {
    const session = loadScanSession();
    if (session.advisory && session.submission) {
      setState(session);
      return;
    }
    setIsSample(true);
    buildAdvisoryWithWeather(SAMPLE_SUBMISSION)
      .then(({ advisory }) => {
        setState({ submission: SAMPLE_SUBMISSION, advisory });
      })
      .catch(() => {
        setState({ submission: SAMPLE_SUBMISSION, advisory: buildDemoAdvisory(SAMPLE_SUBMISSION) });
      });
  }, []);

  const { advisory, submission } = state;

  if (!advisory || !submission) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <Loader2 className="mx-auto size-8 animate-spin text-muted-foreground" aria-hidden="true" />
        <p className="mt-3 text-muted-foreground">Analysing crop photo &amp; retrieving live weather…</p>
      </div>
    );
  }

  const { analysis, weather, actionWindow } = advisory;
  const waiting = actionWindow.status === "wait";

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Step 2 of 3</p>
          <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Field advisory</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            {analysis.cropType} · {weather.location} · generated{" "}
            {new Date(advisory.generatedAt).toLocaleString()}
          </p>
        </div>
        <Button asChild variant="outline">
          <Link to="/field-scan">Run a new scan</Link>
        </Button>
      </header>

      <div className="mt-5 flex flex-wrap gap-2">
        {/* Vision / crop analysis source badge */}
        {!advisory.isDemoAnalysis ? (
          <Badge variant="outline" className="border-leaf/50 bg-leaf-soft/80 text-foreground">
            <Sparkles className="mr-1.5 size-3.5 text-leaf" aria-hidden="true" />
            AI crop analysis · Gemini Vision
          </Badge>
        ) : (
          <Badge variant="outline" className="border-caution/50 bg-caution-soft/70 text-foreground">
            <Info className="mr-1.5 size-3.5" aria-hidden="true" />
            Sample crop diagnosis model (offline fallback)
          </Badge>
        )}

        {/* Weather source badge */}
        {!advisory.isDemoData ? (
          <Badge variant="outline" className="border-leaf/50 bg-leaf-soft/80 text-foreground">
            <CloudSun className="mr-1.5 size-3.5 text-leaf" aria-hidden="true" />
            Live weather · Open-Meteo
          </Badge>
        ) : (
          <Badge variant="outline" className="border-caution/50 bg-caution-soft/70 text-foreground">
            <CloudSun className="mr-1.5 size-3.5" aria-hidden="true" />
            Sample weather data (offline fallback)
          </Badge>
        )}

        {/* Non-plant image warning */}
        {analysis.isPlantImage === false && (
          <Badge variant="outline" className="border-destructive/50 bg-destructive/10 text-foreground">
            <AlertTriangle className="mr-1.5 size-3.5 text-destructive" aria-hidden="true" />
            Photo does not appear to show a crop leaf — please upload a clear leaf photo
          </Badge>
        )}

        {/* Sample scan notice */}
        {isSample && (
          <Badge variant="outline" className="border-border bg-secondary text-foreground">
            Sample scan shown — no field scan submitted in this session
          </Badge>
        )}
      </div>

      {/* Combined-source banner: the recommendation depends on both inputs. */}
      <section
        aria-labelledby="combined-basis"
        className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)]"
      >
        <h2 id="combined-basis" className="sr-only">
          Basis of this recommendation
        </h2>
        <div className="grid items-stretch gap-0 md:grid-cols-[1fr_auto_1fr_auto_1.2fr]">
          <div className="p-5">
            <p className="text-[0.7rem] font-semibold tracking-wide text-muted-foreground uppercase">
              Crop analysis
            </p>
            <p className="mt-1.5 font-display text-lg font-semibold">{analysis.likelyIssue}</p>
            <p className="mt-1 text-sm text-muted-foreground">{analysis.confidence}% confidence</p>
          </div>
          <div
            className="grid place-items-center px-3 text-muted-foreground md:border-x md:border-border"
            aria-hidden="true"
          >
            <span className="py-2 text-lg">+</span>
          </div>
          <div className="p-5">
            <p className="text-[0.7rem] font-semibold tracking-wide text-muted-foreground uppercase">
              Weather at {weather.location}
            </p>
            <p className="mt-1.5 font-display text-lg font-semibold">{weather.summary}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {weather.rainChancePercent}% rain chance in the coming hours
            </p>
          </div>
          <div
            className="grid place-items-center px-3 text-muted-foreground md:border-x md:border-border"
            aria-hidden="true"
          >
            <span className="py-2 text-lg">=</span>
          </div>
          <div className={`p-5 ${waiting ? "bg-caution-soft/70" : "bg-leaf-soft/70"}`}>
            <p className="text-[0.7rem] font-semibold tracking-wide text-muted-foreground uppercase">
              Recommended action window
            </p>
            <p className="mt-1.5 font-display text-lg font-semibold">{actionWindow.label}</p>
            <p className="mt-1 text-sm text-muted-foreground">{actionWindow.timing}</p>
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          <Card className="border-border/80">
            <CardContent className="p-6">
              <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
                <div className="min-w-0">
                  <p className="text-[0.7rem] font-semibold tracking-wide text-muted-foreground uppercase">
                    Likely issue
                  </p>
                  <h2 className="mt-1.5 text-2xl font-semibold">{analysis.likelyIssue}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{analysis.healthSummary}</p>
                </div>
                <Badge
                  className={
                    analysis.healthStatus === "action-needed"
                      ? "shrink-0 bg-caution text-primary-foreground"
                      : "shrink-0 bg-leaf text-primary-foreground"
                  }
                >
                  <Leaf className="mr-1.5 size-3.5" aria-hidden="true" />
                  {HEALTH_LABEL[analysis.healthStatus]}
                </Badge>
              </div>

              <Separator className="my-6" />

              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Confidence</span>
                  <span className="tabular-nums">{analysis.confidence}%</span>
                </div>
                <Progress
                  value={analysis.confidence}
                  className="mt-2"
                  aria-label={`Analysis confidence ${analysis.confidence} percent`}
                />
                <p className="mt-2 text-xs text-muted-foreground">
                  Confidence describes how closely the observed pattern matches this condition. It is not a
                  confirmed diagnosis — confirm with a local agricultural officer before major treatment.
                </p>
              </div>

              <Separator className="my-6" />

              <h3 className="flex items-center gap-2 text-base font-semibold">
                <Eye className="size-4 text-leaf" aria-hidden="true" />
                What we observed
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {analysis.observations.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-leaf" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border/80">
            <CardContent className="p-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <ListChecks className="size-5 text-leaf" aria-hidden="true" />
                What to do
              </h2>
              <ol className="mt-4 space-y-3">
                {analysis.nextSteps.map((step, index) => (
                  <li key={step} className="flex gap-3 text-sm">
                    <span
                      className="grid size-6 shrink-0 place-items-center rounded-full bg-leaf-soft text-xs font-semibold text-leaf-deep"
                      aria-hidden="true"
                    >
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>

              <Separator className="my-6" />

              <h3 className="text-base font-semibold">Treatment guidance</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {analysis.treatmentGuidance.map((item) => (
                  <li key={item} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-leaf" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-border/80">
            <CardContent className="p-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <CloudRain className="size-5 text-sky" aria-hidden="true" />
                Weather check
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">{weather.summary}</p>

              <dl className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-lg bg-secondary/60 p-3">
                  <dt className="text-[0.65rem] tracking-wide text-muted-foreground uppercase">Temp</dt>
                  <dd className="mt-1 flex items-center justify-center gap-1 text-sm font-semibold tabular-nums">
                    <Thermometer className="size-3.5 text-clay" aria-hidden="true" />
                    {weather.temperatureC}°C
                  </dd>
                </div>
                <div className="rounded-lg bg-secondary/60 p-3">
                  <dt className="text-[0.65rem] tracking-wide text-muted-foreground uppercase">Humidity</dt>
                  <dd className="mt-1 flex items-center justify-center gap-1 text-sm font-semibold tabular-nums">
                    <Droplets className="size-3.5 text-sky" aria-hidden="true" />
                    {weather.humidityPercent}%
                  </dd>
                </div>
                <div className="rounded-lg bg-secondary/60 p-3">
                  <dt className="text-[0.65rem] tracking-wide text-muted-foreground uppercase">Wind</dt>
                  <dd className="mt-1 flex items-center justify-center gap-1 text-sm font-semibold tabular-nums">
                    <Wind className="size-3.5 text-muted-foreground" aria-hidden="true" />
                    {weather.windKph}
                  </dd>
                </div>
              </dl>

              <ul className="mt-5 space-y-2" aria-label="Hourly rain chance">
                {weather.hourly.map((hour) => (
                  <li key={hour.label} className="grid grid-cols-[3rem_1fr_5.5rem] items-center gap-3 text-xs">
                    <span className="text-muted-foreground">{hour.label}</span>
                    <span className="h-2 overflow-hidden rounded-full bg-secondary">
                      <span
                        className="block h-full rounded-full bg-sky"
                        style={{ width: `${hour.rainChance}%` }}
                      />
                    </span>
                    <span className="text-right text-muted-foreground tabular-nums">
                      {hour.rainChance}% · {hour.condition}
                    </span>
                  </li>
                ))}
              </ul>

              <Separator className="my-6" />

              <h3 className="flex items-center gap-2 text-base font-semibold">
                <AlertTriangle className="size-4 text-caution" aria-hidden="true" />
                Weather risks
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {weather.risks.map((risk) => (
                  <li key={risk} className="flex gap-2">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-caution" aria-hidden="true" />
                    {risk}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className={waiting ? "border-caution/50 bg-caution-soft/60" : "border-leaf/40 bg-leaf-soft/60"}>
            <CardContent className="p-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <Clock className="size-5" aria-hidden="true" />
                Action window
              </h2>
              <p className="mt-2 font-display text-xl font-semibold">{actionWindow.label}</p>
              <p className="mt-1 text-sm">{actionWindow.timing}</p>

              <h3 className="mt-5 text-sm font-semibold">Why this window</h3>
              <ul className="mt-2 space-y-2 text-sm">
                {actionWindow.reasoning.map((reason) => (
                  <li key={reason} className="flex gap-2">
                    <Sparkles className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                    {reason}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border/80">
            <CardContent className="p-6">
              <h2 className="text-base font-semibold">You are not alone in this</h2>
              <p className="mt-2 text-sm text-muted-foreground">{COMMUNITY_SIGNAL.supportive}</p>
              <p className="mt-1 text-xs text-muted-foreground">{COMMUNITY_SIGNAL.detail}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button asChild size="sm">
                  <Link to="/talk">Talk to Velmora</Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link to="/community">Community rooms</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
