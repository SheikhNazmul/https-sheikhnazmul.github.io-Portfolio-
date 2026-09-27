"use client";

import { useState } from "react";
import { API_ENDPOINTS } from "@/lib/projects";
import { Database, Terminal, Copy, Check, ExternalLink, Code } from "lucide-react";

export default function ApiShowcase() {
  const [activeApiId, setActiveApiId] = useState<string>("predict-endpoint");
  const [activeTab, setActiveTab] = useState<"request" | "response">("request");
  const [copied, setCopied] = useState(false);

  const activeApi = API_ENDPOINTS.find((a) => a.id === activeApiId) || API_ENDPOINTS[0];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="apis" className="py-24 bg-slate-950 relative z-10 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400">
            <Database className="w-3.5 h-3.5" />
            <span>API Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Production-Ready Microservice Endpoints
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            FastAPI backends engineered with explicit Pydantic schema contracts, status codes, logging, and OpenAPI specifications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Endpoint Selector Tabs (Left - 4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              Select REST Endpoint:
            </h3>

            {API_ENDPOINTS.map((api) => {
              const isActive = api.id === activeApiId;
              return (
                <button
                  key={api.id}
                  onClick={() => setActiveApiId(api.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    isActive
                      ? "bg-slate-900 border-cyan-500/80 shadow-lg shadow-cyan-500/10"
                      : "bg-slate-950 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                        api.method === "POST"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      }`}
                    >
                      {api.method}
                    </span>
                    <span className="text-xs font-mono text-slate-300 font-bold truncate">
                      {api.path}
                    </span>
                  </div>

                  <h4 className="text-xs font-semibold text-white">
                    {api.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                    {api.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Interactive Code Viewer (Right - 8 cols) */}
          <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            
            {/* Code Bar Header */}
            <div className="flex flex-wrap items-center justify-between p-4 bg-slate-900 border-b border-slate-800 gap-3">
              <div className="flex items-center gap-3">
                <span
                  className={`px-2.5 py-1 rounded text-xs font-mono font-bold ${
                    activeApi.method === "POST"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-blue-500/20 text-blue-400"
                  }`}
                >
                  {activeApi.method}
                </span>
                <span className="text-xs font-mono text-cyan-300 font-bold">
                  {activeApi.path}
                </span>
              </div>

              {/* Request / Response Toggle */}
              <div className="flex items-center gap-2">
                <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-mono">
                  <button
                    onClick={() => setActiveTab("request")}
                    className={`px-3 py-1 rounded-md transition-colors ${
                      activeTab === "request"
                        ? "bg-cyan-500 text-slate-950 font-bold"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Request Body
                  </button>
                  <button
                    onClick={() => setActiveTab("response")}
                    className={`px-3 py-1 rounded-md transition-colors ${
                      activeTab === "response"
                        ? "bg-cyan-500 text-slate-950 font-bold"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Response Body (200 OK)
                  </button>
                </div>

                <button
                  onClick={() =>
                    handleCopy(
                      activeTab === "request"
                        ? activeApi.requestPayload || ""
                        : activeApi.responsePayload
                    )
                  }
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                  aria-label="Copy code payload"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Code Block Content */}
            <div className="p-6 font-mono text-xs overflow-x-auto max-h-[380px] bg-slate-950 text-slate-200 leading-relaxed">
              <pre>
                <code>
                  {activeTab === "request"
                    ? activeApi.requestPayload || "// No request payload required for this endpoint"
                    : activeApi.responsePayload}
                </code>
              </pre>
            </div>

            {/* Code Bar Footer */}
            <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>FastAPI • Pydantic Schema Validated</span>
              {activeApi.githubUrl && (
                <a
                  href={activeApi.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-cyan-400 hover:underline"
                >
                  <Code className="w-3.5 h-3.5" /> View Controller Code on GitHub
                </a>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
