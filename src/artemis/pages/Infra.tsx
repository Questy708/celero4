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
  ChevronDown,
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

const infrastructureExists = [
  { name: "Jeff Bezos", company: "Amazon", context: "USA, 1994", image: "https://sfile.chatglm.cn/images-ppt/7b685c8e5fa4.png", takeaway: "The infrastructure was invisible because it was already there." },
  { name: "Elon Musk", company: "Tesla / SpaceX", context: "USA, 2002", image: "https://sfile.chatglm.cn/images-ppt/49edeabd4822.png", takeaway: "Every system the venture needed was already operational." },
  { name: "Steve Jobs", company: "Apple", context: "USA, 1976", image: "https://sfile.chatglm.cn/images-ppt/3a6b08ad5ff7.jpg", takeaway: "A mature supply chain, IP law, and consumer credit made the personal computer inevitable — someone just had to will it into existence." },
  { name: "Bill Gates", company: "Microsoft", context: "USA, 1975", image: "https://sfile.chatglm.cn/images-ppt/f494473a39af.jpg", takeaway: "The IBM-compatible ecosystem, software copyright law, and corporate IT budgets already existed — Gates simply sold software into a ready market." },
  { name: "Mark Zuckerberg", company: "Meta", context: "USA, 2004", image: "https://sfile.chatglm.cn/images-ppt/abca3bebd6e8.jpg", takeaway: "Broadband internet, university networks, and digital advertising infrastructure were already in place — Facebook just rode the wave." },
  { name: "Larry Page", company: "Google", context: "USA, 1998", image: "https://sfile.chatglm.cn/images-ppt/021296defa4c.jpg", takeaway: "The web was already indexed, the internet backbone built, venture capital mature — Google organized a world that was already connected." },
  { name: "Sam Altman", company: "OpenAI", context: "USA, 2015", image: "https://sfile.chatglm.cn/images-ppt/96a0c975ae3b.jpg", takeaway: "Decades of GPU development, cloud compute, and research infrastructure — AI didn't emerge from nothing. It stood on the shoulders of an entire ecosystem." },
  { name: "Reed Hastings", company: "Netflix", context: "USA, 1997", image: "https://sfile.chatglm.cn/images-ppt/9206de4bef48.png", takeaway: "The USPS delivered DVDs. Then broadband streamed video. Netflix pivoted between two fully-built infrastructures." },
  { name: "Brian Chesky", company: "Airbnb", context: "USA, 2008", image: "https://sfile.chatglm.cn/images-ppt/c098af53c694.jpg", takeaway: "Online payments, trust infrastructure (reviews), and the social web made strangers hosting strangers possible — none of it had to be built." },
  { name: "Jack Dorsey", company: "Block / Twitter", context: "USA, 2006", image: "https://sfile.chatglm.cn/images-ppt/6ea98e985491.jpg", takeaway: "SMS gateways, smartphone adoption, and app store distribution — the pipes were already laid." },
];

const marketCreatingInnovations = [
  { name: "Mo Ibrahim", company: "Celtel", context: "Africa, 1998", image: "https://sfile.chatglm.cn/images-ppt/726dbaf7425b.jpg", takeaway: "Left BT to build a pan-African mobile network from scratch. Didn't ride infrastructure — he created the market that made infrastructure necessary.", type: "market-creating" as const },
  { name: "Strive Masiyiwa", company: "Econet Wireless", context: "Zimbabwe, 1998", image: "https://sfile.chatglm.cn/images-ppt/0a9393119b4d.jpg", takeaway: "Fought a 5-year legal battle against his own government to launch mobile telephony. The market didn't exist — he forced it into existence.", type: "market-creating" as const },
  { name: "Aliko Dangote", company: "Dangote Group", context: "Nigeria, 1981", image: "https://sfile.chatglm.cn/images-ppt/7e0360f41c75.jpg", takeaway: "Built manufacturing where none existed. Cement, flour, sugar — not by optimizing existing supply chains, but by creating the supply chain itself.", type: "market-creating" as const },
  { name: "Nick Hughes", company: "M-Pesa / Vodafone", context: "Kenya, 2007", image: "https://sfile.chatglm.cn/images-ppt/1f95f65515b3.jpg", takeaway: "Didn't wait for banking infrastructure. Created financial infrastructure on top of mobile — a market that didn't exist became a $50B+ ecosystem.", type: "market-creating" as const },
  { name: "Tolaram Group", company: "Indomie Noodles", context: "Nigeria, 1988", image: "https://sfile.chatglm.cn/images-ppt/f9b1ba3a6d9e.jpg", takeaway: "No instant noodle market existed in Nigeria. They didn't find a market — they created one, then built the supply chain, distribution, and demand from zero.", type: "market-creating" as const },
];

const infrastructureMustBeBuilt = [
  { name: "54gene", company: "Biotech / Genomics", context: "Nigeria, 2019 — Shut down 2024", image: "https://sfile.chatglm.cn/images-ppt/75c2b00edce1.jpg", takeaway: "$45M in funding couldn't overcome the infrastructure deficit. The science was sound. The ground beneath it wasn't." },
  { name: "Sendy", company: "Logistics / Delivery", context: "Kenya, 2014 — Shut down 2023", image: "https://sfile.chatglm.cn/images-ppt/1ba21c0ff0e1.jpg", takeaway: "In the West, Uber builds on Google Maps and paved roads. In Africa, you build the map, the road, and the ride." },
  { name: "Dash", company: "Fintech / Payments", context: "Ghana, 2019 — Shut down 2023", image: "https://sfile.chatglm.cn/images-ppt/510589276692.jpg", takeaway: "$86M and they still couldn't build what Visa takes for granted. Infrastructure isn't optional — it's the prerequisite." },
  { name: "Gro Intelligence", company: "Agritech / Data", context: "Kenya / USA, 2014 — Laid off 80% 2023", image: "https://sfile.chatglm.cn/images-ppt/ed9b4d8c6d25.jpg", takeaway: "Built world-class climate analytics but couldn't get African agricultural data because digitized soil records, weather stations, and market prices didn't exist." },
  { name: "Wave", company: "Fintech / Mobile Money", context: "Senegal, 2018 — Mass layoffs 2023", image: "https://sfile.chatglm.cn/images-ppt/787133591cce.jpg", takeaway: "Raised $200M, the largest in Africa. But regulatory fragmentation across 8 countries meant building 8 separate compliance stacks instead of one." },
  { name: "Wakanow", company: "Travel Tech", context: "Nigeria, 2008 — Restructured 2020", image: "https://sfile.chatglm.cn/images-ppt/510589276692.jpg", takeaway: "Tried to build an online travel agency without reliable payment gateways, digital ID systems, or airline API integrations. Each missing piece became a separate company to build." },
];

