"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Cpu,
  Wrench,
  FlaskConical,
  Users,
  Bed,
  TreePine,
  Zap,
  Wheat,
  Plane,
  Droplets,
  Building2,
  Truck,
  ShieldCheck,
  Monitor,
  BookOpen,
  ChevronDown,
  Layers,
  Box,
  CircuitBoard,
  Brain,
  Factory,
  Cog,
  Target,
  TrendingUp,
  Database,
  Coffee,
  DoorOpen,
  Globe,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@/artemis/router";
import { ReviewSection } from "@/artemis/components/ReviewSection";

/* ══════════════════════════════════════════════════════════════════════════
   DATA — ALL IDEATION CONTENT
   ══════════════════════════════════════════════════════════════════════════ */

const levels = [
  {
    id: "membrane",
    number: "GROUND",
    name: "The Membrane",
    subtitle: "Where the outpost meets the world",
    icon: DoorOpen,
    method: null,
    items: [
      { title: "Logistics Throat", desc: "Loading docks, freight staging, material intake. Every venture's raw materials arrive here and route upward. No venture manages its own receiving." },
      { title: "Partner Interface", desc: "Glass-walled rooms along the street. Investors, anchor partners, government agencies — they don't go upstairs. Ventures come down." },
      { title: "Public Co-working Café", desc: "Open seating, strong WiFi, no badge required. Anyone can work here. This is where the city meets the outpost. Talent leaks in." },
      { title: "Route Transit Node", desc: "Schedules, cohort coordination." },
    ],
  },
  {
    id: "foundry",
    number: "LEVEL 1",
    name: "The Foundry",
    subtitle: "Where hardware gets built — faster than any standalone workshop",
    icon: Wrench,
    method: "Traditional hardware ventures design from scratch, source individually, prototype sequentially, test one configuration at a time. The Foundry reinvents this as a Build Line — shared component libraries eliminate redesign, parallel integration eliminates sequential waiting, shared test rigs eliminate the one-venture-one-rig bottleneck.",
    items: [
      { title: "Heavy Bays", desc: "Energy, manufacturing, space, mobility. Reconfigurable test rigs — same bay, different venture, different fixture. Overhead crane, three-phase power, fume extraction. Floor rated 500+ kg/sq m, 5m+ ceilings. Adjacent to loading docks — heavy materials roll in, not ride elevators.", subitems: ["Reconfigurable test rigs — same bay, different venture, different fixture", "Overhead crane, three-phase power, fume extraction", "Floor rated 500+ kg/sq m, 5m+ ceilings", "Adjacent to loading docks — heavy materials roll in, not ride elevators"] },
      { title: "Mid Bays", desc: "Agritech, healthtech, logistics hardware. Quick-change workstations: CNC, 3D printing, laser cutting in cells, not rows. Submit design file at 9am, pick up finished part by 5pm. Environmental test chambers. Small-scale pilot production rigs.", subitems: ["Quick-change workstations: CNC, 3D printing, laser cutting in cells, not rows", "Submit design file at 9am, pick up finished part by 5pm", "Environmental test chambers", "Small-scale pilot production rigs"] },
      { title: "Light Bays", desc: "IoT, robotics electronics, connected systems. Electronics assembly: pick-and-place, reflow, testing. Robotics integration: floor space for movement, safety barriers. Sensor calibration.", subitems: ["Electronics assembly: pick-and-place, reflow, testing", "Robotics integration: floor space for movement, safety barriers", "Sensor calibration"] },
      { title: "The Shared Island", desc: "Center of the Foundry. Not owned by any venture. Industrial metal 3D printers, 5-axis CNC, waterjet / plasma cutters, coordinate measuring machines, material testing rigs. The outpost's Gigapresses." },
      { title: "The Component Library", desc: "Standardized actuators, sensors, controllers, motors — characterized, tested, documented. A robotics venture doesn't design a motor from scratch. It pulls from the library. When Venture A tests and adds a new component, Venture B uses it next week. The library compounds with every venture." },
    ],
  },
  {
    id: "lab",
    number: "LEVEL 2",
    name: "The Lab",
    subtitle: "Where science produces validated findings — faster than any standalone lab",
    icon: FlaskConical,
    method: "Traditional science ventures build isolated labs, run one experiment at a time, and knowledge dies in company walls. The Lab reinvents this as stations in a discovery pipeline — where equipment runs 24/7 across multiple ventures' schedules, findings compound across the portfolio, and no bench sits idle waiting for one venture's next phase.",
    note: "Separated from the Foundry by an airlock transition — for environmental control, not security. Gowning, storage, decontamination buffer.",
    items: [
      { title: "Wet Zone", desc: "Biotech, life sciences, pharma, industrial bio. BSL-1/2 cabinets, PCR, centrifuges, spectrophotometers — shared, scheduled. Fermentation suites: bioreactors running across ventures' batches, not idle waiting for one. Cold chain: -80°C freezers, 4°C walk-ins, liquid nitrogen. Chemical storage, fume hoods, autoclave.", subitems: ["BSL-1/2 cabinets, PCR, centrifuges, spectrophotometers — shared, scheduled", "Fermentation suites: bioreactors running across ventures' batches, not idle waiting for one", "Cold chain: -80°C freezers, 4°C walk-ins, liquid nitrogen", "Chemical storage, fume hoods, autoclave"] },
      { title: "Clean Zone", desc: "Semiconductor, advanced materials, precision optics. ISO Class 7-8 clean rooms. Gowning airlock. Shared lithography, etching, deposition. Metrology: electron microscope, surface analysis.", subitems: ["ISO Class 7-8 clean rooms", "Gowning airlock", "Shared lithography, etching, deposition", "Metrology: electron microscope, surface analysis"] },
      { title: "Test Zone", desc: "Energy, climate, environmental. Grid simulation: programmable loads, inverter test benches. Battery testing: charge/discharge cycling, thermal containment. Environmental chambers: extreme temp, humidity, salt spray. Solar simulation.", subitems: ["Grid simulation: programmable loads, inverter test benches", "Battery testing: charge/discharge cycling, thermal containment", "Environmental chambers: extreme temp, humidity, salt spray", "Solar simulation"] },
    ],
    principles: [
      { title: "The Shared Bench Principle", desc: "No permanent lab benches. Assigned by project phase. A ProtoCo books a wet lab bench for 2 weeks for PCR validation. When it passes Gate review and moves to fermentation, it releases the PCR bench and books the bioreactor. Space flows to whoever needs it now." },
      { title: "The Compounding Principle", desc: "When Venture A develops an assay scaffold for target class X, Venture B working on the same class adapts it — not from scratch. When Venture A's medicinal chemist optimizes a lead compound, the SAR data enters the commons. Dead ends are never repeated. The pipeline produces validated findings per unit time that no isolated lab can match." },
    ],
  },
  {
    id: "studio",
    number: "LEVEL 3",
    name: "The Studio + Co-Working",
    subtitle: "Where software ships — faster than any standalone team",
    icon: Monitor,
    method: "Traditional software ventures spend months building infrastructure — auth, payments, notifications, CI/CD, deployment — before writing a single line of product code. The Studio reinvents this as a Ship Line — pre-built rails that ventures plug into on Day 1, so they ship product from week one, not month six.",
    items: [
      { title: "Co-working Neighborhoods", desc: "Not cubicles. Not hot desks. Neighborhoods — clusters of 4-8 desks around shared worktables, with adjacent breakout rooms and whiteboard walls. Your team sits together. Your neighbors are a different venture in a different domain. The biotech founder overhears the fintech founder's customer call and sees a parallel. Collision by design." },
      { title: "Venture Neighborhoods", desc: "4-8 desks per venture. Your territory." },
      { title: "Solo Desks", desc: "For mentors-in-residence, visiting Route travelers, independent operators. Scattered between neighborhoods." },
      { title: "Phone Booths", desc: "Soundproofed capsules for calls, deep focus." },
      { title: "Breakout Rooms", desc: "4-6 people, whiteboards, screens. Bookable." },
      { title: "Open Co-working", desc: "Larger shared area with flexible seating — for days when you don't need your neighborhood, you need to be around different people." },
      { title: "Domain-Adjacent Neighborhoods", desc: "AI/ML neighborhood — next to the GPU cluster room. Fiber connection. Acoustic buffer from cooling. Fintech/marketplace neighborhood — next to the regulatory intelligence terminal. Live compliance data from 39+ countries. DevOps/infra neighborhood — next to the server room. Venture design neighborhood — next to user testing rooms with eye-tracking." },
      { title: "The Compute Node", desc: "The Studio's Gigapress. GPU cluster: on-premise AI training, simulation, rendering. Pre-built application scaffolds: auth, identity, payments, notifications, data pipelines — already integrated, already tested across 39 countries. A fintech venture doesn't build KYC — it plugs into the outpost's KYC module. A marketplace doesn't build escrow — it plugs into the settlement engine. Shared CI/CD: 40+ ventures' code deployed through the same optimized pipeline. API gateway: shared services running, not configured per venture. Data lake: federated storage with domain datasets." },
    ],
    bottomLine: "A venture starts with 60% of its non-differentiating infrastructure already running. It ships to 39 countries on Day 1 because the deployment infrastructure already exists. Ventures produce working software per unit time that no standalone team can match.",
  },
  {
    id: "commons",
    number: "LEVEL 4",
    name: "The Commons",
    subtitle: "Where parallel work converges into companies",
    icon: Users,
    method: null,
    items: [
      { title: "Demo Theater", desc: "200 seats, broadcast capability. Gate reviews. Anchor partner demos. Pitch practice." },
      { title: "Investor Rooms", desc: "Private, screened, data room access." },
      { title: "The Archive", desc: "Every venture's operational Playbook, searchable by domain, stage, failure mode. Venture #5,000 doesn't repeat #100's mistakes." },
      { title: "Deal Rooms", desc: "Studios partnerships, Route Accords, cross-border settlement design." },
      { title: "Community Kitchen + Dining", desc: "ProtoCitizens cook together. Route Commons Feasts happen here." },
      { title: "Xcitizen Lounge", desc: "Where Archetypes find each other. Where the Hustler meets the Builder." },
    ],
    spatialLogic: "The software founder comes up from the Studio for lunch. The biotech founder comes down from the Lab for a meeting. The manufacturing founder comes up from the Foundry for a Gate review. Collision is architecturally forced. This is Bell Labs' cafeteria, made into an entire floor.",
  },
  {
    id: "living",
    number: "LEVEL 5",
    name: "The Living",
    subtitle: "Rest + Recovery",
    icon: Bed,
    method: null,
    items: [
      { title: "Residential Pods", desc: "Visiting founders, Route travelers, ProtoCitizens in the Crucible." },
      { title: "Night Lab", desc: "24/7 access to Studio and Lab subsets. Some breakthroughs happen at 2am." },
      { title: "Wellness", desc: "Gym, meditation, quiet rooms." },
      { title: "Rooftop Green Space", desc: "Fresh air, sky, distance from the machine." },
    ],
  },
];

