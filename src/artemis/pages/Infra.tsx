"use client";

import { useRef, useState, useEffect, useCallback } from "react";
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
  Layers,
  Box,
  CircuitBoard,
  Brain,
  Factory,
  Cog,
  Target,
  TrendingUp,
  DoorOpen,
  MapPin,
  Atom,
  Eye,
  Link2,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@/artemis/router";
import { ReviewSection } from "@/artemis/components/ReviewSection";
import { routeLegs, MAP_LOCATIONS } from "@/artemis/data/routes";

/* ══════════════════════════════════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════════════════════════════════ */

const levels = [
  {
    id: "membrane", number: "GROUND", name: "The Membrane", subtitle: "Where the outpost meets the world", icon: DoorOpen, image: "/infra/membrane-ground.png", method: null as string | null,
    items: [
      { title: "Logistics Throat", desc: "Loading docks, freight staging, material intake. Every venture's raw materials arrive here and route upward. No venture manages its own receiving." },
      { title: "Partner Interface", desc: "Glass-walled rooms along the street. Investors, anchor partners, government agencies — they don't go upstairs. Ventures come down." },
      { title: "Public Co-working Café", desc: "Open seating, strong WiFi, no badge required. Anyone can work here. This is where the city meets the outpost. Talent leaks in." },
      { title: "Route Transit Node", desc: "Schedules, cohort coordination." },
    ],
  },
  {
    id: "foundry", number: "LEVEL 1", name: "The Foundry", subtitle: "Where hardware gets built — faster than any standalone workshop", icon: Wrench, image: "/infra/foundry-interior.png",
    method: "Traditional hardware ventures design from scratch, source individually, prototype sequentially, test one configuration at a time. The Foundry reinvents this as a Build Line — shared component libraries eliminate redesign, parallel integration eliminates sequential waiting, shared test rigs eliminate the one-venture-one-rig bottleneck.",
    items: [
      { title: "Heavy Bays", desc: "Energy, manufacturing, space, mobility. Reconfigurable test rigs. Overhead crane, three-phase power, fume extraction. Floor rated 500+ kg/sq m, 5m+ ceilings. Adjacent to loading docks.", subitems: ["Reconfigurable test rigs — same bay, different venture, different fixture", "Overhead crane, three-phase power, fume extraction", "Floor rated 500+ kg/sq m, 5m+ ceilings", "Adjacent to loading docks — heavy materials roll in, not ride elevators"] },
      { title: "Mid Bays", desc: "Agritech, healthtech, logistics hardware. Quick-change workstations: CNC, 3D printing, laser cutting in cells, not rows. Submit design file at 9am, pick up finished part by 5pm.", subitems: ["Quick-change workstations: CNC, 3D printing, laser cutting in cells", "Submit design file at 9am, pick up finished part by 5pm", "Environmental test chambers", "Small-scale pilot production rigs"] },
      { title: "Light Bays", desc: "IoT, robotics electronics, connected systems. Electronics assembly: pick-and-place, reflow, testing. Robotics integration: floor space for movement, safety barriers.", subitems: ["Electronics assembly: pick-and-place, reflow, testing", "Robotics integration: floor space for movement, safety barriers", "Sensor calibration"] },
      { title: "The Shared Island", desc: "Center of the Foundry. Not owned by any venture. Industrial metal 3D printers, 5-axis CNC, waterjet / plasma cutters, coordinate measuring machines. The outpost's Gigapresses." },
      { title: "The Component Library", desc: "Standardized actuators, sensors, controllers, motors — characterized, tested, documented. A robotics venture doesn't design a motor from scratch. It pulls from the library. When Venture A tests and adds a new component, Venture B uses it next week." },
    ],
  },
  {
    id: "lab", number: "LEVEL 2", name: "The Lab", subtitle: "Where science produces validated findings — faster than any standalone lab", icon: FlaskConical, image: "/infra/lab-interior.png",
    method: "Traditional science ventures build isolated labs, run one experiment at a time, and knowledge dies in company walls. The Lab reinvents this as stations in a discovery pipeline — where equipment runs 24/7 across multiple ventures' schedules, findings compound across the portfolio, and no bench sits idle.",
    note: "Separated from the Foundry by an airlock transition — for environmental control, not security. Gowning, storage, decontamination buffer.",
    items: [
      { title: "Wet Zone", desc: "Biotech, life sciences, pharma, industrial bio. BSL-1/2 cabinets, PCR, centrifuges, spectrophotometers — shared, scheduled. Fermentation suites: bioreactors running across ventures' batches. Cold chain: -80°C freezers, 4°C walk-ins, liquid nitrogen.", subitems: ["BSL-1/2 cabinets, PCR, centrifuges, spectrophotometers — shared, scheduled", "Fermentation suites: bioreactors running across ventures' batches", "Cold chain: -80°C freezers, 4°C walk-ins, liquid nitrogen", "Chemical storage, fume hoods, autoclave"] },
      { title: "Clean Zone", desc: "Semiconductor, advanced materials, precision optics. ISO Class 7-8 clean rooms. Gowning airlock. Shared lithography, etching, deposition. Metrology: electron microscope, surface analysis.", subitems: ["ISO Class 7-8 clean rooms", "Gowning airlock", "Shared lithography, etching, deposition", "Metrology: electron microscope, surface analysis"] },
      { title: "Test Zone", desc: "Energy, climate, environmental. Grid simulation: programmable loads, inverter test benches. Battery testing: charge/discharge cycling, thermal containment. Environmental chambers: extreme temp, humidity, salt spray.", subitems: ["Grid simulation: programmable loads, inverter test benches", "Battery testing: charge/discharge cycling, thermal containment", "Environmental chambers: extreme temp, humidity, salt spray", "Solar simulation"] },
    ],
    principles: [
      { title: "The Shared Bench Principle", desc: "No permanent lab benches. Assigned by project phase. A ProtoCo books a wet lab bench for 2 weeks for PCR validation. When it passes Gate review and moves to fermentation, it releases the PCR bench and books the bioreactor. Space flows to whoever needs it now." },
      { title: "The Compounding Principle", desc: "When Venture A develops an assay scaffold for target class X, Venture B working on the same class adapts it — not from scratch. Dead ends are never repeated. The pipeline produces validated findings per unit time that no isolated lab can match." },
    ],
  },
  {
    id: "studio", number: "LEVEL 3", name: "The Studio + Co-Working", subtitle: "Where software ships — faster than any standalone team", icon: Monitor, image: "/infra/studio-interior.png",
    method: "Traditional software ventures spend months building infrastructure — auth, payments, notifications, CI/CD, deployment — before writing a single line of product code. The Studio reinvents this as a Ship Line — pre-built rails that ventures plug into on Day 1, so they ship product from week one, not month six.",
    items: [
      { title: "Co-working Neighborhoods", desc: "Not cubicles. Not hot desks. Neighborhoods — clusters of 4-8 desks around shared worktables, with adjacent breakout rooms and whiteboard walls. Your team sits together. Your neighbors are a different venture in a different domain. Collision by design." },
      { title: "Venture Neighborhoods", desc: "4-8 desks per venture. Your territory." },
      { title: "Solo Desks", desc: "For mentors-in-residence, visiting Route travelers, independent operators." },
      { title: "Phone Booths", desc: "Soundproofed capsules for calls, deep focus." },
      { title: "Breakout Rooms", desc: "4-6 people, whiteboards, screens. Bookable." },
      { title: "Open Co-working", desc: "Larger shared area with flexible seating." },
      { title: "Domain-Adjacent Neighborhoods", desc: "AI/ML neighborhood — next to the GPU cluster room. Fiber connection. Fintech/marketplace neighborhood — next to the regulatory intelligence terminal. DevOps/infra neighborhood — next to the server room. Venture design neighborhood — next to user testing rooms with eye-tracking." },
      { title: "The Compute Node", desc: "The Studio's Gigapress. GPU cluster: on-premise AI training, simulation, rendering. Pre-built application scaffolds: auth, identity, payments, notifications, data pipelines — already integrated, already tested across 39 countries. A fintech venture doesn't build KYC — it plugs into the outpost's KYC module. Shared CI/CD: 40+ ventures' code deployed through the same optimized pipeline." },
    ],
    bottomLine: "A venture starts with 60% of its non-differentiating infrastructure already running. It ships to 39 countries on Day 1 because the deployment infrastructure already exists.",
  },
  {
    id: "commons", number: "LEVEL 4", name: "The Commons", subtitle: "Where parallel work converges into companies", icon: Users, image: "/infra/commons-interior.png", method: null as string | null,
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
    id: "living", number: "LEVEL 5", name: "The Living", subtitle: "Rest + Recovery", icon: Bed, image: "/infra/commons-interior.png", method: null as string | null,
    items: [
      { title: "Residential Pods", desc: "Visiting founders, Route travelers, ProtoCitizens in the Crucible." },
      { title: "Night Lab", desc: "24/7 access to Studio and Lab subsets. Some breakthroughs happen at 2am." },
      { title: "Wellness", desc: "Gym, meditation, quiet rooms." },
      { title: "Rooftop Green Space", desc: "Fresh air, sky, distance from the machine." },
    ],
  },
];