const methodInnovators = [
  { subject: "Ford", year: "1913", method: "The Assembly Line", image: "https://sfile.chatglm.cn/images-ppt/3ffa4d06784c.jpg", statement: "didn't share a workshop. He reinvented the method — the assembly line — and that method was itself the moat. No one could match his output per unit time.", type: "single" as const },
  { subject: "Toyota", year: "1950s", method: "Lean Manufacturing", image: "https://sfile.chatglm.cn/images-ppt/5f5aac38a596.jpg", statement: "didn't just build cars faster. Taiichi Ohno invented a method — lean production — where waste is eliminated, inventory minimized, and every worker stops the line. Toyota's method became the global standard.", type: "single" as const },
  { subject: "Bell Labs", year: "1940s–70s", method: "Compound Research", image: "https://sfile.chatglm.cn/images-ppt/be8c75f29160.jpg", statement: "didn't just fund smart people. They invented a method — the research campus — where physicists sat next to engineers, where the transistor, the laser, Unix, and information theory all emerged from the same cafeteria. The method produced 9 Nobel Prizes.", type: "platform" as const },
  { subject: "Intel", year: "1968", method: "Moore's Law as Method", image: "/infra/outpost-campus.png", statement: "didn't just make chips. Gordon Moore's observation — that transistor count doubles every two years — became a self-fulfilling production method. Every Intel factory was designed to make the next law-breaking chip. The method drove the industry.", type: "single" as const },
  { subject: "Tesla", year: "2018", method: "Gigapress + Unboxed", image: "/infra/foundry-interior.png", statement: "didn't parallelize a factory. They invented a new method — Gigapressing, Unboxed assembly — that produces cars per unit time no traditional line can match.", type: "single" as const },
  { subject: "xCelero", year: "2024", method: "Production-Method Architecture", image: "/infra/outpost-campus.png", statement: "doesn't share labs. It reinvents the method by which ventures go from idea to working solution. 5,000+ ventures, 190+ hubs, one compound production method. Ford made one product faster. xCelero makes every product faster — because the method compounds.", type: "platform" as const },
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
   STICKY SIDE NAV — Minimal dots
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
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white bg-[#111]/90 backdrop-blur px-2 py-1 rounded">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span
            className={`block rounded-full transition-all duration-300 ${
              activeIndex === i
                ? "w-3 h-3 bg-[#FF4D00]"
                : "w-2 h-2 bg-black/20 group-hover:bg-black/40"
            }`}
          />
        </a>
      ))}
    </nav>
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
    <div className="bg-[#F5F5F0] text-[#111]">
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
   01. HERO — Full-bleed cinematic with split layout
   ══════════════════════════════════════════════════════════════════════════ */