const campusRing = [
  { name: "Energy Yard", icon: Zap, desc: "Solar arrays, battery storage, microgrid control. The outpost powers itself — the microgrid IS the test bed.", serves: "Energy ventures" },
  { name: "Agri Plots", icon: Wheat, desc: "Vertical farming rigs, sensor-equipped field rows, soil testing, cold storage.", serves: "Agritech ventures" },
  { name: "Drone Corridor", icon: Plane, desc: "Designated airspace, launch/recovery pad, obstacle courses.", serves: "Mobility / robotics" },
  { name: "Water Bay", icon: Droplets, desc: "Filtration, desalination, atmospheric harvesting, quality analysis.", serves: "Water ventures" },
  { name: "Construction Zone", icon: Building2, desc: "Prefab assembly, modular building testing, materials exposure.", serves: "Built environment" },
  { name: "Logistics Yard", icon: Truck, desc: "Freight staging, last-mile simulation, AV navigation courses.", serves: "Logistics / mobility" },
  { name: "Proving Ground", icon: ShieldCheck, desc: "UV, salt spray, dust, rain — real durability conditions.", serves: "Any venture" },
];

const clusterRethinks = [
  {
    id: "hive",
    number: "01",
    name: "The Hive",
    subtitle: "Co-Working + Software",
    icon: Monitor,
    whyCluster: "The Hive sprawls. It's the biggest cluster by area because it serves the most people. It's the least environmentally controlled — desks and WiFi don't need fume hoods or clean rooms. It's placed at the front of the campus, closest to the city, because it's the most porous. The café spills into it. The public enters it. The membrane between Hive and city is thin by design.",
  },
  {
    id: "foundry",
    number: "02",
    name: "The Foundry",
    subtitle: "Hardware Production",
    icon: Wrench,
    whyCluster: "The Foundry needs high ceilings, heavy floor loads, fume extraction, crane access, and loading dock adjacency. These requirements are incompatible with the Hive's need for quiet and the Lab's need for contamination control. It's a separate building — or a separate wing with its own HVAC, its own structural system, its own access points. Trucks back up to it. Cranes move over it. It's loud. It smells like machine coolant and welding. That's fine. That's what it's for.",
  },
  {
    id: "lab",
    number: "03",
    name: "The Lab",
    subtitle: "Science Production",
    icon: FlaskConical,
    whyCluster: "The Lab needs environmental isolation — positive and negative pressure zones, HEPA filtration, chemical waste handling, vibration isolation from the Foundry's heavy equipment. It can't share HVAC with the Foundry. It can't have forklifts driving through it. It's its own controlled environment — a separate structure with its own air handling, its own waste lines, its own emergency systems. The transition from Foundry to Lab is an airlock — not a stairwell.",
  },
  {
    id: "commons",
    number: "04",
    name: "The Commons",
    subtitle: "Convergence",
    icon: Users,
    whyCluster: "The Commons is the convergence point — the Tesla \"snap-together\" zone. It's placed at the CENTER of the campus, equidistant from Hive, Foundry, and Lab. Every venture passes through here daily. The software founder walks over from the Hive for lunch. The biotech founder walks over from the Lab for a meeting. The manufacturing founder walks over from the Foundry for a Gate review. Collision isn't hoped for — it's architecturally forced. The Commons is Bell Labs' cafeteria, given its own building.",
  },
  {
    id: "living",
    number: "05",
    name: "The Living",
    subtitle: "Rest + Recovery",
    icon: Bed,
    whyCluster: "People need to sleep. But they also need to be close enough to their work that 2am breakthroughs don't require a commute. The Living cluster is adjacent to the Hive and Lab — not separated by parking lots, but by a walkway. Close enough to feel connected. Far enough to have silence.",
  },
  {
    id: "extension",
    number: "06",
    name: "The Extension",
    subtitle: "Outdoor Production",
    icon: TreePine,
    whyCluster: "These aren't afterthoughts. They're production zones that happen to be outdoors — as essential to their domain as the Foundry is to hardware. The Extension sprawls beyond the clusters, radiating outward from the campus.",
  },
];

