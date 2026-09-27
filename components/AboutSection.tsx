"use client";

import { User, CheckCircle2, Code2, Terminal, Cpu, ShieldCheck } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/projects";

export default function AboutSection() {
  const highlights = [
    "Specialized in GenAI, LLM RAG pipelines, and Autonomous AI Agents",
    "High-throughput REST API microservices with FastAPI, Pydantic, and PostgreSQL",
    "Production workflow automation connecting n8n, WhatsApp Cloud API, and webhooks",
    "Clean-architecture practitioner emphasizing verifiable code & proof of work"
  ];

  return (
    <section id="about" className="py-24 bg-slate-950 relative z-10 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & Positioning */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400">
              <User className="w-3.5 h-3.5" />
              <span>About Me</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Engineering Practical AI Systems That Scale
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed">
              I am an <strong className="text-white">AI Engineer & GenAI Developer</strong> focused on transforming technical concepts into production-ready software products. Rather than building simple AI demos, I engineer end-to-end architectures including RAG pipelines, autonomous agent tool calling, FastAPI microservices, and event-driven automation.
            </p>

            <p className="text-slate-400 text-sm leading-relaxed">
              My engineering approach prioritizes measurable business outcomes: reducing operational latency, grounding LLM outputs to eliminate hallucinations, ensuring database consistency with PostgreSQL, and delivering clear OpenAPI contracts.
            </p>

            {/* Highlights */}
            <div className="space-y-2.5 pt-2">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-3 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Key Principles Card */}
          <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl relative space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  Sheikh Nazmul Islam
                </h3>
                <p className="text-xs font-mono text-cyan-400">
                  AI Engineer & Developer
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="flex justify-between p-2.5 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Primary Language:</span>
                <span className="text-cyan-400 font-bold">Python</span>
              </div>
              <div className="flex justify-between p-2.5 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Backend Framework:</span>
                <span className="text-cyan-400 font-bold">FastAPI</span>
              </div>
              <div className="flex justify-between p-2.5 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-400">AI Stack:</span>
                <span className="text-cyan-400 font-bold">LLMs, RAG, LangChain, Agents</span>
              </div>
              <div className="flex justify-between p-2.5 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Database:</span>
                <span className="text-cyan-400 font-bold">PostgreSQL, Vector DBs</span>
              </div>
              <div className="flex justify-between p-2.5 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Automation:</span>
                <span className="text-cyan-400 font-bold">n8n, Webhooks, WhatsApp Cloud API</span>
              </div>
            </div>

            <div className="pt-2 text-center">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-slate-400 hover:text-cyan-400 underline transition-colors"
              >
                Inspect Public Code Repositories →
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
