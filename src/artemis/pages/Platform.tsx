"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Cpu,
  Zap,
  Eye,
  Brain,
  Link2,
  Box,
  Atom,
  CircuitBoard,
  ChevronDown,
  MapPin,
} from "lucide-react";
import { Link } from "@/artemis/router";
import { ReviewSection } from "@/artemis/components/ReviewSection";
import { routeLegs, MAP_LOCATIONS } from "@/artemis/data/routes";

/* ── Data ── */

const caseComparisons = [
  {
    founder: "Jeff Bezos",
    company: "Amazon",
    context: "USA, 1994",
    advantage:
      "When Bezos quit his Wall Street job to sell books online, he didn't need to build a banking system, credit cards and ACH already existed. He didn't need to build delivery infrastructure, FedEx and UPS already covered every address in America. He didn't need to build a payments layer: the entire financial stack was mature, trusted, and ubiquitous.",
    takeaway:
      "The infrastructure was invisible because it was already there.",
    icon: "📦",
  },
  {
    founder: "Elon Musk",
    company: "Tesla / SpaceX",
    context: "USA, 2002–2003",
    advantage:
      "Musk could recruit the world's best engineers from Stanford and MIT. He could file patents in a legal system that enforced them. He could raise capital on Sand Hill Road from partners who understood deep-tech risk. The roads his cars would drive on were already paved. The grid they'd plug into was already stable. The regulatory framework, FMVSS, EPA, NHTSA, was codified and navigable.",
    takeaway:
      "Every system the venture needed to touch was already operational.",
    icon: "🚀",
  },
  {
    founder: "A builder in Kampala",
    company: "Any venture, any sector",
    context: "Uganda, 2024",
    advantage:
      "There is no mature payments infrastructure, mobile money works but cross-border settlement doesn't. There is no reliable last-mile logistics, roads are unpaved and addresses are informal. There is no deep-tech talent pipeline: the best engineers emigrate. There is no venture capital ecosystem: the few funds that exist are Nairobi-based and consumer-focused. The grid fails daily. Legal frameworks shift without notice. Supply chains are informal, opaque, and cash-dependent.",
    takeaway:
      "Before you can build the product, you must first build the ground it stands on.",
    icon: "🏗️",
  },
];

const coreTechnologies = [
  { name: "Robotics", icon: CircuitBoard, desc: "Autonomous systems for manufacturing, logistics, and hazardous environments." },
  { name: "Connected Systems", icon: Link2, desc: "IoT, mesh networks, and real-time sensor infrastructure for distributed intelligence." },
  { name: "Artificial Intelligence", icon: Brain, desc: "Edge AI, multilingual LLMs, and decision platforms for independent computation." },
  { name: "Material Science", icon: Box, desc: "Mycelium composites, bio-plastics, and novel semiconductors for supply-chain independence." },
  { name: "Blockchain", icon: Cpu, desc: "Decentralized identity, traceability ledgers, and trustless settlement rails." },
  { name: "Additive Manufacturing", icon: Box, desc: "3D printing, CNC, and modular micro-factories for distributed production." },
  { name: "Quantum Computing", icon: Atom, desc: "Quantum sensing and unbreakable encryption for independent data architectures." },
  { name: "Computer Vision", icon: Eye, desc: "Real-time diagnostics, satellite analytics, and autonomous navigation." },
];

const m1Tiers = [
  {
    tier: "M1 Core",
    size: "~1M sq ft",
    floors: "5–6",
    desc: "Flagship metroburb: the full Bell Labs model. Central atrium, mixed-use promenade, rooftop green space.",
    cost: "$200–350M",
    population: "3,000–5,000 ProtoCitizens",
  },
  {
    tier: "M1 Node",
    size: "~250K sq ft",
    floors: "4–5",
    desc: "Regional hub, scaled for secondary cities. Core labs, co-working, and pilot zone.",
    cost: "$50–90M",
    population: "800–1,500 ProtoCitizens",
  },
  {
    tier: "M1 Outpost",
    size: "~42K sq ft",
    floors: "2–3",
    desc: "XEmbassy-class drop-in studio: the distributed micro-campus for frontier locations.",
    cost: "$8–15M",
    population: "150–300 ProtoCitizens",
  },
];