const moatPoints = [
  {
    number: "1",
    title: "Knowledge Compounds",
    icon: BookOpen,
    examples: [
      { domain: "Foundry", text: "When Venture A tests a new alloy and it fails at 200°C, that failure goes into the Component Library. Venture B — working on a product that also needs to survive high temperatures — sees that failure and avoids the alloy. Venture B doesn't spend 3 months learning what Venture A already learned. It starts from Venture A's endpoint." },
      { domain: "Lab", text: "When Venture A develops an assay scaffold for a class of drug targets, that scaffold goes into the Archive. Venture B — targeting a different disease in the same class — adapts the scaffold in days, not months. Venture B doesn't build from zero. It builds from Venture A's working baseline." },
      { domain: "Hive", text: "When Venture A navigates the telecom licensing process in Tanzania and writes the Playbook, Venture B entering Tanzania follows that Playbook. 47 ventures have done it before. The 48th doesn't rediscover anything. The regulatory maze is already mapped." },
    ],
    insight: "In the traditional model, knowledge is a line — each venture starts at zero and crawls forward alone. In the xCelero model, knowledge is a curve — each venture starts where the last one left off, and the curve accelerates with every addition. This is the most important single insight: the compounding of knowledge across ventures is the primary moat. You can copy the buildings. You can buy the same equipment. But you cannot copy 5,000 ventures' accumulated failures, adaptations, and Playbooks. That compound knowledge is irreplaceable. It took Ford years to work out the 45 steps. You can build an assembly line on day one, but you can't skip the years of learning what the steps should be.",
  },
  {
    number: "2",
    title: "Equipment Never Idles",
    icon: Cog,
    examples: [
      { domain: "Bioreactor", text: "A shared bioreactor running across 15 ventures' batches has near-zero downtime. When Venture A's fermentation finishes, Venture B's starts. The equipment runs 24/7 because there are always more ventures than available time." },
      { domain: "CNC Machine", text: "A shared CNC machine scheduled across 30 ventures' fabrication jobs has near-zero idle time. The queue is always full. The machine is always cutting." },
      { domain: "GPU Cluster", text: "A shared GPU cluster processing 40 ventures' training jobs has near-zero idle compute. When Venture A's model finishes training, Venture B's starts. The GPUs are always running." },
    ],
    insight: "In the traditional model, equipment utilization is 20-40% — because one venture can't keep a machine busy around the clock. In the xCelero model, equipment utilization approaches 90%+ — because 100 ventures collectively can. This isn't just cost savings. It's a fundamentally different production rate. The bioreactor that processes 15 ventures' candidates per year produces more validated leads per unit time than 15 separate bioreactors each running 30% of the time — because the scheduling eliminates gaps, the maintenance is centralized, and the throughput is optimized across the portfolio rather than within a single venture.",
  },
  {
    number: "3",
    title: "Capital Doesn't Duplicate",
    icon: Layers,
    examples: [
      { domain: "CNC CapEx", text: "100 ventures sharing 5 industrial CNC machines vs. 100 ventures each buying their own: Traditional: 100 × $200K = $20M in CNC CapEx, each machine used 30% of the time. xCelero: 5 × $200K = $1M in CNC CapEx, each machine used 90% of the time. Same output. 1/20th the capital." },
    ],
    insight: "The savings aren't marginal — they're orders of magnitude. And this compounds across every shared resource: GPU clusters, bioreactors, electron microscopes, environmental chambers, test rigs, clean rooms, regulatory Playbooks, component libraries, supply chain contracts. Each one is a Gigapress — massive shared infrastructure that no single venture could justify, but that the portfolio makes economic. The traditional model spends capital on duplication. The xCelero model spends capital on depth. Where a standalone venture buys one CNC machine, the outpost buys five — and gets 20x the utilization. Where a standalone venture builds one lab bench, the outpost builds a full discovery pipeline. The same capital, deployed at portfolio scale, produces infrastructure no single venture could ever afford.",
  },
  {
    number: "4",
    title: "The Method IS the Product",
    icon: Target,
    examples: [
      { domain: "Ford", text: "Ford's competitors had lathes, drills, and workers. They could have built an assembly line. But they didn't — because the method isn't obvious until someone invents it, and once invented, it's not just the machines that need copying — it's the entire organizational logic, the sequencing, the timing, the throughput optimization." },
      { domain: "Tesla", text: "Tesla's competitors have robots and stamping presses. They could build a Gigapress. But the Gigapress alone isn't the moat — it's the Unboxed method, the parallel sub-assembly, the integration logic that makes the Gigapress worth having." },
    ],
    insight: "xCelero's competitors can build co-working spaces with labs. They can buy CNC machines and bioreactors. But the equipment isn't the moat. The method is the moat. The method is: Knowledge compounds across the portfolio — every venture's failures and discoveries feed the next. Equipment runs at portfolio utilization, not venture utilization — orders of magnitude more throughput per dollar. Capital deploys at portfolio depth, not venture breadth — shared infrastructure no standalone venture could justify. Ventures produce in parallel, not in isolation — software team, hardware team, science team working simultaneously in different clusters, converging at the Commons. You can't copy this by copying the buildings. You'd need to copy the compounding — and compounding only works at portfolio scale, over time, with the Archive and the Playbooks and the Component Library and the accumulated intelligence of 5,000+ ventures. By the time a competitor realizes what the moat is, the compound curve is already years ahead.",
  },
  {
    number: "5",
    title: "Why This Changes Everything",
    icon: TrendingUp,
    examples: [],
    insight: "The traditional venture model is a linear model: each venture starts at zero, progresses alone, and either survives or dies. The survival rate is 10%. The time from idea to revenue is 2-5 years. The capital required to cross the valley of death is enormous, and most of it is spent on infrastructure — not on the product. The xCelero model is a compound model: each venture starts not at zero but at the accumulated endpoint of every venture before it. The survival rate is 75%. The time from idea to revenue compresses from years to months. The capital required drops by orders of magnitude — because the infrastructure already exists, the knowledge already compounds, and the equipment is already running. Linear vs. compound isn't an incremental improvement. It's a phase change. Ford didn't make cars 10% faster. He made them 80x faster. Tesla didn't make factories 10% smaller. They made them 70% smaller. xCelero doesn't make ventures 10% more likely to survive. It changes the survival rate from 10% to 75% — and compresses the timeline by orders of magnitude — by reinventing the method of production. That's the moat. Not the clusters. Not the equipment. The method. The compounding. The curve that accelerates with every venture added to the portfolio.",
  },
];