const campusRing = [
  { name: "Energy Yard", icon: Zap, desc: "Solar arrays, battery storage, microgrid control.", serves: "Energy" },
  { name: "Agri Plots", icon: Wheat, desc: "Vertical farming rigs, sensor-equipped field rows, soil testing.", serves: "Agritech" },
  { name: "Drone Corridor", icon: Plane, desc: "Designated airspace, launch/recovery pad, obstacle courses.", serves: "Mobility" },
  { name: "Water Bay", icon: Droplets, desc: "Filtration, desalination, atmospheric harvesting, quality analysis.", serves: "Water" },
  { name: "Construction Zone", icon: Building2, desc: "Prefab assembly, modular building testing, materials exposure.", serves: "Built env" },
  { name: "Logistics Yard", icon: Truck, desc: "Freight staging, last-mile simulation, AV navigation courses.", serves: "Logistics" },
  { name: "Proving Ground", icon: ShieldCheck, desc: "UV, salt spray, dust, rain — real durability conditions.", serves: "Any" },
];

const clusterData = [
  { id: "hive", num: "01", name: "The Hive", sub: "Co-Working + Software", icon: Monitor, image: "/infra/studio-interior.png", why: "The biggest cluster by area. Least environmentally controlled — desks and WiFi don't need fume hoods. Placed at the front of campus, closest to the city. The café spills into it. The membrane between Hive and city is thin by design." },
  { id: "foundry", num: "02", name: "The Foundry", sub: "Hardware Production", icon: Wrench, image: "/infra/foundry-interior.png", why: "Needs high ceilings, heavy floor loads, fume extraction, crane access, loading dock adjacency. Separate building with its own HVAC, its own structural system. Trucks back up to it. It's loud. That's what it's for." },
  { id: "lab", num: "03", name: "The Lab", sub: "Science Production", icon: FlaskConical, image: "/infra/lab-interior.png", why: "Needs environmental isolation — positive/negative pressure, HEPA filtration, chemical waste handling, vibration isolation. Can't share HVAC with the Foundry. The transition from Foundry to Lab is an airlock — not a stairwell." },
  { id: "commons", num: "04", name: "The Commons", sub: "Convergence", icon: Users, image: "/infra/commons-interior.png", why: "The convergence point. Placed at the CENTER, equidistant from Hive, Foundry, and Lab. Every venture passes through here daily. Collision isn't hoped for — it's architecturally forced." },
  { id: "living", num: "05", name: "The Living", sub: "Rest + Recovery", icon: Bed, image: "/infra/commons-interior.png", why: "Adjacent to Hive and Lab — not separated by parking lots, but by a walkway. Close enough to feel connected. Far enough to have silence." },
  { id: "extension", num: "06", name: "The Extension", sub: "Outdoor Production", icon: TreePine, image: "/infra/campus-ring.png", why: "Production zones that happen to be outdoors — as essential to their domain as the Foundry is to hardware. Radiates outward from the campus." },
];

const moatPoints = [
  { number: "01", title: "Knowledge Compounds", icon: BookOpen, examples: [
    { domain: "Foundry", text: "When Venture A tests a new alloy and it fails at 200°C, that failure goes into the Component Library. Venture B avoids the alloy. It starts from Venture A's endpoint." },
    { domain: "Lab", text: "When Venture A develops an assay scaffold, Venture B adapts it in days, not months. It builds from Venture A's working baseline." },
    { domain: "Hive", text: "When Venture A navigates telecom licensing in Tanzania, Venture B follows that Playbook. 47 ventures have done it before. The 48th doesn't rediscover anything." },
  ], insight: "The compounding of knowledge across ventures is the primary moat. You can copy the buildings. You can buy the same equipment. But you cannot copy 5,000 ventures' accumulated failures, adaptations, and Playbooks." },
  { number: "02", title: "Equipment Never Idles", icon: Cog, examples: [
    { domain: "Bioreactor", text: "A shared bioreactor running across 15 ventures' batches has near-zero downtime. When Venture A's fermentation finishes, Venture B's starts." },
    { domain: "CNC Machine", text: "A shared CNC machine scheduled across 30 ventures' fabrication jobs has near-zero idle time. The queue is always full." },
    { domain: "GPU Cluster", text: "A shared GPU cluster processing 40 ventures' training jobs has near-zero idle compute. The GPUs are always running." },
  ], insight: "Equipment utilization approaches 90%+ because 100 ventures collectively can keep machines busy. This isn't just cost savings — it's a fundamentally different production rate." },
  { number: "03", title: "Capital Doesn't Duplicate", icon: Layers, examples: [
    { domain: "CNC CapEx", text: "100 ventures sharing 5 CNC machines vs. each buying their own: $1M vs. $20M in CapEx. Same output. 1/20th the capital." },
  ], insight: "The savings aren't marginal — they're orders of magnitude. The same capital, deployed at portfolio scale, produces infrastructure no single venture could ever afford." },
  { number: "04", title: "The Method IS the Product", icon: Target, examples: [
    { domain: "Ford", text: "Ford's competitors had lathes, drills, and workers. They could have built an assembly line. But they didn't — because the method isn't obvious until someone invents it." },
    { domain: "Tesla", text: "Tesla's competitors have robots and stamping presses. But the Gigapress alone isn't the moat — it's the Unboxed method that makes it worth having." },
  ], insight: "xCelero's competitors can build co-working spaces with labs. But the equipment isn't the moat. The method is the moat. You'd need to copy the compounding — and compounding only works at portfolio scale, over time." },
  { number: "05", title: "Why This Changes Everything", icon: TrendingUp, examples: [], insight: "Linear vs. compound isn't an incremental improvement. It's a phase change. Ford didn't make cars 10% faster. He made them 80x faster. xCelero changes the survival rate from 10% to 75% by reinventing the method of production." },
];

