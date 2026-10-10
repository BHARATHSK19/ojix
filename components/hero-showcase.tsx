import { ChartLineUp, Database, GearSix, House, ShieldCheck, Users } from "@phosphor-icons/react/dist/ssr";

/* Hero showcase — replaces the orbit graphic.
   A layered "product in motion" composition: live ops dashboard window,
   status pill. Pure SVG + CSS animation, server-rendered. */

const kpis = [
  { label: "Requests / day", value: "2.4M", delta: "+18%" },
  { label: "p95 latency", value: "182ms", delta: "-24%" },
  { label: "Uptime", value: "99.98%", delta: "30d" },
];
const services = [
  { name: "API Gateway", w: 86 },
  { name: "AI Workers", w: 64 },
  { name: "Postgres", w: 48 },
];
const side = [House, ChartLineUp, Users, Database, GearSix];

export function HeroShowcase() {
  return (
    <div className="hx-stage" aria-hidden="true">
      <div className="hx-glow" />

      {/* main dashboard window */}
      <div className="hx-win">
        <div className="hx-win-bar">
          <span className="hx-dots"><i /><i /><i /></span>
          <span className="hx-url"><ShieldCheck size={10} weight="fill" /> app.client.com/ops</span>
          <span className="hx-live"><b />Live</span>
        </div>
        <div className="hx-win-body">
          <aside className="hx-side">
            {side.map((Icon, i) => <span key={i} className={i === 1 ? "on" : ""}><Icon size={13} weight={i === 1 ? "fill" : "regular"} /></span>)}
          </aside>
          <div className="hx-main">
            <div className="hx-kpis">
              {kpis.map((k, i) => (
                <div key={k.label} className="hx-kpi" style={{ animationDelay: `${i * 120}ms` }}>
                  <small>{k.label}</small>
                  <b>{k.value}</b>
                  <em>{k.delta}</em>
                </div>
              ))}
            </div>
            <div className="hx-chart">
              <div className="hx-chart-head"><span>Throughput</span><span className="hx-tabs"><i>24h</i><i className="on">7d</i><i>30d</i></span></div>
              <svg viewBox="0 0 300 96" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="hxFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" className="hx-stop-a" />
                    <stop offset="100%" className="hx-stop-b" />
                  </linearGradient>
                </defs>
                {[24, 48, 72].map(y => <line key={y} x1="0" x2="300" y1={y} y2={y} className="hx-grid" />)}
                <path className="hx-area" d="M0 78 C20 74 30 60 50 62 S80 70 100 52 S135 30 155 40 S190 58 210 34 S250 14 270 22 S290 12 300 8 V96 H0Z" fill="url(#hxFill)" />
                <path className="hx-line" pathLength="1" d="M0 78 C20 74 30 60 50 62 S80 70 100 52 S135 30 155 40 S190 58 210 34 S250 14 270 22 S290 12 300 8" />
                <path className="hx-line2" d="M0 86 C30 84 50 80 80 82 S130 74 160 76 S220 66 250 68 S285 60 300 58" />
                <circle className="hx-pt" cx="270" cy="22" r="3.5" />
              </svg>
            </div>
            <div className="hx-svc">
              {services.map((s, i) => (
                <div key={s.name} className="hx-svc-row">
                  <span>{s.name}</span>
                  <span className="hx-bar"><i style={{ width: `${s.w}%`, animationDelay: `${300 + i * 150}ms` }} /></span>
                  <b>{s.w}%</b>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* status pill */}
      <div className="hx-pill"><b />All systems operational</div>
    </div>
  );
}
