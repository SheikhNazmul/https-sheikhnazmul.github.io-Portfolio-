"use client";

import { useState } from "react";
import { ARCHITECTURE_NODES } from "@/lib/projects";
import { Cpu, ArrowDown, Database, Server, Workflow, Bot, Search, Terminal } from "lucide-react";

export default function ArchitectureSection() {
  const [activeStepId, setActiveStepId] = useState<string>("fastapi-gateway");

  const activeNode = ARCHITECTURE_NODES.find((n) => n.id === activeStepId) || ARCHITECTURE_NODES[1];

  return (
    <section id="architecture" className="py-24 bg-[#090d16] relative z-10 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400">
            <Workflow className="w-3.5 h-3.5" />
            <span>AI System Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How I Build AI Systems
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Interactive breakdown of my end-to-end engineering pipeline from client requests to RAG vector search, AI agent reasoning, and database persistence.
          </p>
        </div>

        {/* Diagram Flow Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Visual Architecture Steps Flow (Left - 7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            {ARCHITECTURE_NODES.map((node, index) => {
              const isActive = node.id === activeStepId;
              return (
                <div key={node.id} className="relative">
                  <button
                    onClick={() => setActiveStepId(node.id)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 border flex items-center justify-between group ${
                      isActive
                        ? "bg-slate-900 border-cyan-500/80 shadow-lg shadow-cyan-500/10 scale-[1.01]"
                        : "bg-slate-950/80 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/40"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-xs transition-colors ${
                          isActive
                            ? "bg-cyan-500 text-slate-950"
                            : "bg-slate-900 text-slate-400 border border-slate-800"
                        }`}
                      >
                        {node.stepNumber}
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {node.label}
                        </h3>
                        <p className="text-xs font-mono text-slate-400">
                          {node.sublabel}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-[10px] font-mono text-cyan-400">
                        {node.tech}
                      </span>
                    </div>
                  </button>

                  {/* Flow Arrow connecting nodes */}
                  {index < ARCHITECTURE_NODES.length - 1 && (
                    <div className="flex justify-center my-1">
                      <ArrowDown className="w-4 h-4 text-slate-700" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Interactive Inspection Detail Card (Right - 5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl relative sticky top-28">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono text-slate-400">
                  Node Inspector: Step {activeNode.stepNumber}
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono">
                ACTIVE PIPELINE NODE
              </span>
            </div>

            <h4 className="text-xl font-bold text-white mb-1">
              {activeNode.label}
            </h4>
            <p className="text-xs font-mono text-cyan-400 mb-4">
              {activeNode.sublabel}
            </p>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-4">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-1">
                Technical Stack & Tools:
              </span>
              <p className="text-xs font-mono text-slate-200">
                {activeNode.tech}
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-1">
                Functional Role & Implementation:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeNode.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Status: <span className="text-emerald-400">Validated Pattern</span></span>
              <span>Latency: <span className="text-cyan-400">&lt;25ms</span></span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