const m1DesignInputs = [
  { label: "Size Range", value: "~1 million sq ft (customizable into M1 Core / Node / Outpost tiers)" },
  { label: "Shape", value: "Rectangular with central atrium (square or donut-shaped)" },
  { label: "Levels", value: "5–6 floors max (ground floor as mixed-use promenade)" },
  { label: "Exterior", value: "Mirror glass façade with stone/concrete accents" },
  { label: "Interior", value: "Central atrium with vertical garden, mixed-use ground floor, offices above, rooftop green space" },
  { label: "Inspirations", value: "Historical Bell Labs, Eero Saarinen modernism, urban/suburban fusion" },
  { label: "Climate", value: "Global use, scalable to different climates with flex materials" },
];

const xembassyZones = [
  { title: "Prototyping Lab", pct: "25%", desc: "CNC machines, 3D printers, clean benches, robotics." },
  { title: "Wet Lab", pct: "10%", desc: "PCR machines, biosafety cabinets, fermentation." },
  { title: "Pilot Zone", pct: "15%", desc: "Small-scale manufacturing, modular test rigs." },
  { title: "Open Workspace", pct: "15%", desc: "Radical proximity for ProtoCitizens." },
  { title: "Event Commons", pct: "10%", desc: "Lecture hall, demo days, community convening." },
  { title: "Residential", pct: "15%", desc: "Short-stay pods for visiting founders & researchers." },
  { title: "Operations", pct: "10%", desc: "Servers, secure storage, facilities management." },
];

/* ══════════════════════════════════════════════════════════════════════════
   INFRASTRUCTURE PAGE
   ══════════════════════════════════════════════════════════════════════════ */
