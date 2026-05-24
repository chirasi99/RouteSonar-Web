// src/hooks/useReveal.ts
// Adds `.rs-visible` to every `.rs-reveal` element when it scrolls into view.
// Re-runs whenever `deps` changes (pass [data] from App so it fires after Firestore loads).
import { useEffect } from "react";

const useReveal = (deps: unknown[] = []) => {
  useEffect(() => {
    // Small delay so the DOM has painted after state update
    const timer = setTimeout(() => {
      const els = document.querySelectorAll<HTMLElement>(".rs-reveal:not(.rs-visible)");
      if (!els.length) return;

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("rs-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
      );

      els.forEach((el) => io.observe(el));
      // Also immediately reveal anything already in viewport
      els.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add("rs-visible");
        }
      });

      return () => io.disconnect();
    }, 100);

    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useReveal;
