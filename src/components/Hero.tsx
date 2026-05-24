// src/components/Hero.tsx
import React, { useEffect, useState } from "react";
import type { HeroData } from "../types";

const Hero: React.FC<{ data: HeroData }> = ({ data }) => {

  // ── Trigger entrance animation only after component mounts with data ──
  // This prevents the fade-up from running before Firebase data arrives.
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(t);
  }, []);

  // ── Defensive field extraction ─────────────────────────────────────────
  const badge            = data?.badge            ?? "";
  const headline         = data?.headline         ?? "";
  const subheadline      = data?.subheadline      ?? "";
  const ctaPrimary       = data?.ctaPrimary       ?? "Get Started Free";
  const ctaPrimaryLink   = data?.ctaPrimaryLink   ?? "https://beta.routesonar.com";
  const ctaSecondary     = data?.ctaSecondary     ?? "See How It Works";
  const ctaSecondaryLink = data?.ctaSecondaryLink ?? "#steps";
  const pressLabel       = data?.pressLabel       ?? "";
  const pressItems: string[] = Array.isArray(data?.pressItems)
    ? (data.pressItems as unknown[]).map(String)
    : [];

  // Animate class — only applied once `ready` is true
  const afu = (delay: string) =>
    ready ? `afu ${delay}` : "opacity-0";

  // ── Render headline — colourise the "…" ───────────────────────────────
  const renderHeadline = (text: string) => {
    if (!text.includes("…")) return <>{text}</>;
    return (
      <>
        {text.split("…").map((part, i, arr) => (
          <React.Fragment key={i}>
            {part}
            {i < arr.length - 1 && (
              <span className="text-[#10d9a0]">…</span>
            )}
          </React.Fragment>
        ))}
      </>
    );
  };

  return (
    <section
      id="home"
      className="relative flex items-center min-h-screen overflow-hidden"
    >

      {/* ── Dot-grid ─────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          maskImage: "radial-gradient(ellipse 75% 65% at 50% 45%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 75% 65% at 50% 45%, black 30%, transparent 100%)",
        }}
      />

      {/* ── Ambient glows ────────────────────────────────────────────── */}
      <div className="absolute top-[15%] left-1/2 -translate-x-1/2
                      w-[900px] h-[550px] rounded-full blur-[130px] pointer-events-none
                      bg-[#10d9a0]/[.07]" />
      <div className="absolute top-[40%] right-[-8%]
                      w-[480px] h-[380px] rounded-full blur-[110px] pointer-events-none
                      bg-[#38b2f8]/[.05]" />
      <div className="absolute bottom-[5%] left-[-5%]
                      w-[320px] h-[320px] rounded-full blur-[90px] pointer-events-none
                      bg-[#10d9a0]/[.04]" />

      {/* ── Main content ─────────────────────────────────────────────── */}
      <div className="relative flex flex-col items-center w-full px-6 pb-24 mx-auto text-center max-w-7xl pt-36">

        {/* Badge */}
        <div className={`${afu("afu-d0")} inline-flex items-center gap-2.5 w-fit
                         bg-[#10d9a0]/[.09] border border-[#10d9a0]/25
                         text-[#10d9a0] text-[.68rem] font-black uppercase tracking-[.18em]
                         px-4 py-2 rounded-full mb-8 backdrop-blur-sm`}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#10d9a0] dot-pulse shrink-0" />
          {badge || "AI-Powered Route Optimization"}
        </div>

        {/* Headline */}
        <h1
          className={`${afu("afu-d1")} font-display font-black text-white
                      leading-[.95] tracking-tight mb-7 max-w-5xl w-full`}
          style={{ fontSize: "clamp(2.6rem, 7vw, 5.6rem)" }}
        >
          {headline
            ? renderHeadline(headline)
            : "GET WISE… OPTIMIZE YOUR ROUTES."}
        </h1>

        {/* Subheadline */}
        <p
          className={`${afu("afu-d2")} text-slate-400 max-w-2xl leading-relaxed mb-12`}
          style={{ fontSize: "clamp(.98rem, 2vw, 1.15rem)" }}
        >
          {subheadline || "We help fleets optimise, decarbonise and transform using powerful AI algorithms."}
        </p>

        {/* ── CTA Buttons ──────────────────────────────────────────── */}
        <div className={`${afu("afu-d3")} flex flex-col sm:flex-row gap-4 mb-16`}>

          {/* Primary CTA */}
          <a
            href={ctaPrimaryLink}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center justify-center gap-2.5
                       bg-[#10d9a0] hover:bg-[#0db88a] text-[#060d18]
                       font-black text-[.95rem] tracking-wide
                       px-10 py-4 rounded-xl
                       transition-all duration-200
                       hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#10d9a0]/25"
          >
            {ctaPrimary}
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none" stroke="currentColor" strokeWidth={2.8} viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </a>

          {/* Secondary CTA */}
          <a
            href={ctaSecondaryLink}
            className="inline-flex items-center justify-center gap-2.5
                       bg-white/[.05] hover:bg-white/[.09] text-white
                       border border-white/[.12] hover:border-[#10d9a0]/35
                       font-semibold text-[.95rem]
                       px-10 py-4 rounded-xl backdrop-blur-sm
                       transition-all duration-200 hover:-translate-y-1"
          >
            <svg className="w-5 h-5 text-[#10d9a0]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5.14v14l11-7-11-7z" />
            </svg>
            {ctaSecondary}
          </a>
        </div>

        {/* ── Press bar ────────────────────────────────────────────── */}
        {(pressLabel || pressItems.length > 0) && (
          <div className={`${afu("afu-d4")} flex flex-wrap items-center justify-center gap-4`}>
            {pressLabel && (
              <span className="text-[.68rem] font-bold uppercase tracking-[.16em] text-slate-500">
                {pressLabel}
              </span>
            )}
            {pressLabel && pressItems.length > 0 && (
              <span className="w-px h-3 bg-slate-700 shrink-0" />
            )}
            {pressItems.map((item, i) => (
              <span
                key={i}
                className="text-[.78rem] font-black text-slate-300
                           bg-[#0c1628]/80 border border-white/[.08]
                           hover:border-[#10d9a0]/30 hover:text-[#10d9a0]
                           px-4 py-1.5 rounded-lg cursor-default tracking-wide
                           transition-colors duration-200"
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ── Bottom fade ──────────────────────────────────────────────── */}
      <div className="absolute bottom-0 inset-x-0 h-48
                      bg-gradient-to-t from-[#060d18] to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
