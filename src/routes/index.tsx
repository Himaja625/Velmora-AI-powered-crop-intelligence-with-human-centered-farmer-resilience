import { createFileRoute, Link } from "@tanstack/react-router";
import { Camera, CloudSun, Compass, Leaf, MessageCircleHeart, ShieldCheck, Users } from "lucide-react";

import heroField from "@/assets/hero-field.jpg";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { COMMUNITY_SIGNAL } from "@/lib/velmora/community";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Velmora — Know your field. Know your next step." },
      {
        name: "description",
        content:
          "Velmora combines crop photos, location, weather, and AI guidance so farmers understand what is happening in their fields and when to act.",
      },
      { property: "og:title", content: "Velmora — Know your field. Know your next step." },
      {
        property: "og:description",
        content:
          "From field signals to confident decisions: crop analysis, weather-aware action windows, and support for farmers.",
      },
    ],
  }),
  component: HomePage,
});

const STEPS = [
  {
    icon: Camera,
    title: "Capture what you see",
    body: "Photograph the affected leaf or plant, add your crop and location. That is the whole input.",
  },
  {
    icon: Compass,
    title: "Understand what it means",
    body: "Velmora explains the likely issue, what was observed, and how confident the read is.",
  },
  {
    icon: CloudSun,
    title: "Act at the right time",
    body: "Current and upcoming weather decide the safe action window, so treatment is not wasted.",
  },
];

const JOURNEY = [
  "Field condition",
  "AI analysis",
  "Crop guidance",
  "Weather check",
  "Safe action window",
];

function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-border/70">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:py-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              <Leaf className="size-3.5 text-leaf" aria-hidden="true" />
              Farmer livelihood &amp; climate resilience
            </p>
            <h1 className="mt-5 text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-6xl">
              From field signals to confident decisions.
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              Velmora combines crop observations, location, weather, and AI-powered guidance to help
              farmers understand what is happening in their fields and decide what to do next.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/field-scan">Scan My Field</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/talk">Talk to Velmora</Link>
              </Button>
            </div>

            <ol className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-2 text-xs font-medium text-muted-foreground">
              {JOURNEY.map((step, index) => (
                <li key={step} className="flex items-center gap-2">
                  <span className="rounded-md bg-secondary px-2.5 py-1 text-secondary-foreground">{step}</span>
                  {index < JOURNEY.length - 1 && <span aria-hidden="true">→</span>}
                </li>
              ))}
            </ol>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-lift)]">
              <img
                src={heroField}
                alt="A farmer's hands holding a tomato leaf showing dark lesions, with crop rows and an overcast sky behind"
                width={1600}
                height={1104}
                className="h-full w-full object-cover"
              />
            </div>
            <Card className="absolute -bottom-6 left-4 right-4 border-border/80 bg-card/95 shadow-[var(--shadow-soft)] backdrop-blur sm:left-6 sm:right-auto sm:max-w-xs">
              <CardContent className="p-4">
                <p className="text-[0.7rem] font-semibold tracking-wide text-muted-foreground uppercase">
                  Action window
                </p>
                <p className="mt-1.5 font-display text-base font-semibold">Wait until leaves are dry</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Rain expected within hours — treatment applied now would likely wash off.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20" aria-labelledby="how-it-works">
        <h2 id="how-it-works" className="text-2xl font-semibold sm:text-3xl">
          Three steps, one clear decision
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Velmora is built around the moment a farmer notices something wrong and has to decide what to do
          about it today.
        </p>

        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.title}>
              <Card className="h-full border-border/80">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <span
                      className="grid size-10 place-items-center rounded-xl bg-leaf-soft text-leaf-deep"
                      aria-hidden="true"
                    >
                      <step.icon className="size-5" />
                    </span>
                    <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Step {index + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-border/70 bg-sand/60">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-16">
          <Card className="border-border/80">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-sky">
                <MessageCircleHeart className="size-5" aria-hidden="true" />
                <h2 className="text-lg font-semibold text-foreground">When the season gets heavy</h2>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Crop problems carry financial and personal weight. Velmora offers a private conversation
                where you can say what is actually going on and get a response that engages with it — not a
                script of wellness tips.
              </p>
              <p className="mt-4 rounded-lg border border-border bg-secondary/60 p-3 text-sm">
                “Losing part of a crop can feel frightening when your livelihood depends on it. You don't
                have to explain everything at once.”
              </p>
              <Button asChild variant="outline" className="mt-5">
                <Link to="/talk">Talk to Velmora</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border/80">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-leaf-deep">
                <Users className="size-5" aria-hidden="true" />
                <h2 className="text-lg font-semibold text-foreground">You are not alone in this week</h2>
              </div>
              <p className="mt-3 font-display text-xl leading-snug font-semibold">
                {COMMUNITY_SIGNAL.headline}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">{COMMUNITY_SIGNAL.detail}</p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-leaf" aria-hidden="true" />
                  Anonymous identities, topic-based rooms, no private messaging or profiles.
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-leaf" aria-hidden="true" />
                  Connection through shared experience, never personal identity.
                </li>
              </ul>
              <Button asChild variant="outline" className="mt-5">
                <Link to="/community">Open community rooms</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
