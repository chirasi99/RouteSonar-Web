// src/App.tsx
import React from "react";
import useSiteData from "./hooks/useSiteData";
import useReveal   from "./hooks/useReveal";
import Navbar       from "./components/Navbar";
import Hero         from "./components/Hero";
import Stats        from "./components/Stats";
import Features     from "./components/Features";
import Steps        from "./components/Steps";
import Pricing      from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import News         from "./components/News";
import Footer       from "./components/Footer";

const Loader = () => (
  <div className="min-h-screen bg-[#060d18] flex flex-col items-center justify-center gap-5">
    <div className="relative w-14 h-14">
      <div className="absolute inset-0 rounded-full border-2 border-white/[.06]" />
      <div className="absolute inset-0 rounded-full border-2 border-t-[#10d9a0] animate-spin" />
    </div>
    <p className="text-slate-500 text-[.78rem] font-black uppercase tracking-[.16em]">Loading…</p>
  </div>
);

const ErrorState = ({ message }: { message: string }) => (
  <div className="min-h-screen bg-[#060d18] flex flex-col items-center justify-center gap-4 px-6 text-center">
    <div className="w-14 h-14 rounded-full bg-rose-400/[.1] border border-rose-400/20 flex items-center justify-center">
      <svg className="w-7 h-7 text-rose-400" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"/>
      </svg>
    </div>
    <h2 className="text-xl font-black text-white font-display">Failed to load content</h2>
    <p className="max-w-md text-sm text-slate-400">{message}</p>
    <p className="max-w-md text-xs text-slate-500">
      Check credentials in{" "}
      <code className="bg-[#0c1628] text-[#10d9a0] px-1.5 py-0.5 rounded text-[.82rem]">
        src/firebase/config.ts
      </code>{" "}
      and ensure Firestore read rules are open.
    </p>
  </div>
);

const App: React.FC = () => {
  const { data, loading, error } = useSiteData();
  useReveal([data]);

  if (loading) return <Loader />;
  if (error || !data) return <ErrorState message={error ?? "No data returned."} />;

  return (
    <div className="min-h-screen bg-[#060d18] text-slate-300 font-sans">
      {data.navbar       && <Navbar        data={data.navbar}       />}
      <main>
        {data.hero         && <Hero          data={data.hero}         />}
        {data.stats        && <Stats         data={data.stats}        />}
        {data.features     && <Features      data={data.features}     />}
        {data.steps        && <Steps         data={data.steps}        />}
        {data.pricing      && <Pricing       data={data.pricing}      />}
        {data.testimonials && <Testimonials  data={data.testimonials} />}
        {data.news?.length  > 0 && <News     data={data.news}         />}
      </main>
      {data.footer       && <Footer        data={data.footer}       />}
    </div>
  );
};

export default App;
