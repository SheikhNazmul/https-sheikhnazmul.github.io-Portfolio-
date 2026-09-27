"use client";

import { useEffect, useState } from "react";
import { Star, GitFork, ExternalLink, Code, BookOpen } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { PERSONAL_INFO } from "@/lib/projects";

interface RepoItem {
  id: number;
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
}

export default function GitHubSection() {
  const [repos, setRepos] = useState<RepoItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fallback repositories based on real projects
  const fallbackRepos: RepoItem[] = [
    {
      id: 101,
      name: "ml-prediction-fastapi",
      html_url: `${PERSONAL_INFO.github}`,
      description: "FastAPI machine learning prediction microservice with Scikit-learn and PostgreSQL.",
      stargazers_count: 0,
      forks_count: 0,
      language: "Python"
    },
    {
      id: 102,
      name: "llm-rag-knowledge-assistant",
      html_url: `${PERSONAL_INFO.github}`,
      description: "RAG pipeline using LangChain, vector database embeddings, and FastAPI.",
      stargazers_count: 0,
      forks_count: 0,
      language: "Python"
    },
    {
      id: 103,
      name: "expense-tracker-api",
      html_url: `${PERSONAL_INFO.github}`,
      description: "Restful API for expense management built with FastAPI, PostgreSQL, and JWT Auth.",
      stargazers_count: 0,
      forks_count: 0,
      language: "Python"
    }
  ];

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch("https://api.github.com/users/SheikhNazmul/repos?sort=updated&per_page=6");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setRepos(data.slice(0, 6));
          } else {
            setRepos(fallbackRepos);
          }
        } else {
          setRepos(fallbackRepos);
        }
      } catch (err) {
        setRepos(fallbackRepos);
      } finally {
        setLoading(false);
      }
    }
    fetchRepos();
  }, []);

  return (
    <section id="github" className="py-24 bg-[#090d16] relative z-10 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400 mb-3">
              <GithubIcon className="w-3.5 h-3.5" />
              <span>Open Source & Repositories</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              GitHub Repositories
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-xl">
              Inspect public repositories, code structure, commits, and backend implementations directly on GitHub.
            </p>
          </div>

          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono font-bold text-white transition-all hover:scale-[1.02]"
          >
            <GithubIcon className="w-4 h-4 text-cyan-400" />
            <span>Visit @SheikhNazmul Profile</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>

        {/* Repositories Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-44 rounded-2xl bg-slate-900/60 animate-pulse border border-slate-800" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-cyan-400" />
                      <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors tracking-tight">
                        {repo.name}
                      </h3>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 transition-colors" />
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4">
                    {repo.description || "Public repository containing technical source code and architecture setup."}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5 text-cyan-400">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    {repo.language || "Python"}
                  </span>
                  
                  <div className="flex items-center gap-3 text-slate-500">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-slate-400" />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5 text-slate-400" />
                      {repo.forks_count}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
