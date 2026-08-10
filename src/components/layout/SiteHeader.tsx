import { Link } from "@tanstack/react-router";
import { Menu, Sprout } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/field-scan", label: "Field Scan" },
  { to: "/advisory", label: "Advisory" },
  { to: "/talk", label: "Talk to Velmora" },
  { to: "/community", label: "Community" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Link
          to="/"
          className="flex min-w-0 items-center gap-2.5 rounded-md"
          aria-label="Velmora home"
        >
          <span
            className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground"
            aria-hidden="true"
          >
            <Sprout className="size-5" />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-lg leading-none font-semibold">Velmora</span>
            <span className="hidden text-[0.7rem] text-muted-foreground sm:block">
              Know your field. Know your next step.
            </span>
          </span>
        </Link>

        <nav aria-label="Main" className="ml-auto hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground data-[status=active]:bg-accent data-[status=active]:text-accent-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/field-scan">Scan My Field</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open navigation menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="font-display text-lg">Velmora</SheetTitle>
              <nav aria-label="Mobile" className="mt-6 grid gap-1">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    activeOptions={{ exact: item.to === "/" }}
                    className="rounded-md px-3 py-2.5 text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground data-[status=active]:bg-accent data-[status=active]:text-accent-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <Button asChild className="mt-6 w-full" onClick={() => setOpen(false)}>
                <Link to="/field-scan">Scan My Field</Link>
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
