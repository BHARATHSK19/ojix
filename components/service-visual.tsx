import type { ReactElement } from "react";
// Theme-aware hero illustration for each service sub page.
// Uses the site's CSS variables so it works in light and dark mode.

type Props = { slug: string; label: string };

const stroke = "var(--border-color)";
const accent = "var(--accent-color)";
const surface = "var(--surface-color)";
const text = "var(--text-primary)";
const muted = "var(--text-secondary)";

function Engineering() {
  return (
    <>
      <rect x="40" y="60" width="300" height="200" rx="14" fill={surface} stroke={stroke} strokeWidth="2" />
      <rect x="40" y="60" width="300" height="30" rx="14" fill={text} opacity=".92" />
      <circle cx="60" cy="75" r="4" fill={accent} /><circle cx="76" cy="75" r="4" fill={muted} /><circle cx="92" cy="75" r="4" fill={muted} />
      <rect x="58" y="108" width="90" height="10" rx="5" fill={accent} />
      <rect x="58" y="128" width="200" height="8" rx="4" fill={muted} opacity=".4" />
      <rect x="58" y="144" width="160" height="8" rx="4" fill={muted} opacity=".4" />
      <rect x="58" y="172" width="86" height="64" rx="8" fill={accent} opacity=".15" stroke={accent} />
      <rect x="156" y="172" width="86" height="64" rx="8" fill="none" stroke={stroke} strokeWidth="2" />
      <rect x="254" y="172" width="70" height="64" rx="8" fill="none" stroke={stroke} strokeWidth="2" />
      <rect x="290" y="130" width="120" height="210" rx="22" fill={surface} stroke={text} strokeWidth="3" />
      <rect x="338" y="140" width="24" height="6" rx="3" fill={text} />
      <rect x="304" y="162" width="92" height="40" rx="8" fill={accent} opacity=".9" />
      <rect x="304" y="212" width="92" height="8" rx="4" fill={muted} opacity=".4" />
      <rect x="304" y="228" width="64" height="8" rx="4" fill={muted} opacity=".4" />
      <rect x="304" y="256" width="92" height="56" rx="8" fill="none" stroke={stroke} strokeWidth="2" />
    </>
  );
}

function AI() {
  const nodes: [number, number][] = [[70, 90], [70, 180], [70, 270], [190, 60], [190, 150], [190, 240], [190, 320], [310, 120], [310, 220]];
  const links: [number, number][] = [[0,3],[0,4],[1,4],[1,5],[2,5],[2,6],[3,7],[4,7],[4,8],[5,8],[6,8]];
  return (
    <>
      {links.map(([a, b], i) => (
        <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke={stroke} strokeWidth="2" />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="16" fill={surface} stroke={i > 6 ? accent : text} strokeWidth="3" />
      ))}
      <rect x="352" y="130" width="64" height="80" rx="12" fill={accent} />
      <path d="M368 156h32M368 172h32M368 188h20" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
      <path d="M326 120l26 20M326 220l26-40" stroke={accent} strokeWidth="3" strokeDasharray="5 5" />
    </>
  );
}

function Cloud() {
  return (
    <>
      <path d="M110 170a50 50 0 0 1 96-18 42 42 0 0 1 84 14 36 36 0 0 1-6 72H128a40 40 0 0 1-18-68z" fill={surface} stroke={text} strokeWidth="3" />
      {[70, 170, 270].map((x, i) => (
        <g key={i}>
          <rect x={x} y="290" width="80" height="50" rx="8" fill={surface} stroke={i === 1 ? accent : stroke} strokeWidth="2.5" />
          <circle cx={x + 16} cy="315" r="4" fill={i === 1 ? accent : muted} />
          <rect x={x + 30} y="311" width="36" height="8" rx="4" fill={muted} opacity=".4" />
          <path d={`M${x + 40} 290V250`} stroke={stroke} strokeWidth="2" strokeDasharray="4 4" />
        </g>
      ))}
      <path d="M110 250h260" stroke={stroke} strokeWidth="2" strokeDasharray="4 4" />
      <path d="M240 250v-28" stroke={accent} strokeWidth="3" />
      <path d="M232 230l8-10 8 10" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" />
    </>
  );
}

