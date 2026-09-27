"use client";

import { Play, Code, Database, Cpu, Zap, Video, ExternalLink } from "lucide-react";

export default function ProofOfWorkStrip() {
  const proofItems = [
    {
      label: "LIVE PROJECTS",
      sublabel: "Working Web Applications",
      icon: ExternalLink,
      href: "#work",
      color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    },
    {
      label: "GITHUB",
      sublabel: "Open Source Codebases",
      icon: Code,
      href: "#github",
      color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    },
    {
      label: "APIs",
      sublabel: "FastAPI Endpoints",
      icon: Database,
      href: "#apis",
      color: "text-blue-400 border-blue-500/30 bg-blue-500/10",
    },
    {
      label: "AI SYSTEMS",
      sublabel: "LLM & RAG Pipelines",
      icon: Cpu,
      href: "#architecture",
      color: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    },
    {
      label: "AUTOMATION",
      sublabel: "n8n & Webhook Workflows",
      icon: Zap,
      href: "#work",
      color: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    },
    {
      label: "TECHNICAL VIDEOS",
      sublabel: "Architecture Breakdown",
      icon: Video,
      href: "#work",
      color: "text-rose-400 border-rose-500/30 bg-rose-500/10",
    },
  ];

  return (
    <section className="py-8 bg-slate-950/80 border-y border-slate-800/80 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400">
            Proof of Work Categories
          </h2>
          <span className="text-xs text-slate-400">
            Real Systems • Inspected Code • Verifiable Demos
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {proofItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                className="group p-3 rounded-xl bg-slate-900/90 border border-slate-800/90 hover:border-slate-700 transition-all hover:-translate-y-0.5 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg border ${item.color}`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <span className="text-slate-600 group-hover:text-slate-400 transition-colors text-xs font-mono">
                    →
                  </span>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white tracking-wide group-hover:text-cyan-400 transition-colors">
                    {item.label}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-medium truncate mt-0.5">
                    {item.sublabel}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
