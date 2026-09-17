import React, { useState } from "react";
import type { PricingData, PricingPlan } from "../types";

const Check: React.FC = () => (
  <svg
    className="w-[14px] h-[14px] text-[#0a3d91] shrink-0 mt-0.5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

interface CardProps {
  plan: PricingPlan;
  index: number;
  onCtaClick: (plan: PricingPlan) => void;
}

const Card: React.FC<CardProps> = ({ plan, index, onCtaClick }) => (
  <div
    className={`rs-reveal rs-d${index + 1} glow-card relative flex flex-col rounded-2xl p-8 border cursor-default ${
      plan.popular
        ? "bg-gradient-to-b from-[#eef4fc] via-white to-white border-[#0a3d91]/35 shadow-xl shadow-[#0a3d91]/[.08]"
        : "bg-white border-slate-900/[.07] shadow-sm"
    }`}
  >
    {plan.popular && (
      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
        <span className="bg-[#0a3d91] text-white text-[.64rem] font-black uppercase tracking-widest px-4 py-1.5 rounded-full whitespace-nowrap shadow-lg shadow-[#0a3d91]/25">
          Most Popular
        </span>
      </div>
    )}

    <h3 className="font-display text-[1.05rem] font-black text-slate-900 tracking-tight mb-5">
      {plan.name}
    </h3>

    <div className="flex items-end gap-1.5 mb-1">
      <span
        className={`font-display font-black tracking-tight leading-none ${
          plan.popular ? "text-[#0a3d91]" : "text-slate-900"
        }`}
        style={{ fontSize: "clamp(1.5rem, 2.6vw, 1.9rem)" }}
      >
        {plan.price}
      </span>
    </div>

    <p className="text-[.72rem] text-slate-500 uppercase tracking-wider font-bold mb-6">
      {plan.priceUnit}
    </p>

    <div className="w-full h-px bg-slate-900/[.07] mb-6" />

    <ul className="flex flex-col flex-1 gap-3 mb-8">
      {plan.points.map((point, i) => (
        <li
          key={i}
          className="flex items-start gap-2.5 text-[.85rem] text-slate-700 leading-relaxed"
        >
          <Check />
          {point}
        </li>
      ))}
    </ul>

    <button
      onClick={() => onCtaClick(plan)}
      className={`w-full flex items-center justify-center font-black text-[.83rem] tracking-wide py-3.5 rounded-xl
                  transition-all duration-200 hover:-translate-y-0.5 ${
                    plan.popular
                      ? "bg-[#0a3d91] hover:bg-[#082f70] text-white shadow-lg shadow-[#0a3d91]/20 hover:shadow-[#0a3d91]/30"
                      : "bg-slate-900/[.03] hover:bg-slate-900/[.06] text-slate-800 border border-slate-900/[.10] hover:border-[#0a3d91]/30"
                  }`}
    >
      {plan.ctaText}
    </button>
  </div>
);

const Pricing: React.FC<{ data: PricingData }> = ({ data }) => {
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);

  const phoneNumber = "+94711351868";
  const emailAddress = "info@routesonar.com";

  const handleCtaClick = (plan: PricingPlan) => {
    setSelectedPlan(plan);
  };

  const closeModal = () => {
    setSelectedPlan(null);
  };

  return (
    <section id="pricing" className="relative bg-white py-28">
      <div className="max-w-6xl px-6 mx-auto">
        <div className="mb-16 text-center rs-reveal">
          <span className="section-eyebrow">
            {data.eyebrow || "Pricing"}
          </span>

          <h2 className="mb-4 section-title">{data.title}</h2>

          <p className="max-w-lg mx-auto section-sub">
            {data.subtitle}
          </p>
        </div>

        <div className="grid items-start grid-cols-1 gap-5 sm:grid-cols-3">
          {data.plans.map((plan, i) => (
            <Card
              key={i}
              plan={plan}
              index={i}
              onCtaClick={handleCtaClick}
            />
          ))}
        </div>
      </div>

      {/* Contact Modal */}
      {selectedPlan && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm px-6"
          onClick={closeModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl border border-slate-900/[.08] w-full max-w-sm p-7"
          >
            {/* Icon */}
            <div className="flex justify-center mb-5">
              <div className="w-14 h-14 rounded-full bg-[#0a3d91]/[.1] flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-[#0a3d91]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25v7.5a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15.75v-7.5m18 0L12 13.5 3 8.25m18 0A2.25 2.25 0 0018.75 6H5.25A2.25 2.25 0 003 8.25"
                  />
                </svg>
              </div>
            </div>

            <h3 className="text-lg font-black text-center font-display text-slate-900">
              Schedule a Technical Demo
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-center text-slate-600">
              Interested in{" "}
              <span className="font-bold text-slate-900">
                {selectedPlan.name}
              </span>
              ? Get in touch with our team to discuss your requirements and
              pricing.
            </p>

            <div className="flex flex-col gap-3 mt-6">
              {/* Call */}
              <a
                href={`tel:${phoneNumber}`}
                onClick={closeModal}
                className="w-full py-3 rounded-xl bg-[#0a3d91] hover:bg-[#082f70] text-white font-bold text-sm text-center transition-colors"
              >
                Call Us
              </a>

              {/* Email */}
              <a
                href={`mailto:${emailAddress}?subject=Technical Demo Request - ${selectedPlan.name}`}
                onClick={closeModal}
                className="w-full py-3 rounded-xl border border-slate-900/[.12] text-slate-800 font-bold text-sm text-center hover:bg-slate-900/[.03] transition-colors"
              >
                Email Us
              </a>

              {/* Cancel */}
              <button
                onClick={closeModal}
                className="w-full py-2 text-sm font-semibold transition-colors text-slate-500 hover:text-slate-800"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Pricing;
