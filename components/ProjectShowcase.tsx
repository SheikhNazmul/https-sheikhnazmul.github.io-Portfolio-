"use client";

import { useState } from "react";
import { PROJECTS } from "@/lib/projects";
import { ProjectCategory } from "@/lib/types";
import ProjectCard from "./ProjectCard";
import { Filter, Layers } from "lucide-react";

const CATEGORIES: ProjectCategory[] = [
  "All",
  "AI / GenAI",
  "LLM",
  "RAG",
  "AI Agents",
  "Machine Learning",
  "Backend",
  "Automation",
];

export default function ProjectShowcase() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");

  const filteredProjects = PROJECTS.filter((project) => {
    if (activeCategory === "All") return true;
    return project.category.includes(activeCategory);
  });

  return (
    <section id="work" className="py-24 bg-[#090d16] relative z-10 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400 mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Selected Work</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Real AI & Engineering Systems
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-xl">
              Production-focused projects built with Python, FastAPI, LangChain, RAG pipelines, AI Agents, and scalable automation workflows.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-950 border border-slate-800 rounded-xl">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  activeCategory === category
                    ? "bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20"
                    : "text-slate-400 hover:text-white hover:bg-slate-900"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-900/50 rounded-2xl border border-slate-800">
            <Filter className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-white">No projects found for "{activeCategory}"</h3>
            <p className="text-xs text-slate-400 mt-1">Try selecting another filter or category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
