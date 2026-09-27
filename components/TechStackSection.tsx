"use client";

import { useState } from "react";
import { TECHNOLOGIES, PROJECTS } from "@/lib/projects";
import { Cpu, CheckCircle2, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function TechStackSection() {
  const [selectedTechId, setSelectedTechId] = useState<string>("fastapi");

  const selectedTech = TECHNOLOGIES.find((t) => t.id === selectedTechId) || TECHNOLOGIES[0];

  const associatedProjects = PROJECTS.filter((p) =>
    selectedTech.associatedProjectIds.includes(p.id)
  );

  return (
    <section id="stack" className="py-24 bg-slate-950 relative z-10 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400">
            <Cpu className="w-3.5 h-3.5" />
            <span>Interactive Technical Stack</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Proof Behind Every Technology
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Click on any technology below to inspect the real projects, architectures, and APIs where I have implemented it in production.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Technology Buttons Grid (Left - 7 cols) */}
          <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4">
              Select a Technology to Inspect Proof of Work:
            </h3>

            <div className="flex flex-wrap gap-2.5">
              {TECHNOLOGIES.map((tech) => {
                const isSelected = tech.id === selectedTechId;
                return (
                  <button
                    key={tech.id}
                    onClick={() => setSelectedTechId(tech.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-mono transition-all flex items-center gap-2 border ${
                      isSelected
                        ? "bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-lg shadow-cyan-500/20 scale-[1.02]"
                        : "bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white"
                    }`}
                  >
                    <span>{tech.name}</span>
                    {tech.isPrimary && (
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isSelected ? "bg-slate-950" : "bg-cyan-400"
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-500">
              <span>Selected: <strong className="text-cyan-400">{selectedTech.name}</strong></span>
              <span>Category: <span className="text-slate-400">{selectedTech.category}</span></span>
            </div>
          </div>

          {/* Connected Projects Card (Right - 5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 border border-cyan-500/30 rounded-2xl p-6 shadow-2xl relative">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                Verified Implementations ({associatedProjects.length})
              </span>
              <span className="px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 text-[10px] font-mono border border-cyan-500/20">
                {selectedTech.category}
              </span>
            </div>

            <h4 className="text-xl font-bold text-white mb-2">
              {selectedTech.name}
            </h4>
            <p className="text-xs text-slate-300 mb-6 leading-relaxed">
              {selectedTech.description}
            </p>

            {/* List of associated projects */}
            <div className="space-y-3">
              <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                Projects built using {selectedTech.name}:
              </p>
              
              {associatedProjects.map((project) => (
                <div
                  key={project.id}
                  className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-colors flex items-center justify-between group"
                >
                  <div className="space-y-1">
                    <h5 className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h5>
                    <p className="text-[11px] text-slate-400 line-clamp-1">
                      {project.description}
                    </p>
                  </div>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="p-2 rounded-lg bg-slate-900 group-hover:bg-cyan-500 group-hover:text-slate-950 text-slate-400 transition-colors ml-3 shrink-0"
                    aria-label={`View ${project.title}`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
