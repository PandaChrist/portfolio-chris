let cached: boolean | null = null;

/**
 * Whether this browser can actually give us a WebGL context. Checked once and
 * memoised — creating throwaway contexts is not free, and some browsers cap how
 * many can exist at a time.
 */
export function supportsWebGL(): boolean {
  if (cached !== null) return cached;
  if (typeof window === "undefined") return false;

  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ??
      canvas.getContext("webgl") ??
      canvas.getContext("experimental-webgl");
    cached = Boolean(gl);

    // Release the context immediately; we only wanted the answer.
    if (gl && "getExtension" in gl) {
      (gl as WebGLRenderingContext).getExtension("WEBGL_lose_context")?.loseContext();
    }
  } catch {
    cached = false;
  }

  return cached;
}

/**
 * A coarse device tier, used to scale down particle counts and pixel ratio on
 * phones and low-core machines rather than dropping the scene entirely.
 */
export function deviceTier(): "low" | "high" {
  if (typeof window === "undefined") return "high";

  const cores = navigator.hardwareConcurrency ?? 4;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const narrow = window.innerWidth < 768;

  return cores <= 4 || (coarse && narrow) ? "low" : "high";
}
