import type Lenis from "lenis";

declare global {
  interface Window {
    /**
     * The Lenis instance driving the page, set by <SmoothScroll /> and absent
     * when the visitor asked for reduced motion. Namespaced away from
     * `window.lenis`, which the library itself uses for feature detection.
     */
    __lenis?: Lenis;
  }
}

export {};