const coreTechnologies = [
  { name: "Robotics", icon: CircuitBoard, desc: "Autonomous systems for manufacturing, logistics, and hazardous environments." },
  { name: "Connected Systems", icon: Link2, desc: "IoT, mesh networks, and real-time sensor infrastructure." },
  { name: "Artificial Intelligence", icon: Brain, desc: "Edge AI, multilingual LLMs, and decision platforms." },
  { name: "Material Science", icon: Box, desc: "Mycelium composites, bio-plastics, and novel semiconductors." },
  { name: "Blockchain", icon: Cpu, desc: "Decentralized identity, traceability ledgers, and trustless settlement." },
  { name: "Additive Mfg", icon: Factory, desc: "3D printing, CNC, and modular micro-factories." },
  { name: "Quantum Computing", icon: Atom, desc: "Quantum sensing and unbreakable encryption." },
  { name: "Computer Vision", icon: Eye, desc: "Real-time diagnostics, satellite analytics, autonomous navigation." },
];

const caseComparisons = [
  { founder: "Jeff Bezos", company: "Amazon", context: "USA, 1994", advantage: "He didn't need to build a banking system — credit cards and ACH already existed. He didn't need to build delivery infrastructure — FedEx and UPS already covered every address. The entire financial stack was mature, trusted, and ubiquitous.", takeaway: "The infrastructure was invisible because it was already there.", icon: "📦" },
  { founder: "Elon Musk", company: "Tesla / SpaceX", context: "USA, 2002", advantage: "He could recruit from Stanford and MIT. File patents in a legal system that enforced them. Raise capital on Sand Hill Road. The roads were already paved. The grid was already stable. The regulatory framework was codified and navigable.", takeaway: "Every system the venture needed was already operational.", icon: "🚀" },
  { founder: "A builder in Kampala", company: "Any venture", context: "Uganda, 2024", advantage: "No mature payments infrastructure. No reliable last-mile logistics. No deep-tech talent pipeline — the best engineers emigrate. No venture capital ecosystem. The grid fails daily. Legal frameworks shift without notice. Supply chains are informal, opaque, and cash-dependent.", takeaway: "Before you build the product, you must first build the ground it stands on.", icon: "🏗️" },
];

const ventureFlows = [
  { type: "Lightweight", examples: "SaaS, fintech, marketplace", path: "Studio + Commons. Never touches Foundry or Lab. Physical footprint: a desk.", icon: Monitor },
  { type: "Mid-weight", examples: "Agritech, healthtech, logistics", path: "Software team in Studio, hardware prototyping in Foundry, testing in Lab + Campus Ring. Multiple levels in parallel.", icon: Cog },
  { type: "Deep-tech", examples: "Energy, biotech, semiconductors, space", path: "Touches every level + campus. Science in Lab, hardware in Foundry, software in Studio, all converging at Commons.", icon: Atom },
];

/* ══════════════════════════════════════════════════════════════════════════
   SECTION IDS (for side nav)
   ══════════════════════════════════════════════════════════════════════════ */
const sectionIds = [
  "infra-hero",
  "infra-case",
  "infra-outpost-model",
  "infra-levels",
  "infra-campus-ring",
  "infra-core-tech",
  "infra-flow",
  "infra-moat",
  "infra-hubs",
  "infra-civilization",
];

/* ══════════════════════════════════════════════════════════════════════════
   ANIMATION HELPERS
   ══════════════════════════════════════════════════════════════════════════ */

const fadeUp = {
  initial: { opacity: 0, y: 40 } as const,
  animate: { opacity: 1, y: 0 } as const,
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};
const stagger = (i: number) => ({
  initial: { opacity: 0, y: 30 } as const,
  animate: { opacity: 1, y: 0 } as const,
  transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
});

function useFade() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return { ref, isInView };
}

/* ══════════════════════════════════════════════════════════════════════════
   STICKY SIDE NAV
   ══════════════════════════════════════════════════════════════════════════ */
