// src/components/Navbar.tsx
import React, { useState, useEffect } from "react";
import type { NavbarData } from "../types";

const Navbar: React.FC<{ data: NavbarData }> = ({ data }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);
  const { logo, ctaText, ctaLink, links } = data;

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 44);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
      scrolled ? "py-3 bg-[#060d18]/85 backdrop-blur-2xl border-b border-white/[.05] shadow-2xl shadow-black/40"
               : "py-6 bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center gap-10">

        {/* Logo */}
        <a href="#home" className="flex items-center gap-0.5 shrink-0 group">
          <span className="font-display text-[1.3rem] font-black tracking-tight text-white group-hover:text-[#10d9a0] transition-colors duration-200">
            {logo}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#10d9a0] mb-3.5 dot-pulse" />
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 mx-auto">
          {links.map((l, i) => (
            <li key={i}>
              <a href={l.href}
                className="relative text-[.84rem] font-medium text-slate-400 hover:text-white transition-colors duration-200
                           after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-px after:bg-[#10d9a0] after:transition-all after:duration-300 hover:after:w-full">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a href={ctaLink} target="_blank" rel="noreferrer"
          className="hidden md:inline-flex items-center gap-2 bg-[#10d9a0] hover:bg-[#0db88a] text-[#060d18] text-[.83rem] font-black px-5 py-2.5 rounded-lg
                     transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#10d9a0]/30 shrink-0 tracking-wide">
          {ctaText}
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.8} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
          </svg>
        </a>

        {/* Burger */}
        <button className="md:hidden ml-auto p-1.5 text-slate-300" onClick={() => setOpen(o => !o)} aria-label="Menu">
          {open
            ? <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>
            : <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/></svg>}
        </button>
      </div>

      {open && (
        <div className="md:hidden absolute inset-x-0 top-full bg-[#060d18]/96 backdrop-blur-2xl border-b border-white/[.05] px-6 py-7 flex flex-col gap-5">
          {links.map((l, i) => (
            <a key={i} href={l.href} onClick={() => setOpen(false)}
              className="text-[.95rem] font-medium text-slate-300 hover:text-white transition-colors">{l.label}</a>
          ))}
          <a href={ctaLink} target="_blank" rel="noreferrer"
            className="flex justify-center bg-[#10d9a0] text-[#060d18] font-black px-5 py-3 rounded-lg text-[.88rem] tracking-wide">
            {ctaText}
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
