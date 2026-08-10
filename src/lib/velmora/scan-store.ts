import type { Advisory, ScanSubmission } from "./types";

/**
 * Session-scoped store for the current field scan and its advisory.
 *
 * Uses sessionStorage so a farmer can refresh the Advisory page without losing
 * the scan, while nothing persists beyond the session. Swap for a database-backed
 * record when accounts exist.
 */

const SCAN_KEY = "velmora:scan";
const ADVISORY_KEY = "velmora:advisory";

function read<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — advisory simply won't survive a refresh */
  }
}

export function saveScanSession(submission: ScanSubmission, advisory: Advisory) {
  write(SCAN_KEY, submission);
  write(ADVISORY_KEY, advisory);
}

export function loadScanSession() {
  return {
    submission: read<ScanSubmission>(SCAN_KEY),
    advisory: read<Advisory>(ADVISORY_KEY),
  };
}

export function clearScanSession() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(SCAN_KEY);
  window.sessionStorage.removeItem(ADVISORY_KEY);
}
