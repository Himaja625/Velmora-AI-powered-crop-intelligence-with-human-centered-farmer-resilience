import { createFileRoute, Link } from "@tanstack/react-router";
import { Brain, CloudSun, Database, ScanLine, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Velmora — how the guidance is built" },
      {
        name: "description",
        content:
          "How Velmora turns a crop photo, location, and weather into a safe action window — plus what is real, what is demo data, and how privacy is handled.",
      },
      { property: "og:title", content: "About Velmora" },
      {
        property: "og:description",
        content: "The Velmora journey, the integration points, and the prototype's honesty boundaries.",
      },
    ],
  }),
  component: AboutPage,
});

const JOURNEY = [
  "A farmer sees something wrong in the field.",
  "Velmora reads the crop image.",
  "Velmora combines the farmer's location with current and upcoming weather.",
  "Velmora explains what may be happening.",
  "Velmora recommends what to do.",
  "Velmora says when conditions are more suitable to act.",
  "If the farmer is overwhelmed, Velmora also listens.",
  "If they want human connection, Velmora opens anonymous, topic-based community rooms.",
];

const INTEGRATIONS = [
  {
    icon: ScanLine,
    title: "Crop / leaf image analysis model",
    status: "Not connected",
    detail: "Advisory content comes from labeled demo logic in src/lib/velmora/demo-advisory.ts.",
  },
  {
    icon: CloudSun,
    title: "Live weather API",
    status: "Not connected",
    detail: "Weather summaries, risks, and hourly rain chance are demo values shaped like a real forecast.",
  },
  {
    icon: Brain,
    title: "LLM API for conversation",
    status: "Not connected",
    detail: "Replies come from a rule-based demo engine that reflects the farmer's own words.",
  },
  {
    icon: Database,
    title: "Anonymous community database",
    status: "Not connected",
    detail: "Rooms, posts, and the weekly signal are clearly labeled sample content.",
  },
];

function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-semibold sm:text-4xl">About Velmora</h1>
        <p className="mt-3 text-muted-foreground">
          Velmora is an AI-powered farmer livelihood and climate-resilience platform. It exists to shorten
          the distance between a field observation and a confident decision — and to stay honest about what
          it does not yet know.
        </p>
      </header>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Card className="border-border/80">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold">The journey Velmora supports</h2>
            <ol className="mt-4 space-y-3">
              {JOURNEY.map((step, index) => (
                <li key={step} className="flex gap-3 text-sm">
                  <span
                    className="grid size-6 shrink-0 place-items-center rounded-full bg-leaf-soft text-xs font-semibold text-leaf-deep"
                    aria-hidden="true"
                  >
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/field-scan">Scan My Field</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/talk">Talk to Velmora</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-border/80">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold">Ready to connect</h2>
              <ul className="mt-4 space-y-4">
                {INTEGRATIONS.map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <span
                      className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-secondary text-secondary-foreground"
                      aria-hidden="true"
                    >
                      <item.icon className="size-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold">{item.title}</p>
                      <p className="text-xs font-medium text-caution">{item.status}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs text-muted-foreground">
                Each provider will be called from server-side code with credentials held in environment
                variables — no API keys are ever placed in the frontend.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/80 bg-sand/60">
            <CardContent className="p-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <ShieldCheck className="size-5 text-leaf" aria-hidden="true" />
                Privacy and safety choices
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>Uploaded photos stay in the browser session; nothing is sent to a server yet.</li>
                <li>Device location is rounded to an approximate area and used only for weather.</li>
                <li>Community identities are anonymous, with no profiles, photos, or private messaging.</li>
                <li>Velmora never claims to be human, a therapist, or a licensed agronomist.</li>
                <li>Guidance uses “likely issue” language, never an absolute diagnosis.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
