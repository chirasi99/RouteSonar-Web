// src/components/Clients.tsx
import React, { useState, useMemo, useCallback, useEffect } from "react";
import type { ClientsData, ClientLogo } from "../types";

const VISIBLE_DESKTOP = 5;

const Clients: React.FC<{ data: ClientsData }> = ({ data }) => {
  const logos = useMemo(() => (Array.isArray(data?.logos) ? data.logos : []), [data]);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(VISIBLE_DESKTOP);

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w < 640) setVisible(2);
      else if (w < 1024) setVisible(3);
      else setVisible(VISIBLE_DESKTOP);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const maxIndex = Math.max(0, logos.length - visible);

  const next = useCallback(() => {
    setIndex((i) => (i >= maxIndex ? 0 : i + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setIndex((i) => (i <= 0 ? maxIndex : i - 1));
  }, [maxIndex]);

  // Auto-advance every 3.5s, pauses implicitly if user is interacting via hover
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || logos.length <= visible) return;
    const t = setInterval(next, 3500);
    return () => clearInterval(t);
  }, [paused, next, logos.length, visible]);

  if (logos.length === 0) return null;

  const itemWidthPct = 100 / visible;

  return (
    <section className="relative py-24 bg-[#f5f7fa] overflow-hidden">
      <div className="accent-line" />
      <div className="px-6 mx-auto max-w-7xl">
        <div className="text-center rs-reveal mb-14">
          <span className="section-eyebrow">{data.eyebrow || "Trusted By"}</span>
          <h2 className="section-title">{data.title || "Powering fleets across the region"}</h2>
        </div>

        <div
          className="relative rs-reveal rs-d1"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Prev arrow */}
          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 z-10
                       w-11 h-11 rounded-full bg-white border border-slate-900/[.10] shadow-md
                       flex items-center justify-center text-slate-700
                       hover:border-[#0a3d91]/40 hover:text-[#0a3d91] hover:-translate-x-5
                       transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.4} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Track */}
          <div className="mx-8 overflow-hidden sm:mx-12">
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ transform: `translateX(-${index * itemWidthPct}%)` }}
            >
              {logos.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center px-4 py-4 shrink-0 sm:px-6"
                  style={{ width: `${itemWidthPct}%` }}
                >
                  <LogoCard item={item} />
                </div>
              ))}
            </div>
          </div>

          {/* Next arrow */}
          <button
            onClick={next}
            aria-label="Next"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 z-10
                       w-11 h-11 rounded-full bg-white border border-slate-900/[.10] shadow-md
                       flex items-center justify-center text-slate-700
                       hover:border-[#0a3d91]/40 hover:text-[#0a3d91] hover:translate-x-5
                       transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.4} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots */}
        {maxIndex > 0 && (
          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-7 bg-[#0a3d91]" : "w-1.5 bg-slate-900/[.15] hover:bg-slate-900/[.3]"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const LogoCard: React.FC<{ item: ClientLogo }> = ({ item }) => {
  const content = (
    <div
      className="w-full h-28 sm:h-32 flex items-center justify-center rounded-2xl bg-white
                 border border-slate-900/[.06] shadow-sm px-6
                 transition-all duration-300 hover:shadow-lg hover:shadow-[#0a3d91]/[.08]
                 hover:-translate-y-1.5 hover:border-[#0a3d91]/20"
    >
      <img
        src={item.logo}
        alt={item.name}
        title={item.name}
        className="object-contain max-w-full max-h-16 sm:max-h-20"
        draggable={false}
      />
    </div>
  );

  return item.href ? (
    <a href={item.href} target="_blank" rel="noreferrer" className="w-full">
      {content}
    </a>
  ) : (
    content
  );
};

export default Clients;