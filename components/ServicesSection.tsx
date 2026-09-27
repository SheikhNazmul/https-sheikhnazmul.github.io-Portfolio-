"use client";

import { SERVICES } from "@/lib/projects";
import { Wrench, CheckCircle2, ArrowRight } from "lucide-react";

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-slate-950 relative z-10 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400">
            <Wrench className="w-3.5 h-3.5" />
            <span>Engineering Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How I Can Help Your Business
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Client-focused AI engineering, LLM systems development, RAG knowledge bases, autonomous agents, and backend microservice implementation.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-cyan-500/50 transition-all duration-300 group"
            >
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors tracking-tight mb-3">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  {service.shortDescription}
                </p>

                {/* Problem & Solution details */}
                <div className="space-y-3 text-xs mb-6">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[10px] font-mono text-rose-400 uppercase tracking-wider block mb-1">
                      Client Challenge:
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {service.problem}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                      What I Build:
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {service.whatIBuild}
                    </p>
                  </div>
                </div>

                {/* Tech chips */}
                <div className="mb-6">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-2">
                    Technologies Used:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {service.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Deliverable Footer */}
              <div className="pt-4 border-t border-slate-800/80 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Typical Deliverable:
                </span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {service.typicalDeliverable}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white">
              Need a Custom AI Solution or FastAPI Backend?
            </h3>
            <p className="text-xs text-slate-300">
              Let's discuss your requirements, technical architecture, timeline, and deliverables.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg shadow-cyan-500/20 transition-all shrink-0"
          >
            Request Project Scope
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
