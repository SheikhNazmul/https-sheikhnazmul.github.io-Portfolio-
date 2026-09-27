"use client";

import { HOW_I_WORK_STEPS } from "@/lib/projects";
import { GitCommit, ArrowRight } from "lucide-react";

export default function WorkflowSection() {
  return (
    <section id="workflow" className="py-24 bg-[#090d16] relative z-10 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400">
            <GitCommit className="w-3.5 h-3.5" />
            <span>Engineering Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            From Idea to Working System
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            A methodical 7-step engineering process designed to turn complex business ideas into predictable, production-ready AI software.
          </p>
        </div>

        {/* Workflow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOW_I_WORK_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative hover:border-cyan-500/40 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black font-mono text-cyan-400">
                    {step.step}
                  </span>
                  <span className="text-[10px] font-mono text-slate-600 group-hover:text-slate-400 transition-colors">
                    PHASE {idx + 1}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors mb-2">
                  {step.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Deliverable</span>
                <span className="text-slate-400">Verified</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
