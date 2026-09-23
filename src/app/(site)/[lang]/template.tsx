"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Page transition.
 *
 * `template.tsx` remounts on every navigation (unlike `layout.tsx`), which is
 * what gives us an entrance animation per route. A curtain wipes up off the new
 * page while its content settles in behind it.
 *
 * There is no exit animation on purpose: the App Router unmounts the old route
 * before the new one renders, so an exit would need the whole tree held in an
 * AnimatePresence above the router — a lot of machinery for a frame nobody sees.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  useEffect(() => {
    // Lenis keeps its own scroll position across client navigations, so a new
    // route would otherwise open halfway down the page.
    window.__lenis?.scrollTo(0, { immediate: true });
  }, [pathname]);

  if (reduced) return <>{children}</>;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[65] bg-accent"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        style={{ originY: 0 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
