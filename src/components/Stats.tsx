// src/components/Stats.tsx
import React, { useEffect, useRef, useState } from "react";
import type { StatsData, StatItem } from "../types";

/* ── Animated counter ───────────────────────────────────────────────────── */
const CountUp: React.FC<{ target: number; suffix: string }> = ({
  target,
  suffix,
}) => {
  const [display, setDisplay] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    // Coerce — Firestore console sometimes saves numbers as strings
    const end = typeof target === "string" ? parseFloat(target as any) : target;
    if (!end || isNaN(end)) return;

    const el = wrapRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        io.disconnect();

        const DURATION = 1800;
        const startTs = performance.now();

        const tick = (now: number) => {
          const p = Math.min((now - startTs) / DURATION, 1);
          const ease = 1 - Math.pow(1 - p, 3); // cubic ease-out
          setDisplay(Math.round(ease * end));
          if (p < 1) requestAnimationFrame(tick);
          else setDisplay(end);
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return (
    <div
      ref={wrapRef}
      className="font-black leading-none select-none stat-text font-display"
      style={{ fontSize: "clamp(3rem, 5.5vw, 4.8rem)" }}
    >
      {display}
      {suffix}
    </div>
  );
};

/* ── Single stat card ───────────────────────────────────────────────────── */
const StatCard: React.FC<{ item: StatItem; index: number }> = ({
  item,
  index,
}) => {
  const num =
    typeof item.value === "string" ? parseFloat(item.value as any) : item.value;
  const suffix = item.suffix ?? "";
  const label = item.label ?? "";

  return (
    <div className="relative flex flex-col items-center justify-center px-8 text-center cursor-default group py-14">
      {/* Vertical divider between cards (desktop) */}
      {index > 0 && (
        <div
          className="absolute left-0 top-8 bottom-8 w-px
                        bg-gradient-to-b from-transparent via-slate-900/[.08] to-transparent
                        hidden sm:block"
        />
      )}

      {/* Animated number */}
      <CountUp target={num} suffix={suffix} />

      {/* Teal underline accent */}
      <div
        className="w-12 h-[2px] rounded-full mt-5 mb-4
                      bg-gradient-to-r from-transparent via-[#0a3d91]/60 to-transparent
                      group-hover:via-[#0a3d91] transition-all duration-500"
      />

      {/* Label */}
      <p
        className="text-[.72rem] font-black uppercase tracking-[.18em]
                    text-slate-500 group-hover:text-slate-700
                    transition-colors duration-300"
      >
        {label}
      </p>
    </div>
  );
};

/* ── Section ────────────────────────────────────────────────────────────── */
const Stats: React.FC<{ data: StatsData }> = ({ data }) => {
  const items: StatItem[] = Array.isArray(data?.items) ? data.items : [];

  return (
    <section
      className="relative overflow-hidden border-y border-slate-900/[.06]"
      style={{ background: "#f5f7fa" }}
    >
      {/* Top accent */}
      <div
        className="absolute top-0 inset-x-0 h-px
                      bg-gradient-to-r from-transparent via-[#0a3d91]/40 to-transparent"
      />

      {/* Faint horizontal rule texture */}
      <div
        className="absolute inset-0 opacity-[.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(0deg, rgba(15,23,42,1) 1px, transparent 1px)",
          backgroundSize: "100% 72px",
        }}
      />

      {/* Soft centre glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[700px] h-[180px] rounded-full blur-[90px] pointer-events-none
                      bg-[#0a3d91]/[.04]"
      />

      <div className="relative px-6 mx-auto max-w-7xl">
        {items.length > 0 ? (
          <div
            className={`grid grid-cols-1 sm:grid-cols-${Math.min(items.length, 3)}
                           divide-y sm:divide-y-0 divide-slate-900/[.06]`}
          >
            {items.map((item, i) => (
              <StatCard key={i} item={item} index={i} />
            ))}
          </div>
        ) : (
          // Fallback skeleton while Firestore loads
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 divide-slate-900/[.06]">
            {[
              { value: 100, suffix: "M+", label: "Road Miles Saved" },
              { value: 20, suffix: "%", label: "Average Savings Generated" },
              { value: 10, suffix: "K+", label: "Vehicles Optimised" },
            ].map((item, i) => (
              <StatCard key={i} item={item as StatItem} index={i} />
            ))}
          </div>
        )}
      </div>

      {/* Bottom accent */}
      <div
        className="absolute bottom-0 inset-x-0 h-px
                      bg-gradient-to-r from-transparent via-slate-900/[.06] to-transparent"
      />
    </section>
  );
};

export default Stats;
