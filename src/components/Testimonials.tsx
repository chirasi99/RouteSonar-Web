// src/components/Testimonials.tsx
import React from "react";
import type { TestimonialsData, TestimonialItem } from "../types";

const GRADIENTS = [
  "from-[#10d9a0] to-teal-600",
  "from-[#38b2f8] to-indigo-500",
  "from-violet-400 to-purple-700",
  "from-amber-400 to-orange-600",
];

const Card: React.FC<{ item: TestimonialItem; index: number }> = ({ item, index }) => (
  <div className={`rs-reveal rs-d${(index % 2) + 1} glow-card bg-[#0c1628] border border-white/[.06] rounded-2xl p-7 flex flex-col gap-5 cursor-default`}>
    <svg className="w-7 h-5 opacity-35" style={{ fill: "#10d9a0" }} viewBox="0 0 32 24">
      <path d="M0 24V14.4C0 6.8 4.8 2.2 14.4 0l1.6 2.8C11.2 4 8.4 6.6 8 10.4H14V24H0zm18 0V14.4C18 6.8 22.8 2.2 32.4 0L34 2.8C29.2 4 26.4 6.6 26 10.4H32V24H18z"/>
    </svg>
    <p className="text-[.9rem] text-slate-300 leading-[1.85] italic flex-1">"{item.quote}"</p>
    <div className="flex items-center gap-3 pt-3 border-t border-white/[.05]">
      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${GRADIENTS[index % GRADIENTS.length]}
                       flex items-center justify-center font-display font-black text-[#060d18] text-sm shrink-0`}>
        {item.name.charAt(0)}
      </div>
      <div>
        <div className="text-white font-black text-[.875rem] font-display tracking-tight">{item.name}</div>
        <div className="text-slate-500 text-[.77rem]">{item.role}</div>
      </div>
    </div>
  </div>
);

const Testimonials: React.FC<{ data: TestimonialsData }> = ({ data }) => (
  <section className="relative py-28 bg-[#060d18]">
    <div className="accent-line" />
    <div className="max-w-7xl mx-auto px-6">
      <div className="rs-reveal text-center mb-16">
        <span className="section-eyebrow">Testimonials</span>
        <h2 className="section-title">{data.title}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data.items.map((item, i) => <Card key={i} item={item} index={i} />)}
      </div>
    </div>
    <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[.05] to-transparent" />
  </section>
);

export default Testimonials;
