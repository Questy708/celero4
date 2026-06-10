"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Factory,
  Coins,
  Users,
  Shield,
  Network,
  Brain,
  Building2,
  HeartPulse,
  ChevronDown,
  ChevronRight,
  Cpu,
  Globe,
  Lock,
  Zap,
  BarChart3,
  FileCheck,
  Handshake,
  Layers,
  Activity,
  Satellite,
  Server,
  Scan,
  Repeat,
  AlertTriangle,
} from "lucide-react";
import { Link } from "@/artemis/router";
import { ReviewSection } from "@/artemis/components/ReviewSection";

/* ══════════════════════════════════════════════════════════════════════════
   DATA: 8 INFRASTRUCTURE PILLARS — Designed from first principles
   for 5,000 companies, 200 unicorns, 39 countries, 190 hubs
   ══════════════════════════════════════════════════════════════════════════ */

const pillars = [
  {
    id: "company-factory",
    num: "01",
    title: "Company Factory",
    icon: Factory,
    tagline: "Manufacturing ventures, not starting them",
    bigNumber: "5,000",
    bigLabel: "Companies to Build",
    thesis:
      "At 5,000 companies, you're not building ventures one at a time — you're manufacturing them. The Company Factory is the operating system for venture creation itself: automated incorporation, pre-built technology scaffolds, executable playbooks, and speed rails that compress years into months.",
    features: [
      {
        name: "Entity Manufacturing",
        desc:
          "Automated incorporation across 39 jurisdictions. Template legal entities spun up in hours, not months. Pre-negotiated banking, tax structures, and compliance frameworks for every country on the Route.",
        icon: FileCheck,
      },
      {
        name: "Technology Scaffolding",
        desc:
          "Pre-built tech stacks per sector. An energy company gets IoT infrastructure from day one. A health venture gets compliance-ready data pipelines. No venture builds foundational tech alone.",
        icon: Cpu,
      },
      {
        name: "Playbook Engine",
        desc:
          "Every successful venture generates an executable playbook — decision trees, metrics, and automation. 'If X happens, do Y' logic that compounds across 5,000 companies and gets smarter with every cycle.",
        icon: Repeat,
      },
      {
        name: "Speed Rails",
        desc:
          "90-day incorporation-to-MVP. 180-day MVP-to-revenue. Not aspirations — enforced through pre-built supply chains, pre-negotiated vendor relationships, and pre-approved regulatory pathways.",
        icon: Zap,
      },
    ],
    metric: { value: "90", unit: "Days", label: "Incorporation to MVP" },
  },
  {
    id: "capital-nervous-system",
    num: "02",
    title: "Capital Nervous System",
    icon: Coins,
    tagline: "The money machine that never stops",
    bigNumber: "6+",
    bigLabel: "Capital Vehicles",
    thesis:
      "5,000 companies don't just need seed money. They need capital that matches the stage, the geography, and the sector — deployed in hours, not months. The Capital Nervous System is a multi-vehicle architecture that routes the right money to the right venture at the right speed.",
    features: [
      {
        name: "Multi-Vehicle Architecture",
        desc:
          "Flagship fund + sector vehicles + country-specific vehicles + opportunity fund + debt facilities + grant bridges. Capital that matches the stage, the geography, and the sector simultaneously.",
        icon: Layers,
      },
      {
        name: "Automated Deployment",
        desc:
          "Pro-rata follow-on logic that never misses a round. Cross-fund allocation engines. Pre-commitment facilities so capital can deploy in hours, not months. The portfolio never waits for a partner meeting.",
        icon: Zap,
      },
      {
        name: "Portfolio-as-Bank",
        desc:
          "At 5,000 companies, portfolio revenue becomes a capital source. Revenue-sharing mechanisms, cross-portfolio lending, and treasury management that turns the portfolio itself into a financial instrument.",
        icon: Coins,
      },
      {
        name: "Currency Fortress",
        desc:
          "39 countries means 39+ currencies. FX hedging, local currency lending, and sovereign debt instruments that protect founders from currency risk. A venture in Kampala should never die because the shilling devalued.",
        icon: Shield,
      },
    ],
    metric: { value: "$50B+", unit: "AUM Target", label: "Across all vehicles" },
  },
  {
    id: "talent-engine",
    num: "03",
    title: "Talent Engine",
    icon: Users,
    tagline: "50,000 operators. One pipeline.",
    bigNumber: "50K+",
    bigLabel: "Operators Needed",
    thesis:
      "5,000 companies need roughly 50,000 operators and builders. You don't recruit that — you build a pipeline. The Talent Engine is a systematic process for identifying, developing, deploying, and circulating talent across the Route. Talent isn't an input. At this scale, talent IS the product.",
    features: [
      {
        name: "Founder Generation",
        desc:
          "Not just finding founders — creating them. Psychometric assessment, technical deepening, and commercial acceleration. A systematic process that takes raw potential and produces venture-ready founders in 12 months.",
        icon: Scan,
      },
      {
        name: "Operator Academy",
        desc:
          "A full-time, rotational program that produces elite operators the way military academies produce officers. 2-year rotations across portfolio companies, building depth across sectors and geographies.",
        icon: BarChart3,
      },
      {
        name: "Executive Deployment",
        desc:
          "Seasoned operators who deploy into portfolio companies at critical inflection points. Not advisors — temporary executives with authority to make decisions, then rotate out when the company can stand alone.",
        icon: Users,
      },
      {
        name: "Talent Circulation",
        desc:
          "A founder who exited one portfolio company starts another. An operator who scaled one venture deploys into the next. The network retains its talent forever — it circulates, compounds, and never leaks.",
        icon: Repeat,
      },
    ],
    metric: { value: "12", unit: "Months", label: "Raw talent to venture-ready" },
  },
  {
    id: "regulatory-arsenal",
    num: "04",
    title: "Regulatory Arsenal",
    icon: Shield,
    tagline: "Regulation is the #1 killer. We neutralize it.",
    bigNumber: "39",
    bigLabel: "Jurisdictions Covered",
    thesis:
      "In emerging markets, regulation kills more ventures than market forces. The Regulatory Arsenal is a full-spectrum legal warfare system: intelligence, sandbox access, template libraries, and compliance automation that turns regulation from a death sentence into a competitive moat.",
    features: [
      {
        name: "Intelligence Network",
        desc:
          "Real-time monitoring of regulatory changes across 39 countries. Automated alerts when a new regulation affects portfolio companies. Pre-emptive lobbying before regulations are finalized, not reactive scrambling after.",
        icon: Scan,
      },
      {
        name: "Sandbox Infrastructure",
        desc:
          "Pre-negotiated regulatory sandboxes in every country. Fast-track licensing for energy, telecom, health, and defense. Legal frameworks that let portfolio companies test before they're compliant.",
        icon: Lock,
      },
      {
        name: "License Library",
        desc:
          "Template regulatory applications for every sector in every country. When company #4,998 needs a telecom license in Tanzania, they don't start from scratch — they start from a template approved 47 times before.",
        icon: FileCheck,
      },
      {
        name: "Compliance Automation",
        desc:
          "Ongoing compliance monitoring, automated filing, and real-time risk assessment across the entire portfolio. One compliance engine serving 5,000 companies through automation, not headcount.",
        icon: Server,
      },
    ],
    metric: { value: "47x", unit: "Faster", label: "License approval with templates" },
  },
  {
    id: "distribution-network",
    num: "05",
    title: "Distribution Network",
    icon: Network,
    tagline: "Distribution is the scarcest resource. We built it.",
    bigNumber: "5,000",
    bigLabel: "Internal Customers",
    thesis:
      "Distribution, not capital, is the scarcest resource in emerging markets. The Distribution Network turns 190 hubs and 5,000 companies into a built-in market. Government contracts pre-negotiated. Enterprise partnerships as anchor tenants. Cross-portfolio commerce as default. Expansion rails that make the next country turnkey.",
    features: [
      {
        name: "B2G Pipeline",
        desc:
          "Pre-negotiated government contracts in every country. Not one-off deals — standing agreements that portfolio companies access from day one. A government procurement pipeline that turns public sector demand into portfolio revenue.",
        icon: Handshake,
      },
      {
        name: "B2B Anchor Tenants",
        desc:
          "Enterprise partnerships that guarantee first customers. Telecom companies buying from portfolio energy ventures. Banks using portfolio fintech infrastructure. Every hub brings its own enterprise network.",
        icon: Building2,
      },
      {
        name: "Cross-Portfolio Commerce",
        desc:
          "Companies on the Route buy from each other first. An internal marketplace with 5,000 potential vendors and customers. Network effects that compound with every new company added to the network.",
        icon: Repeat,
      },
      {
        name: "Expansion Rails",
        desc:
          "Once a company is on the Route, expanding to the next country is turnkey. The regulatory path is cleared, the local hub provides space, the talent pipeline provides operators, and the B2G pipeline provides customers.",
        icon: Globe,
      },
    ],
    metric: { value: "Day 1", unit: "Revenue", label: "First customer on Day One" },
  },
  {
    id: "intelligence-grid",
    num: "06",
    title: "Intelligence Grid",
    icon: Brain,
    tagline: "5,000 companies generate more signal than any intelligence agency",
    bigNumber: "∞",
    bigLabel: "Compounding Intelligence",
    thesis:
      "5,000 companies across 39 countries generate more data than most intelligence agencies process. The Intelligence Grid captures, analyzes, and redistributes that signal — market intelligence, failure patterns, founder performance, and predictive models that make every subsequent company smarter than the last.",
    features: [
      {
        name: "Market Intelligence Engine",
        desc:
          "Real-time feeds from 39 countries — regulatory changes, commodity shifts, political risk, and competitive movements. Processed, analyzed, and distributed to every portfolio company that needs it, before they know they need it.",
        icon: Satellite,
      },
      {
        name: "Cross-Portfolio Learning",
        desc:
          "Every company's data trains the next company's models. Failure patterns, success patterns, market timing, and pricing strategies — all captured and codified. Company #5,000 is the smartest company ever built because 4,999 came before it.",
        icon: Brain,
      },
      {
        name: "Founder Psychometrics",
        desc:
          "Pre- and post-building founder assessment and support. Not hiring tests — performance analytics that track how founders evolve, what support they need, and when to deploy executive assistance. The system knows the founder before the founder knows themselves.",
        icon: Activity,
      },
      {
        name: "Predictive Infrastructure",
        desc:
          "Models that predict which companies will fail before they do. Early warning systems for market shifts. Automated intervention triggers. The grid doesn't just observe — it anticipates and acts.",
        icon: BarChart3,
      },
    ],
    metric: { value: "4,999", unit: "Teachers", label: "Every company learns from the ones before it" },
  },
  {
    id: "physical-digital-nervous-system",
    num: "07",
    title: "Physical-Digital Nervous System",
    icon: Server,
    tagline: "190 hubs. One organism.",
    bigNumber: "190",
    bigLabel: "Network Nodes",
    thesis:
      "190 hubs aren't offices — they're nodes in a living network. The Physical-Digital Nervous System is the infrastructure that makes 190 locations operate as one organism: standardized operating systems, shared lab infrastructure, secure communications, and a data backbone that no government can subpoena and no competitor can access.",
    features: [
      {
        name: "Hub Operating System",
        desc:
          "Standardized build-out, connectivity, security, and community management. Every hub runs the same software, has the same lab equipment, and operates under the same protocols. A founder walks into any hub on the Route and it works instantly.",
        icon: Server,
      },
      {
        name: "Lab Infrastructure",
        desc:
          "Sector-specific labs that no single company could afford alone. Bio labs, hardware workshops, drone test ranges, satellite uplinks, and semiconductor fabrication equipment. Shared across the portfolio, available on demand.",
        icon: Cpu,
      },
      {
        name: "Secure Communications",
        desc:
          "End-to-end encrypted collaboration across the entire network. In countries with surveillance infrastructure, this is survival equipment. Sovereign-grade security for sovereign-grade ventures.",
        icon: Lock,
      },
      {
        name: "Data Backbone",
        desc:
          "A private cloud for portfolio analytics, market intelligence, and cross-portfolio learning. Infrastructure that no government can subpoena and no competitor can access. The network's collective memory, permanently available.",
        icon: Globe,
      },
    ],
    metric: { value: "0", unit: "Friction", label: "Walk into any hub, start immediately" },
  },
  {
    id: "resilience-infrastructure",
    num: "08",
    title: "Resilience Infrastructure",
    icon: HeartPulse,
    tagline: "What survives, thrives. What thrives, compounds.",
    bigNumber: "100%",
    bigLabel: "Survival by Design",
    thesis:
      "At this scale across emerging markets, things WILL go wrong. Political instability, currency crashes, regulatory raids, founder burnout. The Resilience Infrastructure doesn't just respond to crises — it's designed to get stronger under stress. Every failure improves the model. The system learns from its own destruction.",
    features: [
      {
        name: "Crisis Response",
        desc:
          "Rapid deployment teams for political instability, regulatory raids, founder fraud, and operational crises. Pre-planned evacuation routes, backup data centers, and emergency capital reserves. The fire department for the entire Route.",
        icon: AlertTriangle,
      },
      {
        name: "Portfolio Hedging",
        desc:
          "Geographic and sectoral diversification that protects the entire portfolio from any single country's collapse. Currency hedging, political risk insurance, and sovereign guarantee mechanisms. No single point of failure.",
        icon: Shield,
      },
      {
        name: "Continuity Systems",
        desc:
          "When a founder fails, the company doesn't die. Automatic executive deployment, knowledge transfer protocols, and institutional memory systems that survive individual departures. The venture outlives any single person.",
        icon: Repeat,
      },
      {
        name: "Anti-Fragility Engine",
        desc:
          "Infrastructure that gets stronger under stress. Every crisis generates playbooks. Every failure improves the model. Every near-death experience makes the next company harder to kill. The system doesn't just survive — it compounds.",
        icon: HeartPulse,
      },
    ],
    metric: { value: "4,999", unit: "Lessons", label: "From every failure, a future strength" },
  },
];