function HeroSection() {
  const { ref, isInView } = useFade();
  return (
    <section id="infra-hero" ref={ref} className="py-0">
      <div className="w-full max-w-[1400px] mx-auto bg-[#0A0A0A] text-white rounded-sm overflow-hidden">
        <div className="relative min-h-screen flex items-center">
          {/* Background image with parallax feel */}
          <div className="absolute inset-0">
            <img
              src="/infra/outpost-campus.png"
              alt=""
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/90 to-[#0A0A0A]/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/40" />
            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-[0.04]" style={{
              backgroundImage: `linear-gradient(rgba(255,77,0,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,77,0,0.4) 1px, transparent 1px)`,
              backgroundSize: '120px 120px'
            }} />
          </div>

          {/* Content */}
          <div className="relative w-full px-6 md:px-12 lg:px-20 py-32 md:py-40">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-end">
              {/* Left: Main title */}
              <div className="lg:col-span-8">
                <motion.div
                  {...fadeUp}
                  animate={isInView ? fadeUp.animate : { opacity: 0, y: 40 }}
                >
                  <div className="flex items-center gap-3 mb-10">
                    <div className="w-8 h-[2px] bg-[#FF4D00]" />
                    <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-white/30">
                      Production-Method Architecture
                    </span>
                  </div>
                  
                  <h1 className="text-[48px] sm:text-[64px] md:text-[88px] lg:text-[110px] font-display font-medium tracking-[-0.05em] leading-[0.85] mb-8">
                    The method
                    <br />
                    <span className="text-[#FF4D00]">is the moat.</span>
                  </h1>
                  <p className="text-[15px] md:text-[17px] leading-[1.8] text-white/30 font-medium max-w-xl">
                    Not shared infrastructure. A reinvented method of production.
                    The spatial arrangement exists to serve that method. The
                    method IS the moat.
                  </p>
                </motion.div>
              </div>

              {/* Right: Stats column */}
              <div className="lg:col-span-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="space-y-0 border-t border-white/10"
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
                      className={`flex items-baseline justify-between py-4 ${i > 0 ? "border-t border-white/[0.06]" : ""}`}
                    >
                      <span className="text-[28px] md:text-[36px] font-display font-medium tracking-tighter text-white/90 leading-none">
                        {s.value}
                      </span>
                      <span className="text-[9px] font-mono font-bold tracking-[0.2em] uppercase text-white/15">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
            >
              <span className="text-[9px] font-mono font-bold tracking-[0.3em] uppercase text-white/15">Scroll</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-[1px] h-8 bg-gradient-to-b from-white/20 to-transparent"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   INFINITE MARQUEE — Auto-sliding horizontal strip
   ══════════════════════════════════════════════════════════════════════════ */
function InfiniteMarquee<T>({
  items,
  renderItem,
  speed = 40,
}: {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  speed?: number;
}) {
  const duration = (items.length * 320) / speed;

  return (
    <div className="group relative overflow-hidden">
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-white to-transparent" />

      {/* Scrolling track */}
      <div
        className="flex gap-4 group-hover:[animation-play-state:paused]"
        style={{
          animation: `marquee-scroll ${duration}s linear infinite`,
          width: "max-content",
        }}
      >
        {/* Original items */}
        {items.map((item, i) => (
          <div key={i} className="shrink-0">
            {renderItem(item, i)}
          </div>
        ))}
        {/* Duplicated items for seamless loop */}
        {items.map((item, i) => (
          <div key={`dup-${i}`} className="shrink-0">
            {renderItem(item, i)}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   02. CASE FOR INFRASTRUCTURE — Editorial manifesto
   ══════════════════════════════════════════════════════════════════════════ */
function CaseSection() {
  const { ref, isInView } = useFade();

  return (
    <section id="infra-case" ref={ref} className="py-3 md:py-4">
      {/* Marquee keyframes */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      ` }} />

      <div className="w-full max-w-[1400px] mx-auto bg-white text-[#111] rounded-sm overflow-hidden">
        {/* Pull quote */}
        <div className="px-6 md:px-12 lg:px-20 pt-20 md:pt-32 pb-12 md:pb-16">
          <motion.div
            {...fadeUp}
            animate={isInView ? fadeUp.animate : { opacity: 0, y: 40 }}
          >
            <div className="max-w-4xl">
              <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] mb-8 block">
                The Case for Infrastructure
              </span>
              <h2 className="text-[32px] md:text-[48px] lg:text-[64px] font-display font-medium tracking-[-0.04em] leading-[0.95] mb-8">
                Infrastructure is the
                <br />
                <span className="text-[#111]/15">invisible prerequisite.</span>
              </h2>
              <blockquote className="border-l-2 border-[#FF4D00] pl-6 md:pl-8">
                <p className="text-[18px] md:text-[22px] font-display font-medium italic leading-[1.4] text-[#111]/40">
                  &ldquo;Before you build the product, you must first build the ground it stands on.&rdquo;
                </p>
              </blockquote>
            </div>
          </motion.div>
        </div>

        {/* Three marquee groups */}
        <div className="pb-16 md:pb-20 space-y-12">
          {/* Group 1: Where infrastructure already exists */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="px-6 md:px-12 lg:px-20 mb-4">
              <div className="flex items-center gap-3">
                <span className="text-[9px] font-mono font-bold tracking-[0.2em] uppercase text-[#111]/15">Where infrastructure already exists</span>
                <div className="flex-1 h-[1px] bg-[#111]/5" />
              </div>
            </div>
            <InfiniteMarquee
              items={infrastructureExists}
              speed={35}
              renderItem={(item) => (
                <div className="w-[300px] border border-[#111]/5 rounded-sm overflow-hidden hover:border-[#111]/10 transition-colors bg-white">
                  <div className="flex items-start gap-3 p-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 mb-0.5">
                        <span className="text-[14px] font-display font-medium tracking-tight truncate">{item.name}</span>
                        <span className="text-[8px] font-mono font-bold tracking-[0.1em] uppercase text-[#111]/20 shrink-0">{item.context}</span>
                      </div>
                      <span className="text-[9px] font-mono font-bold tracking-[0.08em] uppercase text-[#FF4D00]/50 block mb-2">{item.company}</span>
                      <p className="text-[11px] text-[#111]/45 font-medium leading-[1.5] line-clamp-2">{item.takeaway}</p>
                    </div>
                  </div>
                </div>
              )}
            />
          </motion.div>

          {/* Group 2: Market-Creating Innovations */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="px-6 md:px-12 lg:px-20 mb-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[9px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00]">Market-Creating Innovations</span>
                <div className="flex-1 h-[1px] bg-[#FF4D00]/10" />
              </div>
              <p className="text-[11px] text-[#111]/30 font-medium italic">
                From <span className="text-[#111]/50 not-italic font-bold">The Prosperity Paradox</span> — they didn&apos;t find a market. They created one.
              </p>
            </div>
            <InfiniteMarquee
              items={marketCreatingInnovations}
              speed={30}
              renderItem={(item) => (
                <div className="w-[300px] border border-[#FF4D00]/15 bg-[#FF4D00]/[0.03] rounded-sm overflow-hidden hover:border-[#FF4D00]/25 transition-colors">
                  <div className="flex items-start gap-3 p-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover shrink-0 ring-1 ring-[#FF4D00]/10"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 mb-0.5">
                        <span className="text-[14px] font-display font-medium tracking-tight truncate">{item.name}</span>
                        <span className="text-[8px] font-mono font-bold tracking-[0.1em] uppercase text-[#111]/20 shrink-0">{item.context}</span>
                      </div>
                      <span className="text-[9px] font-mono font-bold tracking-[0.08em] uppercase text-[#FF4D00]/70 block mb-2">{item.company}</span>
                      <p className="text-[11px] text-[#111]/45 font-medium leading-[1.5] line-clamp-2">{item.takeaway}</p>
                    </div>
                  </div>
                </div>
              )}
            />
          </motion.div>

          {/* Group 3: Where infrastructure must be built first */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="px-6 md:px-12 lg:px-20 mb-4">
              <div className="flex items-center gap-3">
                <span className="text-[9px] font-mono font-bold tracking-[0.2em] uppercase text-[#991B1B]">Where infrastructure must be built first</span>
                <div className="flex-1 h-[1px] bg-[#991B1B]/10" />
              </div>
            </div>
            <InfiniteMarquee
              items={infrastructureMustBeBuilt}
              speed={30}
              renderItem={(item) => (
                <div className="w-[300px] border border-[#991B1B]/10 bg-[#991B1B]/[0.02] rounded-sm overflow-hidden hover:border-[#991B1B]/20 transition-colors">
                  <div className="flex items-start gap-3 p-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover shrink-0 ring-1 ring-[#991B1B]/10"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 mb-0.5">
                        <span className="text-[14px] font-display font-medium tracking-tight truncate">{item.name}</span>
                        <span className="text-[8px] font-mono font-bold tracking-[0.1em] uppercase text-[#991B1B]/40 shrink-0">{item.context}</span>
                      </div>
                      <span className="text-[9px] font-mono font-bold tracking-[0.08em] uppercase text-[#991B1B]/50 block mb-2">{item.company}</span>
                      <p className="text-[11px] text-[#111]/45 font-medium leading-[1.5] line-clamp-2">{item.takeaway}</p>
                    </div>
                  </div>
                </div>
              )}
            />
          </motion.div>
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="px-6 md:px-12 lg:px-20 py-12 md:py-16 bg-[#FAFAFA] border-t border-[#111]/5"
        >
          <div className="max-w-3xl">
            <p className="text-[22px] md:text-[28px] font-display font-medium tracking-tight text-[#111] mb-3">
              This is why xCelero exists.
            </p>
            <p className="text-[14px] text-[#111]/35 font-medium leading-[1.7]">
              We don&apos;t just invest in ventures — we build the infrastructure
              those ventures need to exist. The Outposts, the XEmbassies, the
              190+ projected hubs on the Route — these aren&apos;t real estate
              plays. They&apos;re operating systems for the next civilization.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   03. OUTPOST MODEL — Horizontal timeline + clusters
   ══════════════════════════════════════════════════════════════════════════ */
function OutpostModelSection() {
  const { ref, isInView } = useFade();
  const [activeCluster, setActiveCluster] = useState<string | null>(null);

  return (
    <section id="infra-outpost-model" ref={ref} className="py-3 md:py-4">
      <div className="w-full max-w-[1400px] mx-auto bg-white text-[#111] rounded-sm overflow-hidden">
        {/* Header */}
        <div className="px-6 md:px-12 lg:px-20 pt-20 md:pt-32 pb-12 md:pb-16">
          <motion.div
            {...fadeUp}
            animate={isInView ? fadeUp.animate : { opacity: 0, y: 40 }}
          >
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] mb-4 block">
              The Outpost Model
            </span>
            <h2 className="text-[40px] md:text-[60px] lg:text-[80px] font-display font-medium tracking-[-0.05em] leading-[0.85] text-[#111]">
              Every leap in output
              <br />
              <span className="text-[#111]/12">came from a new method.</span>
            </h2>
            <p className="text-[15px] text-[#111]/35 font-medium leading-[1.7] max-w-lg mt-6">
              Not better tools. Not more capital. A reinvented method of production.
              The method is what separates 80x output from 10% improvement.
              And xCelero is a platform — not a single product.
            </p>
          </motion.div>
        </div>

        {/* Method innovators — timeline cards */}
        <div className="px-6 md:px-12 lg:px-20 pb-16 md:pb-20">
          {/* Timeline connecting line */}
          <div className="relative mb-8">
            <div className="hidden md:block absolute top-6 left-0 right-0 h-[1px] bg-[#111]/5" />
          </div>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {methodInnovators.map((p, i) => (
              <motion.div
                key={p.subject}
                {...stagger(i)}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                className={`relative border rounded-sm overflow-hidden hover:border-[#FF4D00]/25 transition-all duration-300 ${
                  p.type === "platform"
                    ? "border-[#FF4D00]/15 bg-[#FF4D00]/[0.03] md:col-span-1 lg:col-span-2"
                    : "border-[#111]/5 bg-white"
                }`}
              >
                {/* Image header */}
                <div className="relative h-[100px] md:h-[80px] lg:h-[100px] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.subject}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
                  {/* Year badge */}
                  <div className="absolute top-2 left-2">
                    <span className="text-[9px] font-mono font-bold tracking-[0.1em] uppercase bg-white/90 backdrop-blur-sm px-2 py-0.5 text-[#111]">
                      {p.year}
                    </span>
                  </div>
                  {/* Platform badge */}
                  {p.type === "platform" && (
                    <div className="absolute top-2 right-2">
                      <span className="text-[8px] font-mono font-bold tracking-[0.1em] uppercase bg-[#FF4D00] text-white px-2 py-0.5">
                        Platform
                      </span>
                    </div>
                  )}
                </div>
                {/* Content */}
                <div className="p-4 md:p-5">
                  <h3 className="text-[18px] md:text-[20px] font-display font-medium tracking-tight mb-1 text-[#111]">
                    {p.subject}
                  </h3>
                  <div className={`text-[9px] font-mono font-bold tracking-[0.1em] uppercase mb-3 ${
                    p.type === "platform" ? "text-[#FF4D00]" : "text-[#FF4D00]/40"
                  }`}>
                    {p.method}
                  </div>
                  <p className={`text-[12px] font-medium leading-[1.6] ${
                    p.type === "platform" ? "text-[#111]/50" : "text-[#111]/30"
                  }`}>
                    {p.statement}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Key distinction callout */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="mt-8 border-l-2 border-[#FF4D00] bg-[#FF4D00]/[0.03] rounded-r-sm p-6 md:p-8"
          >
            <p className="text-[14px] md:text-[16px] text-[#111]/50 font-medium leading-[1.7]">
              Ford made <strong className="text-[#111]">one product</strong> faster. Tesla makes <strong className="text-[#111]">one product</strong> faster. 
              Bell Labs and xCelero are different — they invented a <strong className="text-[#FF4D00]">method that compounds across every product</strong> simultaneously. 
              The assembly line produces cars. The research campus produces discoveries. The outpost produces working ventures.
            </p>
          </motion.div>
        </div>

        {/* Interactive Cluster Visualization — replaces static image */}
        <div className="px-6 md:px-12 lg:px-20 pb-16 md:pb-24">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[9px] font-mono font-bold tracking-[0.3em] uppercase text-[#111]/15">
              Six clusters. One machine.
            </span>
            <div className="flex-1 h-[1px] bg-[#111]/5" />
            <span className="text-[9px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00]">
              Click to explore
            </span>
          </div>

          <div className="grid lg:grid-cols-12 gap-6">
            {/* Interactive hexagonal cluster map */}
            <div className="lg:col-span-7">
              <div className="relative bg-[#FAFAFA] rounded-sm p-6 md:p-8 min-h-[400px] md:min-h-[500px]">
                {/* Background grid */}
                <div className="absolute inset-0 opacity-[0.03] rounded-sm overflow-hidden" style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)`,
                  backgroundSize: '40px 40px'
                }} />
                
                {/* Cluster nodes */}
                <div className="relative w-full h-full min-h-[360px] md:min-h-[460px]">
                  {clusterData.map((c, i) => {
                    const Icon = c.icon;
                    // Position clusters in a spatial layout
                    const positions = [
                      { top: "5%", left: "25%" },   // Hive - front center
                      { top: "35%", left: "5%" },    // Foundry - left
                      { top: "30%", left: "45%" },   // Lab - center
                      { top: "55%", left: "30%" },   // Commons - center bottom
                      { top: "60%", left: "60%" },   // Living - right
                      { top: "10%", left: "60%" },   // Extension - top right
                    ];
                    const pos = positions[i];
                    const isActive = activeCluster === c.id;
                    
                    return (
                      <motion.button
                        key={c.id}
                        suppressHydrationWarning
                        onClick={() => setActiveCluster(isActive ? null : c.id)}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                        className={`absolute w-[120px] md:w-[140px] transition-all duration-300 text-left ${
                          isActive ? "z-20" : "z-10"
                        }`}
                        style={{ top: pos.top, left: pos.left }}
                      >
                        <div className={`p-3 md:p-4 rounded-sm border transition-all duration-300 ${
                          isActive
                            ? "bg-[#111] text-white border-[#FF4D00] shadow-lg scale-110"
                            : "bg-white border-[#111]/8 hover:border-[#FF4D00]/30 hover:shadow-md"
                        }`}>
                          <div className="flex items-center gap-2 mb-1">
                            <Icon className={`w-4 h-4 ${isActive ? "text-[#FF4D00]" : "text-[#FF4D00]/60"}`} strokeWidth={1.5} />
                            <span className={`text-[8px] font-mono font-bold tracking-[0.1em] uppercase ${isActive ? "text-[#FF4D00]" : "text-[#111]/20"}`}>
                              {c.num}
                            </span>
                          </div>
                          <h4 className={`text-[13px] font-display font-medium tracking-tight ${isActive ? "text-white" : "text-[#111]"}`}>
                            {c.name}
                          </h4>
                          <div className={`text-[9px] font-mono tracking-[0.05em] ${isActive ? "text-white/30" : "text-[#111]/20"}`}>
                            {c.sub}
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}

                  {/* Connecting lines between clusters (SVG) */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
                    <line x1="32%" y1="18%" x2="15%" y2="42%" stroke="rgba(255,77,0,0.08)" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="32%" y1="18%" x2="55%" y2="38%" stroke="rgba(255,77,0,0.08)" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="15%" y1="48%" x2="38%" y2="62%" stroke="rgba(255,77,0,0.08)" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="55%" y1="38%" x2="38%" y2="62%" stroke="rgba(255,77,0,0.08)" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="38%" y1="65%" x2="68%" y2="68%" stroke="rgba(255,77,0,0.08)" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="68%" y1="20%" x2="55%" y2="38%" stroke="rgba(255,77,0,0.08)" strokeWidth="1" strokeDasharray="4 4" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Cluster detail panel */}
            <div className="lg:col-span-5">
              <AnimatePresence mode="wait">
                {activeCluster ? (
                  <motion.div
                    key={activeCluster}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-[#FAFAFA] rounded-sm p-6 md:p-8 min-h-[400px] md:min-h-[500px] flex flex-col"
                  >
                    {(() => {
                      const cluster = clusterData.find(c => c.id === activeCluster);
                      if (!cluster) return null;
                      const Icon = cluster.icon;
                      return (
                        <>
                          <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-[#FF4D00] rounded-sm flex items-center justify-center">
                              <Icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                            </div>
                            <div>
                              <h3 className="text-[22px] font-display font-medium tracking-tight text-[#111]">
                                {cluster.name}
                              </h3>
                              <span className="text-[10px] font-mono font-bold tracking-[0.1em] uppercase text-[#FF4D00]">
                                Cluster {cluster.num} · {cluster.sub}
                              </span>
                            </div>
                          </div>
                          
                          <div className="relative h-[140px] rounded-sm overflow-hidden mb-6">
                            <img
                              src={cluster.image}
                              alt={cluster.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] via-transparent to-transparent" />
                          </div>

                          <div className="flex-1">
                            <div className="text-[9px] font-mono font-bold tracking-[0.15em] uppercase text-[#111]/15 mb-3">
                              Why this configuration
                            </div>
                            <p className="text-[14px] text-[#111]/45 font-medium leading-[1.7]">
                              {cluster.why}
                            </p>
                          </div>

                          <button
                            onClick={() => setActiveCluster(null)}
                            className="mt-6 text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#FF4D00] hover:text-[#111] transition-colors"
                          >
                            ← Back to map
                          </button>
                        </>
                      );
                    })()}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-[#FAFAFA] rounded-sm p-6 md:p-8 min-h-[400px] md:min-h-[500px] flex flex-col items-center justify-center text-center"
                  >
                    <div className="w-16 h-16 border border-[#111]/5 rounded-full flex items-center justify-center mb-6">
                      <TreePine className="w-7 h-7 text-[#111]/10" strokeWidth={1} />
                    </div>
                    <p className="text-[14px] text-[#111]/25 font-medium leading-[1.6] max-w-xs">
                      Click any cluster on the map to explore its spatial logic and configuration.
                    </p>
                    <p className="text-[12px] text-[#111]/15 font-medium mt-4">
                      Each zone is optimized for its type of production.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   04. THE OUTPOST: LEVEL BY LEVEL — Vertical floor selector
   ══════════════════════════════════════════════════════════════════════════ */
function LevelsSection() {
  const { ref, isInView } = useFade();
  const [activeLevel, setActiveLevel] = useState("membrane");
  const active = levels.find((l) => l.id === activeLevel)!;

  return (
    <section id="infra-levels" ref={ref} className="py-3 md:py-4">
      <div className="w-full max-w-[1400px] mx-auto bg-white text-[#111] rounded-sm overflow-hidden">
        {/* Header */}
        <div className="px-6 md:px-12 lg:px-20 pt-20 md:pt-32 pb-0">
          <motion.div
            {...fadeUp}
            animate={isInView ? fadeUp.animate : { opacity: 0, y: 40 }}
          >
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] mb-4 block">
              Under One Roof
            </span>
            <h2 className="text-[40px] md:text-[60px] lg:text-[80px] font-display font-medium tracking-[-0.05em] leading-[0.85] text-[#111] mb-12">
              The Outpost,
              <br />
              <span className="text-[#111]/12">level by level.</span>
            </h2>
          </motion.div>

          {/* Vertical floor tabs — horizontal on mobile, vertical sidebar on desktop */}
          <div className="flex gap-0 overflow-x-auto border-b border-[#111]/8 scrollbar-none -mx-6 md:-mx-12 lg:-mx-20 px-6 md:px-12 lg:px-20">
            {levels.map((level) => {
              const Icon = level.icon;
              return (
                <button
                  key={level.id}
                  suppressHydrationWarning
                  onClick={() => setActiveLevel(level.id)}
                  className={`flex items-center gap-2.5 px-5 py-4 text-left whitespace-nowrap border-b-2 transition-all min-h-[48px] flex-shrink-0 ${
                    activeLevel === level.id
                      ? "border-[#FF4D00] text-[#111]"
                      : "border-transparent text-[#111]/25 hover:text-[#111]/50"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 flex-shrink-0 ${
                      activeLevel === level.id ? "text-[#FF4D00]" : "text-[#111]/15"
                    }`}
                    strokeWidth={1.5}
                  />
                  <div>
                    <div className={`text-[8px] font-mono font-bold tracking-[0.1em] uppercase ${
                      activeLevel === level.id ? "text-[#FF4D00]" : "text-[#111]/15"
                    }`}>
                      {level.number}
                    </div>
                    <div className="text-[13px] font-display font-medium tracking-tight">
                      {level.name}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content area */}
        <div className="px-6 md:px-12 lg:px-20 py-12 md:py-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLevel}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
                {/* Left: image */}
                <div className="lg:col-span-5">
                  <div className="relative overflow-hidden rounded-sm min-h-[280px] lg:min-h-[450px] lg:sticky lg:top-24">
                    <img
                      src={active.image}
                      alt={active.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111]/80 via-[#111]/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6 md:p-8">
                      <div className="text-[9px] font-mono font-bold tracking-[0.15em] text-[#FF4D00] mb-1">
                        {active.number}
                      </div>
                      <h3 className="text-[28px] md:text-[36px] font-display font-medium tracking-[-0.02em] leading-[1] mb-2 text-white">
                        {active.name}
                      </h3>
                      <p className="text-[13px] text-white/40 font-medium italic">
                        {active.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right: content */}
                <div className="lg:col-span-7">
                  {/* Method highlight */}
                  {active.method && (
                    <div className="border-l-2 border-[#FF4D00] pl-6 mb-8">
                      <div className="text-[9px] font-mono font-bold tracking-[0.15em] uppercase text-[#FF4D00] mb-3">
                        The Method
                      </div>
                      <p className="text-[14px] text-[#111]/50 font-medium leading-[1.7]">
                        {active.method}
                      </p>
                    </div>
                  )}

                  {/* Airlock note */}
                  {"note" in active && active.note && (
                    <div className="bg-[#FAFAFA] rounded-sm p-5 mb-8">
                      <p className="text-[12px] text-[#111]/35 font-medium leading-[1.6]">
                        {active.note as string}
                      </p>
                    </div>
                  )}

                  {/* Items */}
                  <div className="space-y-0">
                    {active.items.map((item, i) => (
                      <div
                        key={i}
                        className="border-b border-[#111]/6 py-5 last:border-b-0"
                      >
                        <h4 className="text-[13px] font-bold tracking-tight text-[#111]/70 mb-1.5">
                          {item.title}
                        </h4>
                        <p className="text-[13px] text-[#111]/35 font-medium leading-[1.6]">
                          {item.desc}
                        </p>
                        {"subitems" in item && item.subitems && (
                          <ul className="mt-2 space-y-1">
                            {(item.subitems as string[]).map((si, j) => (
                              <li
                                key={j}
                                className="text-[11px] text-[#111]/25 font-medium leading-[1.5] pl-3 border-l border-[#FF4D00]/20"
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
                    <div className="grid sm:grid-cols-2 gap-3 mt-8">
                      {(active.principles as { title: string; desc: string }[]).map((p, i) => (
                        <div key={i} className="bg-[#FAFAFA] rounded-sm p-5">
                          <h4 className="text-[12px] font-bold text-[#FF4D00] mb-2">
                            {p.title}
                          </h4>
                          <p className="text-[11px] text-[#111]/30 font-medium leading-[1.6]">
                            {p.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Studio bottom line */}
                  {"bottomLine" in active && active.bottomLine && (
                    <div className="border-l-2 border-[#FF4D00] pl-6 mt-8">
                      <div className="text-[9px] font-mono font-bold tracking-[0.15em] uppercase text-[#FF4D00] mb-2">
                        The Bottom Line
                      </div>
                      <p className="text-[14px] text-[#111]/45 font-medium leading-[1.7]">
                        {active.bottomLine as string}
                      </p>
                    </div>
                  )}

                  {/* Commons spatial logic */}
                  {"spatialLogic" in active && active.spatialLogic && (
                    <div className="bg-[#FAFAFA] rounded-sm p-6 mt-8">
                      <div className="text-[9px] font-mono font-bold tracking-[0.15em] uppercase text-[#111]/12 mb-2">
                        The Spatial Logic
                      </div>
                      <p className="text-[13px] text-[#111]/40 font-medium leading-[1.7]">
                        {active.spatialLogic as string}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   05. CAMPUS RING — Cinematic panoramic
   ══════════════════════════════════════════════════════════════════════════ */
function CampusRingSection() {
  const { ref, isInView } = useFade();
  return (
    <section id="infra-campus-ring" ref={ref} className="py-3 md:py-4">
      <div className="w-full max-w-[1400px] mx-auto bg-[#0A0A0A] text-white rounded-sm overflow-hidden">
        {/* Full-width image */}
        <div className="relative h-[40vh] md:h-[55vh] overflow-hidden">
          <img
            src="/infra/campus-ring.png"
            alt="Campus Ring"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-[#0A0A0A]/20" />
          <div className="absolute bottom-0 left-0 px-6 md:px-12 lg:px-20 pb-10 md:pb-16 w-full">
            <motion.div
              {...fadeUp}
              animate={isInView ? fadeUp.animate : { opacity: 0, y: 40 }}
            >
              <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] mb-4 block">
                The Campus Ring
              </span>
              <h2 className="text-[36px] md:text-[56px] lg:text-[72px] font-display font-medium tracking-[-0.04em] leading-[0.9] max-w-2xl">
                What can&apos;t fit
                <br />
                <span className="text-white/15">under the roof.</span>
              </h2>
            </motion.div>
          </div>
        </div>

        {/* Zone cards — horizontal scroll on mobile, grid on desktop */}
        <div className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {campusRing.map((zone, i) => {
              const Icon = zone.icon;
              return (
                <motion.div
                  key={zone.name}
                  {...stagger(i)}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  className="border border-white/[0.06] rounded-sm p-6 hover:border-[#FF4D00]/25 transition-all duration-300 group bg-white/[0.015]"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 border border-white/[0.08] rounded-sm flex items-center justify-center group-hover:border-[#FF4D00]/30 transition-colors flex-shrink-0">
                      <Icon className="w-4.5 h-4.5 text-[#FF4D00]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="text-[14px] font-bold tracking-tight">{zone.name}</h4>
                      <div className="text-[9px] font-mono font-bold tracking-[0.1em] uppercase text-[#FF4D00]/40">
                        serves {zone.serves}
                      </div>
                    </div>
                  </div>
                  <p className="text-[12px] text-white/25 font-medium leading-[1.5]">
                    {zone.desc}
                  </p>
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
   06. CORE TECHNOLOGIES — Bento grid
   ══════════════════════════════════════════════════════════════════════════ */
function CoreTechSection() {
  const { ref, isInView } = useFade();
  return (
    <section id="infra-core-tech" ref={ref} className="py-3 md:py-4">
      <div className="w-full max-w-[1400px] mx-auto bg-[#FAFAFA] text-[#111] rounded-sm overflow-hidden">
        <div className="px-6 md:px-12 lg:px-20 py-20 md:py-32">
          {/* Header — left aligned */}
          <motion.div
            {...fadeUp}
            animate={isInView ? fadeUp.animate : { opacity: 0, y: 40 }}
            className="mb-16 md:mb-20"
          >
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] mb-4 block">
              8 Domains
            </span>
            <h2 className="text-[36px] md:text-[52px] lg:text-[68px] font-display font-medium tracking-[-0.03em] leading-[0.9] text-[#111]">
              Independent innovation,
              <br />
              <span className="text-[#111]/12">compound output.</span>
            </h2>
          </motion.div>

          {/* Tech grid — 4 columns, uniform cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {coreTechnologies.map((tech, i) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={tech.name}
                  {...stagger(i)}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  className="bg-white border border-[#111]/5 rounded-sm p-6 hover:border-[#FF4D00]/20 transition-all group"
                >
                  <div className="w-10 h-10 bg-[#111]/[0.03] rounded-sm flex items-center justify-center mb-4 group-hover:bg-[#FF4D00]/5 transition-colors">
                    <Icon className="w-5 h-5 text-[#FF4D00]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[14px] font-display font-medium tracking-tight text-[#111] mb-1.5">
                    {tech.name}
                  </h3>
                  <p className="text-[11px] text-[#111]/30 font-medium leading-[1.5]">
                    {tech.desc}
                  </p>
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
   07. THE FLOW — Pipeline visualization
   ══════════════════════════════════════════════════════════════════════════ */
function FlowSection() {
  const { ref, isInView } = useFade();
  return (
    <section id="infra-flow" ref={ref} className="py-3 md:py-4">
      <div className="w-full max-w-[1400px] mx-auto bg-[#0A0A0A] text-white rounded-sm overflow-hidden">
        <div className="px-6 md:px-12 lg:px-20 py-20 md:py-32">
          {/* Header */}
          <motion.div
            {...fadeUp}
            animate={isInView ? fadeUp.animate : { opacity: 0, y: 40 }}
            className="mb-16 md:mb-24"
          >
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] mb-4 block">
              The Flow
            </span>
            <h2 className="text-[40px] md:text-[60px] lg:text-[80px] font-display font-medium tracking-[-0.05em] leading-[0.85]">
              How ventures move
              <br />
              <span className="text-white/15">through space.</span>
            </h2>
          </motion.div>

          {/* Flow cards — 3 columns with weight indicators */}
          <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-3 md:gap-4">
            {ventureFlows.map((flow, i) => {
              const Icon = flow.icon;
              return (
                <motion.div
                  key={flow.type}
                  {...stagger(i)}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  className="relative border border-white/[0.06] rounded-sm p-8 md:p-10 group hover:border-[#FF4D00]/25 transition-colors bg-white/[0.015]"
                >
                  {/* Weight bar */}
                  <div className="flex gap-1 mb-6">
                    {[0,1,2].map((dot) => (
                      <div
                        key={dot}
                        className={`w-8 h-1 rounded-full ${
                          dot <= i ? "bg-[#FF4D00]" : "bg-white/[0.06]"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 border border-white/[0.08] rounded-sm flex items-center justify-center group-hover:border-[#FF4D00]/30 transition-colors">
                      <Icon className="w-5 h-5 text-[#FF4D00]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <span className="text-[13px] font-display font-medium tracking-tight block">
                        {flow.type}
                      </span>
                      <p className="text-[9px] font-mono tracking-[0.08em] uppercase text-white/15 mt-0.5">
                        {flow.examples}
                      </p>
                    </div>
                  </div>
                  <p className="text-[14px] text-white/30 font-medium leading-[1.7]">
                    {flow.path}
                  </p>
                  
                  {/* Arrow connector between cards */}
                  {i < 2 && (
                    <div className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-4 h-4 bg-[#0A0A0A] items-center justify-center">
                      <ChevronRight className="w-3 h-3 text-white/10" />
                    </div>
                  )}
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
   08. THE MOAT — Argument structure
   ══════════════════════════════════════════════════════════════════════════ */
function MoatSection() {
  const { ref, isInView } = useFade();
  const [activeMoat, setActiveMoat] = useState("01");
  const active = moatPoints.find((m) => m.number === activeMoat)!;

  return (
    <section id="infra-moat" ref={ref} className="py-3 md:py-4">
      <div className="w-full max-w-[1400px] mx-auto space-y-3 md:space-y-4">
        {/* LIGHT PART — critique */}
        <div className="bg-white text-[#111] rounded-sm overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Left: thesis */}
            <div className="px-6 md:px-12 lg:px-20 py-20 md:py-28 flex flex-col justify-center">
              <motion.div
                {...fadeUp}
                animate={isInView ? fadeUp.animate : { opacity: 0, y: 40 }}
              >
                <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] mb-6 block">
                  The Moat
                </span>
                <h2 className="text-[36px] md:text-[52px] lg:text-[64px] font-display font-medium tracking-[-0.04em] leading-[0.9] text-[#111] mb-8">
                  Why no one can
                  <br />
                  <span className="text-[#111]/12">copy this.</span>
                </h2>
                <blockquote className="text-[18px] md:text-[22px] font-display font-medium italic tracking-[-0.02em] leading-[1.3] text-[#111]/30 max-w-md">
                  &ldquo;The method isn&apos;t obvious until someone invents it.
                  Ford&apos;s competitors had lathes. They didn&apos;t have the
                  assembly line.&rdquo;
                </blockquote>
              </motion.div>
            </div>

            {/* Right: traditional model critique */}
            <div className="px-6 md:px-12 lg:px-20 py-20 md:py-28 flex flex-col justify-center bg-[#FAFAFA]">
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-[18px] font-display font-medium tracking-tight text-[#111] mb-8">
                  The Traditional Model
                </h3>
                <div className="space-y-6">
                  {[
                    { title: "Knowledge dies", desc: "Each venture starts at zero and crawls forward alone." },
                    { title: "Equipment idles", desc: "One venture can't keep a machine busy. Hundreds of hours of idle equipment per day." },
                    { title: "Capital duplicates", desc: "Each venture buys its own CNC, its own bioreactor. Millions in duplicated CapEx." },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-8 h-8 bg-[#111]/[0.04] rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-[10px] font-mono font-bold text-[#111]/20">{i + 1}</span>
                      </div>
                      <div>
                        <h4 className="text-[14px] font-bold text-[#111]/60 mb-1">
                          {item.title}.
                        </h4>
                        <p className="text-[13px] text-[#111]/30 font-medium leading-[1.6]">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-[#111]/5">
                  <p className="text-[14px] font-bold text-[#111]/25">
                    One venture, one of everything, zero compounding.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* DARK PART — moat tabs */}
        <div className="bg-[#0A0A0A] text-white rounded-sm overflow-hidden">
          <div className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
            {/* Moat navigation — horizontal pills */}
            <div className="flex flex-wrap gap-2 mb-12">
              {moatPoints.map((point) => {
                const Icon = point.icon;
                return (
                  <button
                    key={point.number}
                    suppressHydrationWarning
                    onClick={() => setActiveMoat(point.number)}
                    className={`flex items-center gap-2 px-4 py-2.5 text-[10px] font-mono font-bold tracking-[0.1em] uppercase border rounded-sm transition-all min-h-[40px] ${
                      activeMoat === point.number
                        ? "bg-[#FF4D00] text-white border-[#FF4D00]"
                        : "bg-transparent text-white/20 border-white/[0.06] hover:border-white/15"
                    }`}
                  >
                    <Icon className="w-3 h-3" strokeWidth={1.5} />
                    <span className="hidden md:inline">{point.title}</span>
                    <span className="md:hidden">{point.number}</span>
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
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
                    {active.examples.map((ex, i) => (
                      <div
                        key={i}
                        className="border border-white/[0.06] rounded-sm p-5 bg-white/[0.015]"
                      >
                        <div className="text-[9px] font-mono font-bold tracking-[0.12em] uppercase text-[#FF4D00] mb-2">
                          {ex.domain}
                        </div>
                        <p className="text-[12px] text-white/30 font-medium leading-[1.6]">
                          {ex.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                {/* Full-width insight */}
                <div className="border-l-2 border-[#FF4D00] bg-[#FF4D00]/[0.03] rounded-r-sm p-8 md:p-10">
                  <div className="flex items-center gap-3 mb-4">
                    {(() => {
                      const Icon = active.icon;
                      return <Icon className="w-4 h-4 text-[#FF4D00]" strokeWidth={1.5} />;
                    })()}
                    <span className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#FF4D00]">
                      {active.number}. {active.title}
                    </span>
                  </div>
                  <p className="text-[14px] md:text-[16px] text-white/40 font-medium leading-[1.8]">
                    {active.insight}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   09. HUBS ON THE ROUTE — Network map
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
    <section id="infra-hubs" ref={ref} className="py-3 md:py-4">
      <div className="w-full max-w-[1400px] mx-auto bg-white text-[#111] rounded-sm overflow-hidden">
        {/* Hero image */}
        <div className="relative h-[25vh] md:h-[35vh] overflow-hidden">
          <img
            src="/infra/hubs-network.png"
            alt="Global Hub Network"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-white/20" />
          <div className="absolute bottom-0 left-0 px-6 md:px-12 lg:px-20 pb-8 md:pb-12">
            <motion.div
              {...fadeUp}
              animate={isInView ? fadeUp.animate : { opacity: 0, y: 40 }}
            >
              <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] mb-4 block">
                Hubs on the Route
              </span>
              <h2 className="text-[36px] md:text-[52px] font-display font-medium tracking-[-0.04em] leading-[0.9] text-[#111]">
                A union of
                <br />
                <span className="text-[#111]/15">cities.</span>
              </h2>
            </motion.div>
          </div>
        </div>

        <div className="px-6 md:px-12 lg:px-20 py-12 md:py-20">
          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="flex gap-10 mb-10 pb-8 border-b border-[#111]/5"
          >
            {[
              { value: "190+", label: "Hubs" },
              { value: "39+", label: "Countries" },
              { value: "6", label: "Legs" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-[24px] font-display font-medium tracking-tighter text-[#FF4D00]">
                  {s.value}
                </div>
                <div className="text-[9px] font-mono font-bold tracking-[0.2em] uppercase text-[#111]/20">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Leg filter pills */}
          <div className="flex flex-wrap gap-2 mb-10">
            <button
              suppressHydrationWarning
              onClick={() => setActiveLeg(null)}
              className={`px-3 py-2 text-[9px] font-mono font-bold tracking-widest uppercase border rounded-sm transition-colors min-h-[36px] ${
                activeLeg === null
                  ? "bg-[#111] text-white border-[#111]"
                  : "bg-transparent text-[#111]/30 border-[#111]/8 hover:border-[#111]/20"
              }`}
            >
              All
            </button>
            {routeLegs.map((leg) => (
              <button
                key={leg.id}
                suppressHydrationWarning
                onClick={() => setActiveLeg(activeLeg === leg.id ? null : leg.id)}
                className={`px-3 py-2 text-[9px] font-mono font-bold tracking-widest uppercase border rounded-sm transition-colors min-h-[36px] ${
                  activeLeg === leg.id
                    ? "text-white border-transparent"
                    : "bg-transparent text-[#111]/30 border-[#111]/8 hover:border-[#111]/20"
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
          <div className="space-y-8 max-h-[500px] overflow-y-auto pr-2">
            {visibleHubs.map(({ leg, cities }) => (
              <div key={leg.id}>
                <div className="flex items-center gap-3 mb-4 pb-2 border-b border-[#111]/5">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: leg.color }}
                  />
                  <h3 className="text-[15px] font-display font-medium tracking-tight">
                    Leg {leg.legNumber}: {leg.name}
                  </h3>
                  <span className="text-[9px] font-mono text-[#111]/20 tracking-widest uppercase ml-auto">
                    {leg.hubCount} hubs · {leg.countries.length} countries
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                  {cities.map((city) => (
                    <div
                      key={city.id}
                      className="border border-[#111]/5 rounded-sm p-3 hover:border-[#FF4D00]/20 transition-colors group bg-[#FAFAFA]"
                    >
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <MapPin className="w-2.5 h-2.5 text-[#FF4D00]" />
                        <h4 className="text-[12px] font-display font-medium tracking-tight group-hover:text-[#FF4D00] transition-colors">
                          {city.name}
                        </h4>
                      </div>
                      <p className="text-[10px] text-[#111]/30 font-medium leading-[1.4]">
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
              className="group inline-flex items-center gap-3 px-8 py-3.5 bg-[#111] text-white text-[10px] font-bold tracking-[0.2em] uppercase rounded-sm hover:bg-[#FF4D00] transition-colors"
            >
              Explore the Full Route
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   10. CIVILIZATION — Climactic closing argument
   ══════════════════════════════════════════════════════════════════════════ */
function CivilizationSection() {
  const { ref, isInView } = useFade();
  return (
    <section id="infra-civilization" ref={ref} className="py-3 md:py-4">
      <div className="w-full max-w-[1400px] mx-auto bg-white text-[#111] rounded-sm overflow-hidden">
        {/* Dramatic header */}
        <div className="px-6 md:px-12 lg:px-20 pt-20 md:pt-32 pb-16 md:pb-20">
          <motion.div
            {...fadeUp}
            animate={isInView ? fadeUp.animate : { opacity: 0, y: 40 }}
          >
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] mb-6 block">
              The Civilization
            </span>
            <h2 className="text-[40px] md:text-[60px] lg:text-[80px] font-display font-medium tracking-[-0.05em] leading-[0.85] text-[#111]">
              The xCelero
              <br />
              <span className="text-[#111]/12">Scale.</span>
            </h2>
          </motion.div>
        </div>

        {/* Central thesis */}
        <div className="px-6 md:px-12 lg:px-20 pb-12">
          <motion.div
            {...stagger(0)}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          >
            <h3 className="text-[24px] md:text-[36px] font-display font-medium tracking-tight leading-[1.15] text-[#111] max-w-3xl mb-4">
              The xCelero Scale measures civilization not by energy, but by{" "}
              <span className="text-[#FF4D00]">working solutions per unit time per outpost.</span>
            </h3>
            <p className="text-[15px] text-[#111]/35 font-medium leading-[1.7] max-w-2xl">
              The Kardashev Scale measures by energy output. One dimension. Myopic. The real bottleneck
              isn&apos;t energy — it&apos;s the rate at which ideas become working solutions. 10 years
              for a drug, 18 months for a robot, 2 years for a hardware product, and 90% of ventures
              die trying.
            </p>
          </motion.div>
        </div>

        {/* Problem + Solution side by side */}
        <div className="px-6 md:px-12 lg:px-20 pb-8">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Problem */}
            <motion.div
              {...stagger(1)}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              className="bg-[#FAFAFA] rounded-sm p-8 md:p-10"
            >
              <div className="flex items-center gap-2 mb-5">
                <div className="w-6 h-6 bg-[#111]/5 rounded-sm flex items-center justify-center">
                  <span className="text-[9px] font-mono font-bold text-[#111]/30">P</span>
                </div>
                <span className="text-[9px] font-mono font-bold tracking-[0.15em] uppercase text-[#111]/12">Problem</span>
              </div>
              <p className="text-[15px] text-[#111]/45 font-medium leading-[1.7]">
                10 years for a drug. 18 months for a robot. 2 years for a hardware product.
                And 90% of ventures die trying. The production method is linear, isolated, and
                non-compounding.
              </p>
            </motion.div>

            {/* Solution */}
            <motion.div
              {...stagger(2)}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              className="border border-[#FF4D00]/10 bg-[#FF4D00]/[0.02] rounded-sm p-8 md:p-10"
            >
              <div className="flex items-center gap-2 mb-5">
                <div className="w-6 h-6 bg-[#FF4D00] rounded-sm flex items-center justify-center">
                  <span className="text-[9px] font-mono font-bold text-white">S</span>
                </div>
                <span className="text-[9px] font-mono font-bold tracking-[0.15em] uppercase text-[#FF4D00]/40">Solution</span>
              </div>
              <p className="text-[15px] text-[#111]/55 font-medium leading-[1.7] mb-6">
                xCelero reinvents the production method.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Build Line", desc: "Hardware prototypes per unit time no standalone workshop can match." },
                  { label: "Discovery Line", desc: "Validated findings per unit time no isolated lab can match." },
                  { label: "Ship Line", desc: "Working software per unit time no standalone team can match." },
                  { label: "Power Line", desc: "Energy products validated per unit time no single test rig can match." },
                ].map((line, i) => (
                  <div key={i} className="bg-white rounded-sm p-3 border border-[#FF4D00]/5">
                    <div className="text-[11px] font-bold text-[#FF4D00] mb-1">
                      {line.label}
                    </div>
                    <p className="text-[10px] text-[#111]/25 font-medium leading-[1.5]">
                      {line.desc}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Type 0 vs Type 1 — dramatic comparison */}
        <div className="px-6 md:px-12 lg:px-20 py-16 md:py-20">
          <motion.div
            {...stagger(3)}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          >
            <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {/* Type 0 */}
              <div className="bg-[#111] text-white rounded-sm p-8 md:p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="relative">
                  <div className="text-[9px] font-mono font-bold tracking-[0.15em] uppercase text-white/20 mb-6">
                    Type 0 Civilization
                  </div>
                  <p className="text-[16px] text-white/35 font-medium leading-[1.7]">
                    Produces solutions sequentially — one lab, one company, one
                    country at a time. 90% die.
                  </p>
                </div>
              </div>

              {/* Type 1 */}
              <div className="bg-[#FF4D00] text-white rounded-sm p-8 md:p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.1] rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="relative">
                  <div className="text-[9px] font-mono font-bold tracking-[0.15em] uppercase text-white/50 mb-6">
                    Type 1 Civilization
                  </div>
                  <p className="text-[16px] text-white/85 font-medium leading-[1.7]">
                    Produces solutions through compound production methods — where
                    every venture starts at the accumulated endpoint of every
                    venture before it.
                  </p>
                </div>
              </div>
            </div>

            {/* Closing statement */}
            <div className="text-center mt-16 max-w-xl mx-auto">
              <p className="text-[18px] md:text-[22px] font-display font-medium leading-[1.6] text-[#111]/35">
                The outpost is the unit cell. The method is the moat. Replicated 190
                times across 39 countries, this isn&apos;t a venture platform.{" "}
                <span className="text-[#FF4D00]">
                  It&apos;s a new method of invention itself.
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
