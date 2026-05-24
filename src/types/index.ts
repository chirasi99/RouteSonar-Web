// src/types/index.ts

export interface NavLink    { label: string; href: string }
export interface NavbarData { logo: string; ctaText: string; ctaLink: string; links: NavLink[] }

export interface HeroData {
  badge: string; headline: string; subheadline: string;
  ctaPrimary: string; ctaPrimaryLink: string;
  ctaSecondary: string; ctaSecondaryLink: string;
  pressLabel: string; pressItems: string[];
}

export interface StatItem  { value: number; suffix: string; label: string }
export interface StatsData { items: StatItem[] }

export interface FeatureItem  { icon: string; title: string; description: string }
export interface FeaturesData { title: string; subtitle: string; items: FeatureItem[] }

export interface StepItem  { step: string; tag: string; title: string; description: string }
export interface StepsData { title: string; subtitle: string; items: StepItem[] }

export interface PricingItem {
  name: string; price: string; period: string; description: string;
  popular: boolean; ctaText: string; ctaLink: string; features: string[];
}
export interface PricingData { title: string; subtitle: string; items: PricingItem[] }

export interface TestimonialItem  { name: string; role: string; quote: string }
export interface TestimonialsData { title: string; items: TestimonialItem[] }

export interface NewsPost { id: string; title: string; date: string; excerpt: string; link: string }

export interface SocialLink { platform: string; href: string }
export interface FooterLink { label: string; href: string }
export interface FooterData {
  logo: string; tagline: string; email: string; phone: string; address: string;
  copyright: string; links: FooterLink[]; social: SocialLink[];
}

export interface SiteData {
  navbar: NavbarData | null; hero: HeroData | null; stats: StatsData | null;
  features: FeaturesData | null; steps: StepsData | null; pricing: PricingData | null;
  testimonials: TestimonialsData | null; news: NewsPost[]; footer: FooterData | null;
}
