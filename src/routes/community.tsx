import { createFileRoute } from "@tanstack/react-router";
import { Flag, Lock, MessageSquare, ShieldCheck, Sprout, UserX } from "lucide-react";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  COMMUNITY_GUIDELINES,
  COMMUNITY_POSTS,
  COMMUNITY_ROOMS,
  COMMUNITY_SIGNAL,
} from "@/lib/velmora/community";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community — Velmora" },
      {
        name: "description",
        content:
          "Anonymous, topic-based farmer rooms for shared experience: crop disease, weather loss, financial stress, and more. No profiles, no private messaging.",
      },
      { property: "og:title", content: "Community — Velmora" },
      {
        property: "og:description",
        content: "Connect people through shared experiences, not personal identity.",
      },
    ],
  }),
  component: CommunityPage,
});

const NOT_INCLUDED = [
  "No private direct messaging",
  "No followers or following",
  "No profile photos",
  "No matching or discovery by person",
  "No public personal information",
  "No exact location sharing",
];

function CommunityPage() {
  const [activeRoom, setActiveRoom] = useState<string>("all");

  const posts = useMemo(
    () => (activeRoom === "all" ? COMMUNITY_POSTS : COMMUNITY_POSTS.filter((p) => p.room === activeRoom)),
    [activeRoom],
  );

  const roomName = (slug: string) => COMMUNITY_ROOMS.find((room) => room.slug === slug)?.name ?? slug;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-semibold sm:text-4xl">Community rooms</h1>
        <p className="mt-3 text-muted-foreground">
          Anonymous, topic-based rooms where farmers talk about what they are actually going through. The
          principle is simple: connect people through shared experiences, not personal identity.
        </p>
      </header>

      <div className="mt-5 flex flex-wrap gap-2">
        <Badge variant="outline" className="border-caution/50 bg-caution-soft/70 text-foreground">
          Sample anonymous posts for demonstration — not real community data
        </Badge>
        <Badge variant="outline" className="border-border bg-secondary text-foreground">
          {COMMUNITY_SIGNAL.headline}
        </Badge>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
        <aside className="space-y-4">
          <Card className="border-border/80">
            <CardContent className="p-4">
              <h2 className="px-1 text-sm font-semibold">Rooms</h2>
              <nav aria-label="Community rooms" className="mt-2 grid gap-1">
                <button
                  type="button"
                  aria-pressed={activeRoom === "all"}
                  onClick={() => setActiveRoom("all")}
                  className={`rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    activeRoom === "all" ? "bg-accent text-accent-foreground" : "hover:bg-secondary"
                  }`}
                >
                  All rooms
                </button>
                {COMMUNITY_ROOMS.map((room) => (
                  <button
                    key={room.slug}
                    type="button"
                    aria-pressed={activeRoom === room.slug}
                    onClick={() => setActiveRoom(room.slug)}
                    className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      activeRoom === room.slug ? "bg-accent text-accent-foreground" : "hover:bg-secondary"
                    }`}
                  >
                    <span className="truncate">{room.name}</span>
                    <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
                      {room.postsThisWeek}
                    </span>
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>

          <Card className="border-border/80 bg-sand/60">
            <CardContent className="p-5">
              <h2 className="flex items-center gap-2 text-sm font-semibold">
                <Lock className="size-4 text-leaf" aria-hidden="true" />
                Safety by design
              </h2>
              <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                {NOT_INCLUDED.map((item) => (
                  <li key={item} className="flex gap-2">
                    <UserX className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </aside>

        <div className="space-y-6">
          {activeRoom !== "all" && (
            <Card className="border-border/80 bg-secondary/40">
              <CardContent className="p-5">
                <h2 className="text-lg font-semibold">{roomName(activeRoom)}</h2>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {COMMUNITY_ROOMS.find((room) => room.slug === activeRoom)?.description}
                </p>
              </CardContent>
            </Card>
          )}

          <section aria-label="Community posts" className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id} className="border-border/80">
                <CardContent className="p-5">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <span
                        className="grid size-8 shrink-0 place-items-center rounded-lg bg-leaf-soft text-leaf-deep"
                        aria-hidden="true"
                      >
                        <Sprout className="size-4" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">{post.author}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          {roomName(post.room)} · {post.timeAgo}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="shrink-0 text-muted-foreground">
                      <Flag className="mr-1.5 size-3.5" aria-hidden="true" />
                      <span className="sr-only sm:not-sr-only">Report</span>
                    </Button>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed">{post.body}</p>

                  <Separator className="my-4" />

                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <MessageSquare className="size-3.5" aria-hidden="true" />
                      {post.replies} replies
                    </span>
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="size-3.5" aria-hidden="true" />
                      {post.supports} people said “same here”
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}

            {posts.length === 0 && (
              <Card className="border-dashed">
                <CardContent className="p-8 text-center text-sm text-muted-foreground">
                  No sample posts in this room yet.
                </CardContent>
              </Card>
            )}
          </section>

          <Card className="border-border/80">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold">Community guidelines</h2>
              <ol className="mt-3 space-y-2 text-sm text-muted-foreground">
                {COMMUNITY_GUIDELINES.map((rule, index) => (
                  <li key={rule} className="flex gap-3">
                    <span
                      className="grid size-5 shrink-0 place-items-center rounded-full bg-secondary text-[0.65rem] font-semibold text-secondary-foreground"
                      aria-hidden="true"
                    >
                      {index + 1}
                    </span>
                    {rule}
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-xs text-muted-foreground">
                Posting, replying, and moderation actions become live once the anonymous community database
                is connected.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
