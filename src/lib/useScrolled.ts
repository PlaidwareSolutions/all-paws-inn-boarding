"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

/**
 * Scroll position is external browser state, so it belongs in a store
 * subscription rather than an effect that mirrors it into React state.
 * The server snapshot is `false`, which is the correct pre-scroll state.
 */
export function useScrolled(threshold: number): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.scrollY > threshold,
    () => false,
  );
}
