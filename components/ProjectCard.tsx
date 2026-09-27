"use client";

import { useState } from "react";
import Link from "next/link";
import { Project } from "@/lib/types";
import VideoPlayer from "./VideoPlayer";
import { ExternalLink, Play, ArrowRight, CheckCircle2, Server, Layers } from "lucide-react";
import { GithubIcon } from "@/components/Icons";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <>
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/5 flex flex-col justify-between group relative">
        {/* Card Header: Category & Status */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex flex-wrap items-center gap-1.5">
              {project.category.map((cat) => (
                <span
                  key={cat}
                  className="px-2.5 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-[11px] font-mono text-cyan-400"
                >
                  {cat}
                </span>
              ))}
            </div>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              {project.status}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors tracking-tight mb-3">
            <Link href={`/projects/${project.slug}`}>
              {project.title}
            </Link>
          </h3>

          {/* Problem & Solution Strip */}
          <div className="space-y-2.5 mb-5 text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
              <span className="text-[10px] font-mono text-rose-400 uppercase tracking-wider block mb-1">
                Problem:
              </span>
              <p className="line-clamp-2 leading-relaxed text-slate-300">
                {project.problem}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block mb-1">
                Solution:
              </span>
              <p className="line-clamp-2 leading-relaxed text-slate-300">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Tech Stack Chips */}
          <div className="mb-6">
            <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-2">
              Technologies:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons Footer */}
        <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            {/* Watch Me Explain Button */}
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-cyan-400 transition-colors"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Watch Explanation</span>
            </button>

            {/* GitHub Button */}
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Code</span>
              </a>
            ) : null}

            {/* Live Demo Button */}
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs font-mono text-emerald-400 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Demo</span>
              </a>
            ) : (
              <span className="text-[10px] font-mono text-slate-500 italic px-2 py-1">
                Deployment coming soon
              </span>
            )}
          </div>

          {/* Case Study Link */}
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors ml-auto"
          >
            <span>Case Study</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Video Modal */}
      <VideoPlayer
        title={project.title}
        videoUrl={project.videoUrl}
        thumbnail={project.videoThumbnail}
        duration={project.videoDuration}
        description={`Architectural breakdown for ${project.title}. Problem: ${project.problem}`}
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />
    </>
  );
}
