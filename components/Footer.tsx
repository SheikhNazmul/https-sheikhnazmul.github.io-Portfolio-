"use client";

import Link from "next/link";
import { Cpu, Mail, ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { PERSONAL_INFO } from "@/lib/projects";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 py-12 relative z-10 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          {/* Brand */}
          <div className="space-y-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="font-bold text-white text-base tracking-tight">
                Sheikh Nazmul Islam
              </span>
            </Link>
            <p className="text-xs text-slate-400 max-w-md">
              AI Engineer • GenAI Developer • LLM & RAG Engineer • Python/FastAPI Backend Developer
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-6 text-xs font-mono">
            <a href="#work" className="hover:text-cyan-400 transition-colors">Work</a>
            <a href="#stack" className="hover:text-cyan-400 transition-colors">Stack</a>
            <a href="#architecture" className="hover:text-cyan-400 transition-colors">Architecture</a>
            <a href="#apis" className="hover:text-cyan-400 transition-colors">APIs</a>
            <a href="#services" className="hover:text-cyan-400 transition-colors">Services</a>
            <a href="#github" className="hover:text-cyan-400 transition-colors">GitHub</a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
          </div>
        </div>

        {/* Bottom copyright & scroll top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-500">
          <p>© {new Date().getFullYear()} Sheikh Nazmul Islam. All rights reserved. Built with Next.js & Tailwind CSS.</p>

          <div className="flex items-center gap-4">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              GitHub
            </a>
            <span>•</span>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              LinkedIn
            </a>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
