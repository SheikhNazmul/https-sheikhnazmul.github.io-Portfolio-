"use client";

import { ArrowRight, Code2, Terminal, Sparkles, Mail, CheckCircle2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { PERSONAL_INFO } from "@/lib/projects";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] pt-32 pb-20 flex items-center justify-center bg-grid-pattern overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-indigo-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-mono text-cyan-400 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Available for Freelance & AI Engineering Projects</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
              AI Engineering That Turns Ideas Into{" "}
              <span className="gradient-text">Working Products.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
              I build AI-powered applications, LLM systems, RAG pipelines, AI agents, automation workflows, and production-ready APIs using modern Python and backend technologies.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#work"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                View My Work
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm px-6 py-3.5 rounded-xl border border-slate-700/80 transition-all hover:border-slate-500"
              >
                Let's Build Something
              </a>
            </div>

            {/* Social & Contact Quick Links */}
            <div className="flex items-center gap-5 pt-4 text-slate-400 text-sm">
              <span className="text-xs uppercase font-mono tracking-wider text-slate-500">Connect:</span>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
              >
                <GithubIcon className="w-4 h-4" /> GitHub
              </a>
              <span className="text-slate-700">•</span>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" /> LinkedIn
              </a>
              <span className="text-slate-700">•</span>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
              >
                <Mail className="w-4 h-4" /> Email
              </a>
            </div>

            {/* Technical Stack Line */}
            <div className="pt-6 border-t border-slate-800/80">
              <p className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
                Core Stack
              </p>
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-300/90">
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800">Python</span>
                <span>•</span>
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800">FastAPI</span>
                <span>•</span>
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800">LLMs</span>
                <span>•</span>
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800">RAG</span>
                <span>•</span>
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800">AI Agents</span>
                <span>•</span>
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800">PostgreSQL</span>
                <span>•</span>
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800">APIs</span>
                <span>•</span>
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800">Automation</span>
              </div>
            </div>
          </div>

          {/* Right Column: Code/Architecture Terminal Visual */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-slate-950/90 border border-slate-800 p-5 shadow-2xl relative overflow-hidden backdrop-blur-md">
              {/* Terminal Bar */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>ai_system_orchestrator.py</span>
                </div>
              </div>

              {/* Code Snippet */}
              <div className="font-mono text-xs leading-relaxed space-y-2 text-slate-300">
                <p><span className="text-purple-400">from</span> fastapi <span className="text-purple-400">import</span> FastAPI, Webhook</p>
                <p><span className="text-purple-400">from</span> langchain.agents <span className="text-purple-400">import</span> create_ai_agent</p>
                <p><span className="text-purple-400">from</span> vector_db <span className="text-purple-400">import</span> RAGRetriever</p>
                
                <div className="pt-2 text-slate-500"># Initialize Production RAG & Agent Pipeline</div>
                <p><span className="text-blue-400">app</span> = FastAPI(title=<span className="text-emerald-300">"Nazmul AI System API"</span>)</p>
                <p><span className="text-blue-400">rag_engine</span> = RAGRetriever(index=<span className="text-emerald-300">"enterprise_knowledge"</span>)</p>
                
                <div className="pt-2">
                  <p><span className="text-purple-400">@app</span>.post(<span className="text-emerald-300">"/api/v1/query"</span>)</p>
                  <p><span className="text-purple-400">async def</span> <span className="text-yellow-300">process_query</span>(payload: UserQuery):</p>
                  <p className="pl-4 text-slate-400">context = <span className="text-purple-400">await</span> rag_engine.retrieve(payload.text)</p>
                  <p className="pl-4 text-slate-400">response = <span className="text-purple-400">await</span> ai_agent.execute(context)</p>
                  <p className="pl-4 text-cyan-400"><span className="text-purple-400">return</span> &#123;<span className="text-emerald-300">"status"</span>: <span className="text-emerald-300">"success"</span>, <span className="text-emerald-300">"result"</span>: response&#125;</p>
                </div>
              </div>

              {/* Live Status indicator */}
              <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Pipeline Latency: 18ms</span>
                </div>
                <span className="text-slate-400">Status: 200 OK</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
