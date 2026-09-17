// src/components/Hero.tsx
import React, { useEffect, useState } from "react";
import type { HeroData } from "../types";

const Hero: React.FC<{ data: HeroData }> = ({ data }) => {
  const [ready, setReady] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(t);
  }, []);

  // ── Defensive field extraction ─────────────────────────────────────────
  const badge = data?.badge ?? "";
  const headline = data?.headline ?? "";
  const subheadline = data?.subheadline ?? "";
  const ctaPrimary = data?.ctaPrimary ?? "Get Started Free";
  const ctaPrimaryLink = data?.ctaPrimaryLink ?? "https://beta.routesonar.com";
  const ctaSecondary = data?.ctaSecondary ?? "See How It Works";
  const ctaSecondaryLink = data?.ctaSecondaryLink ?? "#steps";
  const pressLabel = data?.pressLabel ?? "";
  const pressItems: string[] = Array.isArray(data?.pressItems)
    ? (data.pressItems as unknown[]).map(String)
    : [];

  const isCallLink = ctaPrimaryLink.startsWith("tel:");
  const phoneDisplay = ctaPrimaryLink.replace("tel:", "");

  // Animate class — only applied once `ready` is true
  const afu = (delay: string) => (ready ? `afu ${delay}` : "opacity-0");

  // ── Render headline — colourise the "…" ───────────────────────────────
  const renderHeadline = (text: string) => {
    if (!text.includes("…")) return <>{text}</>;
    return (
      <>
        {text.split("…").map((part, i, arr) => (
          <React.Fragment key={i}>
            {part}
            {i < arr.length - 1 && <span className="text-[#0a3d91]">…</span>}
          </React.Fragment>
        ))}
      </>
    );
  };

  const handlePrimaryClick = (e: React.MouseEvent) => {
    if (isCallLink) {
      e.preventDefault();
      setShowCallModal(true);
    }
  };

  return (
    <section
      id="home"
      className="relative flex items-center min-h-screen overflow-hidden bg-white"
    >
      {/* ── Dot-grid ─────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(15,23,42,0.04) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
          maskImage:
            "radial-gradient(ellipse 75% 65% at 50% 45%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 65% at 50% 45%, black 30%, transparent 100%)",
        }}
      />

      {/* ── Ambient glows ────────────────────────────────────────────── */}
      <div
        className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[900px] h-[550px]
                rounded-full blur-[130px] pointer-events-none bg-[#0a3d91]/[.10]"
      />
      <div
        className="absolute top-[40%] right-[-8%] w-[480px] h-[380px]
                rounded-full blur-[110px] pointer-events-none bg-[#1c6fd6]/[.08]"
      />
      <div
        className="absolute bottom-[5%] left-[-5%] w-[320px] h-[320px]
                rounded-full blur-[90px] pointer-events-none bg-[#0a3d91]/[.06]"
      />
      {/* ── Main content ─────────────────────────────────────────────── */}
      <div className="relative flex flex-col items-center w-full px-6 pb-24 mx-auto text-center max-w-7xl pt-36">
        {/* Badge */}
        <div
          className={`${afu("afu-d0")} inline-flex items-center gap-2.5 w-fit
                         bg-[#0a3d91]/[.06] border border-[#0a3d91]/20
                         text-[#0a3d91] text-[.68rem] font-black uppercase tracking-[.18em]
                         px-4 py-2 rounded-full mb-8`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#0a3d91] dot-pulse shrink-0" />
          {badge || "AI-Powered Route Optimization"}
        </div>

        {/* Headline */}
        <h1
          className={`${afu("afu-d1")} font-display font-black text-slate-900
                      leading-[.95] tracking-tight mb-7 max-w-5xl w-full`}
          style={{ fontSize: "clamp(2.6rem, 7vw, 5.6rem)" }}
        >
          {headline
            ? renderHeadline(headline)
            : "GET WISE… OPTIMIZE YOUR ROUTES."}
        </h1>

        {/* Subheadline */}
        <p
          className={`${afu("afu-d2")} text-slate-600 max-w-2xl leading-relaxed mb-12`}
          style={{ fontSize: "clamp(.98rem, 2vw, 1.15rem)" }}
        >
          {subheadline ||
            "We help fleets optimise, decarbonise and transform using powerful AI algorithms."}
        </p>

        {/* ── CTA Buttons ──────────────────────────────────────────── */}
        <div
          className={`${afu("afu-d3")} flex flex-col sm:flex-row gap-4 mb-16`}
        >
          {/* Primary CTA */}
          <a
            href={ctaPrimaryLink}
            onClick={handlePrimaryClick}
            {...(!isCallLink && { target: "_blank", rel: "noreferrer" })}
            className="group inline-flex items-center justify-center gap-2.5
                       bg-[#0a3d91] hover:bg-[#082f70] text-white
                       font-black text-[.95rem] tracking-wide
                       px-10 py-4 rounded-xl
                       transition-all duration-200
                       hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0a3d91]/20"
          >
            {ctaPrimary}
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.8}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </a>

          {/* Secondary CTA */}
          <a
            href={ctaSecondaryLink}
            className="inline-flex items-center justify-center gap-2.5
                       bg-slate-900/[.03] hover:bg-slate-900/[.06] text-slate-800
                       border border-slate-900/[.12] hover:border-[#0a3d91]/40
                       font-semibold text-[.95rem]
                       px-10 py-4 rounded-xl
                       transition-all duration-200 hover:-translate-y-1"
          >
            <svg
              className="w-5 h-5 text-[#0a3d91]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5.14v14l11-7-11-7z" />
            </svg>
            {ctaSecondary}
          </a>
        </div>

        {/* ── Press bar ────────────────────────────────────────────── */}
        {(pressLabel || pressItems.length > 0) && (
          <div
            className={`${afu("afu-d4")} flex flex-wrap items-center justify-center gap-4`}
          >
            {pressLabel && (
              <span className="text-[.68rem] font-bold uppercase tracking-[.16em] text-slate-500">
                {pressLabel}
              </span>
            )}
            {pressItems.map((item, i) => (
              <span
                key={i}
                className="text-[.78rem] font-black text-slate-700
                           bg-white border border-slate-900/[.10]
                           hover:border-[#0a3d91]/35 hover:text-[#0a3d91]
                           px-4 py-1.5 rounded-lg cursor-default tracking-wide
                           shadow-sm transition-colors duration-200"
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ── Bottom fade ──────────────────────────────────────────────── */}
      <div className="absolute inset-x-0 bottom-0 h-48 pointer-events-none bg-gradient-to-t from-white to-transparent" />
      {/* ── Call confirmation modal ─────────────────────────────────── */}

      {showCallModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm px-6"
          onClick={() => setShowCallModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl border border-slate-900/[.08] w-full max-w-sm p-7 flex flex-col items-center text-center gap-4"
          >
            <div className="w-14 h-14 rounded-full bg-[#0a3d91]/[.1] flex items-center justify-center">
              <svg
                className="w-6 h-6 text-[#0a3d91]"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-black font-display text-slate-900">
              Call RouteSonar
            </h3>
            <p className="text-sm text-slate-600">
              You're about to call{" "}
              <span className="font-bold text-slate-900">{phoneDisplay}</span>{" "}
              to schedule your technical demo.
            </p>
            <div className="flex w-full gap-3 mt-2">
              <button
                onClick={() => setShowCallModal(false)}
                className="flex-1 py-3 rounded-xl border border-slate-900/[.12] text-slate-700 font-bold text-sm hover:bg-slate-900/[.03] transition-colors"
              >
                Cancel
              </button>
              <a
                href={ctaPrimaryLink}
                onClick={() => setShowCallModal(false)}
                className="flex-1 py-3 rounded-xl bg-[#0a3d91] hover:bg-[#082f70] text-white font-bold text-sm text-center transition-colors"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