export function Platform() {
  return (
    <div className="bg-white text-[#111111]">
      <HeroSection />
      <CaseForInfrastructure />
      <XEmbassySection />
      <M1CoreSection />
      <CoreTechnologiesSection />
      <RouteHubsSection />
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
    <section
      ref={ref}
    >
      <div className="w-full max-w-[1400px] mx-auto bg-[#111111] text-white px-6 md:px-12 lg:px-20 py-16 md:py-24 rounded-sm">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-[10px] font-mono font-bold tracking-[0.4em] uppercase text-[#FF4D00] mb-6 block">
            xCelero Infrastructure
          </span>
          <h1 className="text-[36px] sm:text-[48px] md:text-[64px] lg:text-[80px] font-display font-medium tracking-[-0.03em] leading-[0.9] mb-6">
            Before you build
            <br />
            the product, you build
            <br />
            <span className="text-[#FF4D00]">the ground.</span>
          </h1>
          <p className="text-[16px] md:text-[18px] leading-[1.7] text-white/50 font-medium max-w-2xl">
            Infrastructure is the bedrock. Not offices — operating systems for civilization. M1 Cores, XEmbassies, and 190+ projected hubs on the Route, designed to provide every layer a venture needs to move from prototype to production.
          </p>
        </motion.div>

        {/* Full-width image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-12 md:mt-16 w-full h-[30vh] md:h-[50vh] overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
            alt="M1 Core Infrastructure"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   CASE FOR INFRASTRUCTURE, Side-by-side comparisons
   ══════════════════════════════════════════════════════════════════════════ */
function CaseForInfrastructure() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCase, setActiveCase] = useState(0);

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 px-6 md:px-12 lg:px-20 border-b border-[#111111]/10"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mb-16 md:mb-24"
        >
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] mb-6 block">
            The Case for Infrastructure
          </span>
          <h2 className="text-[32px] md:text-[48px] lg:text-[60px] font-display font-medium tracking-tight leading-[1.05] mb-6">
            Infrastructure is the <span className="text-[#111111]/40">invisible prerequisite</span> of everything.
          </h2>
          <p className="text-[17px] md:text-[19px] text-[#111111]/50 font-medium leading-relaxed">
            In the West, infrastructure is invisible. It already exists. In the Global South, it&apos;s the first thing you have to build.
          </p>
        </motion.div>

        {/* Comparison cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {caseComparisons.map((item, i) => (
            <div
              key={i}
              onClick={() => setActiveCase(i)}
              className={`cursor-pointer border p-6 md:p-8 transition-all duration-300 ${
                activeCase === i
                  ? "border-[#FF4D00] bg-[#FF4D00]/5"
                  : "border-[#111111]/10 bg-white hover:border-[#111111]/25"
              }`}
            >
              <div className="text-[36px] mb-4">{item.icon}</div>
              <div className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/30 mb-2">
                {item.context}
              </div>
              <h3 className="text-[22px] md:text-[26px] font-display font-medium tracking-tight mb-1">
                {item.founder}
              </h3>
              <div className="text-[#FF4D00] text-[13px] font-bold mb-4">{item.company}</div>
              <p className="text-[14px] md:text-[15px] leading-[1.7] text-[#111111]/60 font-medium mb-6">
                {item.advantage}
              </p>
              <div className="border-t border-[#111111]/10 pt-4">
                <p className={`text-[14px] font-bold leading-[1.6] ${
                  activeCase === i ? "text-[#FF4D00]" : "text-[#111111]/80"
                }`}>
                  {item.takeaway}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="mt-12 md:mt-16 bg-[#111111] text-white p-8 md:p-12 rounded-sm overflow-hidden"
        >
          <div className="max-w-3xl">
            <p className="text-[18px] md:text-[22px] font-display font-medium leading-[1.5] mb-4">
              This is why xCelero exists.
            </p>
            <p className="text-[15px] md:text-[17px] text-white/60 font-medium leading-[1.7]">
              We don&apos;t just invest in ventures — we are building the infrastructure those ventures need to exist. The M1 Cores, the XEmbassies, the 190+ projected hubs on the Route — these aren&apos;t real estate plays. They&apos;re operating systems for the next civilization.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   XEMBASSY, 42,000 sq ft micro-campus
   ══════════════════════════════════════════════════════════════════════════ */
function XEmbassySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 px-6 md:px-12 lg:px-20 border-b border-[#111111]/10 bg-[#FAFAFA]"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mb-16 md:mb-24"
        >
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] mb-6 block">
            The XEmbassy
          </span>
          <h2 className="text-[32px] md:text-[48px] lg:text-[60px] font-display font-medium tracking-tight leading-[1.05] mb-6">
            Not an office. <span className="text-[#111111]/40">A distributed micro-campus.</span>
          </h2>
          <p className="text-[17px] md:text-[19px] text-[#111111]/50 font-medium leading-relaxed">
            At the heart of xHansa 3.0 lies the XEmbassy: a 42,000 sq ft physical node designed for the global internet of innovation. Prototyping labs, wet labs, pilot zones, and radical proximity for ProtoCitizens.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Zone breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <div className="space-y-0">
              {xembassyZones.map((zone, i) => (
                <div key={i} className="flex items-start gap-6 border-b border-[#111111]/8 py-5 group">
                  <div className="flex-shrink-0 w-16">
                    <span className="text-[#FF4D00] font-mono text-[13px] font-bold">{zone.pct}</span>
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-[15px] tracking-tight mb-1">{zone.title}</h4>
                    <p className="text-[13px] text-[#111111]/50 font-medium leading-[1.5]">{zone.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Big number + image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col gap-8"
          >
            <div className="bg-[#111111] text-[#FAFAFA] p-10 md:p-12 flex flex-col items-center justify-center text-center">
              <div className="text-[60px] sm:text-[100px] md:text-[140px] font-display font-medium leading-none tracking-tighter">42K</div>
              <div className="text-[11px] font-mono text-[#FAFAFA]/50 uppercase tracking-widest mt-2">Square Feet</div>
              <div className="text-[10px] font-mono text-[#FAFAFA]/30 uppercase tracking-widest mt-4">Per XEmbassy Node</div>
            </div>
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
                alt="XEmbassy Prototyping Lab"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   M1 CORE MODEL, Basecamp blueprint
   ══════════════════════════════════════════════════════════════════════════ */
function M1CoreSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeTier, setActiveTier] = useState(0);

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 px-6 md:px-12 lg:px-20 border-b border-[#111111]/10"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mb-16 md:mb-24"
        >
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] mb-6 block">
            M1 Core Model
          </span>
          <h2 className="text-[32px] md:text-[48px] lg:text-[60px] font-display font-medium tracking-tight leading-[1.05] mb-6">
            The basecamp <span className="text-[#111111]/40">for civilization-building.</span>
          </h2>
          <p className="text-[17px] md:text-[19px] text-[#111111]/50 font-medium leading-relaxed">
            Inspired by the laboratories that won 9 Nobel Prizes, where scientists ate in the same cafeteria as engineers, and ideas crossed disciplines over coffee. The M1 Core will not be an office park. It will be a machine for invention.
          </p>
        </motion.div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="w-full h-[30vh] md:h-[45vh] overflow-hidden mb-16 md:mb-24"
        >
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80"
            alt="M1 Core Interior"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
          />
        </motion.div>

        {/* Design Inputs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mb-16 md:mb-24"
        >
          <h3 className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/30 mb-8">
            Design Inputs
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
            {m1DesignInputs.map((input, i) => (
              <div key={i} className="border-t border-[#111111]/10 pt-4">
                <div className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#FF4D00] mb-2">
                  {input.label}
                </div>
                <p className="text-[14px] text-[#111111]/70 font-medium leading-[1.6]">
                  {input.value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* M1 Tiers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <h3 className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/30 mb-8">
            Three Tiers
          </h3>

          {/* Tier selector */}
          <div className="flex gap-2 mb-8">
            {m1Tiers.map((tier, i) => (
              <button
                key={i}
                suppressHydrationWarning
                onClick={() => setActiveTier(i)}
                className={`px-4 py-2.5 text-[11px] font-mono font-bold tracking-[0.15em] uppercase border transition-all min-h-[44px] ${
                  activeTier === i
                    ? "bg-[#111111] text-white border-[#111111]"
                    : "bg-white text-[#111111]/40 border-[#111111]/10 hover:border-[#111111]/30"
                }`}
              >
                {tier.tier}
              </button>
            ))}
          </div>

          {/* Active tier detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTier}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-12 gap-8 lg:gap-12"
            >
              <div className="lg:col-span-8 border border-[#111111]/10 p-8 md:p-10">
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="text-[48px] md:text-[64px] font-display font-medium tracking-tighter leading-none">
                    {m1Tiers[activeTier].size}
                  </span>
                  <span className="text-[13px] font-mono text-[#111111]/30">
                    {m1Tiers[activeTier].floors} floors
                  </span>
                </div>
                <p className="text-[16px] md:text-[18px] text-[#111111]/60 font-medium leading-[1.7] mb-8">
                  {m1Tiers[activeTier].desc}
                </p>
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="border-t border-[#111111]/10 pt-4">
                    <div className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#FF4D00] mb-2">Est. Cost</div>
                    <div className="text-[24px] font-display font-medium tracking-tight">{m1Tiers[activeTier].cost}</div>
                  </div>
                  <div className="border-t border-[#111111]/10 pt-4">
                    <div className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#FF4D00] mb-2">Capacity</div>
                    <div className="text-[24px] font-display font-medium tracking-tight">{m1Tiers[activeTier].population}</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-4">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={
                      activeTier === 0
                        ? "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
                        : activeTier === 1
                        ? "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
                        : "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80"
                    }
                    alt={`${m1Tiers[activeTier].tier} facility`}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   8 CORE TECHNOLOGIES, Grid with icons
   ══════════════════════════════════════════════════════════════════════════ */
function CoreTechnologiesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 px-6 md:px-12 lg:px-20 border-b border-[#111111]/10 bg-[#FAFAFA]"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mb-16 md:mb-24"
        >
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] mb-6 block">
            Core Technologies
          </span>
          <h2 className="text-[32px] md:text-[48px] lg:text-[60px] font-display font-medium tracking-tight leading-[1.05] mb-6">
            8 domains of <span className="text-[#111111]/40">independent innovation.</span>
          </h2>
          <p className="text-[17px] md:text-[19px] text-[#111111]/50 font-medium leading-relaxed">
            The technologies that will underpin every M1 Core and XEmbassy. These are the areas where we plan to support innovation and problem-solving within our community.
          </p>
        </motion.div>

        {/* Technology grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreTechnologies.map((tech, i) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                className="group border border-[#111111]/10 bg-white p-6 md:p-8 hover:border-[#FF4D00] transition-all duration-300"
              >
                <div className="w-12 h-12 border border-[#111111]/10 flex items-center justify-center mb-6 group-hover:border-[#FF4D00] group-hover:bg-[#FF4D00]/5 transition-all">
                  <Icon className="w-5 h-5 text-[#FF4D00]" strokeWidth={1.5} />
                </div>
                <h3 className="text-[18px] font-display font-medium tracking-tight mb-3">{tech.name}</h3>
                <p className="text-[13px] text-[#111111]/50 font-medium leading-[1.6]">{tech.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   ROUTE HUBS, Union of cities from the Route
   ══════════════════════════════════════════════════════════════════════════ */
function RouteHubsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeLeg, setActiveLeg] = useState<string | null>(null);

  // Group map locations by leg
  const hubsByLeg = routeLegs.map((leg) => ({
    leg,
    cities: MAP_LOCATIONS.filter((loc) => loc.legId === leg.id),
  }));

  const visibleHubs = activeLeg
    ? hubsByLeg.filter((h) => h.leg.id === activeLeg)
    : hubsByLeg;

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 px-6 md:px-12 lg:px-20 border-b border-[#111111]/10"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mb-12 md:mb-16"
        >
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] mb-6 block">
            Hubs on the Route
          </span>
          <h2 className="text-[32px] md:text-[48px] lg:text-[60px] font-display font-medium tracking-tight leading-[1.05] mb-6">
            A union of <span className="text-[#111111]/40">cities.</span>
          </h2>
          <p className="text-[17px] md:text-[19px] text-[#111111]/50 font-medium leading-relaxed">
            190+ projected hub locations across 6 legs and 63 countries. Each hub is designed as a node in the global internet of innovation — a physical place where ventures, capital, and talent can converge.
          </p>
        </motion.div>

        {/* Leg filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="flex flex-wrap gap-2 mb-12 md:mb-16"
        >
          <button
            suppressHydrationWarning
            onClick={() => setActiveLeg(null)}
            className={`px-3 py-1.5 text-[11px] font-mono font-bold tracking-widest uppercase border transition-colors min-h-[44px] ${
              activeLeg === null
                ? "bg-[#111111] text-white border-[#111111]"
                : "bg-white text-[#111111]/50 border-[#111111]/15 hover:border-[#111111]/30"
            }`}
          >
            All Legs
          </button>
          {routeLegs.map((leg) => (
            <button
              key={leg.id}
              suppressHydrationWarning
              onClick={() => setActiveLeg(activeLeg === leg.id ? null : leg.id)}
              className={`px-3 py-1.5 text-[11px] font-mono font-bold tracking-widest uppercase border transition-colors min-h-[44px] ${
                activeLeg === leg.id
                  ? "text-white border-transparent"
                  : "bg-white text-[#111111]/50 border-[#111111]/15 hover:border-[#111111]/30"
              }`}
              style={activeLeg === leg.id ? { backgroundColor: leg.color, borderColor: leg.color } : {}}
            >
              {leg.legNumber}. {leg.name.split(" ")[0]}
            </button>
          ))}
        </motion.div>

        {/* Hub groups by leg */}
        <div className="space-y-12">
          {visibleHubs.map(({ leg, cities }) => (
            <motion.div
              key={leg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Leg header */}
              <div className="flex items-center gap-4 mb-6 border-b border-[#111111]/10 pb-4">
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: leg.color }}
                />
                <h3 className="text-[20px] md:text-[24px] font-display font-medium tracking-tight">
                  Leg {leg.legNumber}: {leg.name}
                </h3>
                <span className="text-[11px] font-mono text-[#111111]/30 tracking-widest uppercase ml-auto">
                  {leg.hubCount} hubs · {leg.countries.length} countries
                </span>
              </div>

              {/* City cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {cities.map((city) => (
                  <div
                    key={city.id}
                    className="group border border-[#111111]/10 p-5 hover:border-[#FF4D00] transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-3.5 h-3.5 text-[#FF4D00]" />
                      <h4 className="text-[15px] font-display font-medium tracking-tight">{city.name}</h4>
                    </div>
                    <p className="text-[12px] text-[#111111]/40 font-medium leading-[1.5]">{city.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="text-center mt-16 md:mt-24"
        >
          <Link
            to="/routes"
            className="group inline-flex items-center gap-3 px-10 py-4 bg-[#111111] text-white text-[12px] font-bold tracking-[0.2em] uppercase hover:bg-[#FF4D00] transition-colors"
          >
            Explore the Full Route
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
