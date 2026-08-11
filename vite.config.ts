// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only; preset hard-pinned to "vercel" via the nitro option below), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // Hard-pin the Nitro deployment target to Vercel.
  // Without this the default preset is "cloudflare-module", which produces
  // a Cloudflare Workers bundle that fails on Vercel's Node.js runtime
  // with "createCsrfMiddleware is not a function" and similar ESM errors.
  nitro: {
    preset: "vercel",
  },
});
