"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowUpRight, Buildings, ChartLineUp, Cloud, GraduationCap, Package, Scales, ShieldCheck, ShoppingBag, Truck } from "@phosphor-icons/react";
import { industries } from "@/lib/content";

/* Sectors index — replaces the 8-card grid.
   Desktop: editorial numbered index on the left + a sticky live preview that
   crossfades as you hover (auto-cycles until the visitor interacts).
   Mobile: the same index becomes an accordion (first tap opens, second tap navigates). */

const icons = [Cloud, ChartLineUp, ShieldCheck, ShoppingBag, GraduationCap, Package, Truck, Scales];
const pills = [["Platforms", "Multi-Tenant", "Billing"], ["Payment Rails", "Security", "Compliance"], ["Workflows", "Health Data", "Privacy"], ["Commerce", "Automation", "Checkout"], ["Assessment", "Learning Portals", "Analytics"], ["Operations", "Automation", "Live Stock"], ["Fleet Tracking", "Supply Chain", "Routing"], ["Case Flow", "Legal Automation", "Client Portal"]];
const images = ["photo-1451187580459-43490279c0fa", "photo-1563013544-824ae1b704d3", "photo-1576091160399-112ba8d25d1d", "photo-1556742049-0cfed4f6a45d", "photo-1509062522246-3755977927d7", "photo-1586528116311-ad8dd3c8310d", "photo-1519003722824-194d4455a60c", "photo-1450101499163-c8848c66ca85"];
const CYCLE = 4200;

export function SectorsExplorer() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [touched, setTouched] = useState(false);
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (paused || touched || !inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setActive(a => (a + 1) % industries.length), CYCLE);
    return () => clearTimeout(t);
  }, [active, paused, touched, inView]);

  const select = (i: number) => { setTouched(true); setActive(i); };
  const total = String(industries.length).padStart(2, "0");
  const current = industries[active];
  const CurrentIcon = icons[active];

  return (
    <div ref={sectionRef} className={`ox-sectors${paused || touched ? " is-paused" : ""}`} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <ol className="ox-sec-list">
        {industries.map((s, i) => {
          const Icon = icons[i];
          const on = i === active;
          return (
            <li key={s.slug} className={`ox-sec-row${on ? " is-active" : ""}`}>
              <Link
                href={`/industries/${s.slug}`}
                className="ox-sec-link"
                onMouseEnter={() => select(i)}
                onFocus={() => select(i)}
                onClick={e => {
                  if (window.matchMedia("(max-width: 900px)").matches && !on) { e.preventDefault(); select(i); }
                }}
                aria-current={on ? "true" : undefined}
              >
                <span className="ox-sec-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="ox-sec-icon"><Icon size={18} /></span>
                <span className="ox-sec-name">{s.name}</span>
                <span className="ox-sec-tags">{pills[i].slice(0, 2).join(" · ")}</span>
                <span className="ox-sec-go"><ArrowUpRight size={16} /></span>
                {on && <span key={`p-${active}`} className="ox-sec-progress" style={{ animationDuration: `${CYCLE}ms` }} />}
              </Link>
              <div className="ox-sec-mobile" aria-hidden={!on}>
                <div className="ox-sec-mobile-inner">
                  <div className="ox-sec-mobile-media">
                    <Image src={`https://images.unsplash.com/${images[i]}?auto=format&fit=crop&w=800&q=70`} alt="" fill unoptimized sizes="90vw" className="object-cover" />
                  </div>
                  <p>{s.brief}</p>
                  <div className="ox-sec-pills">{pills[i].map(p => <span key={p}>{p}</span>)}</div>
                  <button type="button" className="ox-sec-cta" onClick={() => router.push(`/industries/${s.slug}`)}>Explore {s.name} <ArrowRight size={14} /></button>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <aside className="ox-sec-preview">
        <div className="ox-sec-media">
          {images.map((img, i) => (
            <Image key={img} src={`https://images.unsplash.com/${img}?auto=format&fit=crop&w=1100&q=75`} alt={i === active ? industries[i].name : ""} fill unoptimized sizes="(max-width: 1200px) 50vw, 600px" className={`ox-sec-img${i === active ? " is-on" : ""}`} />
          ))}
          <div className="ox-sec-scrim" />
          <div className="ox-sec-counter"><b>{String(active + 1).padStart(2, "0")}</b><span>/ {total}</span></div>
          <div className="ox-sec-badge"><Buildings size={13} weight="bold" /> Industry focus</div>
        </div>
        <div key={current.slug} className="ox-sec-body">
          <div className="ox-sec-head">
            <span className="ox-sec-head-icon"><CurrentIcon size={22} /></span>
            <h3>{current.name}</h3>
          </div>
          <p>{current.brief} Custom platforms, automation and secure systems engineered for how this sector actually operates.</p>
          <div className="ox-sec-pills">{pills[active].map(p => <span key={p}>{p}</span>)}</div>
          <Link href={`/industries/${current.slug}`} className="ox-sec-cta">Explore sector <ArrowRight size={14} /></Link>
        </div>
      </aside>
    </div>
  );
}
