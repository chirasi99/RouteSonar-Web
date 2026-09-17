// src/components/Steps.tsx
import React from "react";
import type { StepsData } from "../types";

const TAG_STYLES = [
  "text-[#0a3d91] bg-[#0a3d91]/[.08] border-[#0a3d91]/20",
  "text-[#1c6fd6] bg-[#1c6fd6]/[.08] border-[#1c6fd6]/20",
  "text-violet-700 bg-violet-600/[.08] border-violet-600/20",
  "text-amber-700  bg-amber-500/[.08]  border-amber-500/20",
  "text-rose-700   bg-rose-500/[.08]   border-rose-500/20",
];

const Steps: React.FC<{ data: StepsData }> = ({ data }) => (
  <section id="steps" className="relative bg-white py-28">
    <div className="accent-line" />
    <div className="px-6 mx-auto max-w-7xl">
      <div className="mb-16 text-center rs-reveal">
        <span className="section-eyebrow">Our Process</span>
        <h2 className="mb-4 section-title">{data.title}</h2>
        <p className="max-w-lg mx-auto section-sub">{data.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-5 max-w-5xl mx-auto">
        {data.items.map((item, i) => (
          <div
            key={i}
            className={`rs-reveal rs-d${(i % 2) + 1} glow-card bg-white border border-slate-900/[.07] shadow-sm rounded-2xl p-7 flex gap-5 cursor-default
                        ${i === data.items.length - 1 && data.items.length % 2 !== 0 ? "lg:col-span-2 lg:max-w-[calc(50%-10px)] lg:mx-auto w-full" : ""}`}
          >
            {/* Step circle */}
            <div className="shrink-0 mt-0.5">
              <div
                className="w-12 h-12 rounded-full bg-[#f5f7fa] border-2 border-[#0a3d91]/40 ring-pulse
                              flex items-center justify-center font-display font-black text-[#0a3d91] text-[1.05rem]"
              >
                {item.step}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span
                className={`inline-flex w-fit border text-[.62rem] font-black uppercase tracking-[.14em] px-2.5 py-1 rounded-full ${TAG_STYLES[i % TAG_STYLES.length]}`}
              >
                {item.tag}
              </span>
              <h3 className="font-display text-[1.05rem] font-black text-slate-900 tracking-tight">
                {item.title}
              </h3>
              <p className="text-[.875rem] text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-900/[.06] to-transparent" />
  </section>
);

export default Steps;