const ventureFlows = [
  {
    type: "Lightweight",
    examples: "SaaS, fintech, marketplace",
    path: "Studio + Commons. Never touches Foundry or Lab. Physical footprint: a desk.",
  },
  {
    type: "Mid-weight",
    examples: "Agritech, healthtech, logistics",
    path: "Software team in Studio, hardware prototyping in Foundry (Mid Bay), testing in Lab (Test Zone) + Campus Ring. Multiple levels in parallel.",
  },
  {
    type: "Deep-tech",
    examples: "Energy, biotech, semiconductors, space",
    path: "Touches every level + campus. Science team in Lab, hardware team in Foundry, software team in Studio, all converging at Commons. The most spatially intensive — this is why Cores exist at scale.",
  },
];

/* ══════════════════════════════════════════════════════════════════════════
   INFRA PAGE
   ══════════════════════════════════════════════════════════════════════════ */
export function Infra() {
  return (
    <div className="bg-white text-[#111111]">
      <HeroSection />
      <DesignPrincipleSection />
      <OutpostLevelsSection />
      <CampusRingSection />
      <FlowSection />
      <ClusterRethinkSection />
      <MoatSection />
      <CivilizationSection />
      <ReviewSection />
    </div>
  );
}

/* ── Helper: Animated section entry ── */
function SectionHeader({ label, title, accent, subtitle }: { label: string; title: string; accent: string; subtitle?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="max-w-3xl mb-12 md:mb-16"
    >
      <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] mb-6 block">
        {label}
      </span>
      <h2 className="text-[32px] md:text-[48px] lg:text-[60px] font-display font-medium tracking-tight leading-[1.05] mb-6">
        {title} <span className="text-[#111111]/40">{accent}</span>
      </h2>
      {subtitle && (
        <p className="text-[17px] md:text-[19px] text-[#111111]/50 font-medium leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
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
      <div className="w-full max-w-[1400px] mx-auto bg-[#111111] text-white px-6 md:px-12 lg:px-20 py-16 md:py-24 rounded-sm">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-[10px] font-mono font-bold tracking-[0.4em] uppercase text-[#FF4D00] mb-6 block">
            The Outpost
          </span>
          <h1 className="text-[36px] sm:text-[48px] md:text-[64px] lg:text-[80px] font-display font-medium tracking-[-0.03em] leading-[0.9] mb-6">
            Production-Method
            <br />
            <span className="text-[#FF4D00]">Architecture.</span>
          </h1>
          <p className="text-[16px] md:text-[18px] leading-[1.7] text-white/50 font-medium max-w-2xl">
            Not shared infrastructure. A reinvented method of production. The spatial arrangement exists to serve that method. The method IS the moat.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-12 md:mt-16 w-full h-[30vh] md:h-[50vh] overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=2000&q=80"
            alt="Outpost Campus Infrastructure"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   THE DESIGN PRINCIPLE — Ford / Tesla / xCelero
   ══════════════════════════════════════════════════════════════════════════ */
function DesignPrincipleSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const principles = [
    { subject: "Ford", statement: "didn't share a workshop. He reinvented the method — the way a car goes from raw materials to finished product — and that method was itself the moat. No one could match his output per unit time." },
    { subject: "Tesla", statement: "didn't parallelize a factory. They invented a new method — Gigapressing, Unboxed assembly — that produces cars per unit time no traditional line can match." },
    { subject: "xCelero", statement: "the outpost doesn't share labs. It reinvents the method by which ventures in each domain go from idea to working solution. The spatial arrangement exists to serve that method. The method IS the moat." },
  ];

  return (
    <section ref={ref} className="py-16 md:py-24 px-6 md:px-12 lg:px-20 border-b border-[#111111]/10">
      <div className="w-full max-w-[1400px] mx-auto">
        <SectionHeader label="The Design Principle" title="The method" accent="is the moat." />

        <div className="space-y-0">
          {principles.map((p, i) => (
            <motion.div
              key={p.subject}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * i, ease: "easeOut" }}
              className="grid lg:grid-cols-12 gap-4 lg:gap-12 border-b border-[#111111]/8 py-8 last:border-b-0"
            >
              <div className="lg:col-span-3">
                <span className="text-[11px] font-mono font-bold tracking-[0.15em] uppercase text-[#FF4D00]">{p.subject}</span>
              </div>
              <div className="lg:col-span-9">
                <p className="text-[16px] md:text-[18px] leading-[1.7] text-[#111111]/70 font-medium">{p.statement}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="mt-12 md:mt-16 bg-[#FAFAFA] border border-[#111111]/10 p-8 md:p-12"
        >
          <h3 className="text-[20px] md:text-[24px] font-display font-medium tracking-tight mb-6">What does this mean concretely?</h3>
          <div className="space-y-4">
            <p className="text-[15px] md:text-[17px] text-[#111111]/60 font-medium leading-[1.7]">
              The <strong className="text-[#111111]">Foundry</strong> isn&apos;t laid out as &quot;shared workshops&quot; — it&apos;s laid out so that hardware ventures produce working prototypes per unit time at a rate no standalone workshop can match.
            </p>
            <p className="text-[15px] md:text-[17px] text-[#111111]/60 font-medium leading-[1.7]">
              The <strong className="text-[#111111]">Lab</strong> isn&apos;t &quot;shared lab space&quot; — it&apos;s laid out so that science ventures produce validated findings per unit time at a rate no standalone lab can match.
            </p>
            <p className="text-[15px] md:text-[17px] text-[#111111]/60 font-medium leading-[1.7]">
              The <strong className="text-[#111111]">Studio</strong> isn&apos;t &quot;co-working with WiFi&quot; — it&apos;s laid out so that software ventures ship product per unit time at a rate no standalone team can match.
            </p>
          </div>
          <div className="border-t border-[#111111]/10 mt-8 pt-8">
            <p className="text-[15px] md:text-[17px] font-bold leading-[1.7] text-[#FF4D00]">
              The difference between &quot;shared infrastructure&quot; and &quot;reinvented production method&quot; is the difference between a co-working space and an assembly line. Both have desks. One produces at a fundamentally different rate.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   THE OUTPOST — Level-by-Level Layout (Original Format from Part 1)
   ══════════════════════════════════════════════════════════════════════════ */
function OutpostLevelsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [activeLevel, setActiveLevel] = useState("membrane");

  const active = levels.find((l) => l.id === activeLevel)!;

  return (
    <section ref={ref} className="py-16 md:py-24 px-6 md:px-12 lg:px-20 border-b border-[#111111]/10">
      <div className="w-full max-w-[1400px] mx-auto">
        <SectionHeader
          label="The Outpost — Under One Roof"
          title="The spatial"
          accent="layout."
          subtitle="From the ground up: how the outpost arranges production spaces so each domain operates at a rate no standalone facility can match."
        />

        {/* Level tabs */}
        <div className="flex flex-wrap gap-2 mb-10 md:mb-14">
          {levels.map((level) => {
            const Icon = level.icon;
            return (
              <button
                key={level.id}
                suppressHydrationWarning
                onClick={() => setActiveLevel(level.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-[11px] font-mono font-bold tracking-[0.1em] uppercase border transition-all min-h-[44px] ${
                  activeLevel === level.id
                    ? "bg-[#111111] text-white border-[#111111]"
                    : "bg-white text-[#111111]/40 border-[#111111]/10 hover:border-[#111111]/30"
                }`}
              >
                <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span className="hidden md:inline">{level.number}</span>
                <span className="md:hidden">{level.number.split(" ")[1]?.[0] || level.number[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Active level content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeLevel}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Level header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[11px] font-mono font-bold tracking-[0.15em] text-[#FF4D00]">{active.number}</span>
              </div>
              <h3 className="text-[28px] md:text-[40px] font-display font-medium tracking-tight leading-[1.1] mb-2">
                {active.name}
              </h3>
              <p className="text-[16px] md:text-[18px] text-[#111111]/50 font-medium leading-[1.6] italic">
                {active.subtitle}
              </p>
            </div>

            {/* Method explanation */}
            {active.method && (
              <div className="bg-[#FAFAFA] border border-[#111111]/10 p-6 md:p-8 mb-8">
                <div className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#FF4D00] mb-3">The Method</div>
                <p className="text-[15px] md:text-[17px] text-[#111111]/70 font-medium leading-[1.7]">
                  {active.method}
                </p>
              </div>
            )}

            {/* Airlock note for Lab */}
            {"note" in active && active.note && (
              <div className="bg-[#111111] text-white p-6 md:p-8 mb-8">
                <p className="text-[14px] md:text-[16px] text-white/60 font-medium leading-[1.7]">
                  {active.note}
                </p>
              </div>
            )}

            {/* Level items */}
            <div className="space-y-0 mb-8">
              {active.items.map((item, i) => (
                <div key={i} className="border-b border-[#111111]/8 py-5">
                  <h4 className="font-bold text-[15px] tracking-tight mb-2 text-[#111111]">{item.title}</h4>
                  <p className="text-[14px] text-[#111111]/50 font-medium leading-[1.6] mb-0">{item.desc}</p>
                  {"subitems" in item && item.subitems && (
                    <ul className="mt-3 space-y-1.5">
                      {(item.subitems as string[]).map((si, j) => (
                        <li key={j} className="text-[13px] text-[#111111]/40 font-medium leading-[1.5] pl-4 border-l-2 border-[#FF4D00]/20">
                          {si}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* Lab principles */}
            {"principles" in active && active.principles && (
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {(active.principles as { title: string; desc: string }[]).map((p, i) => (
                  <div key={i} className="bg-[#FAFAFA] border border-[#111111]/10 p-6 md:p-8">
                    <h4 className="font-bold text-[15px] tracking-tight mb-3 text-[#FF4D00]">{p.title}</h4>
                    <p className="text-[14px] text-[#111111]/50 font-medium leading-[1.6]">{p.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Studio bottom line */}
            {"bottomLine" in active && active.bottomLine && (
              <div className="bg-[#111111] text-white p-6 md:p-8 mb-8">
                <div className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#FF4D00] mb-3">The Bottom Line</div>
                <p className="text-[15px] md:text-[17px] text-white/70 font-medium leading-[1.7]">
                  {active.bottomLine as string}
                </p>
              </div>
            )}

            {/* Commons spatial logic */}
            {"spatialLogic" in active && active.spatialLogic && (
              <div className="bg-[#111111] text-white p-6 md:p-8 mb-8">
                <div className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#FF4D00] mb-3">The Spatial Logic</div>
                <p className="text-[15px] md:text-[17px] text-white/70 font-medium leading-[1.7]">
                  {active.spatialLogic as string}
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   CAMPUS RING — Outdoor Extension
   ══════════════════════════════════════════════════════════════════════════ */
function CampusRingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-16 md:py-24 px-6 md:px-12 lg:px-20 border-b border-[#111111]/10 bg-[#FAFAFA]">
      <div className="w-full max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mb-12 md:mb-16"
        >
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] mb-6 block">
            The Campus Ring
          </span>
          <h2 className="text-[32px] md:text-[48px] lg:text-[60px] font-display font-medium tracking-tight leading-[1.05] mb-6">
            What can&apos;t fit <span className="text-[#111111]/40">under the roof.</span>
          </h2>
          <p className="text-[17px] md:text-[19px] text-[#111111]/50 font-medium leading-relaxed">
            Needs sky, soil, or real-world conditions. These aren&apos;t afterthoughts — they&apos;re production zones that happen to be outdoors.
          </p>
        </motion.div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#111111]/10">
                <th className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#111111]/30 pb-4 pr-4">Zone</th>
                <th className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#111111]/30 pb-4 pr-4">What&apos;s There</th>
                <th className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#111111]/30 pb-4">Serves</th>
              </tr>
            </thead>
            <tbody>
              {campusRing.map((zone, i) => {
                const Icon = zone.icon;
                return (
                  <motion.tr
                    key={zone.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: i * 0.06, ease: "easeOut" }}
                    className="border-b border-[#111111]/8"
                  >
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-[#FF4D00]" strokeWidth={1.5} />
                        <span className="font-bold text-[14px]">{zone.name}</span>
                      </div>
                    </td>
                    <td className="py-4 pr-4">
                      <p className="text-[13px] text-[#111111]/50 font-medium leading-[1.5]">{zone.desc}</p>
                    </td>
                    <td className="py-4">
                      <span className="text-[12px] font-mono font-bold tracking-[0.08em] uppercase text-[#FF4D00]/60">{zone.serves}</span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   THE FLOW — How Ventures Move Through Space
   ══════════════════════════════════════════════════════════════════════════ */
function FlowSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-16 md:py-24 px-6 md:px-12 lg:px-20 border-b border-[#111111]/10">
      <div className="w-full max-w-[1400px] mx-auto">
        <SectionHeader label="The Flow" title="How ventures move" accent="through space." subtitle="Different venture categories need different levels. The spatial logic ensures each venture type has exactly the infrastructure it needs — nothing more, nothing less." />

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {ventureFlows.map((flow, i) => (
            <motion.div
              key={flow.type}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
              className="bg-white border border-[#111111]/10 p-6 md:p-8 hover:border-[#FF4D00]/30 transition-colors"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-[#FF4D00]" />
                <span className="text-[11px] font-mono font-bold tracking-[0.12em] uppercase text-[#FF4D00]">{flow.type}</span>
              </div>
              <p className="text-[12px] text-[#111111]/30 font-mono font-bold tracking-[0.08em] uppercase mb-4">{flow.examples}</p>
              <p className="text-[15px] text-[#111111]/60 font-medium leading-[1.7]">{flow.path}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   CLUSTER RETHINK — Why clusters, not levels (Updated Thought Process)
   ══════════════════════════════════════════════════════════════════════════ */
function ClusterRethinkSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCluster, setActiveCluster] = useState("hive");

  const active = clusterRethinks.find((c) => c.id === activeCluster)!;

  return (
    <section ref={ref} className="py-16 md:py-24 px-6 md:px-12 lg:px-20 border-b border-[#111111]/10 bg-[#111111] text-white">
      <div className="w-full max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mb-12 md:mb-16"
        >
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] mb-6 block">
            Rethinking the Layout
          </span>
          <h2 className="text-[32px] md:text-[48px] lg:text-[60px] font-display font-medium tracking-tight leading-[1.05] mb-6">
            Why clusters, <span className="text-white/40">not levels.</span>
          </h2>
        </motion.div>

        {/* Tesla/SpaceX comparison */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="border border-white/10 p-8 md:p-10"
          >
            <div className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#FF4D00] mb-4">Tesla Gigafactory</div>
            <p className="text-[15px] md:text-[17px] text-white/60 font-medium leading-[1.7]">
              Isn&apos;t a building with levels. It&apos;s a horizontal machine — casting here, stamping there, battery assembly there, final assembly there — each section a cluster of activity, arranged so materials flow naturally between them without vertical movement.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="border border-white/10 p-8 md:p-10"
          >
            <div className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#FF4D00] mb-4">SpaceX Boca Chica</div>
            <p className="text-[15px] md:text-[17px] text-white/60 font-medium leading-[1.7]">
              Isn&apos;t stacked floors. It&apos;s a campus — fabrication cluster, engine test cluster, launch cluster, recovery cluster — each with its own footprint, its own environmental requirements, connected by roads and rail.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="mb-12 md:mb-16"
        >
          <p className="text-[17px] md:text-[19px] font-display font-medium leading-[1.6] max-w-3xl">
            The outpost should be the same. Not a tower with a Foundry floor and a Lab floor and a Studio floor. But a <span className="text-[#FF4D00]">campus of clusters</span> — each cluster a zone optimized for its type of production, arranged horizontally so that flow between clusters is natural, and the whole campus reads as a single machine.
          </p>
        </motion.div>

        {/* Cluster tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {clusterRethinks.map((cluster) => {
            const Icon = cluster.icon;
            return (
              <button
                key={cluster.id}
                suppressHydrationWarning
                onClick={() => setActiveCluster(cluster.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-[11px] font-mono font-bold tracking-[0.1em] uppercase border transition-all min-h-[44px] ${
                  activeCluster === cluster.id
                    ? "bg-[#FF4D00] text-white border-[#FF4D00]"
                    : "bg-transparent text-white/40 border-white/10 hover:border-white/30"
                }`}
              >
                <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span className="hidden sm:inline">{cluster.name}</span>
                <span className="sm:hidden">{cluster.number}</span>
              </button>
            );
          })}
        </div>

        {/* Active cluster why */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCluster}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            <div className="border border-white/10 p-8 md:p-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[11px] font-mono font-bold tracking-[0.15em] text-[#FF4D00]">Cluster {active.number}</span>
                <span className="text-[11px] font-mono font-bold tracking-[0.1em] uppercase text-white/25">{active.subtitle}</span>
              </div>
              <h3 className="text-[24px] md:text-[32px] font-display font-medium tracking-tight mb-4">{active.name}</h3>
              <p className="text-[15px] md:text-[17px] text-white/60 font-medium leading-[1.7]">
                {active.whyCluster}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   THE MOAT — Why no one can copy this
   ══════════════════════════════════════════════════════════════════════════ */
function MoatSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeMoat, setActiveMoat] = useState("1");

  const active = moatPoints.find((m) => m.number === activeMoat)!;

  return (
    <section ref={ref} className="py-16 md:py-24 px-6 md:px-12 lg:px-20 border-b border-[#111111]/10">
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mb-8 md:mb-12"
        >
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] mb-6 block">
            The Moat
          </span>
          <h2 className="text-[32px] md:text-[48px] lg:text-[60px] font-display font-medium tracking-tight leading-[1.05] mb-6">
            Why no one can <span className="text-[#111111]/40">copy this.</span>
          </h2>
          <p className="text-[17px] md:text-[19px] text-[#111111]/50 font-medium leading-relaxed">
            Not the layout. Not the clusters. But WHY this produces at a rate no one can match — and why no one can simply copy the buildings and get the same result.
          </p>
        </motion.div>

        {/* Traditional model */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="bg-[#FAFAFA] border border-[#111111]/10 p-8 md:p-10 mb-12 md:mb-16"
        >
          <h3 className="text-[20px] md:text-[24px] font-display font-medium tracking-tight mb-4">
            What Traditional Ventures Do
          </h3>
          <p className="text-[15px] md:text-[17px] text-[#111111]/60 font-medium leading-[1.7] mb-4">
            A traditional venture — no matter how well-funded — operates in isolation. It builds its own lab. Sources its own equipment. Hires its own team. Discovers its own dead ends. Navigates its own regulatory maze. Builds its own supply chain. Makes its own mistakes. Dies its own death.
          </p>
          <div className="space-y-4 mt-6 border-t border-[#111111]/10 pt-6">
            <p className="text-[14px] text-[#111111]/50 font-medium leading-[1.7]">
              <strong className="text-[#111111]">Knowledge dies.</strong> When Venture A discovers that a certain component fails under humidity, that knowledge dies inside Venture A. When Venture B encounters the same humidity failure 6 months later, it spends the same 3 months debugging. Knowledge doesn&apos;t compound across ventures. It dies with each one.
            </p>
            <p className="text-[14px] text-[#111111]/50 font-medium leading-[1.7]">
              <strong className="text-[#111111]">Equipment idles.</strong> When Venture A&apos;s bioreactor sits idle for 4 hours between batches, that&apos;s 4 hours of zero production. When Venture B&apos;s bioreactor sits idle for 6 hours, that&apos;s 6 more. Across 100 ventures, that&apos;s hundreds of hours of idle equipment per day. Equipment doesn&apos;t compound across ventures. It fragments with each one.
            </p>
            <p className="text-[14px] text-[#111111]/50 font-medium leading-[1.7]">
              <strong className="text-[#111111]">Capital duplicates.</strong> When Venture A spends $200K on a CNC machine it uses 30% of the time, that&apos;s $140K of stranded capital. When Venture B spends $200K on the same CNC machine it also uses 30% of the time, that&apos;s another $140K stranded. Across 100 ventures, that&apos;s millions in duplicated CapEx. Capital doesn&apos;t compound across ventures. It duplicates with each one.
            </p>
          </div>
          <div className="border-t border-[#111111]/10 mt-6 pt-6">
            <p className="text-[15px] font-bold text-[#FF4D00]">
              The traditional model is: one venture, one of everything, zero compounding.
            </p>
          </div>
        </motion.div>

        {/* What xCelero Does Differently header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mb-8"
        >
          <h3 className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/30 mb-4">
            What xCelero Does Differently
          </h3>
        </motion.div>

        {/* Moat tabs */}
        <div className="flex flex-wrap gap-2 mb-8 md:mb-10">
          {moatPoints.map((point) => {
            const Icon = point.icon;
            return (
              <button
                key={point.number}
                suppressHydrationWarning
                onClick={() => setActiveMoat(point.number)}
                className={`flex items-center gap-2 px-4 py-2.5 text-[11px] font-mono font-bold tracking-[0.1em] uppercase border transition-all min-h-[44px] ${
                  activeMoat === point.number
                    ? "bg-[#111111] text-white border-[#111111]"
                    : "bg-white text-[#111111]/40 border-[#111111]/10 hover:border-[#111111]/30"
                }`}
              >
                <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
                {point.title}
              </button>
            );
          })}
        </div>

        {/* Active moat content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMoat}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {active.examples.length > 0 && (
              <div className="space-y-0 mb-8">
                {active.examples.map((example, i) => (
                  <div key={i} className="grid lg:grid-cols-12 gap-4 lg:gap-8 border-b border-[#111111]/8 py-6">
                    <div className="lg:col-span-3">
                      <span className="text-[11px] font-mono font-bold tracking-[0.12em] uppercase text-[#FF4D00]">{example.domain}</span>
                    </div>
                    <div className="lg:col-span-9">
                      <p className="text-[15px] text-[#111111]/60 font-medium leading-[1.7]">{example.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="bg-[#111111] text-white p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                {(() => { const Icon = active.icon; return <Icon className="w-5 h-5 text-[#FF4D00]" strokeWidth={1.5} />; })()}
                <span className="text-[11px] font-mono font-bold tracking-[0.15em] uppercase text-[#FF4D00]">
                  {active.number}. {active.title}
                </span>
              </div>
              <p className="text-[15px] md:text-[17px] text-white/70 font-medium leading-[1.8]">{active.insight}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   THE CIVILIZATION — Problem / Solution / Civilization
   ══════════════════════════════════════════════════════════════════════════ */
function CivilizationSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-16 md:py-24 px-6 md:px-12 lg:px-20">
      <div className="w-full max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mb-12 md:mb-16"
        >
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] mb-6 block">
            The Civilization
          </span>
          <h2 className="text-[32px] md:text-[48px] lg:text-[60px] font-display font-medium tracking-tight leading-[1.05] mb-6">
            The xCelero <span className="text-[#111111]/40">Scale.</span>
          </h2>
        </motion.div>

        {/* Problem */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="bg-[#FAFAFA] border border-[#111111]/10 p-8 md:p-12 mb-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-[#111111] text-white flex items-center justify-center text-[11px] font-mono font-bold">P</div>
            <span className="text-[11px] font-mono font-bold tracking-[0.15em] uppercase text-[#111111]/30">Problem</span>
          </div>
          <p className="text-[17px] md:text-[19px] text-[#111111]/70 font-medium leading-[1.7] mb-4">
            The Kardashev Scale measures civilization by energy output. One dimension. Myopic. The real bottleneck isn&apos;t energy — it&apos;s the rate at which ideas become working solutions.
          </p>
          <p className="text-[15px] md:text-[17px] text-[#111111]/50 font-medium leading-[1.7]">
            Today, that rate is glacial: 10 years for a drug, 18 months for a robot, 2 years for a hardware product, and 90% of ventures die trying. Not because the science doesn&apos;t work. Because the production method — isolated, sequential, duplicated — is fundamentally broken.
          </p>
        </motion.div>

        {/* Solution */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="bg-[#FAFAFA] border border-[#111111]/10 p-8 md:p-12 mb-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-[#FF4D00] text-white flex items-center justify-center text-[11px] font-mono font-bold">S</div>
            <span className="text-[11px] font-mono font-bold tracking-[0.15em] uppercase text-[#111111]/30">Solution</span>
          </div>
          <p className="text-[17px] md:text-[19px] text-[#111111]/70 font-medium leading-[1.7] mb-4">
            xCelero reinvents the production method.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            {[
              { label: "The Build Line", desc: "produces hardware prototypes per unit time no standalone workshop can match." },
              { label: "The Discovery Line", desc: "produces validated findings per unit time no isolated lab can match." },
              { label: "The Ship Line", desc: "ships working software per unit time no standalone team can match." },
              { label: "The Power Line", desc: "validates energy products per unit time no single test rig can match." },
            ].map((line, i) => (
              <div key={i} className="border border-[#111111]/8 p-4">
                <div className="text-[13px] font-bold text-[#FF4D00] mb-1">{line.label}</div>
                <p className="text-[13px] text-[#111111]/50 font-medium leading-[1.6]">{line.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-[15px] md:text-[17px] text-[#111111]/50 font-medium leading-[1.7] mt-6">
            Knowledge compounds across the portfolio. Equipment runs at portfolio utilization. Capital deploys at portfolio depth. Ventures produce in parallel, not in isolation. The outpost is the machine — clusters of optimized production zones, connected by flow, powered by compounding. The method is the moat, and the moat deepens with every venture that passes through.
          </p>
        </motion.div>

        {/* Civilization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="bg-[#111111] text-white p-8 md:p-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-[#FF4D00] text-white flex items-center justify-center text-[11px] font-mono font-bold">C</div>
            <span className="text-[11px] font-mono font-bold tracking-[0.15em] uppercase text-white/30">Civilization</span>
          </div>
          <h3 className="text-[24px] md:text-[32px] font-display font-medium tracking-tight leading-[1.15] mb-6">
            The xCelero Scale measures civilization not by energy, but by <span className="text-[#FF4D00]">working solutions per unit time per outpost.</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="border border-white/10 p-6">
              <div className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-white/30 mb-3">Type 0</div>
              <p className="text-[15px] text-white/60 font-medium leading-[1.7]">
                Produces solutions sequentially — one lab, one company, one country at a time. 90% die.
              </p>
            </div>
            <div className="border border-[#FF4D00]/30 p-6 bg-[#FF4D00]/5">
              <div className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#FF4D00] mb-3">Type 1</div>
              <p className="text-[15px] text-white/70 font-medium leading-[1.7]">
                Produces solutions through compound production methods — where every venture starts at the accumulated endpoint of every venture before it, where equipment never idles, where capital never duplicates, where the curve accelerates with every addition.
              </p>
            </div>
          </div>
          <p className="text-[16px] md:text-[18px] font-display font-medium leading-[1.6] text-white/80">
            The outpost is the unit cell. The method is the moat. Replicated 190 times across 39 countries, this isn&apos;t a venture platform. <span className="text-[#FF4D00]">It&apos;s a new method of invention itself.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
