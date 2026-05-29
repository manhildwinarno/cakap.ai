"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth custom easeOutQuint curve
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Run the animation frame loop
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Intercept local anchor clicks for standard animated scroll with sticky navbar offset
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (!anchor) return;

      const href = anchor.getAttribute("href");

      // Check if it's a hash anchor for the current page
      if (
        href &&
        (href.startsWith("#") ||
          href.startsWith("/#") ||
          (anchor.hash && anchor.origin === window.location.origin))
      ) {
        const hash = anchor.hash || href.substring(href.indexOf("#"));
        if (!hash) return;

        // Find the element on the current page
        const targetElement = document.querySelector(hash);
        if (targetElement && targetElement instanceof HTMLElement) {
          e.preventDefault();

          // Scroll to the target with offset to accommodate the sticky navbar
          lenis.scrollTo(targetElement, {
            offset: -80, // Dynamic offset for perfect visual breathing room
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });

          // Update URL hash without causing a page jump
          window.history.pushState(null, "", hash);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    // Cleanup on component unmount
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return <>{children}</>;
}
