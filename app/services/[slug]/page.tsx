import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  CloudCheck,
  Code,
  Cpu,
  Database,
  Lightning,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr";
import { services } from "@/lib/content";
import { DeliveryMethodology } from "@/components/delivery-methodology";
import { DeliverablesHub } from "@/components/deliverables-hub";

const TECH_ICONS = [Cpu, Database, Code, CloudCheck, Lightning, ShieldCheck];

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();

  // Dual-Row Marquee Stacks (4x Duplication for seamless infinite loops)
  const row1Stack = [...s.stack, ...s.stack, ...s.stack, ...s.stack];
  const offsetIdx = s.stack.length > 3 ? 3 : Math.floor(s.stack.length / 2);
  const offsetStack = [...s.stack.slice(offsetIdx), ...s.stack.slice(0, offsetIdx)];
  const row2Stack = [...offsetStack, ...offsetStack, ...offsetStack, ...offsetStack];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-6 lg:pt-10 pb-12 lg:pb-16 px-6 bg-theme-bg relative overflow-hidden theme-transition border-b border-theme-border">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-orange-500/5 via-transparent to-transparent pointer-events-none rounded-full blur-3xl -z-10" />
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Column: Service Text Content */}
            <div className="lg:col-span-7 hero-reveal">
              <Link
                href="/#what-we-build"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-theme-muted hover:text-theme-accent transition-colors mb-6"
              >
                <ArrowLeft size={14} /> Back to Disciplines
              </Link>
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-theme-accent mb-4 block">
                DISCIPLINE · {s.kicker}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6 text-theme-text theme-transition">
                {s.title}
              </h1>
              <p className="text-base sm:text-lg text-theme-muted max-w-2xl leading-relaxed mb-8 theme-transition">
                {s.intro}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-theme-text text-theme-surface px-7 py-3.5 rounded-xl font-bold hover:bg-theme-accent hover:text-white transition-colors shadow-sm"
                >
                  Discuss your project <ArrowUpRight size={18} />
                </Link>
              </div>
            </div>

            {/* Right Column: Sleek Framed Image Card with Glassmorphic Overlay */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] lg:aspect-[5/4] w-full rounded-3xl overflow-hidden border border-theme-border shadow-xl bg-theme-surface group">
                <Image
                  src={`/services/${s.slug}.jpg`}
                  alt={s.name}
                  fill
                  priority
                  quality={95}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                {/* Subtle bottom dark gradient scrim */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/85 via-[#0B0F19]/25 to-transparent pointer-events-none"
                  aria-hidden="true"
                />
                {/* Clean glassmorphic overlay bar at the bottom */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex flex-col gap-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-theme-accent animate-pulse" />
                    <span className="font-mono text-xs uppercase tracking-widest text-white/90 font-bold drop-shadow-sm">
                      {s.kicker}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    {s.stack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs px-3 py-1 rounded-full font-mono font-medium shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Deliver — Hub & Spoke Diagram */}
      <section className="py-12 lg:py-16 px-6 bg-theme-surface/30 theme-transition border-b border-theme-border overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-center max-w-3xl mx-auto reveal">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-theme-accent mb-3 block">
              SCOPE & DELIVERABLES
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-theme-text theme-transition mb-4">
              What we build for {s.name}.
            </h2>
            <p className="text-base sm:text-lg text-theme-muted leading-relaxed">
              Every deliverable is engineered for production reliability, full test coverage, and long-term maintainability.
            </p>
          </div>

          <DeliverablesHub serviceName={s.name} features={s.features} stack={s.stack} />
        </div>
      </section>

      {/* Technology Stack — Pure CSS Dual-Row Infinite Marquee */}
      <section className="py-12 lg:py-16 bg-theme-bg theme-transition border-b border-theme-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-8 lg:mb-10 reveal">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-theme-accent mb-4 block">
            STACK & TOOLING
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-theme-text theme-transition mb-4">
            Modern, battle-tested technologies.
          </h2>
          <p className="text-base sm:text-lg text-theme-muted max-w-2xl leading-relaxed">
            We choose tools that maximize developer velocity without sacrificing runtime performance or security.
          </p>
        </div>

        {/* Dual Marquee Wrapper with soft edge fade masks */}
        <div className="relative w-full overflow-hidden flex flex-col gap-4 py-2 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          {/* Row 1: Scrolling Right-to-Left */}
          <div className="flex w-max items-center gap-4 pr-4 animate-marquee-left hover:[animation-play-state:paused]">
            {row1Stack.map((tech, i) => {
              const Icon = TECH_ICONS[i % TECH_ICONS.length];
              return (
                <div
                  key={`r1-${tech}-${i}`}
                  className="group flex items-center gap-3.5 px-6 py-3.5 rounded-2xl bg-theme-surface border border-theme-border shadow-sm hover:bg-[#C84B15] hover:border-[#C84B15] hover:text-white hover:shadow-xl hover:shadow-orange-500/20 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer shrink-0"
                >
                  <div className="w-10 h-10 rounded-xl bg-theme-bg border border-theme-border text-theme-accent group-hover:bg-white group-hover:text-[#C84B15] group-hover:border-white flex items-center justify-center transition-colors duration-300 shrink-0">
                    <Icon size={20} weight="bold" />
                  </div>
                  <span className="font-mono text-sm lg:text-base font-bold text-theme-text group-hover:text-white whitespace-nowrap">
                    {tech}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500/80 group-hover:bg-white ml-1 shrink-0" />
                </div>
              );
            })}
          </div>

          {/* Row 2: Scrolling Left-to-Right */}
          <div className="flex w-max items-center gap-4 pr-4 animate-marquee-right hover:[animation-play-state:paused]">
            {row2Stack.map((tech, i) => {
              const Icon = TECH_ICONS[(i + 3) % TECH_ICONS.length];
              return (
                <div
                  key={`r2-${tech}-${i}`}
                  className="group flex items-center gap-3.5 px-6 py-3.5 rounded-2xl bg-theme-surface border border-theme-border shadow-sm hover:bg-[#C84B15] hover:border-[#C84B15] hover:text-white hover:shadow-xl hover:shadow-orange-500/20 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer shrink-0"
                >
                  <div className="w-10 h-10 rounded-xl bg-theme-bg border border-theme-border text-theme-accent group-hover:bg-white group-hover:text-[#C84B15] group-hover:border-white flex items-center justify-center transition-colors duration-300 shrink-0">
                    <Icon size={20} weight="bold" />
                  </div>
                  <span className="font-mono text-sm lg:text-base font-bold text-theme-text group-hover:text-white whitespace-nowrap">
                    {tech}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500/80 group-hover:bg-white ml-1 shrink-0" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Delivery Methodology */}
      <DeliveryMethodology />

    </>
  );
}
