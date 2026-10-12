"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  CheckCircle,
  ShieldCheck,
  Cpu,
  FileText,
  ChartLineUp,
  ArrowRight,
  Lightning,
  Sparkle,
  RocketLaunch
} from "@phosphor-icons/react";

const TABS = [
  { id: 0, label: "01 · Ships", subtitle: "Software that ships.", icon: RocketLaunch },
  { id: 1, label: "02 · Scales", subtitle: "Code that scales.", icon: ChartLineUp },
  { id: 2, label: "03 · AI Works", subtitle: "AI that works.", icon: Sparkle }
];

export function HeroShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-cycle through the 3 tabs every 4.5 seconds, paused on hover
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % TABS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, activeTab]);

  return (
    <div
      className="w-full max-w-[560px] mx-auto select-none flex flex-col"
      aria-label="Interactive Hero Capabilities Showcase"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <style>{`
        @keyframes heroTabProg {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>

      {/* 1. Standalone Prominent Interactive Tab Switcher Bar ABOVE the browser card */}
      <div className="w-full mb-3.5 z-20">
        <div
          className="bg-theme-surface/90 backdrop-blur-md border border-theme-border p-1.5 rounded-2xl shadow-sm grid grid-cols-3 gap-1.5 theme-transition"
          role="tablist"
          aria-label="Hero Pillars Switcher"
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={`relative cursor-pointer transition-all duration-200 rounded-xl px-2 sm:px-3.5 py-2 flex items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono overflow-hidden ${
                  isActive
                    ? "bg-theme-accent text-white shadow-md shadow-orange-500/20 font-bold"
                    : "bg-theme-bg/60 hover:bg-theme-bg border border-transparent hover:border-theme-border text-theme-muted hover:text-theme-text font-medium"
                }`}
              >
                <Icon
                  size={15}
                  weight={isActive ? "bold" : "regular"}
                  className={`flex-shrink-0 ${isActive ? "text-white" : "text-theme-muted"}`}
                />
                <span className="tracking-tight whitespace-nowrap">{tab.label}</span>

                {/* Animated bottom progress bar for active tab */}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-black/20 overflow-hidden">
                    <div
                      key={`prog-${activeTab}`}
                      className="h-full bg-white/90 rounded-full"
                      style={{
                        animation: "heroTabProg 4.5s linear forwards",
                        animationPlayState: isPaused ? "paused" : "running"
                      }}
                    />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Showcase Stage with Ambient Glow & Browser Window */}
      <div className="hx-stage select-none">
        {/* Ambient warm orange background glow */}
        <div className="hx-glow" aria-hidden="true" />

        {/* Main Interactive Browser / App Window */}
        <div className="hx-win bg-theme-surface border border-theme-border shadow-2xl rounded-2xl overflow-hidden flex flex-col theme-transition">
          {/* Top Window Bar with macOS Dots & Monospace Telemetry Label */}
          <div className="px-3.5 py-2.5 bg-theme-bg/90 border-b border-theme-border/80 flex items-center justify-between gap-2 theme-transition">
            {/* macOS window control dots */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] inline-block opacity-90" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e] inline-block opacity-90" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840] inline-block opacity-90" />
            </div>

            {/* Clean subtle monospace label */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-theme-surface/80 border border-theme-border/70 text-theme-muted font-mono text-[10px] tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 inline-block" />
              <span>ojix.cloud / production-telemetry</span>
            </div>

            {/* Live system status indicator */}
            <div className="inline-flex items-center gap-1.5 flex-shrink-0 font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
              <span>LIVE</span>
            </div>
          </div>

          {/* Dynamic Animated Content Panel */}
          <div className="p-4 sm:p-5 min-h-[345px] max-h-[355px] flex flex-col justify-between overflow-hidden">
            <AnimatePresence mode="wait">
              {activeTab === 0 && (
                <motion.div
                  key="tab-ships"
                  initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
                className="h-full flex flex-col justify-between flex-1"
              >
                <div>
                  {/* Eyebrow and Branch */}
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-theme-border/60">
                    <span className="font-mono text-[10.5px] font-bold uppercase tracking-widest text-theme-accent flex items-center gap-1.5">
                      <Lightning size={13} weight="fill" />
                      PIPELINE · MAIN RELEASE
                    </span>
                    <span className="font-mono text-[10px] text-theme-muted bg-theme-bg px-2 py-0.5 rounded border border-theme-border/60">
                      commit 8f2a9c4
                    </span>
                  </div>

                  {/* 3-Step Production Pipeline */}
                  <div className="space-y-2.5">
                    {/* Step 1 */}
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-theme-bg/70 border border-theme-border/80">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <CheckCircle
                          size={18}
                          weight="fill"
                          className="text-emerald-500 flex-shrink-0"
                        />
                        <div className="truncate">
                          <div className="text-[12.5px] font-bold text-theme-text leading-tight truncate">
                            Architecture & Schema Verified
                          </div>
                          <div className="font-mono text-[10px] text-theme-muted truncate">
                            PostgreSQL schemas + RPC contracts
                          </div>
                        </div>
                      </div>
                      <span className="font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex-shrink-0">
                        VERIFIED
                      </span>
                    </div>

                    {/* Step 2 */}
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-theme-bg/70 border border-theme-border/80">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <CheckCircle
                          size={18}
                          weight="fill"
                          className="text-emerald-500 flex-shrink-0"
                        />
                        <div className="truncate">
                          <div className="text-[12.5px] font-bold text-theme-text leading-tight truncate">
                            Staging Demo · Sprint 04 Approved
                          </div>
                          <div className="font-mono text-[10px] text-theme-muted truncate">
                            Tested on private staging environment
                          </div>
                        </div>
                      </div>
                      <span className="font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex-shrink-0">
                        APPROVED
                      </span>
                    </div>

                    {/* Step 3 */}
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-theme-accent/8 border border-theme-accent/30 shadow-sm">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-4 h-4 rounded-full bg-theme-accent flex items-center justify-center text-white flex-shrink-0">
                          <CheckCircle size={14} weight="bold" />
                        </div>
                        <div className="truncate">
                          <div className="text-[12.5px] font-bold text-theme-text leading-tight truncate">
                            Zero-Downtime Production Release
                          </div>
                          <div className="font-mono text-[10px] text-theme-muted truncate">
                            Direct cloud cluster handover
                          </div>
                        </div>
                      </div>
                      <span className="font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-theme-accent text-white shadow-sm flex-shrink-0">
                        v2.4.0 LIVE
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Mini Metric Row */}
                <div className="grid grid-cols-3 gap-2 pt-3 mt-3 border-t border-theme-border/60">
                  <div className="p-2 rounded-lg bg-theme-bg/50 border border-theme-border/60 text-center">
                    <div className="font-mono text-[9px] uppercase tracking-wider text-theme-muted">
                      Build Time
                    </div>
                    <div className="font-mono text-sm font-bold text-theme-text mt-0.5">
                      42s
                    </div>
                  </div>
                  <div className="p-2 rounded-lg bg-theme-bg/50 border border-theme-border/60 text-center">
                    <div className="font-mono text-[9px] uppercase tracking-wider text-theme-muted">
                      Test Coverage
                    </div>
                    <div className="font-mono text-sm font-bold text-emerald-500 mt-0.5">
                      98.4%
                    </div>
                  </div>
                  <div className="p-2 rounded-lg bg-theme-bg/50 border border-theme-border/60 text-center">
                    <div className="font-mono text-[9px] uppercase tracking-wider text-theme-muted">
                      IP Handover
                    </div>
                    <div className="font-mono text-sm font-bold text-theme-accent mt-0.5">
                      100%
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 1 && (
              <motion.div
                key="tab-scales"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
                className="h-full flex flex-col justify-between flex-1"
              >
                <div>
                  {/* Top 3 Metric Cards */}
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="p-2 rounded-xl bg-theme-bg/70 border border-theme-border/80 flex flex-col">
                      <span className="font-mono text-[8.5px] uppercase tracking-wider text-theme-muted truncate">
                        Requests / Day
                      </span>
                      <div className="flex items-baseline justify-between mt-1">
                        <b className="text-base font-extrabold text-theme-text tracking-tight">
                          2.4M
                        </b>
                        <span className="font-mono text-[9.5px] font-bold text-emerald-500">
                          +18%
                        </span>
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-theme-bg/70 border border-theme-border/80 flex flex-col">
                      <span className="font-mono text-[8.5px] uppercase tracking-wider text-theme-muted truncate">
                        P95 Latency
                      </span>
                      <div className="flex items-baseline justify-between mt-1">
                        <b className="text-base font-extrabold text-theme-text tracking-tight">
                          38ms
                        </b>
                        <span className="font-mono text-[9.5px] font-bold text-theme-accent">
                          Fast
                        </span>
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-theme-bg/70 border border-theme-border/80 flex flex-col">
                      <span className="font-mono text-[8.5px] uppercase tracking-wider text-theme-muted truncate">
                        Uptime SLA
                      </span>
                      <div className="flex items-baseline justify-between mt-1">
                        <b className="text-base font-extrabold text-theme-text tracking-tight">
                          99.98%
                        </b>
                        <span className="font-mono text-[9.5px] font-bold text-emerald-500">
                          ● High
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Clean SVG Throughput Wave Visual */}
                  <div className="p-2.5 rounded-xl border border-theme-border/80 bg-theme-bg/40 mb-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-bold text-theme-text flex items-center gap-1.5">
                        <ChartLineUp size={13} className="text-theme-accent" />
                        Throughput Stream
                      </span>
                      <span className="font-mono text-[9px] text-theme-muted bg-theme-surface px-1.5 py-0.5 rounded border border-theme-border/60">
                        42,800 req/s peak
                      </span>
                    </div>
                    <svg
                      viewBox="0 0 300 68"
                      preserveAspectRatio="none"
                      className="w-full h-[64px] overflow-visible"
                    >
                      <defs>
                        <linearGradient id="heroScalesFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--accent-color, #c9662f)" stopOpacity="0.32" />
                          <stop offset="100%" stopColor="var(--accent-color, #c9662f)" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      {[18, 38, 54].map((y) => (
                        <line
                          key={y}
                          x1="0"
                          x2="300"
                          y1={y}
                          y2={y}
                          stroke="currentColor"
                          className="text-theme-border/40"
                          strokeDasharray="3 3"
                        />
                      ))}
                      <path
                        d="M0 54 C30 50 50 38 75 42 S115 54 140 32 S180 14 205 24 S245 42 270 12 S290 8 300 6 V68 H0 Z"
                        fill="url(#heroScalesFill)"
                      />
                      <path
                        d="M0 54 C30 50 50 38 75 42 S115 54 140 32 S180 14 205 24 S245 42 270 12 S290 8 300 6"
                        fill="none"
                        stroke="var(--accent-color, #c9662f)"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                      <circle cx="270" cy="12" r="3.5" fill="var(--surface, #ffffff)" stroke="var(--accent-color, #c9662f)" strokeWidth="2" />
                    </svg>
                  </div>
                </div>

                {/* Service Load Rows */}
                <div className="space-y-1.5 pt-1">
                  <div className="grid grid-cols-[100px_1fr_40px] items-center gap-2 text-[10px]">
                    <span className="font-medium text-theme-muted truncate">API Gateway</span>
                    <div className="h-1.5 rounded-full bg-theme-bg overflow-hidden border border-theme-border/40">
                      <div className="h-full bg-gradient-to-r from-theme-accent to-[#e07238] rounded-full" style={{ width: "86%" }} />
                    </div>
                    <b className="font-mono text-right text-theme-text font-bold">86%</b>
                  </div>

                  <div className="grid grid-cols-[100px_1fr_40px] items-center gap-2 text-[10px]">
                    <span className="font-medium text-theme-muted truncate">Workers Pool</span>
                    <div className="h-1.5 rounded-full bg-theme-bg overflow-hidden border border-theme-border/40">
                      <div className="h-full bg-gradient-to-r from-theme-accent to-[#e07238] rounded-full" style={{ width: "64%" }} />
                    </div>
                    <b className="font-mono text-right text-theme-text font-bold">64%</b>
                  </div>

                  <div className="grid grid-cols-[100px_1fr_40px] items-center gap-2 text-[10px]">
                    <span className="font-medium text-theme-muted truncate">PostgreSQL DB</span>
                    <div className="h-1.5 rounded-full bg-theme-bg overflow-hidden border border-theme-border/40">
                      <div className="h-full bg-gradient-to-r from-theme-accent to-[#e07238] rounded-full" style={{ width: "48%" }} />
                    </div>
                    <b className="font-mono text-right text-theme-text font-bold">48%</b>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 2 && (
              <motion.div
                key="tab-ai-works"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
                className="h-full flex flex-col justify-between flex-1"
              >
                <div>
                  {/* Eyebrow */}
                  <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-theme-border/60">
                    <span className="font-mono text-[10.5px] font-bold uppercase tracking-widest text-theme-accent flex items-center gap-1.5">
                      <Sparkle size={13} weight="fill" />
                      PRACTICAL PRIVATE AI & OCR
                    </span>
                    <span className="font-mono text-[10px] text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                      Zero Hallucination
                    </span>
                  </div>

                  {/* Input Ingest Block */}
                  <div className="p-2.5 rounded-xl bg-theme-bg/70 border border-theme-border/80 flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-theme-accent/10 border border-theme-accent/20 flex items-center justify-center text-theme-accent flex-shrink-0">
                        <FileText size={17} weight="bold" />
                      </div>
                      <div className="truncate">
                        <div className="font-mono text-xs font-bold text-theme-text truncate">
                          Case_Filing_2026.pdf
                        </div>
                        <div className="font-mono text-[9.5px] text-theme-muted">
                          Multi-page scan · 4.2 MB TIFF/PDF
                        </div>
                      </div>
                    </div>
                    <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 flex-shrink-0">
                      Ingested
                    </span>
                  </div>

                  {/* Structured Output Card in font-mono */}
                  <div className="p-2.5 rounded-xl bg-theme-bg/90 border border-theme-border/90 font-mono text-[11px] space-y-1.5">
                    <div className="flex items-center justify-between border-b border-theme-border/50 pb-1">
                      <span className="text-theme-muted">Document Type:</span>
                      <b className="text-theme-text font-bold">Legal Matter & Contract</b>
                    </div>
                    <div className="flex items-center justify-between border-b border-theme-border/50 pb-1">
                      <span className="text-theme-muted">Entities Extracted:</span>
                      <b className="text-theme-text font-bold">24 verified fields</b>
                    </div>
                    <div className="flex items-center justify-between border-b border-theme-border/50 pb-1">
                      <span className="text-theme-muted">Routing:</span>
                      <b className="text-theme-accent font-bold">Automated (Sprint Queue)</b>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-theme-muted">Confidence:</span>
                      <b className="text-emerald-500 font-bold">99.2% accuracy</b>
                    </div>
                  </div>
                </div>

                {/* Human in the loop confirmation badge */}
                <div className="pt-2.5 border-t border-theme-border/60 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold text-emerald-500">
                    <CheckCircle size={14} weight="fill" />
                    Human-in-the-Loop Approved
                  </span>
                  <span className="font-mono text-[9.5px] text-theme-muted">
                    Private VPC · Encrypted
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Floating Status Pill in Bottom-Left */}
      <div
        className="hx-pill bg-theme-surface border border-theme-border shadow-xl px-3.5 py-2 rounded-full inline-flex items-center gap-2 theme-transition"
        aria-hidden="true"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
        <span className="text-[11px] font-bold text-theme-text tracking-tight">
          Production-grade architecture
        </span>
      </div>
    </div>
  </div>
  );
}

