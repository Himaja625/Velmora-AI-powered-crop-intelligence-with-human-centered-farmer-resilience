import { Link } from "@tanstack/react-router";
import { Sprout } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border/70 bg-sand/60">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground"
              aria-hidden="true"
            >
              <Sprout className="size-4" />
            </span>
            <span className="font-display text-lg font-semibold">Velmora</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Velmora turns field observations, location, and weather into guidance a farmer can act on —
            and listens when the season gets heavy.
          </p>
        </div>

        <nav aria-label="Footer product links">
          <h2 className="font-display text-sm font-semibold">Product</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/field-scan" className="rounded hover:text-foreground">
                Field Scan
              </Link>
            </li>
            <li>
              <Link to="/advisory" className="rounded hover:text-foreground">
                Advisory
              </Link>
            </li>
            <li>
              <Link to="/talk" className="rounded hover:text-foreground">
                Talk to Velmora
              </Link>
            </li>
            <li>
              <Link to="/community" className="rounded hover:text-foreground">
                Community
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-sm font-semibold">Important</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Velmora is an AI support tool. It does not replace qualified agricultural advice, veterinary
            or medical care, or professional mental-health support.
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            Prototype: advisory, weather, and community content shown is clearly labeled demo data.
          </p>
        </div>
      </div>
    </footer>
  );
}
