// src/components/Steps.tsx
import React from "react";
import type { StepsData } from "../types";

const TAG_STYLES = [
  "text-[#10d9a0] bg-[#10d9a0]/[.08] border-[#10d9a0]/20",
  "text-[#38b2f8] bg-[#38b2f8]/[.08] border-[#38b2f8]/20",
  "text-violet-400 bg-violet-400/[.08] border-violet-400/20",
  "text-amber-400  bg-amber-400/[.08]  border-amber-400/20",
  "text-rose-400   bg-rose-400/[.08]   border-rose-400/20",
];

const Steps: React.FC<{ data: StepsData }> = ({ data }) => (
  <section id="steps" className="relative py-28 bg-[#060d18]">
    <div className="accent-line" />
    <div className="max-w-7xl mx-auto px-6">
      <div className="rs-reveal text-center mb-16">
        <span className="section-eyebrow">Our Process</span>
        <h2 className="section-title mb-4">{data.title}</h2>
        <p className="section-sub max-w-lg mx-auto">{data.subtitle}</p>
      </div>

      {/* Two-column layout on large screens like optimizenow.ai */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-5 max-w-5xl mx-auto">
        {data.items.map((item, i) => (
          <div key={i}
            className={`rs-reveal rs-d${(i % 2) + 1} glow-card bg-[#0c1628] border border-white/[.06] rounded-2xl p-7 flex gap-5 cursor-default
                        ${i === data.items.length - 1 && data.items.length % 2 !== 0 ? "lg:col-span-2 lg:max-w-[calc(50%-10px)] lg:mx-auto w-full" : ""}`}>

            {/* Step circle */}
            <div className="shrink-0 mt-0.5">
              <div className="w-12 h-12 rounded-full bg-[#060d18] border-2 border-[#10d9a0]/40 ring-pulse
                              flex items-center justify-center font-display font-black text-[#10d9a0] text-[1.05rem]">
                {item.step}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className={`inline-flex w-fit border text-[.62rem] font-black uppercase tracking-[.14em] px-2.5 py-1 rounded-full ${TAG_STYLES[i % TAG_STYLES.length]}`}>
                {item.tag}
              </span>
              <h3 className="font-display text-[1.05rem] font-black text-white tracking-tight">{item.title}</h3>
              <p className="text-[.875rem] text-slate-400 leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[.05] to-transparent" />
  </section>
);

export default Steps;
