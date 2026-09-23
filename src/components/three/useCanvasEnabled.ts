"use client";

import { useEffect, useState } from "react";
import { deviceTier, supportsWebGL } from "@/lib/webgl";

export type CanvasState = {
  /** True once we know WebGL works and the visitor hasn't asked for less motion. */
  enabled: boolean;
  tier: "low" | "high";
};

/**
 * Decides whether a 3D scene should mount at all.
 *
 * Deliberately returns `enabled: false` on the first render, even on capable
 * machines: the check touches the DOM, so it cannot run during SSR, and
 * flipping it in an effect keeps the server HTML and the first client render
 * identical. The static fallback is therefore what gets exported to GitHub
 * Pages — which is also what a crawler sees.
 */
export function useCanvasEnabled(): CanvasState {
  const [state, setState] = useState<CanvasState>({ enabled: false, tier: "high" });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const evaluate = () => {
      setState({
        enabled: !reduced.matches && supportsWebGL(),
        tier: deviceTier(),
      });
    };

    evaluate();
    reduced.addEventListener("change", evaluate);
    return () => reduced.removeEventListener("change", evaluate);
  }, []);

  return state;
}
