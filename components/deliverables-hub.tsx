"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Compass,
  Browsers,
  DeviceMobile,
  ShieldCheck,
  Gauge,
  GitBranch
} from "@phosphor-icons/react";

interface DeliverablesHubProps {
  serviceName: string;
  features: string[];
  stack?: string[];
}

const ICONS = [Compass, Browsers, DeviceMobile, ShieldCheck, Gauge, GitBranch];

export function DeliverablesHub({
  serviceName,
  features,
  stack = []
}: DeliverablesHubProps) {
  // Default to active index 0 so deliverable 01 is highlighted immediately
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);

  // SVG connector coordinates
  const [connectors, setConnectors] = useState<string[]>([]);

  // Auto-cycling circuit every 3500ms when not paused
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused, features.length]);

  const updateGeometry = useCallback(() => {
    if (!containerRef.current || !centerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    if (containerRect.width === 0) return;

    const centerRect = centerRef.current.getBoundingClientRect();
    const centerX = centerRect.left + centerRect.width / 2 - containerRect.left;
    const centerY = centerRect.top + centerRect.height / 2 - containerRect.top;
    
    // Outer orbital ring spacing: -inset-4 (16px) or -inset-5 (20px on xl)
    const orbitOffset = centerRect.width >= 360 ? 20 : 16;
    const orbitRadius = centerRect.width / 2 + orbitOffset;

    const newConnectors: string[] = [];

    // Calculate orthogonal L-shaped and horizontal dashed paths for the 6 badges
    badgeRefs.current.forEach((el, i) => {
      if (!el) {
        newConnectors.push("");
        return;
      }
      const bRect = el.getBoundingClientRect();
      const bX = bRect.left + bRect.width / 2 - containerRect.left;
      const bY = bRect.top + bRect.height / 2 - containerRect.top;
      const bRadius = bRect.width / 2;

      const elbowOffset = 60;
      const xOffset = Math.sqrt(Math.max(0, orbitRadius * orbitRadius - elbowOffset * elbowOffset));

      if (i === 0) {
        // Top-Left: vertical drop from badge bottom, then horizontal right to center orbit
        const targetY = centerY - elbowOffset;
        const targetX = centerX - xOffset;
        newConnectors.push(`M ${bX} ${bY + bRadius} V ${targetY} H ${targetX}`);
      } else if (i === 1) {
        // Middle-Left: straight horizontal line right into center orbit
        const targetX = centerX - orbitRadius;
        newConnectors.push(`M ${bX + bRadius} ${centerY} H ${targetX}`);
      } else if (i === 2) {
        // Bottom-Left: vertical rise from badge top, then horizontal right to center orbit
        const targetY = centerY + elbowOffset;
        const targetX = centerX - xOffset;
        newConnectors.push(`M ${bX} ${bY - bRadius} V ${targetY} H ${targetX}`);
      } else if (i === 3) {
        // Top-Right: vertical drop from badge bottom, then horizontal left to center orbit
        const targetY = centerY - elbowOffset;
        const targetX = centerX + xOffset;
        newConnectors.push(`M ${bX} ${bY + bRadius} V ${targetY} H ${targetX}`);
      } else if (i === 4) {
        // Middle-Right: straight horizontal line left into center orbit
        const targetX = centerX + orbitRadius;
        newConnectors.push(`M ${bX - bRadius} ${centerY} H ${targetX}`);
      } else if (i === 5) {
        // Bottom-Right: vertical rise from badge top, then horizontal left to center orbit
        const targetY = centerY + elbowOffset;
        const targetX = centerX + xOffset;
        newConnectors.push(`M ${bX} ${bY - bRadius} V ${targetY} H ${targetX}`);
      }
    });

    setConnectors(newConnectors);
  }, []);

  useEffect(() => {
    updateGeometry();
    const ro = new ResizeObserver(() => updateGeometry());
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", updateGeometry);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateGeometry);
    };
  }, [updateGeometry]);

  const leftFeatures = features.slice(0, 3);
  const rightFeatures = features.slice(3, 6);
  const ActiveIcon = ICONS[activeIndex] || Compass;
  const activeTech = stack.length > 0 ? stack[activeIndex % stack.length] : null;

  return (
    <div className="w-full">
      <style>{`
        @keyframes activeConnectorFlow {
          from { stroke-dashoffset: 24; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>

      {/* Desktop Radial Hub & Spoke Layout (lg: screens and above) */}
      <div
        ref={containerRef}
        className="hidden lg:block relative max-w-6xl mx-auto py-8 lg:py-12 select-none"
      >
        {/* SVG Dashed Orthogonal Connectors Canvas */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0">
          {connectors.map((path, idx) => {
            const isActive = activeIndex === idx;
            return (
              <path
                key={`conn-${idx}`}
                d={path}
                stroke={isActive ? "#C84B15" : "currentColor"}
                strokeWidth={isActive ? 2.5 : 1.75}
                strokeDasharray={isActive ? "6 6" : "5 5"}
                fill="none"
                className={`transition-all duration-300 ${
                  isActive
                    ? "opacity-100"
                    : "text-slate-300 dark:text-slate-700 opacity-80"
                }`}
                style={
                  isActive
                    ? {
                        filter: "drop-shadow(0 0 6px rgba(200, 75, 21, 0.45))",
                        animation: "activeConnectorFlow 1.5s linear infinite"
                      }
                    : undefined
                }
              />
            );
          })}

          {/* Animated pulse dot streaming along the active connector */}
          {connectors[activeIndex] && (
            <circle r="4" fill="#C84B15" filter="drop-shadow(0 0 4px #C84B15)">
              <animateMotion
                path={connectors[activeIndex]}
                dur="1.6s"
                repeatCount="indefinite"
              />
            </circle>
          )}
        </svg>

        {/* 3-Column Layout: Left 3 Capsules | Center Circle | Right 3 Capsules */}
        <div className="grid grid-cols-12 items-center gap-4 xl:gap-8 relative z-10">
          {/* Left 3 Capsules Column */}
          <div className="col-span-4 flex flex-col justify-between gap-7 xl:gap-8">
            {leftFeatures.map((feat, idx) => {
              const Icon = ICONS[idx];
              const isActive = activeIndex === idx;
              // Indent Top-Left (idx 0) and Bottom-Left (idx 2) inward toward the center circle
              const indentClass =
                idx === 0 || idx === 2 ? "lg:translate-x-6" : "translate-x-0";

              return (
                <div
                  key={feat}
                  onMouseEnter={() => {
                    setIsPaused(true);
                    setActiveIndex(idx);
                  }}
                  onMouseLeave={() => {
                    setIsPaused(false);
                  }}
                  onClick={() => setActiveIndex(idx)}
                  className={`rounded-full flex items-center justify-between p-1.5 transition-all duration-300 cursor-pointer ${indentClass} ${
                    isActive
                      ? "bg-[#C84B15] dark:bg-theme-accent text-white border border-[#C84B15] shadow-xl shadow-orange-600/25 -translate-y-1 scale-[1.02]"
                      : "bg-theme-surface text-theme-text border border-theme-border shadow-md hover:border-theme-border/80 hover:shadow-lg"
                  }`}
                >
                  {/* Feature Heading on the Left */}
                  <span className="pl-6 pr-3 py-3 text-xs xl:text-sm font-bold leading-snug text-left select-none flex-1">
                    {feat}
                  </span>

                  {/* Circular Icon Badge Flush on the Right (Inner Edge) */}
                  <div
                    ref={(el) => {
                      badgeRefs.current[idx] = el;
                    }}
                    className={`w-14 h-14 xl:w-16 xl:h-16 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isActive
                        ? "bg-white text-[#C84B15] scale-105 shadow-md"
                        : "bg-theme-bg text-theme-accent border border-theme-border"
                    }`}
                  >
                    <Icon size={26} weight={isActive ? "bold" : "regular"} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Center Interactive Hub Circle (Enlarged to 350px - 370px) */}
          <div className="col-span-4 flex items-center justify-center relative">
            <div
              ref={centerRef}
              className="w-72 h-72 lg:w-[350px] lg:h-[350px] xl:w-[370px] xl:h-[370px] rounded-full bg-theme-surface text-theme-text border-2 border-theme-accent/40 shadow-2xl flex flex-col items-center justify-center text-center px-7 py-6 relative z-10 transition-all duration-300"
            >
              {/* Outer Dashed Orbital Ring (Enhanced with border-2 and -inset-4 xl:-inset-5) */}
              <div className="absolute -inset-4 xl:-inset-5 border-2 border-dashed border-theme-accent/40 rounded-full transition-colors duration-300 pointer-events-none shadow-orange-500/10" />

              {/* Informative Active Deliverable Content */}
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-theme-accent mb-1">
                DELIVERABLE 0{activeIndex + 1} / 06
              </span>

              {/* Center Active Icon inside enlarged glowing badge */}
              <div className="w-14 h-14 rounded-full bg-theme-accent/10 text-theme-accent flex items-center justify-center my-1.5 shrink-0 transition-transform duration-300 scale-105 shadow-inner">
                <ActiveIcon size={28} weight="bold" />
              </div>

              {/* Center Deliverable Heading */}
              <h3 className="text-lg xl:text-[21px] font-extrabold tracking-tight text-theme-text leading-snug max-w-[240px] xl:max-w-[260px] my-1 line-clamp-2">
                {features[activeIndex]}
              </h3>

              {/* Bottom Tech Proof Pill */}
              {activeTech ? (
                <span className="mt-2 inline-flex items-center justify-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 max-w-[230px] xl:max-w-[250px] text-center leading-tight shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
                  <span className="truncate">Powered by {activeTech}</span>
                </span>
              ) : (
                <span className="mt-2 inline-flex items-center justify-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-theme-accent/10 text-theme-accent border border-theme-accent/20 max-w-[230px] xl:max-w-[250px] text-center leading-tight">
                  ● 100% PRODUCTION-GRADE
                </span>
              )}
            </div>
          </div>

          {/* Right 3 Capsules Column */}
          <div className="col-span-4 flex flex-col justify-between gap-7 xl:gap-8">
            {rightFeatures.map((feat, relIdx) => {
              const globalIdx = relIdx + 3;
              const Icon = ICONS[globalIdx];
              const isActive = activeIndex === globalIdx;
              // Indent Top-Right (relIdx 0) and Bottom-Right (relIdx 2) inward toward the center circle
              const indentClass =
                relIdx === 0 || relIdx === 2
                  ? "lg:-translate-x-6"
                  : "translate-x-0";

              return (
                <div
                  key={feat}
                  onMouseEnter={() => {
                    setIsPaused(true);
                    setActiveIndex(globalIdx);
                  }}
                  onMouseLeave={() => {
                    setIsPaused(false);
                  }}
                  onClick={() => setActiveIndex(globalIdx)}
                  className={`rounded-full flex items-center justify-between p-1.5 transition-all duration-300 cursor-pointer ${indentClass} ${
                    isActive
                      ? "bg-[#C84B15] dark:bg-theme-accent text-white border border-[#C84B15] shadow-xl shadow-orange-600/25 -translate-y-1 scale-[1.02]"
                      : "bg-theme-surface text-theme-text border border-theme-border shadow-md hover:border-theme-border/80 hover:shadow-lg"
                  }`}
                >
                  {/* Circular Icon Badge Flush on the Left (Inner Edge) */}
                  <div
                    ref={(el) => {
                      badgeRefs.current[globalIdx] = el;
                    }}
                    className={`w-14 h-14 xl:w-16 xl:h-16 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isActive
                        ? "bg-white text-[#C84B15] scale-105 shadow-md"
                        : "bg-theme-bg text-theme-accent border border-theme-border"
                    }`}
                  >
                    <Icon size={26} weight={isActive ? "bold" : "regular"} />
                  </div>

                  {/* Feature Heading on the Right */}
                  <span className="pr-6 pl-3 py-3 text-xs xl:text-sm font-bold leading-snug text-left select-none flex-1">
                    {feat}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Vertical Layout (< lg screens) */}
      <div className="lg:hidden flex flex-col items-center max-w-md mx-auto">
        {/* Center Hub Circle at Top (Enlarged to 288px) */}
        <div className="w-72 h-72 rounded-full bg-theme-surface text-theme-text border-2 border-theme-accent/40 shadow-xl flex flex-col items-center justify-center text-center px-6 py-5 relative mb-8 transition-all duration-300">
          <div className="absolute -inset-3.5 border-2 border-dashed border-theme-accent/40 rounded-full pointer-events-none" />

          <span className="font-mono text-xs font-bold uppercase tracking-wider text-theme-accent mb-1">
            DELIVERABLE 0{activeIndex + 1} / 06
          </span>

          <div className="w-12 h-12 rounded-full bg-theme-accent/10 text-theme-accent flex items-center justify-center my-1.5 shrink-0 shadow-inner">
            <ActiveIcon size={24} weight="bold" />
          </div>

          <h3 className="text-base font-extrabold text-theme-text leading-snug px-3 max-w-[220px] line-clamp-2 my-1">
            {features[activeIndex]}
          </h3>

          {activeTech ? (
            <span className="mt-2 inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full text-[10.5px] font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 max-w-[220px] text-center leading-tight shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
              <span className="truncate">Powered by {activeTech}</span>
            </span>
          ) : (
            <span className="mt-2 inline-flex items-center justify-center px-3 py-1 rounded-full text-[10px] font-mono font-semibold text-emerald-500 bg-emerald-500/10 max-w-[220px]">
              ● VERIFIED
            </span>
          )}
        </div>

        {/* Vertical Dashed Line Divider */}
        <div className="w-0.5 h-6 border-l-2 border-dashed border-theme-border mb-4" />

        {/* Vertical Stack of the 6 Capsules */}
        <div className="w-full flex flex-col gap-3.5">
          {features.map((feat, idx) => {
            const Icon = ICONS[idx];
            const isActive = activeIndex === idx;

            return (
              <div
                key={feat}
                onClick={() => setActiveIndex(idx)}
                className={`rounded-full flex items-center justify-between p-1.5 transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#C84B15] dark:bg-theme-accent text-white border border-[#C84B15] shadow-lg shadow-orange-600/20 scale-[1.01]"
                    : "bg-theme-surface text-theme-text border border-theme-border shadow-sm hover:border-theme-border/80"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                    isActive
                      ? "bg-white text-[#C84B15] shadow-sm"
                      : "bg-theme-bg text-theme-accent border border-theme-border"
                  }`}
                >
                  <Icon size={22} weight={isActive ? "bold" : "regular"} />
                </div>
                <span className="px-3.5 py-2 text-xs font-bold leading-snug text-left select-none flex-1">
                  {feat}
                </span>
                <span
                  className={`font-mono text-[9px] font-bold pr-3 ${
                    isActive ? "text-white/80" : "text-theme-muted opacity-60"
                  }`}
                >
                  0{idx + 1}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
