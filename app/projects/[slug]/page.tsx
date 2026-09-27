import { PROJECTS } from "@/lib/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VideoPlayer from "@/components/VideoPlayer";
import { GithubIcon } from "@/components/Icons";
import {
  ArrowLeft,
  ExternalLink,
  Play,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Layers,
  Code2,
  Workflow,
  Server
} from "lucide-react";

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#090d16] text-slate-100 relative">
      <Navbar />

      <article className="pt-32 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Projects</span>
        </Link>

        {/* Header */}
        <div className="space-y-4 mb-12">
          <div className="flex flex-wrap items-center gap-2">
            {project.category.map((c) => (
              <span
                key={c}
                className="px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400"
              >
                {c}
              </span>
            ))}
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400">
              {project.status}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {project.title}
          </h1>

          <p className="text-lg text-slate-300 max-w-3xl leading-relaxed font-normal">
            {project.description}
          </p>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-800/80">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono font-bold text-white transition-all"
              >
                <GithubIcon className="w-4 h-4 text-cyan-400" />
                <span>View Source Code</span>
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs font-mono font-bold text-emerald-400 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Launch Live Application</span>
              </a>
            )}
          </div>
        </div>

        {/* Video Breakdown Section */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Play className="w-5 h-5 text-cyan-400 fill-current" />
            Watch Me Explain This Project
          </h2>

          <VideoPlayer
            title={project.title}
            videoUrl={project.videoUrl}
            thumbnail={project.videoThumbnail}
            duration={project.videoDuration}
            description={`Comprehensive architectural walk-through explaining how ${project.title} handles backend processing, model inference, and data routing.`}
          />
        </div>

        {/* Problem & Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center gap-2 mb-3 text-rose-400 font-mono text-xs font-bold uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" /> The Problem
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {project.problem}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center gap-2 mb-3 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" /> The Engineering Solution
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-16 p-8 rounded-2xl bg-slate-900/80 border border-slate-800">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-cyan-400" /> Key Features & Capabilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-200 leading-relaxed">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture Breakdown Steps */}
        {project.architectureSteps && (
          <div className="mb-16 p-8 rounded-2xl bg-slate-900/80 border border-slate-800">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Workflow className="w-5 h-5 text-cyan-400" /> Architecture & Data Flow
            </h2>

            <div className="space-y-4">
              {project.architectureSteps.map((step) => (
                <div key={step.step} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
                  <span className="px-3 py-1 rounded bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono font-bold text-cyan-400">
                    {step.step}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-white">{step.title}</h3>
                    <p className="text-xs text-slate-400 mt-1">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technologies Used */}
        <div className="mb-16 p-8 rounded-2xl bg-slate-900/80 border border-slate-800">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-cyan-400" /> Technical Stack Breakdown
          </h2>

          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Challenges & Future Improvements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {project.challenges && (
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-white">Engineering Challenges</h3>
              <ul className="space-y-2 text-xs text-slate-400 list-disc list-inside">
                {project.challenges.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          )}

          {project.futureImprovements && (
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-white">Future Enhancements</h3>
              <ul className="space-y-2 text-xs text-slate-400 list-disc list-inside">
                {project.futureImprovements.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="pt-8 border-t border-slate-800 flex items-center justify-between">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Selected Work
          </Link>

          <a
            href="/#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase"
          >
            Discuss Similar Project
          </a>
        </div>

      </article>

      <Footer />
    </main>
  );
}
