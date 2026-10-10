import Link from "next/link";
import { ArrowRight, Cube, Infinity as InfinityIcon, Target } from "@phosphor-icons/react/dist/ssr";

/* Editorial intro (BLUNT-style): bold statement + three principle columns with line icons. */
const principles = [
  { Icon: Cube, title: "Engineering Excellence", text: "The engineers who design your system write the code and run the servers. No hand-offs, no middlemen, no finger-pointing." },
  { Icon: Target, title: "Clarity by Design", text: "Every screen, permission and data flow is planned before code is written — so what ships is exactly what your team needs." },
  { Icon: InfinityIcon, title: "Built to Last", text: "Secure, observable and documented. You own 100% of the code, and the platform keeps scaling long after launch." },
];

export function StudioIntro() {
  return (
    <section className="ox-intro theme-transition">
      <div className="ox-intro-wrap">
        <div className="ox-intro-top reveal">
          <h2>OJIX is a production-first<br /><span>software product studio.</span></h2>
          <Link href="/about" className="ox-intro-btn">About Us <ArrowRight size={14} /></Link>
        </div>
        <div className="ox-intro-grid">
          {principles.map(({ Icon, title, text }, i) => (
            <div key={title} className={`ox-intro-col reveal delay-${(i + 1) * 100}`}>
              <span className="ox-intro-ic"><Icon size={40} weight="thin" /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
