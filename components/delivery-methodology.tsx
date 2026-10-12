"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  MagnifyingGlass,
  TreeStructure,
  MonitorPlay,
  RocketLaunch
} from "@phosphor-icons/react";

interface StepItem {
  title: string;
  description: string;
  icon: React.ElementType;
}

const STEPS: StepItem[] = [
  {
    title: "Workflow & Friction Audit",
    description:
      "We identify workflow bottlenecks, operational challenges, and business goals to establish a clear, practical software blueprint.",
    icon: MagnifyingGlass
  },
  {
    title: "System Design & Plan",
    description:
      "We define user experience, database architecture, and security permissions before development.",
    icon: TreeStructure
  },
  {
    title: "Bi-Weekly Staging Demos",
    description:
      "Review working software in a staging environment every two weeks, track progress, and provide feedback throughout development.",
    icon: MonitorPlay
  },
  {
    title: "Launch & 100% Handover",
    description:
      "We deploy your software, verify production readiness, and hand over the codebase, credentials, and essential project documentation.",
    icon: RocketLaunch
  }
];

interface NodePosition {
  cx: number;
  cy: number;
  r: number;
}

export function DeliveryMethodology() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const circleRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Default initial positions for SSR / initial mount
  const [positions, setPositions] = useState<NodePosition[]>([
    { cx: 125, cy: 155, r: 66 },
    { cx: 375, cy: 155, r: 66 },
    { cx: 625, cy: 155, r: 66 },
    { cx: 875, cy: 155, r: 66 }
  ]);

  // Auto-cycle through steps every 3500ms unless paused by hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % STEPS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isPaused]);

  // Synchronize dark/light mode for SVG stroke palette
  useEffect(() => {
    const checkTheme = () => {
      const htmlTheme = document.documentElement.dataset.theme;
      setIsDark(htmlTheme === "dark");
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"]
    });
    return () => observer.disconnect();
  }, []);

  // Measure dynamic coordinates of circle nodes
  const updateGeometry = useCallback(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    if (containerRect.width === 0) return;

    const newPositions: NodePosition[] = circleRefs.current.map((el, i) => {
      if (el) {
        const rect = el.getBoundingClientRect();
        return {
          cx: rect.left + rect.width / 2 - containerRect.left,
          cy: rect.top + rect.height / 2 - containerRect.top,
          r: rect.width / 2 + 10 // Arc wraps 10px outside the circle edge
        };
      }
      return {
        cx: containerRect.width * (0.125 + i * 0.25),
        cy: 155,
        r: 66
      };
    });

    setPositions(newPositions);
  }, []);

  useEffect(() => {
    updateGeometry();
    const resizeObserver = new ResizeObserver(() => {
      updateGeometry();
    });
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    window.addEventListener("resize", updateGeometry);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateGeometry);
    };
  }, [updateGeometry]);

  // Color tokens
  const defaultStroke = isDark ? "#334155" : "#0f1c2f";
  const activeStroke = isDark ? "#e07238" : "#C84B15";

  // Calculate arc and line geometries
  // Step 0 & 2: Bottom cradle arc (155° down through 90° to 25°)
  // Step 1 & 3: Top cap arc (205° up through 270° to 335°)
  const arcs = positions.map((pos, i) => {
    const isTop = i % 2 === 1;
    const rad = (deg: number) => (deg * Math.PI) / 180;

    if (!isTop) {
      // Bottom cradle arc (wrapping underneath the circle)
      const startX = pos.cx + pos.r * Math.cos(rad(155));
      const startY = pos.cy + pos.r * Math.sin(rad(155));
      const endX = pos.cx + pos.r * Math.cos(rad(25));
      const endY = pos.cy + pos.r * Math.sin(rad(25));
      return {
        path: `M ${startX} ${startY} A ${pos.r} ${pos.r} 0 0 0 ${endX} ${endY}`,
        startX,
        startY,
        endX,
        endY
      };
    } else {
      // Top cap arc (wrapping over the top of the circle)
      const startX = pos.cx + pos.r * Math.cos(rad(205));
      const startY = pos.cy + pos.r * Math.sin(rad(205));
      const endX = pos.cx + pos.r * Math.cos(rad(335));
      const endY = pos.cy + pos.r * Math.sin(rad(335));
      return {
        path: `M ${startX} ${startY} A ${pos.r} ${pos.r} 0 0 1 ${endX} ${endY}`,
        startX,
        startY,
        endX,
        endY
      };
    }
  });

  // Diagonal dashed connector lines:
  // 0 -> 1: Arc 0 (bottom end) to Arc 1 (top start)
  // 1 -> 2: Arc 1 (top end) to Arc 2 (bottom start)
  // 2 -> 3: Arc 2 (bottom end) to Arc 3 (top start)
  const connectors = [
    {
      from: 0,
      to: 1,
      path: `M ${arcs[0].endX} ${arcs[0].endY} L ${arcs[1].startX} ${arcs[1].startY}`
    },
    {
      from: 1,
      to: 2,
      path: `M ${arcs[1].endX} ${arcs[1].endY} L ${arcs[2].startX} ${arcs[2].startY}`
    },
    {
      from: 2,
      to: 3,
      path: `M ${arcs[2].endX} ${arcs[2].endY} L ${arcs[3].startX} ${arcs[3].startY}`
    }
  ];

  // Active connector: 0 -> line 0 (Step 0 to 1), 1 -> line 1 (Step 1 to 2), 2 or 3 -> line 2 (Step 2 to 3)
  const activeConnIdx = activeIndex === 0 ? 0 : activeIndex === 1 ? 1 : 2;

  return (
    <section
      id="process"
      className="py-10 lg:py-14 px-6 bg-theme-bg theme-transition border-b border-theme-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header with tightened bottom margin */}
        <div className="mb-4 lg:mb-6 reveal">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-theme-accent mb-2.5 block">
            DELIVERY METHODOLOGY
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-theme-text theme-transition mb-2.5">
            Transparent, milestone-based execution.
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-theme-muted max-w-2xl leading-relaxed">
            We operate with full technical transparency — delivering working code to live staging environments at every sprint checkpoint.
          </p>
        </div>

        {/* Desktop S-Wave Infographic Layout (Visible on lg: screens) */}
        <div ref={containerRef} className="hidden lg:block relative w-full select-none">
          {/* SVG Overlay: Thick Arcs & Diagonal Dashed Connecting Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0">
            <defs>
              <filter id="wave-orange-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#C84B15" floodOpacity="0.55" />
              </filter>
            </defs>

            {/* 3 Diagonal Dashed Connector Lines */}
            {connectors.map((conn, idx) => {
              const isConnActive = activeConnIdx === idx;
              return (
                <path
                  key={`conn-${idx}`}
                  d={conn.path}
                  stroke={isConnActive ? activeStroke : defaultStroke}
                  strokeWidth="3"
                  strokeDasharray="6 6"
                  strokeLinecap="round"
                  fill="none"
                  className="transition-colors duration-300"
                  filter={isConnActive ? "url(#wave-orange-glow)" : undefined}
                />
              );
            })}

            {/* Traveling Pulse Dot along Active Connector */}
            {connectors[activeConnIdx] && (
              <circle r="4" fill="#C84B15" filter="drop-shadow(0 0 5px #C84B15)">
                <animateMotion
                  path={connectors[activeConnIdx].path}
                  dur="1.6s"
                  repeatCount="indefinite"
                />
              </circle>
            )}

            {/* 4 Thick Semi-Circular Arcs */}
            {arcs.map((arc, idx) => {
              const isArcActive = activeIndex === idx;
              return (
                <path
                  key={`arc-${idx}`}
                  d={arc.path}
                  stroke={isArcActive ? activeStroke : defaultStroke}
                  strokeWidth="11"
                  strokeLinecap="round"
                  fill="none"
                  className="transition-colors duration-300"
                  filter={isArcActive ? "url(#wave-orange-glow)" : undefined}
                />
              );
            })}
          </svg>

          {/* 4-Column Content Grid */}
          <div className="grid grid-cols-4 gap-4 lg:gap-8 relative z-10">
            {STEPS.map((step, idx) => {
              const isTopArc = idx % 2 === 1;
              const Icon = step.icon;
              const isActive = activeIndex === idx;

              return (
                <div
                  key={step.title}
                  className="flex flex-col items-center cursor-pointer group"
                  onMouseEnter={() => {
                    setIsPaused(true);
                    setActiveIndex(idx);
                  }}
                  onMouseLeave={() => {
                    setIsPaused(false);
                  }}
                  onClick={() => setActiveIndex(idx)}
                >
                  {/* Top Text Slot (Step 2 and Step 4) */}
                  <div className="h-[92px] flex flex-col justify-end items-center text-center px-2 pb-2">
                    {isTopArc ? (
                      <div className="max-w-[240px]">
                        <h3
                          className={`font-bold text-base lg:text-lg mb-1 transition-colors duration-200 ${
                            isActive ? "text-theme-accent" : "text-theme-text"
                          }`}
                        >
                          {step.title}
                        </h3>
                        <p className="text-xs text-theme-muted leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    ) : (
                      <div className="h-full" aria-hidden="true" />
                    )}
                  </div>

                  {/* Center Node Slot: Large White Circle with Icon */}
                  <div className="h-[130px] flex items-center justify-center relative my-1">
                    <div
                      ref={(el) => {
                        circleRefs.current[idx] = el;
                      }}
                      className={`w-24 h-24 lg:w-28 lg:h-28 rounded-full bg-theme-surface border shadow-lg flex items-center justify-center transition-all duration-300 relative z-10 ${
                        isActive
                          ? "scale-105 shadow-xl shadow-orange-500/15 border-[#C84B15] ring-2 ring-[#C84B15]/25"
                          : "border-theme-border/80 hover:border-theme-border"
                      }`}
                    >
                      <Icon
                        size={36}
                        weight={isActive ? "bold" : "regular"}
                        className={`transition-all duration-300 ${
                          isActive ? "text-theme-accent scale-110" : "text-theme-text"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Bottom Text Slot (Step 1 and Step 3) */}
                  <div className="h-[92px] flex flex-col justify-start items-center text-center px-2 pt-2">
                    {!isTopArc ? (
                      <div className="max-w-[240px]">
                        <h3
                          className={`font-bold text-base lg:text-lg mb-1 transition-colors duration-200 ${
                            isActive ? "text-theme-accent" : "text-theme-text"
                          }`}
                        >
                          {step.title}
                        </h3>
                        <p className="text-xs text-theme-muted leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    ) : (
                      <div className="h-full" aria-hidden="true" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile & Tablet Layout (Visible on < lg: screens) */}
        <div className="lg:hidden flex flex-col gap-5 max-w-lg mx-auto">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeIndex === idx;
            const isLast = idx === STEPS.length - 1;

            return (
              <div key={step.title} className="flex flex-col items-center">
                <div
                  className={`flex items-center gap-4 w-full p-4 rounded-2xl bg-theme-surface border transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "border-[#C84B15] shadow-md shadow-orange-500/10 ring-1 ring-[#C84B15]/30"
                      : "border-theme-border/70"
                  }`}
                  onMouseEnter={() => {
                    setIsPaused(true);
                    setActiveIndex(idx);
                  }}
                  onMouseLeave={() => {
                    setIsPaused(false);
                  }}
                  onClick={() => setActiveIndex(idx)}
                >
                  {/* Circle Icon */}
                  <div
                    className={`w-16 h-16 rounded-full bg-theme-bg border shadow-sm flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? "border-[#C84B15] ring-2 ring-[#C84B15]/20"
                        : "border-theme-border/80"
                    }`}
                  >
                    <Icon
                      size={30}
                      weight={isActive ? "bold" : "regular"}
                      className={`transition-colors duration-200 ${
                        isActive ? "text-theme-accent scale-105" : "text-theme-text"
                      }`}
                    />
                  </div>

                  {/* Text Details */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`font-bold text-base mb-1 transition-colors duration-200 ${
                        isActive ? "text-theme-accent" : "text-theme-text"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="text-xs text-theme-muted leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connector Line between Steps on Mobile */}
                {!isLast && (
                  <div className="w-0.5 h-6 border-l-2 border-dashed border-theme-border my-1" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
