import { createFileRoute, Link } from "@tanstack/react-router";
import { Info, Send, ShieldCheck, Sprout, Users } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { COMMUNITY_SIGNAL } from "@/lib/velmora/community";
import {
  CONVERSATION_STARTERS,
  OPENING_MESSAGE,
  generateVelmoraReply,
  updateContext,
  type ChatMessage,
  type ConversationContext,
} from "@/lib/velmora/conversation";

export const Route = createFileRoute("/talk")({
  head: () => ({
    meta: [
      { title: "Talk to Velmora — Velmora" },
      {
        name: "description",
        content:
          "A private conversation for farmers: describe what is happening in the field or what is weighing on you, and get an attentive, practical response.",
      },
      { property: "og:title", content: "Talk to Velmora" },
      {
        property: "og:description",
        content: "Private, judgement-free conversation built for farmers — practical and human, not a script.",
      },
    ],
  }),
  component: TalkPage,
});

const MAX_LENGTH = 1200;

function TalkPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "opening", role: "velmora", text: OPENING_MESSAGE, at: Date.now() },
  ]);
  const [context, setContext] = useState<ConversationContext>({
    mentionedCrops: [],
    mentionedTopics: [],
    turns: 0,
  });
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [messages, thinking]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) {
      setError("Write a few words about what is happening, and Velmora will respond.");
      return;
    }
    if (trimmed.length > MAX_LENGTH) {
      setError(`Please keep it under ${MAX_LENGTH} characters for now.`);
      return;
    }
    setError(null);
    const nextContext = updateContext(context, trimmed);
    setContext(nextContext);
    setMessages((prev) => [
      ...prev,
      { id: `f-${Date.now()}`, role: "farmer", text: trimmed, at: Date.now() },
    ]);
    setDraft("");
    setThinking(true);

    // Replace this timeout with a server-side LLM call when the model is connected.
    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `v-${Date.now()}`,
          role: "velmora",
          text: generateVelmoraReply(trimmed, nextContext),
          at: Date.now(),
        },
      ]);
      setThinking(false);
    }, 750);
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    send(draft);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-semibold sm:text-4xl">Talk to Velmora</h1>
        <p className="mt-3 text-muted-foreground">
          Field questions and heavier things both belong here. Velmora responds to what you actually wrote —
          no scripts, no motivational filler.
        </p>
      </header>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Card className="border-border/80">
          <CardContent className="flex h-[34rem] flex-col p-0">
            <div
              className="flex-1 space-y-4 overflow-y-auto p-5"
              role="log"
              aria-live="polite"
              aria-label="Conversation with Velmora"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={message.role === "farmer" ? "flex justify-end" : "flex gap-3"}
                >
                  {message.role === "velmora" && (
                    <span
                      className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-leaf-soft text-leaf-deep"
                      aria-hidden="true"
                    >
                      <Sprout className="size-4" />
                    </span>
                  )}
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      message.role === "farmer"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    <span className="sr-only">
                      {message.role === "farmer" ? "You said:" : "Velmora said:"}
                    </span>
                    {message.text}
                  </div>
                </div>
              ))}

              {thinking && (
                <p className="pl-11 text-sm text-muted-foreground">Velmora is reading what you wrote…</p>
              )}
              <div ref={endRef} />
            </div>

            <form onSubmit={onSubmit} className="border-t border-border p-4">
              <label htmlFor="message" className="text-sm font-medium">
                Your message
              </label>
              <Textarea
                id="message"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    send(draft);
                  }
                }}
                maxLength={MAX_LENGTH}
                rows={3}
                placeholder="Tell Velmora what is happening in your field, or what is weighing on you."
                aria-describedby={error ? "message-error" : "message-help"}
                className="mt-2 resize-none"
              />
              <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                <p id="message-help" className="min-w-0 text-xs text-muted-foreground">
                  Enter to send, Shift + Enter for a new line. This conversation stays in your browser.
                </p>
                <Button type="submit" disabled={thinking} className="shrink-0">
                  <Send className="mr-1.5 size-4" aria-hidden="true" />
                  Send
                </Button>
              </div>
              {error && (
                <p id="message-error" role="alert" className="mt-2 text-sm text-destructive">
                  {error}
                </p>
              )}
            </form>
          </CardContent>
        </Card>

        <aside className="space-y-4">
          <Card className="border-border/80 bg-sand/60">
            <CardContent className="p-5">
              <h2 className="text-sm font-semibold">Not sure how to start?</h2>
              <ul className="mt-3 space-y-2">
                {CONVERSATION_STARTERS.map((starter) => (
                  <li key={starter}>
                    <button
                      type="button"
                      onClick={() => send(starter)}
                      className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      {starter}
                    </button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border/80">
            <CardContent className="p-5">
              <h2 className="flex items-center gap-2 text-sm font-semibold">
                <Users className="size-4 text-leaf" aria-hidden="true" />
                You are not alone
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">{COMMUNITY_SIGNAL.supportive}</p>
              <p className="mt-1 text-xs text-muted-foreground">{COMMUNITY_SIGNAL.detail}</p>
              <Button asChild size="sm" variant="outline" className="mt-3">
                <Link to="/community">Open community rooms</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border/80">
            <CardContent className="p-5">
              <h2 className="flex items-center gap-2 text-sm font-semibold">
                <ShieldCheck className="size-4 text-leaf" aria-hidden="true" />
                Field questions welcome too
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                For a specific symptom on a plant, a Field Scan gives Velmora the photo, location, and
                weather it needs to be precise.
              </p>
              <Button asChild size="sm" variant="outline" className="mt-3">
                <Link to="/field-scan">Scan my field</Link>
              </Button>
            </CardContent>
          </Card>

          <p className="flex gap-2 rounded-lg border border-border bg-secondary/50 p-4 text-xs text-muted-foreground">
            <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            Velmora is an AI support tool, not a person, a therapist, or a licensed agronomist. It does not
            diagnose health conditions. For urgent personal or agricultural situations, please contact
            qualified local help. In this prototype no language model is connected yet, so replies are
            generated by clearly labeled demo logic.
          </p>
        </aside>
      </div>
    </div>
  );
}