function StickySideNav({ activeIndex }: { activeIndex: number }) {
  return (
    <nav className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-3 items-end" aria-label="Section navigation">
      {sectionIds.map((id, i) => (
        <a
          key={id}
          href={`#${id}`}
          className="group flex items-center gap-3"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[#111] bg-white/90 backdrop-blur px-2 py-1 rounded">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span
            className={`block rounded-full transition-all duration-300 ${
              activeIndex === i
                ? "w-3 h-3 bg-[#FF4D00]"
                : "w-2 h-2 bg-[#111]/20 group-hover:bg-[#111]/40"
            }`}
          />
        </a>
      ))}
    </nav>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   SECTION NUMBER
   ══════════════════════════════════════════════════════════════════════════ */
function SectionNumber({ n, light = false }: { n: string; light?: boolean }) {
  return (
    <span
      className={`text-[120px] md:text-[160px] font-display font-bold leading-none select-none pointer-events-none absolute -top-4 -left-2 md:-left-4 ${
        light ? "text-[#111]/[0.04]" : "text-white/[0.04]"
      }`}
    >
      {n}
    </span>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PULL QUOTE
   ══════════════════════════════════════════════════════════════════════════ */
function PullQuote({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <blockquote
      className={`text-[24px] md:text-[32px] lg:text-[40px] font-display font-medium italic tracking-[-0.02em] leading-[1.2] my-12 md:my-16 max-w-3xl ${
        light ? "text-[#111]/60" : "text-white/50"
      }`}
    >
      {children}
    </blockquote>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   INFRA PAGE
   ══════════════════════════════════════════════════════════════════════════ */
export function Infra() {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionIds.indexOf(entry.target.id);
            if (idx !== -1) setActiveSection(idx);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-10% 0px -10% 0px" }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-white text-[#111]">
      <StickySideNav activeIndex={activeSection} />
      <HeroSection />
      <CaseSection />
      <OutpostModelSection />
      <LevelsSection />
      <CampusRingSection />
      <CoreTechSection />
      <FlowSection />
      <MoatSection />
      <HubsSection />
      <CivilizationSection />
      <ReviewSection />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   01. HERO — DARK
   Contained dark hero with campus image background, stats strip
   ══════════════════════════════════════════════════════════════════════════ */
function HeroSection() {
  const { ref, isInView } = useFade();
  return (
    <section
      id="infra-hero"
      ref={ref}
      className="pt-0 pb-3 md:pb-4"
    >
      <div className="w-full max-w-[1400px] mx-auto bg-[#111] text-white rounded-sm overflow-hidden">
        <div className="relative min-h-[85vh] flex items-end px-6 md:px-12 lg:px-20 pb-16 md:pb-24 pt-40">
          {/* Background image */}
          <div className="absolute inset-0">
            <img
              src="/infra/outpost-campus.png"
              alt=""
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/70 to-[#111]/30" />
          </div>

          {/* Content */}
          <div className="relative w-full">
            <motion.div
              {...fadeUp}
              animate={isInView ? fadeUp.animate : { opacity: 0, y: 40 }}
            >
              <span className="text-[10px] font-mono font-bold tracking-[0.4em] uppercase text-[#FF4D00] mb-8 block">
                The Outpost
              </span>
              <h1 className="text-[48px] sm:text-[64px] md:text-[88px] lg:text-[112px] font-display font-medium tracking-[-0.05em] leading-[0.85] text-white mb-8">
                Production-Method
                <br />
                <span className="text-[#FF4D00]">Architecture.</span>
              </h1>
              <p className="text-[16px] md:text-[18px] leading-[1.7] text-white/40 font-medium max-w-xl mb-16">
                Not shared infrastructure. A reinvented method of production. The
                spatial arrangement exists to serve that method. The method IS the
                moat.
              </p>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-stretch border-t border-white/10 pt-8"
            >
              {[
                { value: "10,000", label: "ventures" },
                { value: "190+", label: "hubs" },
                { value: "39+", label: "countries" },
                { value: "5", label: "layers" },
                { value: "13", label: "domains" },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className={`flex-1 min-w-[120px] py-4 ${
                    i > 0 ? "border-l border-white/10 pl-6 md:pl-8" : ""
                  }`}
                >
                  <div className="text-[32px] md:text-[48px] font-display font-medium tracking-tighter text-[#FF4D00] leading-none">
                    {s.value}
                  </div>
                  <div className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/25 mt-2">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   02. CASE FOR INFRASTRUCTURE — LIGHT
   ══════════════════════════════════════════════════════════════════════════ */
function CaseSection() {
  const { ref, isInView } = useFade();
  const [activeCase, setActiveCase] = useState(2);

  return (
    <section
      id="infra-case"
      ref={ref}
      className="py-3 md:py-4"
    >
      <div className="w-full max-w-[1400px] mx-auto bg-white text-[#111] rounded-sm px-6 md:px-12 lg:px-20 py-24 md:py-36">
        {/* Header with big number */}
        <div className="relative mb-16 md:mb-24">
          <SectionNumber n="02" light />
          <motion.div
            {...fadeUp}
            animate={isInView ? fadeUp.animate : { opacity: 0, y: 40 }}
            className="relative z-10"
          >
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] mb-4 block">
              The Case for Infrastructure
            </span>
            <h2 className="text-[36px] md:text-[52px] lg:text-[68px] font-display font-medium tracking-[-0.03em] leading-[0.95] text-[#111]">
              Infrastructure is the
              <br />
              <span className="text-[#111]/25">
                invisible prerequisite.
              </span>
            </h2>
          </motion.div>
        </div>

        {/* Bento grid: image + cards */}
        <div className="grid lg:grid-cols-12 gap-5 lg:gap-6 mb-12">
          {/* Left: inset image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-4 relative overflow-hidden rounded-sm min-h-[320px] lg:min-h-[520px] shadow-xl"
          >
            <img
              src="/infra/case-for-infra.png"
              alt="Case for Infrastructure"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111]/80 via-[#111]/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 md:p-8">
              <p className="text-[14px] text-white/60 font-medium leading-[1.7] max-w-xs">
                In the West, infrastructure is invisible — it already exists.
                In the Global South, it&apos;s the first thing you have to
                build.
              </p>
            </div>
          </motion.div>

          {/* Right: stacked comparison cards */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {caseComparisons.map((c, i) => (
              <motion.button
                key={i}
                {...stagger(i)}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                suppressHydrationWarning
                onClick={() => setActiveCase(i)}
                className={`text-left border rounded-sm p-6 md:p-8 transition-all duration-300 ${
                  activeCase === i
                    ? "border-[#FF4D00] bg-[#FF4D00]/5 shadow-lg"
                    : "border-[#111]/10 bg-white hover:border-[#111]/20 hover:shadow-md"
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-[28px] leading-none mt-1">
                    {c.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                      <h3 className="text-[18px] md:text-[20px] font-display font-medium tracking-tight text-[#111]">
                        {c.founder}
                      </h3>
                      <span className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#111]/25">
                        {c.context}
                      </span>
                    </div>
                    <div className="text-[11px] font-mono font-bold tracking-widest uppercase text-[#FF4D00] mb-3">
                      {c.company}
                    </div>
                    <p className="text-[14px] text-[#111]/50 font-medium leading-[1.6] mb-4 line-clamp-3">
                      {c.advantage}
                    </p>
                    <div className="border-t border-[#111]/10 pt-3">
                      <p
                        className={`text-[14px] font-bold leading-[1.5] ${
                          activeCase === i
                            ? "text-[#FF4D00]"
                            : "text-[#111]/60"
                        }`}
                      >
                        {c.takeaway}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Full-width callout strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="bg-[#FAFAFA] border border-[#111]/10 rounded-sm p-8 md:p-12"
        >
          <p className="text-[22px] md:text-[28px] font-display font-medium tracking-tight text-[#111] mb-3">
            This is why xCelero exists.
          </p>
          <p className="text-[15px] text-[#111]/40 font-medium leading-[1.7] max-w-3xl">
            We don&apos;t just invest in ventures — we build the infrastructure
            those ventures need to exist. The Outposts, the XEmbassies, the
            190+ projected hubs on the Route — these aren&apos;t real estate
            plays. They&apos;re operating systems for the next civilization.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   03. OUTPOST MODEL — DARK
   Ford/Tesla/xCelero cards, cross-section image, cluster scroll
   ══════════════════════════════════════════════════════════════════════════ */
function OutpostModelSection() {
  const { ref, isInView } = useFade();

  return (
    <section
      id="infra-outpost-model"
      ref={ref}
      className="py-3 md:py-4"
    >
      <div className="w-full max-w-[1400px] mx-auto bg-[#111] text-white rounded-sm overflow-hidden px-6 md:px-12 lg:px-20 py-24 md:py-36">
        {/* Header with big number */}
        <div className="relative mb-16 md:mb-24">
          <SectionNumber n="03" />
          <motion.div
            {...fadeUp}
            animate={isInView ? fadeUp.animate : { opacity: 0, y: 40 }}
            className="relative z-10"
          >
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] mb-4 block">
              The Outpost Model
            </span>
            <h2 className="text-[36px] md:text-[52px] lg:text-[68px] font-display font-medium tracking-[-0.03em] leading-[0.95]">
              The method{" "}
              <span className="text-white/25">is the moat.</span>
            </h2>
          </motion.div>
        </div>

        {/* Ford / Tesla / xCelero */}
        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {[
            {
              subject: "Ford",
              statement:
                "didn't share a workshop. He reinvented the method — the assembly line — and that method was itself the moat. No one could match his output per unit time.",
            },
            {
              subject: "Tesla",
              statement:
                "didn't parallelize a factory. They invented a new method — Gigapressing, Unboxed assembly — that produces cars per unit time no traditional line can match.",
            },
            {
              subject: "xCelero",
              statement:
                "the outpost doesn't share labs. It reinvents the method by which ventures go from idea to working solution. The method IS the moat.",
            },
          ].map((p, i) => (
            <motion.div
              key={p.subject}
              {...stagger(i)}
              animate={
                isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              className="border-l-2 border-[#FF4D00] bg-white/[0.03] rounded-r-sm p-6 md:p-8"
            >
              <div className="text-[11px] font-mono font-bold tracking-[0.15em] uppercase text-[#FF4D00] mb-3">
                {p.subject}
              </div>
              <p className="text-[14px] text-white/50 font-medium leading-[1.7]">
                {p.statement}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Cross-section image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-20"
        >
          <div className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-white/20 mb-4 text-center">
            The Outpost — Cross Section
          </div>
          <div className="relative rounded-sm overflow-hidden bg-white/[0.02] border border-white/10">
            <img
              src="/infra/outpost-crosssection.png"
              alt="Outpost Cross-Section"
              className="w-full max-h-[600px] object-contain mx-auto"
            />
          </div>
          <p className="text-center text-[14px] text-white/30 font-medium mt-4">
            Six clusters. One machine. Each zone optimized for its type of
            production.
          </p>
        </motion.div>

        {/* Horizontal scrollable cluster cards */}
        <div>
          <div className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-white/20 mb-6">
            The 6 Clusters
          </div>
          <div className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-thin">
            {clusterData.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={c.id}
                  {...stagger(i)}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                  }
                  className="flex-shrink-0 w-[320px] md:w-[360px] snap-start bg-white/[0.04] border border-white/10 rounded-sm overflow-hidden group hover:border-[#FF4D00]/30 transition-colors"
                >
                  <div className="relative h-[200px] overflow-hidden">
                    <img
                      src={c.image}
                      alt={c.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 text-[80px] font-display font-bold leading-none text-white/[0.06] select-none">
                      {c.num}
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon
                          className="w-4 h-4 text-[#FF4D00]"
                          strokeWidth={1.5}
                        />
                        <span className="text-[11px] font-mono font-bold tracking-[0.12em] uppercase text-[#FF4D00]">
                          Cluster {c.num}
                        </span>
                      </div>
                      <h3 className="text-[22px] font-display font-medium tracking-tight">
                        {c.name}
                      </h3>
                      <div className="text-[11px] font-mono font-bold tracking-widest uppercase text-white/30">
                        {c.sub}
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-[13px] text-white/40 font-medium leading-[1.6]">
                      {c.why}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   04. THE OUTPOST: LEVEL BY LEVEL — LIGHT
   ══════════════════════════════════════════════════════════════════════════ */
function LevelsSection() {
  const { ref, isInView } = useFade();
  const [activeLevel, setActiveLevel] = useState("membrane");
  const active = levels.find((l) => l.id === activeLevel)!;

  return (
    <section
      id="infra-levels"
      ref={ref}
      className="py-3 md:py-4"
    >
      <div className="w-full max-w-[1400px] mx-auto bg-white text-[#111] rounded-sm px-6 md:px-12 lg:px-20 py-24 md:py-36">
        {/* Header */}
        <div className="relative mb-16 md:mb-24">
          <SectionNumber n="04" light />
          <motion.div
            {...fadeUp}
            animate={isInView ? fadeUp.animate : { opacity: 0, y: 40 }}
            className="relative z-10"
          >
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] mb-4 block">
              Under One Roof
            </span>
            <h2 className="text-[36px] md:text-[52px] lg:text-[68px] font-display font-medium tracking-[-0.03em] leading-[0.95] text-[#111]">
              The Outpost,
              <br />
              <span className="text-[#111]/25">level by level.</span>
            </h2>
          </motion.div>
        </div>

        {/* Level tabs — VERTICAL on desktop, horizontal scroll on mobile */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10">
          {/* Left sidebar: vertical tabs */}
          <div className="lg:col-span-4">
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 lg:sticky lg:top-24">
              {levels.map((level) => {
                const Icon = level.icon;
                return (
                  <button
                    key={level.id}
                    suppressHydrationWarning
                    onClick={() => setActiveLevel(level.id)}
                    className={`flex items-center gap-3 px-5 py-4 text-left border-l-2 lg:border-l-2 border-b-2 lg:border-b-0 rounded-r-sm transition-all whitespace-nowrap lg:whitespace-normal min-h-[48px] flex-shrink-0 ${
                      activeLevel === level.id
                        ? "border-l-[#FF4D00] border-b-[#FF4D00] lg:border-b-transparent bg-[#FF4D00]/5"
                        : "border-l-transparent border-b-[#111]/10 lg:border-b-transparent hover:border-l-[#111]/20 bg-transparent hover:bg-[#FAFAFA]"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 flex-shrink-0 ${
                        activeLevel === level.id
                          ? "text-[#FF4D00]"
                          : "text-[#111]/30"
                      }`}
                      strokeWidth={1.5}
                    />
                    <div>
                      <div
                        className={`text-[10px] font-mono font-bold tracking-[0.1em] uppercase ${
                          activeLevel === level.id
                            ? "text-[#FF4D00]"
                            : "text-[#111]/25"
                        }`}
                      >
                        {level.number}
                      </div>
                      <div
                        className={`text-[14px] font-display font-medium tracking-tight ${
                          activeLevel === level.id
                            ? "text-[#111]"
                            : "text-[#111]/50"
                        }`}
                      >
                        {level.name}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right content */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLevel}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Image with shadow */}
                <div className="relative overflow-hidden rounded-sm min-h-[250px] lg:min-h-[350px] mb-8 shadow-xl">
                  <img
                    src={active.image}
                    alt={active.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111]/60 via-[#111]/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 md:p-8">
                    <div className="text-[10px] font-mono font-bold tracking-[0.15em] text-[#FF4D00] mb-1">
                      {active.number}
                    </div>
                    <h3 className="text-[32px] md:text-[44px] font-display font-medium tracking-[-0.02em] leading-[1] mb-2 text-white">
                      {active.name}
                    </h3>
                    <p className="text-[14px] text-white/50 font-medium italic">
                      {active.subtitle}
                    </p>
                  </div>
                </div>

                {/* Method */}
                {active.method && (
                  <div className="border border-[#FF4D00]/20 bg-[#FF4D00]/5 rounded-sm p-6 md:p-8 mb-6">
                    <div className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#FF4D00] mb-3">
                      The Method
                    </div>
                    <p className="text-[14px] text-[#111]/60 font-medium leading-[1.7]">
                      {active.method}
                    </p>
                  </div>
                )}

                {/* Airlock note */}
                {"note" in active && active.note && (
                  <div className="border border-[#111]/10 bg-[#FAFAFA] rounded-sm p-6 mb-6">
                    <p className="text-[13px] text-[#111]/40 font-medium leading-[1.6]">
                      {active.note as string}
                    </p>
                  </div>
                )}

                {/* Items */}
                <div className="space-y-0">
                  {active.items.map((item, i) => (
                    <div
                      key={i}
                      className="border-b border-[#111]/8 py-5 last:border-b-0"
                    >
                      <h4 className="text-[14px] font-bold tracking-tight text-[#111]/80 mb-1.5">
                        {item.title}
                      </h4>
                      <p className="text-[13px] text-[#111]/40 font-medium leading-[1.6]">
                        {item.desc}
                      </p>
                      {"subitems" in item && item.subitems && (
                        <ul className="mt-2 space-y-1">
                          {(item.subitems as string[]).map((si, j) => (
                            <li
                              key={j}
                              className="text-[12px] text-[#111]/30 font-medium leading-[1.5] pl-3 border-l border-[#FF4D00]/20"
                            >
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
                  <div className="grid sm:grid-cols-2 gap-4 mt-6">
                    {(
                      active.principles as { title: string; desc: string }[]
                    ).map((p, i) => (
                      <div
                        key={i}
                        className="border border-[#111]/10 rounded-sm p-5 bg-[#FAFAFA]"
                      >
                        <h4 className="text-[13px] font-bold text-[#FF4D00] mb-2">
                          {p.title}
                        </h4>
                        <p className="text-[12px] text-[#111]/35 font-medium leading-[1.6]">
                          {p.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Studio bottom line */}
                {"bottomLine" in active && active.bottomLine && (
                  <div className="border border-[#FF4D00]/20 bg-[#FF4D00]/5 rounded-sm p-6 mt-6">
                    <div className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#FF4D00] mb-2">
                      The Bottom Line
                    </div>
                    <p className="text-[14px] text-[#111]/55 font-medium leading-[1.7]">
                      {active.bottomLine as string}
                    </p>
                  </div>
                )}

                {/* Commons spatial logic */}
                {"spatialLogic" in active && active.spatialLogic && (
                  <div className="border border-[#111]/10 bg-[#FAFAFA] rounded-sm p-6 mt-6">
                    <div className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#111]/20 mb-2">
                      The Spatial Logic
                    </div>
                    <p className="text-[14px] text-[#111]/50 font-medium leading-[1.7]">
                      {active.spatialLogic as string}
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   05. CAMPUS RING — DARK
   Contained image hero + 7 zone cards in bento grid
   ══════════════════════════════════════════════════════════════════════════ */
function CampusRingSection() {
  const { ref, isInView } = useFade();
  return (
    <section
      id="infra-campus-ring"
      ref={ref}
      className="py-3 md:py-4"
    >
      <div className="w-full max-w-[1400px] mx-auto bg-[#111] text-white rounded-sm overflow-hidden">
        {/* Contained hero image */}
        <div className="relative h-[30vh] md:h-[40vh] overflow-hidden">
          <img
            src="/infra/campus-ring.png"
            alt="Campus Ring"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/60 to-[#111]/20" />
          <div className="absolute bottom-0 left-0 px-6 md:px-12 lg:px-20 pb-10">
            <div className="relative">
              <SectionNumber n="05" />
              <div className="relative z-10">
                <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] mb-4 block">
                  The Campus Ring
                </span>
                <h2 className="text-[36px] md:text-[52px] font-display font-medium tracking-[-0.03em] leading-[0.95]">
                  What can&apos;t fit{" "}
                  <span className="text-white/25">under the roof.</span>
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Bento grid zone cards */}
        <div className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Energy Yard — spans 2 cols */}
            <motion.div
              {...stagger(0)}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              className="sm:col-span-2 border border-white/10 rounded-sm p-6 md:p-8 hover:border-[#FF4D00]/30 transition-colors group bg-white/[0.02]"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 border border-white/10 rounded-sm flex items-center justify-center group-hover:border-[#FF4D00]/40 transition-colors">
                  <Zap className="w-5 h-5 text-[#FF4D00]" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-[16px] font-bold tracking-tight">
                    {campusRing[0].name}
                  </h4>
                  <div className="text-[10px] font-mono font-bold tracking-[0.1em] uppercase text-[#FF4D00]/50">
                    {campusRing[0].serves}
                  </div>
                </div>
              </div>
              <p className="text-[14px] text-white/35 font-medium leading-[1.6]">
                {campusRing[0].desc}
              </p>
            </motion.div>

            {/* Agri Plots */}
            <ZoneCard zone={campusRing[1]} index={1} isInView={isInView} />
            {/* Drone Corridor */}
            <ZoneCard zone={campusRing[2]} index={2} isInView={isInView} />

            {/* Proving Ground — spans 2 cols */}
            <motion.div
              {...stagger(3)}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              className="sm:col-span-2 border border-white/10 rounded-sm p-6 md:p-8 hover:border-[#FF4D00]/30 transition-colors group bg-white/[0.02]"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 border border-white/10 rounded-sm flex items-center justify-center group-hover:border-[#FF4D00]/40 transition-colors">
                  <ShieldCheck
                    className="w-5 h-5 text-[#FF4D00]"
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <h4 className="text-[16px] font-bold tracking-tight">
                    {campusRing[6].name}
                  </h4>
                  <div className="text-[10px] font-mono font-bold tracking-[0.1em] uppercase text-[#FF4D00]/50">
                    {campusRing[6].serves}
                  </div>
                </div>
              </div>
              <p className="text-[14px] text-white/35 font-medium leading-[1.6]">
                {campusRing[6].desc}
              </p>
            </motion.div>

            {/* Water Bay */}
            <ZoneCard zone={campusRing[3]} index={4} isInView={isInView} />
            {/* Construction Zone */}
            <ZoneCard zone={campusRing[4]} index={5} isInView={isInView} />
            {/* Logistics Yard */}
            <ZoneCard zone={campusRing[5]} index={6} isInView={isInView} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ZoneCard({
  zone,
  index,
  isInView,
}: {
  zone: (typeof campusRing)[number];
  index: number;
  isInView: boolean;
}) {
  const Icon = zone.icon;
  return (
    <motion.div
      {...stagger(index)}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      className="border border-white/10 rounded-sm p-5 hover:border-[#FF4D00]/30 transition-colors group bg-white/[0.02]"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 border border-white/10 rounded-sm flex items-center justify-center group-hover:border-[#FF4D00]/40 transition-colors">
          <Icon className="w-4 h-4 text-[#FF4D00]" strokeWidth={1.5} />
        </div>
        <div>
          <h4 className="text-[14px] font-bold tracking-tight">
            {zone.name}
          </h4>
          <div className="text-[10px] font-mono font-bold tracking-[0.1em] uppercase text-[#FF4D00]/50">
            {zone.serves}
          </div>
        </div>
      </div>
      <p className="text-[13px] text-white/30 font-medium leading-[1.5]">
        {zone.desc}
      </p>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   06. CORE TECHNOLOGIES — LIGHT
   ══════════════════════════════════════════════════════════════════════════ */
function CoreTechSection() {
  const { ref, isInView } = useFade();
  return (
    <section
      id="infra-core-tech"
      ref={ref}
      className="py-3 md:py-4"
    >
      <div className="w-full max-w-[1400px] mx-auto bg-[#FAFAFA] text-[#111] rounded-sm px-6 md:px-12 lg:px-20 py-24 md:py-36">
        {/* Header */}
        <div className="relative mb-16 md:mb-20">
          <SectionNumber n="06" light />
          <motion.div
            {...fadeUp}
            animate={isInView ? fadeUp.animate : { opacity: 0, y: 40 }}
            className="relative z-10"
          >
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] mb-4 block">
              Core Technologies
            </span>
            <h2 className="text-[36px] md:text-[52px] lg:text-[68px] font-display font-medium tracking-[-0.03em] leading-[0.95] text-[#111]">
              8 domains of{" "}
              <span className="text-[#111]/25">
                independent innovation.
              </span>
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {coreTechnologies.map((tech, i) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={tech.name}
                {...stagger(i)}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                className="border border-[#111]/10 rounded-sm p-5 md:p-6 bg-white hover:border-[#FF4D00]/30 transition-all group shadow-sm hover:shadow-md"
              >
                <div className="w-12 h-12 border border-[#111]/10 rounded-sm flex items-center justify-center mb-4 group-hover:border-[#FF4D00]/40 group-hover:bg-[#FF4D00]/5 transition-all">
                  <Icon
                    className="w-5 h-5 text-[#FF4D00]"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="text-[15px] font-display font-medium tracking-tight text-[#111] mb-2">
                  {tech.name}
                </h3>
                <p className="text-[12px] text-[#111]/35 font-medium leading-[1.5]">
                  {tech.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   07. THE FLOW — DARK
   ══════════════════════════════════════════════════════════════════════════ */
function FlowSection() {
  const { ref, isInView } = useFade();
  return (
    <section
      id="infra-flow"
      ref={ref}
      className="py-3 md:py-4"
    >
      <div className="w-full max-w-[1400px] mx-auto bg-[#111] text-white rounded-sm overflow-hidden px-6 md:px-12 lg:px-20 py-24 md:py-36">
        {/* Header */}
        <div className="relative mb-16 md:mb-24">
          <SectionNumber n="07" />
          <motion.div
            {...fadeUp}
            animate={isInView ? fadeUp.animate : { opacity: 0, y: 40 }}
            className="relative z-10"
          >
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] mb-4 block">
              The Flow
            </span>
            <h2 className="text-[36px] md:text-[52px] lg:text-[68px] font-display font-medium tracking-[-0.03em] leading-[0.95]">
              How ventures move{" "}
              <span className="text-white/25">through space.</span>
            </h2>
          </motion.div>
        </div>

        {/* 3 flow cards with arrow connectors */}
        <div className="grid md:grid-cols-3 gap-5 relative">
          {ventureFlows.map((flow, i) => {
            const Icon = flow.icon;
            return (
              <motion.div
                key={flow.type}
                {...stagger(i)}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                className="border border-white/10 rounded-sm p-6 md:p-8 relative overflow-hidden group hover:border-[#FF4D00]/30 transition-colors bg-white/[0.02]"
              >
                <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.03]">
                  <Icon className="w-full h-full" strokeWidth={0.5} />
                </div>
                <div className="relative">
                  <div className="w-14 h-14 border border-white/10 rounded-sm flex items-center justify-center mb-5 group-hover:border-[#FF4D00]/40 transition-colors">
                    <Icon
                      className="w-6 h-6 text-[#FF4D00]"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-[#FF4D00]" />
                    <span className="text-[11px] font-mono font-bold tracking-[0.12em] uppercase text-[#FF4D00]">
                      {flow.type}
                    </span>
                  </div>
                  <p className="text-[11px] font-mono font-bold tracking-[0.08em] uppercase text-white/20 mb-4">
                    {flow.examples}
                  </p>
                  <p className="text-[14px] text-white/45 font-medium leading-[1.7]">
                    {flow.path}
                  </p>
                </div>
              </motion.div>
            );
          })}

          {/* Arrow connectors */}
          <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-[33.33%] -translate-x-1/2 text-white/10 z-10">
            <ChevronRight className="w-8 h-8" />
          </div>
          <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-[66.66%] -translate-x-1/2 text-white/10 z-10">
            <ChevronRight className="w-8 h-8" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   08. THE MOAT — LIGHT + DARK
   ══════════════════════════════════════════════════════════════════════════ */
function MoatSection() {
  const { ref, isInView } = useFade();
  const [activeMoat, setActiveMoat] = useState("01");
  const active = moatPoints.find((m) => m.number === activeMoat)!;

  return (
    <section
      id="infra-moat"
      ref={ref}
      className="py-3 md:py-4"
    >
      <div className="w-full max-w-[1400px] mx-auto space-y-3 md:space-y-4">
        {/* LIGHT PART — Traditional Model critique */}
        <div className="bg-white text-[#111] rounded-sm px-6 md:px-12 lg:px-20 py-24 md:py-32">
          {/* Header */}
          <div className="relative mb-16 md:mb-20">
            <SectionNumber n="08" light />
            <motion.div
              {...fadeUp}
              animate={isInView ? fadeUp.animate : { opacity: 0, y: 40 }}
              className="relative z-10"
            >
              <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] mb-4 block">
                The Moat
              </span>
              <h2 className="text-[36px] md:text-[52px] lg:text-[68px] font-display font-medium tracking-[-0.03em] leading-[0.95] text-[#111]">
                Why no one can{" "}
                <span className="text-[#111]/25">copy this.</span>
              </h2>
            </motion.div>
          </div>

          {/* Traditional model */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="border border-[#111]/10 rounded-sm p-8 md:p-10 mb-6 bg-[#FAFAFA]"
          >
            <h3 className="text-[18px] md:text-[22px] font-display font-medium tracking-tight text-[#111] mb-4">
              The Traditional Model
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Knowledge dies",
                  desc: "Each venture starts at zero and crawls forward alone. Discoveries die inside company walls.",
                },
                {
                  title: "Equipment idles",
                  desc: "One venture can't keep a machine busy. Across 100 ventures, hundreds of hours of idle equipment per day.",
                },
                {
                  title: "Capital duplicates",
                  desc: "Each venture buys its own CNC, its own bioreactor, its own electron microscope. Millions in duplicated CapEx.",
                },
              ].map((item, i) => (
                <div key={i} className="border-t border-[#111]/10 pt-4">
                  <h4 className="text-[14px] font-bold text-[#111]/70 mb-2">
                    {item.title}.
                  </h4>
                  <p className="text-[13px] text-[#111]/35 font-medium leading-[1.6]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t border-[#111]/10 mt-6 pt-6">
              <p className="text-[14px] font-bold text-[#111]/50">
                One venture, one of everything, zero compounding.
              </p>
            </div>
          </motion.div>

          {/* Pull quote transition */}
          <PullQuote light>
            &ldquo;The method isn&apos;t obvious until someone invents it.
            Ford&apos;s competitors had lathes. They didn&apos;t have the
            assembly line.&rdquo;
          </PullQuote>
        </div>

        {/* DARK PART — Moat tabs */}
        <div className="bg-[#111] text-white rounded-sm overflow-hidden px-6 md:px-12 lg:px-20 py-20 md:py-28">
          {/* Moat tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {moatPoints.map((point) => {
              const Icon = point.icon;
              return (
                <button
                  key={point.number}
                  suppressHydrationWarning
                  onClick={() => setActiveMoat(point.number)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-[11px] font-mono font-bold tracking-[0.1em] uppercase border rounded-sm transition-all min-h-[44px] ${
                    activeMoat === point.number
                      ? "bg-[#FF4D00] text-white border-[#FF4D00]"
                      : "bg-transparent text-white/30 border-white/10 hover:border-white/20"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
                  <span className="hidden md:inline">{point.title}</span>
                  <span className="md:hidden">{point.number}</span>
                </button>
              );
            })}
          </div>

          {/* Active moat */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMoat}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {active.examples.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {active.examples.map((ex, i) => (
                    <div
                      key={i}
                      className="border border-white/10 rounded-sm p-5 bg-white/[0.02]"
                    >
                      <div className="text-[11px] font-mono font-bold tracking-[0.12em] uppercase text-[#FF4D00] mb-2">
                        {ex.domain}
                      </div>
                      <p className="text-[13px] text-white/40 font-medium leading-[1.6]">
                        {ex.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              {/* Full-width insight callout */}
              <div className="border-l-2 border-[#FF4D00] bg-[#FF4D00]/5 rounded-r-sm p-8 md:p-10">
                <div className="flex items-center gap-3 mb-4">
                  {(() => {
                    const Icon = active.icon;
                    return (
                      <Icon
                        className="w-5 h-5 text-[#FF4D00]"
                        strokeWidth={1.5}
                      />
                    );
                  })()}
                  <span className="text-[11px] font-mono font-bold tracking-[0.15em] uppercase text-[#FF4D00]">
                    {active.number}. {active.title}
                  </span>
                </div>
                <p className="text-[15px] md:text-[17px] text-white/55 font-medium leading-[1.8]">
                  {active.insight}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   09. HUBS ON THE ROUTE — DARK
   ══════════════════════════════════════════════════════════════════════════ */
function HubsSection() {
  const { ref, isInView } = useFade();
  const [activeLeg, setActiveLeg] = useState<string | null>(null);
  const hubsByLeg = routeLegs.map((leg) => ({
    leg,
    cities: MAP_LOCATIONS.filter((loc) => loc.legId === leg.id),
  }));
  const visibleHubs = activeLeg
    ? hubsByLeg.filter((h) => h.leg.id === activeLeg)
    : hubsByLeg;

  return (
    <section
      id="infra-hubs"
      ref={ref}
      className="py-3 md:py-4"
    >
      <div className="w-full max-w-[1400px] mx-auto bg-[#111] text-white rounded-sm overflow-hidden">
        {/* Contained hero image */}
        <div className="relative h-[25vh] md:h-[35vh] overflow-hidden">
          <img
            src="/infra/hubs-network.png"
            alt="Global Hub Network"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/60 to-[#111]/30" />
          <div className="absolute bottom-0 left-0 px-6 md:px-12 lg:px-20 pb-10">
            <div className="relative">
              <SectionNumber n="09" />
              <div className="relative z-10">
                <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] mb-4 block">
                  Hubs on the Route
                </span>
                <h2 className="text-[36px] md:text-[52px] font-display font-medium tracking-[-0.03em] leading-[0.95]">
                  A union of{" "}
                  <span className="text-white/25">cities.</span>
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
          {/* Stats overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-8 mb-10 border-b border-white/10 pb-8"
          >
            {[
              { value: "190+", label: "Hubs" },
              { value: "39+", label: "Countries" },
              { value: "6", label: "Legs" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-[28px] font-display font-medium tracking-tighter text-[#FF4D00]">
                  {s.value}
                </div>
                <div className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/25">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Leg filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            <button
              suppressHydrationWarning
              onClick={() => setActiveLeg(null)}
              className={`px-4 py-2.5 text-[11px] font-mono font-bold tracking-widest uppercase border rounded-sm transition-colors min-h-[44px] ${
                activeLeg === null
                  ? "bg-white text-[#111] border-white"
                  : "bg-transparent text-white/30 border-white/10 hover:border-white/20"
              }`}
            >
              All Legs
            </button>
            {routeLegs.map((leg) => (
              <button
                key={leg.id}
                suppressHydrationWarning
                onClick={() =>
                  setActiveLeg(activeLeg === leg.id ? null : leg.id)
                }
                className={`px-4 py-2.5 text-[11px] font-mono font-bold tracking-widest uppercase border rounded-sm transition-colors min-h-[44px] ${
                  activeLeg === leg.id
                    ? "text-white border-transparent"
                    : "bg-transparent text-white/30 border-white/10 hover:border-white/20"
                }`}
                style={
                  activeLeg === leg.id
                    ? { backgroundColor: leg.color, borderColor: leg.color }
                    : {}
                }
              >
                {leg.legNumber}. {leg.name.split(" ")[0]}
              </button>
            ))}
          </div>

          {/* Hub groups */}
          <div className="space-y-10 max-h-[600px] overflow-y-auto">
            {visibleHubs.map(({ leg, cities }) => (
              <div key={leg.id}>
                <div className="flex items-center gap-3 mb-5 border-b border-white/10 pb-3">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: leg.color }}
                  />
                  <h3 className="text-[18px] font-display font-medium tracking-tight">
                    Leg {leg.legNumber}: {leg.name}
                  </h3>
                  <span className="text-[10px] font-mono text-white/20 tracking-widest uppercase ml-auto">
                    {leg.hubCount} hubs · {leg.countries.length} countries
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                  {cities.map((city) => (
                    <div
                      key={city.id}
                      className="border border-white/8 rounded-sm p-4 hover:border-white/15 transition-colors group bg-white/[0.02]"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-3 h-3 text-[#FF4D00]" />
                        <h4 className="text-[14px] font-display font-medium tracking-tight group-hover:text-[#FF4D00] transition-colors">
                          {city.name}
                        </h4>
                      </div>
                      <p className="text-[11px] text-white/25 font-medium leading-[1.5]">
                        {city.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-14 text-center">
            <Link
              to="/routes"
              className="group inline-flex items-center gap-3 px-10 py-4 bg-white text-[#111] text-[12px] font-bold tracking-[0.2em] uppercase rounded-sm hover:bg-[#FF4D00] hover:text-white transition-colors"
            >
              Explore the Full Route
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   10. CIVILIZATION — LIGHT
   ══════════════════════════════════════════════════════════════════════════ */
function CivilizationSection() {
  const { ref, isInView } = useFade();
  return (
    <section
      id="infra-civilization"
      ref={ref}
      className="py-3 md:py-4"
    >
      <div className="w-full max-w-[1400px] mx-auto bg-white text-[#111] rounded-sm px-6 md:px-12 lg:px-20 py-24 md:py-36">
        {/* Header */}
        <div className="relative mb-16 md:mb-24">
          <SectionNumber n="10" light />
          <motion.div
            {...fadeUp}
            animate={isInView ? fadeUp.animate : { opacity: 0, y: 40 }}
            className="relative z-10"
          >
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] mb-4 block">
              The Civilization
            </span>
            <h2 className="text-[36px] md:text-[52px] lg:text-[68px] font-display font-medium tracking-[-0.03em] leading-[0.95] text-[#111]">
              The xCelero{" "}
              <span className="text-[#111]/25">Scale.</span>
            </h2>
          </motion.div>
        </div>

        {/* Problem */}
        <motion.div
          {...stagger(0)}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          className="border border-[#111]/10 rounded-sm p-8 md:p-10 mb-5 bg-white shadow-sm"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 bg-[#111]/10 flex items-center justify-center text-[11px] font-mono font-bold rounded-sm text-[#111]/60">
              P
            </div>
            <span className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#111]/20">
              Problem
            </span>
          </div>
          <p className="text-[17px] md:text-[19px] text-[#111]/60 font-medium leading-[1.7] mb-3">
            The Kardashev Scale measures civilization by energy output. One
            dimension. Myopic. The real bottleneck isn&apos;t energy — it&apos;s
            the rate at which ideas become working solutions.
          </p>
          <p className="text-[14px] text-[#111]/30 font-medium leading-[1.7]">
            10 years for a drug, 18 months for a robot, 2 years for a hardware
            product, and 90% of ventures die trying. Not because the science
            doesn&apos;t work. Because the production method is fundamentally
            broken.
          </p>
        </motion.div>

        {/* Solution */}
        <motion.div
          {...stagger(1)}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          className="border border-[#FF4D00]/20 bg-[#FF4D00]/5 rounded-sm p-8 md:p-10 mb-5"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 bg-[#FF4D00] flex items-center justify-center text-[11px] font-mono font-bold rounded-sm text-white">
              S
            </div>
            <span className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#FF4D00]/50">
              Solution
            </span>
          </div>
          <p className="text-[17px] md:text-[19px] text-[#111]/70 font-medium leading-[1.7] mb-6">
            xCelero reinvents the production method.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {[
              {
                label: "The Build Line",
                desc: "produces hardware prototypes per unit time no standalone workshop can match.",
              },
              {
                label: "The Discovery Line",
                desc: "produces validated findings per unit time no isolated lab can match.",
              },
              {
                label: "The Ship Line",
                desc: "ships working software per unit time no standalone team can match.",
              },
              {
                label: "The Power Line",
                desc: "validates energy products per unit time no single test rig can match.",
              },
            ].map((line, i) => (
              <div
                key={i}
                className="border border-[#FF4D00]/15 rounded-sm p-4 bg-white"
              >
                <div className="text-[13px] font-bold text-[#FF4D00] mb-1">
                  {line.label}
                </div>
                <p className="text-[12px] text-[#111]/35 font-medium leading-[1.5]">
                  {line.desc}
                </p>
              </div>
            ))}
          </div>
          <p className="text-[14px] text-[#111]/35 font-medium leading-[1.7]">
            Knowledge compounds across the portfolio. Equipment runs at portfolio
            utilization. Capital deploys at portfolio depth. Ventures produce in
            parallel, not in isolation. The method is the moat, and the moat
            deepens with every venture that passes through.
          </p>
        </motion.div>

        {/* Civilization */}
        <motion.div
          {...stagger(2)}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          className="border border-[#111]/10 rounded-sm p-8 md:p-10 bg-[#FAFAFA]"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 bg-[#111] flex items-center justify-center text-[11px] font-mono font-bold rounded-sm text-white">
              C
            </div>
            <span className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#111]/20">
              Civilization
            </span>
          </div>
          <h3 className="text-[24px] md:text-[32px] font-display font-medium tracking-tight leading-[1.15] text-[#111] mb-6">
            The xCelero Scale measures civilization not by energy, but by{" "}
            <span className="text-[#FF4D00]">
              working solutions per unit time per outpost.
            </span>
          </h3>
          <div className="grid md:grid-cols-2 gap-5 mb-8">
            <div className="border border-[#111]/10 rounded-sm p-6 bg-white">
              <div className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#111]/20 mb-3">
                Type 0
              </div>
              <p className="text-[14px] text-[#111]/40 font-medium leading-[1.7]">
                Produces solutions sequentially — one lab, one company, one
                country at a time. 90% die.
              </p>
            </div>
            <div className="border border-[#FF4D00]/30 rounded-sm p-6 bg-[#FF4D00]/5">
              <div className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#FF4D00] mb-3">
                Type 1
              </div>
              <p className="text-[14px] text-[#111]/55 font-medium leading-[1.7]">
                Produces solutions through compound production methods — where
                every venture starts at the accumulated endpoint of every
                venture before it.
              </p>
            </div>
          </div>
          <p className="text-[16px] md:text-[18px] font-display font-medium leading-[1.6] text-[#111]/60">
            The outpost is the unit cell. The method is the moat. Replicated 190
            times across 39 countries, this isn&apos;t a venture platform.{" "}
            <span className="text-[#FF4D00]">
              It&apos;s a new method of invention itself.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
