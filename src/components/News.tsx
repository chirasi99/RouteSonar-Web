// src/components/News.tsx
import React from "react";
import type { NewsPost } from "../types";

const fmt = (d: string) => {
  try {
    return new Date(d).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return d;
  }
};

const News: React.FC<{ data: NewsPost[] }> = ({ data }) => {
  if (!data?.length) return null;
  return (
    <section id="news" className="relative bg-white py-28">
      <div className="px-6 mx-auto max-w-7xl">
        <div className="mb-16 text-center rs-reveal">
          <span className="section-eyebrow">Press & Updates</span>
          <h2 className="section-title">Latest News</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {data.map((post, i) => (
            <a
              key={post.id}
              href={post.link || "#"}
              target={post.link && post.link !== "#" ? "_blank" : "_self"}
              rel="noreferrer"
              className={`rs-reveal rs-d${i + 1} glow-card group bg-white border border-slate-900/[.07] shadow-sm rounded-2xl p-7 flex flex-col gap-3`}
            >
              <span className="text-[#1c6fd6] text-[.7rem] font-black uppercase tracking-[.14em]">
                {fmt(post.date)}
              </span>
              <h3 className="font-display text-[1rem] font-black text-slate-900 leading-snug tracking-tight group-hover:text-[#0a3d91] transition-colors duration-200">
                {post.title}
              </h3>
              <p className="text-[.875rem] text-slate-600 leading-relaxed flex-1">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-1.5 text-[#1c6fd6] text-[.82rem] font-black mt-1 group-hover:gap-3 transition-all duration-200 tracking-wide">
                Read more
                <svg
                  className="w-3.5 h-3.5"
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
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;