function Integrations() {
  const pts: [number, number][] = [[80, 90], [360, 90], [80, 290], [360, 290]];
  return (
    <>
      {pts.map(([x, y], i) => (
        <g key={i}>
          <path d={`M${x} ${y}L220 190`} stroke={accent} strokeWidth="3" strokeDasharray="6 6" />
          <rect x={x - 34} y={y - 28} width="68" height="56" rx="12" fill={surface} stroke={text} strokeWidth="3" />
          <rect x={x - 18} y={y - 8} width="36" height="8" rx="4" fill={muted} opacity=".5" />
          <rect x={x - 18} y={y + 8} width="22" height="8" rx="4" fill={muted} opacity=".3" />
        </g>
      ))}
      <circle cx="220" cy="190" r="48" fill={accent} />
      <path d="M200 190h40M228 176l14 14-14 14" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
}

function Analytics() {
  const bars = [60, 110, 85, 150, 125, 190];
  return (
    <>
      <rect x="40" y="50" width="360" height="270" rx="16" fill={surface} stroke={stroke} strokeWidth="2" />
      <rect x="64" y="76" width="70" height="10" rx="5" fill={accent} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={64 + i * 112} y="100" width="96" height="46" rx="8" fill="none" stroke={stroke} strokeWidth="2" />
          <rect x={74 + i * 112} y="114" width="44" height="8" rx="4" fill={muted} opacity=".4" />
          <rect x={74 + i * 112} y="128" width="28" height="8" rx="4" fill={i === 0 ? accent : text} opacity=".8" />
        </g>
      ))}
      {bars.map((h, i) => (
        <rect key={i} x={70 + i * 52} y={300 - h * 0.8} width="30" height={h * 0.8} rx="5" fill={i === 5 ? accent : text} opacity={i === 5 ? 1 : 0.85 - i * 0.07} />
      ))}
      <path d="M85 235L137 205 189 220 241 175 293 190 345 150" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
}

function Advisory() {
  return (
    <>
      <rect x="60" y="60" width="200" height="260" rx="14" fill={surface} stroke={text} strokeWidth="3" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="84" y={96 + i * 54} width="22" height="22" rx="5" fill={i < 3 ? accent : "none"} stroke={accent} strokeWidth="2.5" />
          {i < 3 && <path d={`M89 ${107 + i * 54}l5 5 8-10`} fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />}
          <rect x="120" y={100 + i * 54} width={110 - i * 14} height="8" rx="4" fill={muted} opacity=".45" />
          <rect x="120" y={114 + i * 54} width="70" height="6" rx="3" fill={muted} opacity=".25" />
        </g>
      ))}
      <circle cx="320" cy="170" r="52" fill="none" stroke={accent} strokeWidth="10" />
      <path d="M358 208l44 50" stroke={accent} strokeWidth="14" strokeLinecap="round" />
      <path d="M298 170l16 16 30-34" fill="none" stroke={text} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
}

const visuals: Record<string, () => ReactElement> = {
  engineering: Engineering,
  "ai-automation": AI,
  "cloud-devops": Cloud,
  integrations: Integrations,
  analytics: Analytics,
  advisory: Advisory,
};

export default function ServiceVisual({ slug, label }: Props) {
  const Visual = visuals[slug] ?? Engineering;
  return (
    <div className="relative w-full max-w-md mx-auto lg:mx-0">
      <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-orange-500/10 via-transparent to-transparent blur-2xl -z-10" />
      <div className="rounded-3xl border border-theme-border bg-theme-surface/60 p-4 shadow-soft theme-transition">
        <svg viewBox="0 0 440 380" role="img" aria-label={`${label} illustration`} className="w-full h-auto">
          <Visual />
        </svg>
      </div>
    </div>
  );
}
