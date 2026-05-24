// src/components/Features.tsx
import React from "react";
import type { FeaturesData, FeatureItem } from "../types";

const ICONS: Record<string, React.ReactNode> = {
  route: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h4l3-9 4 18 3-9h4"/>
    </svg>
  ),
  fleet: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
      <rect x="1" y="11" width="15" height="10" rx="1"/>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 18h2a2 2 0 0 0 2-2v-5l-3-4H5"/>
      <circle cx="5.5" cy="21" r="1.5"/><circle cx="18.5" cy="21" r="1.5"/>
    </svg>
  ),
  analytics: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
      <polyline strokeLinecap="round" strokeLinejoin="round" points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  ),
  sustainability: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
      <path strokeLinecap="round" d="M2 22c1-4 4-6 8-6s7 2 8 6"/>
      <path strokeLinecap="round" d="M12 16V8"/>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12c0-4 4-8 4-8s4 4 4 8"/>
    </svg>
  ),
  realtime: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10"/>
      <polyline strokeLinecap="round" strokeLinejoin="round" points="12 6 12 12 16 14"/>
    </svg>
  ),
  api: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
      <polyline strokeLinecap="round" strokeLinejoin="round" points="16 18 22 12 16 6"/>
      <polyline strokeLinecap="round" strokeLinejoin="round" points="8 6 2 12 8 18"/>
      <line strokeLinecap="round" x1="15" y1="9" x2="9" y2="15"/>
    </svg>
  ),
};

// Per-card accent colours
const ACCENTS = [
  { bg: "bg-[#10d9a0]/[.1]",  text: "text-[#10d9a0]"  },
  { bg: "bg-[#38b2f8]/[.1]",  text: "text-[#38b2f8]"  },
  { bg: "bg-violet-400/[.1]", text: "text-violet-400"  },
  { bg: "bg-amber-400/[.1]",  text: "text-amber-400"   },
  { bg: "bg-rose-400/[.1]",   text: "text-rose-400"    },
  { bg: "bg-cyan-400/[.1]",   text: "text-cyan-400"    },
];

const Card: React.FC<{ item: FeatureItem; index: number }> = ({ item, index }) => {
  const ac = ACCENTS[index % ACCENTS.length];
  const delay = `rs-d${(index % 3) + 1}`;
  return (
    <div className={`rs-reveal ${delay} glow-card bg-[#0c1628] border border-white/[.06] rounded-2xl p-7 flex flex-col gap-5 cursor-default`}>
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${ac.bg} ${ac.text}`}>
        {ICONS[item.icon] ?? ICONS.route}
      </div>
      <div>
        <h3 className="font-display text-[1rem] font-black text-white mb-2 tracking-tight">{item.title}</h3>
        <p className="text-[.875rem] text-slate-400 leading-relaxed">{item.description}</p>
      </div>
    </div>
  );
};

const Features: React.FC<{ data: FeaturesData }> = ({ data }) => (
  <section id="features" className="py-28">
    <div className="max-w-7xl mx-auto px-6">
      <div className="rs-reveal text-center mb-16">
        <span className="section-eyebrow">What We Offer</span>
        <h2 className="section-title mb-4">{data.title}</h2>
        <p className="section-sub max-w-lg mx-auto">{data.subtitle}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.items.map((item, i) => <Card key={i} item={item} index={i} />)}
      </div>
    </div>
  </section>
);

export default Features;