/* ══════════════════════════════════════════════════════════════════════════
   INFRASTRUCTURE PAGE
   ══════════════════════════════════════════════════════════════════════════ */
export function Platform() {
  return (
    <div className="bg-white text-[#111111]">
      <HeroSection />
      <ScaleVizSection />
      <PillarsOverview />
      {pillars.map((pillar, i) => (
        <PillarSection key={pillar.id} pillar={pillar} index={i} />
      ))}
      <FlywheelSection />
      <ReviewSection />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   HERO
   ══════════════════════════════════════════════════════════════════════════ */
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref}>
      <div className="w-full max-w-[1400px] mx-auto bg-[#111111] text-white px-6 md:px-12 lg:px-20 py-20 md:py-32 rounded-sm">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-[10px] font-mono font-bold tracking-[0.4em] uppercase text-[#FF4D00] mb-6 block">
            The Stack Behind the Route
          </span>
          <h1 className="text-[36px] sm:text-[48px] md:text-[64px] lg:text-[80px] font-display font-medium tracking-[-0.03em] leading-[0.9] mb-6">
            Not offices.
            <br />
            Operating systems
            <br />
            <span className="text-[#FF4D00]">for civilization.</span>
          </h1>
          <p className="text-[16px] md:text-[18px] leading-[1.7] text-white/50 font-medium max-w-2xl">
            5,000 companies. 200 unicorns. 39 countries. 190 hubs. What does it actually take to build at that scale? Not more capital. Not more talent. Not more will. It takes infrastructure — the kind that doesn&apos;t exist yet. So we&apos;re building it.
          </p>
        </motion.div>

        {/* Scale metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-t border-white/10 pt-10"
        >
          {[
            { value: "5,000", label: "Companies" },
            { value: "200", label: "Unicorns" },
            { value: "39", label: "Countries" },
            { value: "190", label: "Hubs" },
          ].map((m, i) => (
            <div key={i}>
              <div className="text-[40px] sm:text-[56px] md:text-[72px] font-display font-medium tracking-tighter leading-none text-[#FF4D00]">
                {m.value}
              </div>
              <div className="text-[11px] font-mono text-white/40 uppercase tracking-widest mt-2">{m.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   SCALE VISUALIZATION — Why infrastructure matters
   ══════════════════════════════════════════════════════════════════════════ */
function ScaleVizSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-16 md:py-24 px-6 md:px-12 lg:px-20 border-b border-[#111111]/10">
      <div className="w-full max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mb-16 md:mb-24"
        >
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] mb-6 block">
            First Principles
          </span>
          <h2 className="text-[32px] md:text-[48px] lg:text-[60px] font-display font-medium tracking-tight leading-[1.05] mb-6">
            The scale demands <span className="text-[#111111]/40">a new category.</span>
          </h2>
          <p className="text-[17px] md:text-[19px] text-[#111111]/50 font-medium leading-relaxed">
            This isn&apos;t a venture fund. It isn&apos;t an accelerator. It isn&apos;t a studio. At 5,000 companies across 39 countries, xCelero is a civilization-building platform — and civilization-building platforms require infrastructure that doesn&apos;t exist yet.
          </p>
        </motion.div>

        {/* Three insight blocks */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              num: "01",
              title: "The Compound Problem",
              desc: "Each venture in an emerging market must build what the last venture already built: legal entities, banking relationships, regulatory approvals, supply chains, distribution channels. Without shared infrastructure, every venture starts from zero. At 5,000 companies, that's 5,000 independent rebuilds of the same foundation.",
              accent: "5,000× the same work",
            },
            {
              num: "02",
              title: "The Infrastructure Gap",
              desc: "In the West, infrastructure is invisible because it already exists. FedEx delivers. ACH settles. The SEC regulates (predictably). In the markets xCelero serves, none of that is guaranteed. Before you build the product, you must build the ground it stands on. At scale, that ground must be shared.",
              accent: "Build the ground first",
            },
            {
              num: "03",
              title: "The Network Imperative",
              desc: "5,000 companies across 190 hubs produce network effects that no standalone venture can match. Every company's data makes the next company smarter. Every regulatory win creates a template. Every distribution deal opens a channel. The infrastructure doesn't just support — it compounds.",
              accent: "Intelligence compounds",
            },
          ].map((block, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: "easeOut" }}
              className="border border-[#111111]/10 p-6 md:p-8 hover:border-[#FF4D00] transition-all duration-300 group"
            >
              <div className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] mb-4">
                {block.num}
              </div>
              <h3 className="text-[22px] md:text-[26px] font-display font-medium tracking-tight mb-4">
                {block.title}
              </h3>
              <p className="text-[14px] md:text-[15px] leading-[1.7] text-[#111111]/60 font-medium mb-6">
                {block.desc}
              </p>
              <div className="border-t border-[#111111]/10 pt-4">
                <p className="text-[14px] font-bold text-[#FF4D00]">{block.accent}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PILLARS OVERVIEW — 8 pillars at a glance
   ══════════════════════════════════════════════════════════════════════════ */
function PillarsOverview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-16 md:py-24 px-6 md:px-12 lg:px-20 border-b border-[#111111]/10 bg-[#FAFAFA]">
      <div className="w-full max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mb-16 md:mb-24"
        >
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] mb-6 block">
            8 Pillars
          </span>
          <h2 className="text-[32px] md:text-[48px] lg:text-[60px] font-display font-medium tracking-tight leading-[1.05] mb-6">
            The stack behind <span className="text-[#111111]/40">the Route.</span>
          </h2>
          <p className="text-[17px] md:text-[19px] text-[#111111]/50 font-medium leading-relaxed">
            Eight pillars. Each one a system that doesn&apos;t exist at this scale anywhere in the world. Together, they form the operating system for the next 5,000 companies.
          </p>
        </motion.div>

        {/* Pillar grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.a
                key={pillar.id}
                href={`#${pillar.id}`}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
                className="group border border-[#111111]/10 bg-white p-6 hover:border-[#FF4D00] transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 border border-[#111111]/10 flex items-center justify-center group-hover:border-[#FF4D00] group-hover:bg-[#FF4D00]/5 transition-all">
                    <Icon className="w-5 h-5 text-[#FF4D00]" strokeWidth={1.5} />
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00]">
                    {pillar.num}
                  </span>
                </div>
                <h3 className="text-[18px] font-display font-medium tracking-tight mb-2">{pillar.title}</h3>
                <p className="text-[12px] text-[#111111]/40 font-medium leading-[1.5]">{pillar.tagline}</p>
                <div className="mt-4 flex items-center gap-1 text-[10px] font-mono font-bold tracking-wider uppercase text-[#FF4D00] opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <ChevronRight className="w-3 h-3" />
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   INDIVIDUAL PILLAR SECTION — Full detail for each pillar
   ══════════════════════════════════════════════════════════════════════════ */
function PillarSection({ pillar, index }: { pillar: typeof pillars[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null);
  const isEven = index % 2 === 0;

  const Icon = pillar.icon;

  return (
    <section
      ref={ref}
      id={pillar.id}
      className={`py-16 md:py-24 px-6 md:px-12 lg:px-20 border-b border-[#111111]/10 ${
        isEven ? "bg-white" : "bg-[#FAFAFA]"
      }`}
    >
      <div className="w-full max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <div className="lg:sticky lg:top-32">
              {/* Pillar number + icon */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 border-2 border-[#FF4D00] flex items-center justify-center bg-[#FF4D00]/5">
                  <Icon className="w-6 h-6 text-[#FF4D00]" strokeWidth={1.5} />
                </div>
                <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00]">
                  Pillar {pillar.num}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-[32px] md:text-[44px] lg:text-[52px] font-display font-medium tracking-tight leading-[1.05] mb-4">
                {pillar.title}
              </h2>

              {/* Tagline */}
              <p className="text-[15px] md:text-[17px] text-[#FF4D00] font-bold mb-6">{pillar.tagline}</p>

              {/* Thesis */}
              <p className="text-[15px] md:text-[17px] text-[#111111]/60 font-medium leading-[1.7] mb-8">
                {pillar.thesis}
              </p>

              {/* Big metric */}
              <div className="bg-[#111111] text-white p-8 md:p-10">
                <div className="text-[60px] sm:text-[80px] md:text-[100px] font-display font-medium tracking-tighter leading-none text-[#FF4D00]">
                  {pillar.metric.value}
                </div>
                <div className="text-[13px] font-mono text-white/50 uppercase tracking-widest mt-1">
                  {pillar.metric.unit}
                </div>
                <div className="text-[12px] text-white/30 font-medium mt-3">{pillar.metric.label}</div>
              </div>
            </div>
          </motion.div>

          {/* Right: Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <div className="space-y-4">
              {pillar.features.map((feature, fi) => {
                const FeatureIcon = feature.icon;
                const isExpanded = expandedFeature === fi;
                return (
                  <div
                    key={fi}
                    className={`border transition-all duration-300 ${
                      isExpanded
                        ? "border-[#FF4D00] bg-[#FF4D00]/5"
                        : "border-[#111111]/10 bg-white hover:border-[#111111]/25"
                    }`}
                  >
                    <button
                      suppressHydrationWarning
                      onClick={() => setExpandedFeature(isExpanded ? null : fi)}
                      className="w-full flex items-center gap-4 p-5 md:p-6 text-left cursor-pointer min-h-[44px]"
                    >
                      <div
                        className={`w-10 h-10 border flex items-center justify-center shrink-0 transition-all ${
                          isExpanded
                            ? "border-[#FF4D00] bg-[#FF4D00]/10"
                            : "border-[#111111]/10 bg-white"
                        }`}
                      >
                        <FeatureIcon
                          className={`w-5 h-5 transition-colors ${
                            isExpanded ? "text-[#FF4D00]" : "text-[#111111]/40"
                          }`}
                          strokeWidth={1.5}
                        />
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-[16px] md:text-[18px] font-display font-medium tracking-tight">
                          {feature.name}
                        </h4>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-[#111111]/30 transition-transform shrink-0 ${
                          isExpanded ? "rotate-180 text-[#FF4D00]" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 md:px-6 pb-5 md:pb-6 pl-[76px] md:pl-[84px]">
                            <p className="text-[14px] md:text-[15px] text-[#111111]/60 font-medium leading-[1.7]">
                              {feature.desc}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Pillar CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="mt-8 border-t border-[#111111]/10 pt-6"
            >
              <div className="flex items-center justify-between">
                <div className="text-[12px] font-mono text-[#111111]/30 uppercase tracking-widest">
                  {pillar.features.length} subsystems
                </div>
                {index < pillars.length - 1 && (
                  <a
                    href={`#${pillars[index + 1].id}`}
                    className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#FF4D00] hover:text-[#111111] transition-colors group"
                  >
                    Next: {pillars[index + 1].title}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   FLYWHEEL — How the 8 pillars compound
   ══════════════════════════════════════════════════════════════════════════ */
function FlywheelSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-16 md:py-24 px-6 md:px-12 lg:px-20">
      <div className="w-full max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-[#111111] text-white p-8 md:p-16 lg:p-20 rounded-sm"
        >
          <span className="text-[10px] font-mono font-bold tracking-[0.4em] uppercase text-[#FF4D00] mb-6 block">
            The Compounding Effect
          </span>
          <h2 className="text-[32px] md:text-[48px] lg:text-[64px] font-display font-medium tracking-tight leading-[1.05] mb-8 max-w-4xl">
            Each pillar feeds the next.
            <br />
            <span className="text-white/40">The system compounds.</span>
          </h2>
          <p className="text-[16px] md:text-[18px] text-white/50 font-medium leading-[1.7] max-w-2xl mb-12">
            The Company Factory creates ventures. The Capital Nervous System funds them. The Talent Engine staffs them. The Regulatory Arsenal protects them. The Distribution Network sells them. The Intelligence Grid learns from them. The Physical-Digital Nervous System connects them. And the Resilience Infrastructure ensures they survive. Each pillar makes every other pillar stronger.
          </p>

          {/* Visual flywheel - horizontal flow */}
          <div className="overflow-x-auto scrollbar-thin pb-4">
            <div className="flex items-center gap-3 min-w-max">
              {pillars.map((pillar, i) => {
                const PIcon = pillar.icon;
                return (
                  <div key={pillar.id} className="flex items-center gap-3">
                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-3 rounded-sm hover:bg-white/10 hover:border-[#FF4D00]/30 transition-all duration-300">
                      <PIcon className="w-4 h-4 text-[#FF4D00]" strokeWidth={1.5} />
                      <span className="text-[12px] font-display font-medium text-white/80 whitespace-nowrap">
                        {pillar.title}
                      </span>
                    </div>
                    {i < pillars.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-white/20 shrink-0" />
                    )}
                  </div>
                );
              })}
              {/* Loop back arrow */}
              <div className="flex items-center gap-2 ml-2">
                <svg className="w-5 h-5 text-[#FF4D00]/60" viewBox="0 0 24 16" fill="none">
                  <path d="M0 8H16M16 8L12 4M16 8L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#FF4D00]/60 whitespace-nowrap">
                  loop
                </span>
              </div>
            </div>
          </div>

          {/* Bottom callout */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-[36px] md:text-[48px] font-display font-medium tracking-tighter text-[#FF4D00]">8</div>
                <div className="text-[12px] text-white/40 font-medium">Pillars, each reinforcing the others</div>
              </div>
              <div>
                <div className="text-[36px] md:text-[48px] font-display font-medium tracking-tighter text-[#FF4D00]">32</div>
                <div className="text-[12px] text-white/40 font-medium">Subsystems across the infrastructure stack</div>
              </div>
              <div>
                <div className="text-[36px] md:text-[48px] font-display font-medium tracking-tighter text-[#FF4D00]">∞</div>
                <div className="text-[12px] text-white/40 font-medium">Compounding — every cycle makes the next stronger</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
