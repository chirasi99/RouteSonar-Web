// src/components/News.tsx
import React from "react";
import type { NewsPost } from "../types";

const fmt = (d: string) => {
  try { return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }); }
  catch { return d; }
};

const News: React.FC<{ data: NewsPost[] }> = ({ data }) => {
  if (!data?.length) return null;
  return (
    <section id="news" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="rs-reveal text-center mb-16">
          <span className="section-eyebrow">Press & Updates</span>
          <h2 className="section-title">Latest News</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.map((post, i) => (
            <a key={post.id} href={post.link || "#"}
              target={post.link && post.link !== "#" ? "_blank" : "_self"} rel="noreferrer"
              className={`rs-reveal rs-d${i + 1} glow-card group bg-[#0c1628] border border-white/[.06] rounded-2xl p-7 flex flex-col gap-3`}>
              <span className="text-[#38b2f8] text-[.7rem] font-black uppercase tracking-[.14em]">{fmt(post.date)}</span>
              <h3 className="font-display text-[1rem] font-black text-white leading-snug tracking-tight group-hover:text-[#10d9a0] transition-colors duration-200">
                {post.title}
              </h3>
              <p className="text-[.875rem] text-slate-400 leading-relaxed flex-1">{post.excerpt}</p>
              <div className="flex items-center gap-1.5 text-[#38b2f8] text-[.82rem] font-black mt-1 group-hover:gap-3 transition-all duration-200 tracking-wide">
                Read more
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;
