// src/components/Footer.tsx
import React from "react";
import type { FooterData } from "../types";

const SOCIAL: Record<string, React.ReactNode> = {
  LinkedIn: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>,
  Twitter:  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>,
  YouTube:  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#060d18"/></svg>,
};

const Footer: React.FC<{ data: FooterData }> = ({ data }) => {
  const { logo, tagline, email, phone, address, copyright, links, social } = data;
  return (
    <footer id="contact" className="relative border-t border-white/[.05] bg-[#060d18]">
      <div className="accent-line" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-[1.7fr_1fr] gap-16 py-16">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-0.5 mb-4">
              <span className="font-display text-[1.4rem] font-black text-white tracking-tight">{logo}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#10d9a0] mb-3.5 dot-pulse" />
            </div>
            <p className="text-slate-400 text-[.875rem] leading-relaxed max-w-xs mb-7">{tagline}</p>
            <div className="flex gap-2.5">
              {social?.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noreferrer" aria-label={s.platform}
                  className="w-9 h-9 rounded-lg bg-[#0c1628] hover:bg-[#10d9a0]/[.1] border border-white/[.06] hover:border-[#10d9a0]/30
                             flex items-center justify-center text-slate-400 hover:text-[#10d9a0] transition-all duration-200">
                  {SOCIAL[s.platform]}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[.66rem] font-black uppercase tracking-[.18em] text-slate-500 mb-6">Contact Us</h4>
            <div className="flex flex-col gap-4">
              {[
                { href: `mailto:${email}`, icon: "email", val: email },
                { href: `tel:${phone}`,    icon: "phone", val: phone },
              ].map(({ href, icon, val }) => val && (
                <a key={icon} href={href}
                  className="flex items-start gap-3 text-[.875rem] text-slate-400 hover:text-[#10d9a0] transition-colors group">
                  {icon === "email"
                    ? <svg className="w-4 h-4 mt-0.5 shrink-0 text-slate-600 group-hover:text-[#10d9a0] transition-colors" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"/></svg>
                    : <svg className="w-4 h-4 mt-0.5 shrink-0 text-slate-600 group-hover:text-[#10d9a0] transition-colors" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"/></svg>
                  }
                  {val}
                </a>
              ))}
              {address && (
                <div className="flex items-start gap-3 text-[.875rem] text-slate-400">
                  <svg className="w-4 h-4 mt-0.5 shrink-0 text-slate-600" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/>
                  </svg>
                  <span className="leading-relaxed">{address}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-white/[.05] py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[.76rem] text-slate-500">
          <span>{copyright}</span>
          <div className="flex gap-6">
            {links?.map((l, i) => (
              <a key={i} href={l.href} className="hover:text-slate-300 transition-colors">{l.label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
