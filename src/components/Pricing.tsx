// src/components/Pricing.tsx
import React from "react";
import type { PricingData, PricingItem } from "../types";

const Check: React.FC = () => (
  <svg className="w-[15px] h-[15px] text-[#10d9a0] shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
  </svg>
);

const Card: React.FC<{ plan: PricingItem; index: number }> = ({ plan, index }) => (
  <div className={`rs-reveal rs-d${index + 1} glow-card relative flex flex-col rounded-2xl p-7 border cursor-default ${
    plan.popular
      ? "bg-gradient-to-b from-[#0d2920] via-[#0c1628] to-[#0c1628] border-[#10d9a0]/35 shadow-2xl shadow-[#10d9a0]/[.08]"
      : "bg-[#0c1628] border-white/[.06]"
  }`}>

    {plan.popular && (
      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
        <span className="bg-[#10d9a0] text-[#060d18] text-[.66rem] font-black uppercase tracking-widest px-4 py-1.5 rounded-full whitespace-nowrap shadow-lg shadow-[#10d9a0]/30">
          Most Popular
        </span>
      </div>
    )}

    {/* Plan name */}
    <h3 className="font-display text-[1rem] font-black text-white tracking-tight pt-1 mb-4">{plan.name}</h3>

    {/* Price */}
    <div className="flex items-end gap-1.5 mb-3">
      <span className={`font-display font-black tracking-tight leading-none ${plan.popular ? "text-[#10d9a0]" : "text-white"}`}
        style={{ fontSize: "clamp(1.7rem,2.8vw,2.1rem)" }}>
        {plan.price}
      </span>
      {plan.period && (
        <span className="text-slate-500 text-[.68rem] pb-1 leading-tight">/{plan.period}</span>
      )}
    </div>
    <p className="text-[.82rem] text-slate-400 leading-relaxed mb-5">{plan.description}</p>

    <div className="w-full h-px bg-white/[.05] mb-5" />

    {/* Features */}
    <ul className="flex flex-col gap-3 flex-1 mb-7">
      {plan.features.map((f, i) => (
        <li key={i} className="flex items-start gap-2.5 text-[.84rem] text-slate-300">
          <Check />{f}
        </li>
      ))}
    </ul>

    {/* CTA */}
    <a href={plan.ctaLink}
      target={plan.ctaLink.startsWith("http") ? "_blank" : "_self"} rel="noreferrer"
      className={`w-full flex items-center justify-center font-black text-[.83rem] tracking-wide py-3.5 rounded-xl
                  transition-all duration-200 hover:-translate-y-0.5 ${
        plan.popular
          ? "bg-[#10d9a0] hover:bg-[#0db88a] text-[#060d18] shadow-lg shadow-[#10d9a0]/20 hover:shadow-[#10d9a0]/35"
          : "bg-white/[.04] hover:bg-white/[.08] text-white border border-white/[.1] hover:border-[#10d9a0]/25"
      }`}>
      {plan.ctaText}
    </a>
  </div>
);

const Pricing: React.FC<{ data: PricingData }> = ({ data }) => (
  <section id="pricing" className="py-28 relative">
    <div className="max-w-7xl mx-auto px-6">
      <div className="rs-reveal text-center mb-16">
        <span className="section-eyebrow">Pricing</span>
        <h2 className="section-title mb-4">{data.title}</h2>
        <p className="section-sub max-w-lg mx-auto">{data.subtitle}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 items-start mt-8">
        {data.items.map((plan, i) => <Card key={i} plan={plan} index={i} />)}
      </div>
    </div>
  </section>
);

export default Pricing;
